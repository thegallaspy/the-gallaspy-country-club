import { NextRequest } from "next/server";
import { GET as membershipStatus } from "../../membership/route";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function headers(request: NextRequest) {
  const origin = request.headers.get("origin");
  return {
    "Cache-Control": "private, no-store",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    Vary: "Origin",
    ...(origin && ["capacitor://localhost", "https://localhost", "http://localhost"].includes(origin)
      ? { "Access-Control-Allow-Origin": origin } : {}),
  };
}

export function OPTIONS(request: NextRequest) {
  return new Response(null, { status: 204, headers: headers(request) });
}

export async function GET(request: NextRequest) {
  const reply = (body: unknown, status = 200) => Response.json(body, { status, headers: headers(request) });
  try {
    const response = await membershipStatus(request);
    if (!response.ok) return reply({ access: false, error: response.status === 401 ? "Sign in to My Gallaspy first." : "Unable to verify your membership. Try again." }, response.status);
    const record = await response.json();
    const member = record.membership;
    if (record.success !== true || member?.type !== "standard" || member.is_official_member !== true || member.access_status !== "active" || !["monthly", "annual"].includes(member.billing?.plan)) {
      return reply({ access: false, error: "An active paid monthly or annual Standard Membership is required." }, 403);
    }
    return reply({ access: true, plan: member.billing.plan, paidThrough: member.billing.current_period_end });
  } catch {
    return reply({ access: false, error: "Unable to verify your membership. Try again." }, 503);
  }
}
