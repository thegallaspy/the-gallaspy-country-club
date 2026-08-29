import Link from "next/link";

export default function JoinBeginning() {
  return (
    <section className="relative overflow-hidden bg-[#10263F] text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-14">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#B3262D]" />

              <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#FFD76A]">
                Join The Club
              </p>
            </div>

            <p className="mt-5 max-w-[330px] text-sm leading-6 text-white/50">
              Play the rounds. Show up for the events. Be part of what The
              Gallaspy becomes.
            </p>
          </div>

          <div>
            <h2 className="max-w-[760px] text-[2.4rem] font-black uppercase leading-[0.9] tracking-[-0.045em] sm:text-[3.2rem] lg:text-[3.8rem]">
              Come Play
              <span className="block text-[#E56A70]">
                With The Gallaspy.
              </span>
            </h2>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/play"
                className="inline-flex min-h-[48px] items-center justify-center bg-[#FFD76A] px-7 text-[8px] font-black uppercase tracking-[0.22em] text-[#10263F] transition hover:bg-white"
              >
                Play With The Club →
              </Link>

              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center justify-center border border-white/25 px-7 text-[8px] font-black uppercase tracking-[0.22em] text-white transition hover:border-[#FFD76A] hover:text-[#FFD76A]"
              >
                Contact The Club →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[8px] font-black uppercase tracking-[0.28em] text-[#FFD76A]">
            The Gallaspy Golf Club
          </p>

          <p className="text-[8px] font-black uppercase tracking-[0.24em] text-white/35">
            Georgia · Est. 2026
          </p>
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