import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PRODUCT_CATALOG = {
  polo: {
    name: "The Gallaspy Performance Polo",
    priceCents: 7000,
    requiresSize: true,
  },
  hat: {
    name: "The Gallaspy Club Hat",
    priceCents: 4500,
    requiresSize: false,
  },
} as const;

const ALLOWED_COLORS = [
  "Navy",
  "White",
  "Forest Green",
] as const;

const ALLOWED_DESIGNS = [
  "Script",
  "Crest",
] as const;

const ALLOWED_POLO_SIZES = [
  "S",
  "M",
  "L",
  "XL",
] as const;

type ProductType = keyof typeof PRODUCT_CATALOG;

type ApparelPaymentBody = {
  sourceId?: string;

  productType?: string;
  color?: string;
  design?: string;
  size?: string;
  quantity?: number;

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

function isProductType(value: string): value is ProductType {
  return value === "polo" || value === "hat";
}

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function formatCurrency(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export async function POST(request: NextRequest) {
  try {
    /*
     * ---------------------------------------------------------
     * SERVER CONFIGURATION
     * ---------------------------------------------------------
     */

    const accessToken = process.env.SQUARE_ACCESS_TOKEN;
    const locationId = process.env.SQUARE_LOCATION_ID;
    const squareEnvironment =
      process.env.SQUARE_ENVIRONMENT ?? "sandbox";

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseSecretKey =
      process.env.SUPABASE_SECRET_KEY;

    const resendApiKey =
      process.env.RESEND_API_KEY;

    if (!accessToken || !locationId) {
      console.error(
        "Square apparel credentials are missing."
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Apparel payment service is not configured.",
        },
        { status: 500 }
      );
    }

    if (!supabaseUrl || !supabaseSecretKey) {
      console.error(
        "Supabase apparel credentials are missing."
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Apparel order database is not configured.",
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

    /*
     * ---------------------------------------------------------
     * REQUEST
     * ---------------------------------------------------------
     */

    const body =
      (await request.json()) as ApparelPaymentBody;

    const sourceId = clean(body.sourceId);

    const productType = clean(
      body.productType
    ).toLowerCase();

    const color = clean(body.color);
    const design = clean(body.design);
    const size = clean(body.size);

    const firstName = clean(body.firstName);
    const lastName = clean(body.lastName);
    const email = clean(body.email);
    const phone = clean(body.phone);

    const shippingAddress1 = clean(
      body.shippingAddress1
    );

    const shippingAddress2 = clean(
      body.shippingAddress2
    );

    const shippingCity = clean(
      body.shippingCity
    );

    const shippingState = clean(
      body.shippingState
    );

    const shippingPostalCode = clean(
      body.shippingPostalCode
    );

    /*
     * ---------------------------------------------------------
     * PAYMENT TOKEN
     * ---------------------------------------------------------
     */

    if (!sourceId) {
      return NextResponse.json(
        {
          success: false,
          error:
            "A valid Square payment token is required.",
        },
        { status: 400 }
      );
    }

    /*
     * ---------------------------------------------------------
     * PRODUCT VALIDATION
     * ---------------------------------------------------------
     */

    if (!isProductType(productType)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid apparel product.",
        },
        { status: 400 }
      );
    }

    const product =
      PRODUCT_CATALOG[productType];

    if (
      !ALLOWED_COLORS.includes(
        color as (typeof ALLOWED_COLORS)[number]
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid apparel color.",
        },
        { status: 400 }
      );
    }

    if (
      !ALLOWED_DESIGNS.includes(
        design as (typeof ALLOWED_DESIGNS)[number]
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid apparel design.",
        },
        { status: 400 }
      );
    }

    if (
      product.requiresSize &&
      !ALLOWED_POLO_SIZES.includes(
        size as (typeof ALLOWED_POLO_SIZES)[number]
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please select a valid polo size.",
        },
        { status: 400 }
      );
    }

    /*
     * ---------------------------------------------------------
     * QUANTITY
     * ---------------------------------------------------------
     */

    const quantity = Number(
      body.quantity ?? 1
    );

    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 10
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid order quantity.",
        },
        { status: 400 }
      );
    }

    /*
     * ---------------------------------------------------------
     * CUSTOMER VALIDATION
     * ---------------------------------------------------------
     */

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please complete your contact information.",
        },
        { status: 400 }
      );
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    /*
     * ---------------------------------------------------------
     * SHIPPING VALIDATION
     * ---------------------------------------------------------
     */

    if (
      !shippingAddress1 ||
      !shippingCity ||
      !shippingState ||
      !shippingPostalCode
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please complete your shipping address.",
        },
        { status: 400 }
      );
    }

    /*
     * ---------------------------------------------------------
     * PURCHASE TERMS
     * ---------------------------------------------------------
     */

    if (body.acceptedTerms !== true) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please accept the apparel purchase terms before continuing.",
        },
        { status: 400 }
      );
    }

    /*
     * ---------------------------------------------------------
     * SERVER-SIDE PRICING
     *
     * Polo: $70
     * Hat: $45
     * Flat shipping: $8.95 per order
     * ---------------------------------------------------------
     */

    const unitPriceCents =
      product.priceCents;

    const subtotalCents =
      unitPriceCents * quantity;

    const shippingCents = 895;
    const taxCents = 0;

    const totalCents =
      subtotalCents +
      shippingCents +
      taxCents;

    /*
     * ---------------------------------------------------------
     * ORDER REFERENCES
     * ---------------------------------------------------------
     */

    const orderReference =
      `apparel-${Date.now()}-${randomUUID().slice(
        0,
        8
      )}`;

    const idempotencyKey =
      randomUUID();

    const variation =
      productType === "polo"
        ? `${color} / ${design} / ${size}`
        : `${color} / ${design}`;

    /*
     * ---------------------------------------------------------
     * SQUARE PAYMENT
     * ---------------------------------------------------------
     */

    const squareBaseUrl =
      squareEnvironment === "production"
        ? "https://connect.squareup.com"
        : "https://connect.squareupsandbox.com";

    const squareResponse = await fetch(
      `${squareBaseUrl}/v2/payments`,
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${accessToken}`,

          "Content-Type":
            "application/json",

          "Square-Version":
            "2026-07-15",
        },

        body: JSON.stringify({
          source_id:
            sourceId,

          idempotency_key:
            idempotencyKey,

          amount_money: {
            amount:
              totalCents,

            currency:
              "USD",
          },

          location_id:
            locationId,

          autocomplete:
            true,

          reference_id:
            orderReference,

          note:
            `${product.name} — ${variation} — ` +
            `Qty ${quantity} — ${firstName} ${lastName}`,
        }),
      }
    );

    const squareResult =
      await squareResponse.json();

    /*
     * ---------------------------------------------------------
     * SQUARE ERROR
     * ---------------------------------------------------------
     */

    if (!squareResponse.ok) {
      console.error(
        "Square apparel payment error:",
        squareResult
      );

      const message =
        squareResult?.errors?.[0]?.detail ||
        squareResult?.errors?.[0]?.code ||
        "Square was unable to process the payment.";

      return NextResponse.json(
        {
          success: false,
          error: message,
        },
        {
          status:
            squareResponse.status,
        }
      );
    }

    const payment =
      squareResult.payment;

    /*
     * ---------------------------------------------------------
     * CONFIRM PAYMENT
     * ---------------------------------------------------------
     */

    if (
      !payment?.id ||
      payment.status !== "COMPLETED"
    ) {
      console.error(
        "Unexpected Square apparel payment result:",
        squareResult
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "The payment did not complete successfully.",
        },
        { status: 502 }
      );
    }

    /*
     * ---------------------------------------------------------
     * SAVE ORDER TO SUPABASE
     * ---------------------------------------------------------
     */

    const { error: orderInsertError } =
      await supabase
        .from("apparel_orders")
        .insert({
          order_reference:
            orderReference,

          square_payment_id:
            payment.id,

          square_receipt_url:
            payment.receipt_url || null,

          payment_status:
            payment.status.toLowerCase(),

          product_type:
            productType,

          product_name:
            product.name,

          color,

          design,

          size:
            productType === "polo"
              ? size
              : null,

          quantity,

          unit_price_cents:
            unitPriceCents,

          subtotal_cents:
            subtotalCents,

          shipping_cents:
            shippingCents,

          tax_cents:
            taxCents,

          total_cents:
            totalCents,

          first_name:
            firstName,

          last_name:
            lastName,

          email,

          phone,

          shipping_address_1:
            shippingAddress1,

          shipping_address_2:
            shippingAddress2 || null,

          shipping_city:
            shippingCity,

          shipping_state:
            shippingState,

          shipping_postal_code:
            shippingPostalCode,

          shipping_country:
            "US",

          fulfillment_status:
            "unfulfilled",
        });

    /*
     * ---------------------------------------------------------
     * DATABASE FAILURE AFTER SUCCESSFUL PAYMENT
     * ---------------------------------------------------------
     */

    if (orderInsertError) {
      console.error(
        "Apparel order database insert error:",
        orderInsertError
      );

      return NextResponse.json(
        {
          success: false,

          paymentSucceeded: true,

          paymentId:
            payment.id,

          receiptUrl:
            payment.receipt_url || "",

          error:
            "Payment succeeded, but the order record could not be created. Please contact The Gallaspy with your payment reference.",
        },
        { status: 500 }
      );
    }

    /*
     * ---------------------------------------------------------
     * ORDER CONFIRMATION EMAILS
     * ---------------------------------------------------------
     *
     * Payment and database storage have already succeeded.
     * Email failures must NOT fail the order.
     * ---------------------------------------------------------
     */

    if (resendApiKey) {
      try {
        const resend =
          new Resend(resendApiKey);

        const safeSize =
          productType === "polo"
            ? size
            : "";

        const shippingAddress = [
          shippingAddress1,

          shippingAddress2,

          `${shippingCity}, ${shippingState} ${shippingPostalCode}`,

          "United States",
        ]
          .filter(Boolean)
          .join("<br />");

        /*
         * -----------------------------------------------------
         * CUSTOMER CONFIRMATION
         * -----------------------------------------------------
         */

        const customerEmail =
          resend.emails.send({
            from:
              "The Gallaspy <info@thegallaspy.com>",

            to: [email],

            replyTo:
              "info@thegallaspy.com",

            subject:
              `Your Gallaspy Order Is Confirmed — ${orderReference}`,

            html: `
              <div
                style="
                  background:#F7F4EE;
                  padding:40px 20px;
                  font-family:Arial,sans-serif;
                  color:#10263F;
                "
              >
                <div
                  style="
                    max-width:680px;
                    margin:0 auto;
                    background:#FFFFFF;
                    border:1px solid #E5DED1;
                    border-radius:20px;
                    overflow:hidden;
                  "
                >
                  <div
                    style="
                      background:#10263F;
                      padding:34px 28px;
                      text-align:center;
                    "
                  >
                    <p
                      style="
                        margin:0;
                        color:#B89146;
                        font-size:11px;
                        letter-spacing:3px;
                        text-transform:uppercase;
                      "
                    >
                      The Gallaspy Collection
                    </p>

                    <h1
                      style="
                        margin:14px 0 0;
                        color:#FFFFFF;
                        font-family:Georgia,serif;
                        font-size:32px;
                        font-weight:400;
                      "
                    >
                      Order Confirmed
                    </h1>
                  </div>

                  <div style="padding:34px;">
                    <p
                      style="
                        margin-top:0;
                        font-size:16px;
                        line-height:1.8;
                      "
                    >
                      Hello ${firstName},
                    </p>

                    <p
                      style="
                        font-size:16px;
                        line-height:1.8;
                      "
                    >
                      Thank you for your purchase from
                      The Gallaspy Collection. Your
                      payment was successfully processed
                      and your order has been received.
                    </p>

                    <div
                      style="
                        margin:28px 0;
                        padding:22px;
                        background:#F7F4EE;
                        border-left:3px solid #B89146;
                      "
                    >
                      <p
                        style="
                          margin:0 0 8px;
                          font-size:11px;
                          letter-spacing:2px;
                          text-transform:uppercase;
                          color:#8B6A34;
                        "
                      >
                        Order Reference
                      </p>

                      <p
                        style="
                          margin:0;
                          font-family:Georgia,serif;
                          font-size:24px;
                        "
                      >
                        ${orderReference}
                      </p>
                    </div>

                    <table
                      style="
                        width:100%;
                        border-collapse:collapse;
                      "
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              padding:9px 0;
                              font-weight:bold;
                            "
                          >
                            Product
                          </td>

                          <td
                            style="
                              padding:9px 0;
                              text-align:right;
                            "
                          >
                            ${product.name}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              padding:9px 0;
                              font-weight:bold;
                            "
                          >
                            Color
                          </td>

                          <td
                            style="
                              padding:9px 0;
                              text-align:right;
                            "
                          >
                            ${color}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              padding:9px 0;
                              font-weight:bold;
                            "
                          >
                            Design
                          </td>

                          <td
                            style="
                              padding:9px 0;
                              text-align:right;
                            "
                          >
                            ${design}
                          </td>
                        </tr>

                        ${
                          productType === "polo"
                            ? `
                              <tr>
                                <td
                                  style="
                                    padding:9px 0;
                                    font-weight:bold;
                                  "
                                >
                                  Size
                                </td>

                                <td
                                  style="
                                    padding:9px 0;
                                    text-align:right;
                                  "
                                >
                                  ${safeSize}
                                </td>
                              </tr>
                            `
                            : ""
                        }

                        <tr>
                          <td
                            style="
                              padding:9px 0;
                              font-weight:bold;
                            "
                          >
                            Quantity
                          </td>

                          <td
                            style="
                              padding:9px 0;
                              text-align:right;
                            "
                          >
                            ${quantity}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              padding:9px 0;
                              font-weight:bold;
                            "
                          >
                            Unit Price
                          </td>

                          <td
                            style="
                              padding:9px 0;
                              text-align:right;
                            "
                          >
                            ${formatCurrency(unitPriceCents)}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              padding:9px 0;
                              font-weight:bold;
                            "
                          >
                            Subtotal
                          </td>

                          <td
                            style="
                              padding:9px 0;
                              text-align:right;
                            "
                          >
                            ${formatCurrency(subtotalCents)}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              padding:9px 0;
                              font-weight:bold;
                            "
                          >
                            Shipping
                          </td>

                          <td
                            style="
                              padding:9px 0;
                              text-align:right;
                            "
                          >
                            ${formatCurrency(shippingCents)}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              padding:9px 0;
                              font-weight:bold;
                            "
                          >
                            Tax
                          </td>

                          <td
                            style="
                              padding:9px 0;
                              text-align:right;
                            "
                          >
                            ${formatCurrency(taxCents)}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              padding:14px 0 6px;
                              font-weight:bold;
                              font-size:16px;
                            "
                          >
                            Total Paid
                          </td>

                          <td
                            style="
                              padding:14px 0 6px;
                              text-align:right;
                              font-weight:bold;
                              font-size:16px;
                              color:#8B6A34;
                            "
                          >
                            ${formatCurrency(totalCents)}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div
                      style="
                        margin-top:28px;
                        padding:22px;
                        background:#F7F4EE;
                        border-radius:12px;
                      "
                    >
                      <p
                        style="
                          margin:0 0 10px;
                          font-weight:bold;
                        "
                      >
                        Shipping Address
                      </p>

                      <p
                        style="
                          margin:0;
                          line-height:1.7;
                        "
                      >
                        ${shippingAddress}
                      </p>
                    </div>

                    <p
                      style="
                        margin-top:28px;
                        font-size:15px;
                        line-height:1.8;
                      "
                    >
                      We will send additional
                      communication regarding
                      fulfillment and shipping as
                      your order progresses.
                    </p>

                    ${
                      payment.receipt_url
                        ? `
                          <div
                            style="
                              margin-top:28px;
                              text-align:center;
                            "
                          >
                            <a
                              href="${payment.receipt_url}"
                              style="
                                display:inline-block;
                                background:#10263F;
                                color:#FFFFFF;
                                text-decoration:none;
                                padding:14px 24px;
                                border-radius:999px;
                                font-size:11px;
                                letter-spacing:2px;
                                text-transform:uppercase;
                              "
                            >
                              View Square Receipt
                            </a>
                          </div>
                        `
                        : ""
                    }

                    <p
                      style="
                        margin-top:32px;
                        font-size:12px;
                        line-height:1.7;
                        color:#667085;
                      "
                    >
                      Purchasing Gallaspy apparel does
                      not provide membership, Falcon
                      Society status, club privileges,
                      or priority membership
                      consideration.
                    </p>

                    <div
                      style="
                        margin-top:30px;
                        padding-top:22px;
                        border-top:1px solid #E3DDD1;
                      "
                    >
                      <p style="margin:0;">
                        <strong>
                          The Gallaspy
                        </strong>
                        <br />
                        The Gallaspy Development Group,
                        LLC
                      </p>

                      <p
                        style="
                          margin-top:8px;
                          font-size:13px;
                          color:#667085;
                        "
                      >
                        thegallaspy.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            `,
          });

        /*
         * -----------------------------------------------------
         * INTERNAL ORDER NOTIFICATION
         * -----------------------------------------------------
         */

        const internalEmail =
          resend.emails.send({
            from:
              "The Gallaspy <info@thegallaspy.com>",

            to: [
              "info@thegallaspy.com",
            ],

            replyTo:
              email,

            subject:
              `New Apparel Order — ${orderReference} — ${firstName} ${lastName}`,

            html: `
              <div
                style="
                  background:#F7F4EE;
                  padding:40px 20px;
                  font-family:Arial,sans-serif;
                  color:#10263F;
                "
              >
                <div
                  style="
                    max-width:720px;
                    margin:0 auto;
                    background:#FFFFFF;
                    border:1px solid #E5DED1;
                    border-radius:20px;
                    overflow:hidden;
                  "
                >
                  <div
                    style="
                      background:#10263F;
                      padding:32px;
                    "
                  >
                    <p
                      style="
                        margin:0;
                        color:#B89146;
                        font-size:11px;
                        letter-spacing:3px;
                        text-transform:uppercase;
                      "
                    >
                      The Gallaspy Apparel
                    </p>

                    <h1
                      style="
                        margin:12px 0 0;
                        color:#FFFFFF;
                        font-family:Georgia,serif;
                        font-weight:400;
                      "
                    >
                      New Apparel Order
                    </h1>
                  </div>

                  <div style="padding:32px;">
                    <table
                      style="
                        width:100%;
                        border-collapse:collapse;
                      "
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              padding:9px 0;
                              font-weight:bold;
                            "
                          >
                            Order Reference
                          </td>

                          <td style="padding:9px 0;">
                            ${orderReference}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              padding:9px 0;
                              font-weight:bold;
                            "
                          >
                            Square Payment ID
                          </td>

                          <td style="padding:9px 0;">
                            ${payment.id}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              padding:9px 0;
                              font-weight:bold;
                            "
                          >
                            Customer
                          </td>

                          <td style="padding:9px 0;">
                            ${firstName} ${lastName}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              padding:9px 0;
                              font-weight:bold;
                            "
                          >
                            Email
                          </td>

                          <td style="padding:9px 0;">
                            ${email}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              padding:9px 0;
                              font-weight:bold;
                            "
                          >
                            Phone
                          </td>

                          <td style="padding:9px 0;">
                            ${phone}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              padding:9px 0;
                              font-weight:bold;
                            "
                          >
                            Product
                          </td>

                          <td style="padding:9px 0;">
                            ${product.name}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              padding:9px 0;
                              font-weight:bold;
                            "
                          >
                            Color
                          </td>

                          <td style="padding:9px 0;">
                            ${color}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              padding:9px 0;
                              font-weight:bold;
                            "
                          >
                            Design
                          </td>

                          <td style="padding:9px 0;">
                            ${design}
                          </td>
                        </tr>

                        ${
                          productType === "polo"
                            ? `
                              <tr>
                                <td
                                  style="
                                    padding:9px 0;
                                    font-weight:bold;
                                  "
                                >
                                  Size
                                </td>

                                <td style="padding:9px 0;">
                                  ${safeSize}
                                </td>
                              </tr>
                            `
                            : ""
                        }

                        <tr>
                          <td
                            style="
                              padding:9px 0;
                              font-weight:bold;
                            "
                          >
                            Quantity
                          </td>

                          <td style="padding:9px 0;">
                            ${quantity}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              padding:9px 0;
                              font-weight:bold;
                            "
                          >
                            Unit Price
                          </td>

                          <td style="padding:9px 0;">
                            ${formatCurrency(unitPriceCents)}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              padding:9px 0;
                              font-weight:bold;
                            "
                          >
                            Subtotal
                          </td>

                          <td style="padding:9px 0;">
                            ${formatCurrency(subtotalCents)}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              padding:9px 0;
                              font-weight:bold;
                            "
                          >
                            Shipping
                          </td>

                          <td style="padding:9px 0;">
                            ${formatCurrency(shippingCents)}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              padding:9px 0;
                              font-weight:bold;
                            "
                          >
                            Tax
                          </td>

                          <td style="padding:9px 0;">
                            ${formatCurrency(taxCents)}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              padding:9px 0;
                              font-weight:bold;
                            "
                          >
                            Total Paid
                          </td>

                          <td
                            style="
                              padding:9px 0;
                              font-weight:bold;
                              color:#8B6A34;
                            "
                          >
                            ${formatCurrency(totalCents)}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              padding:9px 0;
                              font-weight:bold;
                            "
                          >
                            Fulfillment
                          </td>

                          <td style="padding:9px 0;">
                            UNFULFILLED
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div
                      style="
                        margin-top:26px;
                        padding:20px;
                        background:#F7F4EE;
                        border-radius:12px;
                      "
                    >
                      <p
                        style="
                          margin:0 0 10px;
                          font-weight:bold;
                        "
                      >
                        Shipping Address
                      </p>

                      <p
                        style="
                          margin:0;
                          line-height:1.7;
                        "
                      >
                        ${shippingAddress}
                      </p>
                    </div>

                    ${
                      payment.receipt_url
                        ? `
                          <p style="margin-top:24px;">
                            <a href="${payment.receipt_url}">
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

        const [
          customerResult,
          internalResult,
        ] = await Promise.all([
          customerEmail,
          internalEmail,
        ]);

        if (
          customerResult.error ||
          internalResult.error
        ) {
          console.error(
            "Apparel order email error:",
            {
              customer:
                customerResult.error,

              internal:
                internalResult.error,
            }
          );
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

    /*
     * ---------------------------------------------------------
     * SUCCESS RESPONSE
     * ---------------------------------------------------------
     */

    return NextResponse.json(
      {
        success: true,

        orderReference,

        paymentId:
          payment.id,

        receiptUrl:
          payment.receipt_url || "",

        product: {
          type:
            productType,

          name:
            product.name,

          color,

          design,

          size:
            productType === "polo"
              ? size
              : null,

          quantity,
        },

        pricing: {
          unitPriceCents,

          subtotalCents,

          shippingCents,

          taxCents,

          totalCents,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Apparel payment route error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Something went wrong while processing your apparel order.",
      },
      { status: 500 }
    );
  }
}