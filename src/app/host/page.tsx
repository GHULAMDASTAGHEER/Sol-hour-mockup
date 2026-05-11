"use client";

import { useState } from "react";
import { Wordmark } from "@/components/wordmark";
import { PreviewSwitcher } from "@/components/preview-switcher";

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
      {/* Top wordmark + meta */}
      <header className="relative z-10 mx-auto flex w-full max-w-[1180px] items-center justify-between px-8 pt-10 sm:pt-12 fade-up">
        <Wordmark />
        <p className="text-[11px] uppercase tracking-[0.32em] text-warm-ink/55">
          Tonight · {formattedDate()}
        </p>
      </header>

      {/* Center */}
      <section className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-center px-8 pt-16 pb-28 sm:pt-20">
        <div className="max-w-2xl fade-up" style={{ animationDelay: "80ms" }}>
          <p className="text-[13px] uppercase tracking-[0.32em] text-warm-ink/55">
            Good evening
          </p>
          <h1 className="mt-5 text-[44px] font-light leading-[1.05] tracking-[-0.02em] text-warm-ink sm:text-[58px]">
            The room is{" "}
            <span className="italic font-normal text-sunset">yours.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-[1.55] text-warm-ink/70">
            Choose the kind of evening you&rsquo;re hosting. Sol Hour will shape
            the arc, weave in your guests&rsquo; requests, and let you be present
            in the room.
          </p>
        </div>

        {/* Gathering type */}
        <div className="mt-14 fade-up" style={{ animationDelay: "160ms" }}>
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
        <div className="mt-12 fade-up" style={{ animationDelay: "240ms" }}>
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

        {/* Summary + CTA */}
        <div
          className="mt-14 flex flex-col items-start gap-8 border-t border-warm-ink/10 pt-10 sm:flex-row sm:items-end sm:justify-between fade-up"
          style={{ animationDelay: "320ms" }}
        >
          <div className="max-w-md">
            <p className="text-[12px] uppercase tracking-[0.32em] text-warm-ink/50">
              Tonight&rsquo;s arc
            </p>
            <p className="mt-3 text-[18px] leading-[1.5] text-warm-ink/85">
              A {durationWords(duration)} {current.name.toLowerCase()} for about{" "}
              <span className="text-warm-ink">{guestEstimate} friends</span>.
              <span className="block mt-1 text-warm-ink/55">
                {current.whisper}
              </span>
            </p>
          </div>

          <button
            type="button"
            className="group inline-flex items-center gap-3 rounded-full bg-warm-ink px-8 py-4 text-[15px] font-medium tracking-tight text-cream transition-all duration-300 hover:bg-sunset"
          >
            Begin Sol Hour
            <span
              aria-hidden
              className="h-px w-8 bg-cream transition-all duration-300 group-hover:w-12"
            />
          </button>
        </div>
      </section>

      <footer className="relative z-10 mx-auto flex w-full max-w-[1180px] items-center justify-between px-8 pb-24 text-[11px] text-warm-ink/45">
        <span>Apple Music · connected</span>
        <span>Output · Living Room TV</span>
      </footer>

      <PreviewSwitcher variant="ink" />
    </main>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-warm-ink/55">
      {children}
    </p>
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
