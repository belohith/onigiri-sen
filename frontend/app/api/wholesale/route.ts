import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Rate limiter: 10 per 5 min per IP ──
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 5 * 60 * 1000;

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

// ── Sanitize HTML ──
function sanitize(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// ── Spam keywords ──
const spamKeywords = ["casino", "crypto", "bitcoin", "forex", "viagra", "click here", "buy now", "free money"];

export async function POST(req: Request) {
  try {
    // Rate limit
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
    const {
      inquiryType, company, businessType, serviceArea, weeklyVolume,
      eventDate, guests, venue,
      name, email, phone, heardFrom, notes,
      honeypot,
    } = body;

    // Bot detection
    if (honeypot) return Response.json({ success: true });

    // Required fields
    if (!name?.trim() || !email?.trim() || !phone?.trim() || !company?.trim() || !inquiryType) {
      return Response.json({ success: false, error: "Please fill out all required fields." }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ success: false, error: "Invalid email address." }, { status: 400 });
    }

    // Phone validation — exactly 10 local digits
    const phoneDigits = phone.replace(/[^\d]/g, "");
    const localDigits = phoneDigits.length > 10 ? phoneDigits.slice(phoneDigits.length - 10) : phoneDigits;
    if (localDigits.length !== 10) {
      return Response.json({ success: false, error: "Please enter a valid 10-digit phone number." }, { status: 400 });
    }

    // Spam check
    const combinedText = `${name} ${company} ${notes || ""}`.toLowerCase();
    if (spamKeywords.some((kw) => combinedText.includes(kw))) {
      return Response.json({ success: true });
    }

    // Sanitize
    const s = (v: string) => sanitize((v || "").trim());
    const safeName     = s(name);
    const safeEmail    = s(email);
    const safePhone    = s(phone);
    const safeCompany  = s(company);
    const safeNotes    = s(notes).replace(/\n/g, "<br>");

    // Build details section based on inquiry type
    const detailsHtml = inquiryType === "wholesale" ? `
      <p><strong>Business Type:</strong> ${s(businessType)}</p>
      <p><strong>Service Area:</strong> ${s(serviceArea)}</p>
      <p><strong>Weekly Volume:</strong> ${s(weeklyVolume)}</p>
    ` : `
      <p><strong>Event Date:</strong> ${s(eventDate)}</p>
      <p><strong>Estimated Guests:</strong> ${s(guests)}</p>
      <p><strong>Venue:</strong> ${s(venue)}</p>
    `;

    // Email to team
    const teamEmail = await resend.emails.send({
      from: "Onigiri Sen <contact@onigirisen.jp>",
      to: process.env.CONTACT_TO_EMAIL || "",
      ...(email ? { replyTo: email } : {}),
      subject: `[Wholesale] ${inquiryType === "wholesale" ? "Partnership" : "Catering"} — ${safeCompany}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#2a2a2a">
          <div style="background:#ffefc8;padding:24px 32px;border-radius:12px 12px 0 0">
            <h2 style="margin:0;color:#6f471c;font-size:20px">New ${inquiryType === "wholesale" ? "Wholesale" : "Catering"} Inquiry</h2>
          </div>
          <div style="background:#fff9f5;padding:24px 32px;border-radius:0 0 12px 12px;border:1px solid #f0e4d4;border-top:none">
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr><td style="padding:8px 0;color:#888;width:160px">Company</td><td style="padding:8px 0;font-weight:600">${safeCompany}</td></tr>
              <tr><td style="padding:8px 0;color:#888">Inquiry Type</td><td style="padding:8px 0">${inquiryType === "wholesale" ? "Regular Wholesale / Partnership" : "Single Catering / Event"}</td></tr>
            </table>
            <div style="margin-top:16px;padding:16px;background:#fff;border-radius:8px;border:1px solid #f0e4d4;font-size:14px">
              <strong style="color:#6f471c">Inquiry Details</strong><br/><br/>
              ${detailsHtml}
            </div>
            <table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:16px">
              <tr><td style="padding:8px 0;color:#888;width:160px">Name</td><td style="padding:8px 0;font-weight:600">${safeName}</td></tr>
              <tr><td style="padding:8px 0;color:#888">Email</td><td style="padding:8px 0"><a href="mailto:${safeEmail}" style="color:#ed7e80">${safeEmail}</a></td></tr>
              <tr><td style="padding:8px 0;color:#888">Phone</td><td style="padding:8px 0">${safePhone}</td></tr>
              <tr><td style="padding:8px 0;color:#888">How they heard</td><td style="padding:8px 0">${s(heardFrom)}</td></tr>
            </table>
            ${safeNotes ? `
            <div style="margin-top:16px;padding:16px;background:#fff;border-radius:8px;border:1px solid #f0e4d4">
              <div style="color:#888;font-size:12px;margin-bottom:8px">NOTES</div>
              <div style="line-height:1.75;font-size:14px">${safeNotes}</div>
            </div>` : ""}
            <div style="margin-top:16px;font-size:12px;color:#bbb">
              Submitted from IP: ${ip} · ${new Date().toUTCString()}
            </div>
          </div>
        </div>
      `,
    });

    if (teamEmail.error) {
      console.error("Wholesale team email error:", teamEmail.error);
      return Response.json({ success: false, error: "Failed to send. Please try again." }, { status: 422 });
    }

    // Confirmation to sender
    await resend.emails.send({
      from: "Onigiri Sen <contact@onigirisen.jp>",
      to: email,
      subject: "Your wholesale inquiry — Onigiri Sen",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#2a2a2a">
          <div style="background:#ffefc8;padding:24px 32px;border-radius:12px 12px 0 0">
            <h2 style="margin:0;color:#6f471c">Thank you, ${safeName}!</h2>
          </div>
          <div style="background:#fff9f5;padding:24px 32px;border-radius:0 0 12px 12px;border:1px solid #f0e4d4;border-top:none">
            <p style="line-height:1.75">We've received your <strong>${inquiryType === "wholesale" ? "wholesale partnership" : "catering"}</strong> inquiry from <strong>${safeCompany}</strong> and will be in touch within <strong>2 business days</strong>.</p>
            <p style="line-height:1.75">We look forward to exploring a partnership with you.</p>
            <p style="margin-top:24px;font-size:13px;color:#aaa">— The Onigiri Sen Team<br/><a href="mailto:contact@onigirisen.jp" style="color:#ed7e80">contact@onigirisen.jp</a></p>
          </div>
        </div>
      `,
    });

    console.log(`Wholesale form success — from: ${email}, company: ${company}, type: ${inquiryType}, ip: ${ip}`);
    return Response.json({ success: true });

  } catch (error) {
    console.error("Wholesale form error:", error);
    return Response.json({ success: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}