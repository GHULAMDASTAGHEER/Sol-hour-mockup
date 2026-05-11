"use client";

import { useId } from "react";

export function HostAvatarDisplay({
  customPhotoDataUrl,
  propId,
  size,
  tone = "tv",
  watermarkChar,
}: {
  customPhotoDataUrl: string | null;
  propId: string;
  size: "sm" | "md" | "lg";
  tone?: "tv" | "setup";
  /** Single letter, e.g. host first initial — shown inside the disc on TV */
  watermarkChar?: string;
}) {
  const px =
    size === "sm"
      ? "h-[78px] w-[78px]"
      : size === "md"
        ? "h-[120px] w-[120px]"
        : "h-[140px] w-[140px]";

  const border =
    tone === "tv"
      ? "border-cream/25"
      : "border-cream/30";

  return (
    <div className="relative">
      <div className={`relative ${px}`}>
        <div
          aria-hidden
          className="absolute -inset-3 rounded-full bg-gradient-to-br from-amber/35 via-coral/25 to-sunset/15 blur-xl"
        />
        <div
          className={`relative h-full w-full overflow-hidden rounded-full border ${border} shadow-[0_10px_40px_-10px_rgba(42,24,16,0.7)]`}
        >
          <PortraitBase customPhotoDataUrl={customPhotoDataUrl} />
          {propId !== "none" && <PropOverlay propId={propId} />}
          {watermarkChar && (
            <span className="absolute bottom-1 right-2 text-[10px] font-medium uppercase tracking-[0.32em] text-cream/55">
              {watermarkChar}
            </span>
          )}
        </div>
        {size !== "sm" && (
          <div className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-warm-ink/75 px-2.5 py-1 backdrop-blur">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-sunset soft-pulse"
            />
            <span className="text-[9px] uppercase tracking-[0.32em] text-cream/90">
              Live
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function PortraitBase({
  customPhotoDataUrl,
}: {
  customPhotoDataUrl: string | null;
}) {
  if (customPhotoDataUrl) {
    return (
      <>
        <img
          src={customPhotoDataUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-amber/25 via-coral/20 to-sunset/35 mix-blend-soft-light"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_40px_12px_rgba(42,24,16,0.35)]"
        />
        <div
          aria-hidden
          className="absolute -inset-2 rotate-[18deg] opacity-50"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,241,222,0.35) 0%, rgba(255,241,222,0) 42%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.1] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
      </>
    );
  }

  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-[#ffdcb8] via-[#f0a06f] to-[#a83a26]"
      />
      <div
        aria-hidden
        className="absolute -inset-2 rotate-[18deg] opacity-60"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,241,222,0.55) 0%, rgba(255,241,222,0) 38%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </>
  );
}

function PropOverlay({ propId }: { propId: string }) {
  const id = useId().replace(/:/g, "");
  const lensId = `lens-${id}`;

  if (propId === "shades") {
    return (
      <svg
        viewBox="0 0 120 36"
        className="absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      >
        <defs>
          <linearGradient id={lensId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2a1810" />
            <stop offset="100%" stopColor="#0e0805" />
          </linearGradient>
        </defs>
        <rect x="6" y="6" width="44" height="24" rx="12" fill={`url(#${lensId})`} />
        <rect x="70" y="6" width="44" height="24" rx="12" fill={`url(#${lensId})`} />
        <path
          d="M50 16 Q60 9 70 16"
          stroke="#2a1810"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <rect
          x="10"
          y="9"
          width="14"
          height="4"
          rx="2"
          fill="rgba(255,212,184,0.25)"
        />
        <rect
          x="74"
          y="9"
          width="14"
          height="4"
          rx="2"
          fill="rgba(255,212,184,0.25)"
        />
      </svg>
    );
  }
  if (propId === "hat") {
    return (
      <svg
        viewBox="0 0 120 50"
        className="absolute left-1/2 top-[-12%] w-[110%] -translate-x-1/2"
        aria-hidden
      >
        <ellipse cx="60" cy="34" rx="56" ry="10" fill="#2a1810" />
        <path d="M28 32 Q60 -6 92 32 Z" fill="#3d2218" />
        <rect x="28" y="32" width="64" height="3" rx="1.5" fill="#e89b4c" />
      </svg>
    );
  }
  if (propId === "cap") {
    return (
      <svg
        viewBox="0 0 120 40"
        className="absolute left-1/2 top-[-6%] w-[105%] -translate-x-1/2"
        aria-hidden
      >
        <path d="M14 28 Q60 -4 106 28 L106 32 L14 32 Z" fill="#fff8f0" />
        <ellipse cx="60" cy="32" rx="56" ry="4" fill="#fff8f0" />
        <path
          d="M58 28 Q60 22 62 28"
          stroke="#8b6f47"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    );
  }
  if (propId === "headphones") {
    return (
      <svg
        viewBox="0 0 120 80"
        className="absolute left-1/2 top-0 w-full -translate-x-1/2"
        aria-hidden
      >
        <path
          d="M14 56 Q14 8 60 8 Q106 8 106 56"
          stroke="#2a1810"
          strokeWidth="5"
          fill="none"
        />
        <rect x="6" y="44" width="18" height="26" rx="6" fill="#2a1810" />
        <rect x="96" y="44" width="18" height="26" rx="6" fill="#2a1810" />
      </svg>
    );
  }
  if (propId === "flower") {
    return (
      <div className="absolute right-[6%] top-[10%] text-[26px]" aria-hidden>
        🌼
      </div>
    );
  }
  if (propId === "olive") {
    return (
      <div className="absolute left-[6%] top-[10%] text-[24px]" aria-hidden>
        🫒
      </div>
    );
  }
  if (propId === "saffron") {
    return (
      <div className="absolute right-[8%] bottom-[12%] text-[26px]" aria-hidden>
        ✨
      </div>
    );
  }
  if (propId === "sun") {
    return (
      <div
        className="absolute left-1/2 top-[6%] -translate-x-1/2 text-[22px]"
        aria-hidden
      >
        ☀️
      </div>
    );
  }
  return null;
}
