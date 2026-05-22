import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = await resend.emails.send({
      from: "Onigiri Sen <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL || "",
      replyTo: body.email,

      subject: `[Wholesale/Catering] ${body.inquiryType || "New Inquiry"}`,

      html: `
        <h2>New Wholesale / Catering Inquiry</h2>

        <p><strong>Inquiry Type:</strong> ${body.inquiryType || ""}</p>
        <p><strong>Company:</strong> ${body.company || ""}</p>

        <hr />

        <h3>Inquiry Details</h3>
        <p><strong>Business Type:</strong> ${body.businessType || ""}</p>
        <p><strong>Service Area:</strong> ${body.serviceArea || ""}</p>
        <p><strong>Weekly Volume:</strong> ${body.weeklyVolume || ""}</p>

        <p><strong>Event Date:</strong> ${body.eventDate || ""}</p>
        <p><strong>Guests:</strong> ${body.guests || ""}</p>
        <p><strong>Venue:</strong> ${body.venue || ""}</p>

        <hr />

        <h3>Contact Details</h3>
        <p><strong>Name:</strong> ${body.name || ""}</p>
        <p><strong>Email:</strong> ${body.email || ""}</p>
        <p><strong>Phone:</strong> ${body.phone || ""}</p>
        <p><strong>Heard From:</strong> ${body.heardFrom || ""}</p>

        <hr />

        <p><strong>Notes:</strong></p>
        <p>${body.notes || ""}</p>
      `,
    });

    return Response.json({ success: true, data });
  } catch (error) {
    console.error(error);

    return Response.json(
      { success: false, error },
      { status: 500 }
    );
  }
}