import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
const origins = new Set(["capacitor://localhost", "http://localhost", "https://localhost"]);
function headers(req: NextRequest) {
  const origin = req.headers.get("origin") || "";
  return { ...(origins.has(origin) ? { "Access-Control-Allow-Origin": origin } : {}),
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Cache-Control": "private, no-store", Vary: "Origin" };
}
function reply(req: NextRequest, data: object, status = 200) { return NextResponse.json({ contract_version: 1, ...data }, {status, headers:headers(req)}); }
class Fault extends Error { constructor(public status: number, message: string) { super(message); } }
function failure(req: NextRequest, err: unknown) {
  if (err instanceof Fault) return reply(req,{success:false,error:err.message},err.status);
  console.error("Tournament service error");
  return reply(req,{success:false,error:"Tournament service temporarily unavailable."},503);
}
export function OPTIONS(req: NextRequest) { return new NextResponse(null,{status:204,headers:headers(req)}); }
async function actor(req: NextRequest) {
  const token=req.headers.get("authorization")?.match(/^Bearer\s+(\S+)$/i)?.[1];
  if(!token) throw new Fault(401,"Sign in to My Gallaspy.");
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL, anon=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, secret=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!url||!anon||!secret) throw new Fault(503,"Service unavailable.");
  const options={auth:{persistSession:false,autoRefreshToken:false}};
  const auth=createClient(url,anon,options), db=createClient(url,secret,options);
  const {data,error}=await auth.auth.getUser(token);
  if(error||!data.user)throw new Fault(401,"Sign in again to continue.");
  if(!data.user.email_confirmed_at)throw new Fault(403,"Verify your email first.");
  const player=await db.from("gallaspy_players").select("id,golf_id_number").eq("auth_user_id",data.user.id).eq("player_status","active").maybeSingle();
  if(player.error)throw player.error;
  if(!player.data||player.data.golf_id_number==null)throw new Fault(403,"A linked, active Gallaspy Player ID is required.");
  return {db,player:player.data,playerId:"GGC-"+String(player.data.golf_id_number).padStart(6,"0")};
}
export async function GET(req: NextRequest) {
  try {
    const {db,player,playerId}=await actor(req);
    const view=req.nextUrl.searchParams.get("view");
    if(view==="priority"){
      const row=await db.from("gallaspy_championship_priority").select("joined_at").eq("player_id",player.id).maybeSingle();
      if(row.error)throw row.error;
      return reply(req,{success:true,playerId,confirmed:!!row.data});
    }
    if(view!=="cup")throw new Fault(400,"Choose a tournament view.");
    const [event,available]=await Promise.all([db.from("gallaspy_cup_2027").select("state,announcement,falcon_captain,crest_captain").eq("event_year",2027).single(),db.from("gallaspy_cup_availability").select("declared_at").eq("player_id",player.id).maybeSingle()]);
    if(event.error||available.error)throw event.error||available.error;
    const e=event.data;
    const base={success:true,state:e.state,announcement:e.announcement,declared:!!available.data};
    if(e.state==="preview")return reply(req,{...base,matches:[]});
    const [matches,scores]=await Promise.all([db.from("gallaspy_cup_matches_2027").select("slot,falcon_label,crest_label,falcon_player,crest_player").order("slot"),db.from("gallaspy_cup_holes_2027").select("slot,hole,winner").order("hole")]);
    if(matches.error||scores.error)throw matches.error||scores.error;
    return reply(req,{...base,matches:matches.data.map(m=>({slot:m.slot,falcon:m.falcon_label,crest:m.crest_label,canScore:e.state==="live"&&[m.falcon_player,m.crest_player,e.falcon_captain,e.crest_captain].includes(player.id),holes:scores.data.filter(h=>h.slot===m.slot).map(({hole,winner})=>({hole,winner}))}))});
  }catch(err){return failure(req,err);}
}
export async function POST(req: NextRequest) {
  try {
    const {db,player,playerId}=await actor(req);
    const raw=await req.text();if(raw.length>2048)throw new Fault(413,"Request too large.");
    let body;try{body=JSON.parse(raw);}catch{throw new Fault(400,"Invalid request.");}
    if(!body||typeof body!=="object"||Array.isArray(body))throw new Fault(400,"Invalid request.");
    if(body.action==="join-priority"){
      const {error}=await db.from("gallaspy_championship_priority").upsert({player_id:player.id},{onConflict:"player_id",ignoreDuplicates:true});
      if(error)throw error;
      return reply(req,{success:true,confirmed:true,playerId});
    }
    if(body.action==="cup-available"){
      const {error}=await db.rpc("gallaspy_declare_cup_availability",{p_player:player.id});
      if(error?.code==="P0001")throw new Fault(409,"Availability is closed or your player profile is inactive.");
      if(error)throw error;return reply(req,{success:true,confirmed:true});
    }
    if(body.action!=="cup-hole")throw new Fault(400,"Unknown tournament action.");
    const {slot,hole,winner}=body;
    if(!Number.isInteger(slot)||slot<1||slot>8||!Number.isInteger(hole)||hole<1||hole>18||!["falcon","crest","halved"].includes(winner))throw new Fault(400,"Invalid hole outcome.");
    const {error}=await db.rpc("gallaspy_cup_score_hole",{p_player:player.id,p_slot:slot,p_hole:hole,p_winner:winner});
    if(error?.code==="P0001")throw new Fault(409,"Score rejected: match unavailable, unauthorized, or conflicting result. Refresh the Match Center.");
    if(error)throw error;return reply(req,{success:true});
  }catch(err){return failure(req,err);}
}
