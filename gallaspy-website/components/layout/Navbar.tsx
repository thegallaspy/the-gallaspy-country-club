"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const clubLinks = [
  { title: "Golf", href: "/club/golf" },
  { title: "Clubhouse", href: "/club/clubhouse" },
  { title: "Restaurant", href: "/club/restaurant" },
  { title: "Wellness", href: "/club/wellness" },
  { title: "Racquet", href: "/club/racquet" },
  { title: "Vineyard", href: "/club/vineyard" },
  { title: "Member Lodging", href: "/club/lodging" },
  { title: "Private Events", href: "/club/events" },
];

const primaryLinks = [
  { title: "Why the Gallaspy", href: "/why-the-gallaspy" },
  { title: "Master Plan", href: "/master-plan" },
  { title: "Founding 250", href: "/founding-250" },
  { title: "Membership", href: "/membership" },
  { title: "Invest", href: "/invest" },
  { title: "Founder’s Letter", href: "/founders-letter" },
];

function isRouteActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isClubOpen, setIsClubOpen] = useState(false);

  const isClubRoute = pathname === "/club" || pathname.startsWith("/club/");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsClubOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileOpen(false);
        setIsClubOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeMenus = () => {
    setIsMobileOpen(false);
    setIsClubOpen(false);
  };

  const navLinkClass = (active: boolean) =>
    [
      "group relative flex h-[82px] items-center whitespace-nowrap",
      "text-[10px] font-semibold uppercase tracking-[0.14em]",
      "transition-colors duration-300",
      active ? "text-white" : "text-[#FFD76A] hover:text-white",
    ].join(" ");

  return (
    <header
      ref={headerRef}
      className={[
        "fixed inset-x-0 top-0 z-50 w-full",
        "transition-all duration-500 ease-out",
        isScrolled
          ? "border-b border-white/10 bg-[#10263F]/95 shadow-[0_12px_40px_rgba(4,17,31,0.22)] backdrop-blur-xl"
          : "border-b border-white/[0.06] bg-[#10263F]/88 backdrop-blur-md",
      ].join(" ")}
    >
      <div className="mx-auto flex h-[82px] w-full max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          onClick={closeMenus}
          aria-label="The Gallaspy Golf and Country Club home"
          className="group flex shrink-0 items-center rounded-full outline-none transition focus-visible:ring-2 focus-visible:ring-[#FFD76A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#10263F]"
        >
          <Image
            src="/logos/logo.png"
            alt="The Gallaspy Golf and Country Club"
            width={66}
            height={66}
            priority
            className={[
              "object-contain transition-all duration-500",
              isScrolled
                ? "h-[56px] w-[56px] sm:h-[60px] sm:w-[60px]"
                : "h-[60px] w-[60px] sm:h-[64px] sm:w-[64px]",
              "group-hover:scale-[1.03]",
            ].join(" ")}
          />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-4 xl:flex 2xl:gap-5"
        >
          <div
            className="relative"
            onMouseEnter={() => setIsClubOpen(true)}
            onMouseLeave={() => setIsClubOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsClubOpen((current) => !current)}
              className={[
                navLinkClass(isClubRoute),
                "gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[#FFD76A]",
              ].join(" ")}
              aria-expanded={isClubOpen}
              aria-haspopup="true"
              aria-controls="desktop-club-menu"
            >
              The Club

              <span
                aria-hidden="true"
                className={`text-[11px] transition-transform duration-300 ${
                  isClubOpen ? "rotate-180" : ""
                }`}
              >
                ▾
              </span>

              <span
                className={[
                  "absolute inset-x-0 bottom-[17px] h-px origin-left bg-[#FFD76A]",
                  "transition-transform duration-300",
                  isClubRoute || isClubOpen
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100",
                ].join(" ")}
              />
            </button>

            <div
              id="desktop-club-menu"
              className={[
                "absolute left-1/2 top-full w-[290px] -translate-x-1/2 pt-3",
                "transition-all duration-250 ease-out",
                isClubOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0",
              ].join(" ")}
            >
              <div className="overflow-hidden rounded-[18px] border border-white/10 bg-[#10263F]/98 p-2.5 shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur-xl">
                <div className="grid grid-cols-2 gap-1">
                  {clubLinks.map((item) => {
                    const active = isRouteActive(pathname, item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMenus}
                        aria-current={active ? "page" : undefined}
                        className={[
                          "rounded-xl px-4 py-3.5",
                          "text-[9px] font-semibold uppercase tracking-[0.15em]",
                          "outline-none transition-all duration-250",
                          active
                            ? "bg-[#B89146] text-white"
                            : "text-white/82 hover:bg-white/[0.08] hover:text-[#FFD76A]",
                          "focus-visible:ring-2 focus-visible:ring-[#FFD76A]",
                        ].join(" ")}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {primaryLinks.map((item) => {
            const active = isRouteActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenus}
                aria-current={active ? "page" : undefined}
                className={navLinkClass(active)}
              >
                {item.title}

                <span
                  className={[
                    "absolute inset-x-0 bottom-[17px] h-px origin-left bg-[#FFD76A]",
                    "transition-transform duration-300",
                    active
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100",
                  ].join(" ")}
                />
              </Link>
            );
          })}

          <Link
            href="/contact"
            onClick={closeMenus}
            aria-current={
              isRouteActive(pathname, "/contact") ? "page" : undefined
            }
            className={[
              "ml-1 inline-flex min-h-[42px] items-center justify-center rounded-full",
              "border px-5 py-2.5",
              "text-[10px] font-semibold uppercase tracking-[0.16em]",
              "outline-none transition-all duration-300",
              isRouteActive(pathname, "/contact")
                ? "border-white bg-white text-[#10263F]"
                : "border-[#FFD76A] bg-[#B89146] text-white hover:-translate-y-0.5 hover:bg-white hover:text-[#10263F]",
              "focus-visible:ring-2 focus-visible:ring-[#FFD76A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#10263F]",
            ].join(" ")}
          >
            Contact
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setIsMobileOpen((current) => !current)}
          className={[
            "flex h-11 w-11 items-center justify-center rounded-full",
            "border border-[#FFD76A]/60 text-[#FFD76A]",
            "outline-none transition-all duration-300 xl:hidden",
            "hover:border-[#FFD76A] hover:bg-[#FFD76A] hover:text-[#10263F]",
            "focus-visible:ring-2 focus-visible:ring-[#FFD76A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#10263F]",
          ].join(" ")}
          aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-navigation"
        >
          <span className="relative h-4 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-5 bg-current transition-all duration-300 ${
                isMobileOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-[1.5px] w-5 bg-current transition-all duration-300 ${
                isMobileOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-[1.5px] w-5 bg-current transition-all duration-300 ${
                isMobileOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={[
          "overflow-hidden border-t bg-[#10263F]/98 backdrop-blur-xl",
          "transition-all duration-500 ease-out xl:hidden",
          isMobileOpen
            ? "max-h-[calc(100vh-82px)] border-white/10 opacity-100"
            : "max-h-0 border-transparent opacity-0",
        ].join(" ")}
      >
        <nav
          aria-label="Mobile navigation"
          className="mx-auto max-h-[calc(100vh-82px)] w-full max-w-3xl overflow-y-auto px-5 py-5 sm:px-8"
        >
          <button
            type="button"
            onClick={() => setIsClubOpen((current) => !current)}
            className={[
              "flex w-full items-center justify-between border-b border-white/10 py-4",
              "text-left text-[11px] font-semibold uppercase tracking-[0.18em]",
              isClubRoute ? "text-white" : "text-[#FFD76A]",
            ].join(" ")}
            aria-expanded={isClubOpen}
            aria-controls="mobile-club-menu"
          >
            The Club

            <span
              aria-hidden="true"
              className={`transition-transform duration-300 ${
                isClubOpen ? "rotate-180" : ""
              }`}
            >
              ▾
            </span>
          </button>

          <div
            id="mobile-club-menu"
            className={[
              "grid overflow-hidden transition-all duration-400 ease-out",
              isClubOpen
                ? "max-h-[620px] py-2 opacity-100"
                : "max-h-0 py-0 opacity-0",
            ].join(" ")}
          >
            {clubLinks.map((item) => {
              const active = isRouteActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenus}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "rounded-xl px-4 py-3.5",
                    "text-[10px] font-semibold uppercase tracking-[0.16em]",
                    "transition-all duration-250",
                    active
                      ? "bg-[#B89146] text-white"
                      : "text-white/80 hover:bg-white/[0.08] hover:text-[#FFD76A]",
                  ].join(" ")}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>

          {primaryLinks.map((item) => {
            const active = isRouteActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenus}
                aria-current={active ? "page" : undefined}
                className={[
                  "flex items-center justify-between border-b border-white/10 py-4",
                  "text-[11px] font-semibold uppercase tracking-[0.18em]",
                  "transition-colors duration-250",
                  active ? "text-white" : "text-[#FFD76A] hover:text-white",
                ].join(" ")}
              >
                {item.title}
                {active && (
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-[#FFD76A]"
                  />
                )}
              </Link>
            );
          })}

          <Link
            href="/contact"
            onClick={closeMenus}
            className="mt-6 inline-flex w-full min-h-[48px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#B89146] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-[#10263F]"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;