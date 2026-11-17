import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
export const dynamic="force-dynamic";
export async function GET(){
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL;const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key)return NextResponse.json({success:false,error:"Round discovery unavailable."},{status:503,headers:{"Cache-Control":"no-store"}});
 try{
  const admin=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
  const today=new Intl.DateTimeFormat("en-CA",{timeZone:"America/New_York",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());
  const {data,error}=await admin.from("gallaspy_foursomes").select("id,course_name,round_date,tee_time,playing_style,max_players,status").gte("round_date",today).eq("status","open").order("round_date",{ascending:true}).order("tee_time",{ascending:true}).limit(24);
  if(error)throw error;
  return NextResponse.json({success:true,rounds:data??[]},{headers:{"Cache-Control":"no-store"}});
 }catch{return NextResponse.json({success:false,error:"Round discovery unavailable."},{status:503,headers:{"Cache-Control":"no-store"}})}
}
