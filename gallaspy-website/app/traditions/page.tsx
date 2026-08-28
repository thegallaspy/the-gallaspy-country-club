import Image from "next/image";
import Link from "next/link";

const traditions = [
  {
    number: "01",
    label: "Symbol",
    title: "The Falcon",
    text: "The Falcon is one of the defining symbols of The Gallaspy — a mark carried across the club, its events, and the traditions being built from the beginning.",
    image: "/logos/falcon.png",
  },
  {
    number: "02",
    label: "Competition",
    title: "The Mercury Match",
    text: "A competitive club tradition designed to create history through recurring matches, rivalry, and the people who return to compete year after year.",
    image: "/logos/crest.png",
  },
  {
    number: "03",
    label: "Gathering",
    title: "Night at the Nest",
    text: "An annual evening centered on community, recognition, reflection, and celebrating the people helping shape the club.",
    image: "/logos/script.png",
  },
  {
    number: "04",
    label: "Beginning",
    title: "First Flight",
    text: "The opening chapter of The Gallaspy Golf Club — the first gathering of golfers who choose to be part of the club before it has a permanent home.",
    image: "/logos/falcon.png",
  },
];

export default function TraditionsPage() {
  return (
    <main className="bg-white text-[#10263F]">
      <section className="relative overflow-hidden bg-[#10263F] px-5 pb-20 pt-36 text-white sm:px-8 sm:pb-24 sm:pt-40 lg:px-10 lg:pb-32 lg:pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,145,70,0.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <p className="text-[9px] font-semibold uppercase tracking-[0.36em] text-[#FFD76A] sm:text-[10px]">
            Traditions
          </p>

          <div className="mt-5 h-px w-12 bg-[#FFD76A]" />

          <h1 className="mt-10 max-w-[980px] font-serif text-[3.5rem] font-light leading-[0.94] tracking-[-0.035em] sm:text-[4.8rem] md:text-[5.8rem] lg:text-[6.6rem]">
            Tradition starts
            <span className="block italic text-[#FFD76A]">
              with a first time.
            </span>
          </h1>

          <p className="mt-8 max-w-[780px] text-[16px] font-light leading-8 text-white/68 sm:text-[18px]">
            Every tradition people recognize today began as a single moment
            someone decided was worth repeating.
          </p>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.34em] text-[#8B6A34]">
                Built Over Time
              </p>

              <div className="mt-5 h-px w-12 bg-[#B89146]" />
            </div>

            <div>
              <h2 className="max-w-[900px] font-serif text-[2.8rem] font-light leading-[0.98] tracking-[-0.03em] sm:text-[3.8rem] md:text-[4.6rem] lg:text-[5.2rem]">
                We are not inheriting
                <span className="block italic text-[#8B6A34]">
                  someone else&apos;s history.
                </span>
              </h2>

              <div className="mt-8 max-w-[780px] space-y-6 text-[15px] font-light leading-7 text-[#10263F]/68 sm:text-[17px] sm:leading-8">
                <p>
                  The Gallaspy is creating its own traditions through the
                  people who play, compete, gather, and return.
                </p>

                <p>
                  Some traditions will begin intentionally. Others will emerge
                  naturally from the moments the club decides are worth
                  carrying forward.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 grid border-t border-[#10263F]/10 sm:mt-20 lg:grid-cols-2">
            {traditions.map((item, index) => (
              <article
                key={item.title}
                className={`group py-12 lg:p-12 ${
                  index % 2 === 0
                    ? "lg:border-r lg:border-[#10263F]/10"
                    : ""
                } ${
                  index < 2
                    ? "border-b border-[#10263F]/10"
                    : index === 2
                    ? "border-b border-[#10263F]/10 lg:border-b-0"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between gap-8">
                  <div className="relative h-20 w-20 sm:h-24 sm:w-24">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-contain"
                    />
                  </div>

                  <span className="font-serif text-4xl font-light text-[#10263F]/10 transition-colors duration-300 group-hover:text-[#B89146]">
                    {item.number}
                  </span>
                </div>

                <p className="mt-9 text-[8px] font-semibold uppercase tracking-[0.28em] text-[#8B6A34]">
                  {item.label}
                </p>

                <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-tight tracking-[-0.02em] sm:text-[2.8rem]">
                  {item.title}
                </h2>

                <div className="mt-5 h-px w-10 bg-[#B89146] transition-all duration-300 group-hover:w-16" />

                <p className="mt-6 max-w-[480px] text-sm font-light leading-7 text-[#10263F]/60 sm:text-[15px]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7F4EE] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#8B6A34]">
                The Next Tradition
              </p>

              <h2 className="mt-5 max-w-[820px] font-serif text-[2.5rem] font-light leading-[1.05] tracking-[-0.025em] sm:text-[3.4rem]">
                Some traditions are still
                <span className="block italic text-[#8B6A34]">
                  waiting for their first chapter.
                </span>
              </h2>
            </div>

            <Link
              href="/play"
              className="inline-flex min-h-[52px] items-center justify-center border border-[#10263F] bg-[#10263F] px-8 text-[9px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-transparent hover:text-[#10263F]"
            >
              Be Part Of It →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
