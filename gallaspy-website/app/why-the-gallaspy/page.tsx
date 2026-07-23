import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why The Gallaspy | The Gallaspy Golf & Country Club",
  description:
    "Discover the vision, location, lifestyle, legacy, and long-term development plan behind The Gallaspy Golf & Country Club in Covington, Georgia.",
};

const reasons = [
  {
    number: "01",
    title: "A Strategic Location",
    description:
      "Covington offers access to Metro Atlanta, expanding communities, major transportation routes, and a landscape capable of supporting a true destination club.",
  },
  {
    number: "02",
    title: "A Rare Land Opportunity",
    description:
      "The 585.6-acre vision provides the scale required for championship golf, hospitality, wellness, residential living, recreation, and future growth.",
  },
  {
    number: "03",
    title: "A Complete Club Lifestyle",
    description:
      "The Gallaspy brings golf, dining, lodging, wellness, family recreation, events, and vineyard experiences together within one private destination.",
  },
  {
    number: "04",
    title: "Built for Generations",
    description:
      "The club is being envisioned around tradition, family, and excellence so that membership can become part of a lasting family legacy.",
  },
];

const guidingPrinciples = [
  {
    number: "01",
    title: "Tradition",
    description:
      "Honoring the timeless values, rituals, standards, and sense of belonging that define the world’s most distinguished private clubs.",
  },
  {
    number: "02",
    title: "Family",
    description:
      "Creating a place where every generation feels welcome and where shared experiences become lasting family traditions.",
  },
  {
    number: "03",
    title: "Excellence",
    description:
      "Pursuing exceptional quality in the land plan, architecture, golf, hospitality, service, and every member interaction.",
  },
  {
    number: "04",
    title: "Hospitality",
    description:
      "Delivering thoughtful, gracious, and personal service that makes members and guests feel genuinely welcomed.",
  },
  {
    number: "05",
    title: "Stewardship",
    description:
      "Respecting the land, protecting the natural setting, and developing the property with long-term responsibility.",
  },
  {
    number: "06",
    title: "Legacy",
    description:
      "Building an institution that creates meaningful relationships, family memories, and enduring value for generations.",
  },
];

const experiences = [
  {
    eyebrow: "The Game",
    title: "Championship Golf",
    description:
      "An 18-hole championship course supported by a practice range, short-game complex, putting areas, and a complete golf experience.",
    image: "/images/masterplan-render.png",
    href: "/the-club/golf",
  },
  {
    eyebrow: "The Heart of the Club",
    title: "Grand Clubhouse",
    description:
      "A refined gathering place for dining, private events, member traditions, celebrations, and everyday club life.",
    image: "/images/clubhouse.png",
    href: "/master-plan",
  },
  {
    eyebrow: "The Table",
    title: "Mercury Street Restaurant",
    description:
      "A signature dining destination envisioned around exceptional cuisine, gracious hospitality, and memorable experiences.",
    image: "/images/arrival.png",
    href: "/the-club/restaurant",
  },
  {
    eyebrow: "The Retreat",
    title: "Wellness & Spa",
    description:
      "A complete wellness environment featuring fitness, spa treatments, restorative experiences, pools, and personal care.",
    image: "/images/clubhouse.png",
    href: "/the-club/wellness",
  },
  {
    eyebrow: "The Estate",
    title: "Vineyard & Events",
    description:
      "A vineyard, wine program, event pavilion, and gathering spaces designed for celebrations, tastings, and private occasions.",
    image: "/images/masterplan-render.png",
    href: "/the-club/vineyard",
  },
  {
    eyebrow: "The Stay",
    title: "Member Lodging",
    description:
      "Private lodging designed to extend the club experience for members, families, invited guests, and special events.",
    image: "/images/arrival.png",
    href: "/master-plan",
  },
];

const phases = [
  {
    phase: "Phase I",
    title: "Land, Planning & Infrastructure",
    description:
      "Site control, professional planning, engineering, approvals, utilities, roads, and the foundation for future development.",
  },
  {
    phase: "Phase II",
    title: "Championship Golf",
    description:
      "Construction of the 18-hole course, practice facilities, short-game complex, putting areas, and golf operations infrastructure.",
  },
  {
    phase: "Phase III",
    title: "Clubhouse & Dining",
    description:
      "Development of the grand clubhouse, Mercury Street Restaurant, member gathering spaces, terraces, and private event facilities.",
  },
  {
    phase: "Phase IV",
    title: "Wellness, Lodging & Recreation",
    description:
      "Wellness and spa facilities, pools, racquet sports, member lodging, family recreation, and supporting hospitality services.",
  },
  {
    phase: "Phase V",
    title: "Vineyard, Events & Expansion",
    description:
      "Vineyard and winery experiences, the Event Pavilion, residential growth, and future additions to the club community.",
  },
];

const legacyTimeline = [
  {
    number: "01",
    title: "The Vision",
    description:
      "Establish the purpose, identity, guiding principles, and long-term direction of The Gallaspy.",
  },
  {
    number: "02",
    title: "Land Acquisition",
    description:
      "Secure the property capable of supporting the complete golf, lifestyle, hospitality, and residential vision.",
  },
  {
    number: "03",
    title: "Planning & Approvals",
    description:
      "Complete professional planning, engineering, design, zoning, infrastructure strategy, and development approvals.",
  },
  {
    number: "04",
    title: "Construction",
    description:
      "Bring the master plan to life through a carefully managed and financially disciplined phased development.",
  },
  {
    number: "05",
    title: "Opening Day",
    description:
      "Welcome the first membership generation and begin the traditions that will define the club.",
  },
  {
    number: "06",
    title: "Future Generations",
    description:
      "Preserve the club’s standards, relationships, traditions, and legacy for members and families who follow.",
  },
];

export default function WhyTheGallaspyPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#1E3557]">
      {/* Hero */}
      <section className="relative flex min-h-[78vh] items-center overflow-hidden px-5 pt-[72px] sm:px-8">
        <Image
          src="/images/masterplan-render.png"
          alt="Proposed master plan for The Gallaspy Golf and Country Club"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#10263F]/68" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10263F]/95 via-[#10263F]/68 to-[#10263F]/25" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#10263F]/45 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1060px] py-20 text-white sm:py-24">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#FFD76A]">
              Why The Gallaspy?
            </p>

            <h1 className="mt-5 font-serif text-[3rem] font-light leading-[0.98] text-white sm:text-6xl lg:text-[5rem]">
              A Vision Rooted
              <span className="block text-[#FFD76A]">in Legacy</span>
            </h1>

            <div className="mt-7 h-px w-16 bg-[#B89146]" />

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              The Gallaspy Golf &amp; Country Club is being created as more than
              a destination. It is a long-term vision for championship golf,
              private hospitality, family traditions, wellness, and enduring
              value in Covington, Georgia.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#vision"
                className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Discover the Vision
              </Link>

              <Link
                href="/master-plan"
                className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/55 bg-white/[0.05] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#FFD76A] hover:text-[#FFD76A]"
              >
                Explore the Master Plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section
        id="vision"
        className="scroll-mt-24 bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24"
      >
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              The Vision
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Created to Become
              <span className="block">a Southern Tradition</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-base leading-8 text-[#1E3557]">
              Great clubs are not built overnight. They are shaped through
              vision, thoughtful planning, exceptional service, and an
              unwavering commitment to quality.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              The Gallaspy is being envisioned as a place where families build
              traditions, friendships deepen, and generations feel connected
              to a shared private-club experience.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              Every destination within the master plan is intended to contribute
              to one complete experience—from the first arrival along Gallaspy
              Boulevard to championship golf, dining, wellness, recreation,
              lodging, events, and private residential living.
            </p>
          </div>

          <div className="relative min-h-[440px] overflow-hidden rounded-[22px]">
            <Image
              src="/images/arrival.png"
              alt="Arrival experience at The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/50 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#FFD76A]">
                The Arrival Experience
              </p>

              <p className="mt-3 max-w-md font-serif text-2xl font-light leading-tight">
                Every great destination begins with a memorable arrival.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Reasons */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              The Opportunity
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Why This Project Matters
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#1E3557]/80">
              The Gallaspy combines scale, location, lifestyle, and long-term
              vision in a way that creates the foundation for a truly
              distinctive private club.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {reasons.map((reason) => (
              <article
                key={reason.number}
                className="group rounded-[18px] border border-[#1E3557]/10 bg-[#F7F4EE] p-6 transition hover:-translate-y-1 hover:border-[#B89146]/40 hover:shadow-lg sm:p-7"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B89146]">
                  {reason.number}
                </p>

                <h3 className="mt-5 font-serif text-2xl font-light text-[#10263F] sm:text-[1.8rem]">
                  {reason.title}
                </h3>

                <div className="mt-4 h-px w-10 bg-[#B89146] transition-all group-hover:w-16" />

                <p className="mt-4 text-sm leading-7 text-[#1E3557]/80">
                  {reason.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Covington */}
      <section className="bg-[#1E3557] px-5 py-16 text-white sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative min-h-[430px] overflow-hidden rounded-[22px]">
            <Image
              src="/images/masterplan-render.png"
              alt="Proposed 585.6-acre home of The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/55 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-7">
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#FFD76A]">
                Proposed Development Vision
              </p>

              <p className="mt-2 font-serif text-2xl font-light text-white">
                Covington, Georgia
              </p>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
              Why Covington
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">
              Room to Build
              <span className="block">Something Extraordinary</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-base leading-8 text-white/85">
              Covington provides the rare combination of natural beauty,
              accessibility, available land, and proximity to one of the
              Southeast&apos;s most important metropolitan areas.
            </p>

            <p className="mt-5 text-sm leading-7 text-white/72">
              The proposed 585.6-acre setting offers the space to create a
              complete private destination while preserving privacy, open
              views, landscaped arrival experiences, and future flexibility.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                "Metro Atlanta Access",
                "585.6-Acre Vision",
                "Rolling Landscape",
                "Long-Term Growth",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[14px] border border-white/15 bg-white/[0.06] px-4 py-4"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guiding Principles */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Our Guiding Principles
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              The Values Behind the Vision
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#1E3557]/80">
              The character of The Gallaspy will be defined not only by what is
              built, but by the values that guide every decision.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {guidingPrinciples.map((principle) => (
              <article
                key={principle.title}
                className="rounded-[18px] border border-[#1E3557]/10 bg-white p-7"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B89146]">
                  {principle.number}
                </p>

                <h3 className="mt-5 font-serif text-3xl font-light text-[#10263F]">
                  {principle.title}
                </h3>

                <div className="mt-5 h-px w-10 bg-[#B89146]" />

                <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
                The Club Lifestyle
              </p>

              <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
                One Destination.
                <span className="block">Many Experiences.</span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-[#1E3557]/75">
              Every part of The Gallaspy is being designed to contribute to a
              complete private-club lifestyle.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {experiences.map((experience) => (
              <Link
                key={experience.title}
                href={experience.href}
                className="group relative min-h-[390px] overflow-hidden rounded-[20px]"
              >
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/95 via-[#10263F]/30 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#FFD76A]">
                    {experience.eyebrow}
                  </p>

                  <h3 className="mt-3 font-serif text-3xl font-light">
                    {experience.title}
                  </h3>

                  <div className="mt-4 h-px w-10 bg-[#B89146] transition-all group-hover:w-16" />

                  <p className="mt-4 text-sm leading-6 text-white/75">
                    {experience.description}
                  </p>

                  <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#FFD76A]">
                    Explore Experience →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Development Phases */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Development Vision
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Built Thoughtfully
              <span className="block">Across Five Phases</span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              The project is planned as a phased development over approximately
              eight to ten years, allowing each major component to be carefully
              planned, financed, and delivered.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {phases.map((item, index) => (
              <article
                key={item.phase}
                className="grid gap-5 rounded-[18px] border border-[#1E3557]/10 bg-white p-6 md:grid-cols-[120px_1fr] md:items-start sm:p-7"
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#B89146]">
                    {item.phase}
                  </p>

                  <p className="mt-2 font-serif text-3xl font-light text-[#10263F]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-light text-[#10263F]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#1E3557]/80">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Statement */}
      <section className="bg-[#163A2F] px-5 py-16 text-white sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
              A Message From the Founder
            </p>

            <blockquote className="mt-6 font-serif text-[2rem] font-light leading-[1.2] text-white sm:text-[2.8rem]">
              “This is more than the beginning of a country club. This is the
              beginning of a legacy.”
            </blockquote>

            <div className="mt-7 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/78">
              The Gallaspy is being created with the belief that a truly great
              club can become part of the identity of its members, their
              families, and the community it serves.
            </p>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70">
              The goal is not simply to develop a collection of amenities. It
              is to create a place of belonging—one where meaningful
              relationships are formed, traditions are protected, and future
              generations understand the value of what was established before
              them.
            </p>

            <div className="mt-7">
              <p className="font-serif text-2xl italic text-[#FFD76A]">
                Cameron Gallaspy
              </p>

              <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.22em] text-white/60">
                Founder &amp; Managing Partner
              </p>
            </div>
          </div>

          <div className="rounded-[20px] border border-white/15 bg-white/[0.06] p-7 sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#FFD76A]">
              Continue the Story
            </p>

            <h3 className="mt-4 font-serif text-3xl font-light text-white">
              Read the Founder&apos;s Letter
            </h3>

            <p className="mt-4 text-sm leading-7 text-white/72">
              Learn more about the purpose, family legacy, and long-term vision
              guiding the development of The Gallaspy.
            </p>

            <Link
              href="/founders-letter"
              className="mt-7 inline-flex min-h-[45px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Read the Founder&apos;s Letter
            </Link>
          </div>
        </div>
      </section>

      {/* Legacy Timeline */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              The Journey Ahead
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              From Vision to Legacy
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#1E3557]/80">
              The Gallaspy is a long-term journey designed to move carefully
              from a founding idea to an enduring private-club institution.
            </p>
          </div>

          <div className="relative mt-12">
            <div className="absolute bottom-0 left-[27px] top-0 hidden w-px bg-[#B89146]/35 md:block lg:left-1/2" />

            <div className="space-y-5">
              {legacyTimeline.map((item, index) => (
                <article
                  key={item.number}
                  className={`relative grid gap-5 md:grid-cols-[55px_1fr] lg:grid-cols-2 ${
                    index % 2 === 0 ? "" : "lg:text-right"
                  }`}
                >
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[#B89146] bg-[#10263F] text-xs font-bold text-white lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                    {item.number}
                  </div>

                  <div
                    className={`rounded-[18px] border border-[#1E3557]/10 bg-[#F7F4EE] p-6 md:col-start-2 lg:col-start-auto lg:w-[calc(100%-55px)] ${
                      index % 2 === 0
                        ? "lg:mr-auto"
                        : "lg:col-start-2 lg:ml-auto"
                    }`}
                  >
                    <h3 className="font-serif text-2xl font-light text-[#10263F]">
                      {item.title}
                    </h3>

                    <div
                      className={`mt-4 h-px w-10 bg-[#B89146] ${
                        index % 2 === 0 ? "" : "lg:ml-auto"
                      }`}
                    />

                    <p className="mt-4 text-sm leading-7 text-[#1E3557]/80">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-[#10263F] px-5 py-20 text-white sm:px-8 lg:py-28">
        <Image
          src="/images/arrival.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-[#10263F]/82" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10263F] via-[#10263F]/90 to-[#163A2F]/75" />

        <div className="relative z-10 mx-auto max-w-[900px] text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
            A Legacy in the Making
          </p>

          <h2 className="mt-5 font-serif text-[2.6rem] font-light leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Great Clubs Leave More
            <span className="block text-[#FFD76A]">Than Memories</span>
          </h2>

          <div className="mx-auto mt-7 h-px w-16 bg-[#B89146]" />

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
            They leave traditions, relationships, and a legacy that endures for
            generations. Become part of the vision behind The Gallaspy Golf
            &amp; Country Club.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/founding-250#registration"
              className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Join the Founding 250
            </Link>

            <Link
              href="/master-plan"
              className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/45 px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:border-[#FFD76A] hover:text-[#FFD76A]"
            >
              Explore the Master Plan
            </Link>

            <Link
              href="/invest"
              className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/45 px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:border-[#FFD76A] hover:text-[#FFD76A]"
            >
              Invest in the Vision
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}