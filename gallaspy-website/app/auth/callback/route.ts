import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") || "/my-gallaspy";

  if (!code) {
    return NextResponse.redirect(
      new URL("/my-gallaspy?error=missing_code", requestUrl.origin),
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("My Gallaspy auth callback error:", error);

    return NextResponse.redirect(
      new URL("/my-gallaspy?error=auth_failed", requestUrl.origin),
    );
  }

  return NextResponse.redirect(
    new URL(next.startsWith("/") ? next : "/my-gallaspy", requestUrl.origin),
  );
}
