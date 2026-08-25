const principles = [
  {
    number: "01",
    eyebrow: "Built With Purpose",
    title: "Developed With Intention",
    description:
      "The Gallaspy is a long-term private golf and lifestyle vision being built thoughtfully from the ground up. Each step is intended to strengthen the foundation for the property, partnerships, experiences, and traditions that will follow.",
  },
  {
    number: "02",
    eyebrow: "Rooted in Family",
    title: "Created for Generations",
    description:
      "Family, tradition, hospitality, and legacy sit at the center of The Gallaspy. The goal is to create something meaningful enough to be experienced, remembered, and carried forward across generations.",
  },
  {
    number: "03",
    eyebrow: "Golf at the Center",
    title: "Championship Golf Anchors the Vision",
    description:
      "The future club begins with golf. Around that foundation, The Gallaspy is envisioned to bring together hospitality, dining, wellness, recreation, events, and community in one complete private-club experience.",
  },
];

export default function WhyGallaspy() {
  return (
    <section className="relative overflow-hidden bg-[#F2ECE1] px-5 py-20 text-[#10263F] sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="absolute left-0 top-0 h-px w-full bg-[#10263F]/10" />

      <div className="mx-auto w-full max-w-6xl">
        {/* INTRO */}
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-20">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#9A793A] sm:text-xs">
              Why The Gallaspy
            </p>

            <h2 className="mt-5 max-w-xl font-serif text-[2.7rem] font-light leading-[0.98] tracking-[-0.02em] sm:text-5xl lg:text-[4.1rem]">
              More Than a Club.
              <span className="block italic text-[#B89146]">
                A Legacy in the Making.
              </span>
            </h2>

            <div className="mt-7 h-px w-16 bg-[#B89146]" />
          </div>

          <div className="max-w-2xl lg:border-l lg:border-[#10263F]/12 lg:pl-12">
            <p className="font-serif text-2xl font-light leading-relaxed text-[#10263F] sm:text-3xl">
              The Gallaspy is being built around a simple idea: create
              something meaningful enough to outlast the people who started it.
            </p>

            <p className="mt-6 text-sm leading-7 text-[#52605A] sm:text-base sm:leading-8">
              The long-term vision extends beyond developing a golf course. It
              is about creating a place centered on competition, hospitality,
              relationships, family tradition, and a lasting sense of
              belonging.
            </p>
          </div>
        </div>

        {/* PRINCIPLES */}
        <div className="mt-16 grid border-y border-[#10263F]/12 lg:grid-cols-3">
          {principles.map((principle, index) => (
            <article
              key={principle.number}
              className={`group px-1 py-9 sm:px-7 lg:min-h-[340px] lg:px-8 lg:py-10 ${
                index !== principles.length - 1
                  ? "border-b border-[#10263F]/12 lg:border-b-0 lg:border-r"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between gap-6">
                <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#9A793A]">
                  {principle.eyebrow}
                </p>

                <span className="font-serif text-3xl font-light text-[#10263F]/15 transition duration-300 group-hover:text-[#B89146]">
                  {principle.number}
                </span>
              </div>

              <h3 className="mt-8 max-w-sm font-serif text-[2rem] font-light leading-[1.08] text-[#10263F]">
                {principle.title}
              </h3>

              <div className="mt-6 h-px w-10 bg-[#B89146] transition-all duration-300 group-hover:w-16" />

              <p className="mt-6 text-sm leading-7 text-[#59666D]">
                {principle.description}
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}