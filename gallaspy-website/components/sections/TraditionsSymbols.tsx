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
      {/* CLUB MARKS */}
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="flex flex-col gap-5 border-b border-[#10263F]/15 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#B3262D]">
              Club Identity
            </p>

            <h2 className="mt-3 text-[2.25rem] font-black uppercase leading-[0.9] tracking-[-0.045em] sm:text-[3rem]">
              The Marks
            </h2>
          </div>

          <Link
            href="/the-club"
            className="text-[8px] font-black uppercase tracking-[0.22em] text-[#10263F] transition hover:text-[#B3262D]"
          >
            Inside The Club →
          </Link>
        </div>

        <div className="grid sm:grid-cols-3">
          {marks.map((mark, index) => (
            <article
              key={mark.name}
              className={`flex min-h-[190px] items-center gap-5 py-7 sm:flex-col sm:justify-center sm:px-6 sm:text-center ${
                index !== marks.length - 1
                  ? "border-b border-[#10263F]/12 sm:border-b-0 sm:border-r"
                  : ""
              }`}
            >
              <div className="relative h-[90px] w-[110px] shrink-0 sm:h-[105px] sm:w-[130px]">
                <Image
                  src={mark.image}
                  alt={mark.name}
                  fill
                  sizes="130px"
                  className="object-contain"
                />
              </div>

              <div>
                <p className="text-[7px] font-black uppercase tracking-[0.28em] text-[#B3262D]">
                  {mark.label}
                </p>

                <h3 className="mt-2 text-[1rem] font-black uppercase tracking-[-0.02em]">
                  {mark.name}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* TRADITIONS */}
      <div className="bg-[#10263F] text-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:gap-14">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#FFD76A]">
                Traditions
              </p>

              <h2 className="mt-3 text-[2.3rem] font-black uppercase leading-[0.9] tracking-[-0.045em] sm:text-[3rem]">
                The Ones
                <span className="block text-[#E56A70]">
                  We Keep.
                </span>
              </h2>

              <p className="mt-5 max-w-[360px] text-sm leading-6 text-white/55">
                Competition. Gathering. Repetition. The moments that return
                become part of the club.
              </p>

              <Link
                href="/traditions"
                className="mt-6 inline-flex text-[8px] font-black uppercase tracking-[0.22em] text-[#FFD76A] transition hover:text-white"
              >
                Explore Traditions →
              </Link>
            </div>

            <div className="border-t border-white/15">
              {traditions.map((tradition) => (
                <article
                  key={tradition.title}
                  className="grid gap-4 border-b border-white/15 py-5 sm:grid-cols-[54px_1fr_auto] sm:items-center sm:gap-6"
                >
                  <p className="text-[1rem] font-black text-[#E56A70]">
                    {tradition.number}
                  </p>

                  <div>
                    <p className="text-[7px] font-black uppercase tracking-[0.25em] text-[#FFD76A]">
                      {tradition.type}
                    </p>

                    <h3 className="mt-1.5 text-[1.3rem] font-black uppercase tracking-[-0.035em] sm:text-[1.55rem]">
                      {tradition.title}
                    </h3>
                  </div>

                  <span className="hidden text-[#FFD76A] sm:block">
                    →
                  </span>
                </article>
              ))}
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