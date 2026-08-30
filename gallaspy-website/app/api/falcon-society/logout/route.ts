import { NextResponse } from "next/server";
import { getFalconSocietyCookieName } from "@/lib/falcon-society-auth";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: getFalconSocietyCookieName(),
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
