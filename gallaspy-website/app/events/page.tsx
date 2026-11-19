import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Signature Events | The Gallaspy Golf Club",
  description: "Discover The Gallaspy Championship I, The Gallaspy Cup and Night at the Nest.",
};

const events = [
  { number: "01", date: "JUNE 21, 2027", eyebrow: "THE INAUGURAL CHAMPIONSHIP", title: "THE GALLASPY™", second: "CHAMPIONSHIP I", description: "The first chapter in our championship history. Individual competition, The Golden Falcon, and an experience built around the game.", image: "/logos/official/the-gallaspy-championship.png", alt: "Official Gallaspy Championship mark", href: "/the-gallaspy", action: "ENTER THE CHAMPIONSHIP", className: "champ" },
  { number: "02", date: "OCTOBER 23, 2027", eyebrow: "THE ANNUAL TEAM MATCH", title: "THE GALLASPY CUP™", second: "A HOUSE DIVIDED.", description: "Team Falcon versus Team Crest. Sixteen players, eight singles matches, eighteen holes. One Cup.", image: "/logos/official/the-gallaspy-cup.png", alt: "Official Gallaspy Cup emblem", href: "/gallaspy-cup", action: "EXPLORE THE CUP", className: "cup" },
  { number: "03", date: "DECEMBER 11, 2027", eyebrow: "THE END-OF-YEAR GALA", title: "NIGHT AT THE NEST", second: "AN EVENING TO REMEMBER.", description: "Honoring the season and the people who make it. Discover awards, charitable connections, tables, vendors and RSVP inquiries.", image: "/images/nightatnest.png", alt: "Official Night at the Nest logo", href: "/night-at-the-nest", action: "ENTER THE GALA PORTAL", className: "nest" },
];

export default function EventsPage() {
  return <main className="g620-events">
    <header className="g620-events-opening"><div className="g620-wrap">
      <p className="g620-kicker">THE GALLASPY GOLF CLUB <span> / </span> OUR EVENTS</p>
      <div className="g620-opening-grid"><h1>THE DAYS THAT <em>DEFINE US.</em></h1><div><p>Competition. Community. Tradition.</p><span>Three signature experiences that begin a lasting calendar of Gallaspy moments.</span></div></div>
      <nav className="gallaspy-calendar-shortcuts" aria-label="Events navigation"><Link href="/calendar">2027 Club Calendar</Link><Link href="/rounds">Gallaspy Rounds</Link></nav>
    </div></header>
    <section className="g620-events-stack" aria-label="Signature event portals"><div className="g620-wrap">
      {events.map(e => <article key={e.number} className={`g620-event g620-event-${e.className}`}>
        <div className="g620-event-body"><div className="g620-event-top"><span>{e.number} / {e.eyebrow}</span><time>{e.date}</time></div>
          <div className="g620-event-message"><h2>{e.title}<br/><em>{e.second}</em></h2><p>{e.description}</p></div>
          <Link className="g620-event-action" href={e.href}>{e.action}<span aria-hidden="true">→</span></Link>
        </div>
        <div className="g620-event-art"><Image src={e.image} alt={e.alt} width={550} height={550} sizes="(max-width: 760px) 70vw, 32vw" /></div>
      </article>)}
    </div></section>
    <aside className="g620-events-outro"><div className="g620-wrap"><p>BE PART OF WHAT COMES NEXT.</p><h2>There is more than one way <em>to belong.</em></h2><Link href="/contact">CONTACT THE GALLASPY <span aria-hidden="true">→</span></Link></div></aside>
  </main>;
}
