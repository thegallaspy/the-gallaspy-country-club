import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TABLE = "gallaspy_sponsorship_inquiries";

const PACKAGES = new Set([
  "presenting",
  "championship",
  "official_event",
  "hole",
  "junior_falcon",
  "marketplace_vendor",
  "custom",
]);

const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type Submission = Record<string, unknown>;

function readText(
  input: Submission,
  field: string,
  maxLength: number,
  required = true
): string {
  const value = input[field];

  if (value == null && !required) return "";

  if (typeof value !== "string") {
    throw new Error(`Invalid ${field}`);
  }

  const result = value.trim();

  if (
    result.length > maxLength ||
    (required && result.length === 0) ||
    /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(result)
  ) {
    throw new Error(`Invalid ${field}`);
  }

  return result;
}

function validate(body: Submission) {
  const submissionKey = readText(body, "submissionKey", 36);
  const companyName = readText(body, "companyName", 160);
  const contactName = readText(body, "contactName", 160);
  const email = readText(body, "email", 254).toLowerCase();
  const phone = readText(body, "phone", 32);
  const website = readText(body, "website", 300, false);
  const industry = readText(body, "industry", 100);
  const sponsorshipPackage = readText(
    body,
    "sponsorshipInterest",
    60
  );
  const estimatedBudget = readText(
    body,
    "estimatedBudget",
    100
  );
  const partnershipType = readText(
    body,
    "partnershipType",
    100
  );
  const proposedActivation = readText(
    body,
    "proposedActivation",
    1500,
    false
  );
  const additionalInformation = readText(
    body,
    "message",
    3000,
    false
  );
  const preferredContactMethod = readText(
    body,
    "preferredContactMethod",
    10
  );

  if (!UUID.test(submissionKey)) {
    throw new Error("Invalid application reference key");
  }

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !/^[+()0-9.\s-]{7,32}$/.test(phone)
  ) {
    throw new Error("Invalid contact information");
  }

  if (!PACKAGES.has(sponsorshipPackage)) {
    throw new Error("Invalid sponsorship package");
  }

  if (!["email", "phone"].includes(preferredContactMethod)) {
    throw new Error("Invalid contact preference");
  }

  if (website) {
    let parsed: URL;
    try {
      parsed = new URL(website);
    } catch {
      throw new Error("Invalid website address");
    }

    if (
      !["http:", "https:"].includes(parsed.protocol) ||
      !parsed.hostname.includes(".") ||
      parsed.username ||
      parsed.password
    ) {
      throw new Error("Invalid website address");
    }
  }

  if (body.contactConsent !== true) {
    throw new Error("Contact consent is required");
  }

  return {
    submission_key: submissionKey,
    event_code: "the-gallaspy-2027",
    company_name: companyName,
    contact_name: contactName,
    email,
    phone,
    website: website || null,
    industry,
    sponsorship_package: sponsorshipPackage,
    estimated_budget: estimatedBudget,
    partnership_type: partnershipType,
    proposed_activation: proposedActivation || null,
    additional_information: additionalInformation || null,
    preferred_contact_method: preferredContactMethod,
    contact_consent: true,
  };
}

export async function POST(request: Request) {
  // No new public submission flow until database,
  // rate limits and operational checks are approved.
  if (
    process.env.GALLASPY_SPONSORSHIP_INQUIRIES_ENABLED !== "true"
  ) {
    return NextResponse.json(
      { error: "Sponsorship applications are being prepared." },
      { status: 503 }
    );
  }

  try {
    const origin = request.headers.get("origin");

    if (!origin || new URL(origin).origin !== new URL(request.url).origin) {
      return NextResponse.json(
        { error: "Invalid request origin." },
        { status: 403 }
      );
    }

    if (
      !request.headers
        .get("content-type")
        ?.toLowerCase()
        .startsWith("application/json")
    ) {
      return NextResponse.json(
        { error: "JSON request required." },
        { status: 415 }
      );
    }

    const raw = await request.text();

    if (raw.length > 12000) {
      return NextResponse.json(
        { error: "Application is too large." },
        { status: 413 }
      );
    }

    let body: Submission;

    try {
      const parsed: unknown = JSON.parse(raw);

      if (
        !parsed ||
        typeof parsed !== "object" ||
        Array.isArray(parsed)
      ) {
        throw new Error("Invalid application");
      }

      body = parsed as Submission;
    } catch {
      return NextResponse.json(
        { error: "Invalid application data." },
        { status: 400 }
      );
    }

    // Honeypot for automated form submissions.
    if (body.companyFaxNumber) {
      return NextResponse.json(
        { success: true, message: "Inquiry received." }
      );
    }

    let values: ReturnType<typeof validate>;

    try {
      values = validate(body);
    } catch {
      return NextResponse.json(
        { error: "Please review your application fields." },
        { status: 422 }
      );
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key =
      process.env.SUPABASE_SECRET_KEY ||
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      return NextResponse.json(
        { error: "Application service unavailable." },
        { status: 503 }
      );
    }

    const admin = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    // Reuse the application reference for repeated
    // submissions with the same key and identity.
    const { data: previous, error: previousError } =
      await admin
        .from(TABLE)
        .select("application_reference,email,company_name")
        .eq("submission_key", values.submission_key)
        .maybeSingle();

    if (previousError) {
      return NextResponse.json(
        { error: "Application service unavailable." },
        { status: 503 }
      );
    }

    if (previous) {
      if (
        previous.email !== values.email ||
        previous.company_name !== values.company_name
      ) {
        return NextResponse.json(
          { error: "Application key conflict." },
          { status: 409 }
        );
      }

      return NextResponse.json({
        success: true,
        applicationReference: previous.application_reference,
        message: "Your sponsorship inquiry has been received.",
      });
    }

    // Initial email-based submission throttle.
    // Stronger server-side abuse controls must be
    // verified before the public feature is enabled.
    const since = new Date(
      Date.now() - 24 * 60 * 60 * 1000
    ).toISOString();

    const { count, error: limitError } = await admin
      .from(TABLE)
      .select("id", { count: "exact", head: true })
      .eq("email", values.email)
      .gte("created_at", since);

    if (limitError) {
      return NextResponse.json(
        { error: "Application service unavailable." },
        { status: 503 }
      );
    }

    if ((count ?? 0) >= 3) {
      return NextResponse.json(
        { error: "Submission limit reached. Please contact our team." },
        { status: 429 }
      );
    }

    const { data: application, error: insertError } =
      await admin
        .from(TABLE)
        .insert(values)
        .select("id,application_reference")
        .single();

    if (insertError || !application) {
      // Concurrent duplicate requests can race the
      // unique constraint. Never create a second inquiry.
      if (insertError?.code === "23505") {
        return NextResponse.json(
          {
            error:
              "This application may already have been received. Please contact our team before resubmitting.",
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: "Unable to save your application." },
        { status: 503 }
      );
    }

    // Database storage is authoritative. Email is
    // secondary and cannot erase a saved application.
    let emailsSent = false;

    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const details = [
          "THE GALLASPY — Sponsorship Inquiry",
          `Reference: ${application.application_reference}`,
          `Company: ${values.company_name}`,
          `Contact: ${values.contact_name}`,
          `Email: ${values.email}`,
          `Phone: ${values.phone}`,
          `Website: ${values.website ?? "Not provided"}`,
          `Industry: ${values.industry}`,
          `Package: ${values.sponsorship_package}`,
          `Budget: ${values.estimated_budget}`,
          `Partnership Type: ${values.partnership_type}`,
          `Activation: ${values.proposed_activation ?? "Not provided"}`,
          `Additional Information: ${values.additional_information ?? "None"}`,
          `Preferred Contact: ${values.preferred_contact_method}`,
        ].join("\n");

        const internal = await resend.emails.send({
          from: "THE GALLASPY <invitational@thegallaspy.com>",
          to: ["info@thegallaspy.com"],
          replyTo: values.email,
          subject: `THE GALLASPY Sponsor Inquiry — ${application.application_reference}`,
          text: details,
        });

        const confirmation = await resend.emails.send({
          from: "THE GALLASPY <invitational@thegallaspy.com>",
          to: [values.email],
          replyTo: "info@thegallaspy.com",
          subject: `THE GALLASPY — Sponsorship Inquiry Received`,
          text: [
            `Hello ${values.contact_name},`,
            "",
            "Thank you for your interest in partnering with THE GALLASPY.",
            "Our team will review your inquiry and contact you regarding available sponsorship opportunities.",
            "",
            `Application reference: ${application.application_reference}`,
            "",
            "June 21, 2027 | Greater Atlanta, Georgia",
            "THE GALLASPY",
            "GOLF. CULTURE. COMPETITION.",
          ].join("\n"),
        });

        emailsSent = !internal.error && !confirmation.error;
      } catch {
        emailsSent = false;
      }
    }

    await admin
      .from(TABLE)
      .update({
        notification_status: emailsSent ? "sent" : "failed",
      })
      .eq("id", application.id);

    return NextResponse.json(
      {
        success: true,
        applicationReference: application.application_reference,
        message:
          "Thank you for your interest in partnering with THE GALLASPY. Our team will review your inquiry and contact you regarding available sponsorship opportunities.",
      },
      { status: 201 }
    );
  } catch {
    // Do not expose credentials or internal exception text.
    return NextResponse.json(
      { error: "Unable to process the sponsorship inquiry." },
      { status: 503 }
    );
  }
}
