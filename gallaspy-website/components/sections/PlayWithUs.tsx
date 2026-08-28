import Link from "next/link";

const waysToPlay = [
  {
    number: "01",
    title: "Play",
    text: "Join rounds and club gatherings built around good golf, good people, and a shared respect for the game.",
  },
  {
    number: "02",
    title: "Compete",
    text: "Step into events that give the club its competitive edge, from friendly matches to the Gallaspy Invitational.",
  },
  {
    number: "03",
    title: "Gather",
    text: "Be part of the dinners, conversations, celebrations, and traditions that make a club feel like more than golf.",
  },
];

export default function PlayWithUs() {
  return (
    <section className="relative overflow-hidden bg-[#F7F4EE] px-5 py-20 text-[#10263F] sm:px-8 sm:py-24 lg:px-10 lg:py-32">
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-24">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.34em] text-[#8B6A34] sm:text-[10px] sm:tracking-[0.4em]">
              Play With Us
            </p>

            <div className="mt-5 h-px w-12 bg-[#B89146]" />
          </div>

          <div>
            <h2 className="max-w-[900px] font-serif text-[2.8rem] font-light leading-[0.98] tracking-[-0.03em] sm:text-[3.8rem] md:text-[4.6rem] lg:text-[5.3rem]">
              You don&apos;t have to wait
              <span className="block italic text-[#8B6A34]">
                for the clubhouse.
              </span>
            </h2>

            <p className="mt-8 max-w-[760px] text-[15px] font-light leading-7 text-[#10263F]/68 sm:text-[17px] sm:leading-8">
              The Gallaspy is being built through participation. Every round,
              event, match, and gathering gives the club another piece of its
              identity.
            </p>

            <div className="mt-10">
              <Link
                href="/play"
                className="group inline-flex min-h-[50px] items-center justify-center border border-[#10263F] bg-[#10263F] px-7 text-[9px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-transparent hover:text-[#10263F] sm:px-8 sm:text-[10px]"
              >
                See How To Join Us
                <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 grid border-t border-[#10263F]/10 sm:mt-20 sm:grid-cols-3 lg:mt-24">
          {waysToPlay.map((item, index) => (
            <article
              key={item.title}
              className={`group py-9 sm:px-7 sm:py-12 ${
                index !== waysToPlay.length - 1
                  ? "border-b border-[#10263F]/10 sm:border-b-0 sm:border-r"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-semibold uppercase tracking-[0.26em] text-[#8B6A34]">
                  {item.number}
                </span>

                <span className="h-px w-10 bg-[#B89146]/55 transition-all duration-300 group-hover:w-16" />
              </div>

              <h3 className="mt-8 font-serif text-[2rem] font-light tracking-[-0.02em] text-[#10263F] sm:text-[2.35rem]">
                {item.title}
              </h3>

              <p className="mt-5 max-w-[320px] text-sm font-light leading-7 text-[#10263F]/60">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
