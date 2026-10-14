import { createHash, randomUUID } from "crypto";
import { PRODUCT_CATALOG } from "@/lib/apparel-catalog";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import {
  getFalconSocietyCookieName,
  verifyFalconSocietySession,
} from "@/lib/falcon-society-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RequestItem = {
  slug?: string;
  size?: string;
  quantity?: number;
};

type ApparelPaymentBody = {
  sourceId?: string;
  nativeCheckoutToken?: string;
  websiteCheckoutId?: string;
  items?: RequestItem[];
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  shippingAddress1?: string;
  shippingAddress2?: string;
  shippingCity?: string;
  shippingState?: string;
  shippingPostalCode?: string;
  acceptedTerms?: boolean;
};

type ValidatedItem = {
  slug: string;
  name: string;
  category: string;
  color: string;
  mark: string;
  image: string;
  size: string;
  quantity: number;
  unitPriceCents: number;
  lineTotalCents: number;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatCurrency(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export async function POST(request: NextRequest) {
  let squarePaymentAttempted = false;
  let nativeAttemptId: string | null = null;
  let idempotencyKey: string | null = null;

  try {
    const accessToken = process.env.SQUARE_ACCESS_TOKEN;
    const locationId = process.env.SQUARE_LOCATION_ID;
    const squareEnvironment = process.env.SQUARE_ENVIRONMENT ?? "sandbox";
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!accessToken || !locationId) {
      console.error("Square apparel credentials are missing.");
      return NextResponse.json(
        {
          success: false,
          error: "Apparel payment service is not configured.",
        },
        { status: 500 }
      );
    }

    if (!supabaseUrl || !supabaseSecretKey) {
      console.error("Supabase apparel credentials are missing.");
      return NextResponse.json(
        {
          success: false,
          error: "Apparel order database is not configured.",
        },
        { status: 500 }
      );
    }

    const body = (await request.json()) as ApparelPaymentBody;

    const sourceId = clean(body.sourceId);
    const nativeCheckoutToken = clean(body.nativeCheckoutToken);
    const websiteCheckoutId = clean(body.websiteCheckoutId);

    if (
      !nativeCheckoutToken &&
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(websiteCheckoutId)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid website checkout session. Please reload checkout.",
        },
        { status: 400 }
      );
    }
    const firstName = clean(body.firstName);
    const lastName = clean(body.lastName);
    const email = clean(body.email).toLowerCase();
    const phone = clean(body.phone);
    const shippingAddress1 = clean(body.shippingAddress1);
    const shippingAddress2 = clean(body.shippingAddress2);
    const shippingCity = clean(body.shippingCity);
    const shippingState = clean(body.shippingState);
    const shippingPostalCode = clean(body.shippingPostalCode);

    if (!sourceId) {
      return NextResponse.json(
        { success: false, error: "A valid Square payment token is required." },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Your bag is empty." },
        { status: 400 }
      );
    }

    if (body.items.length > 27) {
      return NextResponse.json(
        { success: false, error: "Too many separate items in this order." },
        { status: 400 }
      );
    }

    const validatedItems: ValidatedItem[] = [];
    let totalItemCount = 0;

    for (const item of body.items) {
      const slug = clean(item.slug);
      const requestedSize =
        clean(item.size) === "OneSize" ? "One Size" : clean(item.size);
      const quantity = Number(item.quantity);

      const product = PRODUCT_CATALOG[slug];

      if (!product) {
        return NextResponse.json(
          { success: false, error: "One or more products in your bag are invalid." },
          { status: 400 }
        );
      }

      if (
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 10
      ) {
        return NextResponse.json(
          { success: false, error: `Invalid quantity for ${product.name}.` },
          { status: 400 }
        );
      }

      if (!product.sizes.includes(requestedSize)) {
        return NextResponse.json(
          { success: false, error: `Invalid size for ${product.name}.` },
          { status: 400 }
        );
      }

      totalItemCount += quantity;

      if (totalItemCount > 30) {
        return NextResponse.json(
          { success: false, error: "This order exceeds the maximum item quantity." },
          { status: 400 }
        );
      }

      validatedItems.push({
        slug,
        name: product.name,
        category: product.category,
        color: product.color,
        mark: product.mark,
        image: product.image,
        size: requestedSize,
        quantity,
        unitPriceCents: product.priceCents,
        lineTotalCents: product.priceCents * quantity,
      });
    }

    const containsFalconSocietyItem = validatedItems.some((item) =>
      item.slug.startsWith("falcon-society-")
    );

    if (containsFalconSocietyItem) {
      const sessionToken = request.cookies.get(
        getFalconSocietyCookieName()
      )?.value;

      const hasFalconSocietyAccess =
        await verifyFalconSocietySession(sessionToken);

      if (!hasFalconSocietyAccess) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Falcon Society merchandise is available only to authenticated Society members.",
          },
          { status: 403 }
        );
      }
    }

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Please complete your contact information." },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (
      !shippingAddress1 ||
      !shippingCity ||
      !shippingState ||
      !shippingPostalCode
    ) {
      return NextResponse.json(
        { success: false, error: "Please complete your shipping address." },
        { status: 400 }
      );
    }

    if (body.acceptedTerms !== true) {
      return NextResponse.json(
        {
          success: false,
          error: "Please accept the pre-order terms before continuing.",
        },
        { status: 400 }
      );
    }

    /*
     * Prices are intentionally calculated again here.
     * The browser's displayed price is never trusted.
     */
    const subtotalCents = validatedItems.reduce(
      (sum, item) => sum + item.lineTotalCents,
      0
    );

    const shippingCents = 895;
    const taxCents = 0;
    const totalCents = subtotalCents + shippingCents + taxCents;

    const orderReference =
      `apparel-${Date.now()}-${randomUUID().slice(0, 8)}`;

    idempotencyKey = randomUUID();
    let nativeTokenHash: string | null = null;


    const orderSummary = validatedItems
      .map(
        (item) =>
          `${item.name} ${item.color} ${item.size} x${item.quantity}`
      )
      .join("; ")
      .slice(0, 450);

    const squareBaseUrl =
      squareEnvironment === "production"
        ? "https://connect.squareup.com"
        : "https://connect.squareupsandbox.com";


    const orderPayload = {
      order_reference: orderReference,
      square_payment_id: null,
      square_receipt_url: null,
      payment_status: "pending",
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      shipping_address_1: shippingAddress1,
      shipping_address_2: shippingAddress2 || null,
      shipping_city: shippingCity,
      shipping_state: shippingState,
      shipping_postal_code: shippingPostalCode,
      shipping_country: "US",
      subtotal_cents: subtotalCents,
      shipping_cents: shippingCents,
      tax_cents: taxCents,
      total_cents: totalCents,
      fulfillment_status: "unfulfilled",
    };

    const orderItems = validatedItems.map((item) => ({
      product_slug: item.slug,
      product_name: item.name,
      category: item.category,
      color: item.color,
      mark: item.mark,
      size: item.size,
      image: item.image,
      quantity: item.quantity,
      unit_price_cents: item.unitPriceCents,
      line_total_cents: item.lineTotalCents,
    }));


    if (nativeCheckoutToken) {
      if (!/^[a-f0-9]{64}$/.test(nativeCheckoutToken)) {
        return NextResponse.json(
          { success: false, error: "Invalid checkout session." },
          { status: 400 }
        );
      }

      nativeTokenHash = createHash("sha256")
        .update(nativeCheckoutToken)
        .digest("hex");

      const client = createClient(supabaseUrl, supabaseSecretKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      });

      const cart = validatedItems.map(({ slug, size, quantity }) => ({
        slug, size, quantity,
      }));

      const { data, error } = await client.rpc(
        "prepare_native_apparel_payment",
        {
          p_token_hash: nativeTokenHash,
          p_items: cart,
          p_order_reference: orderReference,
          p_order_payload: orderPayload,
          p_order_items: orderItems,
          p_amount_cents: totalCents,
        }
      );

      if (error) {
        console.error("Native payment preparation failed:", error);
        return NextResponse.json(
          {
            success: false,
            error: "Checkout preparation failed. No payment was submitted.",
          },
          { status: 503 }
        );
      }

      const claim = Array.isArray(data) ? data[0] : null;

      if (!claim?.claimed || !claim.attempt_id) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Checkout already submitted or expired. If you may have been charged, contact Gallaspy before retrying.",
          },
          { status: 409 }
        );
      }

      nativeAttemptId = claim.attempt_id;
      idempotencyKey = claim.attempt_id;
    } else {
      const websiteClient = createClient(
        supabaseUrl,
        supabaseSecretKey,
        {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          },
        }
      );

      const { data, error } = await websiteClient.rpc(
        "prepare_website_apparel_payment",
        {
          p_website_checkout_id: websiteCheckoutId,
          p_order_reference: orderReference,
          p_order_payload: orderPayload,
          p_order_items: orderItems,
          p_amount_cents: totalCents,
        }
      );

      if (error) {
        console.error("Website payment preparation failed:", error);
        return NextResponse.json(
          {
            success: false,
            error: "Checkout preparation failed. No payment was submitted.",
          },
          { status: 503 }
        );
      }

      const claim = Array.isArray(data) ? data[0] : null;

      if (!claim?.claimed || !claim.attempt_id) {
        return NextResponse.json(
          {
            success: false,
            error:
              "This checkout was already submitted. Do not pay again until the previous payment status has been verified.",
          },
          { status: 409 }
        );
      }

      idempotencyKey = claim.attempt_id;
    }

    if (idempotencyKey && (nativeAttemptId || websiteCheckoutId)) {
      const trackingClient = createClient(
        supabaseUrl,
        supabaseSecretKey,
        {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          },
        }
      );

      const { data: trackedAttempt, error: trackingError } =
        await trackingClient
          .from("apparel_payment_attempts")
          .update({
            payment_state: "processing",
            payment_started_at: new Date().toISOString(),
          })
          .eq("idempotency_key", idempotencyKey)
          .eq("payment_state", "prepared")
          .select("id")
          .single();

      if (trackingError || !trackedAttempt) {
        console.error(
          "Apparel payment tracking failed:",
          trackingError
        );

        return NextResponse.json(
          {
            success: false,
            error:
              "Payment preparation could not be completed. No charge was submitted. Contact Gallaspy support.",
          },
          { status: 503 }
        );
      }
    }

    squarePaymentAttempted = true;

    const squareResponse = await fetch(`${squareBaseUrl}/v2/payments`, {
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
          amount: totalCents,
          currency: "USD",
        },
        location_id: locationId,
        autocomplete: true,
        reference_id: orderReference,
        note: `Gallaspy Apparel Pre-Order — ${orderSummary}`,
      }),
    });

    const squareResult = await squareResponse.json();

    const flagUncertainPayment = async (reason: string) => {
      if (!idempotencyKey) return;

      const recoveryClient = createClient(
        supabaseUrl,
        supabaseSecretKey,
        {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          },
        }
      );

      const { data: flagged, error: flagError } =
        await recoveryClient
          .from("apparel_payment_attempts")
          .update({
            payment_state: "needs_review",
            last_error: reason,
          })
          .eq("idempotency_key", idempotencyKey)
          .eq("payment_state", "processing")
          .select("id")
          .maybeSingle();

      if (flagError || !flagged) {
        console.error("Square payment review tracking failed:", {
          flagError,
          nativeAttemptId,
        });
      }
    };

    if (!squareResponse.ok) {
      console.error("Square apparel payment error:", squareResult);
      await flagUncertainPayment(
        "Square returned an unsuccessful payment response; verify status."
      );

      const message =
        squareResult?.errors?.[0]?.detail ||
        squareResult?.errors?.[0]?.code ||
        "Square was unable to process the payment.";

      if (idempotencyKey) {
        return NextResponse.json(
          {
            success: false,
            paymentStatusUncertain: true,
            error:
              "We could not confirm your payment status. Do not submit another payment. Contact Gallaspy support so we can verify the transaction.",
          },
          { status: 502 }
        );
      }

      return NextResponse.json(
        { success: false, error: message },
        { status: squareResponse.status }
      );
    }

    const payment = squareResult.payment;

    if (!payment?.id || payment.status !== "COMPLETED") {
      console.error(
        "Unexpected Square apparel payment result:",
        squareResult
      );
      await flagUncertainPayment(
        "Square returned an unexpected payment status; verify status."
      );

      return NextResponse.json(
        {
          success: false,
          paymentStatusUncertain: true,
          error:
            "Payment status could not be confirmed. Do not submit another payment. Contact Gallaspy support to verify the transaction.",
        },
        { status: 502 }
      );
    }

    /*
     * Payment is complete at this point.
     * Never tell the customer to simply retry after a database failure.
     */
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

    if (idempotencyKey && (nativeAttemptId || websiteCheckoutId)) {
      const { data: trackedPayment, error: paymentTrackingError } =
        await supabase
          .from("apparel_payment_attempts")
          .update({
            square_payment_id: payment.id,
            square_receipt_url: payment.receipt_url || null,
            payment_state: "needs_review",
            payment_completed_at: new Date().toISOString(),
          })
          .eq("idempotency_key", idempotencyKey)
          .eq("payment_state", "processing")
          .select("id")
          .single();

      if (paymentTrackingError || !trackedPayment) {
        console.error(
          "Confirmed Square payment tracking failed:",
          {
            paymentTrackingError,
            paymentId: payment.id,
            orderReference,
          }
        );

        return NextResponse.json(
          {
            success: false,
            paymentSucceeded: true,
            paymentId: payment.id,
            orderReference,
            error:
              "Payment succeeded, but order verification needs assistance. Do not pay again. Contact Gallaspy support.",
          },
          { status: 500 }
        );
      }
    }

    const confirmedOrderPayload = {
      ...orderPayload,
      square_payment_id: payment.id,
      square_receipt_url: payment.receipt_url || null,
      payment_status: "completed",
    };

    const { data: savedOrderId, error: saveError } =
      await supabase.rpc("save_atomic_apparel_order", {
        p_order: confirmedOrderPayload,
        p_items: orderItems,
      });

    if (saveError || !savedOrderId) {
      console.error("Atomic apparel order save failed:", {
        saveError,
        paymentId: payment.id,
        orderReference,
      });

      return NextResponse.json(
        {
          success: false,
          paymentSucceeded: true,
          paymentId: payment.id,
          receiptUrl: payment.receipt_url || "",
          orderReference,
          error:
            "Payment succeeded, but the order could not be recorded. Do not pay again. Contact The Gallaspy with your order reference.",
        },
        { status: 500 }
      );
    }

    if (idempotencyKey && (nativeAttemptId || websiteCheckoutId)) {
      const { data: completedAttempt, error: recoveryCompletionError } =
        await supabase
          .from("apparel_payment_attempts")
          .update({
            payment_state: "completed",
            reconciled_at: new Date().toISOString(),
          })
          .eq("idempotency_key", idempotencyKey)
          .eq("square_payment_id", payment.id)
          .eq("payment_state", "needs_review")
          .select("id")
          .single();

      if (recoveryCompletionError || !completedAttempt) {
        console.error("Apparel recovery completion failed:", {
          recoveryCompletionError,
          paymentId: payment.id,
          orderReference,
          savedOrderId,
        });

        return NextResponse.json(
          {
            success: false,
            paymentSucceeded: true,
            paymentId: payment.id,
            orderReference,
            error:
              "Payment and order were recorded, but checkout verification is incomplete. Do not pay again. Contact Gallaspy support.",
          },
          { status: 500 }
        );
      }
    }

    if (nativeTokenHash && nativeAttemptId) {
      const completionClient = createClient(
        supabaseUrl,
        supabaseSecretKey,
        {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          },
        }
      );

      const { data: completed, error: completionError } =
        await completionClient.rpc(
          "complete_native_apparel_checkout",
          {
            p_token_hash: nativeTokenHash,
            p_attempt_id: nativeAttemptId,
            p_square_payment_id: payment.id,
          }
        );

      if (completionError || completed !== true) {
        console.error("Native checkout completion error:", {
          completionError,
          paymentId: payment.id,
        });

        // Square confirmed payment. Continue recording the order.
        // The native session remains locked until reconciled.

      }
    }

    /*
     * Gallaspy Club Points.
     * Only verified, completed native purchases qualify.
     * Rewards failures must never invalidate a paid order.
     */
    if (nativeTokenHash && nativeAttemptId) {
      try {
        const { data: pointsAwarded, error: pointsError } =
          await supabase.rpc("award_apparel_club_points", {
            p_order_reference: orderReference,
          });

        if (pointsError) {
          console.error("Club Points award failed:", {
            orderReference,
            error: pointsError,
          });
        } else {
          console.info("Club Points award processed:", {
            orderReference,
            pointsAwarded,
          });
        }
      } catch (pointsException) {
        console.error("Club Points award exception:", {
          orderReference,
          error: pointsException,
        });
      }
    }

    /*
     * Confirmation email.
     * A failed email must not invalidate a completed payment/order.
     */
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);

        const safeFirstName = escapeHtml(firstName);
        const safeLastName = escapeHtml(lastName);
        const safeEmail = escapeHtml(email);
        const safePhone = escapeHtml(phone);

        const shippingAddress = [
          escapeHtml(shippingAddress1),
          shippingAddress2
            ? escapeHtml(shippingAddress2)
            : "",
          `${escapeHtml(shippingCity)}, ${escapeHtml(
            shippingState
          )} ${escapeHtml(shippingPostalCode)}`,
          "United States",
        ]
          .filter(Boolean)
          .join("<br />");

        const itemRowsHtml = validatedItems
          .map(
            (item) => `
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #E5DED1;">
                  <strong>${escapeHtml(item.name)}</strong><br />
                  <span style="font-size:13px;color:#667085;">
                    ${escapeHtml(item.color)} ·
                    ${escapeHtml(item.mark)} ·
                    ${escapeHtml(item.size)} ·
                    Qty ${item.quantity}
                  </span>
                </td>
                <td style="padding:12px 0;border-bottom:1px solid #E5DED1;text-align:right;white-space:nowrap;">
                  ${formatCurrency(item.lineTotalCents)}
                </td>
              </tr>
            `
          )
          .join("");

        const customerEmail = resend.emails.send({
          from: "The Gallaspy <info@thegallaspy.com>",
          to: [email],
          replyTo: "info@thegallaspy.com",
          subject: `Your Gallaspy Pre-Order Is Confirmed — ${orderReference}`,
          html: `
            <div style="background:#F7F4EE;padding:40px 20px;font-family:Arial,sans-serif;color:#10263F;">
              <div style="max-width:680px;margin:0 auto;background:#FFFFFF;border:1px solid #E5DED1;overflow:hidden;">
                <div style="background:#10263F;padding:34px 28px;text-align:center;border-top:6px solid #B3262D;">
                  <p style="margin:0;color:#FFD76A;font-size:11px;letter-spacing:3px;text-transform:uppercase;">
                    The Gallaspy Apparel
                  </p>
                  <h1 style="margin:14px 0 0;color:#FFFFFF;font-family:Georgia,serif;font-size:32px;font-weight:400;">
                    Pre-Order Confirmed
                  </h1>
                </div>

                <div style="padding:34px;">
                  <p style="margin-top:0;font-size:16px;line-height:1.8;">
                    Hello ${safeFirstName},
                  </p>

                  <p style="font-size:16px;line-height:1.8;">
                    Thank you for reserving your pieces from The Gallaspy Apparel.
                    Your payment was successfully processed and your pre-order has been confirmed.
                  </p>

                  <div style="margin:28px 0;padding:22px;background:#F7F4EE;border-left:3px solid #B3262D;">
                    <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8B6A34;">
                      Order Reference
                    </p>
                    <p style="margin:0;font-family:Georgia,serif;font-size:22px;">
                      ${escapeHtml(orderReference)}
                    </p>
                  </div>

                  <table style="width:100%;border-collapse:collapse;">
                    <tbody>
                      ${itemRowsHtml}

                      <tr>
                        <td style="padding:16px 0 6px;">Subtotal</td>
                        <td style="padding:16px 0 6px;text-align:right;">
                          ${formatCurrency(subtotalCents)}
                        </td>
                      </tr>

                      <tr>
                        <td style="padding:6px 0;">Shipping</td>
                        <td style="padding:6px 0;text-align:right;">
                          ${formatCurrency(shippingCents)}
                        </td>
                      </tr>

                      <tr>
                        <td style="padding:6px 0;">Tax</td>
                        <td style="padding:6px 0;text-align:right;">
                          ${formatCurrency(taxCents)}
                        </td>
                      </tr>

                      <tr>
                        <td style="padding:14px 0 6px;font-weight:bold;font-size:17px;">
                          Total Paid
                        </td>
                        <td style="padding:14px 0 6px;text-align:right;font-weight:bold;font-size:17px;color:#8B6A34;">
                          ${formatCurrency(totalCents)}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div style="margin-top:28px;padding:22px;background:#F7F4EE;">
                    <p style="margin:0 0 10px;font-weight:bold;">
                      Shipping Address
                    </p>
                    <p style="margin:0;line-height:1.7;">
                      ${shippingAddress}
                    </p>
                  </div>

                  <p style="margin-top:28px;font-size:15px;line-height:1.8;">
                    Your selections are reserved for production. We will send
                    production and fulfillment updates to this email as your order progresses.
                  </p>

                  ${
                    payment.receipt_url
                      ? `
                        <div style="margin-top:28px;text-align:center;">
                          <a
                            href="${escapeHtml(payment.receipt_url)}"
                            style="display:inline-block;background:#10263F;color:#FFFFFF;text-decoration:none;padding:14px 24px;font-size:11px;letter-spacing:2px;text-transform:uppercase;"
                          >
                            View Square Receipt
                          </a>
                        </div>
                      `
                      : ""
                  }

                  <div style="margin-top:30px;padding-top:22px;border-top:1px solid #E3DDD1;">
                    <p style="margin:0;">
                      <strong>The Gallaspy Golf Club</strong><br />
                      The Gallaspy Development Group, LLC
                    </p>
                    <p style="margin-top:8px;font-size:13px;color:#667085;">
                      thegallaspy.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          `,
        });

        const internalEmail = resend.emails.send({
          from: "The Gallaspy <info@thegallaspy.com>",
          to: ["info@thegallaspy.com"],
          replyTo: email,
          subject: `New Apparel Pre-Order — ${orderReference} — ${firstName} ${lastName}`,
          html: `
            <div style="background:#F7F4EE;padding:40px 20px;font-family:Arial,sans-serif;color:#10263F;">
              <div style="max-width:720px;margin:0 auto;background:#FFFFFF;border:1px solid #E5DED1;">
                <div style="background:#10263F;padding:32px;border-top:6px solid #B3262D;">
                  <p style="margin:0;color:#FFD76A;font-size:11px;letter-spacing:3px;text-transform:uppercase;">
                    The Gallaspy Apparel
                  </p>
                  <h1 style="margin:12px 0 0;color:#FFFFFF;font-family:Georgia,serif;font-weight:400;">
                    New Apparel Pre-Order
                  </h1>
                </div>

                <div style="padding:32px;">
                  <p><strong>Order:</strong> ${escapeHtml(orderReference)}</p>
                  <p><strong>Square Payment:</strong> ${escapeHtml(payment.id)}</p>
                  <p><strong>Customer:</strong> ${safeFirstName} ${safeLastName}</p>
                  <p><strong>Email:</strong> ${safeEmail}</p>
                  <p><strong>Phone:</strong> ${safePhone}</p>

                  <table style="width:100%;border-collapse:collapse;margin-top:24px;">
                    <tbody>
                      ${itemRowsHtml}
                    </tbody>
                  </table>

                  <div style="margin-top:24px;padding-top:18px;border-top:2px solid #10263F;">
                    <p><strong>Subtotal:</strong> ${formatCurrency(subtotalCents)}</p>
                    <p><strong>Shipping:</strong> ${formatCurrency(shippingCents)}</p>
                    <p><strong>Tax:</strong> ${formatCurrency(taxCents)}</p>
                    <p style="font-size:18px;"><strong>Total Paid:</strong> ${formatCurrency(totalCents)}</p>
                    <p><strong>Fulfillment:</strong> UNFULFILLED</p>
                  </div>

                  <div style="margin-top:26px;padding:20px;background:#F7F4EE;">
                    <p style="margin:0 0 10px;font-weight:bold;">Shipping Address</p>
                    <p style="margin:0;line-height:1.7;">${shippingAddress}</p>
                  </div>

                  ${
                    payment.receipt_url
                      ? `
                        <p style="margin-top:24px;">
                          <a href="${escapeHtml(payment.receipt_url)}">
                            View Square Receipt
                          </a>
                        </p>
                      `
                      : ""
                  }
                </div>
              </div>
            </div>
          `,
        });

        const [customerResult, internalResult] =
          await Promise.all([customerEmail, internalEmail]);

        if (customerResult.error || internalResult.error) {
          console.error("Apparel order email error:", {
            customer: customerResult.error,
            internal: internalResult.error,
          });
        }
      } catch (emailError) {
        console.error(
          "Apparel order email exception:",
          emailError
        );
      }
    } else {
      console.error(
        "RESEND_API_KEY is missing. Apparel order completed without confirmation emails."
      );
    }

    return NextResponse.json(
      {
        success: true,
        orderReference,
        paymentId: payment.id,
        receiptUrl: payment.receipt_url || "",
        itemCount: totalItemCount,
        pricing: {
          subtotalCents,
          shippingCents,
          taxCents,
          totalCents,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Apparel payment route error:", error);

    if (squarePaymentAttempted && idempotencyKey) {
      try {
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

        if (supabaseUrl && supabaseSecretKey) {
          const recoveryClient = createClient(
            supabaseUrl,
            supabaseSecretKey,
            {
              auth: {
                persistSession: false,
                autoRefreshToken: false,
              },
            }
          );

          const { error: recoveryError } = await recoveryClient
            .from("apparel_payment_attempts")
            .update({
              payment_state: "needs_review",
              last_error:
                "Payment request interrupted; verify Square status before retrying.",
            })
            .eq("idempotency_key", idempotencyKey)
            .eq("payment_state", "processing");

          if (recoveryError) {
            console.error(
              "Payment exception recovery update failed:",
              recoveryError
            );
          }
        }
      } catch (recoveryException) {
        console.error(
          "Payment exception recovery failed:",
          recoveryException
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        paymentStatusUncertain: squarePaymentAttempted,
        error: squarePaymentAttempted
          ? "Your payment status could not be confirmed. Do not submit another payment. Contact The Gallaspy so we can verify your transaction."
          : "Something went wrong while processing your apparel order.",
      },
      { status: 500 }
    );
  }
}
