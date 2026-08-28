import Link from "next/link";

export default function ClubIntroduction() {
  return (
    <section className="relative overflow-hidden bg-[#F3EFE6] text-[#10263F]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.34em]">
              The Club
            </p>

            <div className="mt-5 h-px w-14 bg-[#B89146]" />

            <p className="mt-4 text-[10px] font-black uppercase tracking-[0.26em] text-[#10263F]/55">
              Georgia · Est. 2026
            </p>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#B3262D]" />

              <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#8B6A34]">
                Built From The Game Outward
              </p>
            </div>

            <h2 className="mt-5 max-w-[880px] text-[2.7rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[3.8rem] lg:text-[4.5rem]">
              The permanent home

              <span className="block font-serif font-light normal-case italic tracking-[-0.035em] text-[#8B6A34]">
                can come later.
              </span>
            </h2>

            <div className="mt-7 grid gap-6 border-t border-[#10263F]/15 pt-7 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-[680px] text-sm leading-7 text-[#10263F]/60 sm:text-base">
                The Gallaspy begins with rounds, competition, gatherings,
                apparel, and the people who continue showing up. The identity
                is being built now.
              </p>

              <Link
                href="/the-club"
                className="text-[8px] font-black uppercase tracking-[0.24em] text-[#10263F] transition hover:text-[#B3262D]"
              >
                Inside The Club →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[6px]">
        <div className="w-[55%] bg-[#10263F]" />
        <div className="w-[20%] bg-[#B3262D]" />
        <div className="flex-1 bg-[#0C352D]" />
      </div>
    </section>
  );
}
