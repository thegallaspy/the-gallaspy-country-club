import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const headers = {
  "Access-Control-Allow-Origin": "capacitor://localhost",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
  "Cache-Control": "no-store",
  Vary: "Origin",
};

function reply(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers });
}

export async function GET(request: NextRequest) {
  const token = request.headers
    .get("authorization")
    ?.match(/^Bearer\s+(.+)$/i)?.[1];

  if (!token) {
    return reply({ success: false, error: "Sign in required." }, 401);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = (process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY);

  if (!url || !anonKey || !serviceKey) {
    return reply({ success: false, error: "Service unavailable." }, 503);
  }

  try {
    const options = {
      auth: { persistSession: false, autoRefreshToken: false },
    };

    const auth = createClient(url, anonKey, options);
    const admin = createClient(url, serviceKey, options);

    const { data: identity, error: authError } =
      await auth.auth.getUser(token);

    if (authError || !identity.user) {
      return reply(
        { success: false, error: "Invalid session." },
        401,
      );
    }

    const { data: administrator, error: accessError } = await admin
      .from("gallaspy_admin_users")
      .select("role")
      .eq("user_id", identity.user.id)
      .maybeSingle();

    if (accessError) {
      return reply(
        { success: false, error: "Unable to check access." },
        503,
      );
    }

    if (!administrator || !["owner", "admin"].includes(administrator.role)) {
      return reply(
        { success: false, error: "Administrator access required." },
        403,
      );
    }

    const { data: applications, error: listError } = await admin
      .from("gallaspy_membership_applications")
      .select(
        "id, user_id, first_name, last_name, email, phone, city, state, golf_experience, reason_for_joining, application_status, rules_version, rules_accepted_at, reviewed_by, reviewed_at, decision_notes, created_at, updated_at"
      )
      .order("created_at", { ascending: false })
      .limit(100);

    if (listError) {
      console.error("Membership application listing failed:", listError.message);
      return reply(
        { success: false, error: "Unable to retrieve applications." },
        503,
      );
    }

    return reply({
      success: true,
      applications: applications ?? [],
    });
  } catch (error) {
    console.error("Membership administration error:", error);
    return reply(
      { success: false, error: "Service unavailable." },
      503,
    );
  }
}
