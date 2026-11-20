import { createClient } from "@supabase/supabase-js";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const headers = {
  "Access-Control-Allow-Origin": "capacitor://localhost",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
  "Cache-Control": "private, no-store",
  Vary: "Origin",
};
const reply = (body: unknown, status = 200) => Response.json(body, { status, headers });
export function OPTIONS() { return new Response(null, { status: 204, headers }); }

const products = [
  ["mens-polo", "Men's Performance Polo"],
  ["mens-vest", "Men's Performance Vest"],
  ["womens-polo", "Women's Performance Polo"],
  ["womens-quarter-zip", "Women's Sleeveless Quarter-Zip"],
  ["womens-skirt", "Women's Golf Skirt"],
  ["hat", "Performance Hat"],
].flatMap(([id, name]) => ["red", "black"].map(color => ({
  id: `${id}-${color}`, name, color: color === "red" ? "Founder Red" : "Black",
  file: `falcon-society-${id}-${color}.png`,
})));

export async function POST(request: Request) {
  try {
    const token = request.headers.get("authorization")?.match(/^Bearer (.+)$/i)?.[1];
    if (!token) return reply({error:"Sign in to My Gallaspy first."}, 401);
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return reply({error:"Members Locker temporarily unavailable."}, 503);
    const db = createClient(url, key, {auth:{persistSession:false, autoRefreshToken:false}});
    const {data:{user}, error} = await db.auth.getUser(token);
    if (error || !user) return reply({error:"Sign in to My Gallaspy first."}, 401);
    const body = await request.json();
    const code = typeof body.code === "string" ? body.code.trim() : "";
    if (!/^[a-fA-F0-9]{32}$/.test(code)) return reply({error:"Enter your personal locker code."}, 400);
    const digest = createHash("sha256").update(code.toLowerCase()).digest("hex");
    const result = await db.rpc("verify_members_locker_code", {p_user:user.id,p_digest:digest});
    if (result.error) return reply({error:"Members Locker temporarily unavailable."}, 503);
    if (result.data !== true) return reply({error:"Access denied. Check your code or contact the club."}, 403);
    if (body.image !== undefined) {
      const product = products.find(p => p.id === body.image);
      if (!product) return reply({error:"Not found."}, 404);
      const bytes = await readFile(path.join(process.cwd(),"private-assets","falcon-society","collection",product.file));
      return new Response(new Uint8Array(bytes), {headers:{...headers,"Content-Type":"image/png","X-Content-Type-Options":"nosniff"}});
    }
    return reply({products: products.map(({id,name,color})=>({id,name,color}))});
  } catch {
    return reply({error:"Members Locker temporarily unavailable."}, 503);
  }
}
