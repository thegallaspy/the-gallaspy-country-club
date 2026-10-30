/** Square refund settlement is server-only. Never trust a webhook-provided amount. */
import type { SupabaseClient } from "@supabase/supabase-js";
import { verifySquareRefund } from "./verify-refund";
import { getSquareMembershipConfig, retrieveSquareMembershipRecord } from "./membership-client";

type LocalPayment = {
  id: string; subscription_id: string; square_payment_id: string;
  amount_cents: number; currency: string; payment_status: string;
};
type LocalSubscription = {
  id: string; square_subscription_id: string | null;
  square_customer_id: string | null; monthly_amount_cents: number; currency: string;
};
type SquarePayment = {
  id?: string; customer_id?: string; location_id?: string; status?: string;
  amount_money?: { amount?: number; currency?: string };
};
type SquareSubscription = {
  id?: string; customer_id?: string; location_id?: string;
  plan_variation_id?: string;
};

export async function reconcileStandardMembershipRefund(
  admin: SupabaseClient,
  refundId: string,
): Promise<"ignored" | "pending" | "duplicate" | "refunded" | "partially_refunded"> {
  const refund = await verifySquareRefund(refundId);
  if (refund.status !== "COMPLETED") {
    // Square may later deliver a COMPLETED update; no entitlement mutation yet.
    if (["PENDING", "FAILED", "REJECTED"].includes(refund.status)) return "pending";
    throw new Error("Unrecognized Square refund status");
  }
  if (refund.currency !== "USD" || refund.amountCents > 10000) {
    throw new Error("Invalid Standard Membership refund amount");
  }
  const { data: localPayment, error: localError } = await admin
    .from("gallaspy_subscription_payments")
    .select("id,subscription_id,square_payment_id,amount_cents,currency,payment_status")
    .eq("square_payment_id", refund.paymentId).maybeSingle();
  if (localError) throw new Error("Unable to identify refunded payment");
  // This endpoint also receives unrelated Square refunds. Do not touch apparel.
  if (!localPayment) return "ignored";
  const payment = localPayment as LocalPayment;
  if (payment.square_payment_id !== refund.paymentId ||
      payment.amount_cents !== 10000 || payment.currency !== "USD") {
    throw new Error("Refund does not match an eligible membership charge");
  }
  const { data: localSub, error: subError } = await admin
    .from("gallaspy_standard_subscriptions")
    .select("id,square_subscription_id,square_customer_id,monthly_amount_cents,currency")
    .eq("id", payment.subscription_id).maybeSingle();
  if (subError || !localSub) throw new Error("Local subscription lookup failed");
  const subscription = localSub as LocalSubscription;
  const cfg = getSquareMembershipConfig();
  const expectedPlan = process.env.SQUARE_STANDARD_MEMBERSHIP_PLAN_VARIATION_ID;
  if (!expectedPlan || !subscription.square_subscription_id ||
      !subscription.square_customer_id || subscription.monthly_amount_cents !== 10000 ||
      subscription.currency !== "USD") throw new Error("Incomplete subscription identity");
  const [{payment: squarePayment}, {subscription: squareSub}] = await Promise.all([
    retrieveSquareMembershipRecord("payments", refund.paymentId) as Promise<{payment?: SquarePayment}>,
    retrieveSquareMembershipRecord("subscriptions", subscription.square_subscription_id) as Promise<{subscription?: SquareSubscription}>,
  ]);
  if (!squarePayment || squarePayment.id !== refund.paymentId ||
      squarePayment.customer_id !== subscription.square_customer_id ||
      squarePayment.location_id !== cfg.locationId ||
      squarePayment.amount_money?.amount !== 10000 ||
      squarePayment.amount_money.currency !== "USD") {
    throw new Error("Square payment identity mismatch");
  }
  if (!squareSub || squareSub.id !== subscription.square_subscription_id ||
      squareSub.customer_id !== subscription.square_customer_id ||
      squareSub.location_id !== cfg.locationId ||
      squareSub.plan_variation_id !== expectedPlan) {
    throw new Error("Square subscription identity mismatch");
  }
  // The database transaction owns locking, sum-of-refunds and idempotency.
  const { data: settled, error: settleError } = await admin.rpc(
    "gallaspy_settle_standard_membership_refund",
    {p_refund_id: refund.id, p_payment_id: refund.paymentId, p_amount_cents: refund.amountCents},
  );
  if (settleError || !["duplicate", "refunded", "partially_refunded"].includes(settled)) {
    throw new Error("Membership refund settlement failed");
  }
  return settled as "duplicate" | "refunded" | "partially_refunded";
}
