import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import MembershipInterestForm from "@/components/forms/MembershipInterestForm";

export const metadata: Metadata = {
  title: "Membership Interest | The Gallaspy Golf & Country Club",
  description:
    "Register your interest in the future membership community of The Gallaspy Golf & Country Club and follow the development journey.",
};

const interestBenefits = [
  {
    number: "01",
    title: "Development Updates",
    description:
      "Receive meaningful updates as The Gallaspy advances its property search, development planning, partnerships, and future club vision.",
  },
  {
    number: "02",
    title: "Membership Announcements",
    description:
      "Be among the first to receive information when formal membership categories, applications, availability, and future club details are established.",
  },
  {
    number: "03",
    title: "Community Invitations",
    description:
      "Receive opportunities to engage with The Gallaspy through future gatherings, golf experiences, announcements, and selected brand events.",
  },
  {
    number: "04",
    title: "The Journey From the Beginning",
    description:
      "Follow the creation of The Gallaspy from its earliest chapter and stay connected as the vision develops into something tangible.",
  },
];

const visionPoints = [
  "Championship golf",
  "Private-club hospitality",
  "Dining and gathering",
  "Wellness and recreation",
  "Family traditions",
  "A deliberately limited membership community",
];

export default function MembershipPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#1E3557]">
      {/* HERO */}
      <section className="relative flex min-h-[72vh] items-center overflow-hidden px-5 pt-[82px] sm:px-8">
        <Image
          src="/images/clubhouse.png"
          alt="Conceptual vision for the future Gallaspy Golf and Country Club"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#10263F]/66" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10263F]/95 via-[#10263F]/68 to-[#10263F]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/60 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1120px] py-20 text-white sm:py-24 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#FFD76A]">
              Future Membership
            </p>

            <h1 className="mt-5 max-w-3xl font-serif text-[2.8rem] font-light leading-[1.02] text-white sm:text-6xl lg:text-[4.7rem]">
              Membership Begins
              <span className="block italic text-[#FFD76A]">
                With Interest
              </span>
            </h1>

            <div className="mt-7 h-px w-16 bg-[#B89146]" />

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              The Gallaspy Golf &amp; Country Club remains in the development
              stage. Formal memberships are not currently being offered.
              Individuals and families who believe in the vision may join our
              Membership Interest List and follow the journey from the
              beginning.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#membership-interest"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Register Your Interest
              </Link>

              <Link
                href="/why-the-gallaspy"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/55 bg-white/[0.05] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#FFD76A] hover:text-[#FFD76A]"
              >
                Discover Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CURRENT STATUS */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1120px] gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-20">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Where We Are Today
            </p>

            <h2 className="mt-4 max-w-lg font-serif text-[2.45rem] font-light leading-[1.05] text-[#10263F] sm:text-5xl">
              Building the Foundation Before Opening the Doors
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />
          </div>

          <div className="lg:border-l lg:border-[#B89146]/30 lg:pl-10">
            <p className="text-base leading-8 text-[#1E3557]">
              The Gallaspy is being developed deliberately. Before formal
              memberships are introduced, the focus is on identifying the
              right Georgia property, building the Invitational, establishing
              strategic partnerships, growing the brand, and creating the
              foundation for the future club.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/72">
              We believe membership details should reflect the actual club,
              property, facilities, operating model, and member experience.
              Because those elements are still being developed, initiation
              fees, dues, categories, and formal membership applications will
              be announced at a later stage.
            </p>

            <div className="mt-7 rounded-[16px] border border-[#B89146]/25 bg-[#F7F4EE] px-5 py-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#B89146]">
                No Membership Payment Required
              </p>

              <p className="mt-3 text-sm leading-6 text-[#1E3557]/75">
                Joining the Membership Interest List is simply a way to stay
                connected. No initiation fee, dues, deposit, or other
                membership payment is being requested.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-[1120px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Stay Connected
            </p>

            <h2 className="mt-4 font-serif text-[2.4rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Why Join the Membership Interest List?
            </h2>

            <div className="mx-auto mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#1E3557]/72 sm:text-base sm:leading-8">
              The interest list creates a direct connection between the people
              following The Gallaspy today and the private-club community we
              hope to build in the future.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {interestBenefits.map((benefit) => (
              <article
                key={benefit.number}
                className="group rounded-[20px] border border-[#1E3557]/10 bg-white px-6 py-7 transition duration-300 hover:-translate-y-1 hover:border-[#B89146]/40 hover:shadow-[0_18px_45px_rgba(16,38,63,0.08)]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#B89146]">
                    {benefit.number}
                  </p>

                  <span className="h-px w-8 bg-[#B89146]/50 transition-all duration-300 group-hover:w-12" />
                </div>

                <h3 className="mt-6 font-serif text-[1.7rem] font-light leading-tight text-[#10263F]">
                  {benefit.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#1E3557]/72">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FUTURE CLUB VISION */}
      <section className="bg-[#10263F] px-5 py-16 text-white sm:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1120px] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
              The Future Club
            </p>

            <h2 className="mt-4 max-w-2xl font-serif text-[2.4rem] font-light leading-[1.06] text-white sm:text-5xl">
              A Membership Community Built Around More Than Golf
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
              Championship golf will anchor The Gallaspy, but the long-term
              vision extends beyond the course. The future club is intended to
              create a place where relationships, hospitality, recreation,
              family traditions, and shared experiences become part of
              everyday club life.
            </p>
          </div>

          <div className="rounded-[22px] border border-white/12 bg-white/[0.045] p-6 sm:p-8">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FFD76A]">
              Envisioned Experience
            </p>

            <div className="mt-6 space-y-4">
              {visionPoints.map((point, index) => (
                <div
                  key={point}
                  className="flex items-center gap-4 border-b border-white/10 pb-4"
                >
                  <span className="font-serif text-lg text-[#FFD76A]">
                    0{index + 1}
                  </span>

                  <p className="text-sm uppercase tracking-[0.13em] text-white/82">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP PATHS */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-[1120px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Explore Further
            </p>

            <h2 className="mt-4 font-serif text-[2.4rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Different Ways to Follow the Journey
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {/* FALCON SOCIETY */}
            <article className="relative overflow-hidden rounded-[22px] bg-[#163A2F] p-7 text-white shadow-[0_18px_50px_rgba(16,38,63,0.12)] sm:p-9">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full border border-[#FFD76A]/10" />

              <div className="relative z-10">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FFD76A]">
                  Falcon Society
                </p>

                <h3 className="mt-4 font-serif text-3xl font-light leading-tight text-white sm:text-4xl">
                  Follow the Founding Chapter
                </h3>

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/68">
                  Learn about the Falcon Society and the community forming
                  around The Gallaspy during its earliest stages.
                </p>

                <Link
                  href="/falcon-society"
                  className="group mt-7 inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#FFD76A] px-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#FFD76A] hover:text-[#10263F]"
                >
                  Explore Falcon Society
                  <span className="ml-3 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </article>

            {/* DEVELOPMENT */}
            <article className="relative overflow-hidden rounded-[22px] bg-[#10263F] p-7 text-white shadow-[0_18px_50px_rgba(16,38,63,0.12)] sm:p-9">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full border border-[#FFD76A]/10" />

              <div className="relative z-10">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FFD76A]">
                  Development &amp; Partnership
                </p>

                <h3 className="mt-4 font-serif text-3xl font-light leading-tight text-white sm:text-4xl">
                  Help Bring the Vision to Life
                </h3>

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/68">
                  Landowners, operators, brands, developers, and other aligned
                  organizations can explore the long-term development and
                  partnership vision for The Gallaspy.
                </p>

                <Link
                  href="/invest"
                  className="group mt-7 inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#FFD76A] px-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#FFD76A] hover:text-[#10263F]"
                >
                  Development &amp; Partnership
                  <span className="ml-3 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP FORM */}
      <section
        id="membership-interest"
        className="scroll-mt-24 bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24"
      >
        <div className="mx-auto grid w-full max-w-[1120px] gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Membership Interest
            </p>

            <h2 className="mt-4 font-serif text-[2.45rem] font-light leading-[1.06] text-[#10263F] sm:text-5xl">
              Follow The Gallaspy From the Beginning
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-sm leading-7 text-[#1E3557]/78 sm:text-base sm:leading-8">
              Share your information to receive future development updates,
              membership announcements, club news, and opportunities to engage
              with The Gallaspy as the vision progresses.
            </p>

            <div className="mt-8 rounded-[18px] border border-[#B89146]/25 bg-white p-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.26em] text-[#B89146]">
                Important
              </p>

              <p className="mt-3 text-sm leading-6 text-[#1E3557]/72">
                This is an expression of interest only. Submission does not
                constitute a membership application, offer, reservation,
                acceptance, deposit, or financial commitment.
              </p>
            </div>

            <div className="mt-5 rounded-[18px] bg-[#EEE8DC] p-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.26em] text-[#B89146]">
                Private &amp; Confidential
              </p>

              <p className="mt-3 text-sm leading-6 text-[#1E3557]/72">
                Information submitted through this form will be used for
                Gallaspy-related membership and development communication.
              </p>
            </div>
          </div>

          <MembershipInterestForm />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-[#163A2F] px-5 py-14 text-white sm:px-8 lg:py-16">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center justify-between gap-7 text-center lg:flex-row lg:text-left">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#FFD76A]">
              The Gallaspy Golf &amp; Country Club
            </p>

            <h2 className="mt-3 max-w-2xl font-serif text-3xl font-light text-white sm:text-4xl">
              The Community Begins Before the Clubhouse Does.
            </h2>
          </div>

          <Link
            href="/why-the-gallaspy"
            className="inline-flex min-h-[46px] shrink-0 items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
          >
            Read Our Story
          </Link>
        </div>
      </section>
    </main>
  );
}