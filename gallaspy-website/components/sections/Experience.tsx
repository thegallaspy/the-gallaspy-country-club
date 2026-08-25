import Image from "next/image";
import Link from "next/link";

const experiences = [
  {
    number: "01",
    eyebrow: "The Heart of The Gallaspy",
    title: "Championship Golf",
    description:
      "At the center of the vision is an 18-hole championship golf course envisioned to reward strategy, shot-making, and memorable play while responding to the natural character of the future property.",
    image: "/images/golf.png",
    imageAlt: "Conceptual championship golf experience at The Gallaspy",
    href: "/club/golf",
    linkLabel: "Explore Golf",
    features: [
      "18 championship holes",
      "Practice and short-game facilities",
      "Walking and cart-friendly design",
      "Tournament-ready experience",
    ],
  },
  {
    number: "02",
    eyebrow: "Signature Dining",
    title: "Mercury Street Restaurant",
    description:
      "A signature dining destination envisioned around chef-driven cuisine, thoughtful hospitality, private dining, outdoor terraces, and memorable gatherings at the heart of the future club.",
    image: "/images/mercurystreet.png",
    imageAlt: "Conceptual Mercury Street Restaurant at The Gallaspy",
    href: "/club/restaurant",
    linkLabel: "Explore Dining",
    features: [
      "Chef-driven dining",
      "Private dining spaces",
      "Outdoor terrace seating",
      "Member and guest hospitality",
    ],
  },
  {
    number: "03",
    eyebrow: "Wellness & Recreation",
    title: "A Complete Club Lifestyle",
    description:
      "The long-term vision brings together wellness, fitness, pools, tennis, pickleball, lodging, recreation, and gathering spaces to create a private-club experience designed for more than golf.",
    image: "/images/wellness.png",
    imageAlt: "Conceptual wellness and recreation experience at The Gallaspy",
    href: "/club/wellness",
    linkLabel: "Explore Wellness",
    features: [
      "Wellness and fitness",
      "Resort-style pools",
      "Tennis and pickleball",
      "Future member lodging",
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
        {/* HEADING */}
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
            Every part of The Gallaspy is being envisioned as part of a
            complete private-club lifestyle where golf, hospitality, dining,
            wellness, recreation, and family tradition come together.
          </p>
        </div>

        {/* EXPERIENCE ROWS */}
        <div className="mt-14 space-y-16 lg:mt-16 lg:space-y-20">
          {experiences.map((experience, index) => {
            const reverse = index % 2 === 1;

            return (
              <article
                key={experience.title}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
              >
                {/* IMAGE */}
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

                </div>

                {/* CONTENT */}
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

                  {/* FEATURES */}
                  <div className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                    {experience.features.map((feature) => (
                      <Feature key={feature} text={feature} />
                    ))}
                  </div>

                  {/* LINK */}
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

      </div>
    </section>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="group flex items-start gap-3 border-t border-[#163A2F]/10 pt-4">
      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B89146] transition-transform duration-300 group-hover:scale-150" />

      <p className="text-sm leading-6 text-[#5D6964]">
        {text}
      </p>
    </div>
  );
}