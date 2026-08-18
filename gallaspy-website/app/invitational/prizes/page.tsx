import type { Metadata } from "next";
import Link from "next/link";
import InvitationalNav from "@/components/invitational/InvitationalNav";

export const metadata: Metadata = {
  title: "Prizes & Awards | The Gallaspy Invitational",
  description:
    "Prize purse, awards, and contest information for the 2027 Gallaspy Invitational.",
};

const purse = [
  {
    place: "1st Place",
    teamPrize: "$4,000",
    playerPrize: "$1,000 per player",
  },
  {
    place: "2nd Place",
    teamPrize: "$3,000",
    playerPrize: "$750 per player",
  },
  {
    place: "3rd Place",
    teamPrize: "$2,000",
    playerPrize: "$500 per player",
  },
  {
    place: "4th Place",
    teamPrize: "$1,000",
    playerPrize: "$250 per player",
  },
];

export default function InvitationalPrizesPage() {
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
            The 2027 Gallaspy Invitational
          </p>

          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
            $10,000
            <span className="block text-[#FFD76A]">Prize Purse</span>
          </h1>

          <div className="mt-8 h-px w-20 bg-[#B89146]" />

          <p className="mt-8 max-w-2xl text-base leading-8 text-white/70">
            Four teams. Sixteen prize positions. One inaugural championship.
          </p>
        </div>
      </section>

      {/* PURSE */}
      <section className="px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1000px]">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A34]">
              Championship Purse
            </p>

            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
              $10,000 in tournament prizes.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#10263F]/65">
              The planned purse is distributed among the top four eligible
              teams in the 4-person scramble.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {purse.map((award) => (
              <div
                key={award.place}
                className="rounded-[22px] border border-[#10263F]/10 bg-white p-7 sm:p-8"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8B6A34]">
                  {award.place}
                </p>

                <p className="mt-4 font-serif text-4xl">
                  {award.teamPrize}
                </p>

                <div className="mt-5 h-px w-12 bg-[#B89146]" />

                <p className="mt-5 text-sm text-[#10263F]/60">
                  {award.playerPrize}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[22px] bg-[#10263F] p-7 text-white sm:p-9">
            <div className="grid gap-8 sm:grid-cols-3">
              <Stat label="Total Purse" value="$10,000" />
              <Stat label="Teams Awarded" value="4" />
              <Stat label="Prize Positions" value="16" />
            </div>
          </div>

          {/* CONDITIONS */}
          <div className="mt-20">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A34]">
              Prize Conditions
            </p>

            <h2 className="mt-4 font-serif text-4xl">
              Eligibility & Award Terms
            </h2>

            <div className="mt-10 space-y-10">
              <PrizeSection number="01" title="Competition Structure">
                The championship purse is intended for the official gross
                scramble competition. Final results are subject to score
                verification, eligibility requirements, and the Official
                Tournament Rules.
              </PrizeSection>

              <PrizeSection number="02" title="Amateur Golfers">
                The prize structure is designed with the intention of permitting
                eligible amateur golfers to compete for prizes within applicable
                amateur-status limits.

                Each participant remains responsible for determining whether
                accepting a prize is permitted under any amateur-status,
                collegiate, association, employment, or other eligibility rules
                applicable to that participant.
              </PrizeSection>

              <PrizeSection number="03" title="Prize Acceptance">
                No participant is required to accept a cash prize.

                If accepting a particular prize would affect a participant&apos;s
                eligibility or amateur status, the participant should notify
                tournament officials before accepting the award.
              </PrizeSection>

              <PrizeSection number="04" title="Verification">
                Tournament results must be verified before championship prizes
                are considered final.

                The organizer may require reasonable identity, eligibility,
                score, or payment information before issuing an award.
              </PrizeSection>

              <PrizeSection number="05" title="Taxes">
                Prize recipients are responsible for any individual tax
                obligations resulting from an award.

                The Gallaspy Development Group, LLC may request information or
                issue tax documentation when required by applicable law.
              </PrizeSection>

              <PrizeSection number="06" title="Ties">
                Ties affecting a prize position will be resolved using the
                official tie-breaking procedure established in the tournament
                rules.

                Final prize placement will not be determined until applicable
                tie-breaking procedures have been completed.
              </PrizeSection>

              <PrizeSection number="07" title="Disqualification">
                A participant or team that is disqualified under the Official
                Tournament Rules may lose eligibility for tournament prizes.

                Prize positions may be adjusted after a disqualification or
                verified scoring or eligibility correction.
              </PrizeSection>

              <PrizeSection number="08" title="On-Course Contests">
                Closest-to-the-pin, longest-drive, putting, hole-in-one, and
                other skills contests may be offered separately from the
                championship purse.

                Each contest will be governed by its own eligibility, prize,
                measurement, sponsor, and verification requirements. Contest
                prizes are not included in the $10,000 championship purse unless
                expressly stated otherwise.
              </PrizeSection>

              <PrizeSection number="09" title="Changes to Prize Structure">
                The organizer reserves the right to make changes required for
                legal, regulatory, amateur-status, sponsor, eligibility, or
                tournament-administration reasons before prizes are awarded.

                Any material change to the advertised championship purse will be
                communicated to registered participants when reasonably
                practicable.
              </PrizeSection>

              <PrizeSection number="10" title="Final Authority">
                Prize eligibility and tournament results are subject to the
                Official Tournament Rules and final verification by authorized
                tournament personnel.
              </PrizeSection>
            </div>
          </div>

          {/* CONTESTS */}
          <div className="mt-20 rounded-[22px] border border-[#10263F]/10 bg-white p-7 sm:p-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#8B6A34]">
              Additional Awards
            </p>

            <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
              On-course challenges are coming.
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#10263F]/65">
              Additional contests and sponsored prizes may be announced as the
              Invitational approaches. Official contest prizes and eligibility
              requirements will be published before competition.
            </p>
          </div>

          {/* RELATED */}
          <div className="mt-16 border-t border-[#10263F]/10 pt-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#8B6A34]">
              Tournament Policies
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
                href="/invitational/rules"
                title="Official Tournament Rules"
              />
            </div>
          </div>

          <div className="mt-14 border-l-2 border-[#B89146] bg-white px-6 py-5">
            <p className="text-xs leading-6 text-[#10263F]/50">
              Prize amounts and eligibility requirements remain subject to final
              tournament rules and applicable amateur-status requirements.
              Participants should review the rules applicable to their individual
              status before accepting an award.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function PrizeSection({
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
          <h3 className="font-serif text-2xl sm:text-3xl">{title}</h3>

          <div className="mt-4 whitespace-pre-line text-sm leading-7 text-[#10263F]/65">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#FFD76A]">
        {label}
      </p>
      <p className="mt-2 font-serif text-3xl">{value}</p>
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