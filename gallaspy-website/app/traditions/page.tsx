import Image from "next/image";
import Link from "next/link";

const marks = [
  {
    number: "01",
    title: "The Falcon",
    image: "/logos/falcon.png",
    text: "A defining symbol of The Gallaspy — carried across the club, its apparel, competition, and identity.",
  },
  {
    number: "02",
    title: "The Crest",
    image: "/logos/crest.png",
    text: "The club crest — formal, recognizable, and built to carry The Gallaspy across generations.",
  },
  {
    number: "03",
    title: "The Script",
    image: "/logos/script.png",
    text: "The signature mark of The Gallaspy — expressive, familiar, and unmistakably part of the club.",
  },
];

const traditions = [
  {
    number: "01",
    eyebrow: "Club Match",
    title: "The Mercury Match",
    text: "A recurring competitive tradition built around matches, rivalry, and the golfers who return to compete year after year.",
  },
  {
    number: "02",
    eyebrow: "Flagship Tournament",
    title: "The Gallaspy Invitational",
    text: "The signature tournament of The Gallaspy — where competition, atmosphere, and club identity come together.",
  },
  {
    number: "03",
    eyebrow: "Annual Gathering",
    title: "Night at the Nest",
    text: "An annual gathering centered on the people of the club — recognition, celebration, and the moments worth carrying forward.",
  },
];

export default function TraditionsPage() {
  return (
    <main className="bg-[#F3EFE6] text-[#10263F]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#10263F] px-5 pb-16 pt-32 text-white sm:px-8 sm:pb-20 sm:pt-36 lg:px-10 lg:pb-24 lg:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(12,53,45,0.85),transparent_38%)]" />

        <div className="absolute right-[-4%] top-[8%] text-[12rem] font-black uppercase leading-none tracking-[-0.09em] text-white/[0.025] sm:text-[18rem] lg:text-[23rem]">
          03
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 bg-[#B3262D]" />
            <p className="text-[8px] font-black uppercase tracking-[0.36em] text-[#FFD76A]">
              Traditions &amp; Symbols
            </p>
          </div>

          <h1 className="mt-7 max-w-[1050px] text-[3.6rem] font-black uppercase leading-[0.82] tracking-[-0.07em] sm:text-[5rem] md:text-[6.4rem] lg:text-[7.2rem]">
            Identity Is
            <span className="block text-[#FFD76A]">
              Built Over Time.
            </span>
          </h1>

          <div className="mt-8 grid gap-8 border-t border-white/15 pt-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <p className="max-w-[720px] text-[15px] leading-7 text-white/58 sm:text-[17px] sm:leading-8">
              Some things begin as marks. Others begin as moments. Over time,
              both become part of how a club recognizes itself.
            </p>

            <p className="text-[8px] font-black uppercase tracking-[0.24em] text-white/30">
              The Gallaspy · Est. 2026
            </p>
          </div>
        </div>
      </section>

      {/* THE MARKS */}
      <section className="bg-[#F3EFE6] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.5fr_1.5fr] lg:gap-16">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.34em] text-[#8B6A34]">
                The Marks
              </p>

              <div className="mt-5 h-[3px] w-12 bg-[#B3262D]" />
            </div>

            <div>
              <h2 className="max-w-[850px] text-[2.9rem] font-black uppercase leading-[0.9] tracking-[-0.055em] sm:text-[4.1rem] lg:text-[4.8rem]">
                Three Marks.
                <span className="block font-serif font-light normal-case italic tracking-[-0.035em] text-[#8B6A34]">
                  One club.
                </span>
              </h2>

              <p className="mt-6 max-w-[720px] text-[15px] leading-7 text-[#10263F]/58">
                The Falcon, Crest, and Script each carry a different expression
                of The Gallaspy, while belonging to the same identity.
              </p>
            </div>
          </div>

          <div className="mt-14 border-t border-[#10263F]/12">
            {marks.map((mark, index) => (
              <article
                key={mark.title}
                className="grid gap-8 border-b border-[#10263F]/12 py-10 md:grid-cols-[110px_1fr] lg:grid-cols-[120px_380px_1fr] lg:items-center lg:gap-12 lg:py-12"
              >
                <p className="text-[2.5rem] font-black leading-none tracking-[-0.06em] text-[#10263F]/12">
                  {mark.number}
                </p>

                <div className="relative h-[180px] w-full max-w-[330px] sm:h-[220px] lg:h-[250px]">
                  <Image
                    src={mark.image}
                    alt={mark.title}
                    fill
                    sizes="330px"
                    className="object-contain object-left"
                  />
                </div>

                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.28em] text-[#B3262D]">
                    Club Mark
                  </p>

                  <h3 className="mt-3 text-[2.2rem] font-black uppercase leading-none tracking-[-0.045em] sm:text-[2.7rem]">
                    {mark.title}
                  </h3>

                  <p className="mt-5 max-w-[520px] text-sm leading-7 text-[#10263F]/58">
                    {mark.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TRADITIONS */}
      <section className="bg-[#10263F] text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.5fr_1.5fr] lg:gap-16">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.34em] text-[#FFD76A]">
                The Traditions
              </p>

              <div className="mt-5 h-[3px] w-12 bg-[#B3262D]" />
            </div>

            <div>
              <h2 className="max-w-[900px] text-[2.9rem] font-black uppercase leading-[0.9] tracking-[-0.055em] sm:text-[4.1rem] lg:text-[4.9rem]">
                Some Things
                <span className="block font-serif font-light normal-case italic tracking-[-0.035em] text-[#FFD76A]">
                  are worth repeating.
                </span>
              </h2>

              <p className="mt-6 max-w-[720px] text-[15px] leading-7 text-white/48">
                Traditions are not decorations. They become part of the club
                because people return to them.
              </p>
            </div>
          </div>

          <div className="mt-14 border-t border-white/15">
            {traditions.map((tradition) => (
              <article
                key={tradition.title}
                className="group grid gap-6 border-b border-white/15 py-9 transition-colors duration-300 hover:bg-white/[0.025] md:grid-cols-[90px_1fr] lg:grid-cols-[110px_310px_1fr] lg:items-center lg:gap-10 lg:px-4 lg:py-10"
              >
                <p className="text-[2.2rem] font-black leading-none tracking-[-0.06em] text-white/10 transition group-hover:text-[#B3262D]">
                  {tradition.number}
                </p>

                <div>
                  <p className="text-[7px] font-black uppercase tracking-[0.27em] text-[#FFD76A]">
                    {tradition.eyebrow}
                  </p>

                  <h3 className="mt-3 text-[1.7rem] font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-[2rem]">
                    {tradition.title}
                  </h3>
                </div>

                <p className="max-w-[560px] text-sm leading-7 text-white/48">
                  {tradition.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="bg-[#0C352D] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-[#B3262D]" />
                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#FFD76A]">
                  The Next Chapter
                </p>
              </div>

              <h2 className="mt-5 max-w-[720px] text-[2.7rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[3.7rem]">
                History Needs
                <span className="block">People In It.</span>
              </h2>
            </div>

            <Link
              href="/play"
              className="inline-flex min-h-[50px] items-center justify-center bg-[#FFD76A] px-7 text-[8px] font-black uppercase tracking-[0.23em] text-[#10263F] transition duration-300 hover:-translate-y-1 hover:bg-white"
            >
              Play With Us →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
