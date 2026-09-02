import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type DispatchSubmission = {
  firstName?: string;
  email?: string;
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

    if (!resendApiKey || !supabaseUrl || !supabaseServiceRoleKey) {
      console.error("Missing Dispatch environment variables");

      return NextResponse.json(
        { error: "The Club Dispatch is temporarily unavailable." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as DispatchSubmission;

    const firstName = body.firstName?.trim();
    const email = body.email?.trim().toLowerCase();

    if (!firstName || !email) {
      return NextResponse.json(
        { error: "Please enter your first name and email address." },
        { status: 400 },
      );
    }

    if (firstName.length > 100) {
      return NextResponse.json(
        { error: "Please enter a valid first name." },
        { status: 400 },
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

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

    const { data: subscriber, error: databaseError } =
      await supabase
        .from("club_dispatch_subscribers")
        .insert({
          first_name: firstName,
          email,
          status: "subscribed",
          source: "thegallaspy.com",
        })
        .select("id")
        .single();

    if (databaseError) {
      if (databaseError.code === "23505") {
        return NextResponse.json(
          {
            success: true,
            alreadySubscribed: true,
            message: "You're already on The Club Dispatch list.",
          },
          { status: 200 },
        );
      }

      console.error("Dispatch database error:", databaseError);

      return NextResponse.json(
        { error: "Unable to join The Club Dispatch. Please try again." },
        { status: 500 },
      );
    }

    const resend = new Resend(resendApiKey);

    const safeFirstName = escapeHtml(firstName);
    const safeEmail = escapeHtml(email);

    const internalEmail = resend.emails.send({
      from: "The Gallaspy <info@thegallaspy.com>",
      to: ["info@thegallaspy.com"],
      replyTo: email,
      subject: `New Club Dispatch Subscriber — ${firstName}`,
      html: `
        <div style="background:#F7F4EE;padding:40px 20px;font-family:Arial,sans-serif;color:#10263F;">
          <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #E4DED3;">
            <div style="background:#10263F;padding:32px;text-align:center;">
              <p style="margin:0;color:#D7B56D;font-size:11px;letter-spacing:3px;text-transform:uppercase;">
                The Gallaspy
              </p>
              <h1 style="margin:14px 0 0;color:#ffffff;font-family:Georgia,serif;font-weight:400;">
                New Club Dispatch Subscriber
              </h1>
            </div>

            <div style="padding:32px;">
              <p style="margin:0 0 12px;"><strong>Name:</strong> ${safeFirstName}</p>
              <p style="margin:0 0 12px;"><strong>Email:</strong> ${safeEmail}</p>
              <p style="margin:0;"><strong>Subscriber ID:</strong> ${subscriber?.id || "Saved"}</p>
            </div>
          </div>
        </div>
      `,
    });

    const confirmationEmail = resend.emails.send({
      from: "The Gallaspy <info@thegallaspy.com>",
      to: [email],
      replyTo: "info@thegallaspy.com",
      subject: "Welcome to The Club Dispatch",
      html: `
        <div style="background:#F7F4EE;padding:40px 20px;font-family:Arial,sans-serif;color:#10263F;">
          <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #E4DED3;">
            <div style="background:#10263F;padding:38px 28px;text-align:center;">
              <p style="margin:0;color:#D7B56D;font-size:11px;letter-spacing:3px;text-transform:uppercase;">
                The Gallaspy
              </p>

              <h1 style="margin:16px 0 0;color:#ffffff;font-family:Georgia,serif;font-weight:400;">
                Welcome to The Club Dispatch
              </h1>
            </div>

            <div style="padding:34px;">
              <p style="font-size:16px;line-height:1.8;margin-top:0;">
                ${safeFirstName},
              </p>

              <p style="font-size:16px;line-height:1.8;">
                You're now connected to The Club Dispatch.
              </p>

              <p style="font-size:16px;line-height:1.8;">
                We'll keep you close to upcoming Gallaspy Rounds,
                competition, gatherings, club announcements, and the
                moments shaping The Gallaspy as the community grows.
              </p>

              <div style="margin-top:28px;padding:22px;background:#F7F4EE;border-left:3px solid #B89146;">
                <p style="margin:0;color:#7B642F;font-size:11px;letter-spacing:2px;text-transform:uppercase;">
                  Play. Compete. Gather.
                </p>

                <p style="margin:12px 0 0;line-height:1.7;">
                  When something is happening at The Gallaspy,
                  The Dispatch is where you'll hear about it.
                </p>
              </div>

              <div style="margin-top:34px;padding-top:22px;border-top:1px solid #E3DDD1;">
                <p style="margin:0;">
                  <strong>The Gallaspy</strong><br />
                  Georgia · Est. 2026
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
      console.error("Dispatch email error:", {
        internal: internalResult.error,
        confirmation: confirmationResult.error,
      });

      return NextResponse.json({
        success: true,
        warning:
          "You're subscribed, but the confirmation email could not be delivered.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Welcome to The Club Dispatch.",
    });
  } catch (error) {
    console.error("Dispatch subscription error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
