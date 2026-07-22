"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const clubLinks = [
  { label: "Golf", href: "/club#golf" },
  { label: "Tennis", href: "/club#tennis" },
  { label: "Wellness", href: "/club#wellness" },
  { label: "Events", href: "/club#events" },
  { label: "Restaurants", href: "/club#restaurants" },
  { label: "Vineyard", href: "/club#vineyard" },
];

const primaryLinks = [
  { label: "Why the Gallaspy?", href: "/why-the-gallaspy" },
  { label: "Founding 250", href: "/founding-250" },
  { label: "Membership", href: "/membership" },
  { label: "Invest", href: "/investment" },
  { label: "Founder’s Letter", href: "/founders-letter" },
];

export function Navbar() {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isClubOpen, setIsClubOpen] = useState(false);
  const [isMobileClubOpen, setIsMobileClubOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsClubOpen(false);
    setIsMobileClubOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const headerIsSolid = isScrolled || isMobileOpen;

  const isActive = (href: string) => {
    const basePath = href.split("#")[0];

    if (basePath === "/") {
      return pathname === "/";
    }

    return pathname === basePath;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto transition-all duration-500 ease-out ${
          headerIsSolid
            ? "max-w-[1360px] px-3 pt-3 sm:px-5 sm:pt-4"
            : "max-w-none px-0 pt-0"
        }`}
      >
        <div
          className={`relative flex items-center justify-between border transition-all duration-500 ease-out ${
            headerIsSolid
              ? "h-[68px] rounded-[18px] border-white/10 bg-[#10263F]/92 px-4 shadow-[0_18px_55px_rgba(4,15,28,0.22)] backdrop-blur-2xl sm:h-[72px] sm:px-6 lg:h-[76px] lg:px-8"
              : "h-[76px] rounded-none border-transparent bg-gradient-to-b from-[#071827]/65 to-transparent px-5 sm:h-[82px] sm:px-8 lg:h-[88px] lg:px-10"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="The Gallaspy Golf and Country Club home"
            className="relative z-50 flex shrink-0 items-center"
          >
            <div
              className={`relative transition-all duration-500 ${
                headerIsSolid
                  ? "h-11 w-[152px] sm:h-12 sm:w-[166px]"
                  : "h-12 w-[164px] sm:h-14 sm:w-[188px]"
              }`}
            >
              <Image
                src="/logos/logo.png"
                alt="The Gallaspy Golf and Country Club"
                fill
                priority
                sizes="188px"
                className="object-contain object-left brightness-0 invert"
              />
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-6 lg:flex xl:gap-8"
          >
            {/* The Club dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsClubOpen(true)}
              onMouseLeave={() => setIsClubOpen(false)}
            >
              <button
                type="button"
                aria-expanded={isClubOpen}
                aria-haspopup="true"
                onClick={() => setIsClubOpen((current) => !current)}
                className="group relative flex items-center gap-2 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:text-[#FFD76A]"
              >
                <span>The Club</span>

                <svg
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${
                    isClubOpen ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M5.5 7.5 10 12l4.5-4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.6"
                  />
                </svg>

                <span
                  className={`absolute bottom-[15px] left-1/2 h-px -translate-x-1/2 bg-[#FFD76A] transition-all duration-300 ${
                    isClubOpen ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </button>

              <div
                className={`absolute left-1/2 top-[62px] w-[270px] -translate-x-1/2 transition-all duration-300 ease-out ${
                  isClubOpen
                    ? "visible translate-y-0 scale-100 opacity-100"
                    : "invisible -translate-y-3 scale-[0.97] opacity-0"
                }`}
              >
                <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[#10263F]/96 p-2.5 shadow-[0_28px_75px_rgba(4,15,28,0.32)] backdrop-blur-2xl">
                  <Link
                    href="/club"
                    className="block rounded-[14px] px-4 py-4 font-serif text-[22px] font-light text-white transition duration-300 hover:bg-white/[0.07] hover:text-[#FFD76A]"
                  >
                    Explore The Club
                  </Link>

                  <div className="mx-4 my-1 h-px bg-white/10" />

                  <div className="py-1">
                    {clubLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="group flex items-center justify-between rounded-[12px] px-4 py-3 text-[9px] font-bold uppercase tracking-[0.18em] text-white/75 transition duration-300 hover:bg-white/[0.06] hover:text-[#FFD76A]"
                      >
                        <span>{link.label}</span>

                        <span className="translate-x-0 text-[#FFD76A]/70 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main links */}
            {primaryLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`group relative py-6 text-[9px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                    active
                      ? "text-[#FFD76A]"
                      : "text-white hover:text-[#FFD76A]"
                  }`}
                >
                  {link.label}

                  <span
                    className={`absolute bottom-[15px] left-1/2 h-px -translate-x-1/2 bg-[#FFD76A] transition-all duration-300 ${
                      active
                        ? "w-full opacity-100"
                        : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
                    {/* Mobile menu button */}
          <button
            type="button"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
            onClick={() => setIsMobileOpen((current) => !current)}
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/[0.04] text-white backdrop-blur-md transition duration-300 hover:border-[#FFD76A]/70 hover:text-[#FFD76A] lg:hidden"
          >
            <span className="sr-only">
              {isMobileOpen ? "Close menu" : "Open menu"}
            </span>

            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 block h-px w-5 bg-current transition-all duration-300 ${
                  isMobileOpen ? "top-[7px] rotate-45" : ""
                }`}
              />

              <span
                className={`absolute left-0 top-[7px] block h-px w-5 bg-current transition-all duration-300 ${
                  isMobileOpen ? "opacity-0" : "opacity-100"
                }`}
              />

              <span
                className={`absolute left-0 top-[14px] block h-px w-5 bg-current transition-all duration-300 ${
                  isMobileOpen ? "top-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        className={`fixed inset-0 z-40 bg-[#10263F] transition-all duration-500 ease-out lg:hidden ${
          isMobileOpen
            ? "visible translate-x-0 opacity-100"
            : "invisible translate-x-full opacity-0"
        }`}
      >
        {/* Background image */}
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          sizes="100vw"
          aria-hidden="true"
          className="object-cover object-center opacity-[0.08]"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-[#10263F]/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#10263F]/70 via-[#10263F]/95 to-[#071827]" />

        <nav
          aria-label="Mobile navigation"
          className="relative z-10 h-full overflow-y-auto px-5 pb-10 pt-[108px] sm:px-8 sm:pt-[118px]"
        >
          <div className="mx-auto w-full max-w-xl">
            <p className="mb-7 text-[9px] font-bold uppercase tracking-[0.36em] text-[#FFD76A]">
              Private Club Navigation
            </p>

            {/* Mobile Club accordion */}
            <div className="border-b border-white/12">
              <button
                type="button"
                aria-expanded={isMobileClubOpen}
                onClick={() =>
                  setIsMobileClubOpen((current) => !current)
                }
                className="flex w-full items-center justify-between py-5 text-left"
              >
                <span className="font-serif text-3xl font-light text-white sm:text-4xl">
                  The Club
                </span>

                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#FFD76A]/50 text-lg font-light text-[#FFD76A] transition-transform duration-300 ${
                    isMobileClubOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              <div
                className={`grid overflow-hidden transition-all duration-500 ${
                  isMobileClubOpen
                    ? "grid-rows-[1fr] pb-6"
                    : "grid-rows-[0fr]"
                }`}
              >
                <div className="min-h-0">
                  <Link
                    href="/club"
                    className="mb-2 block py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFD76A]"
                  >
                    Explore The Club
                  </Link>

                  <div className="grid grid-cols-2 gap-x-5">
                    {clubLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="border-b border-white/10 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70 transition hover:text-[#FFD76A]"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>            {/* Primary mobile links */}
            {primaryLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`group flex items-center justify-between border-b border-white/12 py-5 font-serif text-3xl font-light transition sm:text-4xl ${
                  isActive(link.href)
                    ? "text-[#FFD76A]"
                    : "text-white hover:text-[#FFD76A]"
                }`}
              >
                <span>{link.label}</span>

                <span className="text-base font-light text-[#FFD76A]/60 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}

            {/* Mobile CTA card */}
            <div className="relative mt-9 overflow-hidden rounded-[22px] border border-[#FFD76A]/25 bg-white/[0.06] p-6 text-white shadow-[0_20px_55px_rgba(0,0,0,0.2)] backdrop-blur-md sm:p-7">
              <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-[#FFD76A]/10 blur-3xl" />

              <p className="relative text-[9px] font-bold uppercase tracking-[0.3em] text-[#FFD76A]">
                A Legacy in the Making
              </p>

              <p className="relative mt-4 max-w-md font-serif text-2xl font-light leading-snug sm:text-3xl">
                Championship golf, private-club living, and a vision built for
                generations.
              </p>

              <Link
                href="/contact"
                className="relative mt-7 inline-flex min-h-[48px] items-center justify-center border border-[#FFD76A] bg-[#FFD76A] px-7 text-[9px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition duration-300 hover:bg-transparent hover:text-white"
              >
                Contact The Gallaspy
                <span className="ml-3">→</span>
              </Link>
            </div>

            <p className="mt-8 text-center text-[8px] font-semibold uppercase tracking-[0.26em] text-white/35">
              Tradition · Family · Excellence
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}