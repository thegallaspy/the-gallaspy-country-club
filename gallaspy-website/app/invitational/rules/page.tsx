import type { Metadata } from "next";
import Link from "next/link";
import InvitationalNav from "@/components/invitational/InvitationalNav";

export const metadata: Metadata = {
  title: "Official Tournament Rules | The Gallaspy Invitational",
  description:
    "Official tournament rules for the 2027 Gallaspy Invitational.",
};

export default function InvitationalRulesPage() {
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
            Official Tournament
            <span className="block text-[#FFD76A]">Rules</span>
          </h1>

          <div className="mt-8 h-px w-20 bg-[#B89146]" />

          <p className="mt-8 max-w-2xl text-base leading-8 text-white/70">
            These rules establish the general format, scoring procedures,
            participant responsibilities, and standards of conduct for the
            inaugural Gallaspy Invitational.
          </p>
        </div>
      </section>

      {/* RULES */}
      <section className="px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-10 border-l-2 border-[#B89146] bg-white px-6 py-5">
            <p className="text-sm leading-7 text-[#10263F]/65">
              <strong className="text-[#10263F]">Last Updated:</strong>{" "}
              August 18, 2026
            </p>
          </div>

          {/* EVENT SUMMARY */}
          <div className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryCard label="Format" value="4-Person Scramble" />
            <SummaryCard label="Field" value="Up to 100 Players" />
            <SummaryCard label="Start" value="11:00 AM" />
            <SummaryCard label="Competition" value="18 Holes" />
          </div>

          <div className="space-y-12">
            <RuleSection number="01" title="Tournament Format">
              The Gallaspy Invitational is planned as an 18-hole, 4-person team
              scramble.

              Each player on the team plays a shot from the designated starting
              position. The team selects the preferred shot, and all team members
              then play their next shot from that location. This process
              continues until the ball is holed.

              Tournament officials may issue additional playing instructions
              before the start of competition.
            </RuleSection>

            <RuleSection number="02" title="Teams">
              Teams are generally composed of four registered players.

              Individual players or incomplete groups may be paired with other
              participants at the organizer&apos;s discretion when necessary to
              create complete teams.

              Team assignments and pairings are subject to final tournament
              administration.
            </RuleSection>

            <RuleSection number="03" title="Starting Procedure">
              The Invitational is planned for an 11:00 AM start.

              The final starting format, hole assignments, check-in time, player
              briefing, practice availability, and other day-of-event procedures
              will be communicated to registered participants before the event.

              Participants are responsible for arriving by the published
              check-in deadline.
            </RuleSection>

            <RuleSection number="04" title="Playing From the Selected Ball">
              After the team selects a shot, each player must play from the
              designated area permitted under the tournament&apos;s scramble
              procedures.

              The organizer may establish specific procedures for placement of
              balls through the green, in hazards or penalty areas, in bunkers,
              and on putting greens.

              Final placement instructions will be included in the player rules
              provided on tournament day.
            </RuleSection>

            <RuleSection number="05" title="Putting">
              Once the selected ball is on the putting green, each team member
              may attempt the putt in accordance with the scramble format.

              The team&apos;s hole is complete when a valid putt is holed or when
              another completion procedure expressly authorized by tournament
              officials applies.
            </RuleSection>

            <RuleSection number="06" title="Scorekeeping">
              Each team is responsible for accurately recording its score for
              every hole.

              Scorecards must be completed according to tournament instructions
              and submitted to the designated scoring area or official system
              within the required time.

              A team may be asked to verify or attest its score before results
              become official.
            </RuleSection>

            <RuleSection number="07" title="Scoring">
              Unless otherwise announced before competition, the team&apos;s
              gross scramble score for 18 holes will determine its tournament
              standing.

              The lowest valid score will rank first, subject to any tie-breaking
              procedure, eligibility requirement, or adjustment expressly
              established in the final tournament rules.
            </RuleSection>

            <RuleSection number="08" title="Handicaps">
              The tournament is presently structured as a scramble competition
              without a published handicap adjustment.

              If a handicap system or net-scoring component is later adopted,
              the applicable methodology and eligibility requirements will be
              disclosed to registered participants before competition.
            </RuleSection>

            <RuleSection number="09" title="Ties">
              If two or more eligible teams finish with the same tournament
              score, the organizer will apply the official tie-breaking procedure
              announced before or during the event.

              The organizer may use a scorecard playoff, designated-hole
              comparison, playoff competition, or another clearly communicated
              method appropriate to the event.

              The final tie-breaking method will be published before tournament
              results become official.
            </RuleSection>

            <RuleSection number="10" title="Rules of Golf & Local Rules">
              The Invitational will be administered using the tournament&apos;s
              scramble rules together with applicable host-course local rules and
              any Rules of Golf provisions adopted for the event.

              When a special tournament rule conflicts with ordinary stroke-play
              procedure because of the scramble format, the tournament-specific
              instruction will control to the extent permitted for the event.
            </RuleSection>

            <RuleSection number="11" title="Tee Assignments">
              Tee assignments will be established by the organizer and host
              facility.

              Participants must play from the tee assignment designated for them
              unless a tournament official authorizes otherwise.

              Final tee assignments may account for tournament divisions,
              eligibility categories, course setup, or other operational
              considerations.
            </RuleSection>

            <RuleSection number="12" title="Pace of Play">
              Teams are expected to maintain a reasonable pace and remain in
              position with the group ahead when practicable.

              Tournament officials or host-course personnel may provide pace-of-
              play instructions, require a team to improve its position, or take
              other reasonable action to maintain event flow.
            </RuleSection>

            <RuleSection number="13" title="Golf Carts">
              Participants using golf carts must comply with host-course cart
              rules, posted restrictions, weather-related cart instructions, and
              reasonable directions from tournament or facility personnel.

              Reckless, unsafe, or unauthorized operation of a golf cart may
              result in removal from the event.
            </RuleSection>

            <RuleSection number="14" title="Equipment">
              Participants are responsible for supplying equipment permitted
              under the tournament and host-facility rules unless otherwise
              provided by the organizer.

              Tournament officials may prohibit equipment or devices that create
              a safety issue, violate an applicable competition rule, or
              materially interfere with fair play.
            </RuleSection>

            <RuleSection number="15" title="On-Course Contests">
              The Invitational may include optional or included contests such as
              closest to the pin, longest drive, hole-in-one opportunities,
              putting competitions, or other skills contests.

              Each contest may have separate eligibility requirements,
              measurement procedures, prize terms, sponsor conditions, and
              official rules.

              Contest results are subject to verification before prizes are
              awarded.
            </RuleSection>

            <RuleSection number="16" title="Prize Eligibility">
              Tournament prizes, awards, contests, and any announced prize purse
              are subject to the official Prize & Awards Policy.

              A participant may be required to verify identity, eligibility, or
              other information before receiving an award.

              Prize terms may differ based on participant status or other
              applicable eligibility requirements.
            </RuleSection>

            <RuleSection number="17" title="Player Substitutions">
              Player substitutions are permitted only in accordance with the
              Refund & Cancellation Policy and any published substitution
              deadline.

              Substitute players must complete required registration documents,
              acknowledgments, waivers, and eligibility requirements before
              participating.
            </RuleSection>

            <RuleSection number="18" title="Sportsmanship & Conduct">
              Participants are expected to demonstrate appropriate sportsmanship
              and respect toward other golfers, volunteers, staff, sponsors,
              spectators, host-facility personnel, and tournament officials.

              Conduct involving threats, harassment, fighting, intentional
              property damage, deliberate cheating, dangerous behavior, or
              substantial disruption may result in immediate removal or
              disqualification.
            </RuleSection>

            <RuleSection number="19" title="Alcohol & Impairment">
              Participants must comply with all host-facility rules and
              applicable laws concerning alcoholic beverages.

              Unsafe operation of a golf cart or other vehicle while impaired is
              prohibited.

              Tournament or facility personnel may take reasonable action when a
              participant&apos;s condition or conduct presents a safety concern.
            </RuleSection>

            <RuleSection number="20" title="Weather & Suspension of Play">
              Tournament officials and the host facility may delay, suspend,
              shorten, modify, or discontinue play because of lightning,
              dangerous weather, course conditions, emergencies, or other safety
              concerns.

              Participants must immediately comply with suspension, evacuation,
              shelter, or restart instructions.
            </RuleSection>

            <RuleSection number="21" title="Disputes & Rulings">
              Questions concerning scoring, rules, eligibility, contests, or
              tournament administration should be presented promptly to an
              authorized tournament official.

              Decisions will be made using the published tournament rules, host-
              course requirements, applicable competition procedures, and the
              circumstances presented.

              Once results are declared final, subsequent changes will generally
              be made only to correct a material administrative or eligibility
              error.
            </RuleSection>

            <RuleSection number="22" title="Disqualification">
              A team or participant may be disqualified for deliberate
              misrepresentation of a score, intentional violation of competition
              rules, use of an ineligible player, failure to comply with required
              tournament procedures, serious misconduct, or other material
              violations of the published rules.

              Disqualification decisions will be made by authorized tournament
              personnel.
            </RuleSection>

            <RuleSection number="23" title="Tournament Authority">
              The Gallaspy Development Group, LLC reserves the right to interpret
              and administer these rules and to make reasonable event-specific
              decisions necessary to conduct the Invitational safely and fairly.

              Final day-of-event instructions may supplement these rules.
            </RuleSection>

            <RuleSection number="24" title="Changes Before Competition">
              Certain details may be updated as the host facility, course setup,
              sponsorships, contests, registration structure, and event
              operations are finalized.

              Material competition changes will be communicated to registered
              participants when reasonably practicable.
            </RuleSection>

            <RuleSection number="25" title="Questions">
              Questions regarding tournament rules may be directed to:

              <span className="mt-4 block font-semibold text-[#10263F]">
                The Gallaspy Development Group, LLC
              </span>
              <span className="block">The Gallaspy Invitational</span>
              <span className="block">info@thegallaspy.com</span>
            </RuleSection>
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
                href="/invitational/refund-policy"
                title="Refund & Cancellation"
              />
              <PolicyLink
                href="/invitational/waiver"
                title="Liability Waiver"
              />
              <PolicyLink
                href="/invitational/prizes"
                title="Prizes & Awards"
              />
            </div>
          </div>

          <div className="mt-14 rounded-[22px] bg-[#10263F] p-7 text-white sm:p-9">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#FFD76A]">
              Final Player Rules
            </p>

            <h2 className="mt-4 font-serif text-3xl">
              Tournament-day instructions will supplement these rules.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/65">
              Registered players will receive final course-specific procedures,
              tee assignments, scoring instructions, contests, and other
              competition details before or at tournament check-in.
            </p>
          </div>

          <p className="mt-8 text-xs leading-6 text-[#10263F]/45">
            These rules are currently structured for event planning and may be
            revised before paid registration or competition as tournament details
            are finalized.
          </p>
        </div>
      </section>
    </main>
  );
}

function RuleSection({
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

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[18px] border border-[#10263F]/10 bg-white px-5 py-6">
      <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#8B6A34]">
        {label}
      </p>

      <p className="mt-3 font-serif text-xl">{value}</p>
    </div>
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