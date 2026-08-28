import Image from "next/image";
import Link from "next/link";

const traditions = [
  {
    title: "The Falcon",
    label: "Symbol",
    text: "The mark of The Gallaspy — carried across the club, its events, and the traditions still being written.",
    image: "/logos/falcon.png",
  },
  {
    title: "The Mercury Match",
    label: "Competition",
    text: "A club match built to become one of The Gallaspy's defining competitive traditions.",
    image: "/logos/crest.png",
  },
  {
    title: "Night at the Nest",
    label: "Gathering",
    text: "An annual evening centered on community, reflection, recognition, and the people shaping the club.",
    image: "/logos/script.png",
  },
];

export default function TraditionsSymbols() {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-20 text-[#10263F] sm:px-8 sm:py-24 lg:px-10 lg:py-32">
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-24">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.34em] text-[#8B6A34] sm:text-[10px] sm:tracking-[0.4em]">
              Traditions &amp; Symbols
            </p>

            <div className="mt-5 h-px w-12 bg-[#B89146]" />
          </div>

          <div>
            <h2 className="max-w-[920px] font-serif text-[2.8rem] font-light leading-[0.98] tracking-[-0.03em] sm:text-[3.8rem] md:text-[4.6rem] lg:text-[5.3rem]">
              Tradition doesn&apos;t arrive
              <span className="block italic text-[#8B6A34]">
                fully formed.
              </span>
            </h2>

            <p className="mt-8 max-w-[760px] text-[15px] font-light leading-7 text-[#10263F]/68 sm:text-[17px] sm:leading-8">
              It begins with names, symbols, matches, gatherings, stories, and
              moments people choose to carry forward. The Gallaspy is building
              those traditions deliberately from the beginning.
            </p>

            <div className="mt-10">
              <Link
                href="/traditions"
                className="group inline-flex items-center text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34] transition-colors duration-300 hover:text-[#10263F] sm:text-[10px]"
              >
                Explore The Traditions
                <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 grid border-t border-[#10263F]/10 sm:mt-20 lg:mt-24 lg:grid-cols-3">
          {traditions.map((item, index) => (
            <article
              key={item.title}
              className={`group py-10 lg:px-8 lg:py-12 ${
                index !== traditions.length - 1
                  ? "border-b border-[#10263F]/10 lg:border-b-0 lg:border-r"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="relative h-16 w-16 sm:h-20 sm:w-20">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </div>

                <span className="font-serif text-3xl font-light text-[#10263F]/10 transition-colors duration-300 group-hover:text-[#B89146]">
                  0{index + 1}
                </span>
              </div>

              <p className="mt-8 text-[8px] font-semibold uppercase tracking-[0.28em] text-[#8B6A34]">
                {item.label}
              </p>

              <h3 className="mt-4 font-serif text-[2rem] font-light leading-tight tracking-[-0.02em] text-[#10263F] sm:text-[2.35rem]">
                {item.title}
              </h3>

              <div className="mt-5 h-px w-10 bg-[#B89146] transition-all duration-300 group-hover:w-16" />

              <p className="mt-5 max-w-[330px] text-sm font-light leading-7 text-[#10263F]/60">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
