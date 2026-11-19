import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { GET as membership } from "@/app/api/mobile/membership/route";

export const dynamic = "force-dynamic";
const uuid = /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i;
const reply = (body: unknown, status = 200) => NextResponse.json(body,{status,headers:{"Cache-Control":"private, no-store"}});
const fields = "bio,home_course,experience,playing_style,personal_highlight,share_details";

async function context(request: NextRequest) {
  const token = request.headers.get("authorization")?.match(/^Bearer (\S+)$/)?.[1];
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!token || token.length > 4096) return {error:reply({success:false,error:"Authentication required."},401)};
  if (!url || !anon || !secret) return {error:reply({success:false,error:"Golfer details unavailable."},503)};
  const auth = createClient(url,anon,{auth:{persistSession:false,autoRefreshToken:false}});
  const {data,error} = await auth.auth.getUser(token);
  if (error || !data.user) return {error:reply({success:false,error:"Authentication required."},401)};
  const verified = await membership(request);
  if (!verified.ok) return {error:reply({success:false,error:"Membership verification unavailable."},verified.status)};
  if ((await verified.json()).membership?.is_official_member !== true) return {error:reply({success:false,error:"Active club membership required."},403)};
  return {viewer:data.user.id,admin:createClient(url,secret,{auth:{persistSession:false,autoRefreshToken:false}})};
}

export async function GET(request: NextRequest) {
  try {
    const ctx = await context(request);
    if (ctx.error) return ctx.error;
    const target = request.nextUrl.searchParams.get("user_id") ?? ctx.viewer;
    if (!uuid.test(target)) return reply({success:false,error:"Invalid golfer."},400);
    const {data,error} = await ctx.admin.rpc("gallaspy_read_golfer_details",{viewer:ctx.viewer,target});
    if (error) throw error;
    return reply({success:true,details:data?.[0] ?? null});
  } catch { return reply({success:false,error:"Golfer details temporarily unavailable."},503); }
}

export async function POST(request: NextRequest) {
  try {
    const ctx = await context(request);
    if (ctx.error) return ctx.error;
    const raw = await request.text();
    if (raw.length > 4096) return reply({success:false,error:"Profile too long."},413);
    let input; try { input = JSON.parse(raw); } catch { return reply({success:false,error:"Invalid profile."},400); }
    if (!input || typeof input.share_details !== "boolean" || typeof input.bio !== "string" || input.bio.trim().length > 300 || typeof input.home_course !== "string" || input.home_course.trim().length > 100 || typeof input.personal_highlight !== "string" || input.personal_highlight.trim().length > 180 || !["","beginner","recreational","competitive"].includes(input.experience) || !["","casual","practice","competition"].includes(input.playing_style)) return reply({success:false,error:"Invalid profile details."},400);
    const profile = await ctx.admin.from("gallaspy_community_profiles").select("user_id").eq("user_id",ctx.viewer).maybeSingle();
    if (profile.error) throw profile.error;
    if (!profile.data) return reply({success:false,error:"Create your clubhouse username first."},409);
    const {data,error} = await ctx.admin.from("gallaspy_golfer_details").upsert({user_id:ctx.viewer,bio:input.bio.trim(),home_course:input.home_course.trim(),experience:input.experience,playing_style:input.playing_style,personal_highlight:input.personal_highlight.trim(),share_details:input.share_details,updated_at:new Date().toISOString()}).select(fields).single();
    if (error) throw error;
    return reply({success:true,details:data});
  } catch { return reply({success:false,error:"Unable to save golfer details."},503); }
}
