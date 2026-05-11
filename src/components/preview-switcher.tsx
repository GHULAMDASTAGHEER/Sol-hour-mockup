"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Overview", surface: "" },
  { href: "/host", label: "Host", surface: "Web" },
  { href: "/host/avatar", label: "Avatar", surface: "DJ" },
  { href: "/guest", label: "Guest", surface: "Mobile" },
  { href: "/tv", label: "Visual Layer", surface: "TV" },
];

export function PreviewSwitcher({
  variant = "ink",
}: {
  variant?: "ink" | "cream";
}) {
  const pathname = usePathname();

  const wrap =
    variant === "cream"
      ? "border-cream/20 bg-warm-ink/40 text-cream backdrop-blur-xl"
      : "border-warm-ink/10 bg-cream/80 text-warm-ink backdrop-blur-xl";

  const activeBg =
    variant === "cream"
      ? "bg-cream text-warm-ink"
      : "bg-warm-ink text-cream";

  const hover =
    variant === "cream" ? "hover:bg-cream/15" : "hover:bg-warm-ink/5";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4">
      <nav
        className={`pointer-events-auto flex items-center gap-1 rounded-full border p-1 shadow-[0_10px_40px_-12px_rgba(42,24,16,0.35)] ${wrap}`}
        aria-label="Preview screens"
      >
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`group flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-medium transition-all duration-300 ${
                active ? activeBg : hover
              }`}
            >
              <span>{l.label}</span>
              {l.surface && (
                <span
                  className={`hidden text-[10px] uppercase tracking-[0.24em] sm:inline ${
                    active ? "opacity-70" : "opacity-50"
                  }`}
                >
                  {l.surface}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
