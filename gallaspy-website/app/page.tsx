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
          <div className="g2-actions"><Link className="g2-btn g2-btn-green" href="/host-a-round">Host Your Own Round <span aria-hidden="true">→</span></Link><Link className="g2-line-link" href="/my-gallaspy?mode=create">CREATE AN ACCOUNT</Link></div>
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


      <section data-gallaspy-signup="homepage" className="g-home-start" aria-labelledby="g-home-start-title">
        <div className="g2-container">
          <div className="g-home-start-head">
            <div><p className="g-home-kicker">THE DIGITAL CLUBHOUSE</p><h2 id="g-home-start-title">Make the game yours.</h2><p>Discover opportunities to play, build your golf record and find your place in The Gallaspy. A My Gallaspy account is separate from official club membership.</p></div>
            <Link href="/my-gallaspy?mode=create" className="g-home-account">CREATE AN ACCOUNT <span aria-hidden="true">→</span></Link>
          </div>
          <nav className="g-home-quick" aria-label="Explore The Gallaspy">
            {[
              {title:"Find a round",detail:"Explore upcoming Gallaspy Rounds.",href:"/rounds",label:"PLAY"},
              {title:"Digital clubhouse",detail:"Connect and share with the club community. Membership required for the feed.",href:"/community",label:"GATHER"},
              {title:"My Gallaspy",detail:"Your account, golf journey and rewards.",href:"/my-gallaspy",label:"YOUR GAME"},
            ].map(item=><Link key={item.href} href={item.href} className="g-home-quick-link"><span className="g-home-kicker">{item.label}</span><strong>{item.title}</strong><span className="g-home-quick-detail">{item.detail}</span><span aria-hidden="true" className="g-home-quick-arrow">→</span></Link>)}
          </nav>
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
      <article className="g-home-gala"><div><p className="g-home-kicker">THE YEAR-END TRADITION · DECEMBER 2027</p><h3>Night at the Nest.</h3><p>An evening of recognition, celebration and the traditions we build together. Further event details to be announced.</p></div><Link href="/night-at-the-nest" className="g-home-gala-link">Explore the gala <span aria-hidden="true">→</span></Link></article>
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
