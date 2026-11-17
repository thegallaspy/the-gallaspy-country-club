import type { SupabaseClient } from "@supabase/supabase-js";
import { queueMembershipNotification } from "../membership/queue-membership-notification";

import { verifyMembershipInvoicePaymentV2 } from "./verify-membership-invoice-payment-v2";
import { isMembershipV2WebhookEnabled } from "./membership-client";
import { getStandardMembershipQuote, isStandardMembershipPlan } from "../membership/standard-plan-policy";
import {
  MEMBERSHIP_DOCUMENTS,
  MEMBERSHIP_DOCUMENTS_APPROVED,
} from "../membership/membership-document-registry";

export async function reconcileMembershipInvoiceV2(
  admin: SupabaseClient,
  invoiceId: string,
  subscriptionId: string
) {
  if (!isMembershipV2WebhookEnabled()) {
    throw new Error("Membership payment reconciliation is disabled");
  }

  if (!MEMBERSHIP_DOCUMENTS_APPROVED) {
    throw new Error("Membership legal approval required");
  }

  const { data: local, error: lookupError } =
    await admin.from("gallaspy_standard_subscriptions")
      .select("*")
      .eq("square_subscription_id", subscriptionId)
      .maybeSingle();

  if (
    lookupError ||
    !local ||
    !isStandardMembershipPlan(local.membership_plan) ||
    !local.square_customer_id ||
    !local.current_period_start ||
    !local.current_period_end ||
    !["pending", "past_due", "active"].includes(
      local.subscription_status
    ) ||
    local.cancel_at_period_end
  ) {
    throw new Error("Subscription requires reconciliation");
  }

  const plan = local.membership_plan;
  const quote = getStandardMembershipQuote(plan);

  if (
    local.renewal_amount_cents !== quote.renewalAmountCents ||
    local.renewal_interval !== quote.renewalInterval ||
    local.currency !== "USD"
  ) {
    throw new Error("Local membership pricing mismatch");
  }

  const verified = await verifyMembershipInvoicePaymentV2(
    invoiceId,
    subscriptionId,
    local.square_customer_id,
    plan
  );

  const now = Date.now();

  const localStart = Date.parse(local.current_period_start);
  const localEnd = Date.parse(local.current_period_end);
  const providerEnd = Date.parse(verified.providerPeriodEnd);
  const subscriptionStart = Date.parse(verified.subscriptionStart);

  if (
    ![localStart, localEnd, providerEnd, subscriptionStart]
      .every(Number.isFinite) ||
    localStart >= localEnd ||
    !verified.isLatestInvoice ||
    providerEnd < localEnd
  ) {
    throw new Error("Provider billing period requires reconciliation");
  }

  // Initial payment or current-period replay.
  // Otherwise, advance from the previous verified period boundary.
  const start =
    providerEnd === localEnd ? localStart : localEnd;

  const end = providerEnd;

  const periodStart = new Date(start).toISOString();
  const periodEnd = new Date(end).toISOString();
  const invoiced = Date.parse(verified.invoicedAt);
  const paid = Date.parse(verified.paidAt);

  if (
    ![start, end, invoiced, paid].every(Number.isFinite) ||
    !(start <= invoiced && invoiced < end) ||
    !(invoiced <= paid && paid < end) ||
    !(start <= now && now < end) ||
    paid > now + 300000 ||
    verified.amountCents !== quote.renewalAmountCents
  ) {
    throw new Error("Payment billing period mismatch");
  }

  const { data: recorded, error: recordError } =
    await admin.rpc("gallaspy_record_verified_dues_v4", {
      p_user_id: local.user_id,
      p_square_subscription_id: subscriptionId,
      p_square_payment_id: verified.squarePaymentId,
      p_square_invoice_id: invoiceId,
      p_amount_cents: verified.amountCents,
      p_period_start: periodStart,
      p_period_end: periodEnd,
      p_paid_at: verified.paidAt,
      p_verified_at: new Date().toISOString(),
      p_subscription_start: verified.subscriptionStart,
    });

  if (
    recordError ||
    !["recorded", "duplicate"].includes(recorded)
  ) {
    throw new Error("Verified dues recording failed");
  }

  await queueMembershipNotification(admin, {
    userId: local.user_id,
    type: "payment_confirmation",
    reference: verified.squarePaymentId,
    details: [
      "Membership dues payment: $" + (verified.amountCents / 100).toFixed(2),
      "Plan: " + plan,
      "Paid period ends: " + periodEnd.slice(0, 10),
      "Payment reference: " + verified.squarePaymentId,
    ].join("\\n"),
  });

  const { data: current, error: currentError } =
    await admin.from("gallaspy_standard_subscriptions")
      .select("subscription_status")
      .eq("id", local.id)
      .single();

  if (
    currentError ||
    current?.subscription_status !== "active"
  ) {
    return {
      paymentStatus: recorded,
      membershipActive: false,
      requiresReconciliation: true,
    };
  }

  const agreement = MEMBERSHIP_DOCUMENTS["membership-agreement.md"];
  const rules = MEMBERSHIP_DOCUMENTS["club-rules.md"];
  const waiver = MEMBERSHIP_DOCUMENTS["activity-waiver.md"];
  const billing = MEMBERSHIP_DOCUMENTS["billing-disclosure.md"];

  const { data: memberNumber, error: activationError } =
    await admin.rpc("gallaspy_activate_standard_member_v2", {
      p_user_id: local.user_id,
      p_agreement_version: agreement.version,
      p_agreement_sha256: agreement.sha256,
      p_rules_version: rules.version,
      p_rules_sha256: rules.sha256,
      p_waiver_version: waiver.version,
      p_waiver_sha256: waiver.sha256,
      p_billing_version: billing.version,
    });

  if (
    activationError ||
    typeof memberNumber !== "string" ||
    !memberNumber
  ) {
    throw new Error("Membership activation requires reconciliation");
  }

  await queueMembershipNotification(admin, {
    userId: local.user_id,
    type: "enrollment_confirmation",
    reference: subscriptionId,
    details: [
      "Standard Membership number: " + memberNumber,
      "Plan: " + plan,
      "Initial payment total: $" + (quote.initialPaymentCents / 100).toFixed(2),
      "Automatic renewal: $" + (quote.renewalAmountCents / 100).toFixed(2)
        + " / " + quote.renewalInterval,
      "Membership renews automatically unless canceled.",
      "Review and download your signed agreements through My Gallaspy.",
    ].join("\\n"),
  });

  return {
    paymentStatus: recorded,
    membershipActive: true,
    membershipNumber: memberNumber,
  };
}
