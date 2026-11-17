import Image from "next/image";
import Link from "next/link";

const groups = [
  { title: "Club", links: [["About The Club", "/the-club"], ["Our Story", "/why-the-gallaspy"], ["Traditions", "/traditions"], ["Membership", "/membership"], ["My Gallaspy", "/my-gallaspy"]] },
  { title: "Golf & Events", links: [["Upcoming Rounds", "/rounds"], ["Host a Round", "/host-a-round"], ["Club Calendar", "/calendar"], ["THE GALLASPY™", "/the-gallaspy"], ["The Gallaspy Cup™", "/gallaspy-cup"], ["Player Registration", "/invitational/register"], ["Night at the Nest", "/night-at-the-nest"]] },
  { title: "Discover", links: [["The Pro Shop", "/apparel"], ["Community", "/community"], ["Sponsors & Vendors", "/invitational/sponsors"], ["Falcon Society", "/falcon-society"], ["Contact", "/contact"]] },
];

export default function Footer() {
  return <footer className="gsite-footer">
    <div className="gsite-footer-intro"><div className="gsite-wrap gsite-footer-intro-grid">
      <div><span className="gsite-kicker">THE GALLASPY GOLF CLUB</span><h2>Some inherit history. <em>Others create it.</em></h2></div>
      <div><p>A golf club being built through the game, the people who play it, and the traditions created along the way.</p><Link className="gsite-button gsite-button-light" href="/rounds">Explore Upcoming Rounds <span>↗</span></Link></div>
    </div></div>
    <div className="gsite-wrap gsite-footer-main">
      <div className="gsite-footer-brand"><Link href="/" aria-label="Gallaspy home"><Image src="/logos/official/falcon-G.png" alt="Official Gallaspy Falcon G" width={78} height={78} /></Link><strong>THE GALLASPY™</strong><span>GOLF CLUB · GEORGIA</span><a href="https://www.instagram.com/thegallaspy" target="_blank" rel="noopener noreferrer">Instagram · @thegallaspy ↗</a></div>
      {groups.map(group => <div className="gsite-footer-column" key={group.title}><h3>{group.title}</h3>{group.links.map(([label,href]) => <Link key={`${label}-${href}`} href={href}>{label}</Link>)}</div>)}
    </div>
    <div className="gsite-wrap gsite-footer-bottom"><span>© {new Date().getFullYear()} The Gallaspy Golf Club · Operated by The Gallaspy Development Group, LLC</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><a href="mailto:info@thegallaspy.com">info@thegallaspy.com</a></div></div>
  </footer>;
}
