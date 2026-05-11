"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Wordmark } from "@/components/wordmark";
import { PreviewSwitcher } from "@/components/preview-switcher";
import { BracketButton } from "@/components/bracket-button";
import { gathering, phaseGradient, type Phase } from "@/lib/gathering";
import { HostAvatarDisplay } from "@/components/host-avatar-display";
import {
  readAvatarSession,
  type StoredAvatarState,
} from "@/lib/avatar-session";

export default function TVPage() {
  const router = useRouter();
  const [sessionAvatar, setSessionAvatar] = useState<StoredAvatarState | null>(
    null,
  );

  useEffect(() => {
    setSessionAvatar(readAvatarSession());
  }, []);

  function goBack() {
    router.back();
  }

  const phase: Phase = sessionAvatar?.phase ?? gathering.phase;
  const propId = sessionAvatar?.propId ?? "shades";
  const customPhoto = sessionAvatar?.photoDataUrl ?? null;

  return (
    <main
      className={`sol-grain relative isolate flex min-h-screen flex-col overflow-hidden bg-gradient-to-br ${phaseGradient(phase)}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-1/3"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,8,4,0.35) 0%, rgba(20,8,4,0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-1/2"
        style={{
          background:
            "linear-gradient(0deg, rgba(20,8,4,0.55) 0%, rgba(20,8,4,0) 100%)",
        }}
      />

      <div className="relative z-10 flex items-start justify-between gap-4 px-6 pt-7 sm:px-10 sm:pt-10 lg:px-16 lg:pt-14 fade-up">
        <Wordmark tone="cream" size="md" />
        <div className="flex flex-col items-end gap-4 sm:flex-row sm:items-center sm:gap-6">
          <BracketButton onClick={goBack} tone="cream" size="sm">
            Back
          </BracketButton>
          <div className="flex items-center gap-2.5 text-[10px] uppercase tracking-[0.32em] text-cream/65">
            <PhasePip active={phase === "warm-up"} label="Warm" />
            <span aria-hidden className="h-px w-5 bg-cream/25" />
            <PhasePip active={phase === "peak"} label="Peak" />
            <span aria-hidden className="h-px w-5 bg-cream/25" />
            <PhasePip active={phase === "wind-down"} label="Wind" />
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex flex-1 max-w-4xl flex-col items-center justify-center px-8 text-center">
        <p
          className="text-[10.5px] uppercase tracking-[0.42em] text-cream/80 fade-up"
          style={{
            animationDelay: "60ms",
            textShadow: "0 2px 12px rgba(20,8,4,0.35)",
          }}
        >
          The Sol Hour signature
        </p>
        <h2
          className="mt-7 text-[clamp(34px,5.6vw,72px)] font-light italic leading-[1.04] tracking-[-0.015em] text-cream fade-up"
          style={{
            animationDelay: "140ms",
            textShadow:
              "0 2px 24px rgba(20,8,4,0.45), 0 1px 4px rgba(20,8,4,0.35)",
          }}
        >
          &ldquo;The room is finding its energy.&rdquo;
        </h2>
        <div
          className="mt-10 flex items-center gap-4 fade-up"
          style={{ animationDelay: "240ms" }}
        >
          <span aria-hidden className="h-px w-12 bg-cream/40 sm:w-20" />
          <span className="text-[10.5px] uppercase tracking-[0.38em] text-cream/75">
            {phaseLabel(phase)} · {Math.round(gathering.phaseProgress * 100)}%
            through
          </span>
          <span aria-hidden className="h-px w-12 bg-cream/40 sm:w-20" />
        </div>
      </div>

      <div className="relative z-10 flex items-end justify-between gap-6 px-6 pb-28 sm:px-10 sm:pb-16 lg:px-16">
        <div
          className="max-w-[58%] fade-up"
          style={{ animationDelay: "340ms" }}
        >
          <p className="text-[10.5px] uppercase tracking-[0.4em] text-cream/70">
            Now playing
          </p>
          <p
            className="mt-3 text-[clamp(24px,3.4vw,48px)] font-light leading-[1.05] tracking-[-0.01em] text-cream"
            style={{ textShadow: "0 2px 18px rgba(20,8,4,0.4)" }}
          >
            {gathering.nowPlaying.title}
          </p>
          <p className="mt-1 text-[clamp(13px,1.2vw,18px)] tracking-tight text-cream/80">
            {gathering.nowPlaying.artist}
          </p>
        </div>

        <div className="fade-up" style={{ animationDelay: "420ms" }}>
          <HostAvatarBlock
            customPhotoDataUrl={customPhoto}
            propId={propId}
          />
        </div>
      </div>

      <PreviewSwitcher variant="cream" />
    </main>
  );
}

function phaseLabel(p: Phase) {
  if (p === "warm-up") return "Warm up";
  if (p === "peak") return "Peak";
  return "Cool down";
}

function PhasePip({ active, label }: { active: boolean; label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span
        aria-hidden
        className={[
          "h-1.5 w-1.5 rounded-full transition-all duration-500",
          active ? "bg-cream scale-110 soft-pulse" : "bg-cream/30",
        ].join(" ")}
      />
      <span
        className={active ? "text-cream" : "text-cream/45"}
        aria-label={`${label} ${active ? "active" : ""}`}
      >
        {label}
      </span>
    </span>
  );
}

function HostAvatarBlock({
  customPhotoDataUrl,
  propId,
}: {
  customPhotoDataUrl: string | null;
  propId: string;
}) {
  return (
    <div className="relative">
      <p className="absolute -top-7 right-1 text-[10px] uppercase tracking-[0.36em] text-cream/55">
        Hosted by {gathering.hostFirstName}
      </p>
      <HostAvatarDisplay
        customPhotoDataUrl={customPhotoDataUrl}
        propId={propId}
        size="md"
        tone="tv"
        watermarkChar={gathering.hostFirstName[0]}
      />
    </div>
  );
}
