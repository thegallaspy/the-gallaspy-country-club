import { isProductionMembershipEnrollmentEnabled } from "./membership-client";
import type { SupabaseClient } from "@supabase/supabase-js";

import {
  getSquareMembershipConfig,
  sendSquareMembershipRequest,
} from "./membership-client";

import { authorizeStandardEnrollment } from "../membership/authorize-standard-enrollment";
import { getStandardMembershipSquarePlan } from "./standard-membership-config";
import { verifyStandardMembershipPlan } from "./verify-membership-plan";
import { processMembershipInitiation } from "./process-membership-initiation";
import { createMembershipSubscriptionV2 } from "./create-membership-subscription-v2";
import { getInitialStandardBillingPeriod } from "../membership/standard-billing-period";
import { isStandardMembershipPlan } from "../membership/standard-plan-policy";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function recordProgress(
  admin: SupabaseClient,
  userId: string,
  attemptId: string,
  values: {
    customerId?: string;
    cardId?: string;
    subscriptionId?: string;
  }
) {
  const { data, error } = await admin.rpc(
    "gallaspy_record_standard_enrollment_progress",
    {
      p_user_id: userId,
      p_attempt_id: attemptId,
      p_customer_id: values.customerId ?? null,
      p_card_id: values.cardId ?? null,
      p_subscription_id: values.subscriptionId ?? null,
    }
  );

  if (error || data !== true) {
    throw new Error("Enrollment requires reconciliation");
  }
}

export async function enrollStandardMemberV2(
  admin: SupabaseClient,
  args: {
    userId: string;
    email: string;
    fullName: string;
    sourceId: string;
    body: Record<string, unknown>;
  }
) {
  const cfg = getSquareMembershipConfig();

  if (
    (cfg.environment !== "sandbox" && !isProductionMembershipEnrollmentEnabled()) ||
    process.env.SQUARE_MEMBERSHIP_ENROLLMENT_ENABLED !== "true"
  ) {
    throw new Error("Sandbox enrollment only");
  }

  if (!UUID.test(args.userId)) {
    throw new Error("Invalid user identity");
  }

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(args.email) ||
    args.email.length > 254
  ) {
    throw new Error("Verified email required");
  }

  if (!/^[A-Za-z0-9:._-]{8,512}$/.test(args.sourceId)) {
    throw new Error("Secure payment token required");
  }

  const name = args.fullName.trim().replace(/\s+/g, " ");
  const parts = name.split(" ");

  if (parts.length < 2 || name.length > 180) {
    throw new Error("Valid full name required");
  }

  if (!isStandardMembershipPlan(args.body.plan)) {
    throw new Error("Invalid membership plan");
  }

  const expected = getStandardMembershipSquarePlan(args.body.plan);

  await verifyStandardMembershipPlan(
    expected.planVariationId,
    args.body.plan
  );

  const authorized = await authorizeStandardEnrollment(
    admin,
    args.userId,
    name,
    args.body
  );

  const { attemptId, plan } = authorized;

  if (!UUID.test(attemptId)) {
    throw new Error("Invalid enrollment attempt");
  }

  const customerResult = await sendSquareMembershipRequest(
    "customers",
    {
      idempotency_key: "cust-" + attemptId,
      email_address: args.email,
      given_name: parts[0],
      family_name: parts.slice(1).join(" "),
      reference_id: args.userId,
    }
  ) as {
    customer?: {
      id?: string;
      email_address?: string;
    };
  };

  const customer = customerResult.customer;

  if (
    !customer?.id ||
    !/^[A-Za-z0-9_:-]{6,255}$/.test(customer.id) ||
    customer.email_address?.toLowerCase() !== args.email.toLowerCase()
  ) {
    throw new Error("Customer requires reconciliation");
  }

  await recordProgress(admin, args.userId, attemptId, {
    customerId: customer.id,
  });

  const cardResult = await sendSquareMembershipRequest(
    "cards",
    {
      idempotency_key: "card-" + attemptId,
      source_id: args.sourceId,
      card: {
        customer_id: customer.id,
        cardholder_name: name,
      },
    }
  ) as {
    card?: {
      id?: string;
      customer_id?: string;
      enabled?: boolean;
    };
  };

  const card = cardResult.card;

  if (
    !card?.id ||
    !/^ccof:[A-Za-z0-9_:-]{6,255}$/.test(card.id) ||
    card.customer_id !== customer.id ||
    card.enabled !== true
  ) {
    throw new Error("Saved card requires reconciliation");
  }

  await recordProgress(admin, args.userId, attemptId, {
    cardId: card.id,
  });

  const { data: existing, error: existingError } =
    await admin.from("gallaspy_standard_subscriptions")
      .select("id")
      .eq("user_id", args.userId)
      .maybeSingle();

  if (existingError || existing) {
    throw new Error("Existing subscription requires review");
  }

  if (plan === "monthly") {
    await processMembershipInitiation(admin, {
      userId: args.userId,
      attemptId,
      customerId: customer.id,
      cardId: card.id,
    });
  }

  const subscription = await createMembershipSubscriptionV2({
    plan,
    attemptId,
    customerId: customer.id,
    cardId: card.id,
  });

  await recordProgress(admin, args.userId, attemptId, {
    subscriptionId: subscription.subscriptionId,
  });

  if (
    !subscription.startDate ||
    subscription.startDate !== new Date().toISOString().slice(0, 10)
  ) {
    throw new Error("Subscription billing dates require reconciliation");
  }

  const period = getInitialStandardBillingPeriod(
    plan,
    subscription.startDate
  );

  const { error: linkError } =
    await admin.from("gallaspy_standard_subscriptions").insert({
      user_id: args.userId,
      square_customer_id: customer.id,
      square_subscription_id: subscription.subscriptionId,
      subscription_status: "pending",
      membership_plan: plan,
      monthly_amount_cents: plan === "monthly" ? 10000 : null,
      renewal_amount_cents: expected.renewalAmountCents,
      renewal_interval: expected.renewalInterval,
      currency: "USD",
      current_period_start: period.periodStart,
      current_period_end: period.periodEnd,
    });

  if (linkError) {
    throw new Error("Subscription requires local reconciliation");
  }

  return {
    status: "awaiting_verified_payment" as const,
    membershipActive: false,
    subscriptionId: subscription.subscriptionId,
    plan,
  };
}
