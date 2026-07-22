import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | The Gallaspy Golf & Country Club",
  description:
    "Find answers about membership, development, investment, careers, residences, events, and the future of The Gallaspy Golf & Country Club.",
};

const faqSections = [
  {
    category: "The Project",
    questions: [
      {
        question: "What is The Gallaspy Golf & Country Club?",
        answer:
          "The Gallaspy Golf & Country Club is a proposed private golf and lifestyle destination planned for Covington, Georgia. The vision brings together championship golf, luxury hospitality, wellness, dining, lodging, events, recreation, and residential living within one master-planned property.",
      },
      {
        question: "Where is the project planned?",
        answer:
          "The project is planned for Covington, Georgia, in Newton County. The location was selected for its proximity to Metro Atlanta, access to major transportation routes, natural landscape, and long-term regional growth potential.",
      },
      {
        question: "How large is the proposed development?",
        answer:
          "The current master plan is based on approximately 585.6 acres. The property is intended to support the golf course, clubhouse district, restaurant, wellness facilities, lodging, vineyard, event spaces, residential areas, and operational facilities.",
      },
      {
        question: "Is the current master plan final?",
        answer:
          "No. The images and site plans shown on the website are conceptual and are intended to communicate the development vision. Final plans will be subject to land control, architecture, engineering, financing, government approvals, environmental review, and development planning.",
      },
    ],
  },
  {
    category: "Membership",
    questions: [
      {
        question: "Is membership currently available?",
        answer:
          "Memberships are not currently being offered for sale. The project remains in the development stage. Prospective members may submit an interest form to receive future announcements and membership-related updates.",
      },
      {
        question: "Will The Gallaspy be a private club?",
        answer:
          "The Gallaspy is being envisioned primarily as a private membership club. Final access policies, membership categories, guest privileges, and public-facing experiences will be established as the club structure develops.",
      },
      {
        question: "What types of memberships may be offered?",
        answer:
          "Potential membership categories may include golf, social, family, corporate, non-resident, and founding memberships. These categories remain under development and have not yet been finalized.",
      },
      {
        question: "How can I express interest in becoming a member?",
        answer:
          "You may visit the Membership page and submit the membership interest form. This allows the project team to keep you informed as future membership opportunities are introduced.",
      },
    ],
  },
  {
    category: "Golf & Amenities",
    questions: [
      {
        question: "What golf facilities are planned?",
        answer:
          "The current vision includes an 18-hole championship golf course, multiple tee options, a practice range, short-game facilities, putting areas, professional instruction, tournaments, and a full golf operations program.",
      },
      {
        question: "What other amenities are planned?",
        answer:
          "Planned amenities include a grand clubhouse, Mercury Street Restaurant, wellness spa, fitness center, pools, tennis and pickleball, member lodging, vineyard experiences, event facilities, family recreation, and residential living.",
      },
      {
        question: "Will Mercury Street Restaurant be open to the public?",
        answer:
          "The final operating model has not yet been determined. Mercury Street Restaurant is being designed as a signature dining experience connected to the club, but limited public access, private events, or reservation-based experiences may be considered in the future.",
      },
      {
        question: "Will there be accommodations on the property?",
        answer:
          "Yes. The current plan includes member lodging, luxury suites, cottages, and guest accommodations intended for club visits, family stays, corporate retreats, golf trips, and special events.",
      },
    ],
  },
  {
    category: "Residential Community",
    questions: [
      {
        question: "Will there be homes within the development?",
        answer:
          "Yes. The proposed master plan includes a private residential community with luxury estate homes, villas, and family cottages integrated into the club environment.",
      },
      {
        question: "How many residences are planned?",
        answer:
          "The current vision anticipates approximately 250 to 400 residential opportunities. The final number will depend on land planning, infrastructure, environmental review, architecture, and government approvals.",
      },
      {
        question: "Will homeownership include club membership?",
        answer:
          "The relationship between residential ownership and club membership has not yet been finalized. Future ownership documents and membership policies will define whether membership is required, included, optional, or separately purchased.",
      },
    ],
  },
  {
    category: "Events & Hospitality",
    questions: [
      {
        question: "Will The Gallaspy host weddings and private events?",
        answer:
          "The proposed Event Pavilion, clubhouse ballroom, vineyard, outdoor lawns, terraces, and hospitality spaces are being planned to support weddings, galas, charity events, corporate retreats, tournaments, and private celebrations.",
      },
      {
        question: "Can I reserve an event now?",
        answer:
          "No. Event bookings are not currently available because the project is still in development. Future event announcements and booking information will be shared once facilities move closer to completion.",
      },
      {
        question: "Will corporate retreats be available?",
        answer:
          "Yes. The development vision includes lodging, meeting spaces, golf, dining, wellness, and event facilities that may support executive meetings, company retreats, leadership programs, and corporate hospitality.",
      },
    ],
  },
  {
    category: "Development & Timeline",
    questions: [
      {
        question: "When will construction begin?",
        answer:
          "A final construction start date has not been announced. The project is expected to progress through land acquisition, planning, approvals, financing, infrastructure development, and phased construction.",
      },
      {
        question: "How long will the development take?",
        answer:
          "The current strategy anticipates five major development phases over approximately eight to ten years. Timing may change based on financing, approvals, construction conditions, market demand, and other development factors.",
      },
      {
        question: "What are the proposed development phases?",
        answer:
          "The current sequence begins with land, planning, and infrastructure, followed by championship golf, clubhouse and dining, wellness and recreation, and finally vineyard, events, residential growth, and future expansion.",
      },
      {
        question: "Will every amenity open at the same time?",
        answer:
          "No. The project is expected to open in phases. Each major component will be introduced according to the final development schedule, financing plan, construction progress, and operational readiness.",
      },
    ],
  },
  {
    category: "Investment",
    questions: [
      {
        question: "Can individuals invest in The Gallaspy?",
        answer:
          "The project may consider qualified investors, strategic partners, financial institutions, and lending organizations. Investment opportunities, if offered, will be subject to applicable laws, formal documentation, eligibility requirements, and due diligence.",
      },
      {
        question: "Where can I learn more about the investment opportunity?",
        answer:
          "The Investment page provides an overview of the development scale, phased strategy, potential revenue sources, and long-term vision. Serious inquiries may also be submitted through the Contact page.",
      },
      {
        question: "Are the financial estimates guaranteed?",
        answer:
          "No. Any estimates, projections, costs, values, timelines, and operating assumptions are preliminary and may change. They should not be interpreted as guarantees, investment advice, or a formal securities offering.",
      },
      {
        question: "Is the website an investment offering?",
        answer:
          "No. The website is intended for general informational and vision-presentation purposes. It does not constitute an offer to sell securities, a solicitation to invest, or a guarantee of future performance.",
      },
    ],
  },
  {
    category: "Careers",
    questions: [
      {
        question: "Is The Gallaspy currently hiring?",
        answer:
          "The Gallaspy is not currently accepting applications for active club positions. Hiring is expected to begin gradually as the project advances into construction, pre-opening, and operations.",
      },
      {
        question: "What types of jobs are expected?",
        answer:
          "Future opportunities may include golf operations, agronomy, hospitality, culinary, member services, events, wellness, recreation, lodging, housekeeping, maintenance, administration, finance, marketing, and leadership roles.",
      },
      {
        question: "How can I express interest in future employment?",
        answer:
          "Visit the Careers page for an overview of projected departments, then use the Contact page to submit a general career inquiry. A career inquiry is not a formal job application and does not guarantee consideration.",
      },
    ],
  },
  {
    category: "Updates & Contact",
    questions: [
      {
        question: "How can I receive project updates?",
        answer:
          "You may submit an interest form through the Membership or Contact page. As the project progresses, updates may include planning milestones, membership announcements, investor information, design developments, and future events.",
      },
      {
        question: "How can I contact The Gallaspy?",
        answer:
          "Visit the Contact page to submit a general inquiry regarding membership, investment, partnerships, careers, media, events, or other project questions.",
      },
      {
        question: "Where can I see more of the vision?",
        answer:
          "The Club, Master Plan, Gallery, Why The Gallaspy, Investment, and Founder’s Letter pages provide a broader look at the development vision and the experience being planned.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#1E3557]">
      {/* Hero */}
      <section className="bg-[#10263F] px-5 pb-16 pt-32 text-white sm:px-8 lg:pb-20 lg:pt-40">
        <div className="mx-auto w-full max-w-[1060px] text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#FFD76A]">
            Frequently Asked Questions
          </p>

          <h1 className="mx-auto mt-5 max-w-4xl font-serif text-[2.8rem] font-light leading-[1.02] text-white sm:text-6xl lg:text-[4.7rem]">
            Answers About
            <span className="block">The Gallaspy Vision</span>
          </h1>

          <div className="mx-auto mt-6 h-px w-16 bg-[#B89146]" />

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
            Learn more about the proposed club, future membership,
            development timeline, residential community, investment,
            hospitality, and career opportunities.
          </p>
        </div>
      </section>

      {/* Intro navigation */}
      <section className="bg-white px-5 py-12 sm:px-8">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="flex flex-wrap justify-center gap-2">
            {faqSections.map((section) => (
              <a
                key={section.category}
                href={`#${section.category
                  .toLowerCase()
                  .replaceAll("&", "and")
                  .replaceAll(" ", "-")}`}
                className="rounded-full border border-[#1E3557]/12 bg-[#F7F4EE] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#10263F] transition hover:border-[#B89146] hover:bg-[#B89146] hover:text-white"
              >
                {section.category}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ sections */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-[920px] space-y-16">
          {faqSections.map((section) => {
            const sectionId = section.category
              .toLowerCase()
              .replaceAll("&", "and")
              .replaceAll(" ", "-");

            return (
              <section
                key={section.category}
                id={sectionId}
                className="scroll-mt-28"
              >
                <div className="mb-7">
                  <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
                    FAQ Category
                  </p>

                  <h2 className="mt-3 font-serif text-[2.2rem] font-light leading-tight text-[#10263F] sm:text-4xl">
                    {section.category}
                  </h2>

                  <div className="mt-5 h-px w-14 bg-[#B89146]" />
                </div>

                <div className="space-y-3">
                  {section.questions.map((item) => (
                    <details
                      key={item.question}
                      className="group rounded-[16px] border border-[#1E3557]/10 bg-white"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 sm:px-6">
                        <span className="font-serif text-xl font-light leading-snug text-[#10263F] sm:text-2xl">
                          {item.question}
                        </span>

                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#B89146]/45 text-lg text-[#B89146] transition group-open:rotate-45">
                          +
                        </span>
                      </summary>

                      <div className="border-t border-[#1E3557]/8 px-5 py-5 sm:px-6">
                        <p className="text-sm leading-7 text-[#1E3557]/80">
                          {item.answer}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      {/* Information notice */}
      <section className="bg-white px-5 py-14 sm:px-8 lg:py-16">
        <div className="mx-auto w-full max-w-[920px] rounded-[20px] border border-[#1E3557]/10 bg-[#F7F4EE] p-7 sm:p-9">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#B89146]">
            Important Information
          </p>

          <h2 className="mt-4 font-serif text-3xl font-light text-[#10263F] sm:text-4xl">
            A Vision Still in Development
          </h2>

          <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
            The Gallaspy Golf &amp; Country Club is a proposed development.
            Plans, amenities, acreage allocations, timelines, costs,
            projections, membership structures, residential offerings, and
            operating models remain subject to change.
          </p>

          <p className="mt-4 text-sm leading-7 text-[#1E3557]/80">
            Website content and conceptual renderings are provided for
            informational purposes and should not be interpreted as a binding
            commitment, formal offering, guarantee, or final development plan.
          </p>
        </div>
      </section>

      {/* Explore section */}
      <section className="bg-[#163A2F] px-5 py-16 text-white sm:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
              Continue Exploring
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">
              Discover More of
              <span className="block">The Gallaspy</span>
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "The Master Plan",
                description:
                  "Explore the proposed layout, amenities, arrival experience, and development phases.",
                href: "/master-plan",
              },
              {
                title: "Membership",
                description:
                  "Register your interest in future membership opportunities and club updates.",
                href: "/membership",
              },
              {
                title: "Investment",
                description:
                  "Review the development scale, phased strategy, and long-term investment vision.",
                href: "/investment",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[18px] border border-white/15 bg-white/[0.06] p-6"
              >
                <h3 className="font-serif text-2xl font-light text-white">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/72">
                  {item.description}
                </p>

                <Link
                  href={item.href}
                  className="mt-6 inline-flex text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFD76A] transition hover:text-white"
                >
                  Explore Page →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#1E3557] px-5 py-16 text-white sm:px-8 lg:py-20">
        <div className="mx-auto flex w-full max-w-[1060px] flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
              Still Have Questions?
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">
              Connect With
              <span className="block">The Gallaspy</span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/72">
              Submit a general inquiry regarding membership, investment,
              partnerships, careers, events, or the development vision.
            </p>
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