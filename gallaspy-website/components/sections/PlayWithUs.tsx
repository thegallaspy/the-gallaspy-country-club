import Link from "next/link";

const pillars = [
  {
    number: "01",
    title: "Play",
    lines: ["Rounds.", "Games.", "New Courses.", "New People."],
    href: "/play",
    cta: "Find Your Next Round",
    theme: "navy",
  },
  {
    number: "02",
    title: "Compete",
    lines: ["Matches.", "Tournaments.", "Leaderboards.", "Pressure."],
    href: "/invitational",
    cta: "See Competition",
    theme: "green",
  },
  {
    number: "03",
    title: "Gather",
    lines: ["Club Nights.", "Events.", "Community.", "Traditions."],
    href: "/traditions",
    cta: "See The Traditions",
    theme: "cream",
  },
];

export default function PlayWithUs() {
  return (
    <section className="overflow-hidden bg-[#F3EFE6]">
      {/* HEADER */}
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#B3262D]" />

              <p className="text-[8px] font-black uppercase tracking-[0.34em] text-[#8B6A34]">
                How The Club Moves
              </p>
            </div>

            <h2 className="mt-4 text-[2.9rem] font-black uppercase leading-[0.82] tracking-[-0.06em] text-[#10263F] sm:text-[4.2rem] lg:text-[4.8rem]">
              Play.
              <span className="text-[#B3262D]"> Compete.</span>
              <span className="block">Gather.</span>
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="max-w-[520px] font-serif text-lg font-light leading-7 text-[#10263F]/70 sm:text-xl">
              The club starts with
              <span className="italic text-[#8B6A34]">
                {" "}
                the people who play.
              </span>
            </p>

            <p className="mt-3 max-w-[520px] text-sm leading-6 text-[#10263F]/48">
              Rounds become matches. Matches become events. Events become the
              traditions that shape The Gallaspy.
            </p>
          </div>
        </div>
      </div>

      {/* COMPACT PILLARS */}
      <div className="grid lg:grid-cols-3">
        {pillars.map((pillar) => {
          const isNavy = pillar.theme === "navy";
          const isGreen = pillar.theme === "green";
          const isDark = isNavy || isGreen;

          return (
            <article
              key={pillar.title}
              className={`group relative overflow-hidden border-t ${
                isNavy
                  ? "border-white/10 bg-[#10263F] text-white"
                  : isGreen
                    ? "border-white/10 bg-[#0C352D] text-white"
                    : "border-[#10263F]/15 bg-[#F8F5EE] text-[#10263F]"
              } lg:border-l lg:first:border-l-0`}
            >
              <div
                className={`pointer-events-none absolute right-2 top-0 text-[7rem] font-black leading-none tracking-[-0.09em] sm:text-[8.5rem] ${
                  isDark ? "text-white/[0.04]" : "text-[#10263F]/[0.04]"
                }`}
              >
                {pillar.number}
              </div>

              <div className="relative z-10 p-7 sm:p-8 lg:p-9">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[1.6rem] font-black tracking-[-0.05em] ${
                      isDark ? "text-[#E15A60]" : "text-[#B3262D]"
                    }`}
                  >
                    {pillar.number}
                  </span>

                  <span
                    className={`h-[3px] w-10 ${
                      isDark ? "bg-[#FFD76A]" : "bg-[#B89146]"
                    }`}
                  />
                </div>

                <h3 className="mt-5 text-[2.8rem] font-black uppercase leading-[0.84] tracking-[-0.06em] sm:text-[3.3rem]">
                  {pillar.title}
                </h3>

                <div className="mt-6 flex flex-wrap gap-x-2 gap-y-1">
                  {pillar.lines.map((line) => (
                    <span
                      key={line}
                      className={`text-[0.95rem] font-black uppercase tracking-[-0.02em] sm:text-[1rem] ${
                        isDark ? "text-white/72" : "text-[#10263F]/68"
                      }`}
                    >
                      {line}
                    </span>
                  ))}
                </div>

                <div
                  className={`mt-8 border-t pt-5 ${
                    isDark ? "border-white/15" : "border-[#10263F]/15"
                  }`}
                >
                  <Link
                    href={pillar.href}
                    className={`text-[8px] font-black uppercase tracking-[0.22em] transition ${
                      isDark
                        ? "text-[#FFD76A] hover:text-white"
                        : "text-[#10263F] hover:text-[#B3262D]"
                    }`}
                  >
                    {pillar.cta} →
                  </Link>
                </div>
              </div>

              <div
                className={`absolute bottom-0 left-0 h-[5px] w-0 transition-all duration-500 group-hover:w-full ${
                  pillar.title === "Play"
                    ? "bg-[#B3262D]"
                    : pillar.title === "Compete"
                      ? "bg-[#FFD76A]"
                      : "bg-[#0C352D]"
                }`}
              />
            </article>
          );
        })}
      </div>

      {/* SPORT STRIP */}
      <div className="bg-[#B3262D]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 overflow-hidden px-5 py-3 sm:px-8 lg:px-10">
          {[
            "ROUNDS",
            "MATCHES",
            "EVENTS",
            "TRADITIONS",
            "THE GALLASPY",
          ].map((item) => (
            <span
              key={item}
              className="shrink-0 text-[7px] font-black uppercase tracking-[0.3em] text-white"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
