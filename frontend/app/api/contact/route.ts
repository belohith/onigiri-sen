import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Simple in-memory rate limiter ──
// Allows max 3 submissions per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

// ── Sanitize HTML to prevent injection ──
function sanitize(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

const DEFAULT_TO = process.env.CONTACT_TO_EMAIL || "";

function getRecipient(_subject: string): string {
  return DEFAULT_TO;
}

export async function POST(req: Request) {
  try {
    // ── Rate limiting ──
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return Response.json(
        { success: false, error: "Too many submissions. Please wait a few minutes and try again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, phone, subject, heardFrom, message, honeypot } = body;

    // ── Bot detection ──
    if (honeypot) return Response.json({ success: true }); // silently discard

    // ── Required fields ──
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return Response.json(
        { success: false, error: "Please fill out all required fields." },
        { status: 400 }
      );
    }

    // ── Field length limits ──
    if (name.length > 100) return Response.json({ success: false, error: "Name is too long." }, { status: 400 });
    if (subject.length > 200) return Response.json({ success: false, error: "Subject is too long." }, { status: 400 });
    if (message.length > 5000) return Response.json({ success: false, error: "Message is too long (max 5000 characters)." }, { status: 400 });
    if (message.trim().length < 20) return Response.json({ success: false, error: "Message is too short. Please provide more detail." }, { status: 400 });

    // ── Email validation ──
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ success: false, error: "Invalid email address." }, { status: 400 });
    }

    // ── Phone validation (if provided) ──
    // Phone is sent as e.g. "+1 (206) 555-0100" — strip everything except digits
    if (phone) {
      const phoneDigits = phone.replace(/[^\d]/g, "");
      // Remove ISD prefix digits (1-3 digits) then check remaining are 10
      // e.g. "+1 2065550100" → strip "1" → 10 digits remaining
      const withoutISD = phoneDigits.length > 10 ? phoneDigits.slice(phoneDigits.length - 10) : phoneDigits;
      if (withoutISD.length !== 10) {
        return Response.json({ success: false, error: "Please enter a valid 10-digit phone number." }, { status: 400 });
      }
    }

    // ── Spam keyword check ──
    const spamKeywords = ["casino", "crypto", "bitcoin", "forex", "viagra", "click here", "buy now", "free money"];
    const combinedText = `${name} ${subject} ${message}`.toLowerCase();
    if (spamKeywords.some((kw) => combinedText.includes(kw))) {
      return Response.json({ success: true }); // silently discard spam
    }

    // ── Sanitize all inputs ──
    const safeName     = sanitize(name.trim());
    const safeEmail    = sanitize(email.trim());
    const safePhone    = sanitize((phone || "—").trim());
    const safeSubject  = sanitize(subject.trim());
    const safeHeardFrom = sanitize((heardFrom || "—").trim());
    const safeMessage  = sanitize(message.trim()).replace(/\n/g, "<br>");

    const recipient = getRecipient(subject);

    // ── Email to team ──
    const teamEmail = await resend.emails.send({
      from: "Onigiri Sen <contact@onigirisen.jp>",
      to: recipient,
      ...(email ? { replyTo: email } : {}),
      subject: `[Contact Form] ${safeSubject} — ${safeName}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#2a2a2a">
          <div style="background:#ffefc8;padding:24px 32px;border-radius:12px 12px 0 0">
            <h2 style="margin:0;color:#6f471c;font-size:20px">New Contact Form Submission</h2>
          </div>
          <div style="background:#fff9f5;padding:24px 32px;border-radius:0 0 12px 12px;border:1px solid #f0e4d4;border-top:none">
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr><td style="padding:8px 0;color:#888;width:160px">Name</td><td style="padding:8px 0;font-weight:600">${safeName}</td></tr>
              <tr><td style="padding:8px 0;color:#888">Email</td><td style="padding:8px 0"><a href="mailto:${safeEmail}" style="color:#ed7e80">${safeEmail}</a></td></tr>
              <tr><td style="padding:8px 0;color:#888">Phone</td><td style="padding:8px 0">${safePhone}</td></tr>
              <tr><td style="padding:8px 0;color:#888">Subject</td><td style="padding:8px 0">${safeSubject}</td></tr>
              <tr><td style="padding:8px 0;color:#888">How they heard</td><td style="padding:8px 0">${safeHeardFrom}</td></tr>
            </table>
            <div style="margin-top:20px;padding:16px;background:#fff;border-radius:8px;border:1px solid #f0e4d4">
              <div style="color:#888;font-size:12px;margin-bottom:8px">MESSAGE</div>
              <div style="line-height:1.75;font-size:14px">${safeMessage}</div>
            </div>
            <div style="margin-top:16px;font-size:12px;color:#bbb">
              Submitted from IP: ${ip} · ${new Date().toUTCString()}
            </div>
          </div>
        </div>
      `,
    });

    if (teamEmail.error) {
      console.error("Team email error:", teamEmail.error);
      return Response.json({ success: false, error: "Failed to send. Please try again." }, { status: 422 });
    }

    // ── Confirmation email to sender ──
    await resend.emails.send({
      from: "Onigiri Sen <contact@onigirisen.jp>",
      to: email,
      subject: "We received your message — Onigiri Sen",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#2a2a2a">
          <div style="background:#ffefc8;padding:24px 32px;border-radius:12px 12px 0 0">
            <h2 style="margin:0;color:#6f471c">Thank you, ${safeName}!</h2>
          </div>
          <div style="background:#fff9f5;padding:24px 32px;border-radius:0 0 12px 12px;border:1px solid #f0e4d4;border-top:none">
            <p style="line-height:1.75">We've received your message and will get back to you within <strong>2 business days</strong>.</p>
            <p style="line-height:1.75">In the meantime, follow us on Instagram <a href="https://instagram.com/onigirisen.jp" style="color:#ed7e80">@onigirisen.jp</a> for the latest updates.</p>
            <div style="margin-top:24px;padding:16px;background:#fff;border-radius:8px;border:1px solid #f0e4d4;font-size:13px;color:#888">
              <strong style="color:#6f471c">Your message:</strong><br/><br/>
              <em>${safeMessage}</em>
            </div>
            <p style="margin-top:24px;font-size:13px;color:#aaa">— The Onigiri Sen Team<br/><a href="mailto:contact@onigirisen.jp" style="color:#ed7e80">contact@onigirisen.jp</a></p>
          </div>
        </div>
      `,
    });

    console.log(`Contact form success — from: ${email}, subject: ${subject}, ip: ${ip}`);
    return Response.json({ success: true });

  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json({ success: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}