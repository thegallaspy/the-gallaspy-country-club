import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { events } from "@/data/club";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RoundRegistrationSubmission = {
  eventId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  ghinNumber?: string;
  handicapIndex?: string;
  notes?: string;
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
        { error: "Registration email service is not configured." },
        { status: 500 },
      );
    }

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error("Missing Supabase environment variables");

      return NextResponse.json(
        { error: "Registration database is not configured." },
        { status: 500 },
      );
    }

    const body =
      (await request.json()) as RoundRegistrationSubmission;

    const eventId = body.eventId?.trim();
    const firstName = body.firstName?.trim();
    const lastName = body.lastName?.trim();
    const email = body.email?.trim().toLowerCase();
    const phone = body.phone?.trim();
    const city = body.city?.trim() || null;
    const state = body.state?.trim() || null;
    const ghinNumber = body.ghinNumber?.trim() || null;
    const handicapIndex = body.handicapIndex?.trim() || null;
    const notes = body.notes?.trim() || null;

    if (
      !eventId ||
      !firstName ||
      !lastName ||
      !email ||
      !phone
    ) {
      return NextResponse.json(
        {
          error:
            "Please complete the Round, first name, last name, email, and phone number.",
        },
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

    if (notes && notes.length > 1500) {
      return NextResponse.json(
        { error: "Your note is too long." },
        { status: 400 },
      );
    }

    const round = events.find(
      (event) =>
        event.id === eventId &&
        event.category === "GALLASPY_ROUND",
    );

    if (!round || !round.date) {
      return NextResponse.json(
        { error: "Please select a valid Gallaspy Round." },
        { status: 400 },
      );
    }

    if (
      round.status === "COMPLETED" ||
      round.status === "SOLD_OUT"
    ) {
      return NextResponse.json(
        { error: "Registration is not available for this Round." },
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

    const { data: registration, error: databaseError } =
      await supabase
        .from("gallaspy_round_registrations")
        .insert({
          event_id: round.id,
          event_name: round.name,
          event_date: round.date,
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          city,
          state,
          ghin_number: ghinNumber,
          handicap_index: handicapIndex,
          notes,
          registration_status: "registered",
          green_fee_status: "paid_separately",
          source: "thegallaspy.com",
        })
        .select("id")
        .single();

    if (databaseError) {
      if (databaseError.code === "23505") {
        return NextResponse.json(
          {
            error:
              "This email is already registered for the selected Gallaspy Round.",
          },
          { status: 409 },
        );
      }

      console.error(
        "Gallaspy Round registration database error:",
        databaseError,
      );

      return NextResponse.json(
        {
          error:
            "Unable to save your registration. Please try again.",
        },
        { status: 500 },
      );
    }

    const now = new Date().toISOString();

    const { data: player, error: playerError } =
      await supabase
        .from("gallaspy_players")
        .upsert(
          {
            first_name: firstName,
            last_name: lastName,
            email,
            phone,
            city,
            state,
            ghin_number: ghinNumber,
            handicap_index: handicapIndex,
            last_active_at: now,
            updated_at: now,
          },
          {
            onConflict: "email",
          },
        )
        .select("id")
        .single();

    if (playerError || !player) {
      console.error(
        "Gallaspy player upsert error:",
        playerError,
      );

      return NextResponse.json(
        {
          error:
            "Your Round registration was saved, but we could not update your Gallaspy player record. Please contact The Gallaspy.",
        },
        { status: 500 },
      );
    }

    const { error: participationError } =
      await supabase
        .from("gallaspy_participation")
        .upsert(
          {
            player_id: player.id,
            event_id: round.id,
            event_name: round.name,
            event_date: round.date,
            event_category: round.category,
            participation_status: "confirmed",
            source_registration_type: "gallaspy_round",
            source_registration_id: registration?.id || null,
            updated_at: now,
          },
          {
            onConflict: "player_id,event_id",
          },
        );

    if (participationError) {
      console.error(
        "Gallaspy participation upsert error:",
        participationError,
      );

      return NextResponse.json(
        {
          error:
            "Your Round registration was saved, but we could not update your participation record. Please contact The Gallaspy.",
        },
        { status: 500 },
      );
    }

    const resend = new Resend(resendApiKey);

    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeCity = escapeHtml(city || "Not provided");
    const safeState = escapeHtml(state || "Not provided");
    const safeGhin = escapeHtml(ghinNumber || "Not provided");
    const safeHandicap = escapeHtml(
      handicapIndex || "Not provided",
    );
    const safeNotes = escapeHtml(
      notes || "None",
    ).replaceAll("\n", "<br />");

    const internalEmail = resend.emails.send({
      from: "The Gallaspy <info@thegallaspy.com>",
      to: ["info@thegallaspy.com"],
      replyTo: email,
      subject: `New Gallaspy Round Registration — ${round.name}`,
      html: `
        <div style="background:#F4F0E7;padding:40px 20px;font-family:Arial,sans-serif;color:#10263F;">
          <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #DED7CA;overflow:hidden;">
            <div style="background:#10263F;padding:34px;text-align:center;">
              <p style="margin:0;color:#FFD76A;font-size:11px;letter-spacing:3px;text-transform:uppercase;">
                Gallaspy Rounds
              </p>
              <h1 style="margin:14px 0 0;color:#ffffff;font-family:Georgia,serif;font-weight:400;">
                New Round Registration
              </h1>
            </div>

            <div style="padding:32px;">
              <p><strong>Round:</strong> ${escapeHtml(round.name)}</p>
              <p><strong>Date:</strong> ${escapeHtml(round.dateLabel)}</p>
              <p><strong>Name:</strong> ${safeFirstName} ${safeLastName}</p>
              <p><strong>Email:</strong> ${safeEmail}</p>
              <p><strong>Phone:</strong> ${safePhone}</p>
              <p><strong>City:</strong> ${safeCity}</p>
              <p><strong>State:</strong> ${safeState}</p>
              <p><strong>GHIN:</strong> ${safeGhin}</p>
              <p><strong>Handicap:</strong> ${safeHandicap}</p>

              <div style="margin-top:24px;padding:20px;background:#F4F0E7;">
                <strong>Notes</strong>
                <p style="margin:10px 0 0;line-height:1.7;">
                  ${safeNotes}
                </p>
              </div>

              <p style="margin-top:24px;font-size:13px;color:#667085;">
                Registration ID: ${registration?.id || "Saved"}
              </p>
            </div>
          </div>
        </div>
      `,
    });

    const confirmationEmail = resend.emails.send({
      from: "The Gallaspy <info@thegallaspy.com>",
      to: [email],
      replyTo: "info@thegallaspy.com",
      subject: `You're Registered — ${round.name}`,
      html: `
        <div style="background:#F4F0E7;padding:40px 20px;font-family:Arial,sans-serif;color:#10263F;">
          <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #DED7CA;overflow:hidden;">
            <div style="background:#0C352D;padding:38px 28px;text-align:center;">
              <p style="margin:0;color:#FFD76A;font-size:11px;letter-spacing:3px;text-transform:uppercase;">
                The Gallaspy
              </p>
              <h1 style="margin:16px 0 0;color:#ffffff;font-family:Georgia,serif;font-weight:400;">
                You're Registered
              </h1>
            </div>

            <div style="padding:34px;">
              <p style="font-size:16px;line-height:1.8;margin-top:0;">
                Hello ${safeFirstName},
              </p>

              <p style="font-size:16px;line-height:1.8;">
                Your registration for
                <strong>${escapeHtml(round.name)}</strong>
                on
                <strong>${escapeHtml(round.dateLabel)}</strong>
                has been received.
              </p>

              <div style="margin:28px 0;padding:22px;background:#F4F0E7;border-left:3px solid #B89146;">
                <p style="margin:0;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#8B6A34;">
                  Green Fee
                </p>

                <p style="margin:12px 0 0;line-height:1.7;">
                  Each golfer is responsible for their own green fee.
                  Course, tee-time and payment details will be communicated
                  as the Round details are finalized.
                </p>
              </div>

              <p style="font-size:16px;line-height:1.8;">
                Additional Round information will be sent to this email
                as details are confirmed.
              </p>

              <div style="margin-top:34px;padding-top:22px;border-top:1px solid #E3DDD1;">
                <p style="margin:0;">
                  <strong>The Gallaspy</strong><br />
                  Different Courses. One Club.
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

    const [internalResult, confirmationResult] =
      await Promise.all([
        internalEmail,
        confirmationEmail,
      ]);

    if (
      internalResult.error ||
      confirmationResult.error
    ) {
      console.error("Gallaspy Round email error:", {
        internal: internalResult.error,
        confirmation: confirmationResult.error,
      });

      return NextResponse.json({
        success: true,
        registrationId: registration?.id,
        warning:
          "Your registration was saved, but one or more confirmation emails could not be sent.",
      });
    }

    return NextResponse.json({
      success: true,
      registrationId: registration?.id,
    });
  } catch (error) {
    console.error(
      "Unexpected Gallaspy Round registration error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong while submitting your registration.",
      },
      { status: 500 },
    );
  }
}
