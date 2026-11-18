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
        "order_reference,square_payment_id,subtotal_cents,total_cents,payment_status,rewards_user_id,rewards_points_used"
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
    !Number.isSafeInteger(order.rewards_points_used) ||
    order.rewards_points_used < 0 ||
    order.rewards_points_used >= order.subtotal_cents ||
    order.total_cents <
      order.subtotal_cents - order.rewards_points_used
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

  // Discounted purchases use atomic rewards settlement.
  if (order.rewards_points_used > 0) {
    if (
      !order.rewards_user_id ||
      order.rewards_points_used < 500
    ) {
      throw new Error("Invalid rewards order");
    }

    const { data: attempt, error: attemptError } =
      await admin
        .from("apparel_payment_attempts")
        .select(
          "payment_state,payment_completed_at,amount_cents,rewards_user_id,rewards_points_used"
        )
        .eq("order_reference", order.order_reference)
        .eq("square_payment_id", refund.paymentId)
        .maybeSingle();

    if (
      attemptError ||
      !attempt ||
      attempt.payment_state !== "completed" ||
      !attempt.payment_completed_at ||
      attempt.amount_cents !== order.total_cents ||
      attempt.rewards_user_id !== order.rewards_user_id ||
      attempt.rewards_points_used !== order.rewards_points_used
    ) {
      throw new Error("Verified rewards payment required");
    }

    const { data: settledRefundId, error: settlementError } =
      await admin.rpc(
        "complete_discounted_apparel_refund",
        {
          p_square_refund_id: refund.id,
          p_square_payment_id: refund.paymentId,
          p_refund_amount_cents: refund.amountCents,
        }
      );

    if (settlementError || typeof settledRefundId !== "string") {
      throw new Error("Rewards refund settlement failed");
    }

    return "refunded";
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

  // Preserve the original Square verification timestamp.
  const { error: verificationError } = await admin
    .from("gallaspy_apparel_refunds")
    .update({
      square_verified_at: new Date().toISOString(),
      square_refund_status: "COMPLETED",
    })
    .eq("id", refundRecordId)
    .eq("square_refund_id", refund.id)
    .is("square_verified_at", null);

  if (verificationError) {
    throw new Error("Apparel refund verification failed");
  }

  const { data: reversed, error: settlementError } =
    await admin.rpc(
      "gallaspy_complete_verified_apparel_refund",
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
