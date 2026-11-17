import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { timingSafeEqual } from "node:crypto";
import { scheduleRenewalReminders } from "@/lib/membership/schedule-renewal-reminders";
import { sendMembershipNotification } from "@/lib/membership/send-membership-notification";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(request: Request) {
  const secret = process.env.CRON_SECRET;

  if (!secret || secret.length < 32) return false;

  const expected = Buffer.from("Bearer " + secret);
  const provided = Buffer.from(request.headers.get("authorization") || "");

  return expected.length === provided.length &&
    timingSafeEqual(expected, provided);
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (
    process.env.VERCEL_ENV !== "production" ||
    process.env.SQUARE_ENVIRONMENT !== "production" ||
    process.env.GALLASPY_MEMBERSHIP_NOTIFICATIONS_ENABLED !== "true"
  ) {
    return NextResponse.json({ success: true, disabled: true });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const admin = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  try {
    const renewal = await scheduleRenewalReminders(admin);

    const { data: pending, error } = await admin
      .from("gallaspy_membership_notifications")
      .select("id")
      .eq("delivery_status", "pending")
      .eq("attempt_count", 0)
      .lte("scheduled_at", new Date().toISOString())
      .order("scheduled_at", { ascending: true })
      .limit(20);

    if (error) throw new Error("Notification queue unavailable");

    const outcomes: string[] = [];

    for (const record of pending ?? []) {
      try {
        outcomes.push(await sendMembershipNotification(admin, record.id));
      } catch {
        outcomes.push("requires_reconciliation");
      }
    }

    return NextResponse.json({
      success: true,
      renewal,
      processed: outcomes.length,
      sent: outcomes.filter(value => value === "sent").length,
      requiresReview: outcomes.filter(value =>
        value === "requires_reconciliation"
      ).length,
    });

  } catch {
    return NextResponse.json({
      error: "Membership notification processing requires review",
    }, { status: 503 });
  }
}
