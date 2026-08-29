import Link from "next/link";

export default function ClubIntroduction() {
  return (
    <section className="relative overflow-hidden bg-[#10263F] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-18">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.34em] text-[#FFD76A]">
                The Gallaspy
              </p>

              <div className="mt-5 h-[2px] w-16 bg-[#B3262D]" />

              <p className="mt-5 text-[10px] font-black uppercase tracking-[0.24em] text-white/50">
                Georgia · Est. 2026
              </p>
            </div>

            <p className="mt-10 max-w-[240px] text-xs font-bold uppercase leading-6 tracking-[0.14em] text-white/45 lg:mt-0">
              Golf first.
              <br />
              Community follows.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#E56A70]" />

              <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#FFD76A]">
                Built Through The Game
              </p>
            </div>

            <h2 className="mt-5 max-w-[850px] text-[2.35rem] font-black uppercase leading-[0.92] tracking-[-0.045em] sm:text-[3.4rem] lg:text-[4.4rem]">
              A Golf Club
              <span className="block text-white/45">
                You Actually Play In.
              </span>
            </h2>

            <div className="mt-7 grid gap-7 border-t border-white/15 pt-7 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-[650px] text-sm leading-7 text-white/65 sm:text-base">
                The Gallaspy brings golfers together through rounds,
                competition, events, apparel, and the traditions that form when
                people keep showing up.
              </p>

              <Link
                href="/the-club"
                className="inline-flex items-center gap-3 text-[8px] font-black uppercase tracking-[0.24em] text-white transition hover:text-[#FFD76A]"
              >
                Inside The Club
                <span className="text-[#E56A70]">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 border-t border-white/10">
        <div className="bg-[#0C352D] px-5 py-4 text-center">
          <p className="text-[8px] font-black uppercase tracking-[0.24em] text-white">
            Play
          </p>
        </div>

        <div className="bg-[#B3262D] px-5 py-4 text-center">
          <p className="text-[8px] font-black uppercase tracking-[0.24em] text-white">
            Compete
          </p>
        </div>

        <div className="bg-[#F3EFE6] px-5 py-4 text-center">
          <p className="text-[8px] font-black uppercase tracking-[0.24em] text-[#10263F]">
            Gather
          </p>
        </div>
      </div>
    </section>
  );
}