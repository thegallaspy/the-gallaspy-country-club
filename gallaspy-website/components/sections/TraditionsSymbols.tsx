import Image from "next/image";
import Link from "next/link";

const marks = [
  {
    name: "The Falcon",
    label: "Club Symbol",
    image: "/logos/falcon.png",
  },
  {
    name: "The Crest",
    label: "Club Crest",
    image: "/logos/crest.png",
  },
  {
    name: "The Script",
    label: "Club Wordmark",
    image: "/logos/script.png",
  },
];

const traditions = [
  {
    number: "01",
    title: "The Mercury Match",
    type: "Club Competition",
  },
  {
    number: "02",
    title: "The Gallaspy Invitational",
    type: "Annual Tournament",
  },
  {
    number: "03",
    title: "Night at the Nest",
    type: "Annual Gathering",
  },
];

export default function TraditionsSymbols() {
  return (
    <section className="overflow-hidden bg-[#F4F0E7] text-[#10263F]">
      {/* MARKS */}
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#B3262D]" />

              <p className="text-[8px] font-black uppercase tracking-[0.34em] text-[#8B6A34]">
                Club Identity
              </p>
            </div>

            <h2 className="mt-5 text-[2.9rem] font-black uppercase leading-[0.86] tracking-[-0.06em] sm:text-[4rem]">
              Three Marks.
              <span className="block font-serif font-light normal-case italic tracking-[-0.035em] text-[#8B6A34]">
                One club.
              </span>
            </h2>
          </div>

          <p className="max-w-[520px] text-sm leading-7 text-[#10263F]/55 lg:justify-self-end">
            The Falcon, The Crest, and The Script carry the identity of The
            Gallaspy across competition, apparel, events, and the traditions
            being built around the game.
          </p>
        </div>

        <div className="mt-10 grid border-y border-[#10263F]/12 sm:grid-cols-3">
          {marks.map((mark, index) => (
            <article
              key={mark.name}
              className={`flex min-h-[250px] flex-col items-center justify-center px-6 py-8 text-center sm:min-h-[290px] ${
                index !== marks.length - 1
                  ? "border-b border-[#10263F]/12 sm:border-b-0 sm:border-r"
                  : ""
              }`}
            >
              <p className="text-[7px] font-black uppercase tracking-[0.3em] text-[#B3262D]">
                {mark.label}
              </p>

              <div className="relative my-5 h-[140px] w-[170px] sm:h-[160px] sm:w-[190px] lg:h-[175px] lg:w-[210px]">
                <Image
                  src={mark.image}
                  alt={mark.name}
                  fill
                  sizes="210px"
                  className="object-contain"
                />
              </div>

              <h3 className="text-[10px] font-black uppercase tracking-[0.22em]">
                {mark.name}
              </h3>
            </article>
          ))}
        </div>
      </div>

      {/* TRADITIONS PREVIEW */}
      <div className="bg-[#10263F] text-white">
        <div className="h-[6px] bg-[#B3262D]" />

        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.34em] text-[#FFD76A]">
                Traditions
              </p>

              <h2 className="mt-5 text-[2.8rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[3.8rem]">
                Built To
                <span className="block text-[#E56A70]">Come Back.</span>
              </h2>

              <p className="mt-6 max-w-[420px] text-sm leading-7 text-white/50">
                Some moments happen once. Traditions are the ones the club
                chooses to repeat.
              </p>

              <Link
                href="/traditions"
                className="mt-7 inline-flex text-[8px] font-black uppercase tracking-[0.24em] text-[#FFD76A] transition hover:text-white"
              >
                Explore Traditions →
              </Link>
            </div>

            <div className="border-t border-white/15">
              {traditions.map((tradition) => (
                <article
                  key={tradition.title}
                  className="grid gap-4 border-b border-white/15 py-6 sm:grid-cols-[64px_1fr_auto] sm:items-center sm:gap-8"
                >
                  <p className="text-[2rem] font-black leading-none tracking-[-0.05em] text-[#E56A70]">
                    {tradition.number}
                  </p>

                  <div>
                    <p className="text-[7px] font-black uppercase tracking-[0.27em] text-[#FFD76A]">
                      {tradition.type}
                    </p>

                    <h3 className="mt-2 text-[1.5rem] font-black uppercase leading-none tracking-[-0.04em] sm:text-[1.8rem]">
                      {tradition.title}
                    </h3>
                  </div>

                  <span className="hidden text-[#FFD76A] sm:block">→</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
