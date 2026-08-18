import type { Metadata } from "next";
import Link from "next/link";
import InvitationalNav from "@/components/invitational/InvitationalNav";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | The Gallaspy Invitational",
  description:
    "Refund and cancellation policy for The Gallaspy Invitational.",
};

export default function InvitationalRefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E6] text-[#10263F]">
      <InvitationalNav />

      {/* HERO */}
      <section className="bg-[#10263F] px-6 pb-20 pt-32 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1100px]">
          <Link
            href="/invitational"
            className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60 transition hover:text-[#FFD76A]"
          >
            ← Back to Invitational
          </Link>

          <p className="mt-12 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#FFD76A]">
            The Gallaspy Invitational
          </p>

          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
            Refund &
            <span className="block text-[#FFD76A]">
              Cancellation Policy
            </span>
          </h1>

          <div className="mt-8 h-px w-20 bg-[#B89146]" />

          <p className="mt-8 max-w-2xl text-base leading-8 text-white/70">
            This policy explains participant cancellation deadlines,
            refunds, substitutions, rescheduling, and event cancellation.
          </p>
        </div>
      </section>

      {/* POLICY */}
      <section className="px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-10 border-l-2 border-[#B89146] bg-white px-6 py-5">
            <p className="text-sm leading-7 text-[#10263F]/65">
              <strong className="text-[#10263F]">Last Updated:</strong>{" "}
              August 18, 2026
            </p>
          </div>

          {/* SUMMARY */}
          <div className="mb-14 rounded-[22px] bg-[#10263F] p-7 text-white sm:p-9">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#FFD76A]">
              Policy Summary
            </p>

            <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
              Full refunds through April 22, 2027.
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/70">
              Beginning April 23, 2027, player registration fees become
              non-refundable, subject to the limited exceptions stated in
              this policy.
            </p>
          </div>

          <div className="space-y-12">
            <PolicySection number="01" title="Scope of Policy">
              This Refund & Cancellation Policy applies to paid player
              registrations for the 2027 Gallaspy Invitational administered by
              The Gallaspy Development Group, LLC.

              Sponsorships, vendor payments, merchandise purchases, and other
              transactions may be governed by separate agreements or policies.
            </PolicySection>

            <PolicySection number="02" title="Refund Deadline">
              A participant who cancels their paid registration on or before
              April 22, 2027 may request a refund of the applicable registration
              fee.

              Refund requests must be submitted through the official contact
              method provided by The Gallaspy Invitational and must include
              sufficient information to identify the registration.
            </PolicySection>

            <PolicySection number="03" title="No Refunds Beginning April 23">
              Beginning April 23, 2027, player registration fees are
              non-refundable except where otherwise expressly stated in this
              policy or required by applicable law.

              This includes cancellations resulting from scheduling conflicts,
              travel changes, illness, work obligations, personal circumstances,
              failure to attend, or other participant-initiated reasons.
            </PolicySection>

            <PolicySection number="04" title="Player Substitutions">
              After the refund deadline, a registered participant who cannot
              attend may request to transfer their tournament position to an
              eligible substitute player.

              All substitutions are subject to organizer approval, tournament
              eligibility requirements, submission of required participant
              information, and any published substitution deadline.

              Registrations may not be resold or transferred for profit.
            </PolicySection>

            <PolicySection number="05" title="No-Shows">
              Participants who fail to attend the Invitational without completing
              an approved cancellation or player substitution will be treated as
              no-shows.

              No-shows are not eligible for a refund, credit, transfer, or future
              event credit unless otherwise determined by the organizer.
            </PolicySection>

            <PolicySection number="06" title="Processing of Approved Refunds">
              Approved refunds will ordinarily be returned to the original method
              of payment.

              Processing times may vary depending on the payment processor,
              financial institution, and payment method used for the original
              transaction.

              Unless otherwise stated at checkout, refunds apply to the
              registration amount eligible for refund under this policy.
            </PolicySection>

            <PolicySection number="07" title="Weather & Course Conditions">
              Golf events are subject to weather, course conditions, lightning,
              storms, extreme temperatures, and other circumstances that may
              affect play.

              Weather conditions that delay, suspend, shorten, or modify play do
              not automatically create a right to a participant refund.

              Decisions concerning whether play can safely continue may be made
              by the host facility, tournament officials, or other appropriate
              personnel.
            </PolicySection>

            <PolicySection number="08" title="Event Postponement or Rescheduling">
              If the Invitational is postponed or rescheduled, paid registrations
              will ordinarily transfer to the rescheduled event date.

              The organizer will communicate the applicable procedures to
              registered participants following a postponement or rescheduling.

              Any additional refund rights associated with a rescheduled event
              will be determined based on the circumstances, applicable
              agreements, and applicable law.
            </PolicySection>

            <PolicySection number="09" title="Organizer Cancellation">
              If The Gallaspy Development Group, LLC cancels the Invitational and
              the event is not rescheduled, registered participants will be
              notified regarding the applicable refund or other remedy.

              The organizer will administer cancellation-related refunds in
              accordance with applicable law, contractual obligations, and the
              circumstances giving rise to the cancellation.
            </PolicySection>

            <PolicySection number="10" title="Third-Party Costs">
              Certain event costs may be paid to third parties in advance,
              including host-facility expenses, food and beverage commitments,
              merchandise, equipment, insurance, and event-production expenses.

              Nothing in this section eliminates any refund right that cannot
              legally be waived. Any non-refundable component of a participant
              transaction will be clearly disclosed before payment where
              applicable.
            </PolicySection>

            <PolicySection number="11" title="Chargebacks & Payment Disputes">
              Participants are encouraged to contact The Gallaspy Invitational
              before initiating a payment dispute so that registration,
              cancellation, or refund concerns can be reviewed.

              Filing a payment dispute does not alter the terms of this policy or
              create an independent right to a refund.
            </PolicySection>

            <PolicySection number="12" title="Tournament Changes">
              Reasonable changes to tee assignments, starting procedures,
              contests, schedules, amenities, player benefits, food service,
              tournament programming, or other event details do not automatically
              create a right to a refund.

              Material changes will be communicated to registered participants
              when reasonably practicable.
            </PolicySection>

            <PolicySection number="13" title="How to Request a Refund or Substitution">
              Refund and substitution requests should be submitted to:

              <span className="mt-4 block font-semibold text-[#10263F]">
                The Gallaspy Development Group, LLC
              </span>
              <span className="block">The Gallaspy Invitational</span>
              <span className="block">info@thegallaspy.com</span>

              Requests should include the registered participant&apos;s full name,
              email address, and sufficient information to identify the
              registration.
            </PolicySection>

            <PolicySection number="14" title="Policy Acceptance">
              By completing paid registration, the participant acknowledges that
              they have reviewed and accepted the Refund & Cancellation Policy
              presented at the time of registration.

              The version of the policy accepted at checkout will govern the
              applicable registration to the extent required by law.
            </PolicySection>
          </div>

          {/* RELATED */}
          <div className="mt-16 border-t border-[#10263F]/10 pt-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#8B6A34]">
              Related Tournament Policies
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <PolicyLink
                href="/invitational/terms"
                title="Participant Terms"
              />
              <PolicyLink
                href="/invitational/waiver"
                title="Liability Waiver"
              />
              <PolicyLink
                href="/invitational/rules"
                title="Official Tournament Rules"
              />
              <PolicyLink
                href="/invitational/prizes"
                title="Prizes & Awards"
              />
            </div>
          </div>

          <div className="mt-14 rounded-[22px] border border-[#10263F]/10 bg-white p-7 sm:p-9">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#8B6A34]">
              Questions?
            </p>

            <h2 className="mt-4 font-serif text-3xl">
              Contact The Gallaspy Invitational.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#10263F]/65">
              For questions about registration cancellations, substitutions, or
              this policy, contact{" "}
              <a
                href="mailto:info@thegallaspy.com"
                className="font-semibold text-[#8B6A34] underline underline-offset-4"
              >
                info@thegallaspy.com
              </a>
              .
            </p>
          </div>

          <p className="mt-8 text-xs leading-6 text-[#10263F]/45">
            This policy is provided for event administration and should be
            reviewed for compliance with applicable law before paid registration
            opens.
          </p>
        </div>
      </section>
    </main>
  );
}

function PolicySection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-[#10263F]/10 pb-10">
      <div className="flex gap-5 sm:gap-7">
        <span className="pt-1 text-[10px] font-semibold tracking-[0.2em] text-[#B89146]">
          {number}
        </span>

        <div className="min-w-0">
          <h2 className="font-serif text-2xl sm:text-3xl">{title}</h2>

          <div className="mt-4 whitespace-pre-line text-sm leading-7 text-[#10263F]/65">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function PolicyLink({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  return (
    <Link
      href={href}
      className="flex min-h-[68px] items-center justify-between rounded-xl border border-[#10263F]/10 bg-white px-5 transition hover:border-[#B89146]"
    >
      <span className="font-serif text-lg">{title}</span>
      <span className="text-[#B89146]">→</span>
    </Link>
  );
}