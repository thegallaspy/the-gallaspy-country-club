import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactSubmission = {
  name?: string;
  email?: string;
  phone?: string;
  interest?: string;
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
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY");

      return NextResponse.json(
        {
          error: "Contact email service is not configured.",
        },
        { status: 500 },
      );
    }

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error("Missing Supabase environment variables");

      return NextResponse.json(
        {
          error: "Contact database is not configured.",
        },
        { status: 500 },
      );
    }

    const resend = new Resend(resendApiKey);

    const supabase = createClient(
      supabaseUrl,
      supabaseServiceRoleKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      },
    );

    const body = (await request.json()) as ContactSubmission;

    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const phone = body.phone?.trim() || null;
    const interest = body.interest?.trim();
    const message = body.message?.trim();

    if (!name || !email || !interest || !message) {
      return NextResponse.json(
        {
          error:
            "Please complete your name, email, area of interest, and message.",
        },
        { status: 400 },
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        {
          error: "Please enter a valid email address.",
        },
        { status: 400 },
      );
    }

    if (message.length > 3000) {
      return NextResponse.json(
        {
          error: "Your message is too long.",
        },
        { status: 400 },
      );
    }

    /*
     * Save inquiry before sending email.
     */
    const { data: contactRecord, error: databaseError } =
      await supabase
        .from("contact_inquiries")
        .insert({
          name,
          email,
          phone,
          interest,
          message,
          status: "new",
        })
        .select("id")
        .single();

    if (databaseError) {
      console.error("Contact database error:", databaseError);

      return NextResponse.json(
        {
          error: "Unable to save your inquiry. Please try again.",
        },
        { status: 500 },
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "Not provided");
    const safeInterest = escapeHtml(interest);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

    /*
     * Email #1:
     * Internal notification to The Gallaspy
     */
    const internalEmail = resend.emails.send({
      from: "The Gallaspy <info@thegallaspy.com>",
      to: ["info@thegallaspy.com"],
      replyTo: email,
      subject: `New ${interest} Inquiry — ${name}`,
      html: `
        <div style="background:#F7F4EE;padding:40px 20px;font-family:Arial,sans-serif;color:#10263F;">
          <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #E4DED3;border-radius:18px;overflow:hidden;">

            <div style="background:#10263F;padding:32px;text-align:center;">
              <p style="margin:0;color:#D4AF37;font-size:11px;letter-spacing:3px;text-transform:uppercase;">
                The Gallaspy Development Group, LLC
              </p>

              <h1 style="margin:14px 0 0;color:#ffffff;font-family:Georgia,serif;font-weight:400;">
                New Website Inquiry
              </h1>
            </div>

            <div style="padding:32px;">
              <table style="width:100%;border-collapse:collapse;">
                <tbody>

                  <tr>
                    <td style="padding:10px 0;font-weight:bold;">
                      Name
                    </td>

                    <td style="padding:10px 0;">
                      ${safeName}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:10px 0;font-weight:bold;">
                      Email
                    </td>

                    <td style="padding:10px 0;">
                      ${safeEmail}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:10px 0;font-weight:bold;">
                      Phone
                    </td>

                    <td style="padding:10px 0;">
                      ${safePhone}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:10px 0;font-weight:bold;">
                      Area of Interest
                    </td>

                    <td style="padding:10px 0;">
                      ${safeInterest}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:10px 0;font-weight:bold;">
                      Database Record
                    </td>

                    <td style="padding:10px 0;">
                      ${contactRecord?.id || "Saved"}
                    </td>
                  </tr>

                </tbody>
              </table>

              <div style="margin-top:28px;padding:22px;background:#F7F4EE;border-radius:12px;">
                <p style="margin:0 0 10px;font-weight:bold;">
                  Message
                </p>

                <p style="margin:0;line-height:1.7;">
                  ${safeMessage}
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
    });

    /*
     * Email #2:
     * Confirmation to visitor
     */
    const confirmationEmail = resend.emails.send({
      from: "The Gallaspy <info@thegallaspy.com>",
      to: [email],
      replyTo: "info@thegallaspy.com",
      subject: "We Received Your Gallaspy Inquiry",
      html: `
        <div style="background:#F7F4EE;padding:40px 20px;font-family:Arial,sans-serif;color:#10263F;">
          <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #E4DED3;border-radius:18px;overflow:hidden;">

            <div style="background:#10263F;padding:38px 28px;text-align:center;">
              <p style="margin:0;color:#D4AF37;font-size:11px;letter-spacing:3px;text-transform:uppercase;">
                The Gallaspy
              </p>

              <h1 style="margin:16px 0 0;color:#ffffff;font-family:Georgia,serif;font-weight:400;">
                Thank You for Reaching Out
              </h1>
            </div>

            <div style="padding:34px;">
              <p style="font-size:16px;line-height:1.8;margin-top:0;">
                Hello ${safeName},
              </p>

              <p style="font-size:16px;line-height:1.8;">
                Thank you for contacting
                <strong>The Gallaspy Development Group, LLC.</strong>
              </p>

              <p style="font-size:16px;line-height:1.8;">
                We've received your inquiry regarding
                <strong>${safeInterest}</strong>.
              </p>

              <p style="font-size:16px;line-height:1.8;">
                Your message will be reviewed and routed to the appropriate
                conversation.
              </p>

              <div style="margin-top:28px;padding:22px;background:#F7F4EE;border-left:3px solid #B89146;">
                <p style="margin:0;color:#7B642F;font-size:11px;letter-spacing:2px;text-transform:uppercase;">
                  Your Message
                </p>

                <p style="margin:12px 0 0;line-height:1.7;">
                  ${safeMessage}
                </p>
              </div>

              <p style="margin-top:30px;font-size:16px;line-height:1.8;">
                We appreciate your interest in The Gallaspy and look forward
                to continuing the conversation.
              </p>

              <div style="margin-top:34px;padding-top:22px;border-top:1px solid #E3DDD1;">
                <p style="margin:0;">
                  <strong>The Gallaspy</strong><br />
                  The Gallaspy Development Group, LLC
                </p>

                <p style="font-size:13px;color:#667085;margin-top:8px;">
                  thegallaspy.com
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
    });

    const [internalResult, confirmationResult] = await Promise.all([
      internalEmail,
      confirmationEmail,
    ]);

    if (internalResult.error || confirmationResult.error) {
      console.error("Contact email error:", {
        internal: internalResult.error,
        confirmation: confirmationResult.error,
      });

      return NextResponse.json(
        {
          error:
            "Your inquiry was saved, but one or more emails could not be sent.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry was submitted successfully.",
        recordId: contactRecord?.id,
        internalEmailId: internalResult.data?.id,
        confirmationEmailId: confirmationResult.data?.id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong. Please try again.",
      },
      { status: 500 },
    );
  }
}