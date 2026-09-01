import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import {
  getFalconSocietyCookieName,
  verifyFalconSocietySession,
} from "@/lib/falcon-society-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CatalogProduct = {
  name: string;
  category: string;
  color: string;
  mark: string;
  image: string;
  priceCents: number;
  sizes: readonly string[];
};

const PRODUCT_CATALOG: Record<string, CatalogProduct> = {
  "navy-crest-performance-polo": {
    name: "Crest Performance Polo",
    category: "Men's Performance Polo",
    color: "Navy",
    mark: "Crest",
    image: "/images/apparel/men/polos/navy-crest-polo.png",
    priceCents: 6000,
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  "forest-green-crest-performance-polo": {
    name: "Crest Performance Polo",
    category: "Men's Performance Polo",
    color: "Forest Green",
    mark: "Crest",
    image: "/images/apparel/men/polos/forest-green-crest-polo.png",
    priceCents: 6000,
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  "white-crest-performance-polo": {
    name: "Crest Performance Polo",
    category: "Men's Performance Polo",
    color: "White",
    mark: "Crest",
    image: "/images/apparel/men/polos/white-crest-polo.png",
    priceCents: 6000,
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  "navy-falcon-performance-polo": {
    name: "Falcon Performance Polo",
    category: "Men's Performance Polo",
    color: "Navy",
    mark: "Falcon",
    image: "/images/apparel/men/polos/navy-falcon-polo.png",
    priceCents: 6000,
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  "forest-green-falcon-performance-polo": {
    name: "Falcon Performance Polo",
    category: "Men's Performance Polo",
    color: "Forest Green",
    mark: "Falcon",
    image: "/images/apparel/men/polos/forest-green-falcon-polo.png",
    priceCents: 6000,
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  "white-falcon-performance-polo": {
    name: "Falcon Performance Polo",
    category: "Men's Performance Polo",
    color: "White",
    mark: "Falcon",
    image: "/images/apparel/men/polos/white-falcon-polo.png",
    priceCents: 6000,
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  "navy-script-performance-polo": {
    name: "Script Performance Polo",
    category: "Men's Performance Polo",
    color: "Navy",
    mark: "Script",
    image: "/images/apparel/men/polos/navy-script-polo.png",
    priceCents: 6000,
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  "forest-green-script-performance-polo": {
    name: "Script Performance Polo",
    category: "Men's Performance Polo",
    color: "Forest Green",
    mark: "Script",
    image: "/images/apparel/men/polos/forest-green-script-polo.png",
    priceCents: 6000,
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  "white-script-performance-polo": {
    name: "Script Performance Polo",
    category: "Men's Performance Polo",
    color: "White",
    mark: "Script",
    image: "/images/apparel/men/polos/white-script-polo.png",
    priceCents: 6000,
    sizes: ["S", "M", "L", "XL", "2XL"],
  },

  "navy-womens-falcon-sleeveless-polo": {
    name: "Falcon Sleeveless Polo",
    category: "Women's Performance",
    color: "Navy",
    mark: "Falcon",
    image: "/images/apparel/women/sleeveless-polos/navy-womens-falcon-sleeveless-polo.png",
    priceCents: 4000,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  "forest-green-womens-falcon-sleeveless-polo": {
    name: "Falcon Sleeveless Polo",
    category: "Women's Performance",
    color: "Forest Green",
    mark: "Falcon",
    image: "/images/apparel/women/sleeveless-polos/forest-green-womens-falcon-sleeveless-polo.png",
    priceCents: 4000,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  "white-womens-falcon-sleeveless-polo": {
    name: "Falcon Sleeveless Polo",
    category: "Women's Performance",
    color: "White",
    mark: "Falcon",
    image: "/images/apparel/women/sleeveless-polos/white-womens-falcon-sleeveless-polo.png",
    priceCents: 4000,
    sizes: ["XS", "S", "M", "L", "XL"],
  },

  "navy-womens-falcon-sleeveless-quarter-zip": {
    name: "Falcon Sleeveless Quarter-Zip",
    category: "Women's Performance",
    color: "Navy",
    mark: "Falcon",
    image: "/images/apparel/women/quarter-zips/navy-womens-falcon-sleeveless-quarter-zip.png",
    priceCents: 3500,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  "forest-green-womens-falcon-sleeveless-quarter-zip": {
    name: "Falcon Sleeveless Quarter-Zip",
    category: "Women's Performance",
    color: "Forest Green",
    mark: "Falcon",
    image: "/images/apparel/women/quarter-zips/forest-green-womens-falcon-sleeveless-quarter-zip.png",
    priceCents: 3500,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  "white-womens-falcon-sleeveless-quarter-zip": {
    name: "Falcon Sleeveless Quarter-Zip",
    category: "Women's Performance",
    color: "White",
    mark: "Falcon",
    image: "/images/apparel/women/quarter-zips/white-womens-falcon-sleeveless-quarter-zip.png",
    priceCents: 3500,
    sizes: ["XS", "S", "M", "L", "XL"],
  },

  "navy-womens-falcon-skirt": {
    name: "Falcon Performance Skirt",
    category: "Women's Performance",
    color: "Navy",
    mark: "Falcon",
    image: "/images/apparel/women/skirts/navy-womens-falcon-skirt.png",
    priceCents: 4500,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  "forest-green-womens-falcon-skirt": {
    name: "Falcon Performance Skirt",
    category: "Women's Performance",
    color: "Forest Green",
    mark: "Falcon",
    image: "/images/apparel/women/skirts/forest-green-womens-falcon-skirt.png",
    priceCents: 4500,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  "white-womens-falcon-skirt": {
    name: "Falcon Performance Skirt",
    category: "Women's Performance",
    color: "White",
    mark: "Falcon",
    image: "/images/apparel/women/skirts/white-womens-falcon-skirt.png",
    priceCents: 4500,
    sizes: ["XS", "S", "M", "L", "XL"],
  },

  "navy-crest-performance-hat": {
    name: "Crest Performance Hat",
    category: "Performance Headwear",
    color: "Navy",
    mark: "Crest",
    image: "/images/apparel/headwear/crest/navy-crest-performance-hat.png",
    priceCents: 4500,
    sizes: ["One Size"],
  },
  "forest-green-crest-performance-hat": {
    name: "Crest Performance Hat",
    category: "Performance Headwear",
    color: "Forest Green",
    mark: "Crest",
    image: "/images/apparel/headwear/crest/forest-green-crest-performance-hat.png",
    priceCents: 4500,
    sizes: ["One Size"],
  },
  "white-crest-performance-hat": {
    name: "Crest Performance Hat",
    category: "Performance Headwear",
    color: "White",
    mark: "Crest",
    image: "/images/apparel/headwear/crest/white-crest-performance-hat.png",
    priceCents: 4500,
    sizes: ["One Size"],
  },
  "navy-falcon-performance-hat": {
    name: "Falcon Performance Hat",
    category: "Performance Headwear",
    color: "Navy",
    mark: "Falcon",
    image: "/images/apparel/headwear/falcon/navy-falcon-performance-hat.png",
    priceCents: 4500,
    sizes: ["One Size"],
  },
  "forest-green-falcon-performance-hat": {
    name: "Falcon Performance Hat",
    category: "Performance Headwear",
    color: "Forest Green",
    mark: "Falcon",
    image: "/images/apparel/headwear/falcon/forest-green-falcon-performance-hat.png",
    priceCents: 4500,
    sizes: ["One Size"],
  },
  "white-falcon-performance-hat": {
    name: "Falcon Performance Hat",
    category: "Performance Headwear",
    color: "White",
    mark: "Falcon",
    image: "/images/apparel/headwear/falcon/white-falcon-performance-hat.png",
    priceCents: 4500,
    sizes: ["One Size"],
  },
  "navy-script-performance-hat": {
    name: "Script Performance Hat",
    category: "Performance Headwear",
    color: "Navy",
    mark: "Script",
    image: "/images/apparel/headwear/script/navy-script-performance-hat.png",
    priceCents: 4500,
    sizes: ["One Size"],
  },
  "forest-green-script-performance-hat": {
    name: "Script Performance Hat",
    category: "Performance Headwear",
    color: "Forest Green",
    mark: "Script",
    image: "/images/apparel/headwear/script/forest-green-script-performance-hat.png",
    priceCents: 4500,
    sizes: ["One Size"],
  },
  "white-script-performance-hat": {
    name: "Script Performance Hat",
    category: "Performance Headwear",
    color: "White",
    mark: "Script",
    image: "/images/apparel/headwear/script/white-script-performance-hat.png",
    priceCents: 4500,
    sizes: ["One Size"],
  },

  // Falcon Society — members only
  "falcon-society-founder-mens-polo": {
    name: "Men's Founder Polo",
    category: "Falcon Society Men's Apparel",
    color: "Founder Red",
    mark: "Falcon Society",
    image:
      "/images/apparel/falcon-society/men/red-founder-mens-polo.png",
    priceCents: 7600,
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  "falcon-society-founder-mens-vest": {
    name: "Men's Founder Vest",
    category: "Falcon Society Men's Apparel",
    color: "Founder Red",
    mark: "Falcon Society",
    image:
      "/images/apparel/falcon-society/men/red-founder-mens-vest.png",
    priceCents: 8400,
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  "falcon-society-founder-womens-polo": {
    name: "Women's Founder Polo",
    category: "Falcon Society Women's Apparel",
    color: "Founder Red",
    mark: "Falcon Society",
    image:
      "/images/apparel/falcon-society/women/red-founder-womens-polo.png",
    priceCents: 7600,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  "falcon-society-founder-womens-sleeveless-quarter-zip": {
    name: "Women's Founder Sleeveless Quarter-Zip",
    category: "Falcon Society Women's Apparel",
    color: "Founder Red",
    mark: "Falcon Society",
    image:
      "/images/apparel/falcon-society/women/red-founder-womens-sleeveless-quarter-zip.png",
    priceCents: 8000,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  "falcon-society-founder-womens-skirt": {
    name: "Women's Founder Skirt",
    category: "Falcon Society Women's Apparel",
    color: "Founder Red",
    mark: "Falcon Society",
    image:
      "/images/apparel/falcon-society/women/red-founder-womens-skirt.png",
    priceCents: 6800,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  "falcon-society-red-hat": {
    name: "Red Falcon Society Hat",
    category: "Falcon Society Headwear",
    color: "Founder Red",
    mark: "Falcon Society",
    image:
      "/images/apparel/falcon-society/hats/red-falcon-society-hat.png",
    priceCents: 4500,
    sizes: ["One Size"],
  },
  "falcon-society-navy-hat": {
    name: "Navy Falcon Society Hat",
    category: "Falcon Society Headwear",
    color: "Navy",
    mark: "Falcon Society",
    image:
      "/images/apparel/falcon-society/hats/navy-falcon-society-hat.png",
    priceCents: 4500,
    sizes: ["One Size"],
  },
  "falcon-society-forest-green-hat": {
    name: "Forest Green Falcon Society Hat",
    category: "Falcon Society Headwear",
    color: "Forest Green",
    mark: "Falcon Society",
    image:
      "/images/apparel/falcon-society/hats/forest-green-falcon-society-hat.png",
    priceCents: 4500,
    sizes: ["One Size"],
  },
  "falcon-society-white-hat": {
    name: "White Falcon Society Hat",
    category: "Falcon Society Headwear",
    color: "White",
    mark: "Falcon Society",
    image:
      "/images/apparel/falcon-society/hats/white-falcon-society-hat.png",
    priceCents: 4500,
    sizes: ["One Size"],
  },
};

type RequestItem = {
  slug?: string;
  size?: string;
  quantity?: number;
};

type ApparelPaymentBody = {
  sourceId?: string;
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
          error: "Please accept the apparel purchase terms before continuing.",
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

    const idempotencyKey = randomUUID();

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
        note: `Gallaspy Apparel — ${orderSummary}`,
      }),
    });

    const squareResult = await squareResponse.json();

    if (!squareResponse.ok) {
      console.error("Square apparel payment error:", squareResult);

      const message =
        squareResult?.errors?.[0]?.detail ||
        squareResult?.errors?.[0]?.code ||
        "Square was unable to process the payment.";

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

      return NextResponse.json(
        {
          success: false,
          error: "The payment did not complete successfully.",
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

    const { data: orderRecord, error: orderInsertError } =
      await supabase
        .from("apparel_orders_v2")
        .insert({
          order_reference: orderReference,
          square_payment_id: payment.id,
          square_receipt_url: payment.receipt_url || null,
          payment_status: payment.status.toLowerCase(),

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
        })
        .select("id")
        .single();

    if (orderInsertError || !orderRecord?.id) {
      console.error(
        "Apparel order database insert error:",
        orderInsertError
      );

      return NextResponse.json(
        {
          success: false,
          paymentSucceeded: true,
          paymentId: payment.id,
          receiptUrl: payment.receipt_url || "",
          orderReference,
          error:
            "Payment succeeded, but we could not finish recording the order. Do not submit another payment. Please contact The Gallaspy with your order reference.",
        },
        { status: 500 }
      );
    }

    const orderItemRows = validatedItems.map((item) => ({
      order_id: orderRecord.id,
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

    const { error: itemInsertError } = await supabase
      .from("apparel_order_items")
      .insert(orderItemRows);

    if (itemInsertError) {
      console.error(
        "Apparel order items database insert error:",
        itemInsertError
      );

      return NextResponse.json(
        {
          success: false,
          paymentSucceeded: true,
          paymentId: payment.id,
          receiptUrl: payment.receipt_url || "",
          orderReference,
          error:
            "Payment succeeded, but we could not finish recording all order items. Do not submit another payment. Please contact The Gallaspy with your order reference.",
        },
        { status: 500 }
      );
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
          subject: `Your Gallaspy Order Is Confirmed — ${orderReference}`,
          html: `
            <div style="background:#F7F4EE;padding:40px 20px;font-family:Arial,sans-serif;color:#10263F;">
              <div style="max-width:680px;margin:0 auto;background:#FFFFFF;border:1px solid #E5DED1;overflow:hidden;">
                <div style="background:#10263F;padding:34px 28px;text-align:center;border-top:6px solid #B3262D;">
                  <p style="margin:0;color:#FFD76A;font-size:11px;letter-spacing:3px;text-transform:uppercase;">
                    The Gallaspy Apparel
                  </p>
                  <h1 style="margin:14px 0 0;color:#FFFFFF;font-family:Georgia,serif;font-size:32px;font-weight:400;">
                    Order Confirmed
                  </h1>
                </div>

                <div style="padding:34px;">
                  <p style="margin-top:0;font-size:16px;line-height:1.8;">
                    Hello ${safeFirstName},
                  </p>

                  <p style="font-size:16px;line-height:1.8;">
                    Thank you for your purchase from The Gallaspy Apparel.
                    Your payment was successfully processed and your order has been received.
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
                    We will send additional communication regarding fulfillment
                    and shipping as your order progresses.
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
          subject: `New Apparel Order — ${orderReference} — ${firstName} ${lastName}`,
          html: `
            <div style="background:#F7F4EE;padding:40px 20px;font-family:Arial,sans-serif;color:#10263F;">
              <div style="max-width:720px;margin:0 auto;background:#FFFFFF;border:1px solid #E5DED1;">
                <div style="background:#10263F;padding:32px;border-top:6px solid #B3262D;">
                  <p style="margin:0;color:#FFD76A;font-size:11px;letter-spacing:3px;text-transform:uppercase;">
                    The Gallaspy Apparel
                  </p>
                  <h1 style="margin:12px 0 0;color:#FFFFFF;font-family:Georgia,serif;font-weight:400;">
                    New Apparel Order
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

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while processing your apparel order.",
      },
      { status: 500 }
    );
  }
}
