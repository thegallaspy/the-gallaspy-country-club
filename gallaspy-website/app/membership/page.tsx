import Link from "next/link";

export const metadata = {
  title: "Membership | The Gallaspy Golf Club",
  description: "Explore Standard Membership at The Gallaspy Golf Club.",
};

export default function MembershipPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-20 text-[#10263F]">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-widest text-[#426B55]">
          The Gallaspy Golf Club
        </p>
        <h1 className="mt-5 text-4xl font-semibold sm:text-6xl">
          Club Membership
        </h1>
        <p className="mt-6 text-lg">
          Organized golf. Genuine community. Exclusive member privileges.
        </p>

        <section className="mt-12">
          <h2 className="text-3xl font-semibold">
            Your Membership Benefits
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["Monthly Gallaspy Round", "Organized golf outings across Georgia. Green fees are separate."],
              ["Golf Activities", "Additional organized practice, competition, or golf experiences."],
              ["Club Community", "Networking opportunities and Golf Partners connections."],
              ["Gallaspy Rewards", "Earn points on eligible purchases and verified club activities. Redemption benefits are being prepared."],
              ["Member Apparel", "Up to 25% off select Gallaspy apparel, subject to eligibility."],
              ["Priority Registration", "Early access to eligible club events and competitions."],
              ["Member Identity", "Official Gallaspy membership number and digital membership card."],
              ["Official Handicap — Planned", "USGA Handicap Index through GHIN, pending GSGA authorization."],
            ].map(([title, description]) => (
              <article
                key={title}
                className="rounded-2xl border border-[#DCE4E9] bg-[#F8FAFB] p-6"
              >
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#526174]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <h2 className="mt-12 text-3xl font-semibold">
          $100 per month
        </h2>
        <p className="mt-4 max-w-2xl leading-8">
          Standard Membership will renew monthly once enrollment launches.
          No application or manual approval is required.
          Members pay their own green fees.
        </p>
        <p className="mt-5 max-w-2xl leading-8">
          An official USGA Handicap Index through GHIN is planned,
          subject to GSGA authorization and service arrangements.
        </p>
        <p className="mt-5 font-semibold">
          Enrollment is being prepared. No payment is collected here.
        </p>
        <Link href="/falcon-society" className="mt-10 inline-block underline">
          Explore the Falcon Society
        </Link>
      </div>
    </main>
  );
}
