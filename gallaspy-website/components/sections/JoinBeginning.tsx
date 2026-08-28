import Link from "next/link";

export default function JoinBeginning() {
  return (
    <section className="relative overflow-hidden bg-[#10263F] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,145,70,0.13),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:items-end lg:gap-20">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#B3262D]" />

              <p className="text-[8px] font-black uppercase tracking-[0.34em] text-[#FFD76A]">
                Join The Beginning
              </p>
            </div>

            <p className="mt-6 max-w-[340px] text-sm leading-7 text-white/48">
              The early years only happen once.
            </p>
          </div>

          <div>
            <h2 className="max-w-[900px] text-[3rem] font-black uppercase leading-[0.86] tracking-[-0.06em] text-white sm:text-[4.4rem] lg:text-[5.4rem]">
              Be There
              <span className="block text-[#E56A70]">From The Start.</span>
            </h2>

            <p className="mt-7 max-w-[680px] text-sm leading-7 text-white/60 sm:text-base">
              The Gallaspy is still writing its first chapters. The people,
              rounds, events, and moments happening now will become part of
              what the club is remembered for later.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/play"
                className="inline-flex min-h-[50px] items-center justify-center bg-[#FFD76A] px-8 text-[9px] font-black uppercase tracking-[0.22em] text-[#10263F] transition hover:bg-white"
              >
                Play With The Club →
              </Link>

              <Link
                href="/contact"
                className="inline-flex min-h-[50px] items-center justify-center border border-white/25 px-8 text-[9px] font-black uppercase tracking-[0.22em] text-white transition hover:border-[#FFD76A] hover:text-[#FFD76A]"
              >
                Contact The Club →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-7 sm:mt-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#FFD76A]">
              The Gallaspy Golf Club
            </p>

            <p className="text-[8px] font-black uppercase tracking-[0.25em] text-white/35">
              Georgia · Est. 2026
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 flex h-[6px] w-full">
        <div className="w-[50%] bg-[#B3262D]" />
        <div className="w-[28%] bg-[#FFD76A]" />
        <div className="flex-1 bg-[#0C352D]" />
      </div>
    </section>
  );
}
