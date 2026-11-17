import { verifyRenewalReminder } from "./verify-renewal-reminder";
import "server-only";

import { Resend } from "resend";
import type { SupabaseClient } from "@supabase/supabase-js";

const messages: Record<string, { subject: string; text: string }> = {
  enrollment_confirmation: {
    subject: "Welcome to The Gallaspy Golf Club",
    text: "Your Standard Membership has been activated following payment verification. Welcome to the Club.",
  },
  payment_confirmation: {
    subject: "Gallaspy Membership Payment Confirmation",
    text: "Your membership payment has been verified.",
  },
  renewal_reminder: {
    subject: "Upcoming Gallaspy Membership Renewal",
    text: "Your Standard Membership is approaching its next automatic renewal.",
  },
  cancellation_confirmation: {
    subject: "Gallaspy Membership Cancellation Confirmation",
    text: "Future automatic membership renewals have been scheduled to stop.",
  },
  payment_failed: {
    subject: "Gallaspy Membership Payment Assistance",
    text: "Your membership payment could not be completed. Please review your billing information.",
  },
  refund_confirmation: {
    subject: "Gallaspy Membership Refund Confirmation",
    text: "A refund associated with your membership has been verified.",
  },
  billing_terms_changed: {
    subject: "Important Gallaspy Membership Billing Update",
    text: "Please review the updated billing information below.",
  },
};

export async function sendMembershipNotification(
  admin: SupabaseClient,
  notificationId: string
) {
  if (
    process.env.VERCEL_ENV !== "production" ||
    process.env.SQUARE_ENVIRONMENT !== "production" ||
    process.env.GALLASPY_MEMBERSHIP_NOTIFICATIONS_ENABLED !== "true"
  ) {
    return "disabled";
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("Email service unavailable");

  const { data: record, error } = await admin
    .from("gallaspy_membership_notifications")
    .select("*")
    .eq("id", notificationId)
    .eq("delivery_status", "pending")
    .eq("attempt_count", 0)
    .lte("scheduled_at", new Date().toISOString())
    .maybeSingle();

  if (error) throw new Error("Notification lookup failed");
  if (!record) return "not_pending";

  if (record.notification_type === "renewal_reminder") {
    const current = await verifyRenewalReminder(
      admin,
      record.user_id,
      record.idempotency_key
    );

    if (!current) {
      const skipped = await admin
        .from("gallaspy_membership_notifications")
        .update({ delivery_status: "skipped" })
        .eq("id", record.id)
        .eq("delivery_status", "pending")
        .eq("attempt_count", 0);

      if (skipped.error) {
        throw new Error("Unable to record skipped reminder");
      }

      return "skipped";
    }
  }

  const message = messages[record.notification_type];

  if (!message || typeof record.payload?.details !== "string" ||
      !record.payload.details.trim()) {
    throw new Error("Notification details required");
  }

  const { data: account, error: accountError } =
    await admin.auth.admin.getUserById(record.user_id);

  if (accountError ||
      !account.user?.email ||
      !account.user.email_confirmed_at) {
    throw new Error("Verified recipient unavailable");
  }

  const { data: claimed, error: claimError } = await admin
    .from("gallaspy_membership_notifications")
    .update({
      delivery_status: "processing",
      attempt_count: 1,
    })
    .eq("id", record.id)
    .eq("delivery_status", "pending")
    .eq("attempt_count", 0)
    .select("id")
    .maybeSingle();

  if (claimError) throw new Error("Notification claim failed");
  if (!claimed) return "already_claimed";

  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from: "The Gallaspy Golf Club <info@thegallaspy.com>",
      to: account.user.email,
      replyTo: "info@thegallaspy.com",
      subject: message.subject,
      text: [
        "THE GALLASPY GOLF CLUB",
        message.text,
        record.payload.details,
        "Manage membership and cancellation:",
        "https://thegallaspy.com/my-gallaspy/documents",
        "Questions: info@thegallaspy.com",
      ].join("\\n\\n"),
    }, {
      idempotencyKey: "membership-notification/" + record.id,
    });

    if (result.error || !result.data?.id) {
      throw new Error("Email confirmation unavailable");
    }

    const saved = await admin
      .from("gallaspy_membership_notifications")
      .update({
        delivery_status: "sent",
        sent_at: new Date().toISOString(),
        provider_message_id: result.data.id,
      })
      .eq("id", record.id)
      .eq("delivery_status", "processing");

    if (saved.error) {
      throw new Error("Email delivery requires reconciliation");
    }

    return "sent";

  } catch {
    // Do not automatically resend an unconfirmed email.
    // Reconcile with Resend before retrying.
    await admin
      .from("gallaspy_membership_notifications")
      .update({ delivery_status: "failed" })
      .eq("id", record.id)
      .eq("delivery_status", "processing");

    return "requires_reconciliation";
  }
}
