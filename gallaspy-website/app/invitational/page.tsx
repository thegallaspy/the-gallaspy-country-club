import Image from "next/image";
import Link from "next/link";
import InvitationalNav from "@/components/invitational/InvitationalNav";

const competition = [
  "Team Championship",
  "Closest to the Pin",
  
  "Hole-in-One Challenge",
  "On-Course Activations",
  "Awards Presentation",
];

const resources = [
  {
    number: "01",
    title: "Player Registration",
    text: "Registration is open for the 72-player field. Individual entry is $200 per golfer.",
    href: "/invitational/register",
    label: "Register Interest",
  },
  {
    number: "02",
    title: "Sponsorship",
    text: "Explore tournament partnerships, hospitality, gifting, activations, and brand opportunities.",
    href: "/invitational/sponsors",
    label: "Explore Partnership",
  },
  {
    number: "03",
    title: "Schedule",
    text: "Review the current tournament-day framework from player arrival through awards.",
    href: "/invitational/schedule",
    label: "View Schedule",
  },
  {
    number: "04",
    title: "Tournament FAQ",
    text: "Answers covering format, field size, venue status, registration, contests, and sponsorship.",
    href: "/invitational/faq",
    label: "Read FAQ",
  },
];

export default function InvitationalPage() {
  return (
    <main className="bg-[#F3EFE6] text-[#10263F]">
      <InvitationalNav />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#10263F] px-5 pb-14 pt-32 text-white sm:px-8 sm:pb-18 sm:pt-36 lg:px-10 lg:pb-20 lg:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(12,53,45,0.9),transparent_40%)]" />

        <div className="absolute -right-10 bottom-[-4rem] text-[16rem] font-black leading-none tracking-[-0.1em] text-white/[0.025] sm:text-[22rem] lg:text-[30rem]">
          27
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_280px] lg:items-start">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-[#B3262D]" />
                <p className="text-[8px] font-black uppercase tracking-[0.36em] text-[#FFD76A]">
                  The Gallaspy Presents
                </p>
              </div>

              <p className="mt-7 text-[9px] font-black uppercase tracking-[0.28em] text-white/40">
                First Annual · June 21, 2027
              </p>

              <h1 className="mt-3 max-w-[960px] text-[3.7rem] font-black uppercase leading-[0.8] tracking-[-0.075em] sm:text-[5.2rem] md:text-[6.5rem] lg:text-[7.4rem]">
                The Gallaspy
                <span className="block text-[#FFD76A]">
                  Invitational
                </span>
              </h1>

              <p className="mt-7 max-w-[680px] text-[15px] leading-7 text-white/58 sm:text-[17px] sm:leading-8">
                Competitive golf, tournament atmosphere, hospitality, and the
                beginning of a new annual Gallaspy tradition.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/invitational/register"
                  className="inline-flex min-h-[50px] items-center justify-center bg-[#FFD76A] px-7 text-[8px] font-black uppercase tracking-[0.23em] text-[#10263F] transition duration-300 hover:-translate-y-1 hover:bg-white"
                >
                  Player Registration →
                </Link>

                <Link
                  href="/invitational/sponsors"
                  className="inline-flex min-h-[50px] items-center justify-center border border-white/25 px-7 text-[8px] font-black uppercase tracking-[0.23em] text-white transition duration-300 hover:border-[#FFD76A] hover:text-[#FFD76A]"
                >
                  Sponsorship
                </Link>
              </div>
            </div>

            <div className="flex justify-start lg:justify-end">
              <div className="relative h-[210px] w-[210px] sm:h-[240px] sm:w-[240px]">
                <Image
                  src="/logos/gallaspy-invitational.png"
                  alt="The Gallaspy Invitational"
                  fill
                  priority
                  sizes="240px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOURNAMENT STRIP */}
      <section className="bg-[#B3262D] text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 sm:px-8 md:grid-cols-4 lg:px-10">
          {[
            ["Date", "June 21, 2027"],
            ["Format", "Individual Stroke Play"],
            ["Field", "72 Players"],
            ["Start", "10:00 AM"],
          ].map(([label, value], index) => (
            <div
              key={label}
              className={`py-6 sm:py-7 ${
                index % 2 === 0 ? "pr-4" : "border-l border-white/20 pl-4"
              } md:border-l md:border-white/20 md:px-6 md:first:border-l-0 md:first:pl-0`}
            >
              <p className="text-[7px] font-black uppercase tracking-[0.25em] text-white/55">
                {label}
              </p>
              <p className="mt-2 text-sm font-black uppercase tracking-[-0.02em] sm:text-base">
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* INTRO */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.34em] text-[#8B6A34]">
                The Tournament
              </p>
              <div className="mt-5 h-[3px] w-12 bg-[#B3262D]" />
            </div>

            <div>
              <h2 className="max-w-[900px] text-[2.9rem] font-black uppercase leading-[0.9] tracking-[-0.055em] sm:text-[4.1rem] lg:text-[4.8rem]">
                The First One
                <span className="block font-serif font-light normal-case italic tracking-[-0.035em] text-[#8B6A34]">
                  sets the standard.
                </span>
              </h2>

              <div className="mt-8 grid gap-7 md:grid-cols-2">
                <p className="text-[15px] leading-7 text-[#10263F]/60">
                  The inaugural Gallaspy Invitational brings the club into
                  competition through a carefully produced golf experience for
                  players, guests, and partners.
                </p>

                <p className="text-[15px] leading-7 text-[#10263F]/60">
                  The field is intentionally limited to 72 players, giving the
                  tournament room to feel personal, competitive, and worth
                  returning to.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPETITION */}
      <section className="bg-[#0C352D] text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-[#B3262D]" />
                <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#FFD76A]">
                  Competition
                </p>
              </div>

              <h2 className="mt-5 max-w-[560px] text-[3rem] font-black uppercase leading-[0.86] tracking-[-0.06em] sm:text-[4.2rem]">
                Every Hole
                <span className="block">Should Matter.</span>
              </h2>

              <p className="mt-6 max-w-[560px] text-sm leading-7 text-white/48">
                Team competition is joined by individual challenges, player
                experiences, sponsor activations, and an awards finish.
              </p>

              <p className="mt-6 max-w-[540px] border-l-2 border-[#B3262D] pl-4 text-xs leading-6 text-white/35">
                Final purse structure and individual prize details will be
                announced as tournament planning is finalized.
              </p>
            </div>

            <div className="border-t border-white/15">
              {competition.map((item, index) => (
                <div
                  key={item}
                  className="group flex items-center justify-between border-b border-white/15 py-5"
                >
                  <p className="text-lg font-black uppercase tracking-[-0.025em] sm:text-xl">
                    {item}
                  </p>

                  <p className="text-[9px] font-black tracking-[0.2em] text-[#FFD76A] transition group-hover:text-[#B3262D]">
                    0{index + 1}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GOLDEN FALCON */}
      <section className="relative overflow-hidden bg-[#071827] text-white">
        <div className="absolute right-[-3rem] top-[-4rem] text-[12rem] font-black leading-none tracking-[-0.08em] text-white/[0.025] sm:text-[18rem]">
          01
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-center lg:gap-16">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-[#B89146]" />

                <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#FFD76A]">
                  Championship Tradition
                </p>
              </div>

              <p className="mt-5 text-[9px] font-black uppercase tracking-[0.24em] text-white/35">
                Established 2027
              </p>
            </div>

            <div>
              <h2 className="text-[2.5rem] font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-[3.4rem] lg:text-[4rem]">
                The Golden
                <span className="block text-[#FFD76A]">
                  Falcon.
                </span>
              </h2>

              <div className="mt-7 border-t border-white/15 pt-7">
                <p className="max-w-[680px] text-base leading-7 text-white/70 sm:text-lg">
                  The Golden Falcon is the championship trophy of The
                  Gallaspy Invitational.
                </p>

                <p className="mt-4 max-w-[680px] text-sm leading-7 text-white/50">
                  It is earned by the golfer who records the lowest verified
                  gross score over 18 holes. On June 21, 2027, one golfer will
                  become the inaugural Gallaspy Invitational Champion and the
                  first to earn The Golden Falcon.
                </p>
              </div>

              <div className="mt-7 flex items-center gap-4">
                <span className="h-[3px] w-12 bg-[#B89146]" />

                <p className="text-[8px] font-black uppercase tracking-[0.26em] text-[#FFD76A]">
                  Inaugural Championship · June 21, 2027
                </p>
              </div>

              <div className="mt-8">
                <a
                  href="/invitational/prizes"
                  className="inline-flex min-h-[48px] items-center border border-white/20 px-6 text-[9px] font-black uppercase tracking-[0.22em] text-white transition hover:border-[#FFD76A] hover:text-[#FFD76A]"
                >
                  Discover The Golden Falcon →
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3">
          <div className="h-[5px] bg-[#10263F]" />
          <div className="h-[5px] bg-[#FFD76A]" />
          <div className="h-[5px] bg-[#0C352D]" />
        </div>
      </section>

      {/* RESOURCES */}
      <section className="bg-[#F3EFE6] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.5fr_1.5fr]">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#8B6A34]">
                Tournament Desk
              </p>
            </div>

            <div>
              <h2 className="max-w-[760px] text-[2.8rem] font-black uppercase leading-[0.9] tracking-[-0.055em] sm:text-[3.8rem]">
                Everything You
                <span className="block font-serif font-light normal-case italic tracking-[-0.035em] text-[#8B6A34]">
                  need for 2027.
                </span>
              </h2>
            </div>
          </div>

          <div className="mt-12 border-t border-[#10263F]/15">
            {resources.map((resource) => (
              <Link
                key={resource.title}
                href={resource.href}
                className="group grid gap-5 border-b border-[#10263F]/15 py-7 transition hover:bg-white/35 md:grid-cols-[75px_260px_1fr_auto] md:items-center md:px-3"
              >
                <p className="text-[9px] font-black tracking-[0.2em] text-[#B3262D]">
                  {resource.number}
                </p>

                <h3 className="text-xl font-black uppercase tracking-[-0.03em]">
                  {resource.title}
                </h3>

                <p className="max-w-[520px] text-sm leading-6 text-[#10263F]/52">
                  {resource.text}
                </p>

                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#8B6A34] transition group-hover:text-[#B3262D]">
                  {resource.label} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOST COURSE NOTICE */}
      <section className="bg-[#E8DEC9] px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-7 lg:grid-cols-[180px_1fr_auto] lg:items-center">
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#8B6A34]">
              2027 Host Course
            </p>

            <div>
              <h2 className="text-[1.7rem] font-black uppercase leading-tight tracking-[-0.035em] sm:text-[2rem]">
                Championship setting being finalized.
              </h2>

              <p className="mt-2 max-w-[650px] text-sm leading-6 text-[#10263F]/55">
                The inaugural Invitational is scheduled for June 21, 2027.
                Official host-course information will be announced after the
                venue agreement is completed.
              </p>
            </div>

            <p className="text-[8px] font-black uppercase tracking-[0.23em] text-[#10263F]/35">
              Georgia · 2027
            </p>
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section className="relative overflow-hidden bg-[#10263F] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="absolute right-[-2%] top-[-35%] text-[14rem] font-black leading-none text-white/[0.025] sm:text-[20rem]">
          01
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#FFD76A]">
                First Annual
              </p>

              <h2 className="mt-5 max-w-[760px] text-[3rem] font-black uppercase leading-[0.85] tracking-[-0.06em] sm:text-[4.3rem]">
                Be There When
                <span className="block">It Starts.</span>
              </h2>

              <p className="mt-6 max-w-[600px] text-sm leading-7 text-white/48">
                Join the player list or explore partnership opportunities for
                the inaugural Gallaspy Invitational.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/invitational/register"
                className="inline-flex min-h-[50px] items-center justify-center bg-[#FFD76A] px-7 text-[8px] font-black uppercase tracking-[0.22em] text-[#10263F] transition hover:-translate-y-1 hover:bg-white"
              >
                Register Interest →
              </Link>

              <Link
                href="/invitational/sponsors"
                className="inline-flex min-h-[50px] items-center justify-center border border-white/25 px-7 text-[8px] font-black uppercase tracking-[0.22em] text-white transition hover:border-[#FFD76A] hover:text-[#FFD76A]"
              >
                Become A Sponsor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
