import Link from "next/link";

export default function ClubIntroduction() {
  return (
    <section className="relative overflow-hidden bg-[#10263F] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:items-end lg:gap-20">
          
          {/* CLUB IDENTITY */}
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.34em] text-[#FFD76A]">
              The Gallaspy
            </p>

            <div className="mt-5 h-[2px] w-16 bg-[#B3262D]" />

            <p className="mt-5 text-[10px] font-black uppercase tracking-[0.24em] text-white/50">
              Georgia · Est. 2026
            </p>
          </div>

          {/* STATEMENT */}
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#FFD76A]">
              The Club Is In Motion
            </p>

            <h2 className="mt-5 max-w-[900px] text-[2.6rem] font-black uppercase leading-[0.92] tracking-[-0.045em] sm:text-[3.7rem] lg:text-[4.8rem]">
              A Club You Can
              <span className="block text-white/65">
                Be Part Of Now.
              </span>
            </h2>

            <div className="mt-8 grid gap-7 border-t border-white/15 pt-7 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-[660px] text-sm leading-7 text-white/65 sm:text-base">
                The Gallaspy is building its culture through the people who
                play, compete, gather, and return for what comes next.
              </p>

              <Link
                href="/the-club"
                className="inline-flex items-center gap-3 text-[8px] font-black uppercase tracking-[0.24em] text-white transition hover:text-[#FFD76A]"
              >
                Discover The Club
                <span className="text-[#B3262D]">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid h-[5px] grid-cols-4">
        <div className="bg-[#10263F]" />
        <div className="bg-[#0C352D]" />
        <div className="bg-[#B3262D]" />
        <div className="bg-[#FFD76A]" />
      </div>
    </section>
  );
}
