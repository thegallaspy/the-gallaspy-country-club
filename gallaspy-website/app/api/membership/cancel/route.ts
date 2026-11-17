import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { cancelStandardMembership } from "@/lib/square/cancel-standard-membership";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");

    if (!origin || new URL(origin).origin !== new URL(request.url).origin) {
      return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
    }

    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user?.email_confirmed_at) {
      return NextResponse.json({ error: "Verified sign-in required" }, { status: 401 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SECRET_KEY ||
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      throw new Error("Cancellation service unavailable");
    }

    const admin = createAdminClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const result = await cancelStandardMembership(admin, user.id);

    return NextResponse.json(
      { success: true, ...result },
      { headers: { "Cache-Control": "private, no-store" } }
    );

  } catch {
    return NextResponse.json({
      success: false,
      error: "Cancellation could not be confirmed. Contact info@thegallaspy.com for assistance."
    }, { status: 503 });
  }
}
