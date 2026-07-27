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
    console.log("NEW FALCON SOCIETY APPLICATION");
    console.log("=================================");
    console.log(data);
    console.log("=================================");

    return NextResponse.json({
      success: true,
      message:
        "Thank you for your interest in the Falcon Society at The Gallaspy Golf & Country Club. One of only 100 Founding Members will be selected.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}