import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { GET as membershipStatus } from "../../membership/route";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
function headers(request: NextRequest) {
  const origin = request.headers.get("origin");
  return { "Cache-Control":"private, no-store", "Access-Control-Allow-Methods":"GET, OPTIONS", "Access-Control-Allow-Headers":"Authorization, Content-Type", Vary:"Origin", ...(origin&&["capacitor://localhost","https://localhost","http://localhost"].includes(origin)?{"Access-Control-Allow-Origin":origin}:{}) };
}
export function OPTIONS(request: NextRequest) { return new Response(null,{status:204,headers:headers(request)}); }
export async function GET(request: NextRequest) {
  const reply=(body:unknown,status=200)=>Response.json(body,{status,headers:headers(request)});
  try {
    const token=request.headers.get("authorization")?.match(/^Bearer\s+(\S+)$/i)?.[1];
    if(!token)return reply({access:false,error:"Sign in to My Gallaspy first."},401);
    const checked=await membershipStatus(request);
    if(!checked.ok)return reply({access:false,error:"Unable to verify your membership."},checked.status);
    const record=await checked.json(), member=record.membership;
    if(record.success!==true||member?.is_official_member!==true||member.access_status!=="active")return reply({access:false,error:"An active official Gallaspy membership is required."},403);
    const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if(!url||!key)return reply({access:false,error:"Locker temporarily unavailable."},503);
    const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false},global:{headers:{Authorization:`Bearer ${token}`}}});
    const {data:code,error}=await db.rpc("gallaspy_my_official_locker_code");
    if(error)return reply({access:false,error:"Locker temporarily unavailable."},503);
    if(typeof code!=="string"||!/^GGL-[0-9A-F]{32}$/.test(code))return reply({access:false,error:"An active official Gallaspy membership is required."},403);
    return reply({access:true,plan:member.type==="falcon_society"?"falcon_society":member.billing?.plan,paidThrough:member.billing?.current_period_end??null,lockerCode:code});
  }catch{return reply({access:false,error:"Locker temporarily unavailable."},503);}
}
