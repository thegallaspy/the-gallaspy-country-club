import Link from "next/link";

export const metadata = {
  title: "Official Tournament Rules | The Gallaspy Invitational",
  description:
    "Official competition format and tournament rules for the 2027 Gallaspy Invitational.",
};

const summary = [
  ["Date", "June 21, 2027"],
  ["Field", "72 Players"],
  ["Format", "18-Hole Individual Stroke Play"],
  ["Start", "10:00 AM Shotgun"],
];

const scoring = [
  {
    number: "01",
    title: "The Invitational Championship",
    text:
      "Every player competes in the 18-hole Gross Championship. The golfer returning the lowest actual 18-hole score is the Gallaspy Invitational Champion.",
  },
  {
    number: "02",
    title: "The Net Championship",
    text:
      "Players with an active GHIN or other tournament-recognized handicap are also eligible for the Net Championship. Net standings are calculated separately from the Gross Championship.",
  },
  {
    number: "03",
    title: "Gross Championship Tie",
    text:
      "A tie for the lowest gross score will be decided by a sudden-death playoff on holes designated by the Tournament Committee.",
  },
  {
    number: "04",
    title: "Net Championship Tie",
    text:
      "A tie for the Net Championship will be decided by a scorecard playoff using the procedure established by the Tournament Committee.",
  },
];

export default function InvitationalRulesPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#10263F]">
      {/* HERO */}
      <section className="bg-[#10263F] px-5 pb-20 pt-32 text-white sm:px-8 sm:pt-36 lg:px-10 lg:pb-24 lg:pt-40">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[9px] font-black uppercase tracking-[0.34em] text-[#FFD76A]">
            1st Annual · June 21, 2027
          </p>

          <h1 className="mt-7 max-w-5xl text-[3.7rem] font-black uppercase leading-[0.84] tracking-[-0.06em] sm:text-[5.4rem] lg:text-[6.8rem]">
            Official
            <span className="block text-[#E56A70]">Rules.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
            The competition framework for the inaugural Gallaspy Invitational:
            72 golfers, 18 holes, individual stroke play, and one Invitational
            Champion.
          </p>
        </div>
      </section>

      {/* SUMMARY */}
      <section className="border-b border-[#10263F]/15 bg-white">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 lg:grid-cols-4">
          {summary.map(([label, value]) => (
            <div
              key={label}
              className="border-b border-r border-[#10263F]/15 p-6 last:border-r-0 lg:border-b-0"
            >
              <p className="text-[7px] font-black uppercase tracking-[0.25em] text-[#8B6A34]">
                {label}
              </p>
              <p className="mt-3 text-sm font-bold leading-6 text-[#10263F]">
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CHAMPIONSHIP HIERARCHY */}
      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.34em] text-[#B3262D]">
                Championship Hierarchy
              </p>

              <h2 className="mt-5 text-[2.8rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[4rem]">
                One
                <span className="block text-[#0C352D]">
                  Invitational Champion.
                </span>
              </h2>
            </div>

            <div>
              <div className="border-l-4 border-[#B3262D] bg-white p-7 sm:p-9">
                <p className="text-[8px] font-black uppercase tracking-[0.28em] text-[#8B6A34]">
                  The Gallaspy Invitational Champion
                </p>

                <p className="mt-4 text-[2rem] font-black uppercase leading-none tracking-[-0.04em] sm:text-[2.6rem]">
                  Lowest Gross
                  <span className="block text-[#0C352D]">18-Hole Score.</span>
                </p>

                <p className="mt-6 max-w-xl text-sm leading-7 text-[#33475B]/75">
                  The golfer who records the lowest actual score over 18 holes
                  is the Gallaspy Invitational Champion. This is the champion
                  whose name is placed on the permanent Invitational trophy.
                </p>
              </div>

              <div className="mt-5 border border-[#10263F]/15 p-7 sm:p-9">
                <p className="text-[8px] font-black uppercase tracking-[0.28em] text-[#8B6A34]">
                  Net Championship
                </p>

                <p className="mt-4 text-xl font-black uppercase tracking-[-0.03em]">
                  Lowest Handicap-Adjusted Score
                </p>

                <p className="mt-4 max-w-xl text-sm leading-7 text-[#33475B]/70">
                  The Net Championship is a separate award. Winning the Net
                  Championship does not make a player the Gallaspy Invitational
                  Champion unless that player also records the lowest gross
                  score.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMAT */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.34em] text-[#B3262D]">
                Competition
              </p>

              <h2 className="mt-5 text-[2.8rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[4rem]">
                Individual
                <span className="block text-[#0C352D]">Stroke Play.</span>
              </h2>
            </div>

            <div className="border-t border-[#10263F]/15">
              {scoring.map((rule) => (
                <article
                  key={rule.number}
                  className="grid gap-4 border-b border-[#10263F]/15 py-7 sm:grid-cols-[70px_1fr]"
                >
                  <p className="text-[8px] font-black tracking-[0.22em] text-[#B3262D]">
                    {rule.number}
                  </p>

                  <div>
                    <h3 className="text-lg font-black uppercase tracking-[-0.025em]">
                      {rule.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#33475B]/70">
                      {rule.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HANDICAP + MAX SCORE */}
      <section className="bg-[#0C352D] px-5 py-16 text-white sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.34em] text-[#FFD76A]">
                Gross Competition
              </p>

              <h2 className="mt-5 text-[2.6rem] font-black uppercase leading-[0.9] tracking-[-0.05em]">
                Hole Out.
                <span className="block text-[#E56A70]">Every Hole.</span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/65">
                Players competing for the Gallaspy Invitational Championship
                must complete every hole and return an actual gross score.
                There is no maximum-score substitution for the Gross
                Championship.
              </p>
            </div>

            <div className="border-t border-white/20 pt-8 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
              <p className="text-[9px] font-black uppercase tracking-[0.34em] text-[#FFD76A]">
                Net Competition
              </p>

              <h2 className="mt-5 text-[2.6rem] font-black uppercase leading-[0.9] tracking-[-0.05em]">
                Handicap
                <span className="block text-white">Eligibility.</span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/65">
                An active GHIN or other handicap recognized by the Tournament
                Committee is required for Net Championship eligibility.
                Tournament handicap procedures and any applicable net
                maximum-score procedure will be published before competition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GENERAL RULES */}
      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.34em] text-[#B3262D]">
                Tournament Administration
              </p>

              <h2 className="mt-5 text-[2.8rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[4rem]">
                Play The
                <span className="block text-[#0C352D]">Championship.</span>
              </h2>
            </div>

            <div className="space-y-8 text-sm leading-7 text-[#33475B]/75">
              <div>
                <h3 className="font-black uppercase tracking-[0.08em] text-[#10263F]">
                  Rules of Play
                </h3>
                <p className="mt-2">
                  Competition will be conducted under the Rules of Golf,
                  applicable host-course local rules, and any tournament-specific
                  conditions issued by the Gallaspy Invitational Tournament
                  Committee.
                </p>
              </div>

              <div>
                <h3 className="font-black uppercase tracking-[0.08em] text-[#10263F]">
                  Scorecards
                </h3>
                <p className="mt-2">
                  Players are responsible for the accuracy and timely return of
                  their scorecards in accordance with tournament procedures
                  communicated at the player meeting.
                </p>
              </div>

              <div>
                <h3 className="font-black uppercase tracking-[0.08em] text-[#10263F]">
                  Starting Procedure
                </h3>
                <p className="mt-2">
                  The 72-player field is planned as 18 foursomes using a
                  10:00 AM shotgun start. Players must report to their assigned
                  starting holes according to the published tournament-day
                  schedule.
                </p>
              </div>

              <div>
                <h3 className="font-black uppercase tracking-[0.08em] text-[#10263F]">
                  On-Course Competitions
                </h3>
                <p className="mt-2">
                  Closest-to-the-Pin and Hole-in-One Challenge opportunities may
                  be conducted alongside championship play. Any sponsor
                  activations will be governed by separate published rules and
                  must not interfere with the integrity of the stroke-play
                  competition.
                </p>
              </div>

              <div>
                <h3 className="font-black uppercase tracking-[0.08em] text-[#10263F]">
                  Tournament Committee
                </h3>
                <p className="mt-2">
                  Final local rules, tees, handicap procedures, scorecard
                  playoff procedure, playoff holes, and other competition
                  conditions will be confirmed before the event once the host
                  course and tournament setup are finalized.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSE */}
      <section className="bg-[#10263F] px-5 py-20 text-center text-white sm:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-[9px] font-black uppercase tracking-[0.35em] text-[#FFD76A]">
            June 21, 2027
          </p>

          <h2 className="mt-6 text-[3rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[4.5rem]">
            72 Players.
            <span className="block">18 Holes.</span>
            <span className="block text-[#E56A70]">One Champion.</span>
          </h2>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/invitational"
              className="border border-[#FFD76A] px-6 py-4 text-[8px] font-black uppercase tracking-[0.24em] text-[#FFD76A]"
            >
              Invitational Overview →
            </Link>

            <Link
              href="/invitational/register"
              className="bg-[#FFD76A] px-6 py-4 text-[8px] font-black uppercase tracking-[0.24em] text-[#10263F]"
            >
              Player Registration →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
