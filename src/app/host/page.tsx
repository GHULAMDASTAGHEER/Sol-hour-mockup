"use client";

import { useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { PreviewSwitcher } from "@/components/preview-switcher";
import { BracketButton } from "@/components/bracket-button";

type GatheringId =
  | "intimate-dinner"
  | "dance-party"
  | "slow-burn"
  | "brunch"
  | "after-dinner";

type Gathering = {
  id: GatheringId;
  name: string;
  whisper: string;
};

const gatherings: Gathering[] = [
  {
    id: "intimate-dinner",
    name: "Intimate Dinner",
    whisper: "Eight at the table, voices low, glasses full.",
  },
  {
    id: "dance-party",
    name: "Dance Party",
    whisper: "When the lights dim and the floor opens up.",
  },
  {
    id: "slow-burn",
    name: "Slow Burn",
    whisper: "Long conversations, longer playlists.",
  },
  {
    id: "brunch",
    name: "Brunch",
    whisper: "Late morning, sun through the window.",
  },
  {
    id: "after-dinner",
    name: "After Dinner Drinks",
    whisper: "Just one more record, just one more glass.",
  },
];

const durations = [
  { value: 90, label: "90 minutes" },
  { value: 180, label: "3 hours" },
  { value: 300, label: "5 hours" },
];

export default function HostSetup() {
  const [selected, setSelected] = useState<GatheringId>("slow-burn");
  const [duration, setDuration] = useState<number>(180);

  const current = gatherings.find((g) => g.id === selected)!;
  const guestEstimate = Math.max(4, Math.round(duration / 22));

  return (
    <main className="sol-backdrop sol-grain relative isolate flex min-h-screen flex-col">
      <header className="relative z-10 mx-auto flex w-full max-w-[1240px] items-center justify-between px-6 pt-7 sm:px-10 sm:pt-10 lg:px-16 lg:pt-12 fade-up">
        <Wordmark />
        <p className="hidden text-[10.5px] uppercase tracking-[0.36em] text-warm-ink/55 sm:block">
          Tonight · {formattedDate()}
        </p>
      </header>

      <section className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-1 flex-col justify-center px-6 pt-12 pb-32 sm:px-10 sm:pt-16 lg:px-16">
        {/* Hero */}
        <div
          className="max-w-2xl fade-up"
          style={{ animationDelay: "80ms" }}
        >
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="h-px w-10 bg-gradient-to-r from-amber via-coral to-sunset"
            />
            <p className="text-[10.5px] uppercase tracking-[0.42em] text-warm-ink/55">
              Step 01 · Tonight
            </p>
          </div>
          <h1 className="mt-5 text-[clamp(34px,4.5vw,58px)] font-light leading-[1.04] tracking-[-0.02em] text-warm-ink">
            The room is{" "}
            <span className="italic font-normal text-sunset">yours.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[15.5px] leading-[1.6] text-warm-ink/70">
            Sol Hour is not background music. It&rsquo;s a ritual. Choose the
            kind of evening you&rsquo;re hosting and we&rsquo;ll shape the arc,
            weave in your guests&rsquo; requests, and let you be present in
            the room.
          </p>
        </div>

        {/* Gathering type */}
        <div
          className="mt-12 fade-up"
          style={{ animationDelay: "160ms" }}
        >
          <Label>What kind of gathering</Label>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {gatherings.map((g) => {
              const active = g.id === selected;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setSelected(g.id)}
                  aria-pressed={active}
                  className={[
                    "group relative rounded-2xl px-5 py-6 text-left transition-all duration-300",
                    "border backdrop-blur-md",
                    active
                      ? "border-warm-ink/30 bg-cream/85 shadow-[0_8px_30px_-12px_rgba(180,58,42,0.45)]"
                      : "border-warm-ink/10 bg-cream/40 hover:border-warm-ink/20 hover:bg-cream/60",
                  ].join(" ")}
                >
                  <span
                    aria-hidden
                    className={[
                      "absolute left-5 top-5 h-1.5 w-1.5 rounded-full transition-all duration-300",
                      active ? "bg-sunset scale-110" : "bg-warm-ink/20",
                    ].join(" ")}
                  />
                  <p className="mt-4 text-[15px] font-medium tracking-tight text-warm-ink">
                    {g.name}
                  </p>
                  <p className="mt-2 text-[12.5px] leading-[1.45] text-warm-ink/55">
                    {g.whisper}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Duration */}
        <div
          className="mt-10 fade-up"
          style={{ animationDelay: "220ms" }}
        >
          <Label>How long</Label>
          <div className="mt-5 flex flex-wrap gap-3">
            {durations.map((d) => {
              const active = d.value === duration;
              return (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setDuration(d.value)}
                  aria-pressed={active}
                  className={[
                    "rounded-full px-6 py-3 text-[14px] font-medium tracking-tight transition-all duration-300",
                    "border",
                    active
                      ? "border-warm-ink/40 bg-warm-ink text-cream"
                      : "border-warm-ink/15 bg-cream/40 text-warm-ink hover:border-warm-ink/30 hover:bg-cream/70",
                  ].join(" ")}
                >
                  {d.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* DJ Avatar CTA — feature highlight */}
        <Link
          href="/host/avatar"
          className="group mt-10 flex items-center gap-5 overflow-hidden rounded-3xl border border-warm-ink/15 bg-gradient-to-r from-cream/90 via-cream/80 to-cream/70 p-5 backdrop-blur-md transition-all duration-500 hover:border-warm-ink/30 hover:shadow-[0_18px_50px_-22px_rgba(180,58,42,0.45)] fade-up"
          style={{ animationDelay: "280ms" }}
        >
          <DJBadge />
          <div className="min-w-0 flex-1">
            <p className="text-[10.5px] uppercase tracking-[0.36em] text-sunset">
              Step 02 · The Host
            </p>
            <p className="mt-1.5 text-[16.5px] font-medium tracking-tight text-warm-ink">
              You are the DJ tonight.
            </p>
            <p className="mt-1 text-[13px] leading-[1.55] text-warm-ink/60">
              Upload a photo, add a prop, see yourself on the TV — quietly,
              in the corner, never the focal point.
            </p>
          </div>
          <span
            aria-hidden
            className="hidden items-center gap-2 pr-3 text-warm-ink/40 transition-all duration-300 group-hover:text-sunset sm:flex"
          >
            <span className="h-px w-6 bg-current transition-all duration-300 group-hover:w-10" />
            <span className="text-[16px] leading-none">&rsaquo;</span>
          </span>
        </Link>

        {/* Summary + CTA */}
        <div
          className="mt-12 flex flex-col items-start gap-7 border-t border-warm-ink/10 pt-9 sm:flex-row sm:items-end sm:justify-between fade-up"
          style={{ animationDelay: "360ms" }}
        >
          <div className="max-w-md">
            <p className="text-[10.5px] uppercase tracking-[0.42em] text-warm-ink/50">
              Tonight&rsquo;s arc
            </p>
            <p className="mt-3 text-[17px] leading-[1.5] text-warm-ink/85">
              A {durationWords(duration)} {current.name.toLowerCase()} for
              about <span className="text-warm-ink">{guestEstimate} friends</span>.
              <span className="mt-1 block text-warm-ink/55">
                {current.whisper}
              </span>
            </p>
          </div>

          <BracketButton href="/tv" tone="sunset" size="md">
            Begin Sol Hour
          </BracketButton>
        </div>
      </section>

      <footer className="relative z-10 mx-auto flex w-full max-w-[1240px] items-center justify-between px-6 pb-28 text-[10.5px] uppercase tracking-[0.32em] text-warm-ink/45 sm:px-10 lg:px-16">
        <span>Apple Music · connected</span>
        <span>Output · Living Room TV</span>
      </footer>

      <PreviewSwitcher variant="ink" />
    </main>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10.5px] font-medium uppercase tracking-[0.42em] text-warm-ink/55">
      {children}
    </p>
  );
}

function DJBadge() {
  return (
    <div className="relative h-[68px] w-[68px] shrink-0 sm:h-[78px] sm:w-[78px]">
      <div
        aria-hidden
        className="absolute -inset-2 rounded-full bg-gradient-to-br from-amber/35 via-coral/25 to-sunset/15 blur-md"
      />
      <div className="relative h-full w-full overflow-hidden rounded-full border border-warm-ink/15 shadow-[0_6px_24px_-12px_rgba(180,58,42,0.5)]">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-[#ffdcb8] via-[#f0a06f] to-[#a83a26]"
        />
        <svg
          viewBox="0 0 120 36"
          className="absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2"
          aria-hidden
        >
          <defs>
            <linearGradient id="djLens" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#2a1810" />
              <stop offset="100%" stopColor="#0e0805" />
            </linearGradient>
          </defs>
          <rect x="6" y="6" width="44" height="24" rx="12" fill="url(#djLens)" />
          <rect
            x="70"
            y="6"
            width="44"
            height="24"
            rx="12"
            fill="url(#djLens)"
          />
          <path
            d="M50 16 Q60 9 70 16"
            stroke="#2a1810"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

function formattedDate() {
  const d = new Date();
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function durationWords(minutes: number) {
  if (minutes < 120) return "ninety-minute";
  if (minutes < 240) return "three-hour";
  return "five-hour";
}
