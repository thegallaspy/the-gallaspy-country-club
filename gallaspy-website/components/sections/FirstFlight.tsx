import Link from "next/link";

export default function FirstFlight() {
  return (
    <section className="relative overflow-hidden bg-[#10263F] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,145,70,0.16),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-24">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.34em] text-[#FFD76A] sm:text-[10px] sm:tracking-[0.4em]">
              The First Flight
            </p>

            <div className="mt-5 h-px w-12 bg-[#FFD76A]" />

            <p className="mt-8 max-w-[360px] text-sm font-light leading-7 text-white/62 sm:text-[15px]">
              Before there are decades of tradition, there has to be a first
              round.
            </p>
          </div>

          <div>
            <h2 className="max-w-[880px] font-serif text-[2.8rem] font-light leading-[0.98] tracking-[-0.03em] text-white sm:text-[3.8rem] md:text-[4.6rem] lg:text-[5.3rem]">
              Every club has
              <span className="block italic text-[#FFD76A]">
                a beginning.
              </span>
            </h2>

            <div className="mt-8 max-w-[760px] space-y-5 text-[15px] font-light leading-7 text-white/68 sm:text-[17px] sm:leading-8">
              <p>
                The First Flight is the opening chapter of The Gallaspy Golf
                Club — the first gathering of golfers who believe a club can
                begin before it has a permanent address.
              </p>

              <p>
                It is not a finished tradition. It is the moment the tradition
                begins.
              </p>
            </div>

            <div className="mt-10">
              <Link
                href="/play"
                className="group inline-flex min-h-[50px] items-center justify-center border border-[#FFD76A] bg-[#FFD76A] px-7 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#10263F] transition-all duration-300 hover:-translate-y-1 hover:bg-transparent hover:text-white sm:px-8 sm:text-[10px]"
              >
                Play With The Club
                <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-20 grid border-y border-white/10 sm:mt-24 sm:grid-cols-3 lg:mt-28">
          <div className="border-b border-white/10 py-8 sm:border-b-0 sm:border-r sm:px-7">
            <p className="text-[8px] font-semibold uppercase tracking-[0.28em] text-[#FFD76A]">
              One Beginning
            </p>

            <p className="mt-4 font-serif text-2xl font-light text-white">
              First Flight
            </p>
          </div>

          <div className="border-b border-white/10 py-8 sm:border-b-0 sm:border-r sm:px-7">
            <p className="text-[8px] font-semibold uppercase tracking-[0.28em] text-[#FFD76A]">
              Built Through
            </p>

            <p className="mt-4 font-serif text-2xl font-light text-white">
              The Game
            </p>
          </div>

          <div className="py-8 sm:px-7">
            <p className="text-[8px] font-semibold uppercase tracking-[0.28em] text-[#FFD76A]">
              Made By
            </p>

            <p className="mt-4 font-serif text-2xl font-light text-white">
              The People
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
