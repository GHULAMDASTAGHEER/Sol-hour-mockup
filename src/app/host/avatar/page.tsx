"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "@/components/wordmark";
import { PreviewSwitcher } from "@/components/preview-switcher";
import { BracketButton } from "@/components/bracket-button";
import { HostAvatarDisplay } from "@/components/host-avatar-display";
import { propLibrary, phaseGradient, type Phase } from "@/lib/gathering";
import {
  fileToResizedJpegDataUrl,
  readAvatarSession,
  writeAvatarSession,
} from "@/lib/avatar-session";

export default function AvatarPage() {
  const [selectedProp, setSelectedProp] = useState<string>("shades");
  const [phase, setPhase] = useState<Phase>("peak");
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  /** Avoid writing default state before we have read from localStorage (that was wiping saves). */
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    const saved = readAvatarSession();
    if (saved) {
      setSelectedProp(saved.propId);
      setPhase(saved.phase);
      setCustomPhoto(saved.photoDataUrl);
    }
    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    writeAvatarSession({
      photoDataUrl: customPhoto,
      propId: selectedProp,
      phase,
    });
  }, [storageReady, customPhoto, selectedProp, phase]);

  const prop = propLibrary.find((p) => p.id === selectedProp);

  async function onPhotoPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setPhotoError(null);
    try {
      const dataUrl = await fileToResizedJpegDataUrl(file);
      setCustomPhoto(dataUrl);
    } catch {
      setPhotoError("Could not load that image. Try a JPG or PNG.");
    }
  }

  return (
    <main className="sol-backdrop sol-grain relative isolate flex min-h-screen flex-col">
      <header className="relative z-10 mx-auto flex w-full max-w-[1240px] items-center justify-between px-6 pt-7 sm:px-10 sm:pt-10 lg:px-16 lg:pt-12 fade-up">
        <Wordmark tone="ink" />
        <BracketButton href="/host" tone="ink" size="sm">
          Back to setup
        </BracketButton>
      </header>

      <section className="relative z-10 mx-auto grid w-full max-w-[1240px] flex-1 grid-cols-1 gap-12 px-6 pt-12 pb-28 sm:px-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-16 lg:py-14">
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

          <div className="relative overflow-hidden rounded-3xl border border-warm-ink/12 bg-warm-ink shadow-[0_30px_80px_-30px_rgba(180,58,42,0.45)]">
            <div
              className={`sol-grain relative aspect-video bg-gradient-to-br ${phaseGradient(phase)}`}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(20,8,4,0.5) 0%, rgba(20,8,4,0) 100%)",
                }}
              />
              <div className="absolute left-5 top-4 sm:left-7 sm:top-6">
                <Wordmark size="sm" tone="cream" asLink={false} />
              </div>
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
              <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7">
                <HostAvatarDisplay
                  customPhotoDataUrl={customPhoto}
                  propId={selectedProp}
                  size="sm"
                  tone="setup"
                />
              </div>
            </div>
          </div>

          <p className="text-[11px] uppercase tracking-[0.36em] text-warm-ink/45">
            Preview · How you appear during {phase.replace("-", " ")}
          </p>
        </div>

        <div
          className="flex flex-col gap-8 fade-up"
          style={{ animationDelay: "160ms" }}
        >
          <div>
            <p className="text-[10.5px] uppercase tracking-[0.42em] text-warm-ink/55">
              Your photo
            </p>
            <div className="mt-4 flex items-center gap-5">
              <div className="relative">
                <HostAvatarDisplay
                  customPhotoDataUrl={customPhoto}
                  propId={selectedProp}
                  size="lg"
                  tone="setup"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <label className="group inline-flex w-fit cursor-pointer items-center gap-3 rounded-full border border-warm-ink/20 bg-cream/70 px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.28em] text-warm-ink backdrop-blur-md transition-all duration-300 hover:border-warm-ink/40 hover:bg-cream">
                  <span
                    aria-hidden
                    className="relative flex h-4 w-4 items-center justify-center"
                  >
                    <span className="block h-px w-3 bg-warm-ink" />
                    <span className="absolute block h-3 w-px bg-warm-ink" />
                  </span>
                  {customPhoto ? "Replace photo" : "Upload photo"}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/heic"
                    className="sr-only"
                    onChange={onPhotoPick}
                  />
                </label>
                {customPhoto && (
                  <button
                    type="button"
                    onClick={() => {
                      setCustomPhoto(null);
                      setPhotoError(null);
                    }}
                    className="w-fit text-[11px] uppercase tracking-[0.28em] text-warm-ink/55 underline-offset-4 transition-all hover:text-sunset hover:underline"
                  >
                    Remove
                  </button>
                )}
                {photoError && (
                  <p className="text-[12px] text-sunset">{photoError}</p>
                )}
                <p className="text-[11.5px] leading-[1.55] text-warm-ink/55">
                  A casual phone photo is perfect — soft warm tone and gentle
                  vignette are applied automatically.
                </p>
              </div>
            </div>
          </div>

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
