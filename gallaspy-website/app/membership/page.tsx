import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import MembershipInterestForm from "@/components/forms/MembershipInterestForm";

export const metadata: Metadata = {
  title: "Membership | The Gallaspy Golf & Country Club",
  description:
    "Explore preliminary membership categories and register your interest in The Gallaspy Golf & Country Club.",
};

const membershipTiers = [
  {
    eyebrow: "First Release",
    name: "Founding 250",
    initiation: "$7,500",
    monthly: "$475",
    description:
      "The original membership generation for individuals and families who believe in The Gallaspy during its earliest chapter.",
    benefits: [
      "Full golf, dining, wellness, recreation, and social privileges",
      "Permanent Founding Member recognition",
      "Priority access to select project updates and founding events",
      "Founding Charter Certificate and legacy designation",
    ],
    featured: true,
  },
  {
    eyebrow: "Primary Golf Membership",
    name: "Full Golf",
    initiation: "$15,000",
    monthly: "$650",
    description:
      "The complete golf and country club experience for individuals and families seeking championship golf, dining, wellness, recreation, and club traditions.",
    benefits: [
      "Full golf and practice privileges",
      "Dining, wellness, recreation, and events",
      "Family and guest access subject to club policies",
      "Member tournament and social programming",
    ],
    featured: false,
  },
  {
    eyebrow: "For Members Under 40",
    name: "Executive",
    initiation: "$5,000",
    monthly: "$425",
    description:
      "A reduced-entry full membership created for rising professionals, entrepreneurs, and community leaders under the age of 40.",
    benefits: [
      "Golf, dining, social, and wellness privileges",
      "Executive networking and leadership programming",
      "Family access subject to club policies",
      "Transitions to standard membership at the applicable age",
    ],
    featured: false,
  },
  {
    eyebrow: "Children of Existing Members",
    name: "Legacy Membership",
    initiation: "50% of Current Fee",
    monthly: "Standard Dues",
    description:
      "A generational membership pathway designed to help the children of existing members continue their family’s relationship with The Gallaspy.",
    benefits: [
      "Reduced initiation fee for qualified legacy applicants",
      "Access based on the selected membership category",
      "Family legacy recognition",
      "Subject to application and club approval",
    ],
    featured: false,
  },
  {
    eyebrow: "Community Access",
    name: "Aspire Membership",
    initiation: "No Initiation",
    monthly: "$195",
    description:
      "An accessible introduction to The Gallaspy for individuals and families who want to experience the club community while working toward full membership.",
    benefits: [
      "Restaurant and selected social-event access",
      "Limited practice-facility access",
      "Four golf rounds per year",
      "Potential upgrade credit toward full membership",
    ],
    featured: false,
  },
];

const lifestyleBenefits = [
  {
    number: "01",
    title: "Championship Golf",
    description:
      "An 18-hole championship course, expansive practice facilities, professional instruction, and year-round member programming.",
  },
  {
    number: "02",
    title: "Private Dining",
    description:
      "Chef-driven dining, private dinners, seasonal culinary programming, and a distinctive wine experience.",
  },
  {
    number: "03",
    title: "Wellness & Recreation",
    description:
      "Fitness, restorative treatments, resort pools, tennis, pickleball, and programming for all ages.",
  },
  {
    number: "04",
    title: "Family Traditions",
    description:
      "Youth programs, holiday celebrations, member events, lodging, and experiences designed to bring generations together.",
  },
];

export default function MembershipPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#1E3557]">
      <section className="relative flex min-h-[68vh] items-center overflow-hidden px-5 pt-[72px] sm:px-8">
        <Image
          src="/images/clubhouse.png"
          alt="The future clubhouse at The Gallaspy Golf and Country Club"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#10263F]/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10263F]/90 via-[#10263F]/62 to-[#10263F]/30" />

        <div className="relative z-10 mx-auto w-full max-w-[1060px] py-20 text-white sm:py-24">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#FFD76A]">
              Membership at The Gallaspy
            </p>
            <h1 className="mt-5 max-w-3xl font-serif text-[2.8rem] font-light leading-[1.02] !text-white sm:text-6xl lg:text-[4.5rem]">
              Membership Begins
              <span className="block !text-white">With Belonging</span>
            </h1>
            <div className="mt-6 h-px w-16 bg-[#B89146]" />
            <p className="mt-6 max-w-2xl text-sm leading-7 !text-white/85 sm:text-base sm:leading-8">
              The Gallaspy is being created for people who value championship
              golf, meaningful relationships, family traditions, elevated
              hospitality, and a genuine sense of community.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#membership-pricing"
                className="inline-flex min-h-[45px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] !text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Explore Memberships
              </Link>
              <Link
                href="#membership-interest"
                className="inline-flex min-h-[45px] items-center justify-center rounded-full border border-white/60 bg-white/[0.05] px-7 text-[10px] font-bold uppercase tracking-[0.2em] !text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#FFD76A] hover:!text-[#FFD76A]"
              >
                Register Interest
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] !text-[#B89146]">
              Membership Philosophy
            </p>
            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] !text-[#10263F] sm:text-5xl">
              Excellence Without
              <span className="block !text-[#10263F]">Exclusivity of Spirit</span>
            </h2>
            <div className="mt-6 h-px w-14 bg-[#B89146]" />
          </div>

          <div className="border-l border-[#B89146]/35 pl-6 sm:pl-8">
            <p className="text-base leading-8 !text-[#1E3557]">
              The Gallaspy will be refined, private, and intentionally limited,
              but it will never be built around making good people feel
              unwelcome.
            </p>
            <p className="mt-5 text-sm leading-7 !text-[#1E3557]/80">
              Our membership structure is designed to serve established
              families, successful professionals, rising leaders, and
              individuals working toward their next level. The standard is not
              simply wealth. It is character, community, respect, and a shared
              appreciation for the club we are building together.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] !text-[#B89146]">
              The Member Experience
            </p>
            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] !text-[#10263F] sm:text-5xl">
              A Complete Private-Club Lifestyle
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {lifestyleBenefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-[18px] border border-[#1E3557]/12 bg-[#F7F4EE] p-6"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] !text-[#B89146]">
                  {benefit.number}
                </p>
                <h3 className="mt-5 font-serif text-2xl font-light !text-[#10263F]">
                  {benefit.title}
                </h3>
                <div className="mt-4 h-px w-10 bg-[#B89146]" />
                <p className="mt-4 text-sm leading-7 !text-[#1E3557]/80">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="membership-pricing"
        className="scroll-mt-24 bg-[#10263F] px-5 py-16 sm:px-8 lg:py-20"
      >
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] !text-[#FFD76A]">
              Preliminary Membership Structure
            </p>
            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] !text-white sm:text-5xl">
              Membership Categories
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 !text-white/75">
              Each category is designed to create a clear pathway into the club
              while protecting the quality of the member experience.
            </p>
          </div>

          <div className="mt-12 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
            {membershipTiers.map((tier) => (
              <article
                key={tier.name}
                className={`relative flex h-full min-h-[610px] flex-col rounded-[20px] border p-6 sm:p-7 ${
                  tier.featured
                    ? "border-[#FFD76A] bg-[#F7F4EE] !text-[#10263F] shadow-xl"
                    : "border-white/15 bg-white/[0.06] !text-white"
                }`}
              >
                {tier.featured && (
                  <div className="absolute right-5 top-5 rounded-full bg-[#B89146] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] !text-white">
                    First Release
                  </div>
                )}

                <p
                  className={`max-w-[75%] text-[10px] font-bold uppercase tracking-[0.22em] ${
                    tier.featured ? "!text-[#B89146]" : "!text-[#FFD76A]"
                  }`}
                >
                  {tier.eyebrow}
                </p>

                <h3
                  className={`mt-5 font-serif text-3xl font-light ${
                    tier.featured ? "!text-[#10263F]" : "!text-white"
                  }`}
                >
                  {tier.name}
                </h3>

                <div className="mt-5 h-px w-12 bg-[#B89146]" />

                <div
                  className={`mt-6 border-b pb-5 ${
                    tier.featured
                      ? "border-[#10263F]/15"
                      : "border-white/15"
                  }`}
                >
                  <p
                    className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                      tier.featured
                        ? "!text-[#10263F]/65"
                        : "!text-white/65"
                    }`}
                  >
                    Initiation
                  </p>
                  <p
                    className={`mt-2 font-serif text-4xl font-light ${
                      tier.featured ? "!text-[#10263F]" : "!text-white"
                    }`}
                  >
                    {tier.initiation}
                  </p>
                </div>

                <div className="mt-5">
                  <p
                    className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                      tier.featured
                        ? "!text-[#10263F]/65"
                        : "!text-white/65"
                    }`}
                  >
                    Monthly
                  </p>
                  <p
                    className={`mt-2 font-serif text-3xl font-light ${
                      tier.featured ? "!text-[#10263F]" : "!text-white"
                    }`}
                  >
                    {tier.monthly}
                  </p>
                </div>

                <p
                  className={`mt-5 text-sm leading-7 ${
                    tier.featured
                      ? "!text-[#1E3557]/80"
                      : "!text-white/78"
                  }`}
                >
                  {tier.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {tier.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 text-sm leading-6"
                    >
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFD76A]" />
                      <span
                        className={
                          tier.featured
                            ? "!text-[#1E3557]/85"
                            : "!text-white/85"
                        }
                      >
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="#membership-interest"
                  className={`mt-auto inline-flex min-h-[44px] items-center justify-center rounded-full border px-5 pt-px text-center text-[10px] font-bold uppercase tracking-[0.18em] transition hover:-translate-y-0.5 ${
                    tier.featured
                      ? "border-[#10263F] bg-[#10263F] !text-white hover:border-[#B89146] hover:bg-[#B89146]"
                      : "border-[#FFD76A] !text-[#FFD76A] hover:bg-[#FFD76A] hover:!text-[#10263F]"
                  }`}
                >
                  Register Interest
                </Link>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-[16px] border border-white/15 bg-white/[0.05] px-6 py-5 text-center">
            <p className="text-xs leading-6 !text-white/65">
              Pricing, dues, privileges, availability, membership categories,
              payment schedules, and launch dates are preliminary and subject to
              change. Registering interest does not constitute a membership
              purchase, reservation, or guarantee of acceptance.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1060px] overflow-hidden rounded-[22px] bg-[#163A2F] lg:grid-cols-2">
          <div className="relative min-h-[340px] lg:min-h-[500px]">
            <Image
              src="/images/golf.png"
              alt="Championship golf experience at The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="flex items-center px-7 py-12 sm:px-10 lg:px-14">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] !text-[#FFD76A]">
                Belonging at The Gallaspy
              </p>
              <blockquote className="mt-6 font-serif text-[2rem] font-light leading-[1.2] !text-white sm:text-[2.6rem]">
                “A great club is defined not only by its amenities, but by the
                people and traditions that bring it to life.”
              </blockquote>
              <div className="mt-7 h-px w-14 bg-[#B89146]" />
              <p className="mt-6 text-sm leading-7 !text-white/75">
                The Gallaspy is being designed as a place members are proud to
                share with their families, friends, and future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="membership-interest"
        className="scroll-mt-24 bg-white px-5 py-16 sm:px-8 lg:py-20"
      >
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] !text-[#B89146]">
              Register Your Interest
            </p>
            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] !text-[#10263F] sm:text-5xl">
              Begin Your Membership Journey
            </h2>
            <div className="mt-6 h-px w-14 bg-[#B89146]" />
            <p className="mt-6 text-sm leading-7 !text-[#1E3557]/80">
              Share your contact information and preferred membership category
              to receive future project updates, membership announcements, and
              formal application information.
            </p>

            <div className="mt-8 rounded-[16px] bg-[#EEE8DC] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] !text-[#B89146]">
                Private &amp; Confidential
              </p>
              <p className="mt-3 text-sm leading-6 !text-[#1E3557]/75">
                Information submitted through this form will be used solely for
                project and membership-related communication.
              </p>
            </div>
          </div>

          <MembershipInterestForm />
        </div>
      </section>

      <section className="bg-[#163A2F] px-5 py-14 sm:px-8 lg:py-16">
        <div className="mx-auto flex w-full max-w-[1060px] flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] !text-[#FFD76A]">
              The Gallaspy Golf &amp; Country Club
            </p>
            <h2 className="mt-3 font-serif text-3xl font-light !text-white sm:text-4xl">
              A Legacy Is Built One Member at a Time
            </h2>
          </div>

          <Link
            href="/founding-250"
            className="inline-flex min-h-[45px] shrink-0 items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] !text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
          >
            Explore the Founding 250
          </Link>
        </div>
      </section>
    </main>
  );
}