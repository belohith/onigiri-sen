import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

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

function sanitize(str: string): string {
  return str
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
}

const TO = process.env.CONTACT_TO_EMAIL || "";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";

    if (!checkRateLimit(ip)) {
      return Response.json({ success: false, error: "Too many submissions. Please wait a few minutes." }, { status: 429 });
    }

    const body = await req.json();
    const { name, email, phone, position, coverNote, honeypot } = body;

    if (honeypot) return Response.json({ success: true });

    if (!name?.trim() || !email?.trim() || !position?.trim()) {
      return Response.json({ success: false, error: "Please fill out all required fields." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ success: false, error: "Invalid email address." }, { status: 400 });
    }

    if (name.length > 100) return Response.json({ success: false, error: "Name is too long." }, { status: 400 });
    if (coverNote && coverNote.length > 5000) return Response.json({ success: false, error: "Cover note is too long (max 5000 characters)." }, { status: 400 });

    const safeName     = sanitize(name.trim());
    const safeEmail    = sanitize(email.trim());
    const safePhone    = sanitize((phone || "—").trim());
    const safePosition = sanitize(position.trim());
    const safeCover    = sanitize((coverNote || "—").trim()).replace(/\n/g, "<br>");

    // Team notification email
    const teamEmail = await resend.emails.send({
      from: "Onigiri Sen <contact@onigirisen.jp>",
      to: TO,
      replyTo: email,
      subject: `[Careers] New Application — ${safePosition} — ${safeName}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#2a2a2a">
          <div style="background:#ffefc8;padding:24px 32px;border-radius:12px 12px 0 0">
            <h2 style="margin:0;color:#6f471c;font-size:20px">New Job Application</h2>
          </div>
          <div style="background:#fff9f5;padding:24px 32px;border-radius:0 0 12px 12px;border:1px solid #f0e4d4;border-top:none">
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr><td style="padding:8px 0;color:#888;width:140px">Name</td><td style="padding:8px 0;font-weight:600">${safeName}</td></tr>
              <tr><td style="padding:8px 0;color:#888">Email</td><td style="padding:8px 0"><a href="mailto:${safeEmail}" style="color:#ed7e80">${safeEmail}</a></td></tr>
              <tr><td style="padding:8px 0;color:#888">Phone</td><td style="padding:8px 0">${safePhone}</td></tr>
              <tr><td style="padding:8px 0;color:#888">Position</td><td style="padding:8px 0;font-weight:700;color:#6f471c">${safePosition}</td></tr>
            </table>
            <div style="margin-top:20px;padding:16px;background:#fff;border-radius:8px;border:1px solid #f0e4d4">
              <div style="color:#888;font-size:12px;margin-bottom:8px">COVER NOTE</div>
              <div style="line-height:1.75;font-size:14px">${safeCover}</div>
            </div>
            <div style="margin-top:16px;font-size:12px;color:#bbb">
              Submitted from IP: ${ip} · ${new Date().toUTCString()}
            </div>
          </div>
        </div>
      `,
    });

    if (teamEmail.error) {
      return Response.json({ success: false, error: "Failed to send. Please try again." }, { status: 422 });
    }

    // Confirmation to applicant
    await resend.emails.send({
      from: "Onigiri Sen <contact@onigirisen.jp>",
      to: email,
      subject: "We received your application — Onigiri Sen",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#2a2a2a">
          <div style="background:#ffefc8;padding:24px 32px;border-radius:12px 12px 0 0">
            <h2 style="margin:0;color:#6f471c">Thank you, ${safeName}!</h2>
          </div>
          <div style="background:#fff9f5;padding:24px 32px;border-radius:0 0 12px 12px;border:1px solid #f0e4d4;border-top:none">
            <p style="line-height:1.75">We've received your application for <strong>${safePosition}</strong> and will review it shortly.</p>
            <p style="line-height:1.75">We'll be in touch if there's a good fit. In the meantime, follow us on Instagram <a href="https://instagram.com/onigirisen.jp" style="color:#ed7e80">@onigirisen.jp</a> for updates.</p>
            <p style="margin-top:24px;font-size:13px;color:#aaa">— The Onigiri Sen Team<br/><a href="mailto:contact@onigirisen.jp" style="color:#ed7e80">contact@onigirisen.jp</a></p>
          </div>
        </div>
      `,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error("Careers form error:", error);
    return Response.json({ success: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}