import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createClient } from "@supabase/supabase-js";

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

      registrationType,
      additionalPlayers = [],
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
          error: "The 2027 Gallaspy Invitational accepts one player per registration.",
        },
        { status: 400 }
      );
    }

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        {
          error:
            "Player contact information is required.",
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

    if (!Array.isArray(additionalPlayers) || additionalPlayers.length !== 0) {
      return NextResponse.json(
        {
          error: "Additional players are not permitted on an individual registration.",
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

      player_quantity: 1,

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

    return NextResponse.json({
      success: true,

      registrationNumber:
        registration.registration_number,

      paymentId:
        registration.square_payment_id,

      receiptUrl:
        registration.square_receipt_url,

      status: payment.status,

      amount:
        payment?.amount_money?.amount,

      currency:
        payment?.amount_money?.currency,
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