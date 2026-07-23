import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 4 * 1024 * 1024;

const ALLOWED_FILE_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function getText(formData: FormData, field: string): string {
  const value = formData.get(field);

  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120);
}

export async function POST(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error("RESEND_API_KEY is missing.");

      return NextResponse.json(
        {
          error: "Email service is not configured.",
        },
        {
          status: 500,
        },
      );
    }

    const resend = new Resend(resendApiKey);

    const formData = await request.formData();

    const firstName = getText(formData, "firstName");
    const lastName = getText(formData, "lastName");
    const email = getText(formData, "email");
    const phone = getText(formData, "phone");
    const city = getText(formData, "city");
    const state = getText(formData, "state");
    const department = getText(formData, "department");
    const employmentType = getText(formData, "employmentType");
    const experience = getText(formData, "experience");
    const availability = getText(formData, "availability");
    const professionalLink = getText(formData, "professionalLink");
    const introduction = getText(formData, "introduction");
    const consent = getText(formData, "consent");

    const requiredFields = [
      firstName,
      lastName,
      email,
      phone,
      city,
      state,
      department,
      employmentType,
      experience,
      availability,
      introduction,
    ];

    if (requiredFields.some((field) => !field)) {
      return NextResponse.json(
        {
          error: "Please complete every required field.",
        },
        {
          status: 400,
        },
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email) || email.length > 254) {
      return NextResponse.json(
        {
          error: "Please enter a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    if (introduction.length > 1500) {
      return NextResponse.json(
        {
          error: "Your professional introduction is too long.",
        },
        {
          status: 400,
        },
      );
    }

    if (consent !== "true") {
      return NextResponse.json(
        {
          error: "Consent is required before submitting.",
        },
        {
          status: 400,
        },
      );
    }

    const resumeValue = formData.get("resume");

    const resume =
      resumeValue instanceof File && resumeValue.size > 0
        ? resumeValue
        : null;

    let resumeAttachment:
      | {
          filename: string;
          content: string;
        }
      | undefined;

    if (resume) {
      if (!ALLOWED_FILE_TYPES.has(resume.type)) {
        return NextResponse.json(
          {
            error: "Resume must be a PDF, DOC, or DOCX file.",
          },
          {
            status: 400,
          },
        );
      }

      if (resume.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            error: "Resume must be smaller than 4 MB.",
          },
          {
            status: 400,
          },
        );
      }

      const fileBuffer = Buffer.from(await resume.arrayBuffer());

      resumeAttachment = {
        filename: safeFilename(resume.name),
        content: fileBuffer.toString("base64"),
      };
    }

    const applicationToEmail =
      process.env.CAREERS_TO_EMAIL || "TheGallaspy@gmail.com";

    const fromEmail =
      process.env.CAREERS_FROM_EMAIL ||
      "The Gallaspy Careers <onboarding@resend.dev>";

    const applicantName = `${firstName} ${lastName}`;

    const adminEmail = await resend.emails.send({
      from: fromEmail,
      to: [applicationToEmail],
      replyTo: email,
      subject: `Future Career Interest — ${applicantName} — ${department}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#10263F;max-width:720px;margin:0 auto;">
          <div style="background:#10263F;padding:28px;border-radius:14px 14px 0 0;">
            <p style="margin:0;color:#FFD76A;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">
              The Gallaspy Future Talent Network
            </p>

            <h1 style="margin:10px 0 0;color:#ffffff;font-size:28px;font-weight:500;">
              New Career Interest Submission
            </h1>
          </div>

          <div style="border:1px solid #E5DED1;border-top:0;padding:28px;border-radius:0 0 14px 14px;background:#ffffff;">
            <h2 style="margin-top:0;font-size:22px;color:#10263F;">
              ${escapeHtml(applicantName)}
            </h2>

            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:8px 0;font-weight:700;">Email</td>
                <td style="padding:8px 0;">${escapeHtml(email)}</td>
              </tr>

              <tr>
                <td style="padding:8px 0;font-weight:700;">Phone</td>
                <td style="padding:8px 0;">${escapeHtml(phone)}</td>
              </tr>

              <tr>
                <td style="padding:8px 0;font-weight:700;">Location</td>
                <td style="padding:8px 0;">
                  ${escapeHtml(city)}, ${escapeHtml(state)}
                </td>
              </tr>

              <tr>
                <td style="padding:8px 0;font-weight:700;">
                  Area of Interest
                </td>
                <td style="padding:8px 0;">
                  ${escapeHtml(department)}
                </td>
              </tr>

              <tr>
                <td style="padding:8px 0;font-weight:700;">
                  Employment Preference
                </td>
                <td style="padding:8px 0;">
                  ${escapeHtml(employmentType)}
                </td>
              </tr>

              <tr>
                <td style="padding:8px 0;font-weight:700;">Experience</td>
                <td style="padding:8px 0;">
                  ${escapeHtml(experience)}
                </td>
              </tr>

              <tr>
                <td style="padding:8px 0;font-weight:700;">Availability</td>
                <td style="padding:8px 0;">
                  ${escapeHtml(availability)}
                </td>
              </tr>

              <tr>
                <td style="padding:8px 0;font-weight:700;">
                  LinkedIn / Portfolio
                </td>
                <td style="padding:8px 0;">
                  ${
                    professionalLink
                      ? escapeHtml(professionalLink)
                      : "Not provided"
                  }
                </td>
              </tr>

              <tr>
                <td style="padding:8px 0;font-weight:700;">Resume</td>
                <td style="padding:8px 0;">
                  ${
                    resumeAttachment
                      ? "Included as an email attachment"
                      : "Not provided"
                  }
                </td>
              </tr>
            </table>

            <div style="margin-top:24px;padding:20px;background:#F7F4EE;border-radius:12px;">
              <p style="margin:0 0 8px;font-weight:700;">
                Professional Introduction
              </p>

              <p style="margin:0;white-space:pre-wrap;">
                ${escapeHtml(introduction)}
              </p>
            </div>

            <p style="margin:24px 0 0;color:#667085;font-size:12px;">
              The applicant confirmed that this submission is an expression
              of future career interest and not an application for an active
              opening.
            </p>
          </div>
        </div>
      `,
      attachments: resumeAttachment ? [resumeAttachment] : undefined,
    });

    if (adminEmail.error) {
      console.error(
        "Career application email error:",
        adminEmail.error,
      );

      return NextResponse.json(
        {
          error:
            "We could not submit your information. Please try again.",
        },
        {
          status: 500,
        },
      );
    }

    const confirmationEmail = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: "Your Career Interest Was Received | The Gallaspy",
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.7;color:#10263F;max-width:640px;margin:0 auto;">
          <div style="background:#10263F;padding:30px;border-radius:14px 14px 0 0;text-align:center;">
            <p style="margin:0;color:#FFD76A;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">
              The Gallaspy
            </p>

            <h1 style="margin:12px 0 0;color:#ffffff;font-size:28px;font-weight:500;">
              Thank You, ${escapeHtml(firstName)}
            </h1>
          </div>

          <div style="border:1px solid #E5DED1;border-top:0;padding:30px;border-radius:0 0 14px 14px;background:#ffffff;">
            <p>
              We received your submission to The Gallaspy Future Talent
              Network for
              <strong>${escapeHtml(department)}</strong>.
            </p>

            <p>
              The Gallaspy Golf &amp; Country Club is currently in
              development. As formal employment opportunities become
              available, submitted professional information may be reviewed
              against future staffing needs.
            </p>

            <p>
              This confirmation does not represent an interview invitation,
              active job application, or offer of employment.
            </p>

            <p style="margin-bottom:0;">
              Sincerely,<br />
              <strong>The Gallaspy Development Group</strong>
            </p>
          </div>
        </div>
      `,
    });

    if (confirmationEmail.error) {
      console.error(
        "Applicant confirmation email error:",
        confirmationEmail.error,
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you. Your professional information has been submitted to The Gallaspy Future Talent Network.",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Career application route error:", error);

    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while submitting your information.",
      },
      {
        status: 500,
      },
    );
  }
}