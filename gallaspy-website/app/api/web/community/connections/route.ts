import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { GET as membership } from "@/app/api/mobile/membership/route";

export const dynamic = "force-dynamic";
const uuid = /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i;
const reply = (body: unknown, status = 200) => NextResponse.json(body, {status, headers:{"Cache-Control":"private, no-store"}});

async function context(request: NextRequest) {
  const token = request.headers.get("authorization")?.match(/^Bearer (\S+)$/)?.[1];
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!token || token.length > 4096) return {error: reply({success:false,error:"Authentication required."},401)};
  if (!url || !anon || !secret) return {error: reply({success:false,error:"Connections unavailable."},503)};
  const auth = createClient(url, anon, {auth:{persistSession:false,autoRefreshToken:false}});
  const {data,error} = await auth.auth.getUser(token);
  if (error || !data.user) return {error:reply({success:false,error:"Authentication required."},401)};
  const verification = await membership(request);
  if (!verification.ok) return {error:reply({success:false,error:"Membership verification unavailable."},verification.status)};
  const verified = await verification.json();
  if (verified.membership?.is_official_member !== true) return {error:reply({success:false,error:"Active club membership required."},403)};
  const admin = createClient(url, secret, {auth:{persistSession:false,autoRefreshToken:false}});
  return {admin, viewer:data.user.id};
}

export async function GET(request: NextRequest) {
  try {
    const ctx = await context(request);
    if (ctx.error) return ctx.error;
    const page = Number(request.nextUrl.searchParams.get("page") ?? "0");
    if (!Number.isSafeInteger(page) || page < 0 || page > 100) return reply({success:false,error:"Invalid page."},400);
    const [following,followers] = await Promise.all([false,true].map(incoming=>ctx.admin.rpc("gallaspy_community_connections",{viewer:ctx.viewer,incoming,page_offset:page*100})));
    if (following.error || followers.error) throw new Error("Connections query failed");
    return reply({success:true,following:following.data,followers:followers.data,page});
  } catch { return reply({success:false,error:"Connections temporarily unavailable."},503); }
}

export async function POST(request: NextRequest) {
  try {
    const ctx = await context(request);
    if (ctx.error) return ctx.error;
    const raw = await request.text();
    if (raw.length > 1024) return reply({success:false,error:"Invalid request."},413);
    let input; try { input = JSON.parse(raw); } catch { return reply({success:false,error:"Invalid request."},400); }
    if (!input || typeof input.user_id !== "string" || !uuid.test(input.user_id) || input.user_id === ctx.viewer || !["follow","unfollow"].includes(input.action)) return reply({success:false,error:"Invalid golfer or action."},400);
    const {data,error} = await ctx.admin.rpc("gallaspy_set_community_follow",{viewer:ctx.viewer,target:input.user_id,enabled:input.action==="follow"});
    if (error) throw new Error("Connection update failed");
    if (data !== true) return reply({success:false,error:"Unable to follow this golfer. Check your clubhouse username and the 100-following launch limit."},409);
    return reply({success:true});
  } catch { return reply({success:false,error:"Connections temporarily unavailable."},503); }
}
