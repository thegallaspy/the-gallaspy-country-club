import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "The Mercury Match | The Gallaspy",
  description:
    "The annual Gallaspy team championship. Team Crest vs. Team Falcon.",
};

export default function MercuryMatchPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#10263F]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#10263F] px-5 pb-20 pt-32 text-white sm:px-8 sm:pt-36 lg:pb-28 lg:pt-40">
        <div className="absolute -right-16 top-20 select-none font-serif text-[13rem] leading-none text-white/[0.025] sm:text-[20rem] lg:text-[28rem]">
          M
        </div>

        <div className="relative mx-auto max-w-[1120px]">
          <p className="text-[10px] font-bold uppercase tracking-[0.36em] text-[#D7B56D]">
            The Gallaspy · September
          </p>

          <h1 className="mt-6 max-w-5xl font-serif text-[4rem] font-light leading-[0.9] sm:text-7xl lg:text-[6.5rem]">
            The Mercury
            <span className="block text-[#D7B56D]">Match.</span>
          </h1>

          <div className="mt-10 grid gap-8 border-t border-white/15 pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white">
                Crest vs. Falcon
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                The annual team championship of The Gallaspy. Two permanent
                houses meet in competition each September to play for the
                match, their team, and a place in club history.
              </p>
            </div>

            <p className="font-serif text-xl text-[#D7B56D] sm:text-2xl">
              Two Houses. One Club. One Match.
            </p>
          </div>
        </div>
      </section>

      {/* TWO HOUSES */}
      <section>
        <div className="grid lg:grid-cols-2">
          {/* CREST */}
          <article className="flex min-h-[420px] flex-col justify-between bg-[#0C352D] px-6 py-12 text-white sm:px-10 lg:min-h-[520px] lg:px-16 lg:py-16">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D7B56D]">
                House 01
              </p>

              <div className="relative mt-8 h-[150px] w-[170px] sm:h-[180px] sm:w-[200px]">
                <Image
                  src="/logos/crest.png"
                  alt="The Gallaspy Crest"
                  fill
                  sizes="200px"
                  className="object-contain object-left"
                  priority
                />
              </div>

              <h2 className="mt-8 font-serif text-5xl font-light sm:text-6xl">
                Team Crest
              </h2>

              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/45">
                Forest Green
              </p>
            </div>

            <div>
              <div className="mb-7 h-px w-full bg-white/15" />

              <p className="max-w-lg text-sm leading-7 text-white/60">
                One half of the permanent Mercury Match rivalry. Team Crest
                carries forest green into the annual competition.
              </p>
            </div>
          </article>

          {/* FALCON */}
          <article className="flex min-h-[420px] flex-col justify-between bg-[#10263F] px-6 py-12 text-white sm:px-10 lg:min-h-[520px] lg:px-16 lg:py-16">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D7B56D]">
                House 02
              </p>

              <div className="relative mt-8 h-[150px] w-[170px] sm:h-[180px] sm:w-[200px]">
                <Image
                  src="/logos/falcon.png"
                  alt="The Gallaspy Falcon"
                  fill
                  sizes="200px"
                  className="object-contain object-left"
                  priority
                />
              </div>

              <h2 className="mt-8 font-serif text-5xl font-light sm:text-6xl">
                Team Falcon
              </h2>

              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/45">
                Navy Blue
              </p>
            </div>

            <div>
              <div className="mb-7 h-px w-full bg-white/15" />

              <p className="max-w-lg text-sm leading-7 text-white/60">
                The opposing house of the Mercury Match. Team Falcon carries
                navy into the annual competition.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* THE MATCH */}
      <section className="px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              The Competition
            </p>
          </div>

          <div>
            <h2 className="max-w-3xl font-serif text-[2.8rem] font-light leading-[1.05] sm:text-5xl">
              A rivalry built
              <span className="block text-[#8B6A34]">to outlast us.</span>
            </h2>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-[#33475B]/75 sm:text-base sm:leading-8">
              The Mercury Match is designed as a permanent fixture of the
              Gallaspy calendar. Crest and Falcon return each year, creating
              an ongoing competitive history rather than a new identity every
              season.
            </p>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#33475B]/75 sm:text-base sm:leading-8">
              Captains, rosters, match format, host venue, and the details of
              the inaugural competition will be announced as they are
              confirmed.
            </p>
          </div>
        </div>
      </section>

      {/* INAUGURAL MATCH */}
      <section className="bg-[#EEE8DC] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#8B6A34]">
                Inaugural Match
              </p>

              <h2 className="mt-4 font-serif text-[3rem] font-light leading-none sm:text-5xl">
                September 2027
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-[#33475B]/75">
                The first Mercury Match is planned for September 2027.
                Additional details will be released as the inaugural
                competition takes shape.
              </p>
            </div>

            <div className="border-l border-[#10263F]/15 pl-6 sm:pl-8">
              <div className="space-y-5">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#10263F]/40">
                    Teams
                  </p>
                  <p className="mt-1 font-serif text-xl">
                    Crest vs. Falcon
                  </p>
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#10263F]/40">
                    Date
                  </p>
                  <p className="mt-1 font-serif text-xl">
                    September 2027 · Exact Date TBA
                  </p>
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#10263F]/40">
                    Host Course
                  </p>
                  <p className="mt-1 font-serif text-xl">
                    To Be Announced
                  </p>
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#10263F]/40">
                    Match Format
                  </p>
                  <p className="mt-1 font-serif text-xl">
                    To Be Announced
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FUTURE HISTORY */}
      <section className="bg-[#0C352D] px-5 py-16 text-white sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1120px]">
          <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D7B56D]">
            The Record
          </p>

          <div className="mt-5 grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <h2 className="font-serif text-[3rem] font-light leading-[1] sm:text-5xl">
                The score starts
                <span className="block text-[#D7B56D]">at zero.</span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/60">
                There is no previous champion and no all-time series yet.
                The inaugural Mercury Match will establish the first result
                in what is intended to become a year-by-year club record.
              </p>
            </div>

            <div className="grid grid-cols-2 border border-white/15">
              <div className="border-r border-white/15 p-6 sm:p-8">
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/40">
                  Crest Wins
                </p>
                <p className="mt-3 font-serif text-5xl font-light">0</p>
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/40">
                  Falcon Wins
                </p>
                <p className="mt-3 font-serif text-5xl font-light">0</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#10263F] px-5 py-14 text-white sm:px-8 lg:py-16">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#D7B56D]">
              Follow The Beginning
            </p>

            <h2 className="mt-4 max-w-2xl font-serif text-3xl font-light sm:text-4xl">
              The first Mercury Match is still ahead.
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/calendar"
              className="inline-flex min-h-[48px] items-center justify-center border border-white/25 px-7 text-[9px] font-bold uppercase tracking-[0.22em] text-white transition hover:border-white"
            >
              Club Calendar
            </Link>

            <Link
              href="/falcon-society"
              className="inline-flex min-h-[48px] items-center justify-center bg-[#D7B56D] px-7 text-[9px] font-bold uppercase tracking-[0.22em] text-[#10263F] transition hover:bg-white"
            >
              Founding Community
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
