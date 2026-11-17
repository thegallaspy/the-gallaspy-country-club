import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import {
  getSquareMembershipConfig,
  retrieveSquareMembershipRecord,
} from "../square/membership-client";
import { queueMembershipNotification } from "./queue-membership-notification";

type ProviderSubscription = {
  id?: string;
  customer_id?: string;
  location_id?: string;
  plan_variation_id?: string;
  status?: string;
  charged_through_date?: string;
  canceled_date?: string | null;
  price_override_money?: unknown;
};

export async function scheduleRenewalReminders(admin: SupabaseClient) {
  if (
    process.env.VERCEL_ENV !== "production" ||
    process.env.SQUARE_ENVIRONMENT !== "production" ||
    process.env.GALLASPY_MEMBERSHIP_NOTIFICATIONS_ENABLED !== "true"
  ) {
    return { scheduled: 0, disabled: true };
  }

  const config = getSquareMembershipConfig();
  const now = Date.now();
  const day = 86400000;
  const cutoff = new Date(now + 31 * day).toISOString();

  const { data: subscriptions, error } = await admin
    .from("gallaspy_standard_subscriptions")
    .select("id,user_id,membership_plan,renewal_amount_cents,renewal_interval,currency,current_period_end,square_subscription_id,square_customer_id")
    .eq("subscription_status", "active")
    .eq("cancel_at_period_end", false)
    .gt("current_period_end", new Date(now).toISOString())
    .lte("current_period_end", cutoff);

  if (error) throw new Error("Renewal lookup failed");

  let scheduled = 0;
  let requiresReview = 0;

  for (const local of subscriptions ?? []) {
    const annual = local.membership_plan === "annual";
    const monthly = local.membership_plan === "monthly";

    if (!annual && !monthly) continue;

    const amount = annual ? 100000 : 10000;
    const reminderDays = annual ? 30 : 7;

    const expectedPlan = annual
      ? process.env.SQUARE_STANDARD_ANNUAL_PLAN_VARIATION_ID
      : process.env.SQUARE_STANDARD_MONTHLY_PLAN_VARIATION_ID;

    if (
      !expectedPlan ||
      !local.square_subscription_id ||
      !local.square_customer_id ||
      local.renewal_amount_cents !== amount ||
      local.renewal_interval !== local.membership_plan ||
      local.currency !== "USD"
    ) {
      requiresReview++;
      continue;
    }

    const localEnd = Date.parse(local.current_period_end);

    if (!Number.isFinite(localEnd) ||
        localEnd - now > reminderDays * day ||
        localEnd <= now) continue;

    try {
      const result = await retrieveSquareMembershipRecord(
        "subscriptions",
        local.square_subscription_id
      ) as { subscription?: ProviderSubscription };

      const sq = result.subscription;

      if (
        !sq ||
        sq.id !== local.square_subscription_id ||
        sq.customer_id !== local.square_customer_id ||
        sq.location_id !== config.locationId ||
        sq.plan_variation_id !== expectedPlan ||
        sq.status !== "ACTIVE" ||
        sq.canceled_date ||
        sq.price_override_money != null ||
        !sq.charged_through_date ||
        !/^\d{4}-\d{2}-\d{2}$/.test(sq.charged_through_date)
      ) {
        requiresReview++;
        continue;
      }

      const through = Date.parse(sq.charged_through_date + "T00:00:00Z");
      if (!Number.isFinite(through)) continue;

      const next = through + day;

      if (next !== localEnd || next <= now) {
        requiresReview++;
        continue;
      }

      const renewalDate = new Date(next).toISOString().slice(0, 10);

      const queued = await queueMembershipNotification(admin, {
        userId: local.user_id,
        type: "renewal_reminder",
        reference: local.square_subscription_id + ":" + renewalDate,
        details: [
          "Standard " + local.membership_plan + " membership",
          "Upcoming renewal date: " + renewalDate,
          "Renewal amount: $" + (amount / 100).toFixed(2),
          "Your membership renews automatically unless canceled.",
          "Cancel future renewals through My Gallaspy before renewal.",
        ].join("\\n"),
      });

      if (queued) scheduled++;
      else requiresReview++;

    } catch {
      requiresReview++;
    }
  }

  return { scheduled, requiresReview, disabled: false };
}
