import Link from "next/link";
import ContactForm from "@/components/forms/ContactForm";

export const metadata = {
  title: "Night at the Nest | The Gallaspy Golf Club",
  description: "Explore Night at the Nest, The Gallaspy Golf Club end-of-year gala, including honors, charitable relationships, table sponsorships and participation inquiries.",
};

const areas = [
  {number:"01",name:"Awards & recognition",detail:"Recognizing the people, performances and contributions that shaped the year."},
  {number:"02",name:"Charitable partnerships",detail:"A place for mission-aligned charitable organizations to start a conversation. Beneficiaries and initiatives will be announced once confirmed."},
  {number:"03",name:"Table sponsorships",detail:"Explore opportunities to support the evening and gather with the Gallaspy community."},
  {number:"04",name:"Vendors & collaborators",detail:"Hospitality, production and event collaborators can introduce their services and proposals."},
  {number:"05",name:"RSVP interest",detail:"Register your interest in attending. Formal invitations, ticketing, and capacity details will be shared when released."},
];

export default function NightAtTheNest() {
  return <main className="g616-interior g3-gala-page">
    <section className="g3-gala-hero"><div className="g2-container">
      <div className="g3-gala-topline"><span>THE GALLASPY GOLF CLUB</span><span>END-OF-YEAR GALA · DECEMBER 11, 2027</span></div>
      <p className="g3-gala-eyebrow">AN EVENING OF TRADITION</p>
      <h1 className="g6-gala-screenreader">Night at the Nest</h1><img className="g6-gala-portal-logo" src="/images/nightatnest.png" alt="Night at the Nest — official event logo" />
      <p className="g3-gala-description">A gathering to honor the season, the people behind it, and the legacy being built. An evening for recognition, community, and connection.</p>
      <div className="g3-gala-hero-actions"><a href="#gala-inquiry">Inquire about the gala →</a><Link href="/calendar">Club calendar →</Link></div>
    </div></section>
    <section className="g3-gala-body"><div className="g2-container"><div className="g3-section-intro"><p>THE EVENING</p><h2>Celebrate what<br/><em>brings us together.</em></h2></div><div className="g3-gala-areas">{areas.map(a=><article key={a.number}><small>{a.number} / THE NEST</small><h3>{a.name}</h3><p>{a.detail}</p></article>)}</div></div></section>
    <section id="gala-inquiry" className="g3-gala-inquiry"><div className="g2-container g3-gala-inquiry-grid"><div><span>CONNECT WITH THE GALLASPY</span><h2>Be part of<br/><em>the evening.</em></h2><p>Use the form to inquire about RSVP interest, charity partnerships, awards, table sponsorships or vendors. Choose the appropriate Night at the Nest category so our team can respond.</p><p className="g3-inquiry-note">Submitting this form is an inquiry, not a confirmed RSVP, purchased table, or awarded sponsorship.</p></div><ContactForm/></div></section>
  </main>;
}
