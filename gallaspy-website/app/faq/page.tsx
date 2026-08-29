import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | The Gallaspy Golf Club",
  description:
    "Answers about The Gallaspy, Gallaspy Rounds, club events, the Founding 100, the Gallaspy Invitational, Mercury Match, and the club's long-term vision.",
};

const faqSections = [
  {
    category: "The Gallaspy",
    questions: [
      {
        question: "What is The Gallaspy?",
        answer:
          "The Gallaspy is a developing golf community in Georgia establishing its identity through golf, annual competitions, gatherings, and traditions. The community is active before the establishment of a permanent club property.",
      },
      {
        question: "Does The Gallaspy have its own golf course?",
        answer:
          "Not yet. The Gallaspy does not currently own or operate a permanent golf course. Golf programming takes place at selected host courses while the long-term vision of establishing a permanent private golf and country club continues.",
      },
      {
        question: "Where is The Gallaspy located?",
        answer:
          "The Gallaspy is based in Georgia, but no permanent club property has been selected or represented as secured. Current golf experiences may take place at different host courses.",
      },
      {
        question: "When was The Gallaspy established?",
        answer:
          "The Gallaspy was established in 2026. This period represents the opening chapter of the club's history.",
      },
    ],
  },
  {
    category: "Playing With The Gallaspy",
    questions: [
      {
        question: "How can I play with The Gallaspy?",
        answer:
          "Golf opportunities are announced through the Club Calendar and Gallaspy Rounds. Individual events may have their own registration process, field size, pricing, format, and guest policy.",
      },
      {
        question: "What are Gallaspy Rounds?",
        answer:
          "Gallaspy Rounds are recurring golf gatherings held at selected courses. They create opportunities for the community to play together, experience different venues, build relationships, and establish a continuing golf calendar.",
      },
      {
        question: "Are Gallaspy Rounds tournaments?",
        answer:
          "Not necessarily. Some Gallaspy events are competitive, while a Gallaspy Round may simply be an organized day of golf. The format for each event will be identified when its details are announced.",
      },
      {
        question: "Can guests participate?",
        answer:
          "Guest access may be available for selected events. Guest policies can vary by event and host course, so the applicable event page should be used for current details.",
      },
    ],
  },
  {
    category: "The Club Year",
    questions: [
      {
        question: "What is First Flight?",
        answer:
          "First Flight marks the beginning of active Gallaspy golf programming and the opening chapter of the club's playing history. The first First Flight is scheduled for September 26, 2026.",
      },
      {
        question: "What is Opening Drive?",
        answer:
          "Opening Drive is intended to mark the ceremonial beginning of each Gallaspy golf season in March.",
      },
      {
        question: "What is Night at the Nest?",
        answer:
          "Night at the Nest is the annual year-end Gallaspy gathering envisioned as a celebration of the people, moments, and season that came before it. The first Night at the Nest is planned for December 2027.",
      },
      {
        question: "Where can I see upcoming events?",
        answer:
          "The Club Calendar is the central source for announced Gallaspy Rounds, competitions, signature events, gatherings, and other scheduled club activity.",
      },
    ],
  },
  {
    category: "Competition",
    questions: [
      {
        question: "What is The Gallaspy Invitational?",
        answer:
          "The Gallaspy Invitational is the club's flagship annual golf tournament. The 1st Annual Gallaspy Invitational is scheduled for June 21, 2027. Tournament details are published on the Invitational page as they are confirmed.",
      },
      {
        question: "What is The Mercury Match?",
        answer:
          "The Mercury Match is The Gallaspy's annual team championship: Crest vs. Falcon. Team Crest competes in forest green and Team Falcon in navy blue. The inaugural match is planned for September 2027, with the exact date, host course, and match format to be announced.",
      },
      {
        question: "Have there been previous Mercury Match champions?",
        answer:
          "No. The inaugural Mercury Match has not yet been played. Results and the all-time series will begin with the first competition.",
      },
      {
        question: "Where will competition results be recorded?",
        answer:
          "As official competitions are completed, results and recaps can become part of The Gallaspy's permanent event history and Journal rather than being replaced by the next event.",
      },
    ],
  },
  {
    category: "The Founding Community",
    questions: [
      {
        question: "What is the Falcon Society?",
        answer:
          "The Falcon Society is The Gallaspy's founding community. It represents the Founding 100 — the first 100 confirmed individuals or families selected to become part of the club's opening chapter.",
      },
      {
        question: "Are the Falcon Society and Founding 100 different programs?",
        answer:
          "No. They are the same founding community. Falcon Society is the official name, while Founding 100 describes the first 100 confirmed participants.",
      },
      {
        question: "Does submitting an application mean I have been accepted?",
        answer:
          "No. Submitting an application expresses interest and begins the review process. An application is not confirmation or acceptance into the Falcon Society.",
      },
      {
        question: "Does the Falcon Society application guarantee future club membership?",
        answer:
          "No. Participation in the founding community should not be interpreted as a guarantee of future membership rights, ownership, equity, investment returns, or permanent privileges at a future club property.",
      },
    ],
  },
  {
    category: "The Permanent Home",
    questions: [
      {
        question: "Is a permanent Gallaspy property currently secured?",
        answer:
          "No permanent club property is currently represented as selected or secured.",
      },
      {
        question: "Is a permanent golf and country club still the long-term vision?",
        answer:
          "Yes. The long-term ambition remains to establish a permanent private golf and country club in Georgia. The eventual property, design, amenities, timeline, and operating structure will depend on decisions and opportunities still ahead.",
      },
      {
        question: "Are previous conceptual plans final?",
        answer:
          "No. Earlier concepts should not be interpreted as final plans or as representations of an existing property. Any future club plan will depend on the property ultimately selected and the planning, financial, regulatory, and operational decisions associated with it.",
      },
      {
        question: "Why begin the club before securing a permanent property?",
        answer:
          "Because the culture of a club can begin before its buildings do. The current chapter allows The Gallaspy to establish relationships, standards, traditions, competitions, and genuine history while the long-term vision develops.",
      },
    ],
  },
  {
    category: "Updates & Contact",
    questions: [
      {
        question: "How can I follow what happens next?",
        answer:
          "The Club Calendar provides upcoming activity, while The Gallaspy Journal is designed to preserve announcements, recaps, milestones, and stories as they actually happen.",
      },
      {
        question: "What is The Club Dispatch?",
        answer:
          "The Club Dispatch is The Gallaspy's developing communications channel for rounds, competition, gatherings, club news, apparel, and announcements. Additional registration functionality will be introduced as the communications system expands.",
      },
      {
        question: "How can I contact The Gallaspy?",
        answer:
          "Use the Contact page for general inquiries, partnerships, event questions, media inquiries, and other communication with The Gallaspy.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#10263F]">
      {/* HERO */}
      <section className="bg-[#10263F] px-5 pb-20 pt-32 text-white sm:px-8 sm:pb-24 sm:pt-36 lg:pt-44">
        <div className="mx-auto max-w-[1060px]">
          <p className="text-[9px] font-bold uppercase tracking-[0.38em] text-[#D2AF66]">
            The Gallaspy
          </p>

          <h1 className="mt-6 max-w-4xl font-serif text-[3.5rem] font-light leading-[0.95] sm:text-6xl lg:text-[5rem]">
            Questions,
            <span className="block text-[#D2AF66]">answered clearly.</span>
          </h1>

          <div className="mt-8 h-px w-16 bg-[#B89146]" />

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/72">
            The Gallaspy is in its opening chapter. Here is what exists today,
            what is beginning next, and what remains part of the long-term
            vision.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1060px]">
          <div className="space-y-20">
            {faqSections.map((section) => (
              <section
                key={section.category}
                className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-16"
              >
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#B89146]">
                    {section.category}
                  </p>

                  <div className="mt-5 h-px w-10 bg-[#B89146]" />
                </div>

                <div className="border-t border-[#10263F]/15">
                  {section.questions.map((item) => (
                    <details
                      key={item.question}
                      className="group border-b border-[#10263F]/15"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-8 py-6 font-serif text-xl font-light leading-snug sm:text-2xl">
                        <span>{item.question}</span>

                        <span className="shrink-0 text-xl font-light text-[#B89146] transition-transform group-open:rotate-45">
                          +
                        </span>
                      </summary>

                      <p className="max-w-2xl pb-7 pr-8 text-sm leading-7 text-[#33475B]/75 sm:text-base sm:leading-8">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* NEXT STEPS */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
            Begin Here
          </p>

          <h2 className="mt-5 font-serif text-[2.6rem] font-light leading-[1.05] sm:text-5xl">
            See what is happening
            <span className="block text-[#8B6A34]">at The Gallaspy now.</span>
          </h2>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/start-here"
              className="inline-flex min-h-[48px] items-center justify-center bg-[#10263F] px-7 text-[9px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#163A2F]"
            >
              Start Here
            </Link>

            <Link
              href="/calendar"
              className="inline-flex min-h-[48px] items-center justify-center border border-[#10263F]/25 px-7 text-[9px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:border-[#B89146]"
            >
              Club Calendar
            </Link>

            <Link
              href="/contact"
              className="inline-flex min-h-[48px] items-center justify-center border border-[#10263F]/25 px-7 text-[9px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:border-[#B89146]"
            >
              Contact The Gallaspy
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
