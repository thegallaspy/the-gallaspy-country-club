import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { GET as membership } from "@/app/api/mobile/membership/route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const bucket="gallaspy-community-videos";
const maxBytes=3_500_000;
const uuid=/^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i;
const reply=(body:unknown,status=200)=>NextResponse.json(body,{status,headers:{"Cache-Control":"private, no-store"}});

async function context(request:NextRequest) {
  const token=request.headers.get("authorization")?.match(/^Bearer (\S+)$/)?.[1];
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL,anon=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,secret=process.env.SUPABASE_SERVICE_ROLE_KEY||process.env.SUPABASE_SECRET_KEY;
  if(!token||token.length>4096)return {error:reply({success:false,error:"Authentication required."},401)};
  if(!url||!anon||!secret)return {error:reply({success:false,error:"Video service unavailable."},503)};
  const auth=createClient(url,anon,{auth:{persistSession:false,autoRefreshToken:false}});
  const {data,error}=await auth.auth.getUser(token);
  if(error||!data.user)return {error:reply({success:false,error:"Authentication required."},401)};
  const verified=await membership(request);
  if(!verified.ok)return {error:reply({success:false,error:"Membership verification unavailable."},verified.status)};
  if((await verified.json()).membership?.is_official_member!==true)return {error:reply({success:false,error:"Active club membership required."},403)};
  return {viewer:data.user.id,admin:createClient(url,secret,{auth:{persistSession:false,autoRefreshToken:false}})};
}

export async function GET(request:NextRequest) {
  try {
    const ctx=await context(request);if(ctx.error)return ctx.error;
    const ids=[...new Set((request.nextUrl.searchParams.get("post_ids")||"").split(","))];
    if(!ids.length||ids.length>20||ids.some(id=>!uuid.test(id)))return reply({success:false,error:"Invalid posts."},400);
    const {data,error}=await ctx.admin.rpc("gallaspy_visible_community_videos",{viewer:ctx.viewer,posts:ids});
    if(error)throw error;
    const videos:Record<string,string>={};
    for(const row of data??[]) {
      if(!ids.includes(row.post_id)||typeof row.storage_path!=="string"||!row.storage_path.endsWith(`/${row.post_id}.mp4`))continue;
      const signed=await ctx.admin.storage.from(bucket).createSignedUrl(row.storage_path,120);
      if(!signed.error&&signed.data?.signedUrl)videos[row.post_id]=signed.data.signedUrl;
    }
    return reply({success:true,videos});
  }catch{return reply({success:false,error:"Videos temporarily unavailable."},503);}
}

export async function POST(request:NextRequest) {
  try {
    const ctx=await context(request);if(ctx.error)return ctx.error;
    const type=request.headers.get("content-type")||"";
    const limit=maxBytes+30_000;
    if(!/^multipart\/form-data\s*;\s*boundary=/i.test(type)||!request.body)return reply({success:false,error:"Video upload required."},415);
    if(Number(request.headers.get("content-length"))>limit)return reply({success:false,error:"Video exceeds 3.5 MB."},413);
    const reader=request.body.getReader();const chunks:Uint8Array<ArrayBuffer>[]=[];let size=0;
    try {while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>limit){await reader.cancel().catch(()=>{});return reply({success:false,error:"Video exceeds 3.5 MB."},413);}chunks.push(new Uint8Array(value));}}finally{reader.releaseLock();}
    const form=await new Request("https://gallaspy.invalid/video",{method:"POST",headers:{"Content-Type":type},body:new Blob(chunks)}).formData();
    const file=form.get("video"),caption=form.get("body");
    if(!(file instanceof File)||form.getAll("video").length!==1||file.type!=="video/mp4"||file.size<12||file.size>maxBytes||typeof caption!=="string"||caption.length>3000)return reply({success:false,error:"Choose one MP4 under 3.5 MB with an optional caption."},400);
    const bytes=new Uint8Array(await file.arrayBuffer());
    if(String.fromCharCode(...bytes.slice(4,8))!=="ftyp")return reply({success:false,error:"Invalid MP4 container."},400);
    const post=randomUUID(),path=`${ctx.viewer}/${post}.mp4`;
    const uploaded=await ctx.admin.storage.from(bucket).upload(path,bytes,{contentType:"video/mp4",upsert:false});
    if(uploaded.error)throw uploaded.error;
    const published=await ctx.admin.rpc("gallaspy_publish_community_video",{actor:ctx.viewer,post,caption,bytes:file.size});
    if(published.error||published.data!==post){
      // Only clean up when the post is confirmed absent; an ambiguous RPC response may have committed.
      const check=await ctx.admin.from("gallaspy_community_posts").select("id").eq("id",post).maybeSingle();
      if(!check.error&&!check.data)await ctx.admin.storage.from(bucket).remove([path]);
      if(check.data)return reply({success:true,post:{id:post}},201);
      const message=published.error?.message||"";
      if(message.includes("60 seconds")||message.includes("Daily posting limit"))return reply({success:false,error:"Posting limit reached. Try again later."},429);
      return reply({success:false,error:"Unable to publish video."},503);
    }
    return reply({success:true,post:{id:post}},201);
  }catch{return reply({success:false,error:"Video publishing unavailable."},503);}
}
