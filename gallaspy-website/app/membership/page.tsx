import Link from "next/link";

export const metadata = {
  title: "Membership | The Gallaspy Golf Club",
  description: "Explore membership at The Gallaspy Golf Club, including organized golf, community, priority access, and monthly or annual plans.",
};

const benefits = [
  ["The monthly Gallaspy Round", "One organized Gallaspy Round each month. Members pay their own course green fees."],
  ["More time on the game", "One additional golf activity each month, such as a Range Night or group practice experience."],
  ["A connected community", "A monthly networking or social opportunity and access to Golf Partners connections."],
  ["Member priority access", "Normally a 72-hour early-registration window where offered, subject to eligibility and event capacity. Gallaspy Cup team selection is never guaranteed."],
  ["The Pro Shop", "Up to 25% off select eligible Gallaspy apparel."],
  ["Gallaspy Rewards", "Points for eligible, verified activities and apparel purchases. Redemption options are being prepared."],
  ["A club identity", "A distinct membership number and members-only experiences."],
  ["Handicap service · planned", "GHIN handicap access is intended, pending USGA/GSGA authorization and per-member arrangements."],
];

export default function MembershipPage() {
  return (
    <main className="g625-page g625-membership">
      <div data-gallaspy-public-account-cta="true" className="mx-auto my-8 flex max-w-5xl flex-col items-center gap-3 rounded-xl border border-[#D7E1E7] bg-white px-6 py-7 text-center text-[#10263F]">
        <p className="text-lg font-semibold">Your Gallaspy experience starts here.</p>
        <p className="max-w-xl text-sm text-[#47596A]">Create your Gallaspy account to access the digital clubhouse. An account is separate from paid club membership.</p>
        <a href="/my-gallaspy" className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#10263F] px-8 py-3 text-sm font-bold tracking-wide text-white">
          CREATE AN ACCOUNT
        </a>
      </div>

      <section className="g625-member-hero"><div className="g625-container g625-member-hero-grid"><div><p className="g625-eyebrow g625-on-dark">THE GALLASPY GOLF CLUB / MEMBERSHIP</p><h1>A PLACE IN <em>THE STORY.</em></h1><p className="g625-lede">A club built through golf, relationships, and the traditions we create. Membership is one way to take part in what comes next.</p><a href="#membership-privileges" className="g625-button g625-button-light">Explore the privileges <span aria-hidden="true">↓</span></a></div><div className="g625-member-hero-aside"><span>01 / MEMBERSHIP</span><p>THE GALLASPY</p><strong>PLAY.<br/>COMPETE.<br/>GATHER.</strong><small>MEMBERSHIP IS ABOUT PARTICIPATION, NOT OWNERSHIP OF A COURSE.</small></div></div></section>
      <section className="g625-section g625-member-privileges" id="membership-privileges"><div className="g625-container"><div className="g625-split"><div><p className="g625-eyebrow">01 / MEMBER PRIVILEGES</p><h2>GOLF. CONNECTION. <em>ACCESS.</em></h2></div><div className="g625-copy-column"><p className="g625-emphasis">A membership designed around the way we actually play.</p><p>From organized rounds to new connections, the privileges are built to give members meaningful ways to participate. Course green fees are not included in membership.</p></div></div><div className="g625-benefits-grid">{benefits.map(([name, copy], i) => <article key={name}><span>{String(i + 1).padStart(2, "0")}</span><h3>{name}</h3><p>{copy}</p></article>)}</div></div></section>
      <section className="g625-member-pricing" id="membership-pricing"><div className="g625-container"><div className="g625-pricing-heading"><div><p className="g625-eyebrow g625-on-dark">02 / STANDARD MEMBERSHIP</p><h2>ONE CLUB. <em>TWO WAYS TO BELONG.</em></h2></div><p>Choose the membership structure that works for your year of golf.</p></div><div className="g625-pricing-grid"><article className="g625-price-card"><div className="g625-price-label"><span>MONTHLY</span><span>FLEXIBLE BILLING</span></div><div className="g625-price-number">$100<span>/ month</span></div><div className="g625-price-rule"/><p>A one-time $250 initiation fee applies to the monthly plan.</p><div className="g625-price-details"><div><span>FIRST CHARGE</span><strong>$350</strong></div><div><span>THEN</span><strong>$100 / month</strong></div></div><Link data-membership-plan="monthly" href="/membership/checkout?plan=monthly" className="mt-6 block rounded-xl bg-white px-5 py-4 text-center font-bold text-[#10263F]">SELECT MONTHLY MEMBERSHIP</Link></article><article className="g625-price-card g625-price-featured"><div className="g625-price-label"><span>ANNUAL</span><span>INITIATION WAIVED</span></div><div className="g625-price-number">$1,000<span>/ year</span></div><div className="g625-price-rule"/><p>Prepay for a full year of membership with the initiation fee waived.</p><div className="g625-price-details"><div><span>ANNUAL PAYMENT</span><strong>$1,000</strong></div><div><span>INITIATION</span><strong>$0</strong></div></div><Link data-membership-plan="annual" href="/membership/checkout?plan=annual" className="mt-6 block rounded-xl bg-white px-5 py-4 text-center font-bold text-[#10263F]">SELECT ANNUAL MEMBERSHIP</Link></article></div><p className="g625-price-disclosure">Green fees are not included. Standard Membership is payment-based, without manual application review. Enrollment is being prepared; no payment is collected on this page. Terms and cancellation details are presented before payment. Planned benefits are subject to availability and eligibility.</p></div></section>
      <section className="g625-member-finish"><div className="g625-container g625-finish-grid"><div><p className="g625-eyebrow">03 / BEYOND MEMBERSHIP</p><h2>THE CLUB COMES <em>FIRST.</em></h2><p>Anyone can explore public Gallaspy golf opportunities through the app. A Gallaspy app account is separate from a paid club membership.</p></div><div className="g625-finish-links"><Link href="/the-club">Discover the club <span aria-hidden="true">→</span></Link><Link href="/play">Explore golf opportunities <span aria-hidden="true">→</span></Link><Link href="/falcon-society">Discover Falcon Society <span aria-hidden="true">→</span></Link></div></div></section>
    </main>
  );
}
