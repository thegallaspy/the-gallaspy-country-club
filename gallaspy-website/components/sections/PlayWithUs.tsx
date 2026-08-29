import Link from "next/link";

const pillars = [
  {
    number: "01",
    title: "Play",
    description: "Club rounds, new courses, games, and more chances to tee it up.",
    href: "/play",
    cta: "Find Your Next Round",
  },
  {
    number: "02",
    title: "Compete",
    description: "Matches, tournaments, leaderboards, and the pressure that makes it matter.",
    href: "/invitational",
    cta: "See Competition",
  },
  {
    number: "03",
    title: "Gather",
    description: "Club nights, events, and the traditions that grow beyond the scorecard.",
    href: "/traditions",
    cta: "See The Traditions",
  },
];

export default function PlayWithUs() {
  return (
    <section className="bg-[#F3EFE6] text-[#10263F]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="flex flex-col gap-5 border-b border-[#10263F]/15 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#B3262D]">
              How The Club Moves
            </p>

            <h2 className="mt-3 text-[2.4rem] font-black uppercase leading-[0.9] tracking-[-0.045em] sm:text-[3.2rem]">
              Play. Compete. Gather.
            </h2>
          </div>

          <p className="max-w-[520px] text-sm leading-6 text-[#10263F]/60 sm:text-base">
            The Gallaspy is built through the rounds we play, the competition
            we create, and the people who keep showing up.
          </p>
        </div>

        <div className="mt-8 divide-y divide-[#10263F]/15 border-y border-[#10263F]/15">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="grid gap-5 py-7 sm:grid-cols-[80px_180px_1fr_auto] sm:items-center sm:gap-6"
            >
              <div className="flex items-center gap-3 sm:block">
                <span className="text-[1.1rem] font-black text-[#B3262D]">
                  {pillar.number}
                </span>

                <span className="h-px w-8 bg-[#B89146] sm:mt-3 sm:block" />
              </div>

              <h3 className="text-[1.8rem] font-black uppercase tracking-[-0.04em] sm:text-[2rem]">
                {pillar.title}
              </h3>

              <p className="max-w-[620px] text-sm leading-6 text-[#10263F]/60">
                {pillar.description}
              </p>

              <Link
                href={pillar.href}
                className="text-[8px] font-black uppercase tracking-[0.22em] text-[#10263F] transition hover:text-[#B3262D]"
              >
                {pillar.cta} →
              </Link>
            </article>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4">
        <div className="h-[6px] bg-[#10263F]" />
        <div className="h-[6px] bg-[#B3262D]" />
        <div className="h-[6px] bg-[#FFD76A]" />
        <div className="h-[6px] bg-[#0C352D]" />
      </div>
    </section>
  );
}