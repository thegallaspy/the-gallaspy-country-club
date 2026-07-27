import Image from "next/image";
import Link from "next/link";

const wines = [
  {
    id: "mildreds-reserve",
    name: "Mildred’s Reserve",
    varietal: "Cabernet Franc",
    region: "Georgia",
    image: "/images/wine/mildreds-reserve-bottle.png",
    alt: "Mildred’s Reserve Cabernet Franc bottle from The Gallaspy Estate",
    story:
      "Named in honor of Mildred Gallaspy and her lifelong appreciation for wine, Mildred’s Reserve represents heritage, strength, refinement, and the enduring traditions that inspired The Gallaspy.",
    profile:
      "Envisioned as an elegant, structured Cabernet Franc with expressive dark fruit, savory depth, graceful oak influence, and a refined finish.",
    accent: "Burgundy",
    release: "Future Release",
  },
  {
    id: "deja",
    name: "Déjà Cuvée",
    varietal: "Petit Manseng",
    region: "North Georgia",
    image: "/images/wine/deja-bottle.png",
    alt: "Déjà Cuvée Petit Manseng bottle from The Gallaspy Estate",
    story:
      "Inspired by love, partnership, and the future of The Gallaspy legacy, Déjà Cuvée celebrates the journey Cameron Gallaspy-Davis and Deja McCoy are building together.",
    profile:
      "Envisioned as a beautifully balanced Petit Manseng with bright acidity, ripe orchard fruit, tropical character, floral aromatics, and an elegant, refreshing finish.",
    accent: "Estate Gold",
    release: "Future Release",
  },
];

export default function EstateWineCollection() {
  return (
    <section
      id="estate-collection"
      className="overflow-hidden bg-[#10263F] px-5 py-20 text-white sm:px-8 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1120px]">
        {/* Section introduction */}
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-20">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.36em] text-[#FFD76A]">
              Signature Wine Collection
            </p>

            <h2 className="mt-5 font-serif text-[2.8rem] font-light leading-[0.98] text-white sm:text-5xl lg:text-[4.4rem]">
              The Gallaspy
              <span className="block text-[#FFD76A]">Estate</span>
            </h2>

            <div className="mt-7 h-px w-16 bg-[#B89146]" />
          </div>

          <div>
            <p className="text-base leading-8 text-white/88 sm:text-lg">
              The Gallaspy Estate is the signature wine collection of The
              Gallaspy Golf &amp; Country Club—created to honor family, love,
              legacy, craftsmanship, and the moments that bring people
              together.
            </p>

            <p className="mt-5 text-sm leading-7 text-white/65">
              Each wine is being thoughtfully envisioned as part of a broader
              estate experience that will include private tastings, chef-led
              dinners, club celebrations, member allocations, weddings, and
              seasonal traditions.
            </p>
          </div>
        </div>

        {/* Collection header */}
        <div className="mt-16 flex flex-col justify-between gap-5 border-y border-white/10 py-7 sm:flex-row sm:items-center">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FFD76A]">
              The Inaugural Collection
            </p>

            <p className="mt-3 font-serif text-2xl font-light text-white sm:text-3xl">
              Two wines. Two stories. One enduring legacy.
            </p>
          </div>

          <span className="inline-flex w-fit rounded-full border border-[#B89146]/60 bg-[#B89146]/10 px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.24em] text-[#FFD76A]">
            Collection in Development
          </span>
        </div>

        {/* Wine collection */}
        <div className="mt-12 space-y-8">
          {wines.map((wine, index) => (
            <article
              id={wine.id}
              key={wine.id}
              className="group scroll-mt-36 overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.045]"
            >
              <div
                className={`grid lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Bottle presentation */}
                <div className="relative flex min-h-[580px] items-end justify-center overflow-hidden bg-gradient-to-b from-white/[0.08] via-white/[0.025] to-black/25 px-8 pt-12 lg:min-h-[720px]">
                  <div className="absolute left-7 top-7 z-10">
                    <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#FFD76A]">
                      Release {String(index + 1).padStart(2, "0")}
                    </p>
                  </div>

                  <div className="absolute right-7 top-7 z-10 rounded-full border border-white/15 bg-[#10263F]/40 px-4 py-2 backdrop-blur-sm">
                    <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-white/70">
                      {wine.region}
                    </p>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black/40 to-transparent" />

                  <div className="absolute bottom-8 left-1/2 h-12 w-44 -translate-x-1/2 rounded-[50%] bg-black/35 blur-xl" />

                  <div className="relative h-[500px] w-full max-w-[310px] transition duration-700 group-hover:-translate-y-2 lg:h-[640px] lg:max-w-[365px]">
                    <Image
                      src={wine.image}
                      alt={wine.alt}
                      fill
                      sizes="(max-width: 1024px) 310px, 365px"
                      className="object-contain object-bottom drop-shadow-[0_30px_30px_rgba(0,0,0,0.35)]"
                    />
                  </div>
                </div>

                {/* Wine information */}
                <div className="flex items-center px-7 py-12 sm:px-10 lg:px-14 lg:py-16">
                  <div className="w-full">
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FFD76A]">
                      The Gallaspy Estate
                    </p>

                    <h3 className="mt-5 font-serif text-[2.7rem] font-light leading-none text-white sm:text-5xl">
                      {wine.name}
                    </h3>

                    <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.26em] text-white/55">
                      {wine.varietal}
                    </p>

                    <div className="mt-7 h-px w-14 bg-[#B89146]" />

                    <p className="mt-7 text-base leading-8 text-white/85">
                      {wine.story}
                    </p>

                    <div className="mt-7 rounded-[16px] border border-white/10 bg-black/10 p-6">
                      <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#FFD76A]">
                        Envisioned Wine Profile
                      </p>

                      <p className="mt-4 text-sm leading-7 text-white/68">
                        {wine.profile}
                      </p>
                    </div>

                    <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
                      <div className="flex items-center justify-between gap-5 py-4">
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/42">
                          Collection
                        </span>

                        <span className="text-right text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                          Heritage Collection
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-5 py-4">
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/42">
                          Region
                        </span>

                        <span className="text-right text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                          {wine.region}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-5 py-4">
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/42">
                          Design Accent
                        </span>

                        <span className="text-right text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                          {wine.accent}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-5 py-4">
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/42">
                          Availability
                        </span>

                        <span className="text-right text-[10px] font-semibold uppercase tracking-[0.16em] text-[#FFD76A]">
                          {wine.release}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`#${wine.id}-story`}
                      className="mt-9 inline-flex min-h-[46px] w-fit items-center justify-center rounded-full border border-[#FFD76A] px-7 text-[9px] font-bold uppercase tracking-[0.21em] text-[#FFD76A] transition hover:-translate-y-0.5 hover:bg-[#FFD76A] hover:text-[#10263F]"
                    >
                      Discover the Story
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Estate identity statement */}
        <div className="mt-10 overflow-hidden rounded-[26px] border border-white/10 bg-[#163A2F]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[380px] lg:min-h-[500px]">
              <Image
                src="/images/winery.png"
                alt="The planned Gallaspy Estate vineyard and tasting experience"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#163A2F]/50" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/35 to-transparent" />
            </div>

            <div className="flex items-center px-7 py-14 sm:px-10 lg:px-14">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
                  More Than a Bottle
                </p>

                <h3 className="mt-5 font-serif text-[2.5rem] font-light leading-[1.05] text-white sm:text-5xl">
                  Crafted for the
                  <span className="block">Moments That Matter</span>
                </h3>

                <div className="mt-7 h-px w-14 bg-[#B89146]" />

                <p className="mt-7 text-sm leading-7 text-white/75">
                  The Gallaspy Estate collection is envisioned as part of the
                  club’s culture—not simply a product. Each bottle will be
                  connected to private dinners, weddings, member milestones,
                  harvest celebrations, gifting traditions, and memorable
                  evenings throughout the estate.
                </p>

                <Link
                  href="/falcon-society#registration"
                  className="mt-9 inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Follow the Estate Journey
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Development disclosure */}
        <div className="mx-auto mt-9 max-w-4xl rounded-[14px] border border-white/8 bg-white/[0.025] px-6 py-5 text-center">
          <p className="text-[10px] leading-5 text-white/42">
            The Gallaspy Estate wine collection is currently in development.
            Wine profiles, varietals, vintages, regions, production partners,
            packaging, availability, and release dates remain subject to final
            production decisions, winery partnerships, and applicable
            regulatory approvals.
          </p>
        </div>
      </div>
    </section>
  );
}