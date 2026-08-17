import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      city,
      state,
      playerInterest,
      teamName,
      shirtSize,
      sponsorInterest,
      notes,
    } = body;

    // Required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !playerInterest ||
      !shirtSize
    ) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    const fullName = `${firstName} ${lastName}`;

    // Email #1: Notification to The Gallaspy
    const internalEmail = resend.emails.send({
      from: "The Gallaspy Invitational <invitational@thegallaspy.com>",
      to: ["info@thegallaspy.com"],
      replyTo: email,
      subject: `New Invitational Player Interest — ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #10263F; line-height: 1.7; max-width: 680px; margin: 0 auto;">
          <div style="border-bottom: 3px solid #B89146; padding-bottom: 20px;">
            <p style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #B89146; margin: 0;">
              The Gallaspy Invitational
            </p>

            <h1 style="font-size: 28px; margin: 8px 0 0;">
              New Player Interest
            </h1>
          </div>

          <p style="margin-top: 28px;">
            A new player has joined the priority list for the
            2027 Gallaspy Invitational.
          </p>

          <table
            style="width: 100%; border-collapse: collapse; margin-top: 24px;"
          >
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
                <td style="padding: 10px 0;">${phone}</td>
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
                <td style="padding: 10px 0;"><strong>Player Interest</strong></td>
                <td style="padding: 10px 0;">${playerInterest}</td>
              </tr>

              <tr>
                <td style="padding: 10px 0;"><strong>Team Name</strong></td>
                <td style="padding: 10px 0;">${
                  teamName || "Not provided"
                }</td>
              </tr>

              <tr>
                <td style="padding: 10px 0;"><strong>Player Shirt Size</strong></td>
                <td style="padding: 10px 0;">${shirtSize}</td>
              </tr>

              <tr>
                <td style="padding: 10px 0;"><strong>Sponsor Interest</strong></td>
                <td style="padding: 10px 0;">${
                  sponsorInterest || "No"
                }</td>
              </tr>
            </tbody>
          </table>

          <div style="margin-top: 24px;">
            <strong>Notes</strong>
            <p>${notes || "None"}</p>
          </div>
        </div>
      `,
    });

    // Email #2: Confirmation to player
    const playerEmail = resend.emails.send({
      from: "The Gallaspy Invitational <invitational@thegallaspy.com>",
      to: [email],
      replyTo: "info@thegallaspy.com",
      subject: "Welcome to the 2027 Gallaspy Invitational Priority List",
      html: `
        <div style="font-family: Arial, sans-serif; color: #10263F; line-height: 1.8; max-width: 640px; margin: 0 auto; padding: 30px 20px;">
          
          <div style="border-bottom: 3px solid #B89146; padding-bottom: 22px;">
            <p style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #B89146; margin: 0;">
              The Gallaspy Invitational
            </p>

            <h1 style="font-size: 34px; line-height: 1.15; margin: 10px 0 0;">
              You're on the priority list.
            </h1>
          </div>

          <p style="margin-top: 30px;">
            Hello ${firstName},
          </p>

          <p>
            Thank you for your interest in competing in the inaugural
            <strong>2027 Gallaspy Invitational.</strong>
          </p>

          <p>
            We've received your information and added you to the tournament
            priority list.
          </p>

          <p>
            Priority-list players will receive future announcements regarding
            official player registration, the host venue, tournament pricing,
            competition details, and additional event information.
          </p>

          <div
            style="
              margin: 30px 0;
              padding: 24px;
              background: #F7F4EE;
              border-left: 3px solid #B89146;
            "
          >
            <p style="margin: 0 0 8px;">
              <strong>2027 Gallaspy Invitational</strong>
            </p>

            <p style="margin: 0;">
              4-Person Scramble<br />
              100-Player Field<br />
              $10,000 Tournament Purse<br />
              The Golden Falcon Championship Trophy
            </p>
          </div>

          <p>
            Please note that joining the priority list does
            <strong>not</strong> reserve or guarantee a position in the field.
            Tournament entry will be confirmed once official registration
            opens and payment is successfully completed.
          </p>

          <p>
            We look forward to welcoming the inaugural field.
          </p>

          <div
            style="
              margin-top: 36px;
              padding-top: 24px;
              border-top: 1px solid #E3DDD1;
            "
          >
            <p style="margin: 0;">
              <strong>The Gallaspy Invitational</strong><br />
              The Gallaspy Development Group
            </p>

            <p style="font-size: 13px; color: #667085; margin-top: 8px;">
              thegallaspy.com
            </p>
          </div>
        </div>
      `,
    });

    // Send both emails
    const [internalResult, playerResult] = await Promise.all([
      internalEmail,
      playerEmail,
    ]);

    if (internalResult.error || playerResult.error) {
      console.error("Resend email error:", {
        internal: internalResult.error,
        player: playerResult.error,
      });

      return NextResponse.json(
        {
          error: "Unable to send registration emails. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Registration interest received.",
      internalEmailId: internalResult.data?.id,
      playerEmailId: playerResult.data?.id,
    });
  } catch (error) {
    console.error("Invitational registration error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}