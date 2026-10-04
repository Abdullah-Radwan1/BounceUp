"use server";

import { headers } from "next/headers";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_SECONDS = 60 * 60;

export type SendEmailState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: {
    name?: string;
    email?: string;
    company?: string;
    service?: string;
    message?: string;
  };
};

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(100),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(254),
  company: z.string().trim().max(100).optional(),
  service: z.string().trim().min(1, "Service is required.").max(100),
  message: z.string().trim().min(1, "Message is required.").max(5000),
});

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function sendEmail(
  _prevState: SendEmailState,
  formData: FormData,
): Promise<SendEmailState> {
  // Validate form data
  const result = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company") || undefined,
    service: formData.get("service"),
    message: formData.get("message"),
  });

  if (!result.success) {
    return {
      status: "error",
      message: result.error.issues[0]?.message ?? "Invalid form data.",
    };
  }

  const { name, email, company, service, message } = result.data;

  // Get client IP
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");

  const ip = forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";

  // Rate limit: 3 submissions per IP / hour
  const rateLimitKey = `contact-rate-limit:${ip}`;

  try {
    const count = await redis.incr(rateLimitKey);

    if (count === 1) {
      await redis.expire(rateLimitKey, RATE_LIMIT_WINDOW_SECONDS);
    }

    if (count > RATE_LIMIT_MAX) {
      return {
        status: "error",
        message:
          "You've reached the maximum of 3 submissions per hour. Please try again later.",
      };
    }
  } catch (error) {
    console.error("Rate limit error:", error);

    return {
      status: "error",
      message: "Unable to process your request. Please try again.",
    };
  }

  // Escape values before putting them into HTML
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = company ? escapeHtml(company) : null;
  const safeService = escapeHtml(service);
  const safeMessage = escapeHtml(message);

  const toEmail = process.env.CONTACT_EMAIL;

  if (!toEmail) {
    console.error("CONTACT_EMAIL is not configured.");

    return {
      status: "error",
      message: "Unable to send your message. Please try again later.",
    };
  }

  try {
    const { error } = await resend.emails.send({
      from: "BounceUp Contact <onboarding@resend.dev>",
      to: [toEmail],
      replyTo: email,
      subject: `[BounceUp] New inquiry from ${safeName} — ${safeService}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0f172a; color: #f1f5f9; border-radius: 12px;">
          <h1 style="color: #38B6FF; margin-bottom: 24px;">
            New Contact Inquiry
          </h1>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #94a3b8; width: 130px;">Name</td>
              <td style="padding: 10px 0; font-weight: bold;">
                ${safeName}
              </td>
            </tr>

            <tr>
              <td style="padding: 10px 0; color: #94a3b8;">Email</td>
              <td style="padding: 10px 0;">
                <a href="mailto:${safeEmail}" style="color: #38B6FF;">
                  ${safeEmail}
                </a>
              </td>
            </tr>

            ${
              safeCompany
                ? `
            <tr>
              <td style="padding: 10px 0; color: #94a3b8;">Company</td>
              <td style="padding: 10px 0;">${safeCompany}</td>
            </tr>
            `
                : ""
            }

            <tr>
              <td style="padding: 10px 0; color: #94a3b8;">Service</td>
              <td style="padding: 10px 0;">
                <span style="background: #FFC837; color: #111827; padding: 4px 12px; border-radius: 20px; font-size: 14px;">
                  ${safeService}
                </span>
              </td>
            </tr>

            <tr>
              <td style="padding: 10px 0; color: #94a3b8; vertical-align: top;">
                Message
              </td>
              <td style="padding: 10px 0; white-space: pre-wrap;">
                ${safeMessage}
              </td>
            </tr>
          </table>

          <hr style="border: none; border-top: 1px solid #1e293b; margin: 24px 0;" />

          <p style="color: #64748b; font-size: 13px;">
            This email was sent via the BounceUp contact form.
            Reply directly to respond to ${safeName}.
          </p>

          <p style="color: #FFC837; font-size: 12px;">
            BounceUp
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return {
        status: "error",
        message: "Failed to send message. Please try again.",
      };
    }

    return {
      status: "success",
      message: "Message sent successfully!",
    };
  } catch (error) {
    console.error("Email error:", error);

    return {
      status: "error",
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
