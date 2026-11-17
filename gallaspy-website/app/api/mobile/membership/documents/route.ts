import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const headers = {
  "Access-Control-Allow-Origin": "capacitor://localhost",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
  "Cache-Control": "private, no-store",
  "Vary": "Origin",
};

function respond(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers });
}

export async function GET(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return respond({ success: false, error: "Authentication required." }, 401);
  }

  const token = authorization.slice(7).trim();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !anonKey || !serviceKey) {
    return respond({ success: false, error: "Service unavailable." }, 503);
  }

  try {
    const supabase = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user?.email_confirmed_at) {
      return respond({ success: false, error: "Verified authentication required." }, 401);
    }

    const admin = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const result = await admin
      .from("gallaspy_membership_signed_records")
      .select("id,membership_plan,signed_full_name,accepted_at,documents")
      .eq("user_id", user.id)
      .order("accepted_at", { ascending: false });

    if (result.error) {
      return respond({ success: false, error: "Records unavailable." }, 503);
    }

    return respond({ success: true, records: result.data ?? [] });

  } catch {
    return respond({ success: false, error: "Records unavailable." }, 503);
  }
}
