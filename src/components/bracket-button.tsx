"use client";

import Link from "next/link";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  /** `gold` — leonysol.com Sol Hour dark-page accents */
  tone?: "ink" | "cream" | "sunset" | "gold";
  size?: "sm" | "md";
  className?: string;
  type?: "button" | "submit";
};

export function BracketButton({
  children,
  href,
  onClick,
  tone = "ink",
  size = "md",
  className = "",
  type = "button",
}: Props) {
  const text =
    tone === "cream"
      ? "text-cream"
      : tone === "sunset"
        ? "text-sunset"
        : tone === "gold"
          ? "text-sol-gold"
          : "text-warm-ink";

  const bracket =
    tone === "cream"
      ? "text-cream/85"
      : tone === "sunset"
        ? "text-sunset/85"
        : tone === "gold"
          ? "text-sol-gold/80"
          : "text-warm-ink/70";

  const py =
    size === "sm" ? "py-1.5" : "py-3";
  const px =
    size === "sm" ? "px-0" : "px-0";
  const ts =
    size === "sm"
      ? "text-[10.5px]"
      : "text-[12.5px]";

  const inner = (
    <span
      className={`group inline-flex items-center gap-2 font-medium uppercase tracking-[0.34em] ${ts} ${py} ${px} ${text} transition-all duration-300 ${className}`}
    >
      <span
        aria-hidden
        className={`${bracket} transition-transform duration-300 group-hover:-translate-x-0.5`}
      >
        [
      </span>
      <span className="px-1 transition-all duration-300 group-hover:tracking-[0.42em]">
        {children}
      </span>
      <span
        aria-hidden
        className={`${bracket} transition-transform duration-300 group-hover:translate-x-0.5`}
      >
        ]
      </span>
    </span>
  );

  if (href) {
    return <Link href={href}>{inner}</Link>;
  }

  return (
    <button type={type} onClick={onClick}>
      {inner}
    </button>
  );
}
