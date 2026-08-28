import Image from "next/image";
import Link from "next/link";

const facts = [
  ["Date", "June 21, 2027"],
  ["Format", "4-Person Scramble"],
  ["Field", "100 Players"],
  ["Start", "11:00 AM"],
];

export default function InvitationalPreview() {
  return (
    <section className="relative overflow-hidden bg-[#10263F] text-white">
      <div className="absolute inset-y-0 right-0 hidden w-[42%] bg-[#0C352D] lg:block" />

      <div className="pointer-events-none absolute -right-10 -top-14 text-[18rem] font-black leading-none tracking-[-0.1em] text-white/[0.025] sm:text-[24rem] lg:text-[30rem]">
        27
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          {/* MAIN STORY */}
          <div>
            <div className="flex items-center gap-4">
              <span className="h-2 w-2 bg-[#B3262D]" />

              <p className="text-[8px] font-black uppercase tracking-[0.34em] text-[#FFD76A]">
                Flagship Tournament
              </p>
            </div>

            <div className="mt-6 flex items-center gap-5">
              <Image
                src="/logos/gallaspy-invitational.png"
                alt="The Gallaspy Invitational"
                width={320}
                height={180}
                className="h-auto w-[150px] object-contain sm:w-[190px]"
              />

              <div className="hidden h-px flex-1 bg-white/15 sm:block" />
            </div>

            <h2 className="mt-8 max-w-[800px] text-[3.2rem] font-black uppercase leading-[0.84] tracking-[-0.065em] sm:text-[4.5rem] lg:text-[5.4rem]">
              The Gallaspy
              <span className="block text-[#FFD76A]">Invitational.</span>
            </h2>

            <p className="mt-7 max-w-[680px] text-sm leading-7 text-white/65 sm:text-base">
              The first annual Gallaspy Invitational brings a 100-player field
              together for tournament golf, competition, and the beginning of
              a tradition built to grow with the club.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/invitational/register"
                className="inline-flex min-h-[50px] items-center justify-center bg-[#FFD76A] px-7 text-[9px] font-black uppercase tracking-[0.22em] text-[#10263F] transition hover:bg-white"
              >
                Join Player Priority List →
              </Link>

              <Link
                href="/invitational"
                className="inline-flex min-h-[50px] items-center justify-center border border-white/30 px-7 text-[9px] font-black uppercase tracking-[0.22em] text-white transition hover:border-[#FFD76A] hover:text-[#FFD76A]"
              >
                Tournament Details →
              </Link>
            </div>
          </div>

          {/* EVENT BOARD */}
          <div className="self-end lg:pl-4">
            <div className="border border-white/15 bg-[#071827]/35">
              <div className="border-b border-white/15 px-6 py-5">
                <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#FFD76A]">
                  Tournament Card
                </p>
              </div>

              {facts.map(([label, value], index) => (
                <div
                  key={label}
                  className={`grid grid-cols-[0.6fr_1.4fr] gap-6 px-6 py-5 ${
                    index !== facts.length - 1
                      ? "border-b border-white/10"
                      : ""
                  }`}
                >
                  <p className="text-[8px] font-black uppercase tracking-[0.25em] text-white/38">
                    {label}
                  </p>

                  <p className="text-sm font-black uppercase tracking-[-0.015em] text-white">
                    {value}
                  </p>
                </div>
              ))}

              <div className="border-t border-white/15 bg-[#B3262D] px-6 py-4">
                <p className="text-[8px] font-black uppercase tracking-[0.28em] text-white">
                  Host Course Announcement Forthcoming
                </p>
              </div>
            </div>

            <p className="mt-5 text-[9px] leading-5 text-white/38">
              Official venue information will be announced after the host-course
              agreement is completed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
