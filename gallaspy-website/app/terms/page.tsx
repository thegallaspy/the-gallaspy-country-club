import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | The Gallaspy Golf Club",
  description:
    "Website and digital-service terms for The Gallaspy Golf Club.",
};

export default function TermsPage() {
  return (
    <main style={{ background: "#fff", color: "#10263F" }}>
      <article style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "90px 24px 110px",
        lineHeight: 1.85,
      }}>
        <p style={{
          color: "#164B3A",
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: 3,
        }}>
          THE GALLASPY GOLF CLUB
        </p>

        <h1 style={{
          fontSize: "clamp(38px, 6vw, 68px)",
          lineHeight: 1.05,
          margin: "20px 0",
        }}>
          Terms of Service
        </h1>

        <p style={{ color: "#526473" }}>
          Effective date: November 12, 2026
        </p>

        <p>
          These terms concern access to the website and
          digital services of The Gallaspy Golf Club,
          operated by The Gallaspy Development Group, LLC.
        </p>

        <h2>1. Website and Services</h2>
        <p>
          The Gallaspy Golf Club provides information
          about golf activities, competitions, events,
          community opportunities, merchandise, and
          related services. Availability and features
          may change over time.
        </p>

        <h2>2. Accounts and Membership</h2>
        <p>
          Creating a My Gallaspy account does not
          automatically establish paid club membership.
          A website or application account and an
          official club membership are separate.
        </p>
        <p>
          Where membership enrollment becomes available,
          additional membership agreements, pricing,
          renewal terms, and eligibility conditions
          may apply. Enrollment and payment functionality
          may be temporarily unavailable.
        </p>

        <h2>3. Appropriate Use</h2>
        <p>
          Users must not misuse the website, attempt
          unauthorized access, interfere with other
          users, impersonate others, submit fraudulent
          information, or use the services unlawfully.
        </p>

        <h2>4. Events and Golf Activities</h2>
        <p>
          Event registrations, competition eligibility,
          schedules, participation requirements, and
          entry fees may be subject to event-specific
          conditions. Participation does not guarantee
          entry into limited-capacity activities.
        </p>
        <p>
          The club does not represent that it currently
          owns or operates a golf course. Course access
          and green fees may be administered separately
          by participating facilities.
        </p>

        <h2>5. Merchandise and Purchases</h2>
        <p>
          Merchandise availability, product details,
          prices, taxes, shipping, fulfillment, and
          applicable return conditions may vary.
          Additional terms may be presented during
          checkout.
        </p>

        <h2>6. User Content</h2>
        <p>
          Users are responsible for the content they
          submit. Content must not violate applicable
          law or the rights of others. The club may
          moderate or remove material that violates
          applicable community standards or service
          requirements.
        </p>

        <h2>7. Intellectual Property</h2>
        <p>
          The Gallaspy name, event identities, artwork,
          logos, designs, and other club branding may be
          protected by applicable intellectual property
          laws. Use of club branding for commercial
          purposes requires appropriate authorization.
        </p>

        <h2>8. Third-Party Services</h2>
        <p>
          Some features may connect to external services,
          including payment providers, authentication
          platforms, and golf facilities. Those services
          may operate under separate terms and policies.
        </p>

        <h2>9. Service Availability</h2>
        <p>
          Digital services may experience interruptions,
          maintenance, or changes. The club may suspend
          access as reasonably necessary to protect
          users, maintain operations, or address misuse.
        </p>

        <h2>10. Additional Agreements</h2>
        <p>
          These general website terms do not replace
          a separate membership agreement, competition
          waiver, event registration agreement, purchase
          conditions, or other specific agreement
          presented for acceptance.
        </p>

        <h2>11. Changes to These Terms</h2>
        <p>
          These terms may be updated as the website,
          application, and club offerings develop.
          Updated terms will be published with an
          appropriate effective date.
        </p>

        <h2>12. Contact</h2>
        <p>
          The Gallaspy Development Group, LLC
          <br />
          Operating The Gallaspy Golf Club
          <br />
          Georgia, United States
          <br />
          <a href="mailto:info@thegallaspy.com">
            info@thegallaspy.com
          </a>
        </p>

        <hr style={{
          margin: "50px 0",
          border: 0,
          borderTop: "1px solid #D8E0E3",
        }} />

        <Link href="/" style={{
          color: "#164B3A",
          fontWeight: 800,
        }}>
          RETURN TO THE GALLASPY
        </Link>
      </article>
    </main>
  );
}
