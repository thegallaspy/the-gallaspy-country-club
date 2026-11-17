import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

export async function queueMembershipNotification(
  admin: SupabaseClient,
  args: {
    userId: string;
    type: string;
    reference: string;
    details: string;
  }
) {
  if (
    process.env.VERCEL_ENV !== "production" ||
    process.env.SQUARE_ENVIRONMENT !== "production"
  ) {
    return false;
  }

  try {
    const { error } = await admin
      .from("gallaspy_membership_notifications")
      .upsert({
        user_id: args.userId,
        notification_type: args.type,
        idempotency_key: args.type + ":" + args.reference,
        payload: { details: args.details },
        delivery_status: "pending",
      }, {
        onConflict: "idempotency_key",
        ignoreDuplicates: true,
      });

    if (error) {
      console.error("Membership notification requires reconciliation");
      return false;
    }

    return true;

  } catch {
    console.error("Membership notification requires reconciliation");
    return false;
  }
}
