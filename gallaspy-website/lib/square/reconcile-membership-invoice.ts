/**
 * Stage B2C: reconcile an invoice.payment_made event against an EXISTING,
 * identified Gallaspy subscription and billing period. Server-only code.
 * Never creates Square payments/subscriptions or infers a billing cycle.
 * Enrollment must establish trusted billing-period dates separately.
 */
import {
  getSquareMembershipConfig,
  retrieveSquareMembershipRecord,
} from "./membership-client";
import { verifyStandardMembershipInvoicePayment } from "./verify-membership-invoice-payment";
import type { SupabaseClient } from "@supabase/supabase-js";

type InvoiceIdentity = {
  id?: string;
  subscription_id?: string;
  created_at?: string;
};

type SquareSubscriptionIdentity = {
  id?: string;
  customer_id?: string;
  location_id?: string;
  plan_variation_id?: string;
  status?: string;
  invoice_ids?: string[];
};

type LocalSubscription = {
  id: string;
  user_id: string;
  square_subscription_id: string;
  square_customer_id: string;
  subscription_status: string;
  monthly_amount_cents: number;
  currency: string;
  current_period_start: string | null;
  current_period_end: string | null;
};

function timestamp(value: string | null | undefined, label: string): number {
  const n = Date.parse(value ?? "");
  if (!Number.isFinite(n)) throw new Error(`Invalid ${label}`);
  return n;
}

/** One payment is recorded only when the provider and local period agree. */
export async function reconcileStandardMembershipInvoice(
  admin: SupabaseClient,
  invoiceId: string
): Promise<"recorded" | "duplicate" | "ignored"> {
  if (!/^inv:[A-Za-z0-9_:-]+$/.test(invoiceId) || invoiceId.length > 255) {
    throw new Error("Invalid invoice ID");
  }
  // Identify invoice from a fresh Square API lookup, not webhook JSON.
  const invoiceRecord = await retrieveSquareMembershipRecord("invoices", invoiceId) as {
    invoice?: InvoiceIdentity;
  };
  const invoice = invoiceRecord?.invoice;
  if (!invoice || invoice.id !== invoiceId) {
    throw new Error("Unable to retrieve Square invoice");
  }
  // Non-subscription invoices may share this webhook URL. Leave them alone.
  if (!invoice.subscription_id) return "ignored";
  const subId = invoice.subscription_id;
  if (!/^[A-Za-z0-9_-]+$/.test(subId) || subId.length > 255) {
    throw new Error("Invalid invoice subscription ID");
  }

  const cfg = getSquareMembershipConfig();
  const response = await retrieveSquareMembershipRecord("subscriptions", subId) as {
    subscription?: SquareSubscriptionIdentity;
  };
  const sq = response?.subscription;
  if (!sq || sq.id !== subId || sq.location_id !== cfg.locationId ||
      typeof sq.plan_variation_id !== "string") {
    throw new Error("Square subscription identity mismatch");
  }
  const approvedPlan = process.env.SQUARE_STANDARD_MEMBERSHIP_PLAN_VARIATION_ID;
  if (!approvedPlan) throw new Error("Approved membership plan not configured");
  if (sq.plan_variation_id !== approvedPlan) return "ignored";
  if (!sq.customer_id || !Array.isArray(sq.invoice_ids) ||
      !sq.invoice_ids.includes(invoiceId)) {
    throw new Error("Invoice is not listed on the verified subscription");
  }

  const {data, error} = await admin.from("gallaspy_standard_subscriptions")
    .select("id,user_id,square_subscription_id,square_customer_id,subscription_status,monthly_amount_cents,currency,current_period_start,current_period_end")
    .eq("square_subscription_id", subId).maybeSingle();
  if (error || !data) {
    throw new Error("Existing Gallaspy subscription not linked yet");
  }
  const local = data as LocalSubscription;
  if (local.square_customer_id !== sq.customer_id ||
      local.monthly_amount_cents !== 10000 || local.currency !== "USD" ||
      !["pending", "past_due", "active", "canceled"].includes(local.subscription_status)) {
    throw new Error("Local subscription identity or state mismatch");
  }
  // Billing period MUST have been written by a separately verified enrollment/
  // cycle reconciliation. Do not infer month boundaries from an invoice event.
  const start = timestamp(local.current_period_start, "local billing period start");
  const end = timestamp(local.current_period_end, "local billing period end");
  const invoiced = timestamp(invoice.created_at, "Square invoice creation time");
  const now = Date.now();
  if (!(start < end && start <= invoiced && invoiced < end &&
        start <= now && now < end && invoiced <= now + 300000)) {
    throw new Error("Invoice cannot be assigned to the verified current billing period");
  }
  // Re-fetch verified invoice/order/tender/payment/plan chain. It also verifies
  // ACTIVE subscription, exact $100, PAID invoice and zero refunded amount.
  const verified = await verifyStandardMembershipInvoicePayment(
    invoiceId, subId, sq.customer_id
  );
  const paid = timestamp(verified.paidAt, "Square payment creation time");
  if (paid < invoiced || paid > now + 300000 ||
      verified.amountCents !== 10000 || verified.currency !== "USD" ||
      verified.squareInvoiceId !== invoiceId ||
      verified.squareSubscriptionId !== subId ||
      verified.squareCustomerId !== sq.customer_id) {
    throw new Error("Verified payment cannot be assigned to invoice period");
  }

  // Fail closed if an invoice was already attributed to a DIFFERENT payment.
  const {data: invoicePayments, error: invoiceLookupError} = await admin
    .from("gallaspy_subscription_payments")
    .select("square_payment_id")
    .eq("square_invoice_id", invoiceId)
    .limit(2);
  if (invoiceLookupError || !Array.isArray(invoicePayments)) {
    throw new Error("Unable to check existing invoice payments");
  }
  if (invoicePayments.some((p: {square_payment_id: string}) =>
    p.square_payment_id !== verified.squarePaymentId)) {
    throw new Error("Invoice already belongs to another payment");
  }
  // One full-price payment per local billing period. An additional Square
  // charge in the same period requires review rather than issuing extra access.
  const {data: periodPayments, error: periodLookupError} = await admin
    .from("gallaspy_subscription_payments")
    .select("square_payment_id")
    .eq("subscription_id", local.id)
    .eq("billing_period_start", local.current_period_start)
    .eq("billing_period_end", local.current_period_end)
    .limit(2);
  if (periodLookupError || !Array.isArray(periodPayments)) {
    throw new Error("Unable to check existing period payments");
  }
  if (periodPayments.some((p: {square_payment_id: string}) =>
    p.square_payment_id !== verified.squarePaymentId)) {
    throw new Error("Billing period already has another payment");
  }

  const expected = {
    subscription_id: local.id,
    square_payment_id: verified.squarePaymentId,
    square_invoice_id: invoiceId,
    billing_period_start: local.current_period_start!,
    billing_period_end: local.current_period_end!,
    amount_cents: 10000,
    currency: "USD",
    payment_status: "completed",
    paid_at: verified.paidAt,
  };
  const {error: insertionError} = await admin
    .from("gallaspy_subscription_payments")
    .insert(expected);
  let duplicate = false;
  if (insertionError) {
    // Only a UNIQUE conflict can be treated as a retried delivery. Even then,
    // reject any data mismatch and all previously refunded/partial payments.
    if (insertionError.code !== "23505") {
      throw new Error("Unable to record verified Square payment");
    }
    const {data: existing, error: existingError} = await admin
      .from("gallaspy_subscription_payments")
      .select("subscription_id,square_payment_id,square_invoice_id,billing_period_start,billing_period_end,amount_cents,currency,payment_status,paid_at")
      .eq("square_payment_id", verified.squarePaymentId)
      .maybeSingle();
    if (existingError || !existing ||
        existing.subscription_id !== expected.subscription_id ||
        existing.square_payment_id !== expected.square_payment_id ||
        existing.square_invoice_id !== expected.square_invoice_id ||
        timestamp(existing.billing_period_start, "existing start") !== start ||
        timestamp(existing.billing_period_end, "existing end") !== end ||
        existing.amount_cents !== 10000 || existing.currency !== "USD" ||
        existing.payment_status !== "completed") {
      throw new Error("Conflicting or reversed membership payment record");
    }
    duplicate = true;
  }

  // The payment already belongs to an existing local subscription. Only
  // transition pending/past_due to active when Square was ACTIVE & paid.
  if (["pending", "past_due"].includes(local.subscription_status)) {
    const {data: updated, error: stateError} = await admin
      .from("gallaspy_standard_subscriptions")
      .update({subscription_status:"active", updated_at:new Date().toISOString()})
      .eq("id", local.id)
      .eq("square_subscription_id", subId)
      .eq("square_customer_id", sq.customer_id)
      .eq("subscription_status", local.subscription_status)
      .select("id").maybeSingle();
    // If another handler changed the status meanwhile, fail and re-evaluate.
    if (stateError || !updated) {
      throw new Error("Concurrent subscription change requires retry");
    }
  }
  // Activation function enforces member status, Falcon Society protection,
  // and matching current-period completed payment under a DB lock.
  const {data: number, error: activationError} = await admin.rpc(
    "gallaspy_activate_standard_member", {p_user_id: local.user_id}
  );
  if (activationError || typeof number !== "string" || !number) {
    throw new Error("Payment recorded but membership activation requires retry/review");
  }
  return duplicate ? "duplicate" : "recorded";
}
