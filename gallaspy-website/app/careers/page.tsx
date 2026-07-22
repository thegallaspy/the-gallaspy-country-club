import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers | The Gallaspy Golf & Country Club",
  description:
    "Explore future career opportunities at The Gallaspy Golf & Country Club across golf, hospitality, culinary, wellness, events, lodging, and club operations.",
};

const departments = [
  {
    title: "Golf Operations",
    description:
      "Future opportunities supporting member play, tournaments, instruction, merchandising, caddie services, and daily golf operations.",
    roles: [
      "Golf Professionals",
      "Caddies",
      "Tournament Staff",
      "Practice Facility Team",
      "Golf Shop Associates",
    ],
  },
  {
    title: "Agronomy & Grounds",
    description:
      "A skilled team dedicated to course conditioning, turf management, landscaping, irrigation, and preservation of the property.",
    roles: [
      "Golf Course Maintenance",
      "Turf Management",
      "Irrigation Technicians",
      "Landscape Operations",
      "Equipment Technicians",
    ],
  },
  {
    title: "Hospitality & Club Services",
    description:
      "Member-facing roles focused on exceptional service, personalized experiences, arrivals, concierge support, and daily club life.",
    roles: [
      "Member Services",
      "Concierge",
      "Valet & Arrival",
      "Locker Room Attendants",
      "Clubhouse Operations",
    ],
  },
  {
    title: "Culinary & Dining",
    description:
      "Future culinary and service teams supporting Mercury Street Restaurant, private dining, banquets, wine service, and member events.",
    roles: [
      "Chefs & Culinary Team",
      "Dining Room Service",
      "Banquet Staff",
      "Beverage & Wine Team",
      "Restaurant Management",
    ],
  },
  {
    title: "Wellness & Recreation",
    description:
      "Professionals supporting fitness, spa, recovery, aquatics, tennis, pickleball, and family recreation programs.",
    roles: [
      "Fitness Professionals",
      "Spa Practitioners",
      "Aquatics Team",
      "Tennis Professionals",
      "Pickleball Instructors",
    ],
  },
  {
    title: "Events & Experiences",
    description:
      "Teams creating weddings, galas, charity events, corporate retreats, tournaments, and signature club celebrations.",
    roles: [
      "Event Coordinators",
      "Wedding Specialists",
      "Corporate Retreat Team",
      "Production & Setup",
      "Guest Experience Staff",
    ],
  },
  {
    title: "Lodging & Housekeeping",
    description:
      "Hospitality professionals delivering refined stays, personalized service, housekeeping, reservations, and guest support.",
    roles: [
      "Guest Services",
      "Reservations",
      "Housekeeping",
      "Lodging Management",
      "Bell & Transportation",
    ],
  },
  {
    title: "Administration & Leadership",
    description:
      "Experienced professionals supporting finance, membership, marketing, human resources, technology, and executive operations.",
    roles: [
      "Membership Administration",
      "Finance & Accounting",
      "Human Resources",
      "Marketing & Communications",
      "Executive Leadership",
    ],
  },
];

const values = [
  {
    title: "Service",
    description:
      "We believe exceptional service is personal, thoughtful, and consistent.",
  },
  {
    title: "Excellence",
    description:
      "We pursue the highest standard in every detail, experience, and interaction.",
  },
  {
    title: "Teamwork",
    description:
      "Great clubs are built by people who support one another and take pride in shared success.",
  },
  {
    title: "Legacy",
    description:
      "Every role contributes to a club being created for generations to come.",
  },
];

export default function CareersPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#1E3557]">
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden px-5 pt-[72px] sm:px-8">
        <Image
          src="/images/clubhouse.png"
          alt="The Gallaspy Golf and Country Club clubhouse"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#10263F]/68" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10263F]/92 via-[#10263F]/62 to-[#10263F]/26" />

        <div className="relative z-10 mx-auto w-full max-w-[1060px] py-20 text-white sm:py-24">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#FFD76A]">
              Careers at The Gallaspy
            </p>

            <h1 className="mt-5 font-serif text-[2.8rem] font-light leading-[1.02] text-white sm:text-6xl lg:text-[4.7rem]">
              Build a Career
              <span className="block">Worth Remembering</span>
            </h1>

            <div className="mt-6 h-px w-16 bg-[#B89146]" />

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              The Gallaspy Golf &amp; Country Club is being envisioned as one
              of the region&apos;s most distinctive private-club destinations,
              supported by professionals who believe in service, excellence,
              teamwork, and legacy.
            </p>

            <a
              href="#future-opportunities"
              className="mt-8 inline-flex min-h-[45px] items-center justify-center rounded-full border border-[#B89146] bg-[#B89146] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:bg-[#FFD76A] hover:text-[#10263F]"
            >
              Explore Future Opportunities
            </a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Join the Vision
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              More Than a Job
              <span className="block">A Place to Build a Legacy</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />
          </div>

          <div className="border-l border-[#B89146]/35 pl-6 sm:pl-8">
            <p className="text-base leading-8 text-[#1E3557]">
              The Gallaspy will require talented professionals across golf,
              hospitality, culinary, wellness, events, lodging, agronomy, and
              administration.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              These opportunities will be introduced as the development
              advances through planning, construction, pre-opening, and
              full-scale operations.
            </p>
          </div>
        </div>
      </section>

      {/* Employment impact */}
      <section className="bg-[#1E3557] px-5 py-14 text-white sm:px-8 lg:py-16">
        <div className="mx-auto grid w-full max-w-[1060px] gap-8 text-center sm:grid-cols-3">
          <div>
            <p className="font-serif text-5xl font-light text-[#FFD76A]">
              300+
            </p>
            <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/80">
              Projected Jobs
            </p>
          </div>

          <div>
            <p className="font-serif text-5xl font-light text-[#FFD76A]">
              8+
            </p>
            <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/80">
              Operating Departments
            </p>
          </div>

          <div>
            <p className="font-serif text-5xl font-light text-[#FFD76A]">
              5
            </p>
            <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/80">
              Development Phases
            </p>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section
        id="future-opportunities"
        className="scroll-mt-24 bg-white px-5 py-16 sm:px-8 lg:py-20"
      >
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Future Opportunities
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Careers Across the Club
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#1E3557]/80">
              Future hiring is expected to span the full member experience,
              from championship golf and dining to wellness, lodging, events,
              and property operations.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {departments.map((department) => (
              <article
                key={department.title}
                className="rounded-[20px] border border-[#1E3557]/10 bg-[#F7F4EE] p-6 sm:p-7"
              >
                <h3 className="font-serif text-3xl font-light text-[#10263F]">
                  {department.title}
                </h3>

                <div className="mt-5 h-px w-12 bg-[#B89146]" />

                <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
                  {department.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {department.roles.map((role) => (
                    <span
                      key={role}
                      className="rounded-full border border-[#1E3557]/10 bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#10263F]"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative min-h-[440px] overflow-hidden rounded-[22px]">
            <Image
              src="/images/mercurystreet.png"
              alt="Hospitality experience at The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Our Future Culture
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Excellence Begins
              <span className="block">With the Team</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-base leading-8 text-[#1E3557]">
              The Gallaspy is intended to become a workplace where talented
              people are respected, supported, and encouraged to grow.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              Team members will help establish the standards, traditions, and
              service culture that future generations of members will
              experience.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-[15px] border border-[#1E3557]/10 bg-white p-5"
                >
                  <h3 className="font-serif text-2xl font-light text-[#10263F]">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#1E3557]/75">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hiring timeline */}
      <section className="bg-[#163A2F] px-5 py-16 text-white sm:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
              Hiring Timeline
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">
              Opportunities Will Grow
              <span className="block">With Each Phase</span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/75">
              The project remains in the development stage. Career openings
              will be introduced gradually as planning, construction,
              pre-opening, and operations advance.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Development & Construction",
                description:
                  "Planning, engineering, construction management, project administration, and site development.",
              },
              {
                step: "02",
                title: "Pre-Opening",
                description:
                  "Department leadership, membership services, recruitment, training, systems, and operational preparation.",
              },
              {
                step: "03",
                title: "Club Operations",
                description:
                  "Full-scale golf, dining, wellness, lodging, events, grounds, and member-service careers.",
              },
            ].map((phase) => (
              <article
                key={phase.step}
                className="rounded-[18px] border border-white/15 bg-white/[0.06] p-6"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FFD76A]">
                  {phase.step}
                </p>

                <h3 className="mt-5 font-serif text-2xl font-light text-white">
                  {phase.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/72">
                  {phase.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Interest section */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Career Interest
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Stay Connected
              <span className="block">For Future Openings</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-base leading-8 text-[#1E3557]">
              The Gallaspy is not currently accepting applications for active
              positions.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              Prospective candidates may submit a general inquiry to express
              interest in future opportunities. This does not represent an
              employment application or guarantee of consideration.
            </p>
          </div>

          <div className="rounded-[20px] border border-[#1E3557]/10 bg-[#F7F4EE] p-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#B89146]">
              Future Career Updates
            </p>

            <h3 className="mt-4 font-serif text-3xl font-light text-[#10263F]">
              Introduce Yourself
            </h3>

            <p className="mt-4 text-sm leading-7 text-[#1E3557]/75">
              Use the contact page and select career interest in your message
              so your inquiry can be directed appropriately.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#10263F] bg-[#10263F] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:border-[#B89146] hover:bg-[#B89146]"
            >
              Submit Career Interest
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#1E3557] px-5 py-16 text-white sm:px-8 lg:py-20">
        <div className="mx-auto flex w-full max-w-[1060px] flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
              Help Build the Standard
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">
              A Future Shaped
              <span className="block">by Exceptional People</span>
            </h2>
          </div>

          <Link
            href="/contact"
            className="inline-flex min-h-[46px] shrink-0 items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
          >
            Contact The Gallaspy
          </Link>
        </div>
      </section>
    </main>
  );
}