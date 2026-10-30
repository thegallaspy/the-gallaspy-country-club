import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { reconcileStandardMembershipRefund } from "@/lib/square/reconcile-standard-membership-refund";
import { verifySquareRefund } from "@/lib/square/verify-refund";
import { reconcileApparelRefund } from "@/lib/square/reconcile-apparel-refund";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NOTIFICATION_URL = process.env.SQUARE_WEBHOOK_NOTIFICATION_URL ??
  "https://thegallaspy.com/api/square/refunds/webhook";

function respond(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {status, headers: {"Cache-Control": "no-store"}});
}
function signatureValid(body: string, signature: string, key: string): boolean {
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(signature)) return false;
  const expected = createHmac("sha256", key).update(NOTIFICATION_URL + body, "utf8").digest();
  const received = Buffer.from(signature, "base64");
  return received.length === expected.length && timingSafeEqual(received, expected);
}
type SquareRefundEvent = {
  type?: string; event_id?: string;
  data?: {id?: string; type?: string; object?: {refund?: {id?: string}}};
};
export async function POST(request: NextRequest) {
  const key = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
  if (!key) return respond({error: "Refund processing unavailable"}, 503);
  let raw: string;
  try { raw = await request.text(); } catch { return respond({error: "Unreadable request"}, 400); }
  if (Buffer.byteLength(raw, "utf8") > 262144) return respond({error: "Request too large"}, 413);
  const signature = request.headers.get("x-square-hmacsha256-signature");
  if (!signature || !signatureValid(raw, signature, key)) return respond({error: "Invalid signature"}, 401);
  let event: SquareRefundEvent;
  try { event = JSON.parse(raw); } catch { return respond({error: "Invalid event"}, 400); }
  if (!event || typeof event !== "object" || typeof event.type !== "string") {
    return respond({error: "Invalid Square event"}, 400);
  }
  if (event.type !== "refund.updated") return respond({success: true, ignored: true});
  const refundId = event.data?.object?.refund?.id;
  if (event.data?.type !== "refund" || typeof refundId !== "string" ||
      !/^[A-Za-z0-9_-]{1,255}$/.test(refundId) ||
      (event.data?.id && event.data.id !== refundId)) {
    return respond({error: "Invalid refund event"}, 400);
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !secret) return respond({error: "Refund processing unavailable"}, 503);
  try {
    const admin = createClient(url, secret, {auth:{persistSession:false, autoRefreshToken:false}});
    // Existing production behavior remains unchanged.
    // New apparel handling requires explicit Sandbox opt-in.
    if (
      process.env.GALLASPY_APPAREL_REFUND_TEST_MODE === "true" &&
      process.env.SQUARE_ENVIRONMENT === "sandbox"
    ) {
      const verified = await verifySquareRefund(refundId);

      // Classify the verified payment before applying
      // membership-specific refund amount limits.
      const { data: membershipPayment, error: lookupError } =
        await admin
          .from("gallaspy_subscription_payments")
          .select("id")
          .eq("square_payment_id", verified.paymentId)
          .maybeSingle();

      if (lookupError) {
        throw new Error("Membership payment lookup failed");
      }

      if (!membershipPayment) {
        const apparelOutcome = await reconcileApparelRefund(
          admin,
          verified
        );

        return respond({
          success: true,
          outcome: apparelOutcome,
        });
      }
    }

    const outcome = await reconcileStandardMembershipRefund(
      admin,
      refundId
    );
    return respond({success: true, outcome});
  } catch (error) {
    // No payment credentials or raw Square payloads in logs.
    console.error("Membership refund reconciliation failed:",
      error instanceof Error ? error.message : "Unknown error");
    return respond({error: "Refund reconciliation incomplete"}, 503);
  }
}
