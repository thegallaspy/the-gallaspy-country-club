import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      aria-labelledby="gallaspy-home-hero-title"
      className="relative isolate overflow-hidden bg-white pt-[100px] text-[#081F5C] sm:pt-[120px] lg:pt-[140px]"
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 pb-14 pt-8 sm:px-8 sm:pb-20 lg:min-h-[680px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-12 lg:pb-24 lg:pt-10">

        <div className="relative z-10">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#081F5C] p-2 sm:h-[68px] sm:w-[68px]">
              <Image
                src="/logos/official/falcon-G.png"
                alt="Official Gallaspy Falcon G"
                width={70}
                height={70}
                priority
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.17em] text-[#081F5C]">
                The Gallaspy Golf Club
              </p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#174A38]">
                Georgia · Est. 2026
              </p>
            </div>
          </div>

          <p className="mb-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#C6283E] sm:text-xs">
            A new generation of golf
          </p>

          <h1
            id="gallaspy-home-hero-title"
            className="text-[clamp(3.65rem,12vw,8.5rem)] font-black uppercase leading-[0.86] tracking-[-0.075em]"
          >
            <span className="block text-[#081F5C]">PLAY.</span>
            <span className="block text-[#174A38]">COMPETE.</span>
            <span className="block text-[#C6283E]">GATHER.</span>
          </h1>

          <p className="mt-7 max-w-xl text-[15px] font-medium leading-[1.75] text-[#405568] sm:text-lg">
            Real golf. Real connections. A community bringing golfers
            together through rounds, competition, and experiences
            worth being part of.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/play"
              className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-[#081F5C] px-7 py-4 text-[11px] font-black uppercase tracking-[0.13em] text-white transition-colors hover:bg-[#174A38] focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#C6283E]"
            >
              Play With The Gallaspy
              <span aria-hidden="true" className="ml-3">→</span>
            </Link>

            <Link
              href="/the-club"
              className="inline-flex min-h-[52px] items-center justify-center rounded-xl border-2 border-[#081F5C] px-7 py-4 text-[11px] font-black uppercase tracking-[0.13em] text-[#081F5C] transition-colors hover:bg-[#F0F5F2] focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#C6283E]"
            >
              Explore The Club
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[#DDE5EC] pt-5">
            <span className="text-[10px] font-bold uppercase tracking-[0.09em] text-[#174A38]">
              Golf for every level
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.09em] text-[#405568]">
              Community first
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.09em] text-[#405568]">
              Built for what&apos;s next
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="relative min-h-[310px] overflow-hidden rounded-[22px] bg-[#081F5C] sm:min-h-[440px] lg:min-h-[580px]">
            <Image
              src="/images/home-hero.jpg"
              alt="Golf imagery featured by The Gallaspy Golf Club"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 48vw"
              className="object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#081F5C]/75 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/30 bg-[#081F5C]/80 px-5 py-4 text-white backdrop-blur-sm sm:bottom-7 sm:left-7 sm:right-7">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#D6BC78]">
                The Digital Clubhouse
              </p>
              <p className="mt-2 text-xl font-black uppercase tracking-[-0.04em] sm:text-2xl">
                Your game. Your community.
              </p>
              <p className="mt-2 text-xs leading-5 text-white/85 sm:text-sm">
                Find your next round, connect with golfers, and follow the club.
              </p>
            </div>
          </div>
          <div className="absolute -bottom-3 right-6 h-[6px] w-28 rounded-full bg-[#C6283E]" />
        </div>
      </div>
    </section>
  );
}
