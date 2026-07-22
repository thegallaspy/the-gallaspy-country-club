"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const clubLinks = [
  { title: "Golf", href: "/the-club/golf" },
  { title: "Tennis", href: "/the-club/tennis" },
  { title: "Wellness", href: "/the-club/wellness" },
  { title: "Events", href: "/the-club/events" },
  { title: "Restaurant", href: "/the-club/restaurant" },
  { title: "Vineyard", href: "/the-club/vineyard" },
];

const primaryLinks = [
  { title: "Why the Gallaspy", href: "/why-the-gallaspy" },
  { title: "Master Plan", href: "/master-plan" },
  { title: "Founding 250", href: "/founding-250" },
  { title: "Membership", href: "/membership" },
  { title: "Invest", href: "/invest" },
  { title: "Founder’s Letter", href: "/founders-letter" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isClubOpen, setIsClubOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenus = () => {
    setIsMobileOpen(false);
    setIsClubOpen(false);
  };

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-white/10 bg-[#10263F]/95 shadow-lg backdrop-blur-md"
          : "bg-[#10263F]/90 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-[78px] w-full max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenus}
          aria-label="The Gallaspy Golf and Country Club home"
          className="flex shrink-0 items-center"
        >
          <Image
            src="/logos/logo.png"
            alt="The Gallaspy Golf and Country Club"
            width={60}
            height={60}
            priority
            className="h-[54px] w-[54px] object-contain sm:h-[58px] sm:w-[58px]"
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-4 xl:flex 2xl:gap-5">
          <div
            className="relative"
            onMouseEnter={() => setIsClubOpen(true)}
            onMouseLeave={() => setIsClubOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsClubOpen((current) => !current)}
              className="flex h-[78px] items-center gap-2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.17em] text-[#FFD76A] transition hover:text-white"
              aria-expanded={isClubOpen}
              aria-haspopup="true"
            >
              The Club

              <span
                className={`text-xs transition-transform duration-200 ${
                  isClubOpen ? "rotate-180" : ""
                }`}
              >
                ▾
              </span>
            </button>

            <div
              className={`absolute left-1/2 top-full w-60 -translate-x-1/2 pt-2 transition-all duration-200 ${
                isClubOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0"
              }`}
            >
              <div className="overflow-hidden rounded-xl border border-white/10 bg-[#10263F] p-2 shadow-2xl">
                {clubLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenus}
                    className="block rounded-lg px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/85 transition hover:bg-[#B89146] hover:text-white"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {primaryLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenus}
              className="flex h-[78px] items-center whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.14em] text-[#FFD76A] transition hover:text-white"
            >
              {item.title}
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={closeMenus}
            className="ml-1 inline-flex items-center justify-center rounded-full border border-[#FFD76A] bg-[#B89146] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-white hover:text-[#10263F]"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsMobileOpen((current) => !current)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FFD76A]/60 text-[#FFD76A] transition hover:bg-[#FFD76A] hover:text-[#10263F] xl:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileOpen}
        >
          <span className="relative h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-[2px] w-5 bg-current transition ${
                isMobileOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />

            <span
              className={`absolute left-0 top-[7px] h-[2px] w-5 bg-current transition ${
                isMobileOpen ? "opacity-0" : "opacity-100"
              }`}
            />

            <span
              className={`absolute left-0 top-[14px] h-[2px] w-5 bg-current transition ${
                isMobileOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile navigation */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-[#10263F] transition-all duration-300 xl:hidden ${
          isMobileOpen
            ? "max-h-[950px] opacity-100"
            : "max-h-0 border-t-transparent opacity-0"
        }`}
      >
        <nav className="mx-auto w-full max-w-3xl px-5 py-5 sm:px-8">
          <button
            type="button"
            onClick={() => setIsClubOpen((current) => !current)}
            className="flex w-full items-center justify-between border-b border-white/10 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FFD76A]"
          >
            The Club

            <span
              className={`transition-transform ${
                isClubOpen ? "rotate-180" : ""
              }`}
            >
              ▾
            </span>
          </button>

          <div
            className={`grid overflow-hidden transition-all duration-300 ${
              isClubOpen
                ? "max-h-96 py-2 opacity-100"
                : "max-h-0 py-0 opacity-0"
            }`}
          >
            {clubLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenus}
                className="rounded-lg px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80 transition hover:bg-white/10 hover:text-[#FFD76A]"
              >
                {item.title}
              </Link>
            ))}
          </div>

          {primaryLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenus}
              className="block border-b border-white/10 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FFD76A] transition hover:text-white"
            >
              {item.title}
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={closeMenus}
            className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-[#FFD76A] bg-[#B89146] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-[#10263F]"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;