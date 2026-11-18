import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const roundId = request.nextUrl.searchParams.get("round");
  if (
    roundId &&
    !/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(roundId)
  ) {
    return NextResponse.json(
      { success: false, error: "Invalid round link." },
      { status: 400 },
    );
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key)
    return NextResponse.json(
      { success: false, error: "Round discovery unavailable." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  try {
    const admin = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
    const query = admin
      .from("gallaspy_foursomes")
      .select(
        "id,course_name,round_date,tee_time,playing_style,max_players,status",
      )
      .gte("round_date", today)
      .eq("status", "open")
      .order("round_date", { ascending: true })
      .order("tee_time", { ascending: true })
      .limit(24);
    const { data, error } = await (roundId ? query.eq("id", roundId) : query);
    if (error) throw error;
    return NextResponse.json(
      { success: true, rounds: data ?? [] },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Round discovery unavailable." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
