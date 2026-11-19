"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Event Overview", href: "/the-gallaspy" },
  { label: "Register", href: "/invitational/register" },
  { label: "Prizes", href: "/invitational/prizes" },
  { label: "Sponsors & Vendors", href: "/invitational/sponsors" },
  { label: "Schedule", href: "/invitational/schedule" },
  { label: "Rules", href: "/invitational/rules" },
  { label: "FAQ", href: "/invitational/faq" },
  { label: "Club Calendar", href: "/calendar" },
];

export default function InvitationalNav() {
  const pathname = usePathname();

  return (
    <div className="gallaspy-event-nav sticky top-[82px] z-40 border-b border-[#10263F]/15 bg-white">
      <nav
        aria-label="THE GALLASPY event navigation"
        className="mx-auto flex max-w-[1400px] items-center overflow-x-auto px-6 sm:px-8 lg:px-12"
      >
        {links.map((link) => {
          const active =
            link.href === "/the-gallaspy"
              ? pathname === "/invitational" || pathname === "/the-gallaspy"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={[
                "relative flex min-h-[52px] shrink-0 items-center px-4",
                "text-[11px] font-bold uppercase tracking-wide",
                "transition-colors duration-300",
                active
                  ? "text-[#174A38]"
                  : "text-[#10263F]/75 hover:text-[#174A38]",
              ].join(" ")}
            >
              {link.label}

              <span
                className={[
                  "absolute inset-x-4 bottom-0 h-[3px] bg-[#174A38]",
                  "transition-transform duration-300",
                  active ? "scale-x-100" : "scale-x-0",
                ].join(" ")}
              />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
