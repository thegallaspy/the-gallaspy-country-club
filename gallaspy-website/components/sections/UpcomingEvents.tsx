import Link from "next/link";

const events = [
  {
    number: "01",
    type: "Invitation Only",
    name: "First Flight",
    description:
      "A private opening gathering for invited players and guests as The Gallaspy begins building its golf community through the game.",
    href: "/contact",
    cta: "Request Information",
    feature: false,
  },
  {
    number: "02",
    type: "Flagship Tournament",
    name: "The Gallaspy Invitational",
    description:
      "The signature competitive event of The Gallaspy. Players will gather for tournament golf, competition, and the traditions that will grow with the club.",
    href: "/invitational",
    cta: "Explore The Invitational",
    feature: true,
  },
];

export default function UpcomingEvents() {
  return (
    <section className="relative overflow-hidden bg-[#071827] text-white">
      {/* TOP SPORT STRIPE */}
      <div className="flex h-[8px]">
        <div className="w-[58%] bg-[#B3262D]" />
        <div className="w-[18%] bg-[#F3EFE6]" />
        <div className="flex-1 bg-[#0C352D]" />
      </div>

      {/* HEADER */}
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8 sm:pb-12 sm:pt-20 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#B3262D]" />

              <p className="text-[8px] font-black uppercase tracking-[0.35em] text-[#FFD76A]">
                Upcoming / 2027 Season
              </p>
            </div>

            <h2 className="mt-5 text-[3.3rem] font-black uppercase leading-[0.82] tracking-[-0.06em] sm:text-[4.6rem] lg:text-[5.5rem]">
              On The
              <span className="block">Calendar.</span>
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="max-w-[540px] font-serif text-xl font-light leading-8 text-white/70 sm:text-2xl">
              The club is being built through
              <span className="italic text-[#FFD76A]"> the game itself.</span>
            </p>

            <p className="mt-4 max-w-[540px] text-sm leading-7 text-white/45">
              Competitive golf, invitation-only gatherings, and the events
              that will become part of The Gallaspy.
            </p>
          </div>
        </div>
      </div>

      {/* EVENTS */}
      <div className="border-t border-white/10">
        {events.map((event) => (
          <article
            key={event.name}
            className={
              event.feature
                ? "group relative overflow-hidden bg-[#0C352D]"
                : "group relative overflow-hidden bg-[#071827]"
            }
          >
            {/* LARGE BACKGROUND NUMBER */}
            <div
              className={`pointer-events-none absolute right-[-2%] top-1/2 -translate-y-1/2 font-black leading-none tracking-[-0.08em] ${
                event.feature
                  ? "text-[12rem] text-[#B3262D]/18 sm:text-[17rem] lg:text-[22rem]"
                  : "text-[10rem] text-white/[0.035] sm:text-[15rem] lg:text-[18rem]"
              }`}
            >
              {event.number}
            </div>

            <div
              className={`relative z-10 mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[135px_1fr_auto] lg:items-center lg:px-10 ${
                event.feature
                  ? "py-14 sm:py-16 lg:py-20"
                  : "py-10 sm:py-12 lg:py-14"
              }`}
            >
              {/* NUMBER */}
              <div>
                <p
                  className={`font-black leading-none tracking-[-0.06em] ${
                    event.feature
                      ? "text-[4.5rem] text-[#E15A60]"
                      : "text-[3.8rem] text-[#B3262D]"
                  }`}
                >
                  {event.number}
                </p>

                <div
                  className={`mt-3 h-[3px] ${
                    event.feature
                      ? "w-14 bg-[#FFD76A]"
                      : "w-10 bg-[#B3262D]"
                  }`}
                />
              </div>

              {/* EVENT COPY */}
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <p
                    className={`text-[8px] font-black uppercase tracking-[0.3em] ${
                      event.feature
                        ? "text-[#FFD76A]"
                        : "text-white/45"
                    }`}
                  >
                    {event.type}
                  </p>

                  <span className="h-1 w-1 rounded-full bg-[#B3262D]" />

                  <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/30">
                    The Gallaspy
                  </p>
                </div>

                <h3
                  className={`mt-4 max-w-[760px] font-black uppercase leading-[0.87] tracking-[-0.055em] ${
                    event.feature
                      ? "text-[3rem] sm:text-[4.2rem] lg:text-[5rem]"
                      : "text-[2.5rem] sm:text-[3.3rem]"
                  }`}
                >
                  {event.name}
                </h3>

                <p className="mt-5 max-w-[650px] text-sm leading-7 text-white/50">
                  {event.description}
                </p>
              </div>

              {/* ACTION */}
              <div className="lg:justify-self-end">
                <Link
                  href={event.href}
                  className={
                    event.feature
                      ? "inline-flex min-h-[52px] items-center justify-center bg-[#FFD76A] px-7 text-[8px] font-black uppercase tracking-[0.22em] text-[#10263F] transition duration-300 hover:-translate-y-1 hover:bg-white"
                      : "inline-flex min-h-[48px] items-center justify-center border border-white/20 px-6 text-[8px] font-black uppercase tracking-[0.22em] text-white transition duration-300 hover:border-[#FFD76A] hover:text-[#FFD76A]"
                  }
                >
                  {event.cta} →
                </Link>
              </div>
            </div>

            {/* ROW DIVIDER */}
            <div
              className={
                event.feature
                  ? "h-px bg-white/10"
                  : "h-px bg-white/[0.07]"
              }
            />
          </article>
        ))}
      </div>

      {/* BOTTOM NOTE */}
      <div className="bg-[#F3EFE6] text-[#10263F]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <p className="text-[8px] font-black uppercase tracking-[0.28em] text-[#8B6A34]">
            More rounds. More matches. More reasons to gather.
          </p>

          <Link
            href="/play"
            className="text-[8px] font-black uppercase tracking-[0.24em] text-[#10263F] transition hover:text-[#B3262D]"
          >
            Play With The Gallaspy →
          </Link>
        </div>
      </div>
    </section>
  );
}
