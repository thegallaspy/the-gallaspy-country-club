import type { Metadata } from "next";
import Link from "next/link";
import { foundingCommunity } from "@/data/club";

export const metadata: Metadata = {
  title: "Falcon Society | The Founding 100 | The Gallaspy",
  description:
    "The Falcon Society is the Founding 100 of The Gallaspy — the individuals and families selected to become part of the club's earliest chapter.",
};

const pillars = [
  {
    number: "01",
    title: "Play",
    description:
      "Take part in the golf experiences that are establishing The Gallaspy community, including Gallaspy Rounds and signature events.",
  },
  {
    number: "02",
    title: "Compete",
    description:
      "Follow and participate in the competitive traditions of The Gallaspy, from the Invitational to the Mercury Match.",
  },
  {
    number: "03",
    title: "Gather",
    description:
      "Build relationships beyond the scorecard through gatherings, traditions, and shared experiences.",
  },
  {
    number: "04",
    title: "Belong",
    description:
      "Become part of the opening chapter and help establish the culture that will define The Gallaspy for years to come.",
  },
];

const whatItMeans = [
  "Recognition as part of The Gallaspy's founding community",
  "Connection to Gallaspy Rounds, competitions, and gatherings",
  "Invitations and communication around selected club experiences",
  "A place in the documented opening chapter of The Gallaspy",
];

export default function FalconSocietyPage() {
  const confirmedCount = foundingCommunity.confirmedCount;
  const goal = foundingCommunity.goal;

  const progress =
    confirmedCount === null
      ? null
      : Math.min(100, Math.max(0, (confirmedCount / goal) * 100));

  return (
    <main className="bg-[#F7F4EE] text-[#10263F]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#8C1D2C] px-5 pb-20 pt-32 text-white sm:px-8 sm:pb-24 sm:pt-36 lg:pb-28 lg:pt-40">
        <div className="absolute inset-0 opacity-[0.08]">
          <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full border border-white" />
          <div className="absolute -right-32 bottom-[-220px] h-[620px] w-[620px] rounded-full border border-white" />
        </div>

        <div className="relative mx-auto w-full max-w-[1120px]">
          <div className="max-w-4xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-white/70">
              The Founding 100
            </p>

            <h1 className="mt-6 font-serif text-[3.4rem] font-light leading-[0.95] text-white sm:text-6xl lg:text-[5.5rem]">
              The Falcon
              <span className="block">Society.</span>
            </h1>

            <div className="mt-7 h-px w-20 bg-white/50" />

            <p className="mt-7 max-w-3xl text-base leading-8 text-white/84 sm:text-lg sm:leading-9">
              The Falcon Society is the Founding 100 of The Gallaspy — the first
              100 individuals and families selected to become part of the
              community during its opening chapter.
            </p>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/65">
              Before a permanent first tee, there are rounds to play,
              competitions to establish, gatherings to share, and traditions to
              begin.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/falcon-society/apply"
                className="inline-flex min-h-[50px] items-center justify-center bg-white px-8 text-[10px] font-bold uppercase tracking-[0.2em] !text-[#8C1D2C] transition hover:bg-[#10263F] hover:!text-white"
              >
                Apply for Consideration
              </Link>

              <Link
                href="/calendar"
                className="inline-flex min-h-[50px] items-center justify-center border border-white/45 px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white hover:text-[#8C1D2C]"
              >
                Explore the Club Calendar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDING 100 TRACKER */}
      <section className="bg-[#10263F] px-5 py-14 text-white sm:px-8 lg:py-16">
        <div className="mx-auto grid w-full max-w-[1120px] gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D7B56D]">
              Founding Community
            </p>

            <div className="mt-4 flex items-end gap-3">
              <span className="font-serif text-6xl font-light sm:text-7xl">
                {confirmedCount === null ? "—" : confirmedCount}
              </span>

              <span className="pb-2 font-serif text-2xl text-white/45">
                / {goal}
              </span>
            </div>

            <p className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-white/50">
              Confirmed Founding 100
            </p>
          </div>

          <div>
            <div className="h-[3px] w-full overflow-hidden bg-white/15">
              {progress !== null && (
                <div
                  className="h-full bg-[#D7B56D]"
                  style={{ width: `${progress}%` }}
                />
              )}
            </div>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/68">
              The count reflects confirmed Falcon Society participants — not
              applications or expressions of interest. Until a founding
              participant is formally confirmed, the public count remains
              unchanged.
            </p>

            {confirmedCount === null && (
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[#D7B56D]">
                Confirmed count will be published as the Founding 100 is
                established.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* WHAT IT IS */}
      <section className="px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1120px]">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#8C1D2C]">
                Be Part of the Beginning
              </p>

              <h2 className="mt-4 font-serif text-[2.7rem] font-light leading-[1.05] text-[#10263F] sm:text-5xl">
                A Founding Community,
                <span className="block">Not a Waiting Room.</span>
              </h2>
            </div>

            <div className="space-y-5 text-sm leading-7 text-[#33475B] sm:text-base sm:leading-8">
              <p>
                The Gallaspy does not need to wait for a permanent clubhouse to
                begin building its culture. The Falcon Society recognizes the
                people who become part of that culture during the beginning.
              </p>

              <p>
                Today, The Gallaspy is being established through golf, annual
                competition, gatherings, apparel, shared traditions, and the
                relationships formed along the way.
              </p>

              <p>
                The long-term vision remains a permanent private golf and
                country club. The Falcon Society belongs to the chapter being
                written before that permanent home exists.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PLAY COMPETE GATHER BELONG */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1120px]">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#8C1D2C]">
              The Founding Experience
            </p>

            <h2 className="mt-4 font-serif text-[2.7rem] font-light leading-[1.05] text-[#10263F] sm:text-5xl">
              Play. Compete. Gather. Belong.
            </h2>
          </div>

          <div className="mt-12 grid border-l border-t border-[#10263F]/12 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <article
                key={pillar.title}
                className="min-h-[260px] border-b border-r border-[#10263F]/12 p-7 sm:p-8"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8C1D2C]">
                  {pillar.number}
                </p>

                <h3 className="mt-8 font-serif text-3xl font-light text-[#10263F]">
                  {pillar.title}
                </h3>

                <div className="mt-5 h-px w-10 bg-[#8C1D2C]" />

                <p className="mt-5 text-sm leading-7 text-[#33475B]/80">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT FOUNDING RECOGNITION MEANS */}
      <section className="px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1120px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#8C1D2C]">
              The Opening Chapter
            </p>

            <h2 className="mt-4 font-serif text-[2.7rem] font-light leading-[1.05] text-[#10263F] sm:text-5xl">
              What Founding
              <span className="block">Recognition Means.</span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-[#33475B]/78">
              Falcon Society recognition documents participation in the
              beginning of The Gallaspy. It should not be interpreted as an
              ownership interest, investment, or guarantee of future club
              membership or privileges.
            </p>
          </div>

          <div className="border-t border-[#10263F]/15">
            {whatItMeans.map((item, index) => (
              <div
                key={item}
                className="grid grid-cols-[42px_1fr] gap-4 border-b border-[#10263F]/15 py-6"
              >
                <span className="text-xs font-bold text-[#8C1D2C]">
                  0{index + 1}
                </span>

                <p className="text-sm font-medium leading-7 text-[#10263F] sm:text-base">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION PROCESS */}
      <section className="bg-[#EEE8DC] px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1120px]">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#8C1D2C]">
              Joining the Founding 100
            </p>

            <h2 className="mt-4 font-serif text-[2.7rem] font-light leading-[1.05] text-[#10263F] sm:text-5xl">
              Application Is the Beginning.
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#33475B]/78 sm:text-base sm:leading-8">
              Applying expresses your interest in being considered for the
              Falcon Society. Applications are reviewed before any Founding 100
              designation is confirmed.
            </p>
          </div>

          <div className="mt-12 grid gap-px bg-[#10263F]/12 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Apply",
                text: "Tell us who you are and why you want to be part of The Gallaspy's beginning.",
              },
              {
                step: "02",
                title: "Review",
                text: "Your application is reviewed before any Falcon Society designation is made.",
              },
              {
                step: "03",
                title: "Confirmation",
                text: "Confirmed participants become part of the Falcon Society and the official Founding 100 count.",
              },
            ].map((item) => (
              <article key={item.step} className="bg-[#EEE8DC] p-8 text-[#10263F]">
                <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#8C1D2C]">
                  {item.step}
                </p>

                <h3 className="mt-5 font-serif text-3xl font-light !text-[#10263F]">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 !text-[#33475B]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>

          <Link
            href="/falcon-society/apply"
            className="mt-10 inline-flex min-h-[50px] items-center justify-center bg-[#8C1D2C] px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#10263F]"
          >
            Apply for Consideration
          </Link>
        </div>
      </section>

      {/* WHERE WE ARE */}
      <section className="bg-[#163A2F] px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="mx-auto grid w-full max-w-[1120px] gap-12 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D7B56D]">
              Where We Are
            </p>

            <h2 className="mt-5 font-serif text-[3rem] font-light leading-[1.02] sm:text-6xl">
              The Club Is
              <span className="block text-[#D7B56D]">Already in Motion.</span>
            </h2>
          </div>

          <div>
            <p className="text-sm leading-7 text-white/72 sm:text-base sm:leading-8">
              The Gallaspy is currently establishing its founding community,
              monthly golf programming, annual competitions, and traditions
              while pursuing the long-term vision of a permanent private golf
              and country club.
            </p>

            <p className="mt-5 font-serif text-2xl italic text-white">
              Until then, we play.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/play"
                className="inline-flex min-h-[48px] items-center justify-center bg-white px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#163A2F] transition hover:bg-[#D7B56D] hover:text-[#10263F]"
              >
                Play With The Gallaspy
              </Link>

              <Link
                href="/falcon-society/apply"
                className="inline-flex min-h-[48px] items-center justify-center border border-white/40 px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:border-white"
              >
                Founding 100 Application
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
