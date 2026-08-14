import Image from "next/image";
import Link from "next/link";
import InvitationalNav from "@/components/invitational/InvitationalNav";

const faqs = [
  {
    question: "When is the 2027 Gallaspy Invitational?",
    answer:
      "The inaugural Gallaspy Invitational is planned for May 24, 2027. Tournament-day activities are currently scheduled to begin with player arrival at 9:00 AM and an 11:00 AM shotgun start.",
  },
  {
    question: "What is the tournament format?",
    answer:
      "The Invitational is planned as a 4-person scramble with a field of 100 players.",
  },
  {
    question: "Is a GHIN or handicap required?",
    answer:
      "No. The tournament is being structured as a 4-person scramble and player registration does not require a GHIN or handicap.",
  },
  {
    question: "What is the tournament prize purse?",
    answer:
      "The planned tournament prize purse is $10,000. Final competition rules, prize distribution, eligibility requirements, and award terms will be published before paid registration opens.",
  },
  {
    question: "Where will the Invitational be played?",
    answer:
      "The official host course has not yet been publicly announced. The Gallaspy is finalizing the host-course agreement and will publish the venue once it is secured.",
  },
  {
    question: "Is player registration open?",
    answer:
      "Paid registration is not open yet. Players can currently join the priority interest list to receive registration announcements, finalized pricing, host-course information, and tournament updates.",
  },
  {
    question: "Can I register without a full team?",
    answer:
      "Yes. The current registration-interest form allows interest as an individual player, two players, three players, or a full 4-person team. Final pairing procedures will be announced with official registration.",
  },
  {
    question: "Will players receive tournament apparel?",
    answer:
      "Player polos are planned as part of the tournament experience. Players joining the interest list are asked to provide their preferred polo size so tournament planning can account for apparel needs.",
  },
  {
    question: "What on-course contests are planned?",
    answer:
      "The current tournament plan includes closest-to-the-pin, longest drive, and hole-in-one opportunities in addition to the team scramble competition. Final contest rules and prizes will be announced before the event.",
  },
  {
    question: "Are sponsorship opportunities available?",
    answer:
      "Yes. The Gallaspy is currently accepting sponsor inquiries for founding partnerships, on-course activations, player gifting, hospitality, apparel, automotive, awards, media, and other customized opportunities.",
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
              src="/logos/gallaspy-invitational.png"
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
            <p className="mt-2 font-serif text-xl">May 24, 2027</p>
          </div>

          <div className="border-b border-[#10263F]/10 px-4 py-8 md:border-b-0 md:border-r">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Format
            </p>
            <p className="mt-2 font-serif text-xl">4-Person Scramble</p>
          </div>

          <div className="border-r border-[#10263F]/10 px-4 py-8">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Field
            </p>
            <p className="mt-2 font-serif text-xl">100 Players</p>
          </div>

          <div className="px-4 py-8">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Prize Purse
            </p>
            <p className="mt-2 font-serif text-xl">$10,000</p>
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
              venue, registration, sponsor activations, contest rules, and
              operational details are finalized.
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
              Join the priority list to receive official player registration
              information and tournament updates.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/invitational/register"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#B89146] px-8 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-[#10263F]"
            >
              Join Priority List
            </Link>

            <Link
              href="/invitational/sponsors"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/25 px-8 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition hover:border-[#FFD76A] hover:text-[#FFD76A]"
            >
              Sponsor Opportunities
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}