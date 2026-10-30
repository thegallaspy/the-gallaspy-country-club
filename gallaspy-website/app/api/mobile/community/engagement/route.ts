import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const ORIGIN = "capacitor://localhost";
const UUID = /^[a-f\d]{8}-[a-f\d]{4}-[1-8][a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i;
const MAX_BODY = 4096;

function result(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: {
    "Cache-Control": "no-store", "Access-Control-Allow-Origin": ORIGIN,
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS", Vary: "Origin",
  }});
}
export function OPTIONS() { return new NextResponse(null, {status: 204, headers: {
  "Access-Control-Allow-Origin": ORIGIN,
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
}}); }

// Infer concrete Supabase client types from the initialized clients.
// ReturnType<typeof createClient> on a generic factory loses its schema type
// and can incorrectly turn table rows into `never`.
function createCommunityClients(url: string, anon: string, secret: string, token: string) {
  const options = {auth: { persistSession: false, autoRefreshToken: false }};
  const client = createClient(url, anon, { ...options, global: {
    headers: {Authorization: `Bearer ${token}`},
  }});
  const admin = createClient(url, secret, options);
  return { client, admin };
}

type Context = { userId: string } & ReturnType<typeof createCommunityClients>;
async function auth(request: NextRequest): Promise<Context | null> {
  const authz = request.headers.get("authorization") ?? "";
  const token = authz.startsWith("Bearer ") ? authz.slice(7).trim() : "";
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const secret = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!token || token.length > 4096 || !url || !anon || !secret) return null;
  const clients = createCommunityClients(url, anon, secret, token);
  const {data, error} = await clients.client.auth.getUser(token);
  if (error || !data.user || !UUID.test(data.user.id)) return null;
  return { userId: data.user.id, ...clients };
}

async function visiblePost(ctx: Context, id: string) {
  const {data, error} = await ctx.admin.from("gallaspy_community_posts")
    .select("id,user_id").eq("id", id).is("deleted_at", null)
    .not("published_at", "is", null).maybeSingle();
  if (error || !data) return null;
  const authorId = data.user_id as string;
  // Blocking is mutual for the feed and post interactions.
  const {data: blocks, error: blockError} = await ctx.admin
    .from("gallaspy_community_blocks")
    .select("blocker_id,blocked_id")
    .or(`and(blocker_id.eq.${ctx.userId},blocked_id.eq.${authorId}),and(blocker_id.eq.${authorId},blocked_id.eq.${ctx.userId})`)
    .limit(1);
  if (blockError || !blocks || blocks.length) return null;
  return data as {id: string; user_id: string};
}

export async function GET(request: NextRequest) {
  try {
    const ctx = await auth(request);
    if (!ctx) return result({success:false,error:"Authentication required."},401);
    const search = request.nextUrl.searchParams;
    const postId = search.get("post_id");
    if (postId) {
      if (!UUID.test(postId)) return result({success:false,error:"Invalid post."},400);
      const post = await visiblePost(ctx, postId);
      if (!post) return result({success:false,error:"Post unavailable."},404);
      const {data, error} = await ctx.client.from("gallaspy_community_comments")
        .select("id,user_id,body,created_at")
        .eq("post_id",postId).is("deleted_at",null)
        .order("created_at",{ascending:false}).limit(30);
      if (error) throw new Error("Comment lookup unavailable");
      const {data: blocked, error: blockedError} = await ctx.admin
        .from("gallaspy_community_blocks")
        .select("blocker_id,blocked_id")
        .or(`blocker_id.eq.${ctx.userId},blocked_id.eq.${ctx.userId}`);
      if (blockedError || !blocked) throw new Error("Blocks unavailable");
      const hidden = new Set(blocked.map(b =>
        b.blocker_id === ctx.userId ? b.blocked_id : b.blocker_id));
      const shown = (data ?? []).filter(c => !hidden.has(c.user_id));
      const authors = [...new Set(shown.map(c => c.user_id))];
      let handles = new Map<string,string>();
      if (authors.length) {
        const {data: profiles, error: profileErr} = await ctx.admin
          .from("gallaspy_community_profiles")
          .select("user_id,username").in("user_id",authors);
        if (!profileErr) handles = new Map((profiles??[]).map(p=>[p.user_id,p.username]));
      }
      return result({success:true,comments:shown.map(c=>({
        ...c, username:handles.get(c.user_id)??null,
      }))});
    }
    const raw = search.get("post_ids") ?? "";
    if (raw.length > 800) return result({success:false,error:"Invalid posts."},400);
    const ids = [...new Set(raw.split(",").filter(Boolean))];
    if (!ids.length || ids.length > 20 || ids.some(id => !UUID.test(id))) {
      return result({success:false,error:"Invalid posts."},400);
    }
    const {data, error} = await ctx.client.rpc("gallaspy_community_engagement", {p_post_ids:ids});
    if (error) throw new Error("Engagement lookup unavailable");
    return result({success:true,engagement:data??[]});
  } catch {
    return result({success:false,error:"Community interaction unavailable."},503);
  }
}

type Action = { action?: unknown; post_id?: unknown; user_id?: unknown; body?: unknown; reason?: unknown };
export async function POST(request: NextRequest) {
  try {
    const ctx = await auth(request);
    if (!ctx) return result({success:false,error:"Authentication required."},401);
    if (!(request.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json")) {
      return result({success:false,error:"JSON required."},415);
    }
    if (Number(request.headers.get("content-length")??0) > MAX_BODY) {
      return result({success:false,error:"Request too large."},413);
    }
    const raw = await request.text();
    if (raw.length > MAX_BODY) return result({success:false,error:"Request too large."},413);
    let payload: Action;
    try { payload = JSON.parse(raw) as Action; } catch {
      return result({success:false,error:"Invalid JSON."},400);
    }
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return result({success:false,error:"Invalid request."},400);
    }
    const action = payload.action;
    if (action === "block" || action === "unblock") {
      if (typeof payload.user_id !== "string" || !UUID.test(payload.user_id) ||
          payload.user_id === ctx.userId) return result({success:false,error:"Invalid golfer."},400);
      if (action === "block") {
        const {error} = await ctx.client.from("gallaspy_community_blocks")
          .upsert({blocker_id:ctx.userId,blocked_id:payload.user_id},
            {onConflict:"blocker_id,blocked_id",ignoreDuplicates:true});
        if (error) throw new Error("Block failed");
      } else {
        const {error} = await ctx.client.from("gallaspy_community_blocks")
          .delete().eq("blocker_id",ctx.userId).eq("blocked_id",payload.user_id);
        if (error) throw new Error("Unblock failed");
      }
      return result({success:true});
    }
    const postId = payload.post_id;
    if (typeof postId !== "string" || !UUID.test(postId)) {
      return result({success:false,error:"Invalid post."},400);
    }
    const post = await visiblePost(ctx, postId);
    if (!post) return result({success:false,error:"Post unavailable."},404);
    if (action === "like" || action === "unlike") {
      const table = ctx.client.from("gallaspy_community_likes");
      const response = action === "like"
        ? await table.upsert({post_id:postId,user_id:ctx.userId},
          {onConflict:"post_id,user_id",ignoreDuplicates:true})
        : await table.delete().eq("post_id",postId).eq("user_id",ctx.userId);
      if (response.error) throw new Error("Like unavailable");
      return result({success:true});
    }
    if (action === "comment") {
      if (typeof payload.body !== "string" ||
          payload.body.trim().length < 1 || payload.body.length > 1000) {
        return result({success:false,error:"Write a comment up to 1,000 characters."},400);
      }
      const {error} = await ctx.client.from("gallaspy_community_comments")
        .insert({post_id:postId,user_id:ctx.userId,body:payload.body.trim()});
      if (error) throw new Error("Unable to post comment");
      return result({success:true});
    }
    if (action === "report") {
      if (typeof payload.reason !== "string" ||
          payload.reason.trim().length < 5 || payload.reason.length > 500) {
        return result({success:false,error:"Please include a reason (5–500 characters)."},400);
      }
      const {error} = await ctx.client.from("gallaspy_community_reports")
        .insert({post_id:postId,reporter_id:ctx.userId,reason:payload.reason.trim(),status:"pending"});
      if (error?.code === "23505") return result({success:true,already_reported:true});
      if (error) throw new Error("Unable to report post");
      return result({success:true});
    }
    return result({success:false,error:"Unsupported action."},400);
  } catch {
    return result({success:false,error:"Community interaction unavailable."},503);
  }
}
