import Link from "next/link";
import { foundingCommunity } from "@/data/club";

export const metadata = {
  title: "Founding Ledger | Falcon Society | The Gallaspy",
  robots: {
    index: false,
    follow: false,
  },
};

export default function FalconSocietyLedgerPage() {
  const confirmed = foundingCommunity.confirmedCount ?? 0;
  const goal = foundingCommunity.goal;

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#10263F]">
      <section className="bg-[#10263F] px-5 pb-16 pt-32 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1120px]">
          <Link
            href="/falcon-society/members/home"
            className="text-[9px] font-bold uppercase tracking-[0.24em] text-white/50 transition hover:text-[#D7B56D]"
          >
            ← Members Room
          </Link>

          <div className="mt-12 max-w-4xl">
            <div className="flex items-center gap-4">
              <span className="h-2.5 w-2.5 bg-[#8C1D2C]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.36em] text-[#D7B56D]">
                The Founding 100
              </p>
            </div>

            <h1 className="mt-6 font-serif text-[3.5rem] font-light leading-[0.94] sm:text-6xl lg:text-[5.5rem]">
              Founding
              <span className="block text-[#D7B56D]">Ledger.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
              A private record of the people recognized as part of the opening
              chapter of the Falcon Society.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 border-y border-white/15 sm:max-w-xl">
            <div className="py-6">
              <p className="text-[8px] font-bold uppercase tracking-[0.24em] text-white/35">
                Confirmed
              </p>
              <p className="mt-2 font-serif text-3xl text-white">
                {confirmed}
              </p>
            </div>

            <div className="border-l border-white/15 px-6 py-6">
              <p className="text-[8px] font-bold uppercase tracking-[0.24em] text-white/35">
                Founding Goal
              </p>
              <p className="mt-2 font-serif text-3xl text-[#D7B56D]">
                {goal}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1120px]">
          <div className="max-w-3xl">
            <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#8C1D2C]">
              Permanent Recognition
            </p>

            <h2 className="mt-3 font-serif text-4xl font-light sm:text-5xl">
              The names behind the beginning.
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#33475B]/70">
              Member names will only appear in the Founding Ledger after
              confirmation and with appropriate permission. No placeholder or
              fictional member names will be used.
            </p>
          </div>

          <div className="mt-12 border border-[#10263F]/15 bg-white">
            <div className="border-b border-[#10263F]/15 px-6 py-5 sm:px-8">
              <p className="text-[9px] font-bold uppercase tracking-[0.26em] text-[#8B6A34]">
                Founding 100 Record
              </p>
            </div>

            <div className="px-6 py-14 sm:px-8 sm:py-16">
              <h3 className="font-serif text-3xl font-light">
                Member record in progress.
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#33475B]/70">
                Confirmed member names and founding numbers will be added here
                as the Society grows.
              </p>
            </div>
          </div>

          <div className="mt-10 border border-[#10263F]/15 bg-[#EEE8DC] p-6 sm:p-8">
            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#8C1D2C]">
              About The Ledger
            </p>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#33475B]/75">
              The Founding Ledger is a record of recognition within the Falcon
              Society. It does not represent ownership, equity, investment, or
              a guarantee of future club membership or privileges.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#8C1D2C] px-5 py-12 text-white sm:px-8">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/55">
              Falcon Society
            </p>

            <p className="mt-2 font-serif text-2xl font-light">
              The opening chapter, preserved.
            </p>
          </div>

          <Link
            href="/falcon-society/members/home"
            className="text-[9px] font-bold uppercase tracking-[0.22em] text-white"
          >
            Return to Members Room →
          </Link>
        </div>
      </section>
    </main>
  );
}
