import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { PreviewSwitcher } from "@/components/preview-switcher";

const screens = [
  {
    num: "01",
    href: "/host",
    surface: "Web · Desktop",
    title: "Host setup",
    whisper: "Where the evening takes shape.",
    gradient:
      "bg-[linear-gradient(135deg,#fff1de_0%,#f7d9b4_38%,#e89b4c_72%,#b43a2a_100%)]",
  },
  {
    num: "02",
    href: "/guest",
    surface: "Web · Mobile",
    title: "Guest requests",
    whisper: "A QR code on the bar.",
    gradient:
      "bg-[linear-gradient(160deg,#fde4c6_0%,#f3b58a_42%,#c8593f_82%,#6b4a52_100%)]",
  },
  {
    num: "03",
    href: "/tv",
    surface: "TV · 16:9",
    title: "Visual layer",
    whisper: "An ambient golden hour for the room.",
    gradient:
      "bg-[linear-gradient(165deg,#f7d9b4_0%,#e89b4c_38%,#b43a2a_70%,#6b6890_100%)]",
  },
];

export default function Landing() {
  return (
    <main className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-cream lg:h-dvh lg:min-h-[680px]">
      {/* Soft sun orbs — atmospheric, not decorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-48 -bottom-48 h-[640px] w-[640px] rounded-full bg-gradient-to-br from-amber/35 via-coral/25 to-sunset/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[460px] w-[460px] rounded-full bg-gradient-to-br from-peach/40 via-amber/25 to-coral/15 blur-[110px]"
      />
      {/* Hairline horizon — subtle structural element */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-px w-[140%] -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] bg-gradient-to-r from-transparent via-warm-ink/8 to-transparent"
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 pt-7 sm:px-10 sm:pt-9 lg:px-16 lg:pt-10 fade-up">
        <Wordmark />
        <p className="hidden text-[10.5px] uppercase tracking-[0.36em] text-warm-ink/50 sm:block">
          Mockup preview · v0.1
        </p>
      </header>

      {/* Center split */}
      <section className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-1 flex-col items-stretch gap-10 px-6 pt-10 pb-24 sm:px-10 sm:pt-14 lg:flex-row lg:items-center lg:gap-20 lg:px-16 lg:py-0">
        {/* Left: editorial hero */}
        <div className="flex flex-1 flex-col gap-7 lg:max-w-[640px]">
          <div
            className="flex items-center gap-3 fade-up"
            style={{ animationDelay: "60ms" }}
          >
            <span
              aria-hidden
              className="h-px w-10 bg-gradient-to-r from-amber via-coral to-sunset"
            />
            <p className="text-[10.5px] uppercase tracking-[0.42em] text-warm-ink/55">
              Sol Hour Host Kit · Initial direction
            </p>
          </div>

          <h1
            className="text-[clamp(30px,3.3vw,44px)] font-light leading-[1.08] tracking-[-0.018em] text-warm-ink fade-up"
            style={{ animationDelay: "120ms" }}
          >
            A quietly elevated{" "}
            <span className="italic font-normal text-sunset">
              gathering,
            </span>{" "}
            wrapped in{" "}
            <span className="italic font-normal text-sunset">
              golden hour.
            </span>
          </h1>

          <p
            className="max-w-md text-[14.5px] leading-[1.6] text-warm-ink/65 fade-up"
            style={{ animationDelay: "200ms" }}
          >
            Three surfaces, one feeling. The host&rsquo;s setup on web, the
            guest&rsquo;s page on mobile, and an ambient visual layer for the
            room&rsquo;s screen &mdash; each shaped by the brand brief.
          </p>

          <div
            className="flex items-center gap-4 pt-2 fade-up"
            style={{ animationDelay: "280ms" }}
          >
            <p className="text-[10.5px] uppercase tracking-[0.42em] text-warm-ink/45">
              Warm humanist type · Restrained icons · Motion like light
            </p>
          </div>
        </div>

        {/* Right: 3 compact cards */}
        <div className="flex w-full shrink-0 flex-col gap-3 lg:w-[420px]">
          {screens.map((s, i) => (
            <Link
              key={s.href}
              href={s.href}
              className="group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-warm-ink/10 bg-cream/80 p-3 backdrop-blur-md transition-all duration-500 hover:border-warm-ink/25 hover:bg-cream hover:shadow-[0_22px_50px_-22px_rgba(180,58,42,0.4)] fade-up"
              style={{ animationDelay: `${340 + i * 90}ms` }}
            >
              {/* Gradient swatch */}
              <div
                className={`relative h-[78px] w-[92px] shrink-0 overflow-hidden rounded-xl ${s.gradient}`}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-55 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "radial-gradient(60% 50% at 28% 32%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 65%)",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Text block */}
              <div className="min-w-0 flex-1 py-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-warm-ink/40">
                    {s.num}
                  </span>
                  <span
                    aria-hidden
                    className="h-px flex-1 bg-warm-ink/10"
                  />
                  <span className="text-[9.5px] uppercase tracking-[0.3em] text-warm-ink/45">
                    {s.surface}
                  </span>
                </div>
                <p className="mt-2 text-[15.5px] font-medium tracking-tight text-warm-ink">
                  {s.title}
                </p>
                <p className="mt-0.5 truncate text-[12px] text-warm-ink/55">
                  {s.whisper}
                </p>
              </div>

              {/* Slim arrow */}
              <span
                aria-hidden
                className="flex shrink-0 items-center gap-1 pr-2 text-warm-ink/30 transition-all duration-300 group-hover:text-sunset"
              >
                <span className="h-px w-4 bg-current transition-all duration-300 group-hover:w-7" />
                <span className="text-[14px] leading-none">&rsaquo;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-warm-ink/8 pb-20 sm:pb-0">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-2 px-6 py-5 text-[10.5px] uppercase tracking-[0.32em] text-warm-ink/55 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
          <span>Free for hosts · A Leon Y Sol experience</span>
          <div className="flex items-center gap-5">
            <span>Apple Music only · v1</span>
            <span aria-hidden className="h-px w-3 bg-warm-ink/20" />
            <span>Closed beta · 50 hosts</span>
          </div>
        </div>
      </footer>

      <PreviewSwitcher variant="ink" />
    </main>
  );
}
