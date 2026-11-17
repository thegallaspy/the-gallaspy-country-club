import type { SupabaseClient } from "@supabase/supabase-js";
import {
  getSquareMembershipConfig,
  sendSquareMembershipRequest
} from "./membership-client";
import { verifyMembershipInitiation } from "./verify-membership-initiation";

export async function processMembershipInitiation(
  admin: SupabaseClient,
  args: {
    userId: string;
    attemptId: string;
    customerId: string;
    cardId: string;
  }
) {
  const config = getSquareMembershipConfig();

  if (
    config.environment !== "sandbox" ||
    process.env.SQUARE_MEMBERSHIP_ENROLLMENT_ENABLED !== "true"
  ) {
    throw new Error("Sandbox membership enrollment required");
  }

  const { data: reservation, error: reserveError } =
    await admin.rpc("gallaspy_reserve_initiation_payment", {
      p_user_id: args.userId,
      p_enrollment_attempt_id: args.attemptId,
    });

  if (reserveError || typeof reservation !== "string") {
    throw new Error("Initiation reservation failed");
  }

  const { error: beginError } =
    await admin.rpc("gallaspy_begin_initiation_payment", {
      p_reservation_id: reservation,
    });

  if (beginError) {
    throw new Error("Initiation processing claim failed");
  }

  const response = await sendSquareMembershipRequest(
    "payments",
    {
      idempotency_key: "init-" + args.attemptId,
      source_id: args.cardId,
      customer_id: args.customerId,
      location_id: config.locationId,
      reference_id: args.attemptId,
      amount_money: {
        amount: 25000,
        currency: "USD",
      },
      autocomplete: true,
    }
  ) as { payment?: { id?: string } };

  if (!response.payment?.id) {
    throw new Error("Payment requires reconciliation");
  }

  const verified = await verifyMembershipInitiation(
    response.payment.id,
    args.customerId,
    args.attemptId
  );

  const { error: recordError } =
    await admin.rpc("gallaspy_record_verified_initiation_v3", {
      p_user_id: args.userId,
      p_enrollment_attempt_id: args.attemptId,
      p_square_payment_id: verified.paymentId,
      p_square_customer_id: verified.customerId,
      p_square_reference_id: verified.attemptId,
      p_paid_at: verified.paidAt,
    });

  if (recordError) {
    throw new Error("Verified payment requires reconciliation");
  }

  return verified;
}
