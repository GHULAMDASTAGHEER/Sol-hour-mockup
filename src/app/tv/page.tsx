import { Wordmark } from "@/components/wordmark";
import { PreviewSwitcher } from "@/components/preview-switcher";
import { gathering } from "@/lib/gathering";

export default function TVPage() {
  return (
    <main className="sol-tv-backdrop sol-grain relative isolate flex min-h-screen flex-col overflow-hidden">
      {/* Subtle dark scrim at the top + bottom to anchor text */}
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

      {/* Top-left: wordmark */}
      <div className="relative z-10 flex items-start justify-between gap-4 px-6 pt-7 sm:px-10 sm:pt-10 lg:px-16 lg:pt-14 fade-up">
        <Wordmark tone="cream" size="md" />
        <div className="flex items-center gap-2.5 text-[10px] uppercase tracking-[0.32em] text-cream/65">
          <PhasePip active={gathering.phase === "warm-up"} label="Warm" />
          <span aria-hidden className="h-px w-5 bg-cream/25" />
          <PhasePip active={gathering.phase === "peak"} label="Peak" />
          <span aria-hidden className="h-px w-5 bg-cream/25" />
          <PhasePip active={gathering.phase === "wind-down"} label="Wind" />
        </div>
      </div>

      {/* Center signature moment */}
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
            Peak · {Math.round(gathering.phaseProgress * 100)}% through
          </span>
          <span aria-hidden className="h-px w-12 bg-cream/40 sm:w-20" />
        </div>
      </div>

      {/* Bottom row */}
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
          <HostAvatar />
        </div>
      </div>

      <PreviewSwitcher variant="cream" />
    </main>
  );
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

function HostAvatar() {
  return (
    <div className="relative">
      <p className="absolute -top-7 right-1 text-[10px] uppercase tracking-[0.36em] text-cream/55">
        Hosted by {gathering.hostFirstName}
      </p>
      <div className="relative h-[96px] w-[96px] sm:h-[120px] sm:w-[120px]">
        {/* Soft halo behind */}
        <div
          aria-hidden
          className="absolute -inset-4 rounded-full bg-gradient-to-br from-amber/35 via-coral/25 to-sunset/15 blur-xl"
        />
        {/* Disc — stylized warm gradient, no literal face */}
        <div className="relative h-full w-full overflow-hidden rounded-full border border-cream/25 shadow-[0_10px_40px_-10px_rgba(42,24,16,0.7)]">
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-[#ffdcb8] via-[#f0a06f] to-[#a83a26]"
          />
          {/* Soft light streak — suggests a portrait glow */}
          <div
            aria-hidden
            className="absolute -inset-2 rotate-[18deg] opacity-60"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,241,222,0.55) 0%, rgba(255,241,222,0) 38%)",
            }}
          />
          {/* Grain inside disc for warmth */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            }}
          />
          {/* Sunglasses prop */}
          <svg
            viewBox="0 0 120 36"
            className="absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2"
            aria-hidden
          >
            <defs>
              <linearGradient id="lensTop" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#2a1810" />
                <stop offset="100%" stopColor="#0e0805" />
              </linearGradient>
              <linearGradient id="lensShine" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,212,184,0.45)" />
                <stop offset="60%" stopColor="rgba(255,212,184,0)" />
              </linearGradient>
            </defs>
            <rect
              x="6"
              y="6"
              width="44"
              height="24"
              rx="12"
              fill="url(#lensTop)"
            />
            <rect
              x="70"
              y="6"
              width="44"
              height="24"
              rx="12"
              fill="url(#lensTop)"
            />
            <rect
              x="6"
              y="6"
              width="44"
              height="24"
              rx="12"
              fill="url(#lensShine)"
            />
            <rect
              x="70"
              y="6"
              width="44"
              height="24"
              rx="12"
              fill="url(#lensShine)"
            />
            <path
              d="M50 16 Q60 9 70 16"
              stroke="#2a1810"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          {/* Initial as subtle watermark */}
          <span className="absolute bottom-1 right-2 text-[10px] font-medium uppercase tracking-[0.32em] text-cream/55">
            {gathering.hostFirstName[0]}
          </span>
        </div>
        {/* Live chip */}
        <div className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-warm-ink/75 px-2.5 py-1 backdrop-blur">
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-sunset soft-pulse"
          />
          <span className="text-[9px] uppercase tracking-[0.32em] text-cream/90">
            Live
          </span>
        </div>
      </div>
    </div>
  );
}
