"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigation = [
  {
    title: "The Club",
    href: "/the-club",
    children: [
      { title: "Club Identity", href: "/the-club" },
      { title: "Traditions", href: "/traditions" },
      { title: "Founding Community", href: "/falcon-society" },
      { title: "Club Calendar", href: "/calendar" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Play",
    href: "/play",
    children: [
      { title: "Play With The Gallaspy", href: "/play" },
      { title: "Gallaspy Rounds", href: "/rounds" },
      { title: "Upcoming Play", href: "/calendar" },
    ],
  },
  {
    title: "Compete",
    href: "/invitational",
    children: [
      { title: "The Gallaspy Invitational", href: "/invitational" },
      { title: "The Mercury Match", href: "/mercury-match" },
    ],
  },
  {
    title: "Apparel",
    href: "/apparel",
  },
  {
    title: "Our Story",
    href: "/why-the-gallaspy",
  },
  {
    title: "Start Here",
    href: "/start-here",
  },
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
  const [bagCount, setBagCount] = useState(0);

  useEffect(() => {
    const updateBagCount = () => {
      try {
        const cart = JSON.parse(
          localStorage.getItem("gallaspy-cart") || "[]",
        );

        const count = cart.reduce(
          (
            total: number,
            item: { quantity?: number },
          ) => total + (item.quantity || 0),
          0,
        );

        setBagCount(count);
      } catch {
        setBagCount(0);
      }
    };

    updateBagCount();

    window.addEventListener(
      "gallaspy-cart-updated",
      updateBagCount,
    );

    window.addEventListener("storage", updateBagCount);

    return () => {
      window.removeEventListener(
        "gallaspy-cart-updated",
        updateBagCount,
      );

      window.removeEventListener("storage", updateBagCount);
    };
  }, []);

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
            className="hidden items-center gap-4 xl:flex 2xl:gap-6"
          >
            {navigation.map((item) => {
              const childActive = item.children?.some((child) =>
                isRouteActive(pathname, child.href),
              );

              const active =
                isRouteActive(pathname, item.href) || Boolean(childActive);

              if (item.children) {
                return (
                  <div
                    key={item.href}
                    className="group/nav relative flex h-[82px] items-center"
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={[
                        "relative flex h-[82px] items-center gap-1.5 whitespace-nowrap",
                        "text-[9px] font-semibold uppercase tracking-[0.16em]",
                        "transition-colors duration-300",
                        active
                          ? "text-white"
                          : "text-[#FFD76A] hover:text-white",
                      ].join(" ")}
                    >
                      {item.title}

                      <span
                        aria-hidden="true"
                        className="relative -top-px text-[8px] transition-transform duration-300 group-hover/nav:rotate-180"
                      >
                        ▾
                      </span>

                      <span
                        className={[
                          "absolute inset-x-0 bottom-[17px] h-px origin-left bg-[#FFD76A]",
                          "transition-transform duration-300",
                          active
                            ? "scale-x-100"
                            : "scale-x-0 group-hover/nav:scale-x-100",
                        ].join(" ")}
                      />
                    </Link>

                    <div className="invisible absolute left-1/2 top-[72px] z-50 w-[270px] -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100">
                      <div className="border border-white/10 bg-[#10263F] p-2 shadow-[0_24px_70px_rgba(0,0,0,0.32)]">
                        <div className="border border-white/[0.06]">
                          {item.children.map((child) => {
                            const childIsActive = isRouteActive(
                              pathname,
                              child.href,
                            );

                            return (
                              <Link
                                key={`${item.title}-${child.title}`}
                                href={child.href}
                                className={[
                                  "group/item flex items-center justify-between border-b border-white/[0.07] px-5 py-4 last:border-b-0",
                                  "transition-colors duration-200 hover:bg-white/[0.05]",
                                  childIsActive
                                    ? "bg-white/[0.05]"
                                    : "",
                                ].join(" ")}
                              >
                                <span
                                  className={[
                                    "text-[9px] font-semibold uppercase tracking-[0.16em]",
                                    childIsActive
                                      ? "text-[#FFD76A]"
                                      : "text-white/75 group-hover/item:text-white",
                                  ].join(" ")}
                                >
                                  {child.title}
                                </span>

                                <span className="text-[11px] text-[#FFD76A] opacity-60 transition-transform duration-200 group-hover/item:translate-x-1 group-hover/item:opacity-100">
                                  →
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

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
              href="/apparel/bag"
              aria-label={`Shopping bag with ${bagCount} items`}
              className="group relative ml-1 inline-flex min-h-[42px] items-center gap-2 px-2 text-[8px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:text-[#FFD76A]"
            >
              <span>Bag</span>

              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#B3262D] px-1.5 text-[7px] font-black text-white">
                {bagCount}
              </span>
            </Link>

            <Link
              href="/play"
              className="ml-1 inline-flex min-h-[42px] items-center justify-center border border-[#FFD76A] bg-[#FFD76A] px-4 text-[8px] font-semibold uppercase tracking-[0.17em] text-[#10263F] transition-all duration-300 hover:-translate-y-0.5 hover:bg-transparent hover:text-white 2xl:px-5"
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
          "fixed inset-0 z-40 overflow-y-auto overscroll-y-contain touch-pan-y bg-[#10263F] xl:hidden",
          "transition-all duration-500 ease-out",
          isMobileOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0",
        ].join(" ")}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,145,70,0.14),transparent_35%)]" />

        <div className="relative flex min-h-[100svh] flex-col px-6 pb-[calc(2.5rem+env(safe-area-inset-bottom))] pt-[112px] sm:px-10">
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
              const childActive = item.children?.some((child) =>
                isRouteActive(pathname, child.href),
              );

              const active =
                isRouteActive(pathname, item.href) || Boolean(childActive);

              if (item.children) {
                return (
                  <div
                    key={item.href}
                    className="border-b border-white/10 py-5"
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className={[
                          "font-serif text-[1.9rem] font-light tracking-[-0.02em] transition-colors sm:text-[2.2rem]",
                          active
                            ? "text-[#FFD76A]"
                            : "text-white hover:text-[#FFD76A]",
                        ].join(" ")}
                      >
                        {item.title}
                      </Link>

                      <span className="text-[8px] font-semibold tracking-[0.2em] text-white/25">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-x-6">
                      {item.children.map((child) => {
                        const childIsActive = isRouteActive(
                          pathname,
                          child.href,
                        );

                        return (
                          <Link
                            key={`${item.title}-${child.title}`}
                            href={child.href}
                            onClick={closeMenu}
                            className={[
                              "flex min-h-[38px] items-center justify-between py-1",
                              "text-[8px] font-semibold uppercase tracking-[0.18em]",
                              "transition-colors duration-200",
                              childIsActive
                                ? "text-[#FFD76A]"
                                : "text-white/50 hover:text-white",
                            ].join(" ")}
                          >
                            <span>{child.title}</span>
                            <span className="ml-3 text-[#FFD76A]/60">→</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

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
                      "font-serif text-[1.9rem] font-light tracking-[-0.02em] transition-colors sm:text-[2.2rem]",
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

          <Link
            href="/apparel/bag"
            onClick={closeMenu}
            className="mt-6 flex items-center justify-between border border-[#FFD76A]/35 bg-white/[0.03] px-5 py-4"
          >
            <div>
              <p className="text-[7px] font-semibold uppercase tracking-[0.3em] text-[#FFD76A]">
                The Gallaspy Apparel
              </p>

              <p className="mt-1 font-serif text-[1.7rem] font-light text-white">
                Your Bag
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-[#B3262D] px-2 text-[8px] font-black text-white">
                {bagCount}
              </span>

              <span className="text-lg text-[#FFD76A]">
                →
              </span>
            </div>
          </Link>

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
