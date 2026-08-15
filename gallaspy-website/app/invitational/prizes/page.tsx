import Image from "next/image";
import Link from "next/link";
import InvitationalNav from "@/components/invitational/InvitationalNav";

const purseBreakdown = [
  {
    place: "1st Place",
    teamAward: "$4,000",
    playerAward: "$1,000 Each",
    note: "Golden Falcon Champions",
  },
  {
    place: "2nd Place",
    teamAward: "$3,000",
    playerAward: "$750 Each",
    note: "Runner-Up",
  },
  {
    place: "3rd Place",
    teamAward: "$2,000",
    playerAward: "$500 Each",
    note: "Third Place",
  },
  {
    place: "4th Place",
    teamAward: "$1,000",
    playerAward: "$250 Each",
    note: "Fourth Place",
  },
];

const contests = [
  {
    title: "$25,000 Hole-in-One Challenge",
    award: "$25,000",
    description:
      "A designated tournament hole is planned to feature a $25,000 hole-in-one challenge. Official eligibility, verification, prize terms, and contest procedures will be published before tournament day.",
    sponsor: "Presenting Sponsor — To Be Announced",
  },
  {
    title: "Longest Drive",
    award: "Award",
    description:
      "A designated competition hole will recognize the tournament’s longest qualifying drive under the official contest rules.",
    sponsor: "Presenting Sponsor — To Be Announced",
  },
  {
    title: "Closest to the Pin",
    award: "Award",
    description:
      "Players will compete for closest-to-the-pin honors on a designated par-three competition hole.",
    sponsor: "Presenting Sponsor — To Be Announced",
  },
];

export default function InvitationalPrizesPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E6] text-[#10263F]">
      <InvitationalNav />

      {/* HERO */}
      <section className="bg-[#10263F] px-6 pb-24 pt-32 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <Link
            href="/invitational"
            className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60 transition hover:text-[#FFD76A]"
          >
            ← Back to Invitational
          </Link>

          <div className="mt-10">
            <Image
              src="/logos/gallaspy-invitational.png"
              alt="The Gallaspy Invitational"
              width={300}
              height={300}
              priority
              className="h-auto w-[150px] sm:w-[180px] lg:w-[205px]"
            />
          </div>

          <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#FFD76A]">
            Championship & Awards
          </p>

          <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
            The Golden Falcon
            <span className="block text-[#FFD76A]">
              $10,000 Championship Purse
            </span>
          </h1>

          <div className="mt-8 h-px w-20 bg-[#B89146]" />

          <p className="mt-8 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
            Four teams will finish in the money. One will leave as the
            inaugural Gallaspy Invitational champion and the first team to
            raise The Golden Falcon Trophy.
          </p>
        </div>
      </section>

      {/* CHAMPIONSHIP SNAPSHOT */}
      <section className="border-b border-[#10263F]/10 bg-white px-6 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 md:grid-cols-4">
          <div className="border-b border-r border-[#10263F]/10 px-4 py-8 md:border-b-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Championship
            </p>
            <p className="mt-2 font-serif text-xl">Golden Falcon</p>
          </div>

          <div className="border-b border-[#10263F]/10 px-4 py-8 md:border-b-0 md:border-r">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Tournament Purse
            </p>
            <p className="mt-2 font-serif text-xl">$10,000</p>
          </div>

          <div className="border-r border-[#10263F]/10 px-4 py-8">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Paid Positions
            </p>
            <p className="mt-2 font-serif text-xl">Top 4 Teams</p>
          </div>

          <div className="px-4 py-8">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Hole-in-One
            </p>
            <p className="mt-2 font-serif text-xl">$25,000</p>
          </div>
        </div>
      </section>

      {/* GOLDEN FALCON */}
      <section className="px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8B6A34]">
              The Championship Trophy
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
              The Golden Falcon belongs to the champions.
            </h2>

            <p className="mt-6 text-sm leading-7 text-[#10263F]/65">
              The first-place team will receive The Golden Falcon Trophy,
              establishing a championship tradition intended to carry forward
              with The Gallaspy Invitational each year.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#10263F]/65">
              The inaugural champions will also receive the largest share of
              the $10,000 tournament purse.
            </p>
          </div>

          <div className="rounded-[24px] bg-[#10263F] p-8 text-white sm:p-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#FFD76A]">
              1st Place
            </p>

            <p className="mt-5 font-serif text-5xl text-[#FFD76A] sm:text-6xl">
              $4,000
            </p>

            <p className="mt-3 text-sm uppercase tracking-[0.18em] text-white/60">
              $1,000 Per Player
            </p>

            <div className="my-8 h-px bg-white/12" />

            <p className="font-serif text-3xl">The Golden Falcon Trophy</p>

            <p className="mt-4 text-sm leading-7 text-white/62">
              Awarded to the inaugural championship team of the 2027 Gallaspy
              Invitational.
            </p>

            <p className="mt-7 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#FFD76A]">
              Presenting Sponsor — To Be Announced
            </p>
          </div>
        </div>
      </section>

      {/* PURSE BREAKDOWN */}
      <section className="bg-[#0E2238] px-6 py-24 text-white sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#FFD76A]">
              Championship Purse
            </p>

            <h2 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl">
              $10,000 awarded across the top four teams.
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/62">
              The tournament purse is structured to reward the top four
              finishing teams while giving the inaugural champions the largest
              share and The Golden Falcon Trophy.
            </p>
          </div>

          <div className="mt-14 border-t border-white/15">
            {purseBreakdown.map((award) => (
              <article
                key={award.place}
                className="grid gap-5 border-b border-white/15 py-7 sm:grid-cols-[1.2fr_1fr_1fr_1fr] sm:items-center"
              >
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#FFD76A]">
                    {award.note}
                  </p>

                  <h3 className="mt-2 font-serif text-2xl">{award.place}</h3>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/40">
                    Team Award
                  </p>
                  <p className="mt-2 font-serif text-2xl">
                    {award.teamAward}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/40">
                    Per Player
                  </p>
                  <p className="mt-2 font-serif text-2xl">
                    {award.playerAward}
                  </p>
                </div>

                <div className="sm:text-right">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#FFD76A]">
                    Presenting Sponsor
                  </p>
                  <p className="mt-2 text-sm text-white/55">To Be Announced</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <div className="border-t border-[#FFD76A]/35 pt-5 text-right">
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/45">
                Total Tournament Purse
              </p>
              <p className="mt-2 font-serif text-4xl text-[#FFD76A]">
                $10,000
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOLE IN ONE */}
      <section className="bg-[#EFE7D8] px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1200px] text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8B6A34]">
            Signature Challenge
          </p>

          <p className="mt-6 font-serif text-6xl text-[#10263F] sm:text-7xl lg:text-8xl">
            $25,000
          </p>

          <h2 className="mt-5 font-serif text-3xl sm:text-4xl lg:text-5xl">
            Hole-in-One Challenge
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-[#10263F]/65">
            A designated tournament hole is planned to offer a $25,000
            hole-in-one opportunity. Official contest hole, eligibility,
            witness requirements, verification procedures, prize terms, and
            presenting sponsor will be announced before tournament day.
          </p>

          <div className="mx-auto mt-8 h-px w-16 bg-[#B89146]" />

          <p className="mt-6 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#8B6A34]">
            Presenting Sponsor — To Be Announced
          </p>
        </div>
      </section>

      {/* OTHER CONTESTS */}
      <section className="bg-white px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8B6A34]">
              On-Course Awards
            </p>

            <h2 className="mt-5 font-serif text-4xl sm:text-5xl">
              More ways to leave with something earned.
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#10263F]/65">
              Individual contests will recognize standout moments throughout
              tournament day. Final physical awards and presenting sponsors are
              currently being selected.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {contests.map((contest) => (
              <article
                key={contest.title}
                className="flex min-h-[300px] flex-col border border-[#10263F]/10 bg-[#F7F4EE] p-7"
              >
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#8B6A34]">
                  {contest.award}
                </p>

                <h3 className="mt-5 font-serif text-3xl">{contest.title}</h3>

                <p className="mt-5 flex-1 text-sm leading-7 text-[#10263F]/62">
                  {contest.description}
                </p>

                <div className="mt-7 border-t border-[#10263F]/10 pt-5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
                    {contest.sponsor}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* RULES NOTICE */}
      <section className="bg-[#10263F] px-6 py-20 text-white sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#FFD76A]">
              Competition Notice
            </p>

            <h2 className="mt-5 font-serif text-4xl">
              Official rules will govern every award.
            </h2>
          </div>

          <div>
            <p className="text-sm leading-7 text-white/65">
              Purse distribution, ties, eligibility, scoring procedures,
              contest requirements, hole-in-one verification, award terms, and
              sponsor-specific conditions will be governed by the official 2027
              Gallaspy Invitational tournament rules. Published prize details
              remain subject to final rules and applicable award terms.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8B6A34]">
            The First Annual
          </p>

          <h2 className="mt-5 font-serif text-5xl leading-tight sm:text-6xl">
            Compete for The Golden Falcon.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#10263F]/65">
            Join the player priority list for official registration
            announcements and tournament updates.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/invitational/register"
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-[#10263F] px-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#B89146] sm:w-auto sm:px-8"
            >
              Join Player Priority List
            </Link>

            <Link
              href="/invitational/sponsors"
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full border border-[#10263F]/20 px-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#10263F] transition hover:border-[#B89146] hover:text-[#B89146] sm:w-auto sm:px-8"
            >
              Sponsor an Award
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}