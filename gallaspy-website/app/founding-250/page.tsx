import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Founding250Form from "@/components/Founding250Form";

export const metadata: Metadata = {
  title: "The Founding 250 | The Gallaspy Golf & Country Club",
  description:
    "Discover The Founding 250, the original membership generation of The Gallaspy Golf & Country Club in Covington, Georgia.",
};

const foundingBenefits = [
  {
    number: "01",
    title: "Founding Member Recognition",
    description:
      "Recognition as part of the original membership generation that helped establish The Gallaspy Golf & Country Club.",
  },
  {
    number: "02",
    title: "Permanent Clubhouse Recognition",
    description:
      "The Founding 250 are intended to receive permanent recognition within the future clubhouse.",
  },
  {
    number: "03",
    title: "Founding Events",
    description:
      "Invitations to select development presentations, private gatherings, milestone celebrations, and founding member events.",
  },
  {
    number: "04",
    title: "Early Project Access",
    description:
      "Priority communication regarding development progress, membership announcements, and future club opportunities.",
  },
  {
    number: "05",
    title: "Legacy Status",
    description:
      "A distinguished membership designation recognizing early belief in the club and its long-term vision.",
  },
  {
    number: "06",
    title: "Tradition Building",
    description:
      "The opportunity to help shape the traditions, values, community, and character that define the future club.",
  },
];

const membershipReleases = [
  {
    release: "First Release",
    title: "Charter Founder",
    availability: "Memberships 1–100",
    initiation: "$7,500",
    monthly: "$595",
    description:
      "The earliest membership release for individuals and families who want to stand among the first supporters of The Gallaspy.",
    featured: true,
  },
  {
    release: "Second Release",
    title: "Founding Member",
    availability: "Memberships 101–250",
    initiation: "$10,000",
    monthly: "$650",
    description:
      "The second release completes the original Founding 250 and recognizes those who join during the club’s earliest chapter.",
    featured: false,
  },
];

const processSteps = [
  {
    number: "01",
    title: "Register Interest",
    description:
      "Join the Founding 250 interest list to receive project announcements, membership updates, and future release information.",
  },
  {
    number: "02",
    title: "Receive Updates",
    description:
      "Follow development progress, major milestones, private presentations, and formal membership announcements.",
  },
  {
    number: "03",
    title: "Formal Membership Release",
    description:
      "Qualified prospective members will receive information when official applications and membership agreements become available.",
  },
  {
    number: "04",
    title: "Membership Review",
    description:
      "Applications will be reviewed under the future membership policies, qualifications, and approval process of the club.",
  },
  {
    number: "05",
    title: "Founding Recognition",
    description:
      "Approved members within the first 250 memberships will receive their applicable founding designation.",
  },
];

const principles = [
  {
    title: "Intentionally Limited",
    description:
      "Limiting the original membership generation preserves significance, exclusivity, and a strong sense of shared identity.",
  },
  {
    title: "Built Around Community",
    description:
      "The Founding 250 will bring together individuals and families who value tradition, hospitality, golf, and meaningful relationships.",
  },
  {
    title: "Designed for Generations",
    description:
      "The founding membership is intended to represent the beginning of traditions that can be shared with children and grandchildren.",
  },
  {
    title: "Connected to the Vision",
    description:
      "Founding Members will receive a closer connection to the project as the club progresses from vision to development.",
  },
];

export default function Founding250Page() {
  return (
    <main className="bg-[#F7F4EE] text-[#1E3557]">
      {/* Hero */}
      <section className="relative flex min-h-[78vh] items-center overflow-hidden px-5 pt-[72px] sm:px-8">
        <Image
          src="/images/arrival.png"
          alt="The future arrival experience at The Gallaspy Golf and Country Club"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#10263F]/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10263F]/92 via-[#10263F]/65 to-[#10263F]/30" />

        <div className="relative z-10 mx-auto w-full max-w-[1060px] py-20 text-white sm:py-24">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#FFD76A]">
              The Original Membership Generation
            </p>

            <h1 className="mt-5 font-serif text-[3rem] font-light leading-[0.98] text-white sm:text-6xl lg:text-[5rem]">
              The Founding
              <span className="block text-[#FFD76A]">250</span>
            </h1>

            <div className="mt-6 h-px w-16 bg-[#B89146]" />

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              Become part of the first 250 memberships envisioned to establish
              the culture, traditions, and enduring character of The Gallaspy
              Golf &amp; Country Club.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#registration"
                className="inline-flex min-h-[45px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Join the Interest List
              </Link>

              <Link
                href="#founding-pricing"
                className="inline-flex min-h-[45px] items-center justify-center rounded-full border border-white/60 bg-white/[0.05] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#FFD76A] hover:text-[#FFD76A]"
              >
                View Founding Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              The Beginning of a Legacy
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Every Great Club
              <span className="block">Has a Founding Story</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />
          </div>

          <div className="border-l border-[#B89146]/35 pl-6 sm:pl-8">
            <p className="text-base leading-8 text-[#1E3557]">
              The Founding 250 will represent the first individuals and
              families invited to become part of The Gallaspy Golf &amp;
              Country Club.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              This original membership generation will help establish the
              values, relationships, customs, and traditions that shape the
              club for decades to come. Founding status is intended to remain a
              permanent part of the club’s history.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 grid w-full max-w-[1060px] gap-4 sm:grid-cols-3">
          {[
            ["250", "Founding Memberships"],
            ["2", "Founding Releases"],
            ["1", "Original Generation"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-[18px] border border-[#1E3557]/10 bg-white p-7 text-center"
            >
              <p className="font-serif text-5xl font-light text-[#10263F]">
                {value}
              </p>

              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B89146]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why only 250 */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Why Only 250?
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              A Founding Group With Meaning
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#1E3557]/80">
              The original membership generation is intentionally limited to
              preserve the significance of founding status and create a strong
              community from the beginning.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {principles.map((principle) => (
              <article
                key={principle.title}
                className="rounded-[18px] border border-[#1E3557]/10 bg-[#F7F4EE] p-6 sm:p-7"
              >
                <h3 className="font-serif text-2xl font-light text-[#10263F]">
                  {principle.title}
                </h3>

                <div className="mt-4 h-px w-10 bg-[#B89146]" />

                <p className="mt-4 text-sm leading-7 text-[#1E3557]/80">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="bg-[#10263F] px-5 py-16 text-white sm:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative min-h-[440px] overflow-hidden rounded-[22px]">
            <Image
              src="/images/clubhouse.png"
              alt="The future clubhouse at The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/50 to-transparent" />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
              Permanent Recognition
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">
              A Place in the
              <span className="block">History of the Club</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-base leading-8 text-white/85">
              The Founding 250 are intended to be permanently recognized
              within the future clubhouse as the original membership
              generation of The Gallaspy.
            </p>

            <p className="mt-5 text-sm leading-7 text-white/72">
              The final form of recognition will be determined during
              clubhouse design and may include a Founders Wall, permanent
              membership registry, commemorative installation, or another
              distinguished feature.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Founding Membership
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              The Founding Experience
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {foundingBenefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-[18px] border border-[#1E3557]/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
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

      {/* Founding pricing */}
      <section
        id="founding-pricing"
        className="scroll-mt-24 bg-[#1E3557] px-5 py-16 text-white sm:px-8 lg:py-20"
      >
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
              Preliminary Founding Structure
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">
              Two Founding Releases
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/75">
              The first 250 memberships are planned to be offered through two
              separate founding releases.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
            {membershipReleases.map((tier) => (
              <article
                key={tier.title}
                className={`relative flex h-full flex-col rounded-[20px] border p-7 sm:p-8 ${
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
                  {tier.release}
                </p>

                <h3 className="mt-5 font-serif text-3xl font-light">
                  {tier.title}
                </h3>

                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] opacity-65">
                  {tier.availability}
                </p>

                <div className="mt-6 h-px w-12 bg-[#B89146]" />

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-60">
                      Initiation
                    </p>

                    <p className="mt-2 font-serif text-3xl font-light">
                      {tier.initiation}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-60">
                      Monthly Dues
                    </p>

                    <p className="mt-2 font-serif text-3xl font-light">
                      {tier.monthly}
                    </p>
                  </div>
                </div>

                <p
                  className={`mt-6 text-sm leading-7 ${
                    tier.featured ? "text-[#1E3557]/75" : "text-white/72"
                  }`}
                >
                  {tier.description}
                </p>

                <Link
                  href="#registration"
                  className={`mt-7 inline-flex min-h-[45px] items-center justify-center rounded-full border px-6 text-[10px] font-bold uppercase tracking-[0.18em] transition hover:-translate-y-0.5 ${
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
              All pricing, dues, privileges, availability, application
              requirements, payment schedules, recognition benefits, and launch
              dates are preliminary and subject to change. Registration of
              interest is not a membership purchase, reservation, application,
              or guarantee of acceptance.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              The Membership Journey
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              From Interest
              <span className="block">to Founding Membership</span>
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {processSteps.map((step) => (
              <article
                key={step.number}
                className="grid gap-5 rounded-[18px] border border-[#1E3557]/10 bg-[#F7F4EE] p-6 md:grid-cols-[80px_1fr] sm:p-7"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#10263F] text-sm font-bold text-white">
                  {step.number}
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-light text-[#10263F]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#1E3557]/80">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-[#EEE8DC] px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#B89146]">
            Important Information
          </p>

          <p className="mt-4 text-xs leading-6 text-[#1E3557]/70">
            The Gallaspy Golf &amp; Country Club is currently in the planning
            and development stage. The Founding 250 program described on this
            page is conceptual and may be revised before any formal membership
            offering. No payment should be submitted unless accompanied by
            official membership documents issued by The Gallaspy Development
            Group.
          </p>
        </div>
      </section>

      {/* Registration Form */}
      <section
        id="registration"
        className="scroll-mt-24 bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Founding Membership Registration
            </p>

            <h2 className="mt-4 font-serif text-[2.5rem] font-light text-[#10263F] sm:text-5xl">
              Register Your Interest
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#1E3557]/70">
              Complete the form below to receive Founding 250 updates,
              membership announcements, private presentations, and future
              application opportunities.
            </p>
          </div>

          <Founding250Form />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#163A2F] px-5 py-16 text-white sm:px-8 lg:py-20">
        <div className="mx-auto max-w-[820px] text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
            The Founding Generation
          </p>

          <h2 className="mt-4 font-serif text-[2.5rem] font-light leading-[1.08] text-white sm:text-5xl">
            Help Begin a Tradition
            <span className="block">That Lasts for Generations</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/75">
            Register your interest to receive Founding 250 updates, development
            announcements, and future membership information.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="#registration"
              className="inline-flex min-h-[45px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Join the Interest List
            </Link>

            <Link
              href="/membership"
              className="inline-flex min-h-[45px] items-center justify-center rounded-full border border-white/40 px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:border-[#FFD76A] hover:text-[#FFD76A]"
            >
              View Membership
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}