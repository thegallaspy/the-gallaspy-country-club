import Link from "next/link";

export const metadata = {
  title: "Tournament Schedule | The Gallaspy Invitational",
  description:
    "Tournament-day schedule for the 2027 Gallaspy Invitational on June 21, 2027.",
};

const schedule = [
  {
    time: "8:00–9:30 AM",
    title: "Arrival, Registration & Practice",
    text:
      "Player arrival, registration, breakfast, warm-up, and practice-facility access before competition.",
  },
  {
    time: "9:30 AM",
    title: "Player Meeting",
    text:
      "Final tournament instructions, local rules, scoring procedures, starting-hole assignments, and competition announcements.",
  },
  {
    time: "9:45 AM",
    title: "Report To Starting Holes",
    text:
      "Players move to their assigned starting holes and prepare for the shotgun start.",
  },
  {
    time: "10:00 AM",
    title: "Championship Shotgun Start",
    text:
      "The 72-player field begins 18-hole individual stroke play across 18 foursomes.",
  },
  {
    time: "2:30–3:00 PM",
    title: "Expected Finish Window",
    text:
      "Final groups complete play and return scorecards for official tournament scoring.",
  },
  {
    time: "Approximately 3:15 PM",
    title: "Gross Championship Playoff",
    text:
      "If the lowest gross score is tied, the tied players advance to a sudden-death playoff on designated holes.",
  },
  {
    time: "3:30–4:30 PM",
    title: "Reception, Scoring & Awards",
    text:
      "Player reception, final scoring, recognition of the Net Champion and on-course competition winners, and championship presentation.",
  },
  {
    time: "Approximately 4:00 PM",
    title: "Trophy Presentation",
    text:
      "The Gallaspy Invitational Champion is presented with the permanent championship trophy following confirmation of the final gross result.",
  },
];

export default function InvitationalSchedulePage() {
  return (
    <main className="bg-[#F7F4EE] text-[#10263F]">
      {/* HERO */}
      <section className="bg-[#10263F] px-5 pb-20 pt-32 text-white sm:px-8 sm:pt-36 lg:px-10 lg:pb-24 lg:pt-40">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[9px] font-black uppercase tracking-[0.34em] text-[#FFD76A]">
            Monday · June 21, 2027
          </p>

          <h1 className="mt-7 max-w-5xl text-[3.7rem] font-black uppercase leading-[0.84] tracking-[-0.06em] sm:text-[5.4rem] lg:text-[6.8rem]">
            Tournament
            <span className="block text-[#E56A70]">Day.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
            A one-day individual stroke-play championship built around a
            72-player field, a 10:00 AM shotgun start, and one Gallaspy
            Invitational Champion.
          </p>
        </div>
      </section>

      {/* QUICK FACTS */}
      <section className="border-b border-[#10263F]/15 bg-white">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 lg:grid-cols-4">
          {[
            ["Format", "Individual Stroke Play"],
            ["Field", "72 Players"],
            ["Groups", "18 Foursomes"],
            ["Start", "10:00 AM Shotgun"],
          ].map(([label, value]) => (
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

      {/* DAY SCHEDULE */}
      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.34em] text-[#B3262D]">
                Championship Day
              </p>

              <h2 className="mt-5 text-[2.8rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[4rem]">
                From Arrival
                <span className="block text-[#0C352D]">To The Trophy.</span>
              </h2>

              <p className="mt-7 max-w-md text-sm leading-7 text-[#33475B]/70">
                The schedule is designed to give players enough time to prepare,
                complete an individual stroke-play round, resolve any gross
                championship playoff, and finish with a proper awards
                presentation.
              </p>
            </div>

            <div className="border-t border-[#10263F]/15">
              {schedule.map((item, index) => (
                <article
                  key={`${item.time}-${item.title}`}
                  className="grid gap-4 border-b border-[#10263F]/15 py-7 sm:grid-cols-[145px_1fr]"
                >
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-[0.22em] text-[#8B6A34]">
                      {item.time}
                    </p>
                    <p className="mt-2 text-[8px] font-black tracking-[0.2em] text-[#B3262D]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-black uppercase tracking-[-0.025em]">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#33475B]/70">
                      {item.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPETITION WINDOW */}
      <section className="bg-[#0C352D] px-5 py-16 text-white sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.34em] text-[#FFD76A]">
                The Championship Window
              </p>

              <h2 className="mt-5 text-[2.8rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[4rem]">
                10:00 AM
                <span className="block text-[#E56A70]">Shotgun.</span>
              </h2>
            </div>

            <div>
              <p className="max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
                Moving the championship to a 10:00 AM start gives the field more
                time to complete 18 holes of individual stroke play while
                preserving room for scoring, a possible sudden-death playoff,
                and the trophy presentation.
              </p>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/45">
                Exact practice-facility access, breakfast service, starting-hole
                assignments, playoff holes, and reception details will be
                finalized with the host course.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ON COURSE */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.34em] text-[#B3262D]">
                During Competition
              </p>

              <h2 className="mt-5 text-[2.8rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[4rem]">
                Championship
                <span className="block text-[#0C352D]">First.</span>
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <article className="border border-[#10263F]/15 p-7">
                <p className="text-[8px] font-black uppercase tracking-[0.26em] text-[#8B6A34]">
                  Closest To The Pin
                </p>
                <p className="mt-4 text-sm leading-7 text-[#33475B]/70">
                  A designated par-3 competition may operate alongside the
                  championship without changing normal stroke-play procedure.
                </p>
              </article>

              <article className="border border-[#10263F]/15 p-7">
                <p className="text-[8px] font-black uppercase tracking-[0.26em] text-[#8B6A34]">
                  Hole-In-One Challenge
                </p>
                <p className="mt-4 text-sm leading-7 text-[#33475B]/70">
                  A designated hole-in-one opportunity may be included subject
                  to final sponsor, insurance, and tournament conditions.
                </p>
              </article>

              <article className="border border-[#10263F]/15 p-7 sm:col-span-2">
                <p className="text-[8px] font-black uppercase tracking-[0.26em] text-[#8B6A34]">
                  Sponsor Activations
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#33475B]/70">
                  Additional activations may be incorporated where appropriate,
                  but the primary tournament presentation remains the individual
                  Gross and Net Championships.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSE */}
      <section className="bg-[#10263F] px-5 py-20 text-center text-white sm:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-[9px] font-black uppercase tracking-[0.35em] text-[#FFD76A]">
            1st Annual Gallaspy Invitational
          </p>

          <h2 className="mt-6 text-[3rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[4.5rem]">
            72 Players.
            <span className="block">18 Holes.</span>
            <span className="block text-[#E56A70]">One Champion.</span>
          </h2>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/invitational/rules"
              className="border border-[#FFD76A] px-6 py-4 text-[8px] font-black uppercase tracking-[0.24em] text-[#FFD76A]"
            >
              Official Rules →
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
