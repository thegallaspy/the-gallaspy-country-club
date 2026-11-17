import type { SupabaseClient } from "@supabase/supabase-js";
import { queueMembershipNotification } from "../membership/queue-membership-notification";
import { verifySquareRefund } from "./verify-refund";
import {
  getSquareMembershipConfig,
  isMembershipV2WebhookEnabled,
  retrieveSquareMembershipRecord,
} from "./membership-client";

type Outcome =
  | "ignored"
  | "pending"
  | "duplicate"
  | "refunded"
  | "partially_refunded";

type ProviderPayment = {
  id?: string;
  customer_id?: string;
  location_id?: string;
  reference_id?: string;
  status?: string;
  amount_money?: {
    amount?: number;
    currency?: string;
  };
};

type ProviderSubscription = {
  id?: string;
  customer_id?: string;
  location_id?: string;
  plan_variation_id?: string;
  price_override_money?: unknown;
};

export async function reconcileMembershipRefundV2(
  admin: SupabaseClient,
  refundId: string
): Promise<Outcome> {
  const cfg = getSquareMembershipConfig();

  if (
    !isMembershipV2WebhookEnabled()
  ) {
    throw new Error("Membership V2 refund testing is disabled");
  }

  const refund = await verifySquareRefund(refundId);

  const [dues, initiation] = await Promise.all([
    admin
      .from("gallaspy_subscription_payments")
      .select("id,subscription_id,square_payment_id,amount_cents,currency")
      .eq("square_payment_id", refund.paymentId)
      .maybeSingle(),

    admin
      .from("gallaspy_membership_initiation_payments")
      .select("id,user_id,enrollment_attempt_id,square_payment_id,square_customer_id,membership_plan,amount_cents,currency,verified_at")
      .eq("square_payment_id", refund.paymentId)
      .maybeSingle(),
  ]);

  if (dues.error || initiation.error) {
    throw new Error("Membership refund classification failed");
  }

  if (dues.data && initiation.data) {
    throw new Error("Conflicting membership payment identity");
  }

  if (!dues.data && !initiation.data) {
    return "ignored";
  }

  if (refund.status !== "COMPLETED") {
    if (["PENDING", "FAILED", "REJECTED"].includes(refund.status)) {
      return "pending";
    }
    throw new Error("Unexpected refund status");
  }

  const result = await retrieveSquareMembershipRecord(
    "payments",
    refund.paymentId
  ) as { payment?: ProviderPayment };

  const payment = result.payment;

  if (
    !payment ||
    payment.id !== refund.paymentId ||
    payment.location_id !== cfg.locationId ||
    payment.status !== "COMPLETED" ||
    payment.amount_money?.currency !== "USD" ||
    refund.currency !== "USD" ||
    !Number.isSafeInteger(refund.amountCents) ||
    refund.amountCents <= 0
  ) {
    throw new Error("Square refund payment verification failed");
  }

  let rpc: string;
  let memberUserId: string;

  if (initiation.data) {
    const local = initiation.data;
    memberUserId = local.user_id;

    if (
      local.membership_plan !== "monthly" ||
      local.amount_cents !== 25000 ||
      local.currency !== "USD" ||
      !local.verified_at ||
      !local.square_customer_id ||
      payment.customer_id !== local.square_customer_id ||
      payment.reference_id !== local.enrollment_attempt_id ||
      payment.amount_money?.amount !== 25000 ||
      refund.amountCents > 25000
    ) {
      throw new Error("Initiation refund identity mismatch");
    }

    rpc = "gallaspy_settle_membership_initiation_refund";

  } else {
    const local = dues.data!;

    const { data: sub, error } = await admin
      .from("gallaspy_standard_subscriptions")
      .select("id,user_id,square_subscription_id,square_customer_id,membership_plan,renewal_amount_cents,renewal_interval,currency")
      .eq("id", local.subscription_id)
      .maybeSingle();

    if (error || !sub) {
      throw new Error("Linked subscription unavailable");
    }

    memberUserId = sub.user_id;

    const monthlyPlan =
      process.env.SQUARE_STANDARD_MONTHLY_PLAN_VARIATION_ID ||
      process.env.SQUARE_STANDARD_MEMBERSHIP_PLAN_VARIATION_ID;

    const annualPlan =
      process.env.SQUARE_STANDARD_ANNUAL_PLAN_VARIATION_ID;

    if (monthlyPlan && annualPlan && monthlyPlan === annualPlan) {
      throw new Error("Membership configuration conflict");
    }

    const expectedAmount =
      sub.membership_plan === "monthly" ? 10000 :
      sub.membership_plan === "annual" ? 100000 : 0;

    const expectedPlan =
      sub.membership_plan === "monthly" ? monthlyPlan :
      sub.membership_plan === "annual" ? annualPlan : undefined;

    if (
      !expectedPlan ||
      !sub.square_subscription_id ||
      !sub.square_customer_id ||
      expectedAmount === 0 ||
      sub.renewal_amount_cents !== expectedAmount ||
      sub.renewal_interval !== sub.membership_plan ||
      sub.currency !== "USD" ||
      local.currency !== "USD" ||
      local.amount_cents !== expectedAmount ||
      payment.amount_money?.amount !== expectedAmount ||
      payment.customer_id !== sub.square_customer_id ||
      refund.amountCents > expectedAmount
    ) {
      throw new Error("Membership refund pricing mismatch");
    }

    const provider = await retrieveSquareMembershipRecord(
      "subscriptions",
      sub.square_subscription_id
    ) as { subscription?: ProviderSubscription };

    const squareSub = provider.subscription;

    if (
      !squareSub ||
      squareSub.id !== sub.square_subscription_id ||
      squareSub.location_id !== cfg.locationId ||
      squareSub.customer_id !== sub.square_customer_id ||
      squareSub.plan_variation_id !== expectedPlan ||
      squareSub.price_override_money != null
    ) {
      throw new Error("Membership subscription verification failed");
    }

    rpc = "gallaspy_settle_standard_membership_refund";
  }

  const { data, error } = await admin.rpc(rpc, {
    p_refund_id: refund.id,
    p_payment_id: refund.paymentId,
    p_amount_cents: refund.amountCents,
  });

  if (
    error ||
    !["duplicate", "refunded", "partially_refunded"].includes(data)
  ) {
    throw new Error("Membership refund settlement failed");
  }

  await queueMembershipNotification(admin, {
    userId: memberUserId,
    type: "refund_confirmation",
    reference: refund.id,
    details: [
      "Verified refund amount: $" + (refund.amountCents / 100).toFixed(2),
      "Refund reference: " + refund.id,
      "Original payment reference: " + refund.paymentId,
      "Membership eligibility remains subject to verified, unrefunded payments.",
    ].join("\\n"),
  });

  return data as Outcome;
}
