import Link from "next/link";

const futureDepartments = [
  {
    title: "Golf Operations",
    description:
      "Future opportunities may include golf professionals, caddie services, tournament operations, instruction, and member services.",
  },
  {
    title: "Hospitality & Dining",
    description:
      "The clubhouse, Mercury Street Restaurant, private events, and member lodging will require exceptional hospitality professionals.",
  },
  {
    title: "Wellness & Recreation",
    description:
      "Future roles may support fitness, spa services, aquatics, tennis, pickleball, wellness programming, and recreation.",
  },
  {
    title: "Grounds & Maintenance",
    description:
      "Course conditioning, landscaping, facilities maintenance, sustainability, and property operations will be essential to the club.",
  },
  {
    title: "Events & Experiences",
    description:
      "The event pavilion, vineyard, weddings, corporate retreats, tournaments, and member programming will create diverse opportunities.",
  },
  {
    title: "Administration & Development",
    description:
      "Future needs may include finance, marketing, membership, human resources, development, and executive leadership.",
  },
];

const values = [
  "Tradition",
  "Family",
  "Excellence",
  "Hospitality",
  "Integrity",
  "Stewardship",
];

export default function CareersPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#163A2F]">
      {/* Hero */}
      <section className="bg-[#10263F] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto w-full max-w-5xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-[#FFD76A] sm:text-xs">
            Careers
          </p>

          <h1 className="mx-auto mt-5 max-w-4xl font-serif text-[2.8rem] font-light leading-[1.05] sm:text-6xl lg:text-[4.5rem]">
            Help Build a Legacy
            <span className="block">for Generations</span>
          </h1>

          <div className="mx-auto mt-7 h-px w-16 bg-[#B89146]" />

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-white/72 sm:text-base sm:leading-8">
            The Gallaspy Golf &amp; Country Club is envisioned as a landmark
            private-club destination built around championship golf,
            exceptional hospitality, family tradition, and enduring value.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#9A793A]">
              Future Opportunities
            </p>

            <h2 className="mt-4 font-serif text-4xl font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              A Team Defined by Service and Excellence
            </h2>

            <div className="mt-6 h-px w-16 bg-[#B89146]" />
          </div>

          <div className="space-y-6 text-sm leading-7 text-[#52605A] sm:text-base sm:leading-8">
            <p>
              The Gallaspy is currently in the planning and development stage.
              Employment applications are not yet being accepted, but the
              completed destination is expected to create opportunities across
              golf, hospitality, dining, wellness, recreation, events,
              maintenance, and administration.
            </p>

            <p>
              As development advances, this page will be updated with official
              openings, application instructions, and information about joining
              the team.
            </p>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#9A793A]">
              Areas of Opportunity
            </p>

            <h2 className="mt-4 font-serif text-4xl font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Future Career Departments
            </h2>

            <div className="mx-auto mt-6 h-px w-16 bg-[#B89146]" />
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {futureDepartments.map((department) => (
              <article
                key={department.title}
                className="rounded-[18px] border border-[#163A2F]/10 bg-[#F7F4EE] px-6 py-7 shadow-[0_12px_35px_rgba(16,38,63,0.06)]"
              >
                <h3 className="font-serif text-2xl font-light leading-tight text-[#10263F]">
                  {department.title}
                </h3>

                <div className="mt-4 h-px w-10 bg-[#B89146]" />

                <p className="mt-4 text-sm leading-7 text-[#52605A]">
                  {department.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#163A2F] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#FFD76A]">
                Our Standard
              </p>

              <h2 className="mt-4 font-serif text-4xl font-light leading-[1.08] sm:text-5xl">
                The Values Behind Every Experience
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/72 sm:text-base sm:leading-8">
                Every future team member will help shape the experience,
                culture, and reputation of The Gallaspy Golf &amp; Country Club.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {values.map((value) => (
                <div
                  key={value}
                  className="flex min-h-[100px] items-center justify-center rounded-[16px] border border-white/15 bg-white/[0.06] px-4 text-center"
                >
                  <p className="font-serif text-xl font-light text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-4xl rounded-[22px] border border-[#B89146]/35 bg-white px-6 py-12 text-center shadow-[0_18px_50px_rgba(16,38,63,0.08)] sm:px-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#9A793A]">
            Stay Connected
          </p>

          <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-[#10263F] sm:text-5xl">
            Follow the Development Journey
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#52605A] sm:text-base">
            Career opportunities will be announced as the project advances.
            General inquiries may be submitted through the contact page.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[#B89146] bg-[#B89146] px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#10263F]"
            >
              Contact the Team
            </Link>

            <a
              href="https://www.instagram.com/thegallaspy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#10263F]/25 px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#10263F] transition duration-300 hover:-translate-y-1 hover:border-[#B89146] hover:text-[#9A793A]"
            >
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}