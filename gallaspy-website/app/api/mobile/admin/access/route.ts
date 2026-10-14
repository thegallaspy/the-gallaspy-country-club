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
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !anonKey || !serviceKey) {
    return reply(
      { success: false, error: "Service unavailable." },
      503
    );
  }

  const token = request.headers
    .get("authorization")
    ?.match(/^Bearer\s+(.+)$/i)?.[1];

  if (!token) {
    return reply(
      { success: false, error: "Sign in required." },
      401
    );
  }

  const options = {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  };

  try {
    const auth = createClient(url, anonKey, options);
    const admin = createClient(url, serviceKey, options);

    const { data: identity, error: authError } =
      await auth.auth.getUser(token);

    if (authError || !identity.user) {
      return reply(
        { success: false, error: "Invalid session." },
        401
      );
    }

    const { data: administrator, error: lookupError } =
      await admin
        .from("gallaspy_admin_users")
        .select("role")
        .eq("user_id", identity.user.id)
        .maybeSingle();

    if (lookupError) {
      return reply(
        { success: false, error: "Unable to check access." },
        503
      );
    }

    const role = administrator?.role ?? "member";

    return reply({
      success: true,
      is_admin: role === "owner" || role === "admin",
      role,
    });
  } catch {
    return reply(
      { success: false, error: "Service unavailable." },
      503
    );
  }
}
