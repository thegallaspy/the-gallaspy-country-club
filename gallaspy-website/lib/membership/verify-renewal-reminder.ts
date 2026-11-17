import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import {
  getSquareMembershipConfig,
  retrieveSquareMembershipRecord,
} from "../square/membership-client";

export async function verifyRenewalReminder(
  admin: SupabaseClient,
  userId: string,
  key: string
) {
  const match = key.match(/^renewal_reminder:([^:]+):(\d{4}-\d{2}-\d{2})$/);

  if (!match) throw new Error("Invalid renewal notification");

  const [, subscriptionId, renewalDate] = match;
  const renewalTime = Date.parse(renewalDate + "T00:00:00Z");

  if (!Number.isFinite(renewalTime) ||
      new Date(renewalTime).toISOString().slice(0, 10) !== renewalDate) {
    throw new Error("Invalid renewal date");
  }

  if (renewalTime <= Date.now()) return false;

  const { data: local, error } = await admin
    .from("gallaspy_standard_subscriptions")
    .select("*")
    .eq("user_id", userId)
    .eq("square_subscription_id", subscriptionId)
    .maybeSingle();

  if (error) throw new Error("Subscription lookup unavailable");

  if (!local ||
      local.cancel_at_period_end ||
      local.subscription_status !== "active" ||
      Date.parse(local.current_period_end) !== renewalTime) {
    return false;
  }

  const annual = local.membership_plan === "annual";

  if (!annual && local.membership_plan !== "monthly") {
    throw new Error("Invalid membership plan");
  }

  const amount = annual ? 100000 : 10000;

  const planId = annual
    ? process.env.SQUARE_STANDARD_ANNUAL_PLAN_VARIATION_ID
    : process.env.SQUARE_STANDARD_MONTHLY_PLAN_VARIATION_ID;

  if (!planId ||
      local.renewal_amount_cents !== amount ||
      local.renewal_interval !== local.membership_plan ||
      local.currency !== "USD") {
    throw new Error("Membership pricing mismatch");
  }

  const config = getSquareMembershipConfig();

  const result = await retrieveSquareMembershipRecord(
    "subscriptions",
    subscriptionId
  ) as {
    subscription?: {
      id?: string;
      customer_id?: string;
      location_id?: string;
      plan_variation_id?: string;
      status?: string;
      canceled_date?: string;
      charged_through_date?: string;
      price_override_money?: unknown;
    };
  };

  const sq = result.subscription;

  if (!sq ||
      sq.id !== subscriptionId ||
      sq.customer_id !== local.square_customer_id ||
      sq.location_id !== config.locationId ||
      sq.plan_variation_id !== planId ||
      sq.price_override_money != null) {
    throw new Error("Square subscription verification failed");
  }

  if (sq.canceled_date || sq.status !== "ACTIVE") return false;

  const through = Date.parse(
    sq.charged_through_date + "T00:00:00Z"
  );

  return Number.isFinite(through) &&
    through + 86400000 === renewalTime;
}
