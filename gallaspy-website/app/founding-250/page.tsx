import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Founding250Form from "@/components/Founding250Form";

export const metadata: Metadata = {
  title: "The Founding 250 | The Gallaspy Golf & Country Club",
  description:
    "Become part of the original membership generation of The Gallaspy Golf & Country Club in Metro Atlanta.",
};

const foundingPillars = [
  {
    number: "01",
    title: "Legacy",
    description:
      "Help establish one of Georgia’s next great private golf and lifestyle clubs.",
  },
  {
    number: "02",
    title: "Recognition",
    description:
      "Receive permanent Founding Member recognition as part of the club’s original membership generation.",
  },
  {
    number: "03",
    title: "Priority",
    description:
      "Receive project updates, invitations, and future membership opportunities before broader public release.",
  },
  {
    number: "04",
    title: "Community",
    description:
      "Join entrepreneurs, professionals, families, veterans, and community leaders who share a vision for excellence.",
  },
];

const timeline = [
  { year: "2026", title: "Vision Begins" },
  { year: "Phase I", title: "Land Acquisition" },
  { year: "Phase II", title: "Planning & Design" },
  { year: "Phase III", title: "Construction" },
  { year: "Opening", title: "Opening Day" },
  { year: "Legacy", title: "Tradition Lives On" },
];

const benefits = [
  "Founding Member recognition",
  "Permanent place in the club’s history",
  "Exclusive project updates",
  "Invitations to select private events",
  "Priority membership opportunities",
  "Founding Charter Certificate",
];

export default function Founding250Page() {
  return (
    <main className="bg-[#F7F4EE] text-[#1E3557]">
      {/* Hero */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden px-5 pt-[72px] sm:px-8">
        <Image
          src="/images/arrival.png"
          alt="The future arrival experience at The Gallaspy Golf and Country Club"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#10263F]/68" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10263F]/95 via-[#10263F]/72 to-[#10263F]/28" />

        <div className="relative z-10 mx-auto w-full max-w-[1120px] py-24 text-white">
          <div className="max-w-4xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#FFD76A]">
              The Original Membership Generation
            </p>

            <h1 className="mt-6 max-w-4xl font-serif text-[3.25rem] font-light leading-[0.98] text-white sm:text-6xl lg:text-[5.4rem]">
              Become One of the
              <span className="block text-[#FFD76A]">Founding 250</span>
            </h1>

            <div className="mt-7 h-px w-20 bg-[#B89146]" />

            <p className="mt-7 max-w-3xl text-base leading-8 text-white/88 sm:text-lg sm:leading-9">
              Before the first fairway is shaped and before the clubhouse opens
              its doors, there will be 250 individuals and families who believed
              in the vision from the very beginning. Their names will forever be
              part of The Gallaspy Golf &amp; Country Club story.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#registration"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Reserve Your Interest
              </Link>

              <Link
                href="#why-founding-250"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/55 bg-white/[0.06] px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#FFD76A] hover:text-[#FFD76A]"
              >
                Discover the Vision
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Founding 250 */}
      <section
        id="why-founding-250"
        className="scroll-mt-24 bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24"
      >
        <div className="mx-auto w-full max-w-[1120px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Why Founding 250?
            </p>

            <h2 className="mt-4 font-serif text-[2.5rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              More Than Early Membership
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#1E3557]/78 sm:text-base sm:leading-8">
              The Founding 250 is an invitation to help shape the culture,
              traditions, relationships, and legacy of the club from its first
              chapter.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {foundingPillars.map((pillar) => (
              <article
                key={pillar.title}
                className="group rounded-[20px] border border-[#1E3557]/10 bg-white p-7 transition hover:-translate-y-1 hover:border-[#B89146]/40 hover:shadow-xl"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#B89146]">
                  {pillar.number}
                </p>

                <h3 className="mt-6 font-serif text-3xl font-light text-[#10263F]">
                  {pillar.title}
                </h3>

                <div className="mt-4 h-px w-10 bg-[#B89146]" />

                <p className="mt-5 text-sm leading-7 text-[#1E3557]/76">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1120px]">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              From Vision to Opening Day
            </p>

            <h2 className="mt-4 font-serif text-[2.5rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              The Road to the Club
            </h2>
          </div>

          <div className="relative mt-14">
            <div className="absolute left-5 top-0 h-full w-px bg-[#B89146]/35 lg:left-0 lg:top-6 lg:h-px lg:w-full" />

            <div className="grid gap-8 lg:grid-cols-6 lg:gap-4">
              {timeline.map((item, index) => (
                <article
                  key={item.title}
                  className="relative pl-14 lg:pl-0 lg:pt-14 lg:text-center"
                >
                  <div className="absolute left-[13px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-4 border-white bg-[#B89146] shadow lg:left-1/2 lg:top-4 lg:-translate-x-1/2" />

                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#B89146]">
                    {item.year}
                  </p>

                  <h3 className="mt-2 font-serif text-xl font-light text-[#10263F]">
                    {item.title}
                  </h3>

                  {index < timeline.length - 1 && (
                    <span className="mt-3 hidden text-[#B89146] lg:block">→</span>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founders message */}
      <section className="bg-[#10263F] px-5 py-16 text-white sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1120px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div className="relative min-h-[460px] overflow-hidden rounded-[24px] border border-white/10">
            <Image
              src="/images/founders.png"
              alt="Cameron Gallaspy-Davis and Deja McCoy, founders of The Gallaspy Development Group"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/45 via-transparent to-transparent" />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
              A Letter From the Founders
            </p>

            <h2 className="mt-4 font-serif text-[2.5rem] font-light leading-[1.08] text-white sm:text-5xl">
              Believe in Something
              <span className="block text-[#FFD76A]">Before It Exists</span>
            </h2>

            <div className="mt-7 h-px w-16 bg-[#B89146]" />

            <blockquote className="mt-7 text-base leading-8 text-white/84 sm:text-lg sm:leading-9">
              “The Gallaspy Golf &amp; Country Club represents more than a golf
              course. It is our commitment to building a place where families
              gather, friendships grow, and future generations create lasting
              memories. Becoming one of our Founding 250 means believing in
              something before it exists—and helping shape a legacy that will
              endure for decades.”
            </blockquote>

            <p className="mt-8 text-sm font-bold uppercase tracking-[0.16em] text-[#FFD76A]">
              Cameron Gallaspy-Davis &amp; Deja McCoy
            </p>

            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/55">
              Founders, The Gallaspy Development Group
            </p>
          </div>
        </div>
      </section>

      {/* Benefits and counter */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1120px] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Founding Member Benefits
            </p>

            <h2 className="mt-4 font-serif text-[2.5rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              A Permanent Place
              <span className="block">in the Story</span>
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex min-h-[96px] items-center gap-4 rounded-[18px] border border-[#1E3557]/10 bg-white p-5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#10263F] text-sm text-[#FFD76A]">
                    ✓
                  </span>

                  <p className="text-sm font-medium leading-6 text-[#10263F]">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[24px] bg-[#1E3557] p-8 text-white sm:p-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#FFD76A]">
              Founding Memberships
            </p>

            <p className="mt-7 font-serif text-7xl font-light text-white">250</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-white/55">
              Total Available
            </p>

            <div className="my-8 h-px bg-white/15" />

            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="font-serif text-4xl font-light text-white">0</p>
                <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/55">
                  Reserved
                </p>
              </div>

              <div>
                <p className="font-serif text-4xl font-light text-[#FFD76A]">
                  250
                </p>
                <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/55">
                  Remaining
                </p>
              </div>
            </div>

            <p className="mt-8 text-xs leading-6 text-white/60">
              This counter is currently illustrative and can be connected to
              your membership database when formal reservations begin.
            </p>

            <Link
              href="#registration"
              className="mt-8 inline-flex min-h-[46px] w-full items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Join the Founding 250
            </Link>
          </aside>
        </div>
      </section>

      {/* Certificate preview */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1120px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              A Tangible Piece of History
            </p>

            <h2 className="mt-4 font-serif text-[2.5rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Founding Charter
              <span className="block">Certificate</span>
            </h2>

            <p className="mt-6 text-sm leading-7 text-[#1E3557]/78 sm:text-base sm:leading-8">
              Each approved Founding 250 member is intended to receive a
              numbered charter certificate recognizing their place in the
              original membership generation.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/65">
              Final certificate design, numbering, and eligibility will be
              confirmed when formal membership documents are issued.
            </p>
          </div>

          <div className="rounded-[24px] bg-[#10263F] p-4 shadow-2xl sm:p-7">
            <div className="border border-[#B89146] bg-[#F7F4EE] px-6 py-12 text-center sm:px-12">
              <p className="text-[9px] font-bold uppercase tracking-[0.38em] text-[#B89146]">
                The Gallaspy Golf &amp; Country Club
              </p>

              <div className="mx-auto mt-7 h-px w-24 bg-[#B89146]" />

              <p className="mt-8 font-serif text-4xl font-light text-[#10263F] sm:text-5xl">
                Founding 250
              </p>

              <p className="mt-3 text-xs font-bold uppercase tracking-[0.25em] text-[#1E3557]/65">
                Charter Member
              </p>

              <p className="mx-auto mt-8 max-w-md text-sm leading-7 text-[#1E3557]/72">
                Presented in recognition of early belief, lasting commitment,
                and membership in the original generation of The Gallaspy.
              </p>

              <p className="mt-10 font-serif text-2xl text-[#B89146]">
                Member No. 001 of 250
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration form */}
      <section
        id="registration"
        className="scroll-mt-24 bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Founding Membership Registration
            </p>

            <h2 className="mt-4 font-serif text-[2.6rem] font-light text-[#10263F] sm:text-5xl">
              Reserve Your Interest
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#1E3557]/70">
              Complete the form below to receive Founding 250 updates,
              development announcements, private presentation invitations, and
              future membership information.
            </p>
          </div>

          <Founding250Form />
        </div>
      </section>

      {/* Important information */}
      <section className="bg-[#EEE8DC] px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#B89146]">
            Important Information
          </p>

          <p className="mt-4 text-xs leading-6 text-[#1E3557]/70">
            The Gallaspy Golf &amp; Country Club is currently in the planning
            and development stage. The Founding 250 program is preliminary and
            may be revised before any formal membership offering. Registration
            of interest is not a membership purchase, reservation, application,
            or guarantee of acceptance. No payment should be submitted unless
            accompanied by official membership documents issued by The Gallaspy
            Development Group.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-[#163A2F] px-5 py-20 text-white sm:px-8 lg:py-28">
        <Image
          src="/images/clubhouse.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-[#163A2F]/88" />

        <div className="relative z-10 mx-auto max-w-[900px] text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
            A Legacy in the Making
          </p>

          <h2 className="mt-5 font-serif text-[2.8rem] font-light leading-[1.05] text-white sm:text-6xl">
            Help Build
            <span className="block text-[#FFD76A]">the Legacy</span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
            Become part of the first generation and help shape a club designed
            to serve families, leaders, and communities for decades to come.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="#registration"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Join the Founding 250
            </Link>

            <Link
              href="/membership"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/45 px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:border-[#FFD76A] hover:text-[#FFD76A]"
            >
              View All Memberships
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}