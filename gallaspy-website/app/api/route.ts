import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Resend } from "resend";

type MembershipSubmission = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  primaryInterest?: string;
  golfInterest?: string;
  householdInterest?: string;
  preferredCommunication?: string;
  message?: string;
};

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
          success: false,
          message: "Membership interest email service is not configured.",
        },
        { status: 500 },
      );
    }

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error("Missing Supabase environment variables");

      return NextResponse.json(
        {
          success: false,
          message: "Membership interest database is not configured.",
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

    const body = (await request.json()) as MembershipSubmission;

    const firstName = body.firstName?.trim();
    const lastName = body.lastName?.trim();
    const email = body.email?.trim().toLowerCase();
    const phone = body.phone?.trim() || null;
    const city = body.city?.trim() || null;
    const state = body.state?.trim() || null;
    const primaryInterest = body.primaryInterest?.trim();
    const golfInterest = body.golfInterest?.trim() || null;
    const householdInterest = body.householdInterest?.trim() || null;
    const preferredCommunication =
      body.preferredCommunication?.trim() || null;
    const message = body.message?.trim() || null;

    if (!firstName || !lastName || !email || !primaryInterest) {
      return NextResponse.json(
        {
          success: false,
          message:
            "First name, last name, email, and primary interest are required.",
        },
        { status: 400 },
      );
    }

    const fullName = `${firstName} ${lastName}`;

    // Save submission to Supabase
    const { data: membershipRecord, error: databaseError } =
      await supabase
        .from("membership_interests")
        .insert({
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          city,
          state,
          primary_interest: primaryInterest,
          golf_interest: golfInterest,
          household_interest: householdInterest,
          preferred_communication: preferredCommunication,
          message,
          status: "new",
        })
        .select("id")
        .single();

    if (databaseError) {
      console.error("Membership interest database error:", databaseError);

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to save your membership interest. Please try again.",
        },
        { status: 500 },
      );
    }

    // Internal notification email
    const internalEmail = resend.emails.send({
      from: "The Gallaspy <info@thegallaspy.com>",
      to: ["info@thegallaspy.com"],
      replyTo: email,
      subject: `New Membership Interest — ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #10263F; line-height: 1.7; max-width: 680px; margin: 0 auto;">
          <div style="border-bottom: 3px solid #B89146; padding-bottom: 20px;">
            <p style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #B89146; margin: 0;">
              The Gallaspy Golf & Country Club
            </p>

            <h1 style="font-size: 28px; margin: 8px 0 0;">
              New Membership Interest
            </h1>
          </div>

          <p style="margin-top: 28px;">
            A new person has joined the future membership interest list.
          </p>

          <table style="width: 100%; border-collapse: collapse; margin-top: 24px;">
            <tbody>
              <tr>
                <td style="padding: 10px 0;"><strong>Name</strong></td>
                <td style="padding: 10px 0;">${fullName}</td>
              </tr>

              <tr>
                <td style="padding: 10px 0;"><strong>Email</strong></td>
                <td style="padding: 10px 0;">${email}</td>
              </tr>

              <tr>
                <td style="padding: 10px 0;"><strong>Phone</strong></td>
                <td style="padding: 10px 0;">${phone || "Not provided"}</td>
              </tr>

              <tr>
                <td style="padding: 10px 0;"><strong>City</strong></td>
                <td style="padding: 10px 0;">${city || "Not provided"}</td>
              </tr>

              <tr>
                <td style="padding: 10px 0;"><strong>State</strong></td>
                <td style="padding: 10px 0;">${state || "Not provided"}</td>
              </tr>

              <tr>
                <td style="padding: 10px 0;"><strong>Primary Interest</strong></td>
                <td style="padding: 10px 0;">${primaryInterest}</td>
              </tr>

              <tr>
                <td style="padding: 10px 0;"><strong>Golf Interest</strong></td>
                <td style="padding: 10px 0;">${
                  golfInterest || "Not provided"
                }</td>
              </tr>

              <tr>
                <td style="padding: 10px 0;"><strong>Household Interest</strong></td>
                <td style="padding: 10px 0;">${
                  householdInterest || "Not provided"
                }</td>
              </tr>

              <tr>
                <td style="padding: 10px 0;"><strong>Preferred Communication</strong></td>
                <td style="padding: 10px 0;">${
                  preferredCommunication || "Not provided"
                }</td>
              </tr>

              <tr>
                <td style="padding: 10px 0;"><strong>Database Record</strong></td>
                <td style="padding: 10px 0;">${
                  membershipRecord?.id || "Saved"
                }</td>
              </tr>
            </tbody>
          </table>

          <div style="margin-top: 24px;">
            <strong>Additional Information</strong>
            <p>${message || "None"}</p>
          </div>
        </div>
      `,
    });

    // Confirmation email to interested member
    const confirmationEmail = resend.emails.send({
      from: "The Gallaspy <info@thegallaspy.com>",
      to: [email],
      replyTo: "info@thegallaspy.com",
      subject: "Thank You for Your Interest in The Gallaspy",
      html: `
        <div style="font-family: Arial, sans-serif; color: #10263F; line-height: 1.8; max-width: 640px; margin: 0 auto; padding: 30px 20px;">
          <div style="border-bottom: 3px solid #B89146; padding-bottom: 22px;">
            <p style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #B89146; margin: 0;">
              The Gallaspy Golf & Country Club
            </p>

            <h1 style="font-size: 32px; line-height: 1.15; margin: 10px 0 0;">
              You're now part of the journey.
            </h1>
          </div>

          <p style="margin-top: 30px;">
            Hello ${firstName},
          </p>

          <p>
            Thank you for your interest in the future of
            <strong>The Gallaspy Golf & Country Club.</strong>
          </p>

          <p>
            We've received your information and added you to our Membership
            Interest List.
          </p>

          <p>
            As the vision progresses, we'll use this list to share meaningful
            development updates, future membership announcements, club news,
            and selected opportunities to engage with The Gallaspy.
          </p>

          <div
            style="
              margin: 30px 0;
              padding: 24px;
              background: #F7F4EE;
              border-left: 3px solid #B89146;
            "
          >
            <p style="margin: 0 0 10px;">
              <strong>Your stated interest</strong>
            </p>

            <p style="margin: 0;">
              ${primaryInterest}
            </p>
          </div>

          <p>
            Please note that joining the Membership Interest List does not
            constitute a membership application, reservation, offer,
            acceptance, deposit, or financial commitment.
          </p>

          <p>
            Formal membership categories, pricing, availability, and
            application details will be announced at a later stage as the club
            development advances.
          </p>

          <div
            style="
              margin-top: 36px;
              padding-top: 24px;
              border-top: 1px solid #E3DDD1;
            "
          >
            <p style="margin: 0;">
              <strong>The Gallaspy</strong><br />
              The Gallaspy Development Group, LLC
            </p>

            <p style="font-size: 13px; color: #667085; margin-top: 8px;">
              thegallaspy.com
            </p>
          </div>
        </div>
      `,
    });

    const [internalResult, confirmationResult] = await Promise.all([
      internalEmail,
      confirmationEmail,
    ]);

    if (internalResult.error || confirmationResult.error) {
      console.error("Membership interest email error:", {
        internal: internalResult.error,
        confirmation: confirmationResult.error,
      });

      return NextResponse.json(
        {
          success: false,
          message:
            "Your information was saved, but we were unable to send one or more confirmation emails.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Membership interest received.",
      recordId: membershipRecord?.id,
      internalEmailId: internalResult.data?.id,
      confirmationEmailId: confirmationResult.data?.id,
    });
  } catch (error) {
    console.error("Membership interest submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to process membership interest.",
      },
      { status: 500 },
    );
  }
}