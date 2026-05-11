"use client";

import { useMemo, useState } from "react";
import { Wordmark } from "@/components/wordmark";
import { PreviewSwitcher } from "@/components/preview-switcher";
import { gathering } from "@/lib/gathering";

export default function GuestPage() {
  const [name, setName] = useState("");
  const [request, setRequest] = useState("");
  const [recording, setRecording] = useState(false);
  const [sent, setSent] = useState(false);

  const canSubmit = useMemo(
    () => request.trim().length > 1 && !sent,
    [request, sent],
  );

  function submit() {
    if (!canSubmit) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setRequest("");
    }, 2400);
  }

  return (
    <main className="relative isolate min-h-screen bg-cream">
      {/* Phone shell wrapper — looks like an iPhone preview on desktop, full-bleed on mobile */}
      <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-gradient-to-b from-[#fff1de] via-[#fde0b8] to-[#f6c39a] pb-28 sm:max-w-[420px] sm:my-8 sm:min-h-[860px] sm:rounded-[44px] sm:border sm:border-warm-ink/10 sm:overflow-hidden sm:shadow-[0_30px_80px_-30px_rgba(180,58,42,0.45)]">
        {/* Status row */}
        <div className="flex items-center justify-between px-6 pt-10 sm:pt-6 fade-up">
          <Wordmark size="sm" />
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-warm-ink/55">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-sunset soft-pulse"
            />
            Live · {gathering.phaseLabel}
          </div>
        </div>

        {/* Host context */}
        <div
          className="px-6 pt-8 fade-up"
          style={{ animationDelay: "60ms" }}
        >
          <p className="text-[11px] uppercase tracking-[0.32em] text-warm-ink/55">
            You&rsquo;re at
          </p>
          <h1 className="mt-2 text-[28px] font-light leading-[1.1] tracking-[-0.01em] text-warm-ink">
            {gathering.hostFirstName}&rsquo;s{" "}
            <span className="italic font-normal text-sunset">Sol Hour</span>
          </h1>
          <p className="mt-2 text-[14px] leading-[1.5] text-warm-ink/65">
            {gathering.whisper}
          </p>
        </div>

        {/* Now playing card */}
        <div
          className="mx-6 mt-7 overflow-hidden rounded-3xl border border-warm-ink/10 bg-cream/85 backdrop-blur-xl fade-up"
          style={{ animationDelay: "140ms" }}
        >
          <div className="flex items-center gap-4 p-5">
            <Vinyl />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-[0.32em] text-warm-ink/55">
                Now playing
              </p>
              <p className="mt-1.5 truncate text-[18px] font-medium tracking-tight text-warm-ink">
                {gathering.nowPlaying.title}
              </p>
              <p className="truncate text-[13.5px] text-warm-ink/65">
                {gathering.nowPlaying.artist}
              </p>
            </div>
          </div>
          {/* Progress */}
          <div className="px-5 pb-5">
            <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-warm-ink/10">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber via-coral to-sunset"
                style={{ width: "41%" }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-warm-ink/55">
              <span>{gathering.nowPlaying.elapsed}</span>
              <span>{gathering.nowPlaying.duration}</span>
            </div>
          </div>
        </div>

        {/* Up next */}
        <div
          className="mt-6 px-6 fade-up"
          style={{ animationDelay: "220ms" }}
        >
          <p className="text-[10px] uppercase tracking-[0.32em] text-warm-ink/55">
            Up next
          </p>
          <ul className="mt-3 space-y-2">
            {gathering.upcoming.map((t, i) => (
              <li
                key={t.title}
                className="flex items-center gap-3 rounded-2xl border border-warm-ink/8 bg-cream/55 px-4 py-3 backdrop-blur-md"
              >
                <span className="w-5 text-[12px] tabular-nums text-warm-ink/45">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-medium text-warm-ink">
                    {t.title}
                  </p>
                  <p className="truncate text-[12px] text-warm-ink/55">
                    {t.artist}
                  </p>
                </div>
                <span className="text-[11px] tabular-nums text-warm-ink/45">
                  {t.duration}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Request composer */}
        <div
          className="mt-8 px-6 fade-up"
          style={{ animationDelay: "300ms" }}
        >
          <p className="text-[10px] uppercase tracking-[0.32em] text-warm-ink/55">
            Ask for a song
          </p>

          {/* Voice button */}
          <button
            type="button"
            onClick={() => setRecording((r) => !r)}
            aria-pressed={recording}
            className={[
              "mt-4 group relative flex w-full items-center gap-4 overflow-hidden rounded-3xl border px-6 py-5 text-left transition-all duration-300",
              recording
                ? "border-sunset/40 bg-gradient-to-br from-amber/30 via-coral/30 to-sunset/20"
                : "border-warm-ink/10 bg-cream/70 hover:border-warm-ink/20 hover:bg-cream/85",
            ].join(" ")}
          >
            <span className="relative flex h-12 w-12 items-center justify-center">
              <span
                aria-hidden
                className={[
                  "absolute inset-0 rounded-full bg-gradient-to-br from-amber via-coral to-sunset transition-all duration-500",
                  recording ? "scale-110" : "scale-100",
                ].join(" ")}
              />
              <span
                aria-hidden
                className={[
                  "absolute inset-[3px] rounded-full bg-cream transition-all duration-500",
                  recording ? "opacity-30" : "opacity-100",
                ].join(" ")}
              />
              <span
                aria-hidden
                className={[
                  "relative h-2.5 w-2.5 rounded-sm bg-sunset transition-all duration-300",
                  recording ? "scale-150 rounded-full" : "scale-100",
                ].join(" ")}
              />
              {recording && (
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full border-2 border-sunset/40 soft-pulse"
                />
              )}
            </span>
            <span className="flex-1">
              <span className="block text-[15.5px] font-medium tracking-tight text-warm-ink">
                {recording ? "Listening…" : "Tap to speak"}
              </span>
              <span className="block text-[12.5px] text-warm-ink/55">
                {recording
                  ? "Say the song or artist out loud."
                  : "Or type your request below."}
              </span>
            </span>
          </button>

          {/* Text request */}
          <div className="mt-4 rounded-3xl border border-warm-ink/10 bg-cream/70 p-2 transition-all focus-within:border-warm-ink/30 focus-within:bg-cream/90">
            <textarea
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              placeholder="Something by Norah Jones, anything from Hejira…"
              rows={2}
              aria-label="Song request"
              className="block w-full resize-none rounded-2xl bg-transparent px-3 py-3 text-[14.5px] leading-[1.5] text-warm-ink placeholder:text-warm-ink/40 focus:outline-none"
            />
            <div className="flex items-center justify-between gap-3 px-3 pb-2">
              <label className="flex flex-1 items-center gap-2 text-[12px] text-warm-ink/55">
                <span className="uppercase tracking-[0.28em]">From</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="your name (optional)"
                  className="w-full bg-transparent text-[13.5px] text-warm-ink placeholder:text-warm-ink/35 focus:outline-none"
                  aria-label="Your name"
                />
              </label>
              <button
                type="button"
                onClick={submit}
                disabled={!canSubmit}
                className={[
                  "rounded-full px-5 py-2.5 text-[13px] font-medium tracking-tight transition-all duration-300",
                  canSubmit
                    ? "bg-warm-ink text-cream hover:bg-sunset"
                    : "bg-warm-ink/10 text-warm-ink/40",
                ].join(" ")}
              >
                {sent ? "Queued ✓" : "Send"}
              </button>
            </div>
          </div>
          {sent && (
            <p className="mt-3 text-center text-[12.5px] text-warm-ink/60 fade-up">
              Heard. Sol Hour will weave it in when the room is ready.
            </p>
          )}
        </div>

        {/* Recent requests */}
        <div
          className="mt-9 px-6 fade-up"
          style={{ animationDelay: "380ms" }}
        >
          <p className="text-[10px] uppercase tracking-[0.32em] text-warm-ink/55">
            Recently asked
          </p>
          <ul className="mt-3 space-y-2">
            {gathering.recentRequests.map((r) => (
              <li
                key={r.guest + r.title}
                className="flex items-center justify-between gap-3 rounded-2xl bg-cream/40 px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-[13.5px] font-medium text-warm-ink">
                    {r.title}
                    <span className="ml-2 text-warm-ink/55">· {r.artist}</span>
                  </p>
                  <p className="mt-0.5 text-[11.5px] text-warm-ink/55">
                    {r.guest} · {r.minutesAgo}m ago
                  </p>
                </div>
                <StatusPill status={r.status} />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto px-6 pt-10 pb-4 text-center text-[10.5px] uppercase tracking-[0.32em] text-warm-ink/45">
          The room is listening.
        </div>
      </div>

      <PreviewSwitcher variant="ink" />
    </main>
  );
}

function Vinyl() {
  return (
    <div className="relative h-16 w-16 shrink-0">
      <div
        aria-hidden
        className="absolute inset-0 rounded-full bg-gradient-to-br from-warm-ink via-[#3d2218] to-warm-ink spin-slow"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at center, rgba(255,255,255,0.04) 0 1px, transparent 1px 4px), radial-gradient(circle at 30% 30%, rgba(255,212,184,0.35) 0%, rgba(255,212,184,0) 60%), linear-gradient(135deg, #2a1810, #3d2218 60%, #2a1810)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-[26%] rounded-full bg-gradient-to-br from-amber via-coral to-sunset"
      />
      <div
        aria-hidden
        className="absolute inset-[44%] rounded-full bg-warm-ink"
      />
    </div>
  );
}

function StatusPill({ status }: { status: "queued" | "playing" | "considered" }) {
  const styles = {
    queued: "bg-warm-ink/8 text-warm-ink/75",
    playing: "bg-sunset/15 text-sunset",
    considered: "bg-warm-ink/5 text-warm-ink/45",
  } as const;
  const label = {
    queued: "Queued",
    playing: "Played",
    considered: "Considered",
  } as const;
  return (
    <span
      className={`rounded-full px-3 py-1 text-[10.5px] uppercase tracking-[0.22em] ${styles[status]}`}
    >
      {label[status]}
    </span>
  );
}
