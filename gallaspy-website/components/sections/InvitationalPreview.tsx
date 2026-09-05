import Image from "next/image";
import Link from "next/link";

const facts = [
  ["Date", "June 21, 2027"],
  ["Field", "72 Players"],
  ["Format", "Individual Stroke Play"],
  ["Championships", "Gross + Net"],
];

export default function InvitationalPreview() {
  return (
    <section className="relative overflow-hidden bg-[#10263F] text-white">
      <div className="absolute inset-y-0 right-0 hidden w-[34%] bg-[#0C352D] lg:block" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
          {/* MAIN */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#B3262D]" />

              <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#FFD76A]">
                Flagship Tournament
              </p>
            </div>

            <div className="mt-5 flex items-center gap-5">
              <Image
                src="/logos/events/gallaspy-invitational-logo.png"
                alt="The Gallaspy Invitational"
                width={320}
                height={180}
                className="h-auto w-[135px] object-contain sm:w-[165px]"
              />

              <div className="h-px flex-1 bg-white/15" />
            </div>

            <p className="mt-6 text-[10px] font-black uppercase tracking-[0.24em] text-white/45">
              1st Annual · 2027
            </p>

            <h2 className="mt-3 max-w-[720px] text-[2.5rem] font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-[3.6rem] lg:text-[4.3rem]">
              The Gallaspy
              <span className="block text-[#FFD76A]">Invitational</span>
            </h2>

            <p className="mt-6 max-w-[650px] text-sm leading-7 text-white/65 sm:text-base">
              Seventy-two golfers. Eighteen holes. Individual stroke play.
              The Gallaspy Invitational is the club&apos;s annual championship
              and the competition where The Golden Falcon is earned.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/invitational/register"
                className="inline-flex min-h-[48px] items-center justify-center bg-[#FFD76A] px-6 text-[8px] font-black uppercase tracking-[0.22em] text-[#10263F] transition hover:bg-white"
              >
                Register Now →
              </Link>

              <Link
                href="/invitational"
                className="inline-flex min-h-[48px] items-center justify-center border border-white/25 px-6 text-[8px] font-black uppercase tracking-[0.22em] text-white transition hover:border-[#FFD76A] hover:text-[#FFD76A]"
              >
                Tournament Details →
              </Link>
            </div>
          </div>

          {/* EVENT CARD */}
          <div className="border border-white/15 bg-[#071827]/45">
            <div className="flex items-center justify-between border-b border-white/15 px-5 py-4 sm:px-6">
              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#FFD76A]">
                  Tournament Card
                </p>

                <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Gallaspy Invitational 001
                </p>
              </div>

              <span className="text-[2.4rem] font-black leading-none tracking-[-0.06em] text-white/10">
                001
              </span>
            </div>

            {facts.map(([label, value], index) => (
              <div
                key={label}
                className={`grid grid-cols-[0.7fr_1.3fr] gap-5 px-5 py-4 sm:px-6 ${
                  index !== facts.length - 1
                    ? "border-b border-white/10"
                    : ""
                }`}
              >
                <p className="text-[7px] font-black uppercase tracking-[0.24em] text-white/35">
                  {label}
                </p>

                <p className="text-sm font-black uppercase tracking-[-0.015em] text-white">
                  {value}
                </p>
              </div>
            ))}

            <div className="border-t border-white/15 bg-[#B3262D] px-5 py-4 sm:px-6">
              <p className="text-[7px] font-black uppercase tracking-[0.26em] text-white">
                Host Course Announcement Forthcoming
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4">
        <div className="h-[5px] bg-[#10263F]" />
        <div className="h-[5px] bg-[#B3262D]" />
        <div className="h-[5px] bg-[#FFD76A]" />
        <div className="h-[5px] bg-[#0C352D]" />
      </div>
    </section>
  );
}