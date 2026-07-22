import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why The Gallaspy | The Gallaspy Golf & Country Club",
  description:
    "Discover the vision, location, legacy, and long-term development plan behind The Gallaspy Golf & Country Club in Covington, Georgia.",
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

export default function WhyTheGallaspyPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#1E3557]">
      {/* Hero */}
      <section className="relative flex min-h-[72vh] items-center overflow-hidden px-5 pt-[72px] sm:px-8">
        <Image
          src="/images/masterplan-render.png"
          alt="Proposed master plan for The Gallaspy Golf and Country Club"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#10263F]/68" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10263F]/92 via-[#10263F]/62 to-[#10263F]/30" />

        <div className="relative z-10 mx-auto w-full max-w-[1060px] py-20 text-white sm:py-24">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#FFD76A]">
              Why The Gallaspy?
            </p>

            <h1 className="mt-5 font-serif text-[2.8rem] font-light leading-[1.02] text-white sm:text-6xl lg:text-[4.7rem]">
              A Vision Rooted
              <span className="block">in Legacy</span>
            </h1>

            <div className="mt-6 h-px w-16 bg-[#B89146]" />

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              The Gallaspy Golf &amp; Country Club is being created as more
              than a destination. It is a long-term vision for championship
              golf, private hospitality, family traditions, and enduring value
              in Covington, Georgia.
            </p>

            <Link
              href="#vision"
              className="mt-8 inline-flex min-h-[45px] items-center justify-center rounded-full border border-[#B89146] bg-[#B89146] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:bg-[#FFD76A] hover:text-[#10263F]"
            >
              Discover the Vision
            </Link>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section
        id="vision"
        className="scroll-mt-24 bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-20"
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
              to a shared private-club experience. Every decision is guided by
              three principles: tradition, family, and excellence.
            </p>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-[22px]">
            <Image
              src="/images/arrival.png"
              alt="Arrival experience at The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Core reasons */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-20">
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

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {reasons.map((reason) => (
              <article
                key={reason.number}
                className="rounded-[18px] border border-[#1E3557]/10 bg-[#F7F4EE] p-6 sm:p-7"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B89146]">
                  {reason.number}
                </p>

                <h3 className="mt-5 font-serif text-2xl font-light text-[#10263F] sm:text-[1.8rem]">
                  {reason.title}
                </h3>

                <div className="mt-4 h-px w-10 bg-[#B89146]" />

                <p className="mt-4 text-sm leading-7 text-[#1E3557]/80">
                  {reason.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Covington */}
      <section className="bg-[#1E3557] px-5 py-16 text-white sm:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative min-h-[400px] overflow-hidden rounded-[22px]">
            <Image
              src="/images/masterplan-render.png"
              alt="Proposed 585.6-acre home of The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
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
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legacy pillars */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Our Guiding Principles
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Tradition. Family. Excellence.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {[
              {
                title: "Tradition",
                description:
                  "Honoring the timeless values, rituals, standards, and sense of belonging that define the world’s greatest private clubs.",
              },
              {
                title: "Family",
                description:
                  "Creating a place where every generation feels welcome and where shared experiences become lasting family traditions.",
              },
              {
                title: "Excellence",
                description:
                  "Pursuing exceptional quality in the land plan, architecture, golf, hospitality, service, and every member interaction.",
              },
            ].map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-[18px] border border-[#1E3557]/10 bg-white p-7 text-center"
              >
                <h3 className="font-serif text-3xl font-light text-[#10263F]">
                  {pillar.title}
                </h3>

                <div className="mx-auto mt-5 h-px w-10 bg-[#B89146]" />

                <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Development phases */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-20">
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
              eight to ten years, allowing each major component to be
              carefully planned, financed, and delivered.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {phases.map((item, index) => (
              <article
                key={item.phase}
                className="grid gap-5 rounded-[18px] border border-[#1E3557]/10 bg-[#F7F4EE] p-6 md:grid-cols-[120px_1fr] md:items-start sm:p-7"
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

      {/* Founder statement */}
      <section className="bg-[#163A2F] px-5 py-16 text-white sm:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
              A Message From the Founder
            </p>

            <blockquote className="mt-6 font-serif text-[2rem] font-light leading-[1.2] text-white sm:text-[2.7rem]">
              “This is more than the beginning of a country club. This is the
              beginning of a legacy.”
            </blockquote>

            <div className="mt-7 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/75">
              The Gallaspy is being created with the belief that a truly great
              club can become part of the identity of its members, their
              families, and the community it serves.
            </p>
          </div>

          <div className="rounded-[18px] border border-white/15 bg-white/[0.06] p-7">
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
              className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Founder&apos;s Letter
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#1E3557] px-5 py-16 text-white sm:px-8 lg:py-20">
        <div className="mx-auto flex w-full max-w-[1060px] flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
              Join the Vision
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">
              Help Shape the
              <span className="block">Founding Generation</span>
            </h2>
          </div>

          <Link
            href="/membership#membership-interest"
            className="inline-flex min-h-[46px] shrink-0 items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
          >
            Register Membership Interest
          </Link>
        </div>
      </section>
    </main>
  );
}