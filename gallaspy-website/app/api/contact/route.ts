import { NextResponse } from "next/server";

const requiredFields = [
  "firstName",
  "lastName",
  "email",
  "inquiryType",
  "message",
  "consent",
];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    for (const field of requiredFields) {
      const value = formData.get(field);

      if (!value || value.toString().trim() === "") {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const email = formData.get("email")?.toString().trim() ?? "";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const submission = {
      firstName: formData.get("firstName")?.toString().trim(),
      lastName: formData.get("lastName")?.toString().trim(),
      email,
      phone: formData.get("phone")?.toString().trim(),
      organization: formData.get("organization")?.toString().trim(),
      inquiryType: formData.get("inquiryType")?.toString().trim(),
      message: formData.get("message")?.toString().trim(),
      submittedAt: new Date().toISOString(),
    };

    console.log("New Gallaspy inquiry:", submission);

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry received.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to process the inquiry.",
      },
      { status: 500 }
    );
  }
}