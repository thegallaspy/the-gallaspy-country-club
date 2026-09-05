import Image from "next/image";
import Link from "next/link";
import InvitationalNav from "@/components/invitational/InvitationalNav";

const faqs = [
  {
    question: "When is the 2027 Gallaspy Invitational?",
    answer:
      "The inaugural Gallaspy Invitational is scheduled for Monday, June 21, 2027. Player arrival begins at 8:00 AM, the player meeting is scheduled for 9:30 AM, and the championship is planned to begin with a 10:00 AM shotgun start.",
  },
  {
    question: "What is the tournament format?",
    answer:
      "The Invitational is an 18-hole individual stroke-play championship with a 72-player field. Each golfer plays their own ball and records an individual score for all 18 holes.",
  },
  {
    question: "How is the Gallaspy Invitational Champion determined?",
    answer:
      "The Gallaspy Invitational Champion is the golfer who records the lowest actual gross score over 18 holes. That player earns the primary championship title and is the golfer recognized on the permanent Invitational trophy.",
  },
  {
    question: "Is there a Net Championship?",
    answer:
      "Yes. Eligible players with a current GHIN or other tournament-recognized handicap will also be scored in a separate Net Championship. The Net Champion is a separate award and does not replace the Gross Champion as The Gallaspy Invitational Champion.",
  },
  {
    question: "Is a GHIN or handicap required to register?",
    answer:
      "No. A handicap is not required to enter the tournament or compete for the Gross Championship. A current GHIN or other recognized handicap is required for Net Championship eligibility and is subject to verification by the Tournament Committee.",
  },
  {
    question: "What happens if the Gross Championship is tied?",
    answer:
      "A tie for the lowest gross score will be decided by a sudden-death playoff. The Tournament Committee will publish the designated playoff hole or holes before competition.",
  },
  {
    question: "How are Net Championship ties decided?",
    answer:
      "A tie for the Net Championship will be decided by a scorecard playoff using the procedure established by the Tournament Committee.",
  },
  {
    question: "Where will the Invitational be played?",
    answer:
      "The official host course has not yet been publicly announced. The Gallaspy is finalizing the host-course agreement and will publish the venue once it is secured.",
  },
  {
    question: "Is player registration open?",
    answer:
      "Yes. Player registration is open for the 2027 Gallaspy Invitational. Individual entry is $200 per golfer. The championship field is limited to 72 players. Final host-course details and player instructions will be communicated to registered players as tournament planning is finalized.",
  },
  {
    question: "Can I register multiple golfers in one transaction?",
    answer:
      "No. The Invitational uses individual registration. Each golfer must complete a separate registration so player information, championship eligibility, handicap information, waivers, and payment records are maintained individually.",
  },
  {
    question: "Will players receive tournament apparel?",
    answer:
      "Player polos are planned as part of the tournament experience. Registered players are asked to provide their preferred polo size so tournament apparel can be prepared appropriately.",
  },
  {
    question: "What on-course contests are planned?",
    answer:
      "Closest-to-the-Pin and a Hole-in-One Challenge are planned as supplemental on-course competitions. Sponsor activations may also be introduced separately from the official Gross and Net Championships.",
  },
  {
    question: "Are sponsorship opportunities available?",
    answer:
      "Yes. The Gallaspy is accepting sponsor inquiries for founding partnerships, on-course activations, player gifting, hospitality, apparel, automotive, awards, media, and other customized tournament opportunities.",
  },
];

export default function InvitationalFAQPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E6] text-[#10263F]">
      <InvitationalNav />

      {/* HERO */}
      <section className="bg-[#10263F] px-6 pb-20 pt-32 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1100px]">
          <Link
            href="/invitational"
            className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60 transition hover:text-[#FFD76A]"
          >
            ← Back to Invitational
          </Link>

          <div className="mt-10">
            <Image
              src="/logos/events/gallaspy-invitational-logo.png"
              alt="The Gallaspy Invitational"
              width={300}
              height={300}
              priority
              className="h-auto w-[150px] sm:w-[180px] lg:w-[205px]"
            />
          </div>

          <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#FFD76A]">
            Tournament Information
          </p>

          <h1 className="mt-5 font-serif text-5xl sm:text-6xl lg:text-7xl">
            Invitational FAQ
          </h1>

          <div className="mt-8 h-px w-20 bg-[#B89146]" />

          <p className="mt-8 max-w-2xl text-base leading-8 text-white/70">
            Answers to the most important questions about the inaugural 2027
            Gallaspy Invitational, including registration, competition,
            sponsorship, prizes, and tournament-day planning.
          </p>
        </div>
      </section>

      {/* EVENT SNAPSHOT */}
      <section className="border-b border-[#10263F]/10 bg-white px-6 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1100px] grid-cols-2 md:grid-cols-4">
          <div className="border-b border-r border-[#10263F]/10 px-4 py-8 md:border-b-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Date
            </p>
            <p className="mt-2 font-serif text-xl">June 21, 2027</p>
          </div>

          <div className="border-b border-[#10263F]/10 px-4 py-8 md:border-b-0 md:border-r">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Format
            </p>
            <p className="mt-2 font-serif text-xl">Individual Stroke Play</p>
          </div>

          <div className="border-r border-[#10263F]/10 px-4 py-8">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Field
            </p>
            <p className="mt-2 font-serif text-xl">72 Players</p>
          </div>

          <div className="px-4 py-8">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Start
            </p>
            <p className="mt-2 font-serif text-xl">10:00 AM</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8B6A34]">
              Questions & Answers
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
              Know before you play.
            </h2>

            <p className="mt-6 text-sm leading-7 text-[#10263F]/65">
              Tournament information will continue to be updated as the host
              venue, final registration details, local rules, sponsor activations,
              and operational details are finalized.
            </p>
          </div>

          <div className="border-t border-[#10263F]/15">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                className="group border-b border-[#10263F]/15"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-7">
                  <div className="flex gap-5">
                    <span className="mt-1 text-[9px] font-semibold tracking-[0.2em] text-[#8B6A34]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="font-serif text-xl leading-snug sm:text-2xl">
                      {faq.question}
                    </h3>
                  </div>

                  <span className="mt-1 text-xl text-[#8B6A34] transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="pb-7 pl-0 sm:pl-12">
                  <p className="max-w-2xl text-sm leading-7 text-[#10263F]/65">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* IMPORTANT NOTICE */}
      <section className="bg-[#EFE7D8] px-6 py-16 text-center sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8B6A34]">
            Tournament Updates
          </p>

          <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
            Details will become official as planning is finalized.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#10263F]/62">
            Tournament format, purse structure, contests, registration pricing,
            venue information, eligibility requirements, and schedule details
            remain subject to the final tournament rules and host-course
            agreement.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#10263F] px-6 py-20 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#FFD76A]">
              2027 Gallaspy Invitational
            </p>

            <h2 className="mt-5 font-serif text-4xl sm:text-5xl">
              Be part of the inaugural field.
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/62">
              Registration is open for the 2027 Gallaspy Invitational.
              information and tournament updates.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/invitational/register"
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-[#B89146] px-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-[#10263F] sm:w-auto sm:px-8"
            >
              Register Now
            </Link>

            <Link
              href="/invitational/sponsors"
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full border border-white/25 px-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition hover:border-[#FFD76A] hover:text-[#FFD76A] sm:w-auto sm:px-8"
            >
              Sponsor Opportunities
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}