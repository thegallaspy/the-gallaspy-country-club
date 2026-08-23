import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY");

      return NextResponse.json(
        {
          error: "Email service is not configured.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const body = await request.json();

    const {
      companyName,
      contactName,
      email,
      phone,
      website,
      sponsorshipInterest,
      message,
    } = body;

    // Required fields
    if (
      !companyName ||
      !contactName ||
      !email ||
      !phone ||
      !sponsorshipInterest
    ) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    // Email #1 — Internal notification
    const internalEmail = resend.emails.send({
      from: "The Gallaspy Invitational <invitational@thegallaspy.com>",
      to: ["info@thegallaspy.com"],
      replyTo: email,
      subject: `New Invitational Sponsor Inquiry — ${companyName}`,
      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            color: #10263F;
            line-height: 1.7;
            max-width: 680px;
            margin: 0 auto;
          "
        >
          <div
            style="
              border-bottom: 3px solid #B89146;
              padding-bottom: 20px;
            "
          >
            <p
              style="
                font-size: 11px;
                letter-spacing: 2px;
                text-transform: uppercase;
                color: #B89146;
                margin: 0;
              "
            >
              The Gallaspy Invitational
            </p>

            <h1 style="font-size: 28px; margin: 8px 0 0;">
              New Sponsor Inquiry
            </h1>
          </div>

          <p style="margin-top: 28px;">
            A company has submitted a sponsorship inquiry for the
            2027 Gallaspy Invitational.
          </p>

          <table
            style="
              width: 100%;
              border-collapse: collapse;
              margin-top: 24px;
            "
          >
            <tbody>
              <tr>
                <td style="padding: 10px 0;">
                  <strong>Company</strong>
                </td>
                <td style="padding: 10px 0;">
                  ${companyName}
                </td>
              </tr>

              <tr>
                <td style="padding: 10px 0;">
                  <strong>Contact</strong>
                </td>
                <td style="padding: 10px 0;">
                  ${contactName}
                </td>
              </tr>

              <tr>
                <td style="padding: 10px 0;">
                  <strong>Email</strong>
                </td>
                <td style="padding: 10px 0;">
                  ${email}
                </td>
              </tr>

              <tr>
                <td style="padding: 10px 0;">
                  <strong>Phone</strong>
                </td>
                <td style="padding: 10px 0;">
                  ${phone}
                </td>
              </tr>

              <tr>
                <td style="padding: 10px 0;">
                  <strong>Website</strong>
                </td>
                <td style="padding: 10px 0;">
                  ${website || "Not provided"}
                </td>
              </tr>

              <tr>
                <td style="padding: 10px 0;">
                  <strong>Sponsorship Interest</strong>
                </td>
                <td style="padding: 10px 0;">
                  ${sponsorshipInterest}
                </td>
              </tr>
            </tbody>
          </table>

          <div style="margin-top: 24px;">
            <strong>Message / Partnership Notes</strong>

            <p>
              ${message || "No additional information provided."}
            </p>
          </div>

          <div
            style="
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #E3DDD1;
              font-size: 12px;
              color: #667085;
            "
          >
            Submitted through The Gallaspy Invitational sponsorship page.
          </div>
        </div>
      `,
    });

    // Email #2 — Confirmation to prospective sponsor
    const sponsorConfirmation = resend.emails.send({
      from: "The Gallaspy Invitational <invitational@thegallaspy.com>",
      to: [email],
      replyTo: "info@thegallaspy.com",
      subject: "The Gallaspy Invitational — Sponsorship Inquiry Received",
      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            color: #10263F;
            line-height: 1.8;
            max-width: 640px;
            margin: 0 auto;
            padding: 30px 20px;
          "
        >
          <div
            style="
              border-bottom: 3px solid #B89146;
              padding-bottom: 22px;
            "
          >
            <p
              style="
                font-size: 11px;
                letter-spacing: 3px;
                text-transform: uppercase;
                color: #B89146;
                margin: 0;
              "
            >
              The Gallaspy Invitational
            </p>

            <h1
              style="
                font-size: 32px;
                line-height: 1.2;
                margin: 10px 0 0;
              "
            >
              Partnership begins with a conversation.
            </h1>
          </div>

          <p style="margin-top: 30px;">
            Hello ${contactName},
          </p>

          <p>
            Thank you for your interest in partnering with the
            <strong>2027 Gallaspy Invitational.</strong>
          </p>

          <p>
            We have received the sponsorship inquiry from
            <strong>${companyName}</strong> and appreciate your interest
            in becoming part of the inaugural tournament.
          </p>

          <p>
            Our team will review the information you submitted and follow
            up regarding relevant sponsorship opportunities, tournament
            activations, and partnership possibilities.
          </p>

          <div
            style="
              margin: 30px 0;
              padding: 24px;
              background: #F7F4EE;
              border-left: 3px solid #B89146;
            "
          >
            <p style="margin: 0 0 8px;">
              <strong>2027 Gallaspy Invitational</strong>
            </p>

            <p style="margin: 0;">
              Inaugural Tournament<br />
              100-Player Field<br />
              4-Person Scramble<br />
              $10,000 Tournament Purse<br />
              The Golden Falcon Championship Trophy
            </p>
          </div>

          <p>
            We look forward to exploring how your organization can become
            part of the experience.
          </p>

          <div
            style="
              margin-top: 36px;
              padding-top: 24px;
              border-top: 1px solid #E3DDD1;
            "
          >
            <p style="margin: 0;">
              <strong>The Gallaspy Invitational</strong><br />
              The Gallaspy Development Group
            </p>

            <p
              style="
                font-size: 13px;
                color: #667085;
                margin-top: 8px;
              "
            >
              thegallaspy.com
            </p>
          </div>
        </div>
      `,
    });

    const [internalResult, sponsorResult] = await Promise.all([
      internalEmail,
      sponsorConfirmation,
    ]);

    if (internalResult.error || sponsorResult.error) {
      console.error("Sponsor email error:", {
        internal: internalResult.error,
        sponsor: sponsorResult.error,
      });

      return NextResponse.json(
        {
          error: "Unable to send sponsorship inquiry. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Sponsorship inquiry received.",
      internalEmailId: internalResult.data?.id,
      sponsorEmailId: sponsorResult.data?.id,
    });
  } catch (error) {
    console.error("Invitational sponsor inquiry error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}