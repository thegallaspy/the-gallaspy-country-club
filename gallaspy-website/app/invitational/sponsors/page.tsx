import Image from "next/image";
import Link from "next/link";
import InvitationalNav from "@/components/invitational/InvitationalNav";

const sponsorLevels = [
  {
    title: "Presenting Partner",
    investment: "Custom",
    description:
      "The highest-level partnership opportunity for a brand seeking premium visibility and integration throughout the inaugural Gallaspy Invitational.",
    benefits: [
      "Premier event branding",
      "Top-tier digital recognition",
      "Player hospitality opportunities",
      "On-course activation",
      "Awards presentation recognition",
      "Custom brand integration",
    ],
  },
  {
    title: "Championship Partner",
    investment: "Custom",
    description:
      "A major tournament partnership designed for companies seeking strong visibility across the player experience and event environment.",
    benefits: [
      "Tournament signage",
      "Digital and social recognition",
      "Player gifting opportunities",
      "On-course presence",
      "Hospitality opportunities",
      "Awards recognition",
    ],
  },
  {
    title: "Supporting Partner",
    investment: "Custom",
    description:
      "A flexible partnership level for companies looking to support the event while gaining meaningful exposure to players and guests.",
    benefits: [
      "Event recognition",
      "Select signage",
      "Digital exposure",
      "Player engagement",
      "Brand inclusion",
      "Custom activation options",
    ],
  },
];

const activationOpportunities = [
  "Hole Sponsorship",
  "Player Gift Partner",
  "Hole-in-One Partner",
  "Closest-to-the-Pin Partner",
  "Longest Drive Partner",
  "Hospitality Partner",
  "Beverage Partner",
  "Apparel Partner",
  "Automotive Partner",
  "Awards Partner",
  "Photography & Media Partner",
  "Custom Brand Activation",
];

export default function InvitationalSponsorsPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E6] text-[#10263F]">
      <InvitationalNav />

      {/* HERO */}
      <section className="bg-[#10263F] px-6 pb-24 pt-32 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1300px]">
          <Link
            href="/invitational"
            className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60 transition hover:text-[#FFD76A]"
          >
            ← Back to Invitational
          </Link>

          <p className="mt-12 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#FFD76A]">
            Founding Partnership Opportunities
          </p>

          <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
            Partner with the
            <span className="block text-[#FFD76A]">
              2027 Gallaspy Invitational
            </span>
          </h1>

          <div className="mt-8 h-px w-20 bg-[#B89146]" />

          <p className="mt-8 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
            The inaugural Gallaspy Invitational creates an opportunity for
            select brands to help establish a new annual golf tradition while
            engaging players, guests, and the growing Gallaspy community.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#opportunities"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#B89146] px-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-[#10263F]"
            >
              Explore Opportunities
            </a>

            <a
              href="#inquiry"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/25 px-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:border-[#FFD76A] hover:text-[#FFD76A]"
            >
              Sponsor Inquiry
            </a>
          </div>
        </div>
      </section>

      {/* EVENT SNAPSHOT */}
      <section className="border-b border-[#10263F]/10 bg-white px-6 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1300px] grid-cols-2 md:grid-cols-4">
          <div className="border-b border-r border-[#10263F]/10 px-4 py-8 md:border-b-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Tournament
            </p>
            <p className="mt-2 font-serif text-xl">1st Annual</p>
          </div>

          <div className="border-b border-[#10263F]/10 px-4 py-8 md:border-b-0 md:border-r">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Field
            </p>
            <p className="mt-2 font-serif text-xl">100 Players</p>
          </div>

          <div className="border-r border-[#10263F]/10 px-4 py-8">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Format
            </p>
            <p className="mt-2 font-serif text-xl">4-Person Scramble</p>
          </div>

          <div className="px-4 py-8">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Location
            </p>
            <p className="mt-2 font-serif text-xl">Georgia</p>
          </div>
        </div>
      </section>

      {/* WHY PARTNER */}
      <section className="px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-[1300px] gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8B6A34]">
              Why Partner
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Help shape the first chapter.
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="text-lg leading-9 text-[#10263F]/75">
              Founding sponsors will have the opportunity to become part of the
              inaugural year of The Gallaspy Invitational and establish an early
              relationship with a golf and lifestyle brand being built for the
              long term.
            </p>

            <p className="mt-6 text-sm leading-7 text-[#10263F]/62">
              Partnerships can be structured around hospitality, player gifting,
              on-course activations, digital exposure, event branding, prizes,
              food and beverage, automotive experiences, apparel, media, and
              other customized brand integrations.
            </p>
          </div>
        </div>
      </section>

      {/* SPONSOR LEVELS */}
      <section
        id="opportunities"
        className="bg-[#0E2238] px-6 py-24 text-white sm:px-8 lg:px-12 lg:py-32"
      >
        <div className="mx-auto max-w-[1300px]">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#FFD76A]">
              Partnership Levels
            </p>

            <h2 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl">
              Flexible partnerships built around brand fit.
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/62">
              Final sponsorship packages may be customized based on category,
              activation goals, exclusivity, hospitality, and the final host
              venue.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {sponsorLevels.map((level) => (
              <article
                key={level.title}
                className="flex flex-col border border-white/12 bg-white/[0.045] p-7 sm:p-8"
              >
                <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-[#FFD76A]">
                  {level.investment}
                </p>

                <h3 className="mt-4 font-serif text-3xl">{level.title}</h3>

                <p className="mt-5 text-sm leading-7 text-white/62">
                  {level.description}
                </p>

                <div className="mt-8 h-px w-full bg-white/12" />

                <div className="mt-7 space-y-4">
                  {level.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFD76A]" />
                      <p className="text-sm leading-6 text-white/78">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVATIONS */}
      <section className="bg-white px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-[1300px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8B6A34]">
              Activation Opportunities
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
              More than a logo on a sign.
            </h2>

            <p className="mt-6 text-sm leading-7 text-[#10263F]/65">
              We want sponsor participation to feel relevant to the player
              experience. Partnerships can be shaped around specific moments,
              contests, hospitality, products, services, and brand categories.
            </p>
          </div>

          <div className="grid border-t border-[#10263F]/15 sm:grid-cols-2">
            {activationOpportunities.map((item, index) => (
              <div
                key={item}
                className={`flex min-h-[78px] items-center justify-between border-b border-[#10263F]/15 py-5 ${
                  index % 2 === 0 ? "sm:pr-7" : "sm:border-l sm:pl-7"
                }`}
              >
                <span className="font-serif text-xl">{item}</span>

                <span className="text-[9px] font-semibold tracking-[0.2em] text-[#8B6A34]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VENUE STATUS */}
      <section className="bg-[#EFE7D8] px-6 py-20 text-center sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8B6A34]">
            Host Course
          </p>

          <h2 className="mt-5 font-serif text-4xl sm:text-5xl">
            Official venue announcement forthcoming.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#10263F]/65">
            The Gallaspy is finalizing the host-course agreement for the 2027
            Invitational. Sponsorship materials and benefits will be updated as
            final venue details are confirmed.
          </p>
        </div>
      </section>

      {/* INQUIRY */}
      <section
        id="inquiry"
        className="bg-[#10263F] px-6 py-24 text-white sm:px-8 lg:px-12 lg:py-32"
      >
        <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#FFD76A]">
              Sponsor Inquiry
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
              Start the conversation.
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/62">
              Tell us about your organization and the type of partnership you
              would like to explore. Our team can follow up with current
              sponsorship information and custom opportunities.
            </p>
          </div>

          <form className="grid gap-5 rounded-[22px] border border-white/12 bg-white/[0.05] p-7 sm:grid-cols-2 sm:p-9">
            <SponsorField label="Contact Name" name="name" />
            <SponsorField label="Company" name="company" />
            <SponsorField label="Email Address" name="email" type="email" />
            <SponsorField label="Phone Number" name="phone" type="tel" />

            <div className="sm:col-span-2">
              <label
                htmlFor="interest"
                className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#FFD76A]"
              >
                Partnership Interest
              </label>

              <select
                id="interest"
                name="interest"
                defaultValue=""
                className="h-[50px] w-full rounded-xl border border-white/15 bg-white/[0.07] px-4 text-sm text-white outline-none"
              >
                <option value="" disabled className="text-[#10263F]">
                  Select an opportunity
                </option>
                <option value="presenting" className="text-[#10263F]">
                  Presenting Partner
                </option>
                <option value="championship" className="text-[#10263F]">
                  Championship Partner
                </option>
                <option value="supporting" className="text-[#10263F]">
                  Supporting Partner
                </option>
                <option value="activation" className="text-[#10263F]">
                  Specific Activation
                </option>
                <option value="custom" className="text-[#10263F]">
                  Custom Partnership
                </option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#FFD76A]"
              >
                Tell Us More
              </label>

              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full rounded-xl border border-white/15 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none"
                placeholder="Tell us about your company, goals, or partnership idea."
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-[#B89146] px-8 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-[#10263F]"
              >
                Submit Sponsor Interest
              </button>

              <p className="mt-4 text-center text-[10px] leading-5 text-white/40">
                This inquiry form does not create a sponsorship agreement or
                financial obligation.
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

type SponsorFieldProps = {
  label: string;
  name: string;
  type?: string;
};

function SponsorField({
  label,
  name,
  type = "text",
}: SponsorFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#FFD76A]"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        className="h-[50px] w-full rounded-xl border border-white/15 bg-white/[0.07] px-4 text-sm text-white outline-none"
      />
    </div>
  );
}