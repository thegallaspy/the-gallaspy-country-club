import { createHash, randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { PRODUCT_CATALOG } from "@/lib/apparel-catalog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RequestItem = {
  slug?: unknown;
  size?: unknown;
  quantity?: unknown;
};

function errorResponse(
  message: string,
  status: number,
  origin: string | null = null
) {
  return NextResponse.json(
    { success: false, error: message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        ...corsHeaders(origin),
      },
    }
  );
}

const ALLOWED_ORIGINS = new Set([
  "capacitor://localhost",
  "http://localhost",
]);

function corsHeaders(origin: string | null): Record<string, string> {
  if (!origin || !ALLOWED_ORIGINS.has(origin)) {
    return {};
  }

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Vary": "Origin",
  };
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (!origin || !ALLOWED_ORIGINS.has(origin)) {
    return new NextResponse(null, { status: 403 });
  }

  return new NextResponse(null, {
    status: 204,
    headers: {
      ...corsHeaders(origin),
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get("origin");

    const checkoutError = (message: string, status: number) =>
      errorResponse(message, status, origin);

    if (origin && !ALLOWED_ORIGINS.has(origin)) {
      return checkoutError("Checkout origin not permitted.", 403);
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SECRET_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return checkoutError("Checkout is temporarily unavailable.", 503);
    }

    const body: unknown = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return checkoutError("Invalid checkout request.", 400);
    }

    const items = (body as { items?: unknown }).items;

    if (!Array.isArray(items) || items.length === 0 || items.length > 27) {
      return checkoutError("Invalid shopping bag.", 400);
    }

    const validatedItems: {
      slug: string;
      size: string;
      quantity: number;
    }[] = [];

    let totalQuantity = 0;
    const seen = new Set<string>();

    for (const rawItem of items as RequestItem[]) {
      if (!rawItem || typeof rawItem !== "object") {
        return checkoutError("Invalid product.", 400);
      }

      const slug =
        typeof rawItem.slug === "string" ? rawItem.slug.trim() : "";

      const size =
        typeof rawItem.size === "string"
          ? rawItem.size.trim() === "OneSize"
            ? "One Size"
            : rawItem.size.trim()
          : "";

      const quantity = rawItem.quantity;

      if (slug.startsWith("falcon-society-")) {
        return checkoutError(
          "Falcon Society merchandise requires verified member access.",
          403
        );
      }

      const product = Object.prototype.hasOwnProperty.call(
        PRODUCT_CATALOG,
        slug
      )
        ? PRODUCT_CATALOG[slug]
        : undefined;

      if (!product || !product.sizes.includes(size)) {
        return checkoutError("Invalid product or size.", 400);
      }

      if (
        typeof quantity !== "number" ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 10
      ) {
        return checkoutError("Invalid item quantity.", 400);
      }

      const lineKey = `${slug}:${size}`;

      if (seen.has(lineKey)) {
        return checkoutError("Duplicate product selection.", 400);
      }

      seen.add(lineKey);
      totalQuantity += quantity;

      if (totalQuantity > 30) {
        return checkoutError("Shopping bag exceeds 30 items.", 400);
      }

      validatedItems.push({ slug, size, quantity });
    }

    const token = randomBytes(32).toString("hex");
    const tokenHash = createHash("sha256")
      .update(token)
      .digest("hex");

    const expiresAt = new Date(
      Date.now() + 15 * 60 * 1000
    ).toISOString();

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const authorization = request.headers.get("authorization");
    let verifiedUserId: string | null = null;

    if (authorization !== null) {
      if (!authorization.startsWith("Bearer ")) {
        return checkoutError("Invalid member authentication.", 401);
      }

      const accessToken = authorization.slice(7).trim();

      if (!accessToken) {
        return checkoutError("Invalid member authentication.", 401);
      }

      const { data: authData, error: authError } =
        await supabase.auth.getUser(accessToken);

      if (authError || !authData.user?.id) {
        return checkoutError(
          "Your Gallaspy session has expired. Please sign in again.",
          401
        );
      }

      verifiedUserId = authData.user.id;
    }

    const { error } = await supabase
      .from("native_apparel_checkout_sessions")
      .insert({
        token_hash: tokenHash,
        items: validatedItems,
        expires_at: expiresAt,
        user_id: verifiedUserId,
      });

    if (error) {
      console.error("Native checkout session error:", error);
      return errorResponse("Unable to start checkout.", 500, request.headers.get("origin"));
    }

    return NextResponse.json(
      {
        success: true,
        token,
        expiresAt,
      },
      {
        headers: {
          "Cache-Control": "no-store",
          ...corsHeaders(request.headers.get("origin")),
        },
      }
    );
  } catch (error) {
    console.error("Native checkout request error:", error);
    return errorResponse("Unable to start checkout.", 500, request.headers.get("origin"));
  }
}
