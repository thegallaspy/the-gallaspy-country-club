import Link from "next/link";

const founders = [
  {
    name: "Cameron Gallaspy-Davis",
    role: "Founder & Managing Member",
    bio:
      "Cameron leads the long-term vision for The Gallaspy, including the club concept, Invitational, development strategy, brand partnerships, and the effort to identify the right Georgia property for the future club.",
  },
  {
    name: "Deja McCoy",
    role: "Co-Founder & Managing Member",
    bio:
      "Deja helps shape the future of The Gallaspy through brand development, hospitality vision, member experience, partnership strategy, and the broader mission of building something designed to endure across generations.",
  },
];

export default function Founders() {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-20 text-[#10263F] sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto w-full max-w-6xl">
        {/* INTRO */}
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-20">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#9A793A] sm:text-xs">
              Leadership
            </p>

            <h2 className="mt-5 max-w-xl font-serif text-[2.7rem] font-light leading-[0.98] tracking-[-0.02em] sm:text-5xl lg:text-[4rem]">
              Meet the
              <span className="block italic text-[#B89146]">
                Founders
              </span>
            </h2>

            <div className="mt-7 h-px w-16 bg-[#B89146]" />
          </div>

          <div className="max-w-2xl lg:border-l lg:border-[#10263F]/12 lg:pl-12">
            <p className="font-serif text-2xl font-light leading-relaxed text-[#10263F] sm:text-3xl">
              The Gallaspy is being built with a long-term commitment to golf,
              hospitality, family, and legacy.
            </p>

            <p className="mt-6 text-sm leading-7 text-[#52605A] sm:text-base sm:leading-8">
              The project is being developed through The Gallaspy Development
              Group, LLC, with a focus on building the brand, community,
              partnerships, events, and foundation needed to support the future
              club vision.
            </p>
          </div>
        </div>

        {/* FOUNDERS */}
        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {founders.map((founder, index) => (
            <article
              key={founder.name}
              className="group relative overflow-hidden rounded-[24px] border border-[#10263F]/10 bg-[#F7F4EE] px-7 py-9 transition duration-300 hover:-translate-y-1 hover:border-[#B89146]/40 hover:shadow-[0_20px_55px_rgba(16,38,63,0.09)] sm:px-9 sm:py-10"
            >
              <div className="absolute right-6 top-4 font-serif text-[5rem] font-light leading-none text-[#10263F]/[0.035] sm:text-[7rem]">
                0{index + 1}
              </div>

              <div className="relative z-10">
                <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#9A793A]">
                  {founder.role}
                </p>

                <h3 className="mt-5 max-w-md font-serif text-[2.35rem] font-light leading-[1.02] text-[#10263F] sm:text-[2.8rem]">
                  {founder.name}
                </h3>

                <div className="mt-6 h-px w-12 bg-[#B89146] transition-all duration-300 group-hover:w-20" />

                <p className="mt-6 max-w-xl text-sm leading-7 text-[#59666D] sm:text-base sm:leading-8">
                  {founder.bio}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* COMPANY PANEL */}
        <div className="mt-8 overflow-hidden rounded-[24px] bg-[#10263F] px-7 py-9 text-white shadow-[0_24px_65px_rgba(16,38,63,0.14)] sm:px-10 sm:py-11 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-[#FFD76A]">
                The Parent Company
              </p>

              <h3 className="mt-4 font-serif text-3xl font-light leading-tight sm:text-4xl">
                The Gallaspy Development Group, LLC
              </h3>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/68 sm:text-base sm:leading-8">
                The Gallaspy Development Group, LLC is the business entity
                guiding the development of The Gallaspy Golf &amp; Country Club
                vision and The Gallaspy Invitational.
              </p>
            </div>

            <div className="lg:border-l lg:border-white/15 lg:pl-10">
              <p className="text-sm leading-7 text-white/68">
                The current focus is on building the foundation: establishing
                the brand, producing the inaugural Invitational, developing
                partnerships, growing the future membership community, and
                identifying the right long-term development opportunity.
              </p>

              <Link
                href="/founders-letter"
                className="group mt-7 inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#FFD76A] px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#FFD76A] hover:text-[#10263F]"
              >
                Read the Founders&apos; Letter

                <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}