import Image from "next/image";
import Link from "next/link";
import InvitationalNav from "@/components/invitational/InvitationalNav";

export const metadata = {
  title: "THE GALLASPY 2027 | Golf. Culture. Competition.",
  description:
    "THE GALLASPY arrives June 21, 2027 in Greater Atlanta, Georgia. Discover the championship, event experience, Junior Falcon Experience, and partnership opportunities.",
};

const pathways = [
  {
    number: "01",
    eyebrow: "For Golfers",
    title: "COMPETE",
    description:
      "Explore THE GALLASPY CHAMPIONSHIP, player registration, competition details, and the road to The Golden Falcon.",
    href: "/invitational/register",
    action: "Explore Registration",
  },
  {
    number: "02",
    eyebrow: "For Guests",
    title: "ATTEND",
    description:
      "Discover the wider event experience and follow announcements about spectator access, hospitality, and programming.",
    href: "#attend",
    action: "Explore The Experience",
  },
  {
    number: "03",
    eyebrow: "For Businesses",
    title: "SPONSOR",
    description:
      "Connect your organization with championship golf, culture, community, and the inaugural event.",
    href: "/invitational/sponsors",
    action: "Partner With Us",
  },
  {
    number: "04",
    eyebrow: "For Entrepreneurs",
    title: "BECOME A VENDOR",
    description:
      "Express interest in proposed marketplace opportunities for businesses, makers, and service providers.",
    href: "/invitational/sponsors#sponsor-application",
    action: "Vendor Opportunities",
  },
];

const experiences = [
  {
    number: "01",
    title: "CHAMPIONSHIP GOLF",
    description:
      "A competitive environment for golfers ready to test their game and take part in a new championship tradition.",
  },
  {
    number: "02",
    title: "CULTURE & CONNECTION",
    description:
      "An event designed to bring together golfers, friends, families, and the broader Greater Atlanta community.",
  },
  {
    number: "03",
    title: "THE EVENT MARKETPLACE",
    description:
      "Planned opportunities to discover approved vendors, products, businesses, and community partners.",
  },
  {
    number: "04",
    title: "YOUTH DISCOVERY",
    description:
      "The Junior Falcon Experience will introduce age-appropriate golf and enrichment opportunities for children and teenagers.",
  },
];

const eventResources = [
  {
    title: "CHAMPIONSHIP REGISTRATION",
    description:
      "Review the existing competitor registration pathway and its published terms.",
    href: "/invitational/register",
    action: "Registration",
  },
  {
    title: "CHAMPIONSHIP PRIZES",
    description:
      "Discover The Golden Falcon and available competition information.",
    href: "/invitational/prizes",
    action: "Explore Prizes",
  },
  {
    title: "EVENT SCHEDULE",
    description:
      "View the currently published event-day framework. Details may be updated as arrangements are confirmed.",
    href: "/invitational/schedule",
    action: "View Schedule",
  },
  {
    title: "QUESTIONS & DETAILS",
    description:
      "Find additional event, competition, attendance, and registration information.",
    href: "/invitational/faq",
    action: "Read FAQ",
  },
];

export default function TheGallaspyEventPage() {
  return (
    <main className="min-h-screen bg-white text-[#10263F]">
      <InvitationalNav />

      {/* THE GALLASPY — EVENT HERO */}
      <section className="relative overflow-hidden bg-[#10263F] px-5 pb-20 pt-28 text-white sm:px-8 sm:pb-24 sm:pt-36 lg:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#164B3A]/60 to-transparent"
        />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#B32635]" />
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#D9C080]">
                EST. 2027
              </p>
            </div>

            <h1 className="mt-8 max-w-4xl text-[clamp(3.6rem,9vw,8rem)] font-black uppercase leading-[0.85] tracking-[-0.065em]">
              THE
              <span className="mt-2 block">GALLASPY.</span>
            </h1>

            <p className="mt-8 text-sm font-bold uppercase tracking-[0.23em] text-[#D9C080] sm:text-base">
              GOLF. CULTURE. COMPETITION.
            </p>

            <div className="mt-8 h-1 w-16 bg-[#B32635]" />

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              A new annual golf tradition bringing championship
              competition, community, and culture together
              in Greater Atlanta.
            </p>

            <p className="mt-7 text-sm font-bold uppercase tracking-[0.12em] text-white">
              JUNE 21, 2027
              <span className="mx-3 text-[#D9C080]">|</span>
              GREATER ATLANTA, GEORGIA
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/invitational/register"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#D9C080] px-6 py-3 text-xs font-black uppercase tracking-wider text-[#10263F] transition hover:bg-white"
              >
                COMPETE
              </Link>

              <a
                href="#attend"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/40 px-6 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:border-white"
              >
                EXPLORE THE EVENT
              </a>

              <Link
                href="/invitational/sponsors"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/40 px-6 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:border-white"
              >
                BECOME A SPONSOR
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative aspect-square w-full max-w-[360px] rounded-full border border-white/15 bg-white/[0.04] p-8">
              <Image
                src="/logos/official/falcon-G.png"
                alt="Official Gallaspy Falcon G brandmark"
                fill
                priority
                sizes="(min-width: 1024px) 360px, 75vw"
                className="object-contain p-9"
              />
            </div>
          </div>
        </div>
      </section>

      {/* EVENT IDENTITY */}
      <section className="bg-[#B32635] px-5 py-6 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.15em]">
            THE GALLASPY CHAMPIONSHIP
          </p>
          <p className="text-xs font-bold uppercase tracking-[0.15em]">
            THE GOLDEN FALCON
          </p>
          <p className="text-xs font-bold uppercase tracking-[0.15em]">
            GREATER ATLANTA · 2027
          </p>
        </div>
      </section>

      {/* EVENT INTRODUCTION */}
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#164B3A]">
              A New Tradition
            </p>
            <div className="mt-5 h-1 w-12 bg-[#B32635]" />
          </div>

          <div>
            <h2 className="max-w-4xl text-4xl font-black uppercase leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
              MORE THAN A ROUND.
              <span className="mt-2 block text-[#164B3A]">
                A REASON TO COME TOGETHER.
              </span>
            </h2>

            <p className="mt-8 max-w-3xl text-base leading-8 text-[#526174]">
              THE GALLASPY is being built as an annual event
              where competitive golf meets community, emerging
              traditions, and the people who make the game
              meaningful. Whether you compete or simply want
              to experience the atmosphere, there's a place
              for you in what we're building.
            </p>
          </div>
        </div>
      </section>

      {/* FOUR WAYS TO PARTICIPATE */}
      <section className="bg-[#F3F7F6] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#164B3A]">
            Get Involved
          </p>

          <h2 className="mt-4 text-3xl font-black uppercase tracking-tight sm:text-5xl">
            FIND YOUR PLACE.
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {pathways.map((item) => (
              <Link
                key={item.number}
                href={item.href}
                className="group flex flex-col rounded-2xl border border-[#D6E2DC] bg-white p-7 transition hover:border-[#164B3A] hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#164B3A]">
                    {item.eyebrow}
                  </p>
                  <p className="text-sm font-black text-[#B32635]">
                    {item.number}
                  </p>
                </div>

                <h3 className="mt-7 text-3xl font-black uppercase tracking-tight sm:text-4xl">
                  {item.title}
                </h3>

                <p className="mt-4 max-w-xl flex-1 text-sm leading-7 text-[#526174]">
                  {item.description}
                </p>

                <span className="mt-8 text-xs font-bold uppercase tracking-widest text-[#164B3A] group-hover:underline">
                  {item.action} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CHAMPIONSHIP */}
      <section
        id="championship"
        className="bg-[#123C30] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D9C080]">
              The Competition
            </p>

            <h2 className="mt-6 text-4xl font-black uppercase leading-[1.03] tracking-tight sm:text-6xl">
              THE GALLASPY
              <span className="mt-2 block">CHAMPIONSHIP.</span>
            </h2>

            <p className="mt-7 max-w-xl text-base leading-8 text-white/80">
              The championship is the competitive centerpiece
              of THE GALLASPY. We're creating an environment
              where golfers can challenge themselves, earn
              recognition, and help establish a lasting tradition.
            </p>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/65">
              Competition details, entry requirements,
              participant limits, and prize eligibility are
              governed by the published championship rules.
            </p>

            <Link
              href="/invitational/register"
              className="mt-9 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#D9C080] px-7 text-xs font-black uppercase tracking-wider text-[#10263F] hover:bg-white"
            >
              EXPLORE PLAYER REGISTRATION
            </Link>
          </div>

          <div className="rounded-2xl border border-white/20 bg-[#0E3027] p-8 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D9C080]">
              The Championship Trophy
            </p>

            <h3 className="mt-6 text-4xl font-black uppercase leading-tight sm:text-5xl">
              THE
              <span className="block text-[#D9C080]">
                GOLDEN FALCON.
              </span>
            </h3>

            <div className="my-7 h-px bg-white/20" />

            <p className="text-base leading-8 text-white/80">
              A symbol of achievement, precision, and legacy.
              The Golden Falcon represents the championship
              tradition we're establishing at THE GALLASPY.
            </p>

            <Link
              href="/invitational/prizes"
              className="mt-8 inline-flex text-xs font-bold uppercase tracking-wider text-[#D9C080] underline underline-offset-4"
            >
              DISCOVER THE GOLDEN FALCON
            </Link>
          </div>
        </div>
      </section>

      {/* THE BROADER EXPERIENCE */}
      <section id="attend" className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#164B3A]">
            Beyond The Championship
          </p>

          <h2 className="mt-4 max-w-4xl text-4xl font-black uppercase tracking-tight sm:text-5xl">
            THE EXPERIENCE IS FOR
            <span className="block text-[#164B3A]">
              MORE THAN GOLFERS.
            </span>
          </h2>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#526174]">
            Alongside championship golf, we're developing
            an event experience with opportunities for
            connection, discovery, and participation.
            Specific attractions will be announced when approved.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {experiences.map((item) => (
              <article
                key={item.number}
                className="rounded-2xl border border-[#DBE5E8] p-6"
              >
                <p className="text-sm font-black text-[#B32635]">
                  {item.number}
                </p>

                <h3 className="mt-6 text-xl font-black uppercase">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#526174]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-8 text-xs leading-6 text-[#526174]">
            Spectator access, event programming, pricing, and
            capacity details will be published when confirmed.
          </p>
        </div>
      </section>

      {/* JUNIOR FALCON */}
      <section
        id="junior-falcon"
        className="border-y border-[#D8E5E0] bg-[#F3F7F6] px-5 py-20 sm:px-8 lg:px-12"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B32635]">
              For The Next Generation
            </p>

            <h2 className="mt-5 text-4xl font-black uppercase leading-[1.05] tracking-tight sm:text-5xl">
              THE JUNIOR
              <span className="mt-2 block text-[#164B3A]">
                FALCON EXPERIENCE.
              </span>
            </h2>
          </div>

          <div>
            <p className="text-base leading-8 text-[#44586A]">
              The Junior Falcon Experience brings youth
              programming together under one identity,
              welcoming children and teenagers through
              age-appropriate activities.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#526174]">
              Proposed programming includes golf discovery,
              interactive challenges, social activities,
              and youth-development opportunities. Details,
              guardian requirements, and registration
              arrangements will be shared after approval.
            </p>

            <Link
              href="/invitational/sponsors"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#164B3A] px-6 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#10263F]"
            >
              SUPPORT YOUTH PROGRAMMING
            </Link>
          </div>
        </div>
      </section>

      {/* SPONSOR / MARKETPLACE */}
      <section className="bg-[#10263F] px-5 py-20 text-white sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D9C080]">
              Partnerships & Opportunities
            </p>

            <h2 className="mt-5 text-4xl font-black uppercase leading-tight sm:text-5xl">
              BUILD A TRADITION.
              <span className="block text-[#D9C080]">
                BE PART OF IT.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/75">
              THE GALLASPY welcomes conversations with
              businesses, brands, and organizations interested
              in championship sponsorships, event partnerships,
              youth programming, and marketplace participation.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              href="/invitational/sponsors"
              className="flex min-h-16 items-center justify-between rounded-xl bg-white px-6 font-bold uppercase tracking-wider text-[#10263F] hover:bg-[#D9C080]"
            >
              BECOME A SPONSOR
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              href="/invitational/sponsors#sponsor-application"
              className="flex min-h-16 items-center justify-between rounded-xl border border-white/40 px-6 font-bold uppercase tracking-wider text-white hover:border-white"
            >
              VENDOR OPPORTUNITIES
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* EVENT INFORMATION */}
      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#164B3A]">
            Event Information
          </p>

          <h2 className="mt-4 text-3xl font-black uppercase sm:text-5xl">
            PLAN YOUR GALLASPY.
          </h2>

          <div className="mt-10 divide-y divide-[#DCE5E8] border-y border-[#DCE5E8]">
            {eventResources.map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                className="group grid gap-4 py-7 transition hover:bg-[#F3F7F6] sm:grid-cols-[50px_1fr_1.4fr_auto] sm:items-center sm:px-4"
              >
                <span className="text-sm font-bold text-[#B32635]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="text-lg font-black uppercase">
                  {item.title}
                </h3>

                <p className="text-sm leading-6 text-[#526174]">
                  {item.description}
                </p>

                <span className="text-xs font-bold uppercase tracking-wider text-[#164B3A] group-hover:underline">
                  {item.action} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section className="bg-[#123C30] px-5 py-20 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D9C080]">
            THE GALLASPY · EST. 2027
          </p>

          <h2 className="mt-6 max-w-4xl text-5xl font-black uppercase leading-[0.98] tracking-tight sm:text-7xl">
            A NEW TRADITION
            <span className="block">BEGINS HERE.</span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/75">
            June 21, 2027. Greater Atlanta, Georgia.
            Golf, culture, and competition come together
            for the inaugural THE GALLASPY.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/invitational/register"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#D9C080] px-7 text-xs font-black uppercase tracking-wider text-[#10263F] hover:bg-white"
            >
              COMPETE
            </Link>

            <Link
              href="/invitational/sponsors"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/40 px-7 text-xs font-black uppercase tracking-wider text-white hover:border-white"
            >
              PARTNER WITH THE GALLASPY
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
