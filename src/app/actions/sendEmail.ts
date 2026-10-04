"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type SendEmailState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function sendEmail(
  _prevState: SendEmailState,
  formData: FormData,
): Promise<SendEmailState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const company = formData.get("company") as string | null;
  const service = formData.get("service") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !service || !message) {
    return { status: "error", message: "Please fill in all required fields." };
  }

  const toEmail = process.env.CONTACT_EMAIL ?? "your@gmail.com";

  try {
    const { error } = await resend.emails.send({
      from: "BounceUp Contact <onboarding@resend.dev>",
      to: [toEmail],
      replyTo: email,
      subject: `[BounceUp] New inquiry from ${name} — ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0f172a; color: #f1f5f9; border-radius: 12px;">
          <h1 style="color: #a78bfa; margin-bottom: 24px;">New Contact Inquiry</h1>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #94a3b8; width: 130px; vertical-align: top;">Name</td>
              <td style="padding: 10px 0; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #94a3b8; vertical-align: top;">Email</td>
              <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #a78bfa;">${email}</a></td>
            </tr>
            ${
              company
                ? `<tr>
              <td style="padding: 10px 0; color: #94a3b8; vertical-align: top;">Company</td>
              <td style="padding: 10px 0;">${company}</td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding: 10px 0; color: #94a3b8; vertical-align: top;">Service</td>
              <td style="padding: 10px 0;">
                <span style="background: #312e81; color: #a78bfa; padding: 4px 12px; border-radius: 20px; font-size: 14px;">
                  ${service}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #94a3b8; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>

          <hr style="border: none; border-top: 1px solid #1e293b; margin: 24px 0;" />
          <p style="color: #475569; font-size: 13px;">
            This email was sent via the BounceUp contact form. Reply directly to respond to ${name}.
          </p>
        </div>
      `,
    });

    if (error) {
      return {
        status: "error",
        message: "Failed to send message. Please try again.",
      };
    }

    return { status: "success", message: "Message sent successfully!" };
  } catch (err) {
    return {
      status: "error",
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
