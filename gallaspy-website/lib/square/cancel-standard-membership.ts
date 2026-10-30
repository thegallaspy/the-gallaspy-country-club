/**
 * End-of-period cancellation for an EXISTING Gallaspy Standard subscription.
 * Square schedules the cancellation; the club records the schedule only after
 * Square's fresh verified response. It never refunds a payment or changes
 * verified paid-through dates.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  getSquareMembershipConfig,
  retrieveSquareMembershipRecord,
} from "./membership-client";

type Local = {
  id: string;
  user_id: string;
  square_subscription_id: string | null;
  square_customer_id: string | null;
  subscription_status: string;
  cancel_at_period_end: boolean;
  current_period_end: string | null;
  canceled_at: string | null;
};

type Provider = {
  id?: string;
  location_id?: string;
  customer_id?: string;
  plan_variation_id?: string;
  status?: string;
  canceled_date?: string | null;
  price_override_money?: unknown;
};

const SQ_ID = /^[A-Za-z0-9_-]{1,255}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function assertProvider(record: unknown, local: Local): Provider {
  if (!record || typeof record !== "object") {
    throw new Error("Square cancellation verification unavailable");
  }
  const sq = (record as { subscription?: Provider }).subscription;
  const config = getSquareMembershipConfig();
  const approved = process.env.SQUARE_STANDARD_MEMBERSHIP_PLAN_VARIATION_ID;
  if (!sq || typeof approved !== "string" || !SQ_ID.test(approved) ||
      sq.id !== local.square_subscription_id ||
      sq.customer_id !== local.square_customer_id ||
      sq.location_id !== config.locationId ||
      sq.plan_variation_id !== approved ||
      sq.price_override_money != null ||
      !["ACTIVE", "CANCELED"].includes(sq.status ?? "")) {
    throw new Error("Square subscription identity or state mismatch");
  }
  if (sq.canceled_date != null &&
      (typeof sq.canceled_date !== "string" ||
       !/^\d{4}-\d{2}-\d{2}$/.test(sq.canceled_date) ||
       !Number.isFinite(Date.parse(sq.canceled_date + "T00:00:00Z")) ||
       new Date(sq.canceled_date + "T00:00:00Z").toISOString().slice(0, 10) !== sq.canceled_date)) {
    throw new Error("Invalid Square cancellation date");
  }
  return sq;
}

async function requestSquareCancellation(subscriptionId: string): Promise<unknown> {
  if (!SQ_ID.test(subscriptionId)) throw new Error("Invalid Square subscription ID");
  const cfg = getSquareMembershipConfig();
  // Cancellation must remain possible even if NEW enrollment is disabled.
  const result = await fetch(
    `${cfg.baseUrl}/v2/subscriptions/${encodeURIComponent(subscriptionId)}/cancel`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cfg.accessToken}`,
        "Square-Version": cfg.apiVersion,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    }
  );
  if (!result.ok) {
    // An overlapping request may already have scheduled cancellation. The
    // caller re-reads Square and accepts that state ONLY if independently proven.
    throw new Error(`Square cancellation unavailable (HTTP ${result.status})`);
  }
  return result.json();
}

export type CancellationResult = {
  cancellation_scheduled: true;
  current_period_end: string | null;
  provider_cancellation_date: string;
  already_scheduled: boolean;
};

/** The caller MUST authenticate the bearer token and supply that user ID. */
export async function cancelStandardMembership(
  admin: SupabaseClient,
  userId: string
): Promise<CancellationResult> {
  if (!UUID.test(userId)) throw new Error("Invalid account");
  const { data, error } = await admin
    .from("gallaspy_standard_subscriptions")
    .select("id,user_id,square_subscription_id,square_customer_id,subscription_status,cancel_at_period_end,current_period_end,canceled_at")
    .eq("user_id", userId)
    .maybeSingle();
  if (error || !data) throw new Error("No linked Standard Membership subscription");
  const local = data as Local;
  if (local.user_id !== userId ||
      !UUID.test(local.id) ||
      !local.square_subscription_id || !SQ_ID.test(local.square_subscription_id) ||
      !local.square_customer_id || !SQ_ID.test(local.square_customer_id) ||
      !["pending", "active", "past_due", "canceled"].includes(local.subscription_status)) {
    throw new Error("Subscription requires manual review");
  }

  // Check Square every time; a local flag alone is never proof of cancellation.
  const initial = assertProvider(
    await retrieveSquareMembershipRecord("subscriptions", local.square_subscription_id),
    local
  );
  const alreadyScheduled = Boolean(initial.canceled_date);
  let verified = initial;
  if (!alreadyScheduled) {
    if (initial.status !== "ACTIVE") {
      throw new Error("Subscription cannot be canceled automatically; contact support");
    }
    try {
      verified = assertProvider(
        await requestSquareCancellation(local.square_subscription_id),
        local
      );
    } catch {
      // Handle concurrent retries safely. Only accept cancellation if a
      // fresh Square GET proves that a CANCEL date has been established.
      verified = assertProvider(
        await retrieveSquareMembershipRecord("subscriptions", local.square_subscription_id),
        local
      );
      if (!verified.canceled_date) {
        throw new Error("Square could not confirm cancellation; contact support");
      }
    }
  }
  // POST responses may lag. Re-check provider if the response lacks a date.
  if (!verified.canceled_date) {
    verified = assertProvider(
      await retrieveSquareMembershipRecord("subscriptions", local.square_subscription_id),
      local
    );
  }
  if (!verified.canceled_date) {
    throw new Error("Square did not confirm an end-of-period cancellation");
  }

  const update = {
    cancel_at_period_end: true,
    canceled_at: local.canceled_at ?? new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...(verified.status === "CANCELED" ? { subscription_status: "canceled" } : {}),
  };
  const { data: updated, error: updateError } = await admin
    .from("gallaspy_standard_subscriptions")
    .update(update)
    .eq("id", local.id)
    .eq("user_id", userId)
    .eq("square_subscription_id", local.square_subscription_id)
    .eq("square_customer_id", local.square_customer_id)
    .select("id")
    .maybeSingle();
  if (updateError || updated?.id !== local.id) {
    // Square may already have scheduled cancellation. A retry will recover.
    throw new Error("Cancellation scheduled at Square; local confirmation requires retry");
  }

  return {
    cancellation_scheduled: true,
    current_period_end: local.current_period_end,
    provider_cancellation_date: verified.canceled_date,
    already_scheduled: alreadyScheduled,
  };
}
