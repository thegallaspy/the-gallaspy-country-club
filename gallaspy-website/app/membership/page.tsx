import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import MembershipInterestForm from "@/components/forms/MembershipInterestForm";

export const metadata: Metadata = {
  title: "Membership | The Gallaspy Golf & Country Club",
  description:
    "Explore future membership opportunities, preliminary pricing, and The Founding 250 at The Gallaspy Golf & Country Club in Covington, Georgia.",
};

const benefits = [
  {
    number: "01",
    title: "Championship Golf",
    description:
      "An 18-hole championship course, expansive practice facilities, professional instruction, and a year-round member tournament calendar.",
  },
  {
    number: "02",
    title: "Private Dining",
    description:
      "Chef-driven dining at Mercury Street Restaurant, private dinners, seasonal culinary programming, and an integrated wine experience.",
  },
  {
    number: "03",
    title: "Wellness & Spa",
    description:
      "A full-service wellness environment featuring fitness, restorative treatments, spa experiences, and resort-style pools.",
  },
  {
    number: "04",
    title: "Racquet & Recreation",
    description:
      "Tennis, pickleball, clinics, social competition, and recreational programming designed for all ages and skill levels.",
  },
  {
    number: "05",
    title: "Family Traditions",
    description:
      "Youth programming, seasonal celebrations, holiday events, and meaningful experiences designed to bring generations together.",
  },
  {
    number: "06",
    title: "Member Hospitality",
    description:
      "Luxury lodging, concierge service, guest accommodations, private events, and an elevated arrival experience.",
  },
];

const foundingBenefits = [
  {
    number: "01",
    title: "Permanent Recognition",
    description:
      "Founding Members are intended to receive permanent recognition within the future clubhouse as part of the club’s original membership generation.",
  },
  {
    number: "02",
    title: "Founding Events",
    description:
      "Access to select development gatherings, private presentations, membership events, and milestone celebrations as the vision advances.",
  },
  {
    number: "03",
    title: "Legacy Status",
    description:
      "A distinguished membership designation recognizing those who believed in The Gallaspy during its earliest and most important chapter.",
  },
  {
    number: "04",
    title: "Early Communication",
    description:
      "Priority project updates, membership announcements, development milestones, and future opportunities connected to the club.",
  },
];

const membershipTiers = [
  {
    name: "Charter Founder",
    availability: "Memberships 1–100",
    initiation: "$7,500",
    monthly: "$595",
    description:
      "The earliest membership release for individuals and families who want to stand among the first supporters of The Gallaspy.",
    featured: true,
  },
  {
    name: "Founding Member",
    availability: "Memberships 101–250",
    initiation: "$10,000",
    monthly: "$650",
    description:
      "The second founding release, completing the original group of 250 members who will help establish the club’s culture and traditions.",
    featured: false,
  },
  {
    name: "Legacy Member",
    availability: "Memberships 251–400",
    initiation: "$15,000",
    monthly: "$725",
    description:
      "A future membership release for individuals and families joining the club during its continued development and growth.",
    featured: false,
  },
  {
    name: "Standard Membership",
    availability: "Future Release",
    initiation: "$25,000+",
    monthly: "$850–$950",
    description:
      "Future full membership pricing anticipated following major development milestones and the formal opening of club facilities.",
    featured: false,
  },
];

export default function MembershipPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#1E3557]">
      {/* Hero */}
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#10263F]/88 via-[#10263F]/58 to-[#10263F]/30" />

        <div className="relative z-10 mx-auto w-full max-w-[1060px] py-20 text-white sm:py-24">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#FFD76A]">
              Founding Membership
            </p>

            <h1 className="mt-5 max-w-3xl font-serif text-[2.8rem] font-light leading-[1.02] text-white sm:text-6xl lg:text-[4.5rem]">
              Membership Begins
              <span className="block">With Legacy</span>
            </h1>

            <div className="mt-6 h-px w-16 bg-[#B89146]" />

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              Membership at The Gallaspy represents more than access to
              exceptional amenities. It is an invitation to join a private
              community built around tradition, family, championship golf, and
              enduring relationships.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/founding-250"
                className="inline-flex min-h-[45px] items-center justify-center rounded-full border border-[#B89146] bg-[#B89146] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:bg-[#FFD76A] hover:text-[#10263F]"
              >
                Explore the Founding 250
              </Link>

              <Link
                href="#membership-pricing"
                className="inline-flex min-h-[45px] items-center justify-center rounded-full border border-white/60 bg-white/[0.05] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#FFD76A] hover:text-[#FFD76A]"
              >
                View Membership Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Membership Philosophy
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              A Club Designed
              <span className="block">for Generations</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />
          </div>

          <div className="border-l border-[#B89146]/35 pl-6 sm:pl-8">
            <p className="text-base leading-8 text-[#1E3557]">
              The Gallaspy is envisioned as a private community where members
              are known, families feel at home, and traditions are created
              naturally over time.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              Membership is planned to be intentionally limited to preserve
              privacy, thoughtful service, course access, and a genuine sense
              of belonging. Every amenity—from golf and dining to wellness,
              lodging, and family recreation—is designed to complement a
              complete private-club lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* Founding 250 introduction */}
      <section className="bg-[#10263F] px-5 py-16 text-white sm:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1060px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
              The Original Membership Generation
            </p>

            <h2 className="mt-4 font-serif text-[2.5rem] font-light leading-[1.05] text-white sm:text-5xl">
              The Founding
              <span className="block text-[#FFD76A]">250</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-base leading-8 text-white/85">
              The first 250 memberships are intended to represent the original
              founding generation of The Gallaspy Golf &amp; Country Club.
            </p>

            <p className="mt-5 text-sm leading-7 text-white/72">
              These members will be among the earliest individuals and families
              to support the vision, establish the culture, and begin the
              traditions that future generations will inherit.
            </p>

            <Link
              href="/founding-250"
              className="mt-8 inline-flex min-h-[45px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Learn About the Founding 250
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {foundingBenefits.map((benefit) => (
              <article
                key={benefit.number}
                className="rounded-[18px] border border-white/15 bg-white/[0.06] p-6"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#FFD76A]">
                  {benefit.number}
                </p>

                <h3 className="mt-4 font-serif text-2xl font-light text-white">
                  {benefit.title}
                </h3>

                <div className="mt-4 h-px w-10 bg-[#B89146]" />

                <p className="mt-4 text-sm leading-7 text-white/72">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              The Member Experience
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              A Complete Private-Club Lifestyle
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#1E3557]/80">
              Each element of The Gallaspy is being planned to support
              connection, recreation, hospitality, and lasting family
              traditions.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-[18px] border border-[#1E3557]/12 bg-[#F7F4EE] p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B89146]">
                  {benefit.number}
                </p>

                <h3 className="mt-5 font-serif text-2xl font-light text-[#10263F]">
                  {benefit.title}
                </h3>

                <div className="mt-4 h-px w-10 bg-[#B89146]" />

                <p className="mt-4 text-sm leading-7 text-[#1E3557]/80">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial image */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1060px] overflow-hidden rounded-[22px] bg-[#10263F] lg:grid-cols-2">
          <div className="relative min-h-[340px] lg:min-h-[500px]">
            <Image
              src="/images/golf.png"
              alt="Championship golf experience at The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="flex items-center px-7 py-12 text-white sm:px-10 lg:px-14">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
                Belonging at The Gallaspy
              </p>

              <blockquote className="mt-6 font-serif text-[2rem] font-light leading-[1.2] text-white sm:text-[2.6rem]">
                “Great clubs are defined not by the number of members they
                have, but by the traditions those members create together.”
              </blockquote>

              <div className="mt-7 h-px w-14 bg-[#B89146]" />

              <p className="mt-6 text-sm leading-7 text-white/75">
                The Gallaspy is being created to become a place members are
                proud to share with their families, friends, and future
                generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership pricing */}
      <section
        id="membership-pricing"
        className="scroll-mt-24 bg-[#1E3557] px-5 py-16 text-white sm:px-8 lg:py-20"
      >
        <div className="mx-auto w-full max-w-[1180px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
              Preliminary Membership Structure
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">
              Founding Membership Pricing
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/75">
              Early membership releases are designed to recognize the
              individuals and families who support The Gallaspy during its
              founding years.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {membershipTiers.map((tier) => (
              <article
                key={tier.name}
                className={`relative flex h-full flex-col rounded-[20px] border p-6 sm:p-7 ${
                  tier.featured
                    ? "border-[#FFD76A] bg-white text-[#10263F]"
                    : "border-white/15 bg-white/[0.06] text-white"
                }`}
              >
                {tier.featured && (
                  <div className="absolute right-5 top-5 rounded-full bg-[#B89146] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white">
                    First Release
                  </div>
                )}

                <p
                  className={`text-[10px] font-bold uppercase tracking-[0.22em] ${
                    tier.featured ? "text-[#B89146]" : "text-[#FFD76A]"
                  }`}
                >
                  {tier.availability}
                </p>

                <h3 className="mt-5 font-serif text-3xl font-light">
                  {tier.name}
                </h3>

                <div className="mt-5 h-px w-12 bg-[#B89146]" />

                <div className="mt-6 border-b border-current/15 pb-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-65">
                    Initiation Fee
                  </p>

                  <p className="mt-2 font-serif text-4xl font-light">
                    {tier.initiation}
                  </p>
                </div>

                <div className="mt-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-65">
                    Monthly Dues
                  </p>

                  <p className="mt-2 font-serif text-3xl font-light">
                    {tier.monthly}
                  </p>
                </div>

                <p
                  className={`mt-6 text-sm leading-7 ${
                    tier.featured
                      ? "text-[#1E3557]/75"
                      : "text-white/72"
                  }`}
                >
                  {tier.description}
                </p>

                <Link
                  href="#membership-interest"
                  className={`mt-7 inline-flex min-h-[44px] items-center justify-center rounded-full border px-5 text-center text-[10px] font-bold uppercase tracking-[0.18em] transition hover:-translate-y-0.5 ${
                    tier.featured
                      ? "border-[#10263F] bg-[#10263F] text-white hover:bg-[#B89146]"
                      : "border-[#FFD76A] text-[#FFD76A] hover:bg-[#FFD76A] hover:text-[#10263F]"
                  }`}
                >
                  Register Interest
                </Link>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-[16px] border border-white/15 bg-white/[0.05] px-6 py-5 text-center">
            <p className="text-xs leading-6 text-white/65">
              Pricing, dues, privileges, availability, membership categories,
              payment schedules, and launch dates are preliminary and subject to
              change before formal membership offerings begin. Registering
              interest does not constitute a membership purchase, reservation,
              or guarantee of acceptance.
            </p>
          </div>
        </div>
      </section>

      {/* Interest form */}
      <section
        id="membership-interest"
        className="scroll-mt-24 bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-20"
      >
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Register Your Interest
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Become Part of the Founding Generation
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-sm leading-7 text-[#1E3557]/80">
              Share your contact information and membership interests to
              receive future project updates, development announcements,
              Founding 250 information, and formal membership details.
            </p>

            <div className="mt-8 rounded-[16px] bg-[#EEE8DC] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#B89146]">
                Private &amp; Confidential
              </p>

              <p className="mt-3 text-sm leading-6 text-[#1E3557]/75">
                Information submitted through this form will be used solely
                for project and membership-related communication.
              </p>
            </div>
          </div>

          <MembershipInterestForm />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#163A2F] px-5 py-14 text-white sm:px-8 lg:py-16">
        <div className="mx-auto flex w-full max-w-[1060px] flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#FFD76A]">
              The Gallaspy Golf &amp; Country Club
            </p>

            <h2 className="mt-3 font-serif text-3xl font-light text-white sm:text-4xl">
              A Legacy Is Built One Member at a Time
            </h2>
          </div>

          <Link
            href="/founding-250"
            className="inline-flex min-h-[45px] shrink-0 items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
          >
            Explore the Founding 250
          </Link>
        </div>
      </section>
    </main>
  );
}