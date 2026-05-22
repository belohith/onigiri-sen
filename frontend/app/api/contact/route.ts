import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      subject,
      heardFrom,
      message,
    } = body;

    const data =
      await resend.emails.send({
        from:
          "Onigiri Sen <onboarding@resend.dev>",

        to:
          process.env
            .CONTACT_TO_EMAIL || "",

        replyTo: email,

        subject: `[Contact Form] ${subject}`,

        html: `
          <h2>New Contact Form Submission</h2>

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Phone:</strong> ${phone}</p>

          <p><strong>Subject:</strong> ${subject}</p>

          <p><strong>How They Heard About Us:</strong> ${heardFrom}</p>

          <hr />

          <p><strong>Message:</strong></p>

          <p>${message}</p>
        `,
      });

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error,
      },
      {
        status: 500,
      }
    );
  }
}