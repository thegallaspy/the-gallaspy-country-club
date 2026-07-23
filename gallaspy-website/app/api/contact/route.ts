import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactSubmission = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  organization?: string;
  city?: string;
  state?: string;
  interest?: string;
  preferredContact?: string;
  message?: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error("RESEND_API_KEY is missing.");

      return NextResponse.json(
        { message: "Email service is not configured." },
        { status: 500 },
      );
    }

    const ownerEmail =
      process.env.CONTACT_RECIPIENT_EMAIL ||
      process.env.CAREERS_TO_EMAIL ||
      "TheGallaspy@gmail.com";

    const fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      process.env.CAREERS_FROM_EMAIL ||
      "The Gallaspy <onboarding@resend.dev>";

    const resend = new Resend(resendApiKey);

    const body = (await request.json()) as ContactSubmission;

    const firstName = body.firstName?.trim() ?? "";
    const lastName = body.lastName?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const phone = body.phone?.trim() || "Not provided";
    const organization = body.organization?.trim() || "Not provided";
    const city = body.city?.trim() || "Not provided";
    const state = body.state?.trim() || "Not provided";
    const interest = body.interest?.trim() ?? "";
    const preferredContact = body.preferredContact?.trim() || "Email";
    const message = body.message?.trim() ?? "";

    if (!firstName || !lastName || !email || !interest || !message) {
      return NextResponse.json(
        {
          message:
            "Please complete your name, email, area of interest, and message.",
        },
        { status: 400 },
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (message.length > 3000) {
      return NextResponse.json(
        { message: "Your message is too long." },
        { status: 400 },
      );
    }

    const fullName = `${firstName} ${lastName}`;

    const safeFullName = escapeHtml(fullName);
    const safeFirstName = escapeHtml(firstName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeOrganization = escapeHtml(organization);
    const safeCity = escapeHtml(city);
    const safeState = escapeHtml(state);
    const safeInterest = escapeHtml(interest);
    const safePreferredContact = escapeHtml(preferredContact);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

    const notificationResult = await resend.emails.send({
      from: fromEmail,
      to: [ownerEmail],
      replyTo: email,
      subject: `New ${interest} Inquiry — ${fullName}`,
      html: `
        <div style="background:#f7f4ee;padding:40px 20px;font-family:Arial,sans-serif;color:#10263f;">
          <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e4ded3;border-radius:18px;overflow:hidden;">
            <div style="background:#10263f;padding:32px;text-align:center;">
              <p style="margin:0;color:#d4af37;font-size:12px;letter-spacing:3px;text-transform:uppercase;">
                The Gallaspy Development Group
              </p>

              <h1 style="margin:14px 0 0;color:#ffffff;font-family:Georgia,serif;font-weight:400;">
                New Website Inquiry
              </h1>
            </div>

            <div style="padding:32px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:10px 0;font-weight:bold;">Name</td>
                  <td style="padding:10px 0;">${safeFullName}</td>
                </tr>

                <tr>
                  <td style="padding:10px 0;font-weight:bold;">Email</td>
                  <td style="padding:10px 0;">${safeEmail}</td>
                </tr>

                <tr>
                  <td style="padding:10px 0;font-weight:bold;">Phone</td>
                  <td style="padding:10px 0;">${safePhone}</td>
                </tr>

                <tr>
                  <td style="padding:10px 0;font-weight:bold;">Organization</td>
                  <td style="padding:10px 0;">${safeOrganization}</td>
                </tr>

                <tr>
                  <td style="padding:10px 0;font-weight:bold;">Location</td>
                  <td style="padding:10px 0;">${safeCity}, ${safeState}</td>
                </tr>

                <tr>
                  <td style="padding:10px 0;font-weight:bold;">Interest</td>
                  <td style="padding:10px 0;">${safeInterest}</td>
                </tr>

                <tr>
                  <td style="padding:10px 0;font-weight:bold;">
                    Preferred Contact
                  </td>
                  <td style="padding:10px 0;">${safePreferredContact}</td>
                </tr>
              </table>

              <div style="margin-top:28px;padding:22px;background:#f7f4ee;border-radius:12px;">
                <p style="margin:0 0 10px;font-weight:bold;">Message</p>
                <p style="margin:0;line-height:1.7;">${safeMessage}</p>
              </div>
            </div>
          </div>
        </div>
      `,
    });

    if (notificationResult.error) {
      console.error(
        "Contact notification error:",
        notificationResult.error,
      );

      return NextResponse.json(
        { message: "Your inquiry could not be sent. Please try again." },
        { status: 500 },
      );
    }

    const confirmationResult = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: "We Received Your Gallaspy Inquiry",
      html: `
        <div style="background:#f7f4ee;padding:40px 20px;font-family:Arial,sans-serif;color:#10263f;">
          <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e4ded3;border-radius:18px;overflow:hidden;">
            <div style="background:#10263f;padding:38px 28px;text-align:center;">
              <p style="margin:0;color:#d4af37;font-size:12px;letter-spacing:3px;text-transform:uppercase;">
                A Legacy in the Making
              </p>

              <h1 style="margin:16px 0 0;color:#ffffff;font-family:Georgia,serif;font-weight:400;">
                Thank You, ${safeFirstName}
              </h1>
            </div>

            <div style="padding:34px;">
              <p style="font-size:16px;line-height:1.8;margin-top:0;">
                We received your inquiry regarding
                <strong>${safeInterest}</strong>.
              </p>

              <p style="font-size:16px;line-height:1.8;">
                A representative of The Gallaspy Development Group will review
                your message and follow up as soon as possible.
              </p>

              <div style="margin-top:28px;padding:22px;background:#f7f4ee;border-radius:12px;">
                <p style="margin:0;color:#7b642f;font-size:12px;letter-spacing:2px;text-transform:uppercase;">
                  Your Message
                </p>

                <p style="margin:12px 0 0;line-height:1.7;">
                  ${safeMessage}
                </p>
              </div>

              <p style="margin-top:30px;font-size:16px;line-height:1.8;">
                Sincerely,<br />
                <strong>The Gallaspy Development Group</strong><br />
                The Gallaspy Golf &amp; Country Club
              </p>
            </div>
          </div>
        </div>
      `,
    });

    if (confirmationResult.error) {
      console.error(
        "Contact confirmation error:",
        confirmationResult.error,
      );
    }

    return NextResponse.json(
      { message: "Your inquiry was submitted successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}