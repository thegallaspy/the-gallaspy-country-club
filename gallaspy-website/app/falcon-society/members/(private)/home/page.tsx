import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  getFalconSocietyCookieName,
  verifyFalconSocietySession,
} from "@/lib/falcon-society-auth";

export const metadata: Metadata = {
  title: "Members Room | Falcon Society | The Gallaspy",
  description: "Private Falcon Society member access.",
  robots: {
    index: false,
    follow: false,
  },
};

const memberAreas = [
  {
    eyebrow: "Members Only",
    title: "Society Shop",
    description:
      "Exclusive Falcon Society apparel and pieces reserved for the Founding 100.",
    href: "/falcon-society/members/shop",
    action: "Enter Shop",
  },
  {
    eyebrow: "What's Ahead",
    title: "Member Calendar",
    description:
      "Rounds, competitions, gatherings, RSVP windows, and private member details.",
    href: "/falcon-society/members/calendar",
    action: "View Calendar",
  },
  {
    eyebrow: "Play",
    title: "Gallaspy Rounds",
    description:
      "Member information and access for upcoming Gallaspy golf gatherings.",
    href: "/falcon-society/members/rounds",
    action: "View Rounds",
  },
  {
    eyebrow: "From The Club",
    title: "Society Dispatch",
    description:
      "Private announcements, founder notes, club updates, and member communications.",
    href: "/falcon-society/members/dispatch",
    action: "Read Dispatch",
  },
  {
    eyebrow: "The Founding 100",
    title: "Founding Ledger",
    description:
      "A permanent record of the founding chapter of the Falcon Society.",
    href: "/falcon-society/members/ledger",
    action: "View Ledger",
  },
  {
    eyebrow: "Member Library",
    title: "Resources",
    description:
      "Club information, event materials, policies, guides, and member documents.",
    href: "/falcon-society/members/resources",
    action: "View Resources",
  },
];

export default async function FalconSocietyMembersHomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getFalconSocietyCookieName())?.value;

  const authenticated = await verifyFalconSocietySession(token);

  if (!authenticated) {
    redirect("/falcon-society/members");
  }

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#10263F]">
      {/* PRIVATE MEMBER HERO */}
      <section className="bg-[#10263F] px-5 pb-16 pt-32 text-white sm:px-8 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
        <div className="mx-auto w-full max-w-[1120px]">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <div className="flex items-center gap-4">
                <span className="h-2.5 w-2.5 bg-[#8C1D2C]" />
                <p className="text-[10px] font-bold uppercase tracking-[0.36em] text-[#D7B56D]">
                  Private Member Access
                </p>
              </div>

              <h1 className="mt-6 font-serif text-[3.4rem] font-light leading-[0.94] sm:text-6xl lg:text-[5.5rem]">
                The Falcon Society
                <span className="block text-[#D7B56D]">Members Room.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
                The private digital home of The Gallaspy&apos;s Founding 100 —
                built for the people helping establish the club&apos;s opening
                chapter.
              </p>
            </div>

            <form action="/api/falcon-society/logout" method="post">
              <button
                type="submit"
                className="inline-flex min-h-[46px] items-center justify-center border border-white/25 px-6 text-[9px] font-bold uppercase tracking-[0.22em] text-white transition hover:border-[#D7B56D] hover:text-[#D7B56D]"
              >
                Sign Out
              </button>
            </form>
          </div>

          <div className="mt-14 grid grid-cols-3 border-y border-white/15">
            <div className="py-5">
              <p className="text-[8px] font-bold uppercase tracking-[0.24em] text-white/35">
                Society
              </p>
              <p className="mt-2 font-serif text-lg text-white">
                Founding 100
              </p>
            </div>

            <div className="border-l border-white/15 px-5 py-5 sm:px-8">
              <p className="text-[8px] font-bold uppercase tracking-[0.24em] text-white/35">
                Established
              </p>
              <p className="mt-2 font-serif text-lg text-white">
                2026
              </p>
            </div>

            <div className="border-l border-white/15 pl-5 py-5 sm:pl-8">
              <p className="text-[8px] font-bold uppercase tracking-[0.24em] text-white/35">
                Access
              </p>
              <p className="mt-2 font-serif text-lg text-[#D7B56D]">
                Members Only
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MEMBER AREAS */}
      <section className="px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1120px]">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#8C1D2C]">
              Inside The Society
            </p>

            <h2 className="mt-4 font-serif text-[2.8rem] font-light leading-[1.02] sm:text-5xl">
              Your place inside
              <span className="block text-[#8B6A34]">the opening chapter.</span>
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#33475B]/75 sm:text-base sm:leading-8">
              Member access will grow alongside The Gallaspy — from exclusive
              apparel and club communications to rounds, gatherings, traditions,
              and the history created along the way.
            </p>
          </div>

          <div className="mt-12 grid border-l border-t border-[#10263F]/15 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {memberAreas.map((area) => (
              <article
                key={area.title}
                className="flex min-h-[310px] flex-col border-b border-r border-[#10263F]/15 p-7 sm:p-8"
              >
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#8C1D2C]">
                  {area.eyebrow}
                </p>

                <h3 className="mt-7 font-serif text-3xl font-light">
                  {area.title}
                </h3>

                <p className="mt-5 text-sm leading-7 text-[#33475B]/75">
                  {area.description}
                </p>

                <Link
                  href={area.href}
                  className="mt-auto pt-8 text-[9px] font-bold uppercase tracking-[0.22em] text-[#10263F] transition hover:text-[#8C1D2C]"
                >
                  {area.action}
                  <span className="ml-3 text-[#8C1D2C]">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PRIVATE ROOM FOOTER */}
      <section className="bg-[#8C1D2C] px-5 py-12 text-white sm:px-8">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/55">
              The Falcon Society
            </p>
            <p className="mt-2 font-serif text-2xl font-light">
              The Founding 100 of The Gallaspy.
            </p>
          </div>

          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/55">
            Private Member Access
          </p>
        </div>
      </section>
    </main>
  );
}
