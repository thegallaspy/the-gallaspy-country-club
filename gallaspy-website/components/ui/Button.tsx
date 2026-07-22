import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export default function Button({
  href,
  children,
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-full
        border
        border-[var(--gold)]
        bg-[var(--gold)]
        px-8
        py-4
        text-sm
        font-semibold
        uppercase
        tracking-[0.18em]
        text-[var(--forest)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-white
        hover:shadow-xl
        ${className}
      `}
    >
      {children}
    </Link>
  );
}