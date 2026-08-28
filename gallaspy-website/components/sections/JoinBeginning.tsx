import Link from "next/link";

export default function JoinBeginning() {
  return (
    <section className="relative overflow-hidden bg-[#10263F] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,145,70,0.16),transparent_36%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-24">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.34em] text-[#FFD76A] sm:text-[10px] sm:tracking-[0.4em]">
              Join The Beginning
            </p>

            <div className="mt-5 h-px w-12 bg-[#FFD76A]" />

            <p className="mt-8 max-w-[350px] text-sm font-light leading-7 text-white/62 sm:text-[15px]">
              The early years of a club only happen once.
            </p>
          </div>

          <div>
            <h2 className="max-w-[900px] font-serif text-[2.8rem] font-light leading-[0.98] tracking-[-0.03em] text-white sm:text-[3.8rem] md:text-[4.6rem] lg:text-[5.3rem]">
              Help shape what
              <span className="block italic text-[#FFD76A]">
                The Gallaspy becomes.
              </span>
            </h2>

            <div className="mt-8 max-w-[760px] space-y-5 text-[15px] font-light leading-7 text-white/68 sm:text-[17px] sm:leading-8">
              <p>
                The Gallaspy Golf Club is being built in public, through the
                people who choose to show up, play, compete, gather, and carry
                its traditions forward.
              </p>

              <p>
                There is no finished story to join. There is an opportunity to
                be part of writing the first chapters.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/play"
                className="group inline-flex min-h-[52px] items-center justify-center border border-[#FFD76A] bg-[#FFD76A] px-8 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#10263F] transition-all duration-300 hover:-translate-y-1 hover:bg-transparent hover:text-white sm:text-[10px]"
              >
                Play With Us
                <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/contact"
                className="group inline-flex min-h-[52px] items-center justify-center border border-white/30 bg-white/[0.03] px-8 text-[9px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#FFD76A] hover:text-[#FFD76A] sm:text-[10px]"
              >
                Contact The Club
                <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-white/10 pt-10 sm:mt-24 lg:mt-28">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#FFD76A]">
                The Gallaspy Golf Club
              </p>

              <p className="mt-3 font-serif text-2xl font-light text-white sm:text-3xl">
                Play first. Build the rest from there.
              </p>
            </div>

            <p className="max-w-[360px] text-sm font-light leading-7 text-white/45 sm:text-right">
              Georgia · Est. 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
