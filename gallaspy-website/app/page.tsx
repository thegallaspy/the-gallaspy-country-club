import Image from "next/image";
import Link from "next/link";
import { getUpcomingEvents } from "@/data/club";
import HomeRoundHost from "@/components/home/HomeRoundHost";

// Normalize legacy event records using canonical routes and confirmed dates.
const label = (event: { name: string; href: string; date?: string | null }) => {
  if (event.href === "/talaria-cup" || event.href === "/gallaspy-cup" || event.date === "2027-10-23") return "THE GALLASPY CUP";
  if (event.href === "/invitational" || event.href === "/the-gallaspy" || event.date === "2027-06-21") return "THE GALLASPY CHAMPIONSHIP I";
  return event.name;
};
const destination = (href: string) =>
  href === "/invitational" ? "/the-gallaspy" : href === "/talaria-cup" ? "/gallaspy-cup" : href;

export default function Home() {
  const events = getUpcomingEvents(3);
  return <div className="g2-home">
    <section className="g2-hero">
      <div className="g2-container g2-hero-grid">
        <div className="g2-hero-main">
          <p className="g2-eyebrow"><span className="g2-dot"/> THE GALLASPY GOLF CLUB · GEORGIA</p>
          <h1>SOME INHERIT<br/><span>HISTORY.</span><br/>OTHERS <em>CREATE IT.</em></h1>
          <p className="g2-lede">A club built through the game, the people who play it, and the traditions created along the way.</p>
          <div className="g2-actions"><Link className="g2-btn g2-btn-green" href="/rounds">Explore Gallaspy Rounds <span>→</span></Link><Link className="g2-line-link" href="/the-club">Discover the club <span>→</span></Link></div>
        </div>
        <aside className="g2-hero-aside" aria-label="Club identity">
          <div className="g2-aside-top"><span>THE CLUB</span><span>EST. 2026</span></div>
          <Image src="/logos/official/crest.png" alt="Official Gallaspy Crest" width={250} height={250} priority className="g2-aside-logo" />
          <p>PLAY<span> / </span>COMPETE<span> / </span>GATHER</p>
          <div className="g2-aside-bottom">A modern club. A lasting tradition.</div>
        </aside>
      </div>
      <div className="g2-hero-ticker"><div className="g2-container"><span>OPEN TO THE GAME</span><span>ROOTED IN GEORGIA</span><span>BUILT TOGETHER</span></div></div>
    </section>


      <section
        data-gallaspy-signup="homepage"
        aria-label="Create a Gallaspy account"
        className="bg-white px-6 py-12 text-center text-[#10263F]"
      >
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#285C45]">
            Join the Gallaspy Community
          </p>
          <h2 className="mt-3 text-3xl font-bold">
            Your Gallaspy Experience Starts Here.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#47596A]">
            Create your account to explore the digital clubhouse,
            connect with golfers, and discover opportunities to play.
            An account is separate from paid club membership.
          </p>
          <a
            href="/my-gallaspy"
            className="mt-7 inline-flex min-h-12 items-center justify-center bg-[#10263F] px-8 py-3 text-sm font-bold tracking-wider text-white"
          >
            CREATE AN ACCOUNT
          </a>
        </div>
      </section>

<section className="g2-calendar g2-section" aria-labelledby="g2-calendar-title"><div className="g2-container">
      <div className="g2-heading"><div><p className="g2-eyebrow">01 / UPCOMING AT THE GALLASPY</p><h2 id="g2-calendar-title">The club <em>calendar.</em></h2></div><Link className="g2-line-link" href="/calendar">View full calendar →</Link></div>
      <div className="g2-event-list">{events.map(event => <article className="g2-event" key={event.id}><div className="g2-event-number"><small>{event.date ? new Date(event.date+"T12:00:00").toLocaleDateString("en-US",{month:"short"}).toUpperCase() : "TBA"}</small><strong>{event.date ? new Date(event.date+"T12:00:00").getDate() : "—"}</strong></div><div className="g2-event-info"><span className="g2-eyebrow">{event.category === "GALLASPY_ROUND" ? "GALLASPY ROUND" : "CLUB EVENT"} · {event.status.replaceAll("_"," ")}</span><h3>{label(event)}</h3><p>{event.venue?.confirmed && event.venue.name ? event.venue.name : event.dateLabel}</p></div><Link href={destination(event.registrationHref && event.status === "REGISTRATION_OPEN" ? event.registrationHref : event.href)} className="g2-event-link">Details <span aria-hidden="true">→</span></Link></article>)}</div>
      <div className="g2-calendar-bottom"><p>Find your place on the calendar—from monthly rounds to our signature competitions.</p><Link href="/host-a-round" className="g2-line-link">Host a round with My Gallaspy →</Link></div>
    </div></section>

    <section className="g2-portals" aria-labelledby="g2-portals-title"><div className="g2-container"><div className="g2-heading"><div><p className="g2-eyebrow">02 / THE SIGNATURE EVENTS</p><h2 id="g2-portals-title">A tradition <em>in the making.</em></h2></div></div>
      <div className="g2-portal-grid"><article className="g2-portal g2-portal-champ"><div className="g2-portal-top"><span>THE GALLASPY™ CHAMPIONSHIP I</span><span>JUNE 21, 2027</span></div><Image src="/logos/official/the-gallaspy-championship.png" width={240} height={240} alt="Official Gallaspy Championship emblem" className="g2-champ-logo"/><h3>THE GALLASPY™<br/>CHAMPIONSHIP <i>I</i></h3><p>The inaugural championship. Individual competition. The Golden Falcon.</p><div className="g2-portal-links"><Link href="/the-gallaspy">Event portal →</Link><Link href="/invitational/register">Player registration →</Link><Link href="/invitational/sponsors">Sponsors & vendors →</Link></div></article>
      <article className="g2-portal g2-portal-cup"><div className="g2-portal-top"><span>THE GALLASPY CUP™</span><span>OCTOBER 23, 2027</span></div><div className="g2-cup-identity">
        <Image
          src="/logos/official/the-gallaspy-cup.png"
          alt="Official The Gallaspy Cup brand mark"
          width={520}
          height={250}
          unoptimized
          className="g2-cup-identity-logo"
        />
      </div>
      <div className="g2-cup-teams"><div className="g2-cup-falcon"><Image src="/logos/official/falcon-G.png" width={105} height={105} alt="Official Team Falcon emblem"/><span>TEAM FALCON</span></div><div className="g2-cup-crest"><Image src="/logos/official/crest.png" width={105} height={105} alt="Official Team Crest emblem"/><span>TEAM CREST</span></div></div><h3>A HOUSE<br/><em>DIVIDED.</em></h3><p>October 23, 2027 · 16 players · Eight singles matches · 18 holes.</p><div className="g2-portal-links"><Link href="/gallaspy-cup">Enter the Cup portal →</Link></div></article></div>
    </div></section>

    <HomeRoundHost />

    <section className="g5-member" aria-labelledby="g5-member-title">
      <div className="g2-container g5-member-grid">
        <div className="g5-member-story">
          <p className="g5-eyebrow"><span className="g5-spark"/> 04 / THE PRIVILEGE OF BELONGING</p>
          <h2 id="g5-member-title">MORE THAN<br/>A ROUND.<br/><em>A LEGACY.</em></h2>
          <p className="g5-member-intro">Join a club shaped by the people who play. A place for competition, connection and traditions that become more meaningful every season.</p>
          <div className="g5-member-cta"><Link href="/membership" className="g5-member-button">Explore club membership <span aria-hidden="true">→</span></Link><span className="g5-member-caption">Monthly & annual membership plans</span></div>
          <div className="g5-plan-strip"><span>$100 / Month + initiation</span><span>$1,000 / Annual · Initiation waived</span></div>
        </div>
        <div className="g5-benefit-stack" aria-label="Gallaspy membership benefits">
          {[
            ["Organized golf", "Monthly Gallaspy Rounds, weekly Range Nights, and discounted domestic and international golf trips."],
            ["Priority access", "Early access to eligible rounds and select experiences, subject to availability."],
            ["The club community", "Networking, social gatherings and Golf Partners connections."],
            ["Member privileges", "Up to 25% off select apparel and eligible Gallaspy Rewards points."],
          ].map(([title, description], index) => <article key={title} className="g5-benefit" style={{ animationDelay: `${index * 90}ms` }}><span>{String(index+1).padStart(2,"0")}</span><div><h3>{title}</h3><p>{description}</p></div><span aria-hidden="true" className="g5-benefit-arrow">→</span></article>)}
        </div>
      </div>
    </section>

  </div>;
}
