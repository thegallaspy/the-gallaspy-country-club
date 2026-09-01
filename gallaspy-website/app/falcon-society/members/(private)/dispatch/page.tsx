import Link from "next/link";

export const metadata = {
  title: "Society Dispatch | Falcon Society | The Gallaspy",
  robots: {
    index: false,
    follow: false,
  },
};

export default function FalconSocietyDispatchPage() {
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
                From The Club
              </p>
            </div>

            <h1 className="mt-6 font-serif text-[3.5rem] font-light leading-[0.94] sm:text-6xl lg:text-[5.5rem]">
              Society
              <span className="block text-[#D7B56D]">Dispatch.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
              Private notes, announcements, event updates, and communications
              for Falcon Society members.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1120px]">
          <div className="max-w-3xl">
            <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#8C1D2C]">
              Member Communications
            </p>

            <h2 className="mt-3 font-serif text-4xl font-light sm:text-5xl">
              The private record of what comes next.
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#33475B]/70">
              This is where Falcon Society members will receive important club
              updates as they are ready to be shared.
            </p>
          </div>

          <div className="mt-12 border-y border-[#10263F]/15 py-14 sm:py-18">
            <div className="max-w-2xl">
              <p className="text-[9px] font-bold uppercase tracking-[0.26em] text-[#8B6A34]">
                Dispatch Archive
              </p>

              <h3 className="mt-4 font-serif text-3xl font-light">
                No dispatches published yet.
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#33475B]/70">
                The first Society Dispatch will appear here when there is a
                confirmed update worth sharing with the Founding 100.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Founder Notes",
                text: "Direct communications about the club, its direction, and the work taking place behind the scenes.",
              },
              {
                title: "Event Updates",
                text: "Confirmed information for rounds, competitions, gatherings, and Falcon Society moments.",
              },
              {
                title: "Member Notices",
                text: "Important access, merchandise, registration, policy, and Society information.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="border border-[#10263F]/15 bg-white p-6 sm:p-7"
              >
                <h3 className="font-serif text-2xl font-light">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#33475B]/70">
                  {item.text}
                </p>
              </article>
            ))}
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
              Member information, shared privately.
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
