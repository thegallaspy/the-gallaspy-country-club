import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | The Gallaspy Golf Club",
  description:
    "Privacy information for The Gallaspy Golf Club website and digital services.",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>

        <p style={{ color: "#526473" }}>
          Effective date: November 12, 2026
        </p>

        <p>
          The Gallaspy Golf Club operates under The Gallaspy
          Development Group, LLC. This policy describes how
          information may be collected, used, and disclosed
          through our website, mobile application, events,
          and related digital services.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          Depending on the services you use, information may
          include your name, email address, contact details,
          account information, event registrations,
          membership information, purchase information,
          and communications with the club.
        </p>
        <p>
          Golf-related services may also process information
          that you choose to submit, including scores,
          rounds, profile details, and community content.
        </p>

        <h2>2. How Information Is Used</h2>
        <p>
          Information may be used to operate the website
          and application, manage accounts, respond to
          inquiries, support registrations and purchases,
          provide golf-related features, maintain records,
          improve services, and protect against misuse.
        </p>

        <h2>3. Payments</h2>
        <p>
          Where payment services are available, transactions
          may be handled by third-party payment processors.
          Information required to process payments may be
          shared with those providers. Their handling of
          payment information is subject to their own
          privacy practices.
        </p>

        <h2>4. Service Providers</h2>
        <p>
          We may use third-party providers for website
          hosting, authentication, infrastructure, payment
          processing, communication, and other operational
          services. Information may be disclosed to those
          providers as necessary to deliver their services.
        </p>

        <h2>5. Community Features</h2>
        <p>
          Content submitted to public or shared community
          features may be visible to other users depending
          on the feature and its privacy settings. Users
          should avoid posting sensitive personal
          information in public areas.
        </p>

        <h2>6. Cookies and Technical Information</h2>
        <p>
          Our digital services may use cookies, local
          storage, or similar technologies to support
          authentication, preferences, security, and
          website functionality. Technical information
          may include browser, device, and usage details.
        </p>

        <h2>7. Data Retention and Security</h2>
        <p>
          Information may be retained as reasonably
          necessary for operating services, maintaining
          records, resolving disputes, and meeting legal
          obligations. We seek to use appropriate security
          measures, but no internet-based system can
          guarantee absolute security.
        </p>

        <h2>8. Your Requests</h2>
        <p>
          You may contact us with questions about your
          personal information, or to request access,
          correction, or deletion where applicable.
          Certain information may need to be retained
          for legitimate operational or legal purposes.
        </p>

        <h2>9. Children's Privacy</h2>
        <p>
          Our club membership and organized adult
          participation are intended for individuals
          aged 18 and older. Additional requirements
          may apply to other digital features.
        </p>

        <h2>10. Policy Updates</h2>
        <p>
          This policy may be updated as the club's
          services and practices develop. Material
          changes will be reflected in the published
          policy as appropriate.
        </p>

        <h2>11. Contact</h2>
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
