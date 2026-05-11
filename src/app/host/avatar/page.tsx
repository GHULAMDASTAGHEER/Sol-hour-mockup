"use client";

import { useState } from "react";
import { Wordmark } from "@/components/wordmark";
import { PreviewSwitcher } from "@/components/preview-switcher";
import { BracketButton } from "@/components/bracket-button";
import { propLibrary } from "@/lib/gathering";

export default function AvatarPage() {
  const [selectedProp, setSelectedProp] = useState<string>("shades");
  const [phase, setPhase] = useState<"warm-up" | "peak" | "wind-down">("peak");
  const [hasPhoto, setHasPhoto] = useState(true);

  const prop = propLibrary.find((p) => p.id === selectedProp);

  return (
    <main className="sol-backdrop sol-grain relative isolate flex min-h-screen flex-col">
      {/* Top bar */}
      <header className="relative z-10 mx-auto flex w-full max-w-[1240px] items-center justify-between px-6 pt-7 sm:px-10 sm:pt-10 lg:px-16 lg:pt-12 fade-up">
        <Wordmark tone="ink" />
        <BracketButton href="/host" tone="ink" size="sm">
          Back to setup
        </BracketButton>
      </header>

      {/* Body */}
      <section className="relative z-10 mx-auto grid w-full max-w-[1240px] flex-1 grid-cols-1 gap-12 px-6 pt-12 pb-28 sm:px-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-16 lg:py-14">
        {/* Left — the moment / preview */}
        <div
          className="flex flex-col gap-7 fade-up"
          style={{ animationDelay: "60ms" }}
        >
          <div>
            <p className="text-[10.5px] uppercase tracking-[0.42em] text-warm-ink/55">
              Step 02 · The Host
            </p>
            <h1 className="mt-4 text-[clamp(30px,3vw,42px)] font-light leading-[1.06] tracking-[-0.018em] text-warm-ink">
              You are the{" "}
              <span className="italic font-normal text-sunset">DJ tonight.</span>
            </h1>
            <p className="mt-5 max-w-md text-[14.5px] leading-[1.6] text-warm-ink/65">
              Sol Hour lifts a single portrait of you into the room — small, in
              the corner of the screen, never the focal point. Choose a photo,
              add a prop, see how you&rsquo;ll appear on the TV.
            </p>
          </div>

          {/* TV mock preview */}
          <div className="relative overflow-hidden rounded-3xl border border-warm-ink/12 bg-warm-ink shadow-[0_30px_80px_-30px_rgba(180,58,42,0.45)]">
            <div className="sol-tv-backdrop sol-grain relative aspect-video">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(20,8,4,0.5) 0%, rgba(20,8,4,0) 100%)",
                }}
              />
              {/* Wordmark in TV */}
              <div className="absolute left-5 top-4 sm:left-7 sm:top-6">
                <Wordmark size="sm" tone="cream" asLink={false} />
              </div>
              {/* Now playing label */}
              <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7">
                <p className="text-[9px] uppercase tracking-[0.4em] text-cream/70">
                  Now playing
                </p>
                <p className="mt-1 text-[15px] font-light tracking-tight text-cream sm:text-[20px]">
                  Inside
                </p>
                <p className="text-[10px] text-cream/65 sm:text-[12px]">
                  Aldous Harding
                </p>
              </div>
              {/* Avatar on TV */}
              <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7">
                <AvatarDisplay
                  hasPhoto={hasPhoto}
                  propId={selectedProp}
                  size="sm"
                />
              </div>
            </div>
          </div>

          <p className="text-[11px] uppercase tracking-[0.36em] text-warm-ink/45">
            Preview · How you appear during {phase.replace("-", " ")}
          </p>
        </div>

        {/* Right — controls */}
        <div
          className="flex flex-col gap-8 fade-up"
          style={{ animationDelay: "160ms" }}
        >
          {/* Photo upload */}
          <div>
            <p className="text-[10.5px] uppercase tracking-[0.42em] text-warm-ink/55">
              Your photo
            </p>
            <div className="mt-4 flex items-center gap-5">
              <div className="relative">
                <AvatarDisplay
                  hasPhoto={hasPhoto}
                  propId={selectedProp}
                  size="lg"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <label className="group inline-flex w-fit cursor-pointer items-center gap-3 rounded-full border border-warm-ink/20 bg-cream/70 px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.28em] text-warm-ink backdrop-blur-md transition-all duration-300 hover:border-warm-ink/40 hover:bg-cream">
                  <span
                    aria-hidden
                    className="flex h-4 w-4 items-center justify-center"
                  >
                    <span className="block h-px w-3 bg-warm-ink" />
                    <span className="absolute block h-3 w-px bg-warm-ink" />
                  </span>
                  {hasPhoto ? "Replace photo" : "Upload photo"}
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={() => setHasPhoto(true)}
                  />
                </label>
                {hasPhoto && (
                  <button
                    type="button"
                    onClick={() => setHasPhoto(false)}
                    className="w-fit text-[11px] uppercase tracking-[0.28em] text-warm-ink/55 underline-offset-4 transition-all hover:text-sunset hover:underline"
                  >
                    Remove
                  </button>
                )}
                <p className="text-[11.5px] leading-[1.55] text-warm-ink/55">
                  A casual phone photo is perfect — soft warm tone and gentle
                  vignette are applied automatically.
                </p>
              </div>
            </div>
          </div>

          {/* Prop selection */}
          <div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10.5px] uppercase tracking-[0.42em] text-warm-ink/55">
                  Choose a prop
                </p>
                <p className="mt-2 text-[12.5px] text-warm-ink/55">
                  One at a time. Restraint is the point.
                </p>
              </div>
              {prop && prop.id !== "none" && (
                <p className="text-[11px] uppercase tracking-[0.28em] text-warm-ink/60">
                  {prop.name}
                </p>
              )}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2.5 sm:grid-cols-3 lg:grid-cols-3">
              {propLibrary.map((p) => {
                const active = p.id === selectedProp;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedProp(p.id)}
                    aria-pressed={active}
                    className={[
                      "group flex flex-col items-center gap-2 rounded-2xl border px-3 py-4 transition-all duration-300 backdrop-blur-md",
                      active
                        ? "border-warm-ink/35 bg-cream/95 shadow-[0_6px_24px_-12px_rgba(180,58,42,0.45)]"
                        : "border-warm-ink/10 bg-cream/45 hover:border-warm-ink/25 hover:bg-cream/70",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "flex h-9 w-9 items-center justify-center rounded-full text-[18px] transition-all duration-300",
                        active
                          ? "bg-gradient-to-br from-amber via-coral to-sunset/80"
                          : "bg-warm-ink/5 group-hover:bg-warm-ink/8",
                      ].join(" ")}
                      aria-hidden
                    >
                      {p.emoji}
                    </span>
                    <span className="text-[10.5px] uppercase tracking-[0.22em] text-warm-ink/65">
                      {p.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Phase preview */}
          <div>
            <p className="text-[10.5px] uppercase tracking-[0.42em] text-warm-ink/55">
              Preview the phases
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(["warm-up", "peak", "wind-down"] as const).map((p) => {
                const active = p === phase;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPhase(p)}
                    aria-pressed={active}
                    className={[
                      "rounded-full border px-4 py-2 text-[11.5px] uppercase tracking-[0.26em] transition-all duration-300",
                      active
                        ? "border-warm-ink/40 bg-warm-ink text-cream"
                        : "border-warm-ink/15 bg-cream/40 text-warm-ink/70 hover:border-warm-ink/30 hover:bg-cream/70",
                    ].join(" ")}
                  >
                    {p.replace("-", " ")}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CTA row */}
          <div className="mt-4 flex flex-wrap items-center gap-6 border-t border-warm-ink/10 pt-7">
            <BracketButton href="/tv" tone="sunset" size="md">
              See it on the TV
            </BracketButton>
            <BracketButton href="/host" tone="ink" size="md">
              Save &amp; continue
            </BracketButton>
          </div>
        </div>
      </section>

      <PreviewSwitcher variant="ink" />
    </main>
  );
}

function AvatarDisplay({
  hasPhoto,
  propId,
  size,
}: {
  hasPhoto: boolean;
  propId: string;
  size: "sm" | "md" | "lg";
}) {
  const px =
    size === "sm" ? "h-[78px] w-[78px]" : size === "md" ? "h-[120px] w-[120px]" : "h-[140px] w-[140px]";

  return (
    <div className="relative">
      <div className={`relative ${px}`}>
        {/* Halo */}
        <div
          aria-hidden
          className="absolute -inset-3 rounded-full bg-gradient-to-br from-amber/35 via-coral/25 to-sunset/15 blur-xl"
        />
        {/* Disc */}
        <div className="relative h-full w-full overflow-hidden rounded-full border border-cream/30 shadow-[0_10px_40px_-10px_rgba(42,24,16,0.7)]">
          {hasPhoto ? (
            <PortraitDisc />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-warm-ink/10 text-[10px] uppercase tracking-[0.32em] text-warm-ink/45">
              No photo
            </div>
          )}
          {/* Prop overlay */}
          {hasPhoto && propId !== "none" && <PropOverlay propId={propId} />}
        </div>
        {/* Live chip on large only */}
        {size !== "sm" && hasPhoto && (
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

function PortraitDisc() {
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
  if (propId === "shades") {
    return (
      <svg
        viewBox="0 0 120 36"
        className="absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      >
        <defs>
          <linearGradient id="lens" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2a1810" />
            <stop offset="100%" stopColor="#0e0805" />
          </linearGradient>
        </defs>
        <rect x="6" y="6" width="44" height="24" rx="12" fill="url(#lens)" />
        <rect x="70" y="6" width="44" height="24" rx="12" fill="url(#lens)" />
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
        <path
          d="M28 32 Q60 -6 92 32 Z"
          fill="#3d2218"
        />
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
        <path d="M58 28 Q60 22 62 28" stroke="#8b6f47" strokeWidth="1" fill="none" />
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
      <div className="absolute left-1/2 top-[6%] -translate-x-1/2 text-[22px]" aria-hidden>
        ☀️
      </div>
    );
  }
  return null;
}
