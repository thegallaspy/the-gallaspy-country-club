import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { PRODUCT_CATALOG } from "@/lib/apparel-catalog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function fail(message: string, status: number) {
  return NextResponse.json(
    { success: false, error: message },
    { status, headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get("origin");
    const expectedOrigin = new URL(request.url).origin;

    if (origin && origin !== expectedOrigin) {
      return fail("Invalid checkout origin.", 403);
    }

    const body: unknown = await request.json();
    const token =
      body && typeof body === "object" && !Array.isArray(body)
        ? (body as { token?: unknown }).token
        : undefined;

    if (
      typeof token !== "string" ||
      !/^[a-f0-9]{64}$/.test(token)
    ) {
      return fail("Invalid checkout session.", 400);
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SECRET_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return fail("Checkout is temporarily unavailable.", 503);
    }

    const tokenHash = createHash("sha256")
      .update(token)
      .digest("hex");

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { data: session, error } = await supabase
      .from("native_apparel_checkout_sessions")
      .select("items, expires_at, consumed_at, payment_state")
      .eq("token_hash", tokenHash)
      .maybeSingle();

    if (error || !session) {
      return fail("Checkout session not found.", 404);
    }

    if (
      session.consumed_at ||
      new Date(session.expires_at).getTime() <= Date.now()
    ) {
      return fail("Checkout session has expired.", 410);
    }

    if (session.payment_state !== "ready") {
      return fail(
        "This checkout has already been submitted. If you may have been charged, contact The Gallaspy before trying again.",
        409
      );
    }

    if (!Array.isArray(session.items)) {
      return fail("Invalid checkout session.", 400);
    }

    const cart = [];

    for (const item of session.items) {
      const slug = item?.slug;
      const size = item?.size;
      const quantity = item?.quantity;

      if (
        typeof slug !== "string" ||
        typeof size !== "string" ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 10 ||
        slug.startsWith("falcon-society-")
      ) {
        return fail("Invalid checkout items.", 400);
      }

      const product = Object.prototype.hasOwnProperty.call(
        PRODUCT_CATALOG,
        slug
      )
        ? PRODUCT_CATALOG[slug]
        : undefined;

      if (!product || !product.sizes.includes(size)) {
        return fail("Product is no longer available.", 409);
      }

      cart.push({
        id: `${slug}-${size}`,
        slug,
        name: product.name,
        color: product.color,
        price: `$${(product.priceCents / 100).toFixed(2)}`,
        image: product.image,
        size,
        quantity,
      });
    }

    return NextResponse.json(
      { success: true, items: cart },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Native checkout retrieval error:", error);
    return fail("Unable to retrieve checkout.", 500);
  }
}
