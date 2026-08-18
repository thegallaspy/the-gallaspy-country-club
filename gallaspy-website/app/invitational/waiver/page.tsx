import type { Metadata } from "next";
import Link from "next/link";
import InvitationalNav from "@/components/invitational/InvitationalNav";

export const metadata: Metadata = {
  title: "Liability Waiver | The Gallaspy Invitational",
  description:
    "Liability Waiver and Assumption of Risk for The Gallaspy Invitational.",
};

export default function InvitationalWaiverPage() {
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
            Liability Waiver
            <span className="block text-[#FFD76A]">
              & Assumption of Risk
            </span>
          </h1>

          <div className="mt-8 h-px w-20 bg-[#B89146]" />

          <p className="mt-8 max-w-2xl text-base leading-8 text-white/70">
            Participation in a golf tournament involves inherent risks. This
            waiver explains those risks and the responsibilities accepted by
            each participant.
          </p>
        </div>
      </section>

      {/* WAIVER */}
      <section className="px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-10 border-l-2 border-[#B89146] bg-white px-6 py-5">
            <p className="text-sm leading-7 text-[#10263F]/65">
              <strong className="text-[#10263F]">Last Updated:</strong>{" "}
              August 18, 2026
            </p>
          </div>

          <div className="mb-14 rounded-[22px] bg-[#10263F] p-7 text-white sm:p-9">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#FFD76A]">
              Important Notice
            </p>

            <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
              Please read this waiver carefully before participating.
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/70">
              Participants will be required to acknowledge and accept the
              applicable waiver as part of official registration before
              participating in The Gallaspy Invitational.
            </p>
          </div>

          <div className="space-y-12">
            <WaiverSection number="01" title="Acknowledgment of Participation">
              I understand that participation in The Gallaspy Invitational is
              voluntary and involves participation in golf, use of a golf course
              and related facilities, movement throughout the property, and
              potentially the use or operation of a golf cart.

              I voluntarily choose to participate with knowledge that these
              activities may involve risks of injury, property damage, or other
              loss.
            </WaiverSection>

            <WaiverSection number="02" title="Assumption of Inherent Risks">
              I understand that risks associated with participation may include,
              without limitation, being struck by a golf ball, golf club, golf
              cart, equipment, or other object; slips, trips, and falls; uneven
              terrain; wet or slippery surfaces; natural hazards; trees, roots,
              water features, bunkers, and course conditions; weather and
              lightning; heat or cold exposure; physical exertion; collision
              with people or objects; and risks associated with golf-cart use.

              I knowingly and voluntarily assume the ordinary and inherent risks
              associated with participating in the event, to the extent permitted
              by applicable law.
            </WaiverSection>

            <WaiverSection number="03" title="Golf Cart Use">
              If I operate or ride in a golf cart, I agree to follow all
              applicable host-facility rules, posted instructions, tournament
              instructions, and reasonable safety requirements.

              I will operate any golf cart responsibly, remain aware of terrain
              and surrounding conditions, and refrain from reckless or unsafe
              conduct.
            </WaiverSection>

            <WaiverSection number="04" title="Physical Condition">
              I am responsible for determining whether I am physically able to
              participate safely in the Invitational.

              I understand that golf may involve walking, standing, swinging,
              lifting, exposure to outdoor conditions, and other physical
              activity. I am responsible for taking appropriate precautions
              based on my own condition and abilities.
            </WaiverSection>

            <WaiverSection number="05" title="Weather & Environmental Conditions">
              I understand that the event takes place outdoors and may involve
              exposure to heat, humidity, rain, wind, lightning risk, insects,
              wildlife, natural terrain, and changing course conditions.

              I agree to follow instructions issued by the host facility,
              tournament officials, or emergency personnel concerning weather,
              lightning, evacuation, shelter, suspension of play, or other
              safety matters.
            </WaiverSection>

            <WaiverSection number="06" title="Participant Conduct">
              I agree to act responsibly and in a manner that does not
              unreasonably endanger myself, other participants, spectators,
              staff, volunteers, host-facility personnel, or property.

              I understand that unsafe, disruptive, abusive, destructive, or
              materially inappropriate conduct may result in removal from the
              event without refund where permitted under the applicable
              tournament policies.
            </WaiverSection>

            <WaiverSection number="07" title="Personal Property">
              I am responsible for my own golf clubs, equipment, electronics,
              vehicle, valuables, clothing, and other personal property brought
              to the event.

              To the extent permitted by applicable law, I understand that The
              Gallaspy Development Group, LLC is not responsible for ordinary
              loss, theft, or damage to personal property that is not caused by
              conduct for which liability cannot legally be waived.
            </WaiverSection>

            <WaiverSection number="08" title="Emergency Assistance">
              If I experience an illness, injury, or medical emergency during the
              event, I authorize tournament personnel to seek or facilitate
              reasonable emergency assistance when circumstances appear to
              require it.

              I understand that the organizer does not guarantee the availability
              of any particular medical provider or level of medical service.
            </WaiverSection>

            <WaiverSection number="09" title="Release of Claims">
              To the fullest extent permitted by applicable law, I agree to
              release and hold harmless The Gallaspy Development Group, LLC and
              its members, managers, employees, volunteers, representatives, and
              event personnel from claims arising from the ordinary and inherent
              risks of voluntary participation in the Invitational.

              This provision is not intended to release any person or entity from
              liability that cannot lawfully be waived or released.
            </WaiverSection>

            <WaiverSection number="10" title="Host Facility & Other Parties">
              I understand that the host golf facility and certain vendors,
              sponsors, contractors, or service providers may maintain separate
              rules, waivers, releases, or conditions applicable to their
              facilities, equipment, services, or activities.

              Acceptance of this waiver does not replace any separate agreement
              that I may be required to accept from another party.
            </WaiverSection>

            <WaiverSection number="11" title="Compliance With Instructions">
              I agree to comply with reasonable instructions from tournament
              officials, host-course personnel, security personnel, medical
              personnel, and other authorized event representatives relating to
              safety, course operations, golf-cart use, weather, or event
              administration.
            </WaiverSection>

            <WaiverSection number="12" title="Alcohol & Impairment">
              I understand that if alcoholic beverages are available through an
              authorized provider at or in connection with the event, I am
              responsible for my own conduct and consumption.

              I agree not to operate a vehicle or golf cart while impaired and
              understand that unsafe or impaired conduct may result in removal
              from the event.
            </WaiverSection>

            <WaiverSection number="13" title="Indemnification for Participant Conduct">
              To the extent permitted by applicable law, I agree to be
              responsible for losses or damage caused by my own intentional,
              reckless, or unlawful conduct during the event.

              Nothing in this section is intended to impose obligations that are
              prohibited or unenforceable under applicable law.
            </WaiverSection>

            <WaiverSection number="14" title="Severability">
              If any provision of this waiver is determined to be invalid or
              unenforceable, the remaining provisions will continue in effect to
              the extent permitted by law.
            </WaiverSection>

            <WaiverSection number="15" title="Electronic Acceptance">
              I understand that electronic acceptance of this waiver during the
              registration process is intended to have the same effect as a
              handwritten acknowledgment to the extent permitted by applicable
              law.

              The organizer may retain a record of my acceptance, including the
              date, time, registration information, and version of the waiver
              presented.
            </WaiverSection>

            <WaiverSection number="16" title="Acknowledgment">
              By accepting this waiver, I confirm that I have had an opportunity
              to read it, understand its general purpose, voluntarily choose to
              participate, and agree to the provisions presented to me.

              I understand that this document affects legal rights and that I may
              seek independent legal advice before accepting it.
            </WaiverSection>
          </div>

          {/* RELATED POLICIES */}
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
                href="/invitational/refund-policy"
                title="Refund & Cancellation"
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
              Participant Acknowledgment
            </p>

            <h2 className="mt-4 font-serif text-3xl">
              Acceptance will occur during paid registration.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#10263F]/65">
              Joining the current priority interest list does not constitute
              acceptance of this waiver. Participants will be asked to review
              and affirmatively accept the applicable waiver when official paid
              registration opens.
            </p>
          </div>

          <p className="mt-8 text-xs leading-6 text-[#10263F]/45">
            This draft is intended for event-planning purposes. Because liability
            waivers are governed by applicable law and their enforceability can
            depend on specific wording and circumstances, final language should
            be reviewed by qualified Georgia counsel before paid registration
            opens.
          </p>
        </div>
      </section>
    </main>
  );
}

function WaiverSection({
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