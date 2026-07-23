"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const clubLinks = [
  { label: "Overview", href: "/club" },
  { label: "Golf", href: "/club/golf" },
  { label: "Clubhouse", href: "/club/clubhouse" },
  { label: "Restaurant", href: "/club/restaurant" },
  { label: "Wellness", href: "/club/wellness" },
  { label: "Racquet", href: "/club/racquet" },
  { label: "Vineyard", href: "/club/vineyard" },
  { label: "Lodging", href: "/club/lodging" },
  { label: "Events", href: "/club/events" },
];

export function ClubNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Club experiences"
      className="sticky top-[72px] z-40 border-b border-white/10 bg-[#10263F]/95 px-5 py-3 backdrop-blur-md sm:px-8"
    >
      <div className="mx-auto flex w-full max-w-[1060px] items-center gap-2 overflow-x-auto pb-1">
        <span className="mr-2 shrink-0 text-[9px] font-bold uppercase tracking-[0.24em] text-[#FFD76A]">
          The Club
        </span>

        {clubLinks.map((link) => {
          const isActive =
            link.href === "/club"
              ? pathname === "/club"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex min-h-[36px] shrink-0 items-center justify-center rounded-full border px-4 text-[9px] font-bold uppercase tracking-[0.14em] transition ${
                isActive
                  ? "border-[#FFD76A] bg-[#FFD76A] text-[#10263F]"
                  : "border-white/20 text-white/80 hover:border-[#FFD76A] hover:text-[#FFD76A]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}