import { NextResponse } from "next/server";

type MembershipSubmission = {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  membershipType?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as MembershipSubmission;

    const name = body.name?.trim();
    const email = body.email?.trim();
    const membershipType = body.membershipType?.trim();

    if (!name || !email || !membershipType) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, and membership interest are required.",
        },
        { status: 400 },
      );
    }

    console.log("New membership interest:", {
      name,
      email,
      phone: body.phone?.trim() || "",
      city: body.city?.trim() || "",
      membershipType,
      message: body.message?.trim() || "",
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Membership interest received.",
    });
  } catch (error) {
    console.error("Membership interest submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to process membership interest.",
      },
      { status: 500 },
    );
  }
}