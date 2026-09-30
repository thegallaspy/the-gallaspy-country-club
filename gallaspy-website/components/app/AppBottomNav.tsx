"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const items = [
  {
    label: "Home",
    href: "/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M3.5 10.5 12 3.5l8.5 7" />
        <path d="M5.5 9.5V21h13V9.5" />
      </svg>
    ),
  },
  {
    label: "Rounds",
    href: "/rounds",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5v9M7.5 12h9" />
      </svg>
    ),
  },
  {
    label: "Play",
    href: "/play",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M6 20 17.5 4" />
        <path d="M14.5 4h3v3" />
        <circle cx="6" cy="20" r="1.5" />
      </svg>
    ),
  },
  {
    label: "My Gallaspy",
    href: "/my-gallaspy",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5.5 20c.8-4 3-6 6.5-6s5.7 2 6.5 6" />
      </svg>
    ),
  },
];

function routeIsActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AppBottomNav() {
  const pathname = usePathname();
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in window.navigator &&
        (window.navigator as Navigator & { standalone?: boolean }).standalone === true);

    setIsStandalone(standalone);
  }, []);

  if (!isStandalone) return null;

  return (
    <>
      <div className="h-[78px] xl:hidden" aria-hidden="true" />

      <nav
        aria-label="App navigation"
        className="fixed inset-x-0 bottom-0 z-[70] border-t border-white/10 bg-[#10263F]/98 pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_35px_rgba(0,0,0,0.18)] backdrop-blur-xl xl:hidden"
      >
        <div className="mx-auto grid min-h-[68px] max-w-lg grid-cols-4">
          {items.map((item) => {
            const active = routeIsActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "relative flex min-h-[68px] flex-col items-center justify-center gap-1.5 px-1 transition-colors",
                  active ? "text-[#FFD76A]" : "text-white/55",
                ].join(" ")}
              >
                {active && (
                  <span className="absolute inset-x-5 top-0 h-px bg-[#FFD76A]" />
                )}

                {item.icon}

                <span className="text-[7px] font-black uppercase tracking-[0.14em]">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
