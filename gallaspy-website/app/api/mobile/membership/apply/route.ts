import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const RULES_VERSION = "2026-10-15";

const corsHeaders = {
  "Access-Control-Allow-Origin": "capacitor://localhost",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
  "Cache-Control": "no-store",
  Vary: "Origin",
};

function respond(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: corsHeaders,
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

function cleanText(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const text = value.trim();
  return text.length <= max ? text : null;
}

export async function POST(request: NextRequest) {
  if (process.env.GALLASPY_MEMBERSHIP_APPLICATIONS_ENABLED !== "true") {
    return respond(
      { success: false, error: "Membership applications are not open yet." },
      503,
    );
  }

  const token = request.headers
    .get("authorization")
    ?.match(/^Bearer\s+(.+)$/i)?.[1];

  if (!token) {
    return respond({ success: false, error: "Sign in required." }, 401);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = (process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY);

  if (!url || !anonKey || !serviceKey) {
    return respond({ success: false, error: "Service unavailable." }, 503);
  }

  try {
    const options = {
      auth: { persistSession: false, autoRefreshToken: false },
    };

    const auth = createClient(url, anonKey, options);
    const admin = createClient(url, serviceKey, options);

    const { data, error: authError } = await auth.auth.getUser(token);
    const user = data.user;

    if (authError || !user) {
      return respond({ success: false, error: "Invalid session." }, 401);
    }

    if (!user.email || !user.email_confirmed_at) {
      return respond({ success: false, error: "Verify your email first." }, 403);
    }

    let body: Record<string, unknown>;

    try {
      const input: unknown = await request.json();
      if (!input || typeof input !== "object" || Array.isArray(input)) {
        return respond({ success: false, error: "Invalid application." }, 400);
      }
      body = input as Record<string, unknown>;
    } catch {
      return respond({ success: false, error: "Invalid JSON." }, 400);
    }

    const firstName = cleanText(body.first_name, 100);
    const lastName = cleanText(body.last_name, 100);

    if (
      !firstName ||
      !lastName ||
      body.accept_rules !== true ||
      body.rules_version !== RULES_VERSION
    ) {
      return respond(
        { success: false, error: "Required application details are missing." },
        400,
      );
    }

    const phone = cleanText(body.phone ?? "", 30);
    const city = cleanText(body.city ?? "", 100);
    const state = cleanText(body.state ?? "", 100);
    const golfExperience = cleanText(body.golf_experience ?? "", 150);
    const reason = cleanText(body.reason_for_joining ?? "", 2000);

    if ([phone, city, state, golfExperience, reason].some(v => v === null)) {
      return respond({ success: false, error: "Invalid application details." }, 400);
    }

    const { data: existing, error: lookupError } = await admin
      .from("gallaspy_membership_applications")
      .select("id, application_status")
      .eq("user_id", user.id)
      .maybeSingle();

    if (lookupError) {
      return respond({ success: false, error: "Application lookup failed." }, 503);
    }

    if (existing) {
      return respond({
        success: false,
        error: "An application already exists.",
        application_status: existing.application_status,
      }, 409);
    }

    const { data: application, error: insertError } = await admin
      .from("gallaspy_membership_applications")
      .insert({
        user_id: user.id,
        first_name: firstName,
        last_name: lastName,
        email: user.email.trim().toLowerCase(),
        phone: phone || null,
        city: city || null,
        state: state || null,
        golf_experience: golfExperience || null,
        reason_for_joining: reason || null,
        rules_accepted_at: new Date().toISOString(),
        rules_version: RULES_VERSION,
        application_status: "pending",
      })
      .select("id, application_status, created_at")
      .single();

    if (insertError) {
      if (insertError.code === "23505") {
        return respond(
          { success: false, error: "An application already exists." },
          409,
        );
      }

      console.error(
        "Membership application submission failed:",
        insertError.message,
      );

      return respond(
        { success: false, error: "Unable to submit application." },
        503,
      );
    }

    return respond(
      {
        success: true,
        application,
        message: "Your membership application is pending review.",
      },
      201,
    );
  } catch (error) {
    console.error("Membership application error:", error);

    return respond(
      { success: false, error: "Application service unavailable." },
      503,
    );
  }
}
