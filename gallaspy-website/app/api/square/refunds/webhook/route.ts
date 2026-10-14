import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NOTIFICATION_URL =
  process.env.SQUARE_WEBHOOK_NOTIFICATION_URL ??
  "https://thegallaspy.com/api/square/refunds/webhook";

function verifySquareSignature(
  body: string,
  signature: string,
  signatureKey: string
): boolean {
  const expected = createHmac("sha256", signatureKey)
    .update(NOTIFICATION_URL + body, "utf8")
    .digest();

  let received: Buffer;

  try {
    received = Buffer.from(signature, "base64");
  } catch {
    return false;
  }

  return (
    received.length === expected.length &&
    timingSafeEqual(received, expected)
  );
}

export async function POST(request: NextRequest) {
  const signatureKey =
    process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;

  if (!signatureKey) {
    console.error("Square webhook signature key is missing.");

    return NextResponse.json(
      { error: "Webhook unavailable" },
      { status: 503 }
    );
  }

  const signature =
    request.headers.get("x-square-hmacsha256-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing webhook signature" },
      { status: 401 }
    );
  }

  const rawBody = await request.text();

  if (!verifySquareSignature(rawBody, signature, signatureKey)) {
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 401 }
    );
  }

  let event: { type?: string };

  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { error: "Invalid webhook payload" },
      { status: 400 }
    );
  }

  if (event.type !== "refund.updated") {
    return NextResponse.json({ received: true });
  }

  // Refund processing will be added after Square verification
  // and database settlement safeguards are connected.
  return NextResponse.json({
    received: true,
    processing: "not_configured",
  });
}
