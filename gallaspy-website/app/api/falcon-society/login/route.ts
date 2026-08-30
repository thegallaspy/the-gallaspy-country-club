import { NextResponse } from "next/server";
import {
  createFalconSocietySession,
  getFalconSocietyCookieName,
} from "@/lib/falcon-society-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password =
      typeof body?.password === "string" ? body.password.trim() : "";

    const memberPassword = process.env.FALCON_SOCIETY_MEMBER_PASSWORD;

    if (!memberPassword) {
      console.error("FALCON_SOCIETY_MEMBER_PASSWORD is not configured.");

      return NextResponse.json(
        { error: "Member access is not configured." },
        { status: 500 }
      );
    }

    if (!password || password !== memberPassword) {
      return NextResponse.json(
        { error: "Incorrect member password." },
        { status: 401 }
      );
    }

    const token = await createFalconSocietySession();

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set({
      name: getFalconSocietyCookieName(),
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Falcon Society login error:", error);

    return NextResponse.json(
      { error: "Unable to process member access." },
      { status: 500 }
    );
  }
}
