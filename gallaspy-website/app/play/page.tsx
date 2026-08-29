import Link from "next/link";

const upcomingEvents = [
  {
    date: "26",
    month: "SEP",
    title: "First Flight",
    type: "Invitation Only",
    status: "September 26, 2026",
  },
  {
    date: "21",
    month: "JUN",
    title: "The Gallaspy Invitational",
    type: "Flagship Tournament",
    status: "June 21, 2027",
  },
];

const waysToJoin = [
  {
    number: "01",
    title: "Club Rounds",
    text: "Golfers come together for scheduled rounds at courses throughout Georgia.",
  },
  {
    number: "02",
    title: "Competition",
    text: "Matches, contests, and tournament golf bring a competitive edge to the club.",
  },
  {
    number: "03",
    title: "Gatherings",
    text: "Some of the best parts of the club happen after the final putt drops.",
  },
];

export default function PlayPage() {
  return (
    <main className="bg-[#F4F0E7] text-[#10263F]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#10263F] px-5 pb-16 pt-36 text-white sm:px-8 sm:pb-20 sm:pt-40 lg:px-10 lg:pb-24 lg:pt-44">
        <div className="absolute right-[-4rem] top-20 text-[15rem] font-black leading-none tracking-[-0.1em] text-white/[0.025] sm:text-[22rem]">
          PLAY
        </div>

        <div className="absolute inset-y-0 right-0 hidden w-[32%] bg-[#0C352D] lg:block" />

        <div className="relative mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 bg-[#B3262D]" />

            <p className="text-[8px] font-black uppercase tracking-[0.34em] text-[#FFD76A]">
              Play With The Gallaspy
            </p>
          </div>

          <h1 className="mt-8 max-w-[1000px] text-[4rem] font-black uppercase leading-[0.82] tracking-[-0.07em] sm:text-[5.5rem] md:text-[6.8rem] lg:text-[8rem]">
            Show Up.
            <span className="block text-[#E56A70]">Tee It Up.</span>
          </h1>

          <p className="mt-8 max-w-[650px] text-sm leading-7 text-white/62 sm:text-base">
            The Gallaspy is being built through rounds, competition, and the
            golfers who continue showing up to play.
          </p>
        </div>
      </section>

      {/* UPCOMING PLAY */}
      <section className="px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.34em] text-[#B3262D]">
                Club Calendar
              </p>

              <h2 className="mt-5 text-[2.8rem] font-black uppercase leading-[0.86] tracking-[-0.055em] sm:text-[3.8rem]">
                Upcoming
                <span className="block text-[#0C352D]">Play.</span>
              </h2>

              <p className="mt-6 max-w-[370px] text-sm leading-7 text-[#10263F]/55">
                Scheduled rounds, competitions, and events will be added here as
                the club calendar develops.
              </p>
            </div>

            <div className="border border-[#10263F]/15 bg-[#F8F5EE]">
              <div className="grid grid-cols-[92px_1fr_auto] border-b border-[#10263F]/15 bg-[#10263F] px-5 py-4 text-white">
                <p className="text-[7px] font-black uppercase tracking-[0.28em] text-white/45">
                  Date
                </p>

                <p className="text-[7px] font-black uppercase tracking-[0.28em] text-white/45">
                  Event
                </p>

                <p className="hidden text-[7px] font-black uppercase tracking-[0.28em] text-white/45 sm:block">
                  Status
                </p>
              </div>

              {upcomingEvents.map((event, index) => (
                <div
                  key={event.title}
                  className={`grid gap-5 px-5 py-6 sm:grid-cols-[92px_1fr_auto] sm:items-center ${
                    index !== upcomingEvents.length - 1
                      ? "border-b border-[#10263F]/12"
                      : ""
                  }`}
                >
                  <div>
                    <p className="text-[2rem] font-black leading-none tracking-[-0.05em] text-[#B3262D]">
                      {event.date}
                    </p>

                    <p className="mt-1 text-[8px] font-black uppercase tracking-[0.24em] text-[#10263F]/40">
                      {event.month}
                    </p>
                  </div>

                  <div>
                    <p className="text-[7px] font-black uppercase tracking-[0.26em] text-[#8B6A34]">
                      {event.type}
                    </p>

                    <h3 className="mt-2 text-[1.35rem] font-black uppercase tracking-[-0.035em] sm:text-[1.6rem]">
                      {event.title}
                    </h3>
                  </div>

                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#10263F]/45">
                    {event.status}
                  </p>
                </div>
              ))}

              <div className="border-t border-[#10263F]/15 bg-[#0C352D] px-5 py-4">
                <p className="text-[7px] font-black uppercase tracking-[0.28em] text-[#FFD76A]">
                  More dates will be announced as rounds are scheduled.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#10263F] text-white">
        <div className="h-[6px] bg-[#B3262D]" />

        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="flex items-end justify-between gap-8">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.34em] text-[#FFD76A]">
                How It Works
              </p>

              <h2 className="mt-5 text-[2.8rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[4rem]">
                Play The Game.
                <span className="block text-[#E56A70]">Build The Club.</span>
              </h2>
            </div>
          </div>

          <div className="mt-10 grid border-t border-white/15 lg:grid-cols-3">
            {waysToJoin.map((item, index) => (
              <article
                key={item.title}
                className={`py-8 lg:px-8 ${
                  index !== waysToJoin.length - 1
                    ? "border-b border-white/15 lg:border-b-0 lg:border-r"
                    : ""
                }`}
              >
                <p className="text-[2.3rem] font-black leading-none tracking-[-0.06em] text-[#E56A70]">
                  {item.number}
                </p>

                <h3 className="mt-5 text-[1.7rem] font-black uppercase tracking-[-0.035em]">
                  {item.title}
                </h3>

                <p className="mt-4 max-w-[320px] text-sm leading-7 text-white/52">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 border-t border-[#10263F]/15 pt-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#B3262D]">
                Next Round
              </p>

              <h2 className="mt-4 max-w-[760px] text-[2.3rem] font-black uppercase leading-[0.92] tracking-[-0.05em] sm:text-[3rem]">
                Want To Play With
                <span className="text-[#0C352D]"> The Gallaspy?</span>
              </h2>
            </div>

            <Link
              href="/contact"
              className="inline-flex min-h-[50px] items-center justify-center bg-[#10263F] px-8 text-[9px] font-black uppercase tracking-[0.22em] text-white transition hover:bg-[#B3262D]"
            >
              Request Round Information →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
