"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const sections = [
  { label: "The Club", href: "/the-club", links: [
    { label: "Club Identity", href: "/the-club" },
    { label: "Our Story", href: "/why-the-gallaspy" },
    { label: "Traditions", href: "/traditions" },
    { label: "Club Calendar", href: "/calendar" },
    { label: "Membership", href: "/membership" },
  ] },
  { label: "Play", href: "/play", links: [
    { label: "Play With The Gallaspy", href: "/play" },
    { label: "Gallaspy Rounds", href: "/rounds" },
    { label: "Host a Round", href: "/host-a-round" },
    { label: "Register For A Round", href: "/rounds/register" },
  ] },
  { label: "Events", href: "/events", links: [
    { label: "THE GALLASPY™", href: "/the-gallaspy" },
    { label: "Player Registration", href: "/invitational/register" },
    { label: "Sponsors & Vendors", href: "/invitational/sponsors" },
    { label: "The Gallaspy Cup™ · Oct 23, 2027", href: "/gallaspy-cup" },
    { label: "Night at the Nest · Year-End Gala", href: "/night-at-the-nest" },
  ] },
  { label: "The Pro Shop", href: "/apparel", links: [] },
  { label: "Connect", href: "/contact", links: [
    { label: "Contact The Club", href: "/contact" },
    { label: "Community", href: "/community" },
    { label: "Partner With Us", href: "/invitational/sponsors" },
    { label: "Falcon Society", href: "/falcon-society" },
  ] },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [bagCount, setBagCount] = useState(0);
  useEffect(() => { setOpen(false); setExpanded(null); }, [pathname]);
  useEffect(() => {
    const update = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("gallaspy-cart") || "[]");
        setBagCount(Array.isArray(cart) ? cart.reduce((n: number, item: { quantity?: number }) => n + (Number(item.quantity) || 0), 0) : 0);
      } catch { setBagCount(0); }
    };
    update();
    window.addEventListener("gallaspy-cart-updated", update);
    window.addEventListener("storage", update);
    return () => { window.removeEventListener("gallaspy-cart-updated", update); window.removeEventListener("storage", update); };
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <header className="gsite-header">
      <div className="gsite-header-inner">
        <Link href="/" className="gsite-logo" aria-label="The Gallaspy Golf Club home">
          <Image src="/logos/official/falcon-G.png" alt="" width={52} height={52} priority className="gsite-logo-image" />
          <span className="gsite-wordmark"><strong>THE GALLASPY</strong><small>GOLF CLUB · EST. 2026</small></span>
        </Link>
        <nav className="gsite-desktop-nav" aria-label="Primary navigation">
          {sections.map(item => (
            <div className="gsite-nav-group" key={item.label}>
              <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>
              {item.links.length > 0 && <div className="gsite-dropdown"><div className="gsite-dropdown-inner">{item.links.map(child => <Link key={`${child.label}-${child.href}`} href={child.href}>{child.label}<span aria-hidden="true">↗</span></Link>)}</div></div>}
            </div>
          ))}
        </nav>
        <div className="gsite-header-actions">
          <Link className="gsite-header-account" href="/my-gallaspy">My Gallaspy</Link>
          <Link className="gsite-header-bag" href="/apparel/bag" aria-label={`Shopping bag, ${bagCount} items`}>Bag <span>{bagCount}</span></Link>
          <button type="button" className="gsite-menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="gsite-mobile-menu"><span /><span /><span /></button>
        </div>
      </div>
      <nav id="gsite-mobile-menu" className={`gsite-mobile-menu ${open ? "is-open" : ""}`} aria-label="Mobile navigation" aria-hidden={!open}>
        <div className="gsite-mobile-links">
          {sections.map(item => <div className="gsite-mobile-group" key={item.label}>
            <div className="gsite-mobile-heading"><Link href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>{item.links.length > 0 && <button type="button" aria-label={`Toggle ${item.label} menu`} aria-expanded={expanded === item.label} onClick={() => setExpanded(expanded === item.label ? null : item.label)}>{expanded === item.label ? "−" : "+"}</button>}</div>
            {expanded === item.label && <div className="gsite-mobile-submenu">{item.links.map(child => <Link key={`${child.label}-${child.href}`} href={child.href} onClick={() => setOpen(false)}>{child.label}</Link>)}</div>}
          </div>)}
          <Link className="gsite-mobile-account" href="/my-gallaspy" onClick={() => setOpen(false)}>My Gallaspy ↗</Link>
        </div>
      </nav>
    </header>
  );
}
