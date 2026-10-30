import { NextResponse } from "next/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { getSquareMembershipConfig } from "@/lib/square/membership-client";
import { enrollStandardMemberSandbox } from "@/lib/square/enroll-standard-member";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    if (!origin || !host || new URL(origin).host !== host ||
        !["http:", "https:"].includes(new URL(origin).protocol)) {
      return NextResponse.json({error: "Invalid request origin"}, {status: 403});
    }

    const square = getSquareMembershipConfig();
    if (square.environment !== "sandbox" ||
        process.env.SQUARE_MEMBERSHIP_ENROLLMENT_ENABLED !== "true") {
      return NextResponse.json({error: "Enrollment is not enabled"}, {status: 503});
    }

    const supabase = await createClient();
    const {data: {user}, error: authError} = await supabase.auth.getUser();
    if (authError || !user || !user.email || !user.email_confirmed_at) {
      return NextResponse.json({error: "Verified sign-in required"}, {status: 401});
    }
    const raw = await request.text();
    if (raw.length > 4096) {
      return NextResponse.json({error: "Invalid enrollment request"}, {status: 413});
    }
    const body = JSON.parse(raw) as Record<string, unknown>;
    if (!body || body.consent !== true ||
        typeof body.cardToken !== "string" || typeof body.fullName !== "string") {
      return NextResponse.json({error: "Card, name and recurring consent are required"}, {status: 422});
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      return NextResponse.json({error: "Enrollment unavailable"}, {status: 503});
    }
    const admin = createAdminClient(url, key, {
      auth: {persistSession: false, autoRefreshToken: false},
    });
    const result = await enrollStandardMemberSandbox(admin, {
      userId: user.id,
      email: user.email,
      fullName: body.fullName,
      sourceId: body.cardToken,
      consent: true,
    });
    return NextResponse.json({success: true, ...result, membership_active: false});
  } catch {
    // Do not log exception text: upstream providers may echo card nonces.
    console.error("Standard enrollment blocked; requires safe reconciliation");
    return NextResponse.json({
      success: false,
      error: "Enrollment could not be completed. Do not retry payment; contact support to confirm its status.",
    }, {status: 503});
  }
}
