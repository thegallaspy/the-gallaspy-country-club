import Link from "next/link";

const pillars = [
  {
    title: "Play",
    text: "Regular rounds that bring golfers together across Georgia.",
  },
  {
    title: "Compete",
    text: "Competition that grows into traditions worth returning to.",
  },
  {
    title: "Gather",
    text: "Relationships and experiences that extend beyond eighteen holes.",
  },
];

export default function ClubIntroduction() {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-20 text-[#10263F] sm:px-8 sm:py-24 lg:px-10 lg:py-32">
      <div className="pointer-events-none absolute -right-28 top-10 h-[360px] w-[360px] rounded-full bg-[#B89146]/[0.045] blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.34em] text-[#B89146] sm:text-[10px] sm:tracking-[0.4em]">
              The Club
            </p>

            <div className="mt-5 h-px w-12 bg-[#B89146]" />

            <p className="mt-8 max-w-[280px] text-[10px] font-semibold uppercase leading-6 tracking-[0.22em] text-[#10263F]/42">
              Georgia · Est. 2026
            </p>
          </div>

          <div>
            <h2 className="max-w-[860px] font-serif text-[2.8rem] font-light leading-[0.96] tracking-[-0.03em] text-[#10263F] sm:text-[3.8rem] md:text-[4.5rem] lg:text-[5.2rem]">
              A club starts
              <span className="block text-[#8B6A34]">with people.</span>
            </h2>

            <div className="mt-8 max-w-[760px] space-y-6 text-[15px] font-light leading-7 text-[#10263F]/68 sm:text-[17px] sm:leading-8">
              <p>
                Most people meet a golf club after the course is built, the
                clubhouse is finished, and the traditions have already been
                established.
              </p>

              <p className="font-serif text-[1.6rem] font-light leading-relaxed text-[#10263F] sm:text-[2rem]">
                We&apos;re starting somewhere else.
              </p>

              <p>
                The Gallaspy Golf Club is bringing golfers together now —
                playing courses throughout Georgia, creating competition,
                gathering beyond the course, and building the relationships
                that give a club its meaning.
              </p>

              <p className="font-medium text-[#10263F]">
                The permanent home comes later. The club starts now.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href="/play"
                className="group inline-flex min-h-[50px] items-center justify-center border border-[#10263F] bg-[#10263F] px-7 text-[9px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-transparent hover:text-[#10263F] sm:px-8 sm:text-[10px]"
              >
                Play With The Gallaspy
                <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/why-the-gallaspy"
                className="group inline-flex items-center text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34] transition-colors duration-300 hover:text-[#10263F] sm:text-[10px]"
              >
                Our Story
                <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-20 border-y border-[#10263F]/10 py-12 sm:mt-24 sm:py-14 lg:mt-28">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#B89146]">
              What Makes a Club
            </p>

            <p className="max-w-[860px] font-serif text-[2rem] font-light leading-[1.15] tracking-[-0.02em] text-[#10263F] sm:text-[2.7rem] lg:text-[3.25rem]">
              A course gives you somewhere to play.
              <span className="block italic text-[#8B6A34]">
                The people give you a reason to return.
              </span>
            </p>
          </div>
        </div>

        <div className="grid border-b border-[#10263F]/10 sm:grid-cols-3">
          {pillars.map((pillar, index) => (
            <article
              key={pillar.title}
              className={`group py-9 sm:px-7 sm:py-10 ${
                index !== pillars.length - 1
                  ? "border-b border-[#10263F]/10 sm:border-b-0 sm:border-r"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between gap-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#B89146]">
                  {pillar.title}
                </p>

                <span className="font-serif text-3xl font-light text-[#10263F]/10 transition-colors duration-300 group-hover:text-[#B89146]">
                  0{index + 1}
                </span>
              </div>

              <div className="mt-5 h-px w-9 bg-[#B89146] transition-all duration-300 group-hover:w-14" />

              <p className="mt-5 max-w-[300px] text-sm font-light leading-6 text-[#10263F]/60">
                {pillar.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
