import Link from "next/link";
import InvitationalNav from "@/components/invitational/InvitationalNav";
import SponsorInquiryForm from "./SponsorInquiryForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Partner With THE GALLASPY | Sponsorship",
  description:
    "Discover proposed sponsorship and vendor opportunities for THE GALLASPY 2027 in Greater Atlanta.",
};

const opportunities = [
  {
    title: "Presenting Partner",
    price: "$10,000",
    description: "Premier partnership opportunity across the championship and event experience.",
    benefits: [
      "Premier event recognition",
      "Prominent approved branding opportunities",
      "Premium hospitality opportunities",
      "Custom activation discussions",
    ],
  },
  {
    title: "Championship Partner",
    price: "$5,000",
    description: "Connect your organization with THE GALLASPY CHAMPIONSHIP.",
    benefits: [
      "Championship recognition",
      "Potential event signage",
      "Sponsor hospitality opportunities",
      "Approved on-site activations",
    ],
  },
  {
    title: "Official Event Partner",
    price: "$1,500",
    description: "Participate in the wider experience of golf, culture, and community.",
    benefits: [
      "Event promotional recognition",
      "Approved on-site branding",
      "Business exposure opportunities",
      "Select event-access discussions",
    ],
  },
  {
    title: "Hole Sponsor",
    price: "$500",
    description: "Explore recognition associated with an approved championship hole.",
    benefits: [
      "Potential championship hole recognition",
      "Event sponsor listing",
      "Select digital recognition",
    ],
  },
  {
    title: "Junior Falcon Experience Partner",
    price: "$250",
    description: "Support proposed golf discovery and enrichment opportunities for young people.",
    benefits: [
      "Youth-programming partnership opportunities",
      "Recognition within approved youth activities",
      "Potential community engagement",
    ],
  },
  {
    title: "Marketplace Vendor",
    price: "$200",
    description: "Apply to participate in the proposed event marketplace.",
    benefits: [
      "Consideration for an approved vendor space",
      "Potential attendee interaction",
      "Product or service promotion",
    ],
  },
];

const activities = [
  "Apparel",
  "Food and beverage",
  "Media",
  "Technology",
  "Hospitality",
  "Youth development",
  "Transportation",
  "Championship prizes",
  "Event production",
];

export default function SponsorsPage() {
  const submissionsEnabled =
    process.env.GALLASPY_SPONSORSHIP_INQUIRIES_ENABLED === "true";

  return (
    <main className="min-h-screen bg-white text-[#10263F]">
      <InvitationalNav />

      <header className="bg-[#10263F] px-5 pb-20 pt-32 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/invitational"
            className="text-xs font-semibold uppercase tracking-widest text-white/75 underline-offset-4 hover:underline"
          >
            Back to THE GALLASPY
          </Link>

          <p className="mt-12 text-xs font-bold uppercase tracking-[0.24em] text-[#B4D2BD]">
            June 21, 2027 · Greater Atlanta, Georgia
          </p>

          <h1 className="mt-6 max-w-4xl text-4xl font-bold uppercase leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            PARTNER WITH
            <span className="mt-2 block text-[#D8BD72]">
              THE GALLASPY.
            </span>
          </h1>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.26em] text-white/80">
            Golf. Culture. Competition.
          </p>

          <p className="mt-8 max-w-2xl text-base leading-8 text-white/80">
            Be part of a new tradition in golf. Partner with THE GALLASPY
            to connect your brand with championship competition,
            culture, hospitality, and community.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#sponsor-application"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#D8BD72] px-7 text-xs font-bold uppercase tracking-widest text-[#10263F] hover:bg-white"
            >
              Become a Sponsor
            </a>
            <a
              href="#opportunities"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/40 px-7 text-xs font-bold uppercase tracking-widest text-white hover:border-white"
            >
              Explore Opportunities
            </a>
          </div>
        </div>
      </header>

      <section className="border-b border-[#DFE6E9] px-5 py-12 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-3">
          {[
            ["THE EVENT", "THE GALLASPY"],
            ["THE COMPETITION", "THE GALLASPY CHAMPIONSHIP"],
            ["THE TROPHY", "THE GOLDEN FALCON"],
          ].map(([label, value]) => (
            <div key={label} className="border-l-2 border-[#245A45] pl-5">
              <p className="text-xs font-bold tracking-widest text-[#245A45]">
                {label}
              </p>
              <p className="mt-3 text-lg font-bold">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="opportunities" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#245A45]">
            Partnership Opportunities
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold sm:text-5xl">
            Find your place in the experience.
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#526174]">
            All starting prices below are preliminary planning figures,
            subject to approval. Benefits, availability, and final
            deliverables are subject to a written sponsorship agreement.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((item) => (
              <article
                key={item.title}
                className="flex flex-col rounded-2xl border border-[#DCE5E8] bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-[#245A45]">
                  Proposed Starting At
                </p>
                <p className="mt-3 text-3xl font-bold">{item.price}</p>
                <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#526174]">
                  {item.description}
                </p>

                <ul className="mt-6 flex-1 space-y-3 border-t border-[#E2E9EC] pt-5">
                  {item.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-3 text-sm leading-6">
                      <span aria-hidden="true" className="text-[#245A45]">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#sponsor-application"
                  className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#10263F] px-4 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#245A45]"
                >
                  Explore Partnership
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F2F6F5] px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#245A45]">
            Custom Partnerships
          </p>
          <h2 className="mt-4 text-3xl font-bold">
            Built around the right fit.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#526174]">
            Your organization may have an idea beyond the proposed packages.
            We welcome discussions about tailored participation across
            championship, hospitality, culture, and community programming.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {activities.map((activity) => (
              <span
                key={activity}
                className="rounded-full border border-[#C9D9D1] bg-white px-4 py-2 text-xs font-semibold text-[#10263F]"
              >
                {activity}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl rounded-2xl border-l-4 border-[#AF2535] bg-[#F7F9FA] p-7 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-widest text-[#AF2535]">
            Youth & Community
          </p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            THE JUNIOR FALCON EXPERIENCE
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#526174]">
            A unified experience for children and teenagers, with
            age-appropriate golf discovery, interactive programming,
            and potential youth-development opportunities.
            Specific activities and partnerships will be announced
            once approved.
          </p>
        </div>
      </section>

      <section
        id="sponsor-application"
        className="bg-[#10263F] px-5 py-20 text-white sm:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D8BD72]">
            Sponsorship & Vendor Interest
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold sm:text-5xl">
            Start a partnership conversation.
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/75">
            Applications are open to interested businesses and
            organizations; paid club membership is not required.
            Submitting an inquiry does not create a sponsorship
            agreement or payment obligation.
          </p>

          <SponsorInquiryForm enabled={submissionsEnabled} />
        </div>
      </section>
    </main>
  );
}
