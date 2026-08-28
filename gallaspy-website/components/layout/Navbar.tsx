"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigation = [
  { title: "The Club", href: "/the-club" },
  { title: "Play", href: "/play" },
  { title: "Invitational", href: "/invitational" },
  { title: "Traditions", href: "/traditions" },
  { title: "Apparel", href: "/apparel" },
  { title: "Our Story", href: "/why-the-gallaspy" },
  { title: "Contact", href: "/contact" },
];

function isRouteActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);
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
    const closeMenu = window.setTimeout(() => {
      setIsMobileOpen(false);
    }, 0);

    return () => {
      window.clearTimeout(closeMenu);
    };
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
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeMenu = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 w-full",
          "transition-all duration-500 ease-out",
          isScrolled
            ? "border-b border-white/10 bg-[#10263F]/96 shadow-[0_12px_40px_rgba(4,17,31,0.22)] backdrop-blur-xl"
            : "border-b border-white/[0.06] bg-[#10263F]/88 backdrop-blur-md",
        ].join(" ")}
      >
        <div className="mx-auto flex h-[82px] w-full max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-10">
          {/* BRAND */}
          <Link
            href="/"
            onClick={closeMenu}
            aria-label="The Gallaspy Golf Club home"
            className="group flex shrink-0 items-center gap-3 outline-none"
          >
            <div className="relative h-[54px] w-[54px] sm:h-[58px] sm:w-[58px]">
              <Image
                src="/logos/crest.png"
                alt="The Gallaspy crest"
                fill
                priority
                sizes="58px"
                className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>

            <div className="hidden flex-col sm:flex">
              <span className="font-serif text-[18px] font-light leading-none tracking-[0.02em] text-white">
                The Gallaspy
              </span>

              <span className="mt-1 text-[7px] font-semibold uppercase tracking-[0.32em] text-[#FFD76A]">
                Golf Club
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-5 xl:flex 2xl:gap-7"
          >
            {navigation.map((item) => {
              const active = isRouteActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "group relative flex h-[82px] items-center whitespace-nowrap",
                    "text-[9px] font-semibold uppercase tracking-[0.16em]",
                    "transition-colors duration-300",
                    active
                      ? "text-white"
                      : "text-[#FFD76A] hover:text-white",
                  ].join(" ")}
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
              href="/play"
              className="ml-2 inline-flex min-h-[42px] items-center justify-center border border-[#FFD76A] bg-[#FFD76A] px-5 text-[8px] font-semibold uppercase tracking-[0.19em] text-[#10263F] transition-all duration-300 hover:-translate-y-0.5 hover:bg-transparent hover:text-white 2xl:px-6 2xl:text-[9px]"
            >
              Play With Us
            </Link>
          </nav>

          {/* MOBILE BUTTON */}
          <button
            type="button"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
            onClick={() => setIsMobileOpen((current) => !current)}
            className="relative flex h-11 w-11 items-center justify-center xl:hidden"
          >
            <span className="sr-only">
              {isMobileOpen ? "Close navigation" : "Open navigation"}
            </span>

            <div className="relative h-5 w-7">
              <span
                className={`absolute left-0 top-[2px] h-px w-7 bg-[#FFD76A] transition-all duration-300 ${
                  isMobileOpen
                    ? "top-[10px] rotate-45"
                    : ""
                }`}
              />

              <span
                className={`absolute left-0 top-[10px] h-px bg-[#FFD76A] transition-all duration-300 ${
                  isMobileOpen
                    ? "w-0 opacity-0"
                    : "w-5 opacity-100"
                }`}
              />

              <span
                className={`absolute bottom-[2px] left-0 h-px w-7 bg-[#FFD76A] transition-all duration-300 ${
                  isMobileOpen
                    ? "bottom-[9px] -rotate-45"
                    : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={[
          "fixed inset-0 z-40 bg-[#10263F] xl:hidden",
          "transition-all duration-500 ease-out",
          isMobileOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0",
        ].join(" ")}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,145,70,0.14),transparent_35%)]" />

        <div className="relative flex min-h-[100svh] flex-col px-6 pb-10 pt-[112px] sm:px-10">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-10 bg-[#FFD76A]" />

            <p className="text-[8px] font-semibold uppercase tracking-[0.32em] text-[#FFD76A]">
              The Gallaspy Golf Club
            </p>
          </div>

          <nav
            aria-label="Mobile navigation"
            className="flex flex-col"
          >
            {navigation.map((item, index) => {
              const active = isRouteActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={active ? "page" : undefined}
                  className="group flex items-center justify-between border-b border-white/10 py-4"
                >
                  <span
                    className={[
                      "font-serif text-[2rem] font-light tracking-[-0.02em] transition-colors duration-300 sm:text-[2.5rem]",
                      active
                        ? "text-[#FFD76A]"
                        : "text-white group-hover:text-[#FFD76A]",
                    ].join(" ")}
                  >
                    {item.title}
                  </span>

                  <div className="flex items-center gap-4">
                    <span className="text-[8px] font-semibold tracking-[0.2em] text-white/25">
                      0{index + 1}
                    </span>

                    <span className="text-lg text-[#FFD76A] transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-10">
            <Link
              href="/play"
              onClick={closeMenu}
              className="flex min-h-[54px] w-full items-center justify-center border border-[#FFD76A] bg-[#FFD76A] px-6 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#10263F]"
            >
              Play With The Gallaspy
            </Link>

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
              <p className="text-[7px] font-semibold uppercase tracking-[0.28em] text-white/35">
                Georgia · Est. 2026
              </p>

              <Image
                src="/logos/falcon.png"
                alt=""
                width={42}
                height={42}
                className="h-9 w-9 object-contain opacity-70"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
