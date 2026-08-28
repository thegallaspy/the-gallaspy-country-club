import Link from "next/link";

const principles = [
  {
    number: "01",
    title: "Built Through Play",
    text: "The Gallaspy begins with golfers showing up, playing together, and creating a reason to return.",
  },
  {
    number: "02",
    title: "Built Through Competition",
    text: "Matches and events create energy, identity, and traditions that become part of the club over time.",
  },
  {
    number: "03",
    title: "Built Through Community",
    text: "A club becomes meaningful when the relationships extend beyond the scorecard.",
  },
];

export default function TheClubPage() {
  return (
    <main className="bg-white text-[#10263F]">
      <section className="relative overflow-hidden bg-[#10263F] px-5 pb-20 pt-36 text-white sm:px-8 sm:pb-24 sm:pt-40 lg:px-10 lg:pb-32 lg:pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,145,70,0.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <p className="text-[9px] font-semibold uppercase tracking-[0.36em] text-[#FFD76A] sm:text-[10px]">
            The Club
          </p>

          <div className="mt-5 h-px w-12 bg-[#FFD76A]" />

          <h1 className="mt-10 max-w-[980px] font-serif text-[3.5rem] font-light leading-[0.94] tracking-[-0.035em] sm:text-[4.8rem] md:text-[5.8rem] lg:text-[6.6rem]">
            A golf club
            <span className="block italic text-[#FFD76A]">
              being built through the game.
            </span>
          </h1>

          <p className="mt-8 max-w-[780px] text-[16px] font-light leading-8 text-white/68 sm:text-[18px]">
            The Gallaspy Golf Club is starting with the people, the rounds,
            the competition, and the traditions that give a club its meaning.
          </p>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.34em] text-[#8B6A34]">
                Our Beginning
              </p>

              <div className="mt-5 h-px w-12 bg-[#B89146]" />
            </div>

            <div>
              <h2 className="max-w-[900px] font-serif text-[2.8rem] font-light leading-[0.98] tracking-[-0.03em] sm:text-[3.8rem] md:text-[4.6rem] lg:text-[5.2rem]">
                Most clubs begin
                <span className="block italic text-[#8B6A34]">
                  after the course is built.
                </span>
              </h2>

              <div className="mt-8 max-w-[780px] space-y-6 text-[15px] font-light leading-7 text-[#10263F]/68 sm:text-[17px] sm:leading-8">
                <p>
                  The Gallaspy is beginning earlier — before a permanent home,
                  before decades of history, and before the traditions are
                  already established.
                </p>

                <p>
                  That gives the people who participate now something rare:
                  the opportunity to help shape the culture of the club from
                  its earliest chapters.
                </p>

                <p className="font-medium text-[#10263F]">
                  The permanent home is part of the future. The club is part
                  of the present.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 grid border-t border-[#10263F]/10 sm:mt-20 lg:grid-cols-3">
            {principles.map((item, index) => (
              <article
                key={item.title}
                className={`py-10 lg:px-8 lg:py-12 ${
                  index !== principles.length - 1
                    ? "border-b border-[#10263F]/10 lg:border-b-0 lg:border-r"
                    : ""
                }`}
              >
                <p className="text-[8px] font-semibold uppercase tracking-[0.28em] text-[#8B6A34]">
                  {item.number}
                </p>

                <h2 className="mt-5 font-serif text-[2rem] font-light tracking-[-0.02em] sm:text-[2.35rem]">
                  {item.title}
                </h2>

                <div className="mt-5 h-px w-10 bg-[#B89146]" />

                <p className="mt-5 max-w-[330px] text-sm font-light leading-7 text-[#10263F]/60">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7F4EE] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#8B6A34]">
                Be Part Of It
              </p>

              <h2 className="mt-5 max-w-[820px] font-serif text-[2.5rem] font-light leading-[1.05] tracking-[-0.025em] sm:text-[3.4rem]">
                The best way to understand the club
                <span className="block italic text-[#8B6A34]">
                  is to play with it.
                </span>
              </h2>
            </div>

            <Link
              href="/play"
              className="inline-flex min-h-[52px] items-center justify-center border border-[#10263F] bg-[#10263F] px-8 text-[9px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-transparent hover:text-[#10263F]"
            >
              Play With Us →
            </Link>
          </div>
        </div>
      </section>
    
      {/* CLUB BOARD */}
      <section className="bg-[#10263F] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-[#B3262D]" />
                <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#FFD76A]">
                  Around The Club
                </p>
              </div>

              <h2 className="mt-5 max-w-[680px] text-[2.8rem] font-black uppercase leading-[0.86] tracking-[-0.055em] sm:text-[3.8rem]">
                Golf first.
                <span className="block font-serif font-light normal-case italic tracking-[-0.035em] text-white/72">
                  The calendar follows.
                </span>
              </h2>

              <p className="mt-6 max-w-[650px] text-sm leading-7 text-white/48">
                The Gallaspy calendar will grow through rounds, matches,
                tournaments, and gatherings as the club continues to take shape.
              </p>
            </div>

            {/* PINNED NOTE */}
            <aside className="relative rotate-[1deg] bg-[#F2E6B8] p-6 text-[#10263F] shadow-[0_25px_55px_rgba(0,0,0,0.28)] sm:p-7">
              <div className="absolute left-1/2 top-[-8px] h-4 w-4 -translate-x-1/2 rounded-full bg-[#B3262D] shadow-sm" />

              <div className="border-b border-[#10263F]/15 pb-4">
                <p className="text-[8px] font-black uppercase tracking-[0.28em] text-[#8B6A34]">
                  On The Board
                </p>

                <h3 className="mt-2 font-serif text-2xl font-semibold italic">
                  Upcoming
                </h3>
              </div>

              <div className="py-5">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-[0.22em] text-[#B3262D]">
                      Invitation Only
                    </p>
                    <p className="mt-2 text-lg font-black uppercase tracking-[-0.025em]">
                      First Flight
                    </p>
                  </div>

                  <span className="text-[8px] font-black uppercase tracking-[0.18em] text-[#10263F]/35">
                    01
                  </span>
                </div>
              </div>

              <div className="border-t border-[#10263F]/15 py-5">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-[0.22em] text-[#8B6A34]">
                      Flagship Tournament
                    </p>
                    <p className="mt-2 text-lg font-black uppercase leading-tight tracking-[-0.025em]">
                      The Gallaspy Invitational
                    </p>
                    <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.16em] text-[#10263F]/50">
                      June 21, 2027
                    </p>
                  </div>

                  <span className="text-[8px] font-black uppercase tracking-[0.18em] text-[#10263F]/35">
                    02
                  </span>
                </div>
              </div>

              <div className="border-t border-[#10263F]/15 pt-5">
                <Link
                  href="/play"
                  className="text-[8px] font-black uppercase tracking-[0.22em] text-[#10263F] transition hover:text-[#B3262D]"
                >
                  View Club Activity →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

</main>
  );
}
