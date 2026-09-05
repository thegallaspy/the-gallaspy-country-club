import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "The Mercury Match | The Gallaspy",
  description:
    "The Mercury Match is The Gallaspy's annual team championship: Team Crest vs. Team Falcon in 18-hole singles match play.",
};

const matchFormat = [
  { value: "16", label: "Players" },
  { value: "8", label: "Matches" },
  { value: "18", label: "Holes" },
  { value: "4½", label: "Points To Win" },
];

const matches = Array.from({ length: 8 }, (_, index) => ({
  number: String(index + 1).padStart(2, "0"),
}));

export default function MercuryMatchPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#10263F]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#10263F] px-5 pb-20 pt-32 text-white sm:px-8 sm:pt-36 lg:pb-28 lg:pt-40">
        <div className="absolute inset-y-0 right-0 hidden w-[32%] bg-[#0C352D] lg:block" />

        <div className="relative mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[68%_32%] lg:gap-0">
          {/* LEFT — EVENT INFORMATION */}
          <div className="lg:pr-14">
            <p className="text-[9px] font-black uppercase tracking-[0.34em] text-[#FFD76A]">
              Annual Team Championship
            </p>

            <h1 className="mt-7 text-[3.8rem] font-black uppercase leading-[0.84] tracking-[-0.06em] sm:text-[5.5rem] lg:text-[6.5rem]">
              The Mercury
              <span className="block text-[#E56A70]">Match.</span>
            </h1>

            <div className="mt-10 border-t border-white/15 pt-8">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFD76A]">
                Crest vs. Falcon
              </p>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
                Each golfer represents one team and plays one opponent
                head-to-head over 18 holes of singles match play.
              </p>
            </div>
          </div>

          {/* RIGHT — OFFICIAL MERCURY MATCH MARK */}
          <div className="flex flex-col items-center justify-center text-center lg:min-h-[560px] lg:pl-10">
            <div className="relative w-[92%] max-w-[760px]">
              <Image
                src="/logos/events/mercury-match-logo.png"
                alt="The Mercury Match"
                width={700}
                height={700}
                priority
                className="h-auto w-full scale-[2.8] object-contain"
              />
            </div>

            <div className="mt-10 border-t border-white/20 pt-7">
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/55">
                Inaugural Match
              </p>

              <p className="mt-3 text-lg font-black uppercase tracking-[0.08em] text-white">
                October 23, 2027
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TWO HOUSES */}
      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-10">
            <p className="text-[9px] font-black uppercase tracking-[0.34em] text-[#B3262D]">
              The Rivalry
            </p>

            <h2 className="mt-5 text-[2.8rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[4rem]">
              Two Houses.
              <span className="block text-[#0C352D]">One Club.</span>
            </h2>
          </div>

          <div className="grid overflow-hidden border border-[#10263F]/15 lg:grid-cols-2">
            {/* CREST */}
            <article className="relative flex min-h-[430px] flex-col justify-between bg-[#0C352D] p-8 text-white sm:p-10 lg:p-12">
              <div className="flex items-center justify-between">
                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#FFD76A]">
                  Team Crest
                </p>
                <span className="text-[8px] font-black uppercase tracking-[0.25em] text-white/40">
                  Forest Green
                </span>
              </div>

              <div className="flex flex-1 items-center justify-center py-8">
                <div className="relative h-[190px] w-[190px] sm:h-[220px] sm:w-[220px]">
                  <Image
                    src="/logos/crest.png"
                    alt="Team Crest"
                    fill
                    sizes="220px"
                    className="object-contain"
                  />
                </div>
              </div>

              <h3 className="text-[2rem] font-black uppercase tracking-[-0.04em]">
                Crest
              </h3>
            </article>

            {/* FALCON */}
            <article className="relative flex min-h-[430px] flex-col justify-between bg-[#10263F] p-8 text-white sm:p-10 lg:p-12">
              <div className="flex items-center justify-between">
                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#FFD76A]">
                  Team Falcon
                </p>
                <span className="text-[8px] font-black uppercase tracking-[0.25em] text-white/40">
                  Navy Blue
                </span>
              </div>

              <div className="flex flex-1 items-center justify-center py-8">
                <div className="relative h-[190px] w-[190px] sm:h-[220px] sm:w-[220px]">
                  <Image
                    src="/logos/falcon.png"
                    alt="Team Falcon"
                    fill
                    sizes="220px"
                    className="object-contain"
                  />
                </div>
              </div>

              <h3 className="text-[2rem] font-black uppercase tracking-[-0.04em]">
                Falcon
              </h3>
            </article>
          </div>
        </div>
      </section>

      {/* FORMAT */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.34em] text-[#B3262D]">
                The Format
              </p>

              <h2 className="mt-5 text-[2.8rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[4rem]">
                Singles
                <span className="block text-[#0C352D]">Match Play.</span>
              </h2>
            </div>

            <div>
              <p className="max-w-2xl text-base leading-8 text-[#33475B]/75">
                The inaugural Mercury Match is structured around eight golfers
                representing Team Crest and eight representing Team Falcon.
                Each player competes against one opponent over 18 holes of
                singles match play.
              </p>

              <div className="mt-10 grid grid-cols-2 border-l border-t border-[#10263F]/15 sm:grid-cols-4">
                {matchFormat.map((item) => (
                  <div
                    key={item.label}
                    className="border-b border-r border-[#10263F]/15 p-5 sm:p-6"
                  >
                    <p className="text-[2.3rem] font-black tracking-[-0.05em] text-[#10263F]">
                      {item.value}
                    </p>
                    <p className="mt-2 text-[7px] font-black uppercase tracking-[0.22em] text-[#8B6A34]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCORING */}
      <section className="bg-[#10263F] px-5 py-16 text-white sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.34em] text-[#FFD76A]">
                The Scoring
              </p>

              <h2 className="mt-5 text-[2.8rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[4rem]">
                Every Match
                <span className="block text-[#E56A70]">Matters.</span>
              </h2>
            </div>

            <div>
              <div className="border-t border-white/15">
                {[
                  ["Win", "1 Point"],
                  ["Tie After 18", "½ Point Each"],
                  ["Loss", "0 Points"],
                ].map(([result, points]) => (
                  <div
                    key={result}
                    className="flex items-center justify-between gap-6 border-b border-white/15 py-6"
                  >
                    <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/50">
                      {result}
                    </p>
                    <p className="text-xl font-black uppercase tracking-[-0.03em] text-white">
                      {points}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-8 max-w-2xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                Eight total points are available. The first team to reach
                4½ points wins the Mercury Match and the Team Championship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CAPTAIN'S REVEAL */}
      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.34em] text-[#B3262D]">
                Mercury Match Week
              </p>

              <h2 className="mt-5 text-[2.8rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[4rem]">
                The Captain&apos;s
                <span className="block text-[#0C352D]">Reveal.</span>
              </h2>

              <p className="mt-7 max-w-md text-sm leading-7 text-[#33475B]/75">
                Each captain privately submits a lineup from Match 1 through
                Match 8. Neither captain sees the opposing lineup beforehand.
                The matchups are then revealed one at a time.
              </p>
            </div>

            <div className="border-t border-[#10263F]/20">
              {matches.map((match) => (
                <div
                  key={match.number}
                  className="grid grid-cols-[65px_1fr] items-center border-b border-[#10263F]/15 py-5 sm:grid-cols-[90px_1fr]"
                >
                  <p className="text-[8px] font-black uppercase tracking-[0.24em] text-[#8B6A34]">
                    Match {match.number}
                  </p>

                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                    <p className="text-right text-sm font-black uppercase tracking-[0.12em] text-[#0C352D]">
                      Crest
                    </p>

                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#B3262D]">
                      vs.
                    </span>

                    <p className="text-sm font-black uppercase tracking-[0.12em] text-[#10263F]">
                      Falcon
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TIEBREAKER */}
      <section className="bg-[#0C352D] px-5 py-16 text-white sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.34em] text-[#FFD76A]">
                If It Ends 4–4
              </p>

              <p className="mt-5 text-[4rem] font-black leading-none tracking-[-0.07em] text-white sm:text-[6rem]">
                SUDDEN
                <span className="block text-[#E56A70]">DEATH.</span>
              </p>
            </div>

            <div>
              <p className="max-w-2xl text-base leading-8 text-white/65">
                If the overall championship finishes tied at 4–4, each captain
                selects one golfer from their team for a sudden-death playoff.
                Those golfers do not have to be the Match 8 players.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
                The selected players return to the designated playoff hole and
                compete head-to-head, one hole at a time, until one player wins
                a hole and decides the Mercury Match.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INAUGURAL MATCH */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.34em] text-[#B3262D]">
                Inaugural Match
              </p>

              <h2 className="mt-5 text-[2.8rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[4rem]">
                October 23
                <span className="block text-[#0C352D]">2027.</span>
              </h2>
            </div>

            <div className="border-t border-[#10263F]/15">
              {[
                ["Teams", "Crest vs. Falcon"],
                ["Field", "16 Golfers · 8 Per Team"],
                ["Format", "18-Hole Singles Match Play"],
                ["Date", "October 23, 2027"],
                ["Host Course", "To Be Announced"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-2 border-b border-[#10263F]/15 py-5 sm:grid-cols-[150px_1fr]"
                >
                  <p className="text-[8px] font-black uppercase tracking-[0.24em] text-[#8B6A34]">
                    {label}
                  </p>
                  <p className="text-sm font-bold text-[#10263F]">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FUTURE HISTORY */}
      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px] border-t border-[#10263F]/15 pt-12">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.34em] text-[#B3262D]">
                The Record Begins Here
              </p>
            </div>

            <div>
              <h2 className="max-w-3xl text-[2.5rem] font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-[3.5rem]">
                The First Mercury Match
                <span className="block text-[#0C352D]">Is Still Ahead.</span>
              </h2>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-[#33475B]/70">
                The inaugural competition will establish the first champion,
                first match results, and opening entry in the Mercury Match
                series. The record will grow from what actually happens on the
                course.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SIGNATURE CLOSE */}
      <section className="bg-[#10263F] px-5 py-20 text-center text-white sm:px-8 lg:py-28">
        <div className="mx-auto max-w-[1000px]">
          <p className="text-[9px] font-black uppercase tracking-[0.38em] text-[#FFD76A]">
            The Mercury Match
          </p>

          <h2 className="mt-7 text-[3rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[4.5rem] lg:text-[5.5rem]">
            Eight Matches.
            <span className="block">Eighteen Holes.</span>
            <span className="block text-[#E56A70]">One Team Champion.</span>
          </h2>

          <p className="mt-8 text-[9px] font-black uppercase tracking-[0.3em] text-white/45">
            Crest vs. Falcon · Two Houses. One Club. One Match.
          </p>

          <div className="mt-10">
            <Link
              href="/calendar"
              className="inline-flex border border-[#FFD76A] px-7 py-4 text-[8px] font-black uppercase tracking-[0.25em] text-[#FFD76A] transition hover:bg-[#FFD76A] hover:text-[#10263F]"
            >
              View Club Calendar →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
