import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Development & Partnerships | The Gallaspy Golf & Country Club",
  description:
    "Explore the development vision and strategic partnership opportunities behind The Gallaspy Golf & Country Club, a proposed private golf and lifestyle destination in Georgia.",
};

const projectFacts = [
  {
    value: "18",
    label: "Championship Holes",
  },
  {
    value: "Phased",
    label: "Development Strategy",
  },
  {
    value: "Georgia",
    label: "Property Search",
  },
  {
    value: "Long-Term",
    label: "Development Vision",
  },
];

const partnershipReasons = [
  {
    number: "01",
    title: "Strategic Property Search",
    description:
      "The search for The Gallaspy’s future home is focused on identifying the right Georgia property with strong accessibility, natural character, long-term growth potential, and the scale required for a destination club.",
  },
  {
    number: "02",
    title: "Integrated Club Vision",
    description:
      "The long-term concept brings together championship golf, hospitality, dining, wellness, recreation, lodging, events, and complementary development in one destination.",
  },
  {
    number: "03",
    title: "Phased Development",
    description:
      "A carefully structured development strategy is intended to align infrastructure, amenities, market readiness, operating needs, and future capital requirements over multiple phases.",
  },
  {
    number: "04",
    title: "Strategic Collaboration",
    description:
      "The project is intended to advance through relationships with qualified landowners, developers, operators, advisers, hospitality groups, brands, and other aligned organizations.",
  },
];

const developmentComponents = [
  "Future private-club membership community",
  "Championship golf and practice facilities",
  "Clubhouse and hospitality operations",
  "Mercury Street Restaurant and private dining",
  "Member lodging and destination hospitality",
  "Wellness, fitness, tennis, and pickleball",
  "Private events and gathering experiences",
  "Corporate partnerships and branded activations",
];

const partnerTypes = [
  {
    title: "Landowners & Property Representatives",
    description:
      "Owners, brokers, family offices, and representatives with Georgia properties that may align with the scale, accessibility, and long-term vision of The Gallaspy.",
  },
  {
    title: "Development & Construction Partners",
    description:
      "Experienced development, engineering, infrastructure, architecture, construction, and project-management organizations capable of supporting a phased destination project.",
  },
  {
    title: "Golf & Hospitality Operators",
    description:
      "Golf, resort, club, dining, lodging, wellness, and hospitality operators with experience creating exceptional private-club and destination experiences.",
  },
  {
    title: "Corporate & Strategic Partners",
    description:
      "Brands, service providers, advisers, and organizations interested in long-term relationships, event partnerships, member experiences, and strategic collaboration.",
  },
];

const phases = [
  {
    phase: "Phase I",
    title: "Property, Planning & Infrastructure",
    description:
      "Property identification, potential acquisition or land relationship, due diligence, entitlement, engineering, master planning, utilities, access, and foundational infrastructure.",
  },
  {
    phase: "Phase II",
    title: "Championship Golf",
    description:
      "Development of the envisioned 18-hole course, practice range, short-game complex, maintenance operations, and supporting golf infrastructure.",
  },
  {
    phase: "Phase III",
    title: "Clubhouse & Hospitality",
    description:
      "Development of the future clubhouse, Mercury Street Restaurant, member gathering spaces, locker rooms, event spaces, terraces, and arrival experience.",
  },
  {
    phase: "Phase IV",
    title: "Lifestyle Amenities",
    description:
      "Potential development of wellness, spa, swimming, tennis, pickleball, member lodging, recreation, and expanded hospitality experiences.",
  },
  {
    phase: "Phase V",
    title: "Long-Term Growth",
    description:
      "Future residential or complementary development, additional amenities, strategic partnerships, and destination expansion subject to the selected property and development strategy.",
  },
];

const developmentPrinciples = [
  {
    title: "Phased Execution",
    text:
      "Development sequencing is intended to align major commitments with property, planning, approvals, market readiness, and operating priorities.",
  },
  {
    title: "Professional Due Diligence",
    text:
      "Property, environmental, engineering, entitlement, financial, legal, and operational diligence will be essential before major development decisions are made.",
  },
  {
    title: "Multiple Operating Components",
    text:
      "The long-term concept is designed around multiple complementary club, hospitality, recreation, event, and development components.",
  },
  {
    title: "Community Interest",
    text:
      "Initiatives such as the Gallaspy Invitational, Membership Interest List, and future Falcon Society help build community and demonstrate interest as the vision develops.",
  },
  {
    title: "Long-Term Site Value",
    text:
      "Thoughtful property selection, disciplined planning, and integrated club components are intended to support the long-term quality and identity of the destination.",
  },
  {
    title: "Experienced Partnerships",
    text:
      "Qualified advisers, consultants, operators, developers, and strategic partners will be important to responsible execution.",
  },
];

export default function InvestPage() {
  return (
    <main className="overflow-hidden bg-[#F7F4EC] text-[#10263F]">
      {/* HERO */}
      <section className="relative flex min-h-[760px] items-center overflow-hidden bg-[#071625] pt-[82px]">
        <Image
          src="/images/masterplan-render.png"
          alt="Conceptual development vision for The Gallaspy Golf and Country Club"
          fill
          priority
          className="object-cover opacity-45"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071625] via-[#071625]/92 to-[#071625]/38" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071625] via-transparent to-[#071625]/30" />

        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 py-24 sm:px-8 lg:px-12">
          <div className="max-w-4xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.42em] text-[#FFD76A]">
              Development & Strategic Partnerships
            </p>

            <h1 className="font-serif text-5xl font-medium leading-[0.98] text-white sm:text-6xl md:text-7xl lg:text-[92px]">
              Building The Gallaspy
              <span className="block text-[#FFD76A]">
                Will Take the Right Partners
              </span>
            </h1>

            <p className="mt-8 max-w-3xl text-base leading-8 text-white/80 sm:text-lg">
              The Gallaspy Golf &amp; Country Club is a long-term vision for a
              private golf and lifestyle destination in Georgia. We welcome
              conversations with property owners, developers, operators,
              hospitality groups, corporate partners, advisers, and
              organizations whose capabilities align with the vision.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#FFD76A] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#10263F] transition duration-300 hover:-translate-y-1 hover:bg-white"
              >
                Discuss a Partnership
              </Link>

              <Link
                href="/master-plan"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:border-[#D9B45B] hover:bg-white/10 hover:text-[#FFD76A]"
              >
                Explore the Development Vision
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#D9B45B]/70 to-transparent" />
      </section>

      {/* PROJECT FACTS */}
      <section className="relative z-20 mx-auto -mt-12 w-[calc(100%-2rem)] max-w-[1320px] rounded-2xl border border-[#B89146]/20 bg-white shadow-2xl shadow-[#10263F]/10 sm:w-[calc(100%-4rem)]">
        <div className="grid grid-cols-1 divide-y divide-[#10263F]/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {projectFacts.map((fact) => (
            <div key={fact.label} className="px-6 py-9 text-center">
              <p className="font-serif text-3xl text-[#10263F] lg:text-4xl">
                {fact.value}
              </p>

              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B89146]">
                {fact.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* EXECUTIVE OVERVIEW */}
      <section className="px-6 py-28 sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#B89146]">
              Executive Overview
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight text-[#10263F] sm:text-5xl lg:text-6xl">
              More Than a Golf Club
            </h2>
          </div>

          <div className="space-y-6 text-base leading-8 text-[#10263F]/75 sm:text-lg">
            <p>
              The Gallaspy Golf &amp; Country Club is being envisioned as a
              destination-scale private club and lifestyle community in
              Georgia. The conceptual vision brings together championship golf,
              a signature clubhouse, dining, wellness, racquet sports,
              lodging, events, recreation, and complementary development.
            </p>

            <p>
              The current strategy is focused on identifying the right
              property, building the right relationships, and developing the
              project in thoughtful phases appropriate to the site,
              opportunity, market, and long-term club vision.
            </p>
          </div>
        </div>
      </section>

      {/* DEVELOPMENT CASE */}
      <section className="bg-[#10263F] px-6 py-28 text-white sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1320px]">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#FFD76A]">
              The Development Case
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Why The Gallaspy
            </h2>

            <p className="mt-6 text-base leading-8 text-white/70 sm:text-lg">
              The development vision is centered on four principles intended to
              guide the long-term positioning and execution of The Gallaspy.
            </p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
            {partnershipReasons.map((reason) => (
              <article
                key={reason.number}
                className="bg-[#10263F] p-8 transition duration-300 hover:bg-[#142F4D] sm:p-10 lg:p-12"
              >
                <p className="font-serif text-4xl text-[#FFD76A]">
                  {reason.number}
                </p>

                <h3 className="mt-8 font-serif text-2xl sm:text-3xl">
                  {reason.title}
                </h3>

                <p className="mt-4 leading-7 text-white/70">
                  {reason.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER TYPES */}
      <section className="px-6 py-28 sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1320px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#B89146]">
              Partnership Opportunities
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight text-[#10263F] sm:text-5xl lg:text-6xl">
              Who We Want to Meet
            </h2>

            <p className="mt-6 text-base leading-8 text-[#10263F]/70 sm:text-lg">
              The Gallaspy is still being shaped. The right relationships today
              can materially influence how the future destination is planned,
              developed, operated, and experienced.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {partnerTypes.map((partner) => (
              <article
                key={partner.title}
                className="rounded-2xl border border-[#10263F]/10 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#B89146]/35 hover:shadow-lg sm:p-10"
              >
                <div className="h-px w-12 bg-[#B89146]" />

                <h3 className="mt-6 font-serif text-3xl text-[#10263F]">
                  {partner.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#10263F]/68 sm:text-base">
                  {partner.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DEVELOPMENT COMPONENTS */}
      <section className="bg-white px-6 py-28 sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto grid max-w-[1320px] gap-16 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-[540px] overflow-hidden rounded-2xl">
            <Image
              src="/images/clubhouse.png"
              alt="Conceptual clubhouse vision for The Gallaspy Golf and Country Club"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#071625]/80 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 p-8 text-white sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#FFD76A]">
                Integrated Destination
              </p>

              <p className="mt-3 max-w-md font-serif text-3xl leading-tight">
                Multiple experiences within one long-term club vision.
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#B89146]">
              Envisioned Components
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight text-[#10263F] sm:text-5xl">
              Designed Beyond the Course
            </h2>

            <p className="mt-6 text-base leading-8 text-[#10263F]/70">
              The ultimate mix of operating and development components will
              depend on the selected property, market, planning, approvals,
              operating strategy, and future development decisions.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {developmentComponents.map((component) => (
                <div
                  key={component}
                  className="flex items-start gap-3 border-b border-[#10263F]/10 pb-4"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B89146]" />

                  <p className="text-sm leading-6 text-[#10263F]/75">
                    {component}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DEVELOPMENT PLAN */}
      <section className="bg-[#EDE7DA] px-6 py-28 sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1320px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#B89146]">
              Development Strategy
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight text-[#10263F] sm:text-5xl lg:text-6xl">
              A Phased Path Forward
            </h2>

            <p className="mt-6 text-base leading-8 text-[#10263F]/70">
              The sequence below is conceptual and intended to illustrate how
              the project could advance in deliberate stages once the right
              property and development structure are established.
            </p>
          </div>

          <div className="mt-16 space-y-5">
            {phases.map((item) => (
              <article
                key={item.phase}
                className="grid gap-5 rounded-2xl border border-[#10263F]/10 bg-[#F7F4EC] p-7 shadow-sm sm:p-9 md:grid-cols-[150px_1fr]"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B89146]">
                    {item.phase}
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-2xl text-[#10263F] sm:text-3xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 max-w-4xl leading-7 text-[#10263F]/70">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERSHIP APPROACH */}
      <section className="px-6 py-28 sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid overflow-hidden rounded-3xl bg-[#10263F] lg:grid-cols-2">
            <div className="p-8 text-white sm:p-12 lg:p-16">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#FFD76A]">
                Partnership Approach
              </p>

              <h2 className="mt-5 font-serif text-4xl leading-tight text-white sm:text-5xl">
                Different Partners for Different Phases
              </h2>

              <p className="mt-6 leading-8 text-white/70">
                The needs of The Gallaspy will evolve as the project advances.
                Property relationships, development expertise, operating
                partners, professional advisers, corporate relationships, and
                future financing structures may each become relevant at
                different stages.
              </p>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {[
                  "Property relationships",
                  "Master planning & engineering",
                  "Golf development expertise",
                  "Hospitality & club operations",
                  "Corporate & brand partnerships",
                  "Professional advisory relationships",
                ].map((item) => (
                  <div
                    key={item}
                    className="border-l border-[#D9B45B] pl-4 text-sm leading-6 text-white/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[480px]">
              <Image
                src="/images/golf.png"
                alt="Conceptual championship golf vision for The Gallaspy"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              <div className="absolute inset-0 bg-[#10263F]/20" />
            </div>
          </div>
        </div>
      </section>

      {/* RESPONSIBLE DEVELOPMENT */}
      <section className="border-y border-[#10263F]/10 bg-white px-6 py-28 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#B89146]">
                Responsible Development
              </p>

              <h2 className="mt-5 font-serif text-4xl leading-tight text-[#10263F] sm:text-5xl">
                Principles for Moving Forward
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {developmentPrinciples.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-[#10263F]/10 bg-[#F7F4EC] p-7"
                >
                  <h3 className="font-serif text-2xl text-[#10263F]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#10263F]/65">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#071625] px-6 py-28 text-center text-white sm:px-8 lg:px-12 lg:py-36">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#B89146]/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#FFD76A]">
            Invitation to Collaborate
          </p>

          <h2 className="mt-6 font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-7xl">
            Help Shape a Future Landmark Destination
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
            We welcome thoughtful conversations with property owners,
            developers, operators, advisers, corporate partners, and strategic
            organizations interested in helping bring The Gallaspy vision to
            life.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#FFD76A] px-9 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#10263F] transition duration-300 hover:-translate-y-1 hover:bg-white"
            >
              Discuss a Partnership
            </Link>

            <Link
              href="/founders-letter"
              className="inline-flex items-center justify-center rounded-full border border-white/35 px-9 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:border-[#D9B45B] hover:text-[#FFD76A]"
            >
              Read the Founders&apos; Letter
            </Link>
          </div>

          <p className="mx-auto mt-12 max-w-3xl text-xs leading-6 text-white/45">
            The Gallaspy Golf &amp; Country Club remains in the planning and
            development stage. Development concepts, amenities, phases,
            property strategy, partnership structures, timing, and future
            financing approaches are subject to due diligence, planning,
            approvals, market conditions, professional advice, and future
            decisions. Nothing on this website constitutes an offer to sell or
            a solicitation to purchase securities.
          </p>
        </div>
      </section>
    </main>
  );
}