import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "The Club | The Gallaspy Golf Club",
  description: "Discover the identity, purpose and emerging traditions of The Gallaspy Golf Club, a golf club being built through the game.",
};

const marks = [
  { name: "The Falcon", type: "The symbol", image: "/logos/official/falcon-G.png", alt: "Official Gallaspy Falcon G mark" },
  { name: "The Crest", type: "The club crest", image: "/logos/official/crest.png", alt: "Official Gallaspy club crest" },
  { name: "The Script", type: "The signature", image: "/logos/official/Gallaspy-Script.png", alt: "Official Gallaspy script logo" },
];

export default function TheClubPage() {
  return (
    <main className="g625-page g625-club">
      <section className="g625-club-hero">
        <div className="g625-container g625-club-hero-grid">
          <div className="g625-club-hero-copy">
            <p className="g625-eyebrow g625-on-dark">THE GALLASPY GOLF CLUB <span> / </span> EST. 2026</p>
            <h1>BUILT THROUGH <em>THE GAME.</em></h1>
            <p className="g625-lede">A golf club being built through the game, the people who play it, and the traditions created along the way.</p>
            <div className="g625-hero-actions">
              <Link className="g625-button g625-button-light" href="/play">Discover the game <span aria-hidden="true">→</span></Link>
              <Link className="g625-text-link g625-on-dark" href="/why-the-gallaspy">Read our story <span aria-hidden="true">→</span></Link>
            </div>
            <div className="g625-hero-foot"><span>METRO ATLANTA, GEORGIA</span><span>THE BEGINNING OF SOMETHING LASTING</span></div>
          </div>
          <div className="g625-club-mark-panel">
            <span className="g625-panel-top">01 / OUR IDENTITY</span>
            <Image src="/logos/official/crest.png" width={540} height={540} alt="Official Gallaspy Golf Club crest" priority className="g625-club-hero-crest" />
            <p>PLAY. COMPETE. GATHER.</p>
          </div>
        </div>
      </section>

      <section className="g625-section g625-club-intro">
        <div className="g625-container g625-split">
          <div><p className="g625-eyebrow">01 / THE CLUB</p><h2>NOT INHERITED. <em>CREATED.</em></h2></div>
          <div className="g625-copy-column"><p className="g625-emphasis">The Gallaspy begins with a shared belief: a club is more than a place.</p><p>The rounds, the rivalries, the friendships, and the moments worth remembering are what give a club its meaning. Our story starts with the golfers who choose to be part of it now.</p><p>We are building the identity and community today, with the long-term vision of a permanent Gallaspy Golf & Country Club in the future. We do not yet operate our own course.</p><Link href="/why-the-gallaspy" className="g625-text-link">The story behind the club <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>

      <section className="g625-club-pillars">
        <div className="g625-container">
          <div className="g625-section-top"><p className="g625-eyebrow g625-on-dark">02 / WHAT BRINGS US TOGETHER</p><p>THREE WAYS TO BE PART OF THE STORY</p></div>
          <div className="g625-pillars-grid">
            <article><span>01</span><h3>PLAY.</h3><p>Golf rounds, range nights, and the opportunity to meet people through the game—whether you are a member or simply getting started with the Gallaspy community.</p><Link href="/play">Explore play <span aria-hidden="true">→</span></Link></article>
            <article><span>02</span><h3>COMPETE.</h3><p>The Gallaspy Championship and The Gallaspy Cup create the beginnings of a lasting competition history.</p><Link href="/events">Explore events <span aria-hidden="true">→</span></Link></article>
            <article><span>03</span><h3>GATHER.</h3><p>Shared experiences, relationships and traditions that reach beyond the scorecard.</p><Link href="/calendar">Club calendar <span aria-hidden="true">→</span></Link></article>
          </div>
        </div>
      </section>

      <section className="g625-section g625-marks">
        <div className="g625-container">
          <div className="g625-marks-heading"><div><p className="g625-eyebrow">03 / THE MARKS</p><h2>THREE MARKS. <em>ONE CLUB.</em></h2></div><p>Each mark carries a different expression of the same identity. These are our original, official club assets.</p></div>
          <div className="g625-marks-grid">{marks.map((mark, i) => <article key={mark.name}><div className="g625-mark-top"><span>{String(i + 1).padStart(2, "0")}</span><span>{mark.type}</span></div><div className="g625-mark-image"><Image src={mark.image} alt={mark.alt} width={450} height={300} className="g625-mark-asset" /></div><h3>{mark.name}</h3></article>)}</div>
        </div>
      </section>

      <section className="g625-club-outro"><div className="g625-container g625-outro-inner"><div><p className="g625-eyebrow g625-on-dark">04 / THE NEXT CHAPTER</p><h2>THE HISTORY <em>STARTS HERE.</em></h2><p>There's a place for every golfer in the story we're building.</p></div><Link href="/membership" className="g625-button g625-button-light">Explore membership <span aria-hidden="true">→</span></Link></div></section>
    </main>
  );
}
