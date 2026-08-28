import Link from "next/link";

const waysToJoin = [
  {
    number: "01",
    title: "Club Rounds",
    text: "Join golfers from The Gallaspy for rounds at courses throughout Georgia.",
  },
  {
    number: "02",
    title: "Competition",
    text: "Take part in matches, contests, and events that give the club its competitive identity.",
  },
  {
    number: "03",
    title: "Gatherings",
    text: "Connect beyond the scorecard through dinners, celebrations, and club gatherings.",
  },
];

export default function PlayPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#10263F]">
      <section className="relative overflow-hidden bg-[#10263F] px-5 pb-20 pt-36 text-white sm:px-8 sm:pb-24 sm:pt-40 lg:px-10 lg:pb-32 lg:pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,145,70,0.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <p className="text-[9px] font-semibold uppercase tracking-[0.36em] text-[#FFD76A] sm:text-[10px]">
            Play With The Gallaspy
          </p>

          <div className="mt-5 h-px w-12 bg-[#FFD76A]" />

          <h1 className="mt-10 max-w-[950px] font-serif text-[3.5rem] font-light leading-[0.94] tracking-[-0.035em] sm:text-[4.8rem] md:text-[5.8rem] lg:text-[6.6rem]">
            The club starts
            <span className="block italic text-[#FFD76A]">on the course.</span>
          </h1>

          <p className="mt-8 max-w-[760px] text-[16px] font-light leading-8 text-white/68 sm:text-[18px]">
            The Gallaspy Golf Club is being built through participation. You
            do not need to wait for a permanent home to become part of the
            community.
          </p>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.34em] text-[#8B6A34]">
                How To Take Part
              </p>

              <div className="mt-5 h-px w-12 bg-[#B89146]" />
            </div>

            <div>
              <h2 className="max-w-[900px] font-serif text-[2.8rem] font-light leading-[0.98] tracking-[-0.03em] sm:text-[3.8rem] md:text-[4.6rem] lg:text-[5.2rem]">
                Show up.
                <span className="block italic text-[#8B6A34]">
                  Play the game.
                </span>
              </h2>

              <p className="mt-8 max-w-[760px] text-[15px] font-light leading-7 text-[#10263F]/68 sm:text-[17px] sm:leading-8">
                Our early years are about building relationships through golf.
                Club rounds, competition, and gatherings are how The Gallaspy
                takes shape before a permanent course ever exists.
              </p>
            </div>
          </div>

          <div className="mt-16 grid border-t border-[#10263F]/10 sm:mt-20 lg:grid-cols-3">
            {waysToJoin.map((item, index) => (
              <article
                key={item.title}
                className={`py-10 lg:px-8 lg:py-12 ${
                  index !== waysToJoin.length - 1
                    ? "border-b border-[#10263F]/10 lg:border-b-0 lg:border-r"
                    : ""
                }`}
              >
                <p className="text-[8px] font-semibold uppercase tracking-[0.28em] text-[#8B6A34]">
                  {item.number}
                </p>

                <h2 className="mt-5 font-serif text-[2rem] font-light tracking-[-0.02em] sm:text-[2.35rem]">
                  {item.title}
                </h2>

                <div className="mt-5 h-px w-10 bg-[#B89146]" />

                <p className="mt-5 max-w-[330px] text-sm font-light leading-7 text-[#10263F]/60">
                  {item.text}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-16 border-t border-[#10263F]/10 pt-12 sm:mt-20">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#8B6A34]">
                  First Step
                </p>

                <p className="mt-4 max-w-[760px] font-serif text-[2rem] font-light leading-[1.15] sm:text-[2.7rem]">
                  Tell us you want to play.
                  <span className="block italic text-[#8B6A34]">
                    We&apos;ll keep you close to what comes next.
                  </span>
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex min-h-[52px] items-center justify-center border border-[#10263F] bg-[#10263F] px-8 text-[9px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-transparent hover:text-[#10263F]"
              >
                Contact The Club →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
