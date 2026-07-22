import Image from "next/image";
import Link from "next/link";

const experiences = [
  {
    number: "01",
    eyebrow: "The Heart of The Gallaspy",
    title: "Championship Golf",
    description:
      "A thoughtfully envisioned 18-hole championship course shaped by rolling fairways, strategic bunkering, dramatic greens, and a setting designed to be both memorable and rewarding.",
    image: "/images/golf.png",
    imageAlt: "Championship golf experience at The Gallaspy",
    href: "/club#golf",
    linkLabel: "Explore Golf",
    features: [
      "18 championship holes",
      "Practice and short-game facilities",
      "Walking and cart friendly",
      "Tournament-quality experience",
    ],
  },
  {
    number: "02",
    eyebrow: "Signature Dining",
    title: "Mercury Street Restaurant",
    description:
      "A refined dining destination envisioned with chef-driven menus, private dining, outdoor terraces, and a wine program connected to the future vineyard and winery.",
    image: "/images/mercurystreet.png",
    imageAlt: "Mercury Street Restaurant at The Gallaspy",
    href: "/club#restaurants",
    linkLabel: "Explore Dining",
    features: [
      "Chef-driven dining",
      "Private dining spaces",
      "Outdoor terrace views",
      "Integrated wine program",
    ],
  },
  {
    number: "03",
    eyebrow: "Wellness & Recreation",
    title: "A Complete Club Lifestyle",
    description:
      "Wellness, spa, pools, fitness, tennis, pickleball, member lodging, and year-round recreation come together to create a complete private-club lifestyle.",
    image: "/images/wellness.png",
    imageAlt: "Wellness and recreation at The Gallaspy",
    href: "/club#wellness",
    linkLabel: "Explore Wellness",
    features: [
      "Full-service wellness spa",
      "Resort-style pools",
      "Tennis and pickleball",
      "Member lodging",
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="overflow-hidden bg-[#F7F4EE] px-5 py-16 text-[#163A2F] sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-[#9A793A] sm:text-xs">
            The Gallaspy Experience
          </p>

          <h2 className="mt-4 font-serif text-[2.5rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl lg:text-[3.5rem]">
            A Lifestyle Beyond
            <span className="block">Championship Golf</span>
          </h2>

          <div className="mx-auto mt-6 h-px w-16 bg-[#B89146]" />

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#52605A] sm:text-base sm:leading-8">
            Every part of The Gallaspy is being planned to create a complete
            private-club lifestyle where golf, hospitality, dining, wellness,
            recreation, and family tradition come together.
          </p>
        </div>

        {/* Experience rows */}
        <div className="mt-14 space-y-16 lg:mt-16 lg:space-y-24">
          {experiences.map((experience, index) => {
            const reverse = index % 2 === 1;

            return (
              <article
                key={experience.title}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
              >
                {/* Image */}
                <div
                  className={`group relative h-[320px] overflow-hidden rounded-[22px] shadow-[0_22px_60px_rgba(16,38,63,0.14)] sm:h-[410px] lg:h-[500px] ${
                    reverse ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={experience.image}
                    alt={experience.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 576px"
                    className="object-cover transition duration-[1400ms] ease-out group-hover:scale-[1.045]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#071C17]/60 via-transparent to-transparent" />

                  <div className="absolute inset-0 bg-gradient-to-r from-[#071C17]/16 via-transparent to-transparent" />

                  {/* Image number */}
                  <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-[#10263F]/55 text-[10px] font-semibold tracking-[0.18em] text-[#FFD76A] backdrop-blur-md sm:left-6 sm:top-6">
                    {experience.number}
                  </div>

                  {/* Image label */}
                  <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6">
                    <div className="inline-flex rounded-full border border-white/20 bg-[#10263F]/55 px-4 py-2 backdrop-blur-md">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/85">
                        The Gallaspy Golf &amp; Country Club
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={reverse ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-4">
                    <span className="font-serif text-4xl font-light text-[#B89146]/45">
                      {experience.number}
                    </span>

                    <div className="h-px w-12 bg-[#B89146]" />
                  </div>

                  <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#9A793A] sm:text-xs">
                    {experience.eyebrow}
                  </p>

                  <h3 className="mt-4 max-w-xl font-serif text-[2.2rem] font-light leading-[1.05] text-[#10263F] sm:text-4xl lg:text-[3rem]">
                    {experience.title}
                  </h3>

                  <p className="mt-6 max-w-xl text-sm leading-7 text-[#52605A] sm:text-base sm:leading-8">
                    {experience.description}
                  </p>

                  {/* Features */}
                  <div className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                    {experience.features.map((feature) => (
                      <Feature key={feature} text={feature} />
                    ))}
                  </div>

                  {/* Link */}
                  <div className="mt-9">
                    <Link
                      href={experience.href}
                      className="group/link inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#B89146] px-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#163A2F] transition duration-300 hover:-translate-y-1 hover:bg-[#B89146] hover:text-white"
                    >
                      {experience.linkLabel}

                      <span
                        className="ml-3 transition-transform duration-300 group-hover/link:translate-x-1"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Closing panel */}
        <div className="relative mt-16 overflow-hidden rounded-[24px] bg-[#10263F] px-6 py-10 text-center text-white shadow-[0_22px_60px_rgba(16,38,63,0.18)] sm:px-10 sm:py-12 lg:mt-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,215,106,0.11),transparent_42%)]" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#FFD76A]">
              One Complete Destination
            </p>

            <h3 className="mt-4 font-serif text-3xl font-light leading-tight sm:text-4xl lg:text-5xl">
              Designed Around the Way
              <span className="block">
                Members Live, Gather, and Belong
              </span>
            </h3>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
              From early-morning golf to evening dining, family recreation,
              wellness, events, and overnight stays, The Gallaspy is envisioned
              as a private club experience that extends far beyond the course.
            </p>

            <Link
              href="/club"
              className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#FFD76A] px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#FFD76A] hover:text-[#10263F]"
            >
              Explore the Club

              <span className="ml-3" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="group flex items-start gap-3 border-t border-[#163A2F]/10 pt-4">
      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B89146] transition-transform duration-300 group-hover:scale-150" />

      <p className="text-sm leading-6 text-[#5D6964]">{text}</p>
    </div>
  );
}