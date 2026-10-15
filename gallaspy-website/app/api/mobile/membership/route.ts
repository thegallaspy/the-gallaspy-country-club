import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const ALLOWED_ORIGIN = "capacitor://localhost";

function respond(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      "Cache-Control": "no-store",
      Vary: "Origin",
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      "Cache-Control": "no-store",
      Vary: "Origin",
    },
  });
}

export async function GET(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return respond(
      { success: false, error: "Authentication required." },
      401
    );
  }

  const token = authorization.slice(7).trim();

  if (!token) {
    return respond(
      { success: false, error: "Authentication required." },
      401
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return respond(
      { success: false, error: "Membership service unavailable." },
      503
    );
  }

  try {
    const supabase = createClient(url, anonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return respond(
        { success: false, error: "Invalid authentication." },
        401
      );
    }

    const { data: membership, error } = await supabase
      .from("gallaspy_memberships")
      .select(
        "membership_number, membership_status, membership_type, founder_number, approved_at"
      )
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Membership lookup failed:", error.message);

      return respond(
        { success: false, error: "Unable to load membership." },
        503
      );
    }

    const approved = membership?.membership_status === "approved";

    return respond({
      success: true,
      membership_found: Boolean(membership),
      membership: membership
        ? {
            status: membership.membership_status,
            type: membership.membership_type,
            membership_number: membership.membership_number,
            founder_number: membership.founder_number,
            approved_at: membership.approved_at,
            is_official_member: approved,
            is_falcon_society_member:
              approved &&
              membership.membership_type === "falcon_society" &&
              membership.founder_number != null,
          }
        : null,
    });
  } catch {
    return respond(
      { success: false, error: "Membership service unavailable." },
      503
    );
  }
}
