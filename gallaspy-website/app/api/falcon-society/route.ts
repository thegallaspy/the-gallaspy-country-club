import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!resendApiKey || !supabaseUrl || !supabaseServiceRoleKey) {
      console.error("Falcon Society API configuration missing.");

      return NextResponse.json(
        {
          success: false,
          message: "Application service is not configured.",
        },
        { status: 500 }
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
      }
    );

    const data = await request.json();

    const firstName = String(data.firstName || "").trim();
    const lastName = String(data.lastName || "").trim();
    const email = String(data.email || "").trim().toLowerCase();
    const phone = String(data.phone || "").trim();
    const city = String(data.city || "").trim();
    const state = String(data.state || "").trim();
    const membershipInterest = String(
      data.membershipInterest || ""
    ).trim();

    const golfInterest =
      String(data.golfInterest || "").trim() || null;

    const householdInterest =
      String(data.householdInterest || "").trim() || null;

    const referralSource =
      String(data.referralSource || "").trim() || null;

    const comments =
      String(data.comments || "").trim() || null;

    const consent = data.consent === true;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !city ||
      !state ||
      !membershipInterest
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please authorize communication before submitting.",
        },
        { status: 400 }
      );
    }

    const { data: existing, error: lookupError } =
      await supabase
        .from("falcon_society_applications")
        .select("id, application_status")
        .ilike("email", email)
        .in("application_status", [
          "pending",
          "under_review",
          "confirmed",
        ])
        .limit(1)
        .maybeSingle();

    if (lookupError) {
      console.error("Falcon Society lookup error:", lookupError);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to process application.",
        },
        { status: 500 }
      );
    }

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message:
            existing.application_status === "confirmed"
              ? "This email is already associated with a confirmed Falcon Society participant."
              : "An active Falcon Society application already exists for this email address.",
        },
        { status: 409 }
      );
    }

    const { data: application, error: insertError } =
      await supabase
        .from("falcon_society_applications")
        .insert({
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          city,
          state,
          membership_interest: membershipInterest,
          golf_interest: golfInterest,
          household_interest: householdInterest,
          referral_source: referralSource,
          comments,
          consent,
          application_status: "pending",
        })
        .select("id")
        .single();

    if (insertError) {
      console.error("Falcon Society insert error:", insertError);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to save your application.",
        },
        { status: 500 }
      );
    }

    const internalEmail = resend.emails.send({
      from: "The Gallaspy <info@thegallaspy.com>",
      to: ["info@thegallaspy.com"],
      replyTo: email,
      subject: `New Falcon Society Application — ${firstName} ${lastName}`,
      html: `
        <h2>New Falcon Society Application</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Location:</strong> ${city}, ${state}</p>
        <p><strong>Founding Community Interest:</strong> ${membershipInterest}</p>
        <p><strong>Golf Interest:</strong> ${golfInterest || "Not provided"}</p>
        <p><strong>Household Interest:</strong> ${householdInterest || "Not provided"}</p>
        <p><strong>Referral:</strong> ${referralSource || "Not provided"}</p>
        <p><strong>Comments:</strong> ${comments || "Not provided"}</p>
        <p><strong>Status:</strong> Pending review</p>
        <p><strong>Application ID:</strong> ${application.id}</p>
      `,
    });

    const confirmationEmail = resend.emails.send({
      from: "The Gallaspy <info@thegallaspy.com>",
      to: [email],
      replyTo: "info@thegallaspy.com",
      subject: "Your Falcon Society Application Has Been Received",
      html: `
        <h2>The Falcon Society</h2>
        <p>Hello ${firstName},</p>

        <p>
          Thank you for applying to be considered for the Falcon Society,
          the Founding 100 of The Gallaspy.
        </p>

        <p>
          Your application has been received and will be reviewed before
          any Falcon Society designation is confirmed.
        </p>

        <p>
          Submission does not guarantee acceptance into the Falcon Society,
          reserve a Founding 100 position, create a financial obligation,
          or represent an offer of membership, ownership, equity, or future
          club rights.
        </p>

        <p>
          We appreciate your interest in becoming part of The Gallaspy's
          opening chapter.
        </p>

        <p>
          The Gallaspy<br />
          The Gallaspy Development Group, LLC
        </p>
      `,
    });

    const [internalResult, confirmationResult] =
      await Promise.all([
        internalEmail,
        confirmationEmail,
      ]);

    if (internalResult.error || confirmationResult.error) {
      console.error("Falcon Society email error:", {
        internal: internalResult.error,
        confirmation: confirmationResult.error,
      });

      return NextResponse.json(
        {
          success: false,
          saved: true,
          message:
            "Your application was saved, but a confirmation email could not be sent.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Your Falcon Society application has been received for consideration.",
    });
  } catch (error) {
    console.error("Falcon Society API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}
