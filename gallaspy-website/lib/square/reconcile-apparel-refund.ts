import type { SupabaseClient } from "@supabase/supabase-js";
import type { VerifiedSquareRefund } from "./verify-refund";

/**
 * Sandbox-stage apparel refund reconciliation.
 *
 * Never use the total refund amount as the merchandise
 * amount unless the complete order payment was refunded.
 *
 * Partial refunds require separately verified merchandise
 * allocation and are deliberately rejected for now.
 */
export async function reconcileApparelRefund(
  admin: SupabaseClient,
  refund: VerifiedSquareRefund
): Promise<"ignored" | "pending" | "refunded"> {
  if (refund.status === "PENDING") {
    return "pending";
  }

  if (
    refund.status === "FAILED" ||
    refund.status === "REJECTED"
  ) {
    return "ignored";
  }

  if (refund.status !== "COMPLETED") {
    throw new Error("Unknown Square refund status");
  }

  if (
    refund.currency !== "USD" ||
    !Number.isSafeInteger(refund.amountCents) ||
    refund.amountCents <= 0
  ) {
    throw new Error("Invalid verified refund amount");
  }

  const { data: order, error: lookupError } =
    await admin
      .from("apparel_orders_v2")
      .select(
        "order_reference,square_payment_id,subtotal_cents,total_cents,payment_status"
      )
      .eq("square_payment_id", refund.paymentId)
      .maybeSingle();

  if (lookupError) {
    throw new Error("Apparel order lookup failed");
  }

  if (!order) {
    return "ignored";
  }

  if (
    order.square_payment_id !== refund.paymentId ||
    order.payment_status !== "completed" ||
    !Number.isSafeInteger(order.subtotal_cents) ||
    !Number.isSafeInteger(order.total_cents) ||
    order.subtotal_cents <= 0 ||
    order.total_cents < order.subtotal_cents
  ) {
    throw new Error("Invalid completed apparel order");
  }

  // Only an entire-payment refund is automatically
  // classified as a full merchandise refund.
  if (refund.amountCents !== order.total_cents) {
    throw new Error(
      "Partial apparel refund requires reviewed " +
      "merchandise allocation"
    );
  }

  const { data: refundRecordId, error: recordError } =
    await admin.rpc(
      "gallaspy_record_apparel_refund",
      {
        p_square_refund_id: refund.id,
        p_square_payment_id: refund.paymentId,
        p_refunded_merchandise_cents:
          order.subtotal_cents,
      }
    );

  if (
    recordError ||
    typeof refundRecordId !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      refundRecordId
    )
  ) {
    throw new Error("Unable to record apparel refund");
  }

  const { data: marked, error: statusError } =
    await admin
      .from("gallaspy_apparel_refunds")
      .update({ refund_status: "completed" })
      .eq("id", refundRecordId)
      .eq("square_refund_id", refund.id)
      .in("refund_status", ["pending", "completed"])
      .select("id,refund_status")
      .maybeSingle();

  if (
    statusError ||
    !marked ||
    marked.refund_status !== "completed"
  ) {
    throw new Error("Apparel refund status update failed");
  }

  const { data: reversed, error: settlementError } =
    await admin.rpc(
      "gallaspy_settle_apparel_refund",
      { p_refund_id: refundRecordId }
    );

  if (
    settlementError ||
    !Number.isSafeInteger(reversed) ||
    reversed < 0
  ) {
    throw new Error("Apparel points settlement failed");
  }

  return "refunded";
}
