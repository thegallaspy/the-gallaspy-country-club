import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FalconSocietyForm from "@/components/FalconSocietyForm";

export const metadata: Metadata = {
  title: "Falcon Society | The Gallaspy Golf & Country Club",
  description:
    "Express interest in the future Falcon Society, envisioned to recognize the first 100 founding members of The Gallaspy Golf & Country Club.",
};

const foundingPillars = [
  {
    number: "01",
    title: "Legacy",
    description:
      "Follow the earliest chapter of The Gallaspy and the long-term effort to build a private golf and lifestyle club designed for generations.",
  },
  {
    number: "02",
    title: "Recognition",
    description:
      "The future Falcon Society is envisioned to recognize the first 100 founding members when formal club membership is ultimately established.",
  },
  {
    number: "03",
    title: "Priority",
    description:
      "Receive meaningful project updates, invitations, and future membership information as the club vision advances.",
  },
  {
    number: "04",
    title: "Community",
    description:
      "Connect with individuals, families, professionals, and community leaders who believe in the long-term vision for The Gallaspy.",
  },
];

const timeline = [
  { year: "2026", title: "Vision Begins" },
  { year: "Current", title: "Brand & Community" },
  { year: "Next", title: "Property & Partnerships" },
  { year: "Future", title: "Planning & Development" },
  { year: "Launch", title: "Formal Membership" },
  { year: "Legacy", title: "Tradition Lives On" },
];

const futureRecognition = [
  "Recognition within the future founding generation",
  "Early access to selected project updates",
  "Invitations to selected Gallaspy experiences",
  "Future Falcon Society membership information",
  "Connection to the earliest chapter of the club",
  "Potential founding recognition subject to future membership documents",
];

export default function FalconSocietyPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#1E3557]">
      {/* HERO */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden px-5 pt-[82px] sm:px-8">
        <Image
          src="/images/arrival.png"
          alt="Conceptual future arrival experience at The Gallaspy Golf and Country Club"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#10263F]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10263F]/96 via-[#10263F]/74 to-[#10263F]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/60 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1120px] py-24 text-white">
          <div className="max-w-4xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#FFD76A]">
              The Future Founding Generation
            </p>

            <h1 className="mt-6 max-w-4xl font-serif text-[3.1rem] font-light leading-[0.98] text-white sm:text-6xl lg:text-[5.2rem]">
              The First 100
              <span className="block text-[#FFD76A]">
                Will Define the Beginning
              </span>
            </h1>

            <div className="mt-7 h-px w-20 bg-[#B89146]" />

            <p className="mt-7 max-w-3xl text-base leading-8 text-white/88 sm:text-lg sm:leading-9">
              The Falcon Society is envisioned as the future founding
              generation of The Gallaspy Golf &amp; Country Club — the first
              100 members who will one day help establish the traditions,
              relationships, and culture of the club when formal membership
              begins.
            </p>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/65">
              Formal Falcon Society memberships are not currently being
              offered. Today, individuals and families may express interest and
              follow the journey as The Gallaspy continues to develop.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#registration"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Express Falcon Society Interest
              </Link>

              <Link
                href="#why-falcon-society"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/55 bg-white/[0.06] px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#FFD76A] hover:text-[#FFD76A]"
              >
                Discover the Vision
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY FALCON SOCIETY */}
      <section
        id="why-falcon-society"
        className="scroll-mt-24 bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24"
      >
        <div className="mx-auto w-full max-w-[1120px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Why Falcon Society?
            </p>

            <h2 className="mt-4 font-serif text-[2.5rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Belief Before Membership
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#1E3557]/78 sm:text-base sm:leading-8">
              The Falcon Society is not a membership product being sold today.
              It is the future founding-member vision for the people who will
              eventually become part of The Gallaspy&apos;s earliest formal
              membership generation.
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

      {/* TIMELINE */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1120px]">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              From Vision to Membership
            </p>

            <h2 className="mt-4 font-serif text-[2.5rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              The Road to the Club
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#1E3557]/70">
              The sequence below represents the intended development journey,
              not a guaranteed construction or opening schedule.
            </p>
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
                    <span className="mt-3 hidden text-[#B89146] lg:block">
                      →
                    </span>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDERS MESSAGE */}
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
              A Message From the Founders
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
              memories. The Falcon Society represents the people who believe
              in that vision early and want to follow the journey as it takes
              shape.”
            </blockquote>

            <p className="mt-8 text-sm font-bold uppercase tracking-[0.16em] text-[#FFD76A]">
              Cameron Gallaspy-Davis &amp; Deja McCoy
            </p>

            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/55">
              Founders, The Gallaspy Development Group, LLC
            </p>
          </div>
        </div>
      </section>

      {/* FUTURE RECOGNITION */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1120px] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Future Founding Recognition
            </p>

            <h2 className="mt-4 font-serif text-[2.5rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              A Place in the
              <span className="block">Opening Chapter</span>
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#1E3557]/72">
              The following ideas describe the current vision for future
              founding-member recognition. They are not guaranteed benefits and
              remain subject to formal membership documents and future club
              decisions.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {futureRecognition.map((item) => (
                <div
                  key={item}
                  className="flex min-h-[96px] items-center gap-4 rounded-[18px] border border-[#1E3557]/10 bg-white p-5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#10263F] text-sm text-[#FFD76A]">
                    ✓
                  </span>

                  <p className="text-sm font-medium leading-6 text-[#10263F]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[24px] bg-[#1E3557] p-8 text-white sm:p-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#FFD76A]">
              Future Falcon Society
            </p>

            <p className="mt-7 font-serif text-7xl font-light text-white">
              100
            </p>

            <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-white/55">
              Envisioned Founding Members
            </p>

            <div className="my-8 h-px bg-white/15" />

            <p className="text-sm leading-7 text-white/68">
              The current vision is for the Falcon Society to recognize the
              first 100 formal members of The Gallaspy when membership is
              ultimately launched.
            </p>

            <p className="mt-5 text-xs leading-6 text-white/48">
              No Falcon Society positions are currently being sold, reserved,
              assigned, or guaranteed through this website.
            </p>

            <Link
              href="#registration"
              className="mt-8 inline-flex min-h-[46px] w-full items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Express Your Interest
            </Link>
          </aside>
        </div>
      </section>

      {/* CONCEPTUAL CERTIFICATE */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1120px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#8B6A34]">
              Conceptual Founding Recognition
            </p>

            <h2 className="mt-4 font-serif text-[2.5rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Founding Charter
              <span className="block">Concept</span>
            </h2>

            <p className="mt-6 text-sm leading-7 text-[#1E3557] sm:text-base sm:leading-8">
              One idea under consideration is a numbered founding charter
              certificate recognizing the eventual Falcon Society generation.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#52605A]">
              The design, numbering, eligibility, wording, and availability of
              any future certificate will be determined only when formal
              membership documents are established.
            </p>
          </div>

          {/* IMPROVED CERTIFICATE */}
          <div className="rounded-[24px] bg-[#10263F] p-4 shadow-2xl sm:p-7">
            <div className="border border-[#B89146] bg-[#F7F4EE] px-6 py-12 text-center sm:px-12 sm:py-14">
              <p className="text-[9px] font-bold uppercase tracking-[0.38em] text-[#8B6A34] sm:text-[10px]">
                Concept Preview
              </p>

              <div className="mx-auto mt-7 h-px w-24 bg-[#B89146]" />

              <p className="mt-8 font-serif text-4xl font-light leading-tight text-[#10263F] sm:text-5xl">
                Falcon Society
              </p>

              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[#10263F] sm:text-xs">
                Future Founding Recognition
              </p>

              <p className="mx-auto mt-8 max-w-md text-sm font-medium leading-7 text-[#1E3557] sm:text-base sm:leading-8">
                A conceptual example of how future founding-member recognition
                could be presented when formal membership begins.
              </p>

              <div className="mx-auto mt-9 h-px w-12 bg-[#B89146]/60" />

              <p className="mt-8 font-serif text-2xl font-medium text-[#8B6A34] sm:text-3xl">
                Member No. ___ of 100
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTEREST FORM */}
      <section
        id="registration"
        className="scroll-mt-24 bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Falcon Society Interest
            </p>

            <h2 className="mt-4 font-serif text-[2.6rem] font-light text-[#10263F] sm:text-5xl">
              Follow the Founding Journey
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#1E3557]/70">
              Complete the form below to receive Falcon Society updates,
              development announcements, selected invitations, and future
              membership information as The Gallaspy progresses.
            </p>

            <div className="mx-auto mt-7 max-w-3xl rounded-[16px] border border-[#B89146]/25 bg-white px-6 py-5">
              <p className="text-xs leading-6 text-[#1E3557]/70">
                Expressing interest does not reserve one of the future 100
                positions and does not constitute a membership application,
                offer, acceptance, deposit, or financial commitment.
              </p>
            </div>
          </div>

          <FalconSocietyForm />
        </div>
      </section>

      {/* IMPORTANT INFORMATION */}
      <section className="bg-[#EEE8DC] px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#B89146]">
            Important Information
          </p>

          <p className="mt-4 text-xs leading-6 text-[#1E3557]/70">
            The Gallaspy Golf &amp; Country Club is currently in the planning
            and development stage. The Falcon Society is a future
            founding-member concept and may be revised before any formal
            membership offering. Submitting an expression of interest is not a
            membership purchase, reservation, application, guarantee of
            acceptance, or reservation of one of the future 100 positions. No
            membership payment should be submitted unless accompanied by
            formal membership documents issued by The Gallaspy Development
            Group, LLC.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
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
            Follow the Beginning
            <span className="block text-[#FFD76A]">of the Legacy</span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
            The Falcon Society represents the future founding generation of The
            Gallaspy. Today, you can express your interest and stay connected as
            the club vision continues to develop.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="#registration"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Express Your Interest
            </Link>

            <Link
              href="/membership"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/45 px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:border-[#FFD76A] hover:text-[#FFD76A]"
            >
              Membership Interest
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}