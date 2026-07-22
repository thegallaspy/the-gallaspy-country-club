import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "city",
      "state",
      "membershipInterest",
    ];

    for (const field of requiredFields) {
      if (!data[field] || String(data[field]).trim() === "") {
        return NextResponse.json(
          {
            message: `Missing required field: ${field}`,
          },
          { status: 400 }
        );
      }
    }

    // This will show submissions in your Codespaces terminal for now.
    console.log("=================================");
    console.log("NEW FOUNDING 250 REGISTRATION");
    console.log("=================================");
    console.log(data);
    console.log("=================================");

    return NextResponse.json({
      success: true,
      message:
        "Thank you for your interest in becoming a Founding Member of The Gallaspy Golf & Country Club.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}