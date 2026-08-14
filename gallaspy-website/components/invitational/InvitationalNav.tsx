"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Overview", href: "/invitational" },
  { label: "Register", href: "/invitational/register" },
  { label: "Prizes", href: "/invitational/prizes" },
  { label: "Sponsors", href: "/invitational/sponsors" },
  { label: "Schedule", href: "/invitational/schedule" },
  { label: "FAQ", href: "/invitational/faq" },
];

export default function InvitationalNav() {
  const pathname = usePathname();

  return (
    <div className="sticky top-[82px] z-40 border-b border-white/10 bg-[#10263F]/95 backdrop-blur-xl">
      <nav
        aria-label="Invitational navigation"
        className="mx-auto flex max-w-[1400px] items-center overflow-x-auto px-6 sm:px-8 lg:px-12"
      >
        {links.map((link) => {
          const active =
            link.href === "/invitational"
              ? pathname === "/invitational"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={[
                "relative flex min-h-[52px] shrink-0 items-center px-4",
                "text-[9px] font-semibold uppercase tracking-[0.2em]",
                "transition-colors duration-300",
                active
                  ? "text-[#FFD76A]"
                  : "text-white/60 hover:text-white",
              ].join(" ")}
            >
              {link.label}

              <span
                className={[
                  "absolute inset-x-4 bottom-0 h-px bg-[#FFD76A]",
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