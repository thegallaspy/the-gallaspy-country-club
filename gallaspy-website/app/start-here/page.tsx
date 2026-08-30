import Link from "next/link";

export const metadata = {
  title: "The First Tee | Start Here | The Gallaspy",
  description:
    "Start here with The Gallaspy. Discover how to play, compete, gather, and become part of the community being established today.",
};

const paths = [
  {
    number: "01",
    eyebrow: "Play",
    title: "Gallaspy Rounds",
    text: "Recurring golf gatherings at selected courses. Different courses, familiar faces, and a simple way to begin playing with The Gallaspy.",
    href: "/rounds",
    cta: "Play a Round",
  },
  {
    number: "02",
    eyebrow: "Belong",
    title: "The Founding 100",
    text: "The Falcon Society is the Founding 100 of The Gallaspy — the first 100 confirmed individuals and families selected into the opening chapter of the community.",
    href: "/falcon-society",
    cta: "Explore the Founding 100",
  },
  {
    number: "03",
    eyebrow: "Compete",
    title: "The Gallaspy Invitational",
    text: "The flagship annual tournament of The Gallaspy. The first Invitational is scheduled for June 21, 2027.",
    href: "/invitational",
    cta: "The Invitational",
  },
  {
    number: "04",
    eyebrow: "Tradition",
    title: "The Mercury Match",
    text: "The annual Crest vs. Falcon team championship. Team Crest in forest green. Team Falcon in navy. Two Houses. One Club. One Match.",
    href: "/mercury-match",
    cta: "The Mercury Match",
  },
];

export default function StartHerePage() {
  return (
    <main className="bg-[#F7F4EE] text-[#10263F]">
      {/* HERO */}
      <section className="bg-[#10263F] px-5 pb-20 pt-32 text-white sm:px-8 sm:pt-36 lg:pb-28 lg:pt-40">
        <div className="mx-auto max-w-[1120px]">
          <p className="text-[10px] font-bold uppercase tracking-[0.36em] text-[#D7B56D]">
            Start Here
          </p>

          <h1 className="mt-6 max-w-5xl font-serif text-[4rem] font-light leading-[0.9] sm:text-7xl lg:text-[6.5rem]">
            The First
            <span className="block text-[#D7B56D]">Tee.</span>
          </h1>

          <div className="mt-10 grid gap-8 border-t border-white/15 pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <p className="max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
              The Gallaspy is a golf community being built through the things
              that make a club matter: playing together, competition,
              gatherings, relationships, and traditions worth returning to.
            </p>

            <p className="font-serif text-xl text-[#D7B56D] sm:text-2xl">
              Play. Compete. Gather.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT IS THE GALLASPY */}
      <section className="px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              What Is The Gallaspy?
            </p>
          </div>

          <div>
            <h2 className="max-w-3xl font-serif text-[2.8rem] font-light leading-[1.05] sm:text-5xl">
              A golf club being
              <span className="block text-[#8B6A34]">established in real time.</span>
            </h2>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-[#33475B]/75 sm:text-base sm:leading-8">
              Today, The Gallaspy is establishing its community through golf
              rounds, annual competitions, gatherings, and club traditions
              across Georgia.
            </p>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#33475B]/75 sm:text-base sm:leading-8">
              The long-term vision is a permanent private golf and country
              club. A permanent home has not yet been established. Until then,
              the club is being built through participation rather than
              waiting for a property to define it.
            </p>

            <p className="mt-7 font-serif text-2xl text-[#10263F]">
              Until then, we play.
            </p>
          </div>
        </div>
      </section>

      {/* FOUR PATHS */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1120px]">
          <div className="border-b border-[#10263F]/15 pb-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Find Your Starting Point
            </p>

            <h2 className="mt-4 font-serif text-[2.8rem] font-light leading-[1.05] sm:text-5xl">
              There is more than one
              <span className="block text-[#8B6A34]">way to begin.</span>
            </h2>
          </div>

          <div>
            {paths.map((path) => (
              <article
                key={path.number}
                className="grid gap-6 border-b border-[#10263F]/15 py-10 md:grid-cols-[70px_1fr] lg:grid-cols-[80px_300px_1fr_auto] lg:items-center lg:gap-10"
              >
                <p className="font-serif text-2xl font-light text-[#B89146]">
                  {path.number}
                </p>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#8B6A34]">
                    {path.eyebrow}
                  </p>

                  <h3 className="mt-2 font-serif text-2xl font-light sm:text-3xl">
                    {path.title}
                  </h3>
                </div>

                <p className="max-w-xl text-sm leading-7 text-[#33475B]/70">
                  {path.text}
                </p>

                <Link
                  href={path.href}
                  className="inline-flex items-center text-[9px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:text-[#B89146]"
                >
                  {path.cta}
                  <span className="ml-3 text-[#B89146]">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW THE YEAR WORKS */}
      <section className="bg-[#0C352D] px-5 py-16 text-white sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D7B56D]">
              The Club Year
            </p>

            <h2 className="mt-5 font-serif text-[2.8rem] font-light leading-[1.05] sm:text-5xl">
              A rhythm worth
              <span className="block text-[#D7B56D]">returning to.</span>
            </h2>
          </div>

          <div className="border-t border-white/15">
            {[
              ["March", "Opening Drive", "The ceremonial beginning of the golf season."],
              ["June", "The Gallaspy Invitational", "The flagship annual 18-hole individual stroke-play championship."],
              ["September", "The Mercury Match", "Eight singles matches. Crest vs. Falcon. One team champion."],
              ["December", "Night at the Nest", "The annual year-end gathering, beginning in 2027."],
            ].map(([month, event, text]) => (
              <div
                key={event}
                className="grid gap-4 border-b border-white/15 py-6 sm:grid-cols-[145px_1fr] sm:items-start"
              >
                <p className="whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.22em] text-[#D7B56D]">
                  {month}
                </p>

                <div>
                  <h3 className="font-serif text-xl text-white">{event}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/50">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className="px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
                What Happens Next?
              </p>

              <h2 className="mt-5 max-w-3xl font-serif text-[2.8rem] font-light leading-[1.05] sm:text-5xl">
                The next chapter is
                <span className="block text-[#8B6A34]">already on the calendar.</span>
              </h2>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-[#33475B]/75 sm:text-base sm:leading-8">
                Follow the Club Calendar for upcoming Gallaspy Rounds,
                competitions, gatherings, registration announcements, and
                confirmed event details.
              </p>
            </div>

            <Link
              href="/calendar"
              className="inline-flex min-h-[50px] items-center justify-center bg-[#10263F] px-8 text-[9px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#0C352D]"
            >
              View Club Calendar →
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#10263F] px-5 py-14 text-white sm:px-8 lg:py-16">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#D7B56D]">
              Start Somewhere
            </p>

            <h2 className="mt-4 max-w-2xl font-serif text-3xl font-light sm:text-4xl">
              The easiest way to understand The Gallaspy is to be part of it.
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/rounds"
              className="inline-flex min-h-[48px] items-center justify-center bg-[#D7B56D] px-7 text-[9px] font-bold uppercase tracking-[0.22em] text-[#10263F] transition hover:bg-white"
            >
              Play a Round
            </Link>

            <Link
              href="/falcon-society"
              className="inline-flex min-h-[48px] items-center justify-center border border-white/25 px-7 text-[9px] font-bold uppercase tracking-[0.22em] text-white transition hover:border-white"
            >
              Founding Community
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
