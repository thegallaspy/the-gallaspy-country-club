import type { Metadata } from "next";
import Link from "next/link";
import InvitationalNav from "@/components/invitational/InvitationalNav";

export const metadata: Metadata = {
  title: "Participant Terms & Conditions | The Gallaspy Invitational",
  description:
    "Participant Terms & Conditions for The Gallaspy Invitational.",
};

export default function InvitationalTermsPage() {
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
            Participant Terms
            <span className="block text-[#FFD76A]">& Conditions</span>
          </h1>

          <div className="mt-8 h-px w-20 bg-[#B89146]" />

          <p className="mt-8 max-w-2xl text-base leading-8 text-white/70">
            These terms establish the conditions governing registration and
            participation in the 2027 Gallaspy Invitational.
          </p>
        </div>
      </section>

      {/* TERMS */}
      <section className="px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-10 border-l-2 border-[#B89146] bg-white px-6 py-5">
            <p className="text-sm leading-7 text-[#10263F]/65">
              <strong className="text-[#10263F]">Last Updated:</strong>{" "}
              August 18, 2026
            </p>
          </div>

          <div className="space-y-12">
            <TermSection number="01" title="Agreement to Terms">
              By completing a paid registration for The Gallaspy Invitational,
              the participant acknowledges that they have reviewed and agreed to
              these Participant Terms & Conditions, together with any applicable
              tournament rules, refund and cancellation policy, liability waiver,
              and other policies presented during registration.
            </TermSection>

            <TermSection number="02" title="Event Organizer">
              The Gallaspy Invitational is organized by The Gallaspy Development
              Group, LLC. References to “The Gallaspy,” “the Invitational,” “we,”
              “us,” or “the organizer” in these terms refer to The Gallaspy
              Development Group, LLC as applicable to the administration of the
              event.
            </TermSection>

            <TermSection number="03" title="Registration">
              Submission of an interest form or placement on a priority list does
              not constitute paid registration and does not guarantee a position
              in the tournament. A tournament position is secured only after
              official registration has opened, all required registration
              information has been submitted, payment has been successfully
              completed, and the registration has been accepted by the organizer.
            </TermSection>

            <TermSection number="04" title="Field & Tournament Format">
              The inaugural Gallaspy Invitational is planned as a 4-person
              scramble with a field of up to 100 players. The organizer reserves
              the right to adjust the field size, groupings, starting assignments,
              tournament procedures, or other operational details when reasonably
              necessary for the administration of the event.
            </TermSection>

            <TermSection number="05" title="Registration Fees">
              Registration fees and the benefits included with registration will
              be displayed when official paid registration opens. Participants
              are responsible for providing accurate registration and payment
              information. A registration is not considered complete until the
              applicable payment has been successfully processed.
            </TermSection>

            <TermSection number="06" title="Cancellation & Refund Policy">
              Registration cancellations submitted on or before April 22, 2027
              are eligible for a refund of the applicable registration fee in
              accordance with the official Refund & Cancellation Policy.
              Beginning April 23, 2027, registration fees are non-refundable,
              except where otherwise expressly stated in the official policy.
            </TermSection>

            <TermSection number="07" title="Player Substitutions">
              When a registered participant is unable to attend after the refund
              deadline, the organizer may permit an eligible substitute player
              to assume that participant&apos;s position. Substitutions must be
              requested and approved in accordance with the tournament&apos;s
              published substitution procedures and deadlines. Registrations may
              not be resold or transferred for profit.
            </TermSection>

            <TermSection number="08" title="No-Shows">
              Participants who fail to attend the event without completing an
              approved cancellation or substitution are considered no-shows.
              No-shows are not entitled to a refund, credit, or transfer unless
              otherwise determined by the organizer.
            </TermSection>

            <TermSection number="09" title="Weather, Delay & Rescheduling">
              Golf events may be affected by weather, course conditions, safety
              considerations, or circumstances outside the organizer&apos;s
              reasonable control. The organizer and host facility may delay,
              modify, shorten, suspend, postpone, or reschedule tournament
              activities when reasonably necessary.

              If the Invitational is rescheduled, registrations will ordinarily
              transfer to the rescheduled date subject to the official Refund &
              Cancellation Policy and any applicable host-facility requirements.
            </TermSection>

            <TermSection number="10" title="Event Cancellation">
              If The Gallaspy Invitational is cancelled by the organizer and is
              not rescheduled, registered participants will be notified regarding
              the applicable refund or other remedy in accordance with the
              official Refund & Cancellation Policy. Any refund obligations may
              be subject to amounts actually refundable to the organizer by
              third-party vendors where permitted by applicable law and clearly
              disclosed.
            </TermSection>

            <TermSection number="11" title="Tournament Rules & Conduct">
              Participants must comply with the official tournament rules,
              instructions of tournament officials, applicable host-course rules,
              golf-cart rules, safety requirements, and standards of appropriate
              conduct.

              The organizer may remove or disqualify a participant for conduct
              that is unsafe, disruptive, abusive, dishonest, destructive, or
              materially inconsistent with tournament or host-facility rules.
            </TermSection>

            <TermSection number="12" title="Eligibility & Prizes">
              Eligibility requirements and the terms governing prizes, contests,
              awards, and any announced prize purse will be established in the
              Official Tournament Rules and Prize & Awards Policy.

              Participants are responsible for determining whether accepting a
              particular prize could affect their eligibility or status under
              rules applicable to them. Prize eligibility may be subject to
              verification before an award is issued.
            </TermSection>

            <TermSection number="13" title="Liability Waiver">
              Participation in the Invitational is subject to the event&apos;s
              Liability Waiver and Assumption of Risk. Participants will be
              required to acknowledge the applicable waiver as part of official
              paid registration before participating in the event.
            </TermSection>

            <TermSection number="14" title="Photography & Media">
              The event may be photographed, filmed, or otherwise recorded.
              Applicable permissions regarding the organizer&apos;s use of a
              participant&apos;s image, likeness, or recorded appearance will be
              presented as part of the registration process and/or event media
              policy.
            </TermSection>

            <TermSection number="15" title="Personal Property">
              Participants are responsible for their golf equipment, vehicles,
              electronics, valuables, and other personal property brought to the
              event. Participants should follow all host-facility procedures
              regarding storage, parking, golf bags, and personal belongings.
            </TermSection>

            <TermSection number="16" title="Event Changes">
              Tournament details may change as planning is finalized. The
              organizer may make reasonable changes to schedules, starting
              assignments, contests, amenities, participant benefits, event
              programming, and operational procedures.

              Material changes affecting registered participants will be
              communicated using the contact information provided during
              registration when reasonably practicable.
            </TermSection>

            <TermSection number="17" title="Accuracy of Information">
              Participants are responsible for providing accurate names, contact
              information, team information, apparel sizing, and other requested
              information. The organizer is not responsible for errors resulting
              from inaccurate information submitted by a participant.
            </TermSection>

            <TermSection number="18" title="Electronic Communications">
              By registering, participants consent to receive transactional
              communications reasonably necessary to administer their
              registration and participation, including confirmations, event
              updates, schedule information, safety notices, and material changes
              affecting the Invitational.
            </TermSection>

            <TermSection number="19" title="Policy Updates">
              These terms may be updated as tournament details are finalized.
              Material changes applicable to an existing paid registration will
              be handled and communicated in accordance with applicable law and
              the terms presented to the participant at the time of registration.
            </TermSection>

            <TermSection number="20" title="Contact">
              Questions regarding registration or these Participant Terms &
              Conditions may be directed to:
              <span className="mt-4 block font-semibold text-[#10263F]">
                The Gallaspy Development Group, LLC
              </span>
              <span className="block">The Gallaspy Invitational</span>
              <span className="block">info@thegallaspy.com</span>
            </TermSection>
          </div>

          {/* RELATED POLICIES */}
          <div className="mt-16 border-t border-[#10263F]/10 pt-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#8B6A34]">
              Related Tournament Policies
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <PolicyLink
                href="/invitational/refund-policy"
                title="Refund & Cancellation Policy"
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

          <div className="mt-14 rounded-[22px] bg-[#10263F] p-7 text-white sm:p-9">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#FFD76A]">
              Registration
            </p>

            <h2 className="mt-4 font-serif text-3xl">
              Interested in playing?
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/65">
              Official paid registration has not opened yet. Join the priority
              list to receive tournament registration announcements and updates.
            </p>

            <Link
              href="/invitational/register"
              className="mt-7 inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#FFD76A] px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#10263F] transition hover:bg-white"
            >
              Join the Priority List
            </Link>
          </div>

          <p className="mt-8 text-xs leading-6 text-[#10263F]/45">
            These terms are provided for tournament administration and are not a
            substitute for legal advice. Final event documents should be reviewed
            for compliance with applicable law before paid registration opens.
          </p>
        </div>
      </section>
    </main>
  );
}

function TermSection({
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

        <div>
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