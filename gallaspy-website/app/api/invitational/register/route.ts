import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const PLAYER_PRICE_CENTS = 20000;

export async function POST(request: NextRequest) {
  try {
    const accessToken = process.env.SQUARE_ACCESS_TOKEN;
    const locationId = process.env.SQUARE_LOCATION_ID;
    const squareEnvironment =
      process.env.SQUARE_ENVIRONMENT ?? "sandbox";

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseSecretKey =
      process.env.SUPABASE_SECRET_KEY;

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!accessToken || !locationId) {
      return NextResponse.json(
        {
          error:
            "Square server credentials are not configured.",
        },
        { status: 500 }
      );
    }

    if (!supabaseUrl || !supabaseSecretKey) {
      return NextResponse.json(
        {
          error:
            "Supabase server credentials are not configured.",
        },
        { status: 500 }
      );
    }

    if (!resendApiKey) {
      return NextResponse.json(
        {
          error:
            "Registration email service is not configured.",
        },
        { status: 500 }
      );
    }

    const supabase = createClient(
      supabaseUrl,
      supabaseSecretKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );

    const resend = new Resend(resendApiKey);

    const body = await request.json();

    const {
      sourceId,
      quantity,
      firstName,
      lastName,
      email,
      phone,
      city,
      state,
      shirtSize,

      acceptedTerms,
      acceptedRefund,
      acceptedWaiver,
      acceptedRules,
      mediaConsent,
    } = body;

    if (!sourceId || typeof sourceId !== "string") {
      return NextResponse.json(
        {
          error:
            "A valid Square payment token is required.",
        },
        { status: 400 }
      );
    }

    const playerQuantity = Number(quantity);

    if (playerQuantity !== 1) {
      return NextResponse.json(
        {
          error:
            "The Gallaspy Invitational accepts one golfer per registration.",
        },
        { status: 400 }
      );
    }

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !city ||
      !state ||
      !shirtSize
    ) {
      return NextResponse.json(
        {
          error:
            "Please complete all required player information.",
        },
        { status: 400 }
      );
    }

    if (
      acceptedTerms !== true ||
      acceptedRefund !== true ||
      acceptedWaiver !== true ||
      acceptedRules !== true
    ) {
      return NextResponse.json(
        {
          error:
            "All required tournament policies must be accepted.",
        },
        { status: 400 }
      );
    }

const amount = PLAYER_PRICE_CENTS;

    const squareBaseUrl =
      squareEnvironment === "production"
        ? "https://connect.squareup.com"
        : "https://connect.squareupsandbox.com";

    const idempotencyKey = randomUUID();

    const registrationReference = `gallaspy-${Date.now()}-${randomUUID().slice(
      0,
      8
    )}`;

    const squareResponse = await fetch(
      `${squareBaseUrl}/v2/payments`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "Square-Version": "2026-07-15",
        },
        body: JSON.stringify({
          source_id: sourceId,
          idempotency_key: idempotencyKey,
          amount_money: {
            amount,
            currency: "USD",
          },
          location_id: locationId,
          autocomplete: true,
          reference_id: registrationReference,
          note: `2027 Gallaspy Invitational - Individual Player - ${firstName} ${lastName}`,
        }),
      }
    );

    const squareResult = await squareResponse.json();

    if (!squareResponse.ok) {
      console.error(
        "Square payment error:",
        squareResult
      );

      const message =
        squareResult?.errors?.[0]?.detail ||
        squareResult?.errors?.[0]?.code ||
        "Square was unable to process the payment.";

      return NextResponse.json(
        {
          error: message,
        },
        { status: squareResponse.status }
      );
    }

    const payment = squareResult.payment;

    if (
      !payment?.id ||
      payment?.status !== "COMPLETED"
    ) {
      console.error(
        "Unexpected Square payment result:",
        squareResult
      );

      return NextResponse.json(
        {
          error:
            "The payment did not complete successfully.",
        },
        { status: 502 }
      );
    }

    const policiesAcceptedAt =
      new Date().toISOString();

    const registrationRecord = {
      registration_status: "paid",
      payment_status: "completed",

      registration_type: "Individual Player",

      player_quantity: playerQuantity,

      price_per_player_cents:
        PLAYER_PRICE_CENTS,

      total_amount_cents: amount,
      currency: "USD",

      square_payment_id: payment.id,
      square_receipt_url:
        payment.receipt_url || null,

      primary_first_name: firstName,
      primary_last_name: lastName,
      primary_email: email,
      primary_phone: phone || null,
      primary_city: city || null,
      primary_state: state || null,
      primary_shirt_size:
        shirtSize || null,

      accepted_terms: true,
      accepted_refund_policy: true,
      accepted_waiver: true,
      accepted_rules: true,
      media_consent:
        mediaConsent === true,

      policies_accepted_at:
        policiesAcceptedAt,

      terms_version: "2026-08-18",
      refund_policy_version:
        "2026-08-18",
      waiver_version: "2026-08-18",
      rules_version: "2026-08-18",

      source: "thegallaspy.com",
    };

    const {
      data: registration,
      error: registrationError,
    } = await supabase
      .from("invitational_registrations")
      .insert(registrationRecord)
      .select(
        "registration_number, square_payment_id, square_receipt_url"
      )
      .single();

    if (registrationError) {
      console.error(
        "Supabase registration insert error:",
        registrationError
      );

      return NextResponse.json(
        {
          error:
            "Payment succeeded, but the registration record could not be saved. Please contact The Gallaspy immediately with your payment confirmation.",
          paymentSucceeded: true,
          paymentId: payment.id,
          receiptUrl:
            payment.receipt_url || null,
        },
        { status: 500 }
      );
    }

    const registrationNumber =
      registration.registration_number;

    const formattedAmount = `$${(
      amount / 100
    ).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

    const fullName = `${firstName} ${lastName}`;

    const playerEmailResult =
      await resend.emails.send({
        from: "The Gallaspy Invitational <invitational@thegallaspy.com>",
        to: [email],
        replyTo: "info@thegallaspy.com",
        subject: `Registration Confirmed — ${registrationNumber}`,
        html: `
          <div
            style="
              font-family: Arial, sans-serif;
              color: #10263F;
              line-height: 1.8;
              max-width: 680px;
              margin: 0 auto;
              padding: 30px 20px;
            "
          >
            <div
              style="
                border-bottom: 3px solid #B89146;
                padding-bottom: 22px;
              "
            >
              <p
                style="
                  font-size: 11px;
                  letter-spacing: 3px;
                  text-transform: uppercase;
                  color: #B89146;
                  margin: 0;
                "
              >
                The 2027 Gallaspy Invitational
              </p>

              <h1
                style="
                  font-size: 34px;
                  line-height: 1.15;
                  margin: 10px 0 0;
                "
              >
                Registration Confirmed.
              </h1>
            </div>

            <p style="margin-top: 30px;">
              Hello ${firstName},
            </p>

            <p>
              Your registration for the inaugural
              <strong>2027 Gallaspy Invitational</strong>
              has been successfully received and your payment has been processed.
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
                <strong>Registration Number</strong>
              </p>

              <p
                style="
                  margin: 0;
                  font-size: 26px;
                  font-weight: bold;
                "
              >
                ${registrationNumber}
              </p>
            </div>

            <table
              style="
                width: 100%;
                border-collapse: collapse;
                margin-top: 24px;
              "
            >
              <tbody>
                <tr>
                  <td style="padding: 10px 0;">
                    <strong>Registered Player</strong>
                  </td>

                  <td
                    style="
                      padding: 10px 0;
                      text-align: right;
                    "
                  >
                    ${fullName}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 0;">
                    <strong>Registration</strong>
                  </td>

                  <td
                    style="
                      padding: 10px 0;
                      text-align: right;
                    "
                  >
                    Individual Player
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 0;">
                    <strong>Players</strong>
                  </td>

                  <td
                    style="
                      padding: 10px 0;
                      text-align: right;
                    "
                  >
                    1
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 0;">
                    <strong>Amount Paid</strong>
                  </td>

                  <td
                    style="
                      padding: 10px 0;
                      text-align: right;
                    "
                  >
                    ${formattedAmount}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 0;">
                    <strong>Polo Size</strong>
                  </td>

                  <td
                    style="
                      padding: 10px 0;
                      text-align: right;
                    "
                  >
                    ${shirtSize}
                  </td>
                </tr>


              </tbody>
            </table>

            <div
              style="
                margin: 30px 0;
                padding: 24px;
                background: #10263F;
                color: white;
              "
            >
              <p
                style="
                  margin: 0 0 8px;
                  color: #FFD76A;
                  font-size: 11px;
                  letter-spacing: 2px;
                  text-transform: uppercase;
                "
              >
                Tournament Information
              </p>

              <p style="margin: 0;">
                June 21, 2027<br />
                72-Player Field<br />
                18-Hole Individual Stroke Play<br />
                Gross &amp; Net Competition<br />
                10:00 AM Shotgun Start
              </p>
            </div>

            <p>
              Your registration is eligible for a full refund through
              <strong>April 22, 2027.</strong>
              Beginning April 23, 2027, registrations become non-refundable
              subject to the published Refund & Cancellation Policy.
            </p>

            ${
              payment.receipt_url
                ? `
                  <p>
                    <a
                      href="${payment.receipt_url}"
                      style="
                        display: inline-block;
                        background: #10263F;
                        color: white;
                        text-decoration: none;
                        padding: 14px 22px;
                        margin-top: 12px;
                      "
                    >
                      View Square Receipt
                    </a>
                  </p>
                `
                : ""
            }

            <p>
              Additional tournament information, including final venue details,
              player instructions, arrival times, and event updates will be
              communicated as the Invitational approaches.
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
                The Gallaspy Development Group, LLC
              </p>

              <p
                style="
                  font-size: 13px;
                  color: #667085;
                  margin-top: 8px;
                "
              >
                thegallaspy.com<br />
                info@thegallaspy.com
              </p>
            </div>
          </div>
        `,
      });

    const internalEmailResult =
      await resend.emails.send({
        from: "The Gallaspy Invitational <invitational@thegallaspy.com>",
        to: ["info@thegallaspy.com"],
        replyTo: email,
        subject: `PAID Registration — ${registrationNumber} — ${fullName}`,
        html: `
          <div
            style="
              font-family: Arial, sans-serif;
              color: #10263F;
              line-height: 1.7;
              max-width: 720px;
              margin: 0 auto;
            "
          >
            <div
              style="
                border-bottom: 3px solid #B89146;
                padding-bottom: 20px;
              "
            >
              <p
                style="
                  font-size: 11px;
                  letter-spacing: 2px;
                  text-transform: uppercase;
                  color: #B89146;
                  margin: 0;
                "
              >
                The Gallaspy Invitational
              </p>

              <h1
                style="
                  font-size: 28px;
                  margin: 8px 0 0;
                "
              >
                New Paid Registration
              </h1>
            </div>

            <div
              style="
                margin: 26px 0;
                padding: 20px;
                background: #10263F;
                color: white;
              "
            >
              <strong>
                ${registrationNumber}
              </strong>

              <br />

              ${formattedAmount} — PAID
            </div>

            <table
              style="
                width: 100%;
                border-collapse: collapse;
              "
            >
              <tbody>
                <tr>
                  <td style="padding: 9px 0;">
                    <strong>Name</strong>
                  </td>

                  <td style="padding: 9px 0;">
                    ${fullName}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 9px 0;">
                    <strong>Email</strong>
                  </td>

                  <td style="padding: 9px 0;">
                    ${email}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 9px 0;">
                    <strong>Phone</strong>
                  </td>

                  <td style="padding: 9px 0;">
                    ${phone}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 9px 0;">
                    <strong>City / State</strong>
                  </td>

                  <td style="padding: 9px 0;">
                    ${city}, ${state}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 9px 0;">
                    <strong>Registration Type</strong>
                  </td>

                  <td style="padding: 9px 0;">
                    Individual Player
                  </td>
                </tr>

                <tr>
                  <td style="padding: 9px 0;">
                    <strong>Players</strong>
                  </td>

                  <td style="padding: 9px 0;">
                    1
                  </td>
                </tr>

                <tr>
                  <td style="padding: 9px 0;">
                    <strong>Amount Paid</strong>
                  </td>

                  <td style="padding: 9px 0;">
                    ${formattedAmount}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 9px 0;">
                    <strong>Polo Size</strong>
                  </td>

                  <td style="padding: 9px 0;">
                    ${shirtSize}
                  </td>
                </tr>



                <tr>
                  <td style="padding: 9px 0;">
                    <strong>Square Payment ID</strong>
                  </td>

                  <td
                    style="
                      padding: 9px 0;
                      word-break: break-all;
                    "
                  >
                    ${payment.id}
                  </td>
                </tr>
              </tbody>
            </table>

<div
              style="
                margin-top: 30px;
                padding: 18px;
                background: #F7F4EE;
              "
            >
              <strong>Policy Acceptance</strong>

              <p style="margin-bottom: 0;">
                Terms: Accepted<br />
                Refund Policy: Accepted<br />
                Liability Waiver: Accepted<br />
                Tournament Rules: Accepted<br />
                Media Consent:
                ${mediaConsent ? "Accepted" : "Not accepted"}
                <br />
                Accepted At:
                ${policiesAcceptedAt}
              </p>
            </div>
          </div>
        `,
      });

    if (
      playerEmailResult.error ||
      internalEmailResult.error
    ) {
      console.error(
        "Paid registration confirmation email error:",
        {
          player:
            playerEmailResult.error,
          internal:
            internalEmailResult.error,
        }
      );

      // Payment + database registration already succeeded.
      // Do NOT turn this into a failed registration.
    }

    return NextResponse.json({
      success: true,

      registrationNumber,

      paymentId:
        registration.square_payment_id,

      receiptUrl:
        registration.square_receipt_url,

      status: payment.status,

      amount:
        payment?.amount_money?.amount,

      currency:
        payment?.amount_money?.currency,

      confirmationEmailSent:
        !playerEmailResult.error,

      internalNotificationSent:
        !internalEmailResult.error,
    });
  } catch (error) {
    console.error(
      "Invitational payment route error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to process payment. Please try again.",
      },
      { status: 500 }
    );
  }
}