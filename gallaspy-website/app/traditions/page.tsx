import Link from "next/link";
import { traditions } from "@/data/club";

const traditionOrder = [
  "first-flight",
  "opening-drive",
  "gallaspy-invitational",
  "mercury-match",
  "night-at-the-nest",
];

const traditionLabels: Record<string, string> = {
  "first-flight": "Opening Tradition",
  "opening-drive": "Season Tradition",
  "gallaspy-invitational": "Flagship Tournament",
  "mercury-match": "Team Championship",
  "night-at-the-nest": "Annual Gathering",
};

export default function TraditionsPage() {
  const orderedTraditions = traditionOrder
    .map((id) => traditions.find((tradition) => tradition.id === id))
    .filter((tradition) => tradition !== undefined);

  return (
    <main className="bg-[#F7F4EE] text-[#10263F]">
      {/* HERO */}
      <section className="bg-[#10263F] px-5 pb-16 pt-32 text-white sm:px-8 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
        <div className="mx-auto max-w-[1120px]">
          <p className="text-[10px] font-bold uppercase tracking-[0.36em] text-[#D7B56D]">
            The Gallaspy Traditions
          </p>

          <h1 className="mt-6 max-w-4xl font-serif text-[3.6rem] font-light leading-[0.94] sm:text-6xl lg:text-[5.5rem]">
            History Has to
            <span className="block text-[#D7B56D]">Start Somewhere.</span>
          </h1>

          <div className="mt-10 grid gap-8 border-t border-white/15 pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <p className="max-w-2xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
              The Gallaspy is establishing the moments that will return each
              year — golf, competition, gathering, and the traditions that
              become more meaningful every time they are shared.
            </p>

            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/35">
              Established 2026
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Built Through Repetition
            </p>
          </div>

          <div>
            <h2 className="max-w-3xl font-serif text-[2.8rem] font-light leading-[1.05] sm:text-5xl">
              Not inherited.
              <span className="block text-[#8B6A34]">Established together.</span>
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#33475B]/75 sm:text-base sm:leading-8">
              Every club with history once had a first year. These traditions
              mark the rhythm of The Gallaspy calendar and give the community
              something meaningful to return to.
            </p>
          </div>
        </div>
      </section>

      {/* FIVE TRADITIONS */}
      <section className="border-t border-[#10263F]/15 px-5 sm:px-8">
        <div className="mx-auto max-w-[1120px]">
          {orderedTraditions.map((tradition, index) => (
            <article
              key={tradition.id}
              className="grid gap-8 border-b border-[#10263F]/15 py-12 md:grid-cols-[80px_1fr] lg:grid-cols-[90px_330px_1fr] lg:items-start lg:gap-12 lg:py-16"
            >
              <p className="font-serif text-4xl font-light text-[#B89146]">
                {String(index + 1).padStart(2, "0")}
              </p>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.26em] text-[#8B6A34]">
                  {traditionLabels[tradition.id]}
                </p>

                <h2 className="mt-3 font-serif text-3xl font-light leading-tight sm:text-4xl">
                  {tradition.name}
                </h2>

                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F]/40">
                  {tradition.monthLabel} ·{" "}
                  {tradition.firstOccurrenceYear === 2026
                    ? "Established"
                    : "Starting"}{" "}
                  {tradition.firstOccurrenceYear}
                </p>
              </div>

              <div>
                <p className="max-w-xl text-sm leading-7 text-[#33475B]/75 sm:text-base sm:leading-8">
                  {tradition.description}
                </p>

                {tradition.id === "mercury-match" && (
                  <div className="mt-7 border-l-2 border-[#B89146] pl-5">
                    <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#8B6A34]">
                      Crest vs. Falcon
                    </p>

                    <p className="mt-2 font-serif text-xl text-[#10263F]">
                      Two Houses. One Club. One Match.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-5">
                      <div className="flex items-center gap-3">
                        <span className="h-3 w-3 bg-[#0C352D]" />
                        <span className="text-[9px] font-bold uppercase tracking-[0.18em]">
                          Team Crest · Forest Green
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="h-3 w-3 bg-[#10263F]" />
                        <span className="text-[9px] font-bold uppercase tracking-[0.18em]">
                          Team Falcon · Navy
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {tradition.href && tradition.href !== "/traditions" && (
                  <Link
                    href={tradition.href}
                    className="mt-7 inline-flex items-center text-[9px] font-bold uppercase tracking-[0.22em] text-[#10263F] transition hover:text-[#B89146]"
                  >
                    Explore
                    <span className="ml-3 text-[#B89146]">→</span>
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* MERCURY MATCH FEATURE */}
      <section className="bg-[#0C352D] px-5 py-16 text-white sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-20">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D7B56D]">
              September · Team Championship
            </p>

            <h2 className="mt-5 font-serif text-[3rem] font-light leading-[1] sm:text-5xl lg:text-[4rem]">
              The Mercury
              <span className="block text-[#D7B56D]">Match.</span>
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
              Crest against Falcon. Forest green against navy. The Mercury
              Match is The Gallaspy&apos;s annual team competition and one of
              the traditions intended to build its own history year after year.
            </p>
          </div>

          <div className="border-l border-white/20 pl-6 sm:pl-8">
            <p className="font-serif text-2xl font-light text-white">
              Two Houses.
            </p>
            <p className="font-serif text-2xl font-light text-white">
              One Club.
            </p>
            <p className="font-serif text-2xl font-light text-[#D7B56D]">
              One Match.
            </p>

            <Link
              href="/mercury-match"
              className="mt-8 inline-flex min-h-[48px] items-center justify-center border border-[#D7B56D] px-7 text-[9px] font-bold uppercase tracking-[0.22em] text-[#D7B56D] transition hover:bg-[#D7B56D] hover:text-[#10263F]"
            >
              The Mercury Match →
            </Link>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="bg-[#10263F] px-5 py-14 text-white sm:px-8 lg:py-16">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#D7B56D]">
              Be There From The Beginning
            </p>

            <h2 className="mt-4 max-w-2xl font-serif text-3xl font-light sm:text-4xl">
              Traditions become history when people return to them.
            </h2>
          </div>

          <Link
            href="/calendar"
            className="inline-flex min-h-[48px] items-center justify-center bg-[#D7B56D] px-7 text-[9px] font-bold uppercase tracking-[0.22em] text-[#10263F] transition hover:bg-white"
          >
            View Club Calendar →
          </Link>
        </div>
      </section>
    </main>
  );
}
