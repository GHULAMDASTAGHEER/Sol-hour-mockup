import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { PreviewSwitcher } from "@/components/preview-switcher";
import { BracketButton } from "@/components/bracket-button";

const screens = [
  {
    num: "01",
    href: "/host",
    surface: "Web · Desktop",
    title: "Host the evening",
    whisper: "Shape the arc. Choose the room.",
    gradient:
      "bg-[linear-gradient(135deg,#fff1de_0%,#f7d9b4_38%,#e89b4c_72%,#b43a2a_100%)]",
  },
  {
    num: "02",
    href: "/host/avatar",
    surface: "Web · Desktop",
    title: "You, as the DJ",
    whisper: "A portrait. A prop. The room sees you.",
    gradient:
      "bg-[linear-gradient(140deg,#ffdcb8_0%,#f0a06f_46%,#a83a26_78%,#5e2418_100%)]",
  },
  {
    num: "03",
    href: "/guest",
    surface: "Web · Mobile",
    title: "The guests pour in",
    whisper: "A QR on the bar. A song in the queue.",
    gradient:
      "bg-[linear-gradient(160deg,#fde4c6_0%,#f3b58a_42%,#c8593f_82%,#6b4a52_100%)]",
  },
  {
    num: "04",
    href: "/tv",
    surface: "TV · 16:9",
    title: "Golden hour, alive",
    whisper: "Ambient light for the room.",
    gradient:
      "bg-[linear-gradient(165deg,#f7d9b4_0%,#e89b4c_38%,#b43a2a_70%,#6b6890_100%)]",
  },
];

export default function Landing() {
  return (
    <main className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-[#030201] text-[var(--color-sol-gold-soft)] lg:h-dvh lg:min-h-[720px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 sol-overview-backdrop"
      />
      {/* Header strip: main radial sits above viewport center — this pulls gold into the very top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[min(340px,45dvh)] bg-gradient-to-b from-[rgba(255,205,165,0.32)] via-[rgba(180,85,48,0.12)] to-transparent"
      />
      <div
        aria-hidden
        className="sol-grain pointer-events-none absolute inset-0 z-[2] opacity-[0.09]"
      />

      <header className="relative z-10 flex items-center justify-between px-6 pt-7 sm:px-10 sm:pt-9 lg:px-16 lg:pt-10 fade-up">
        <Wordmark tone="cream" />
        <p className="hidden text-[10.5px] uppercase tracking-[0.36em] text-white/40 sm:block">
          Host kit · Mockup preview
        </p>
      </header>

      <section className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-1 flex-col items-stretch gap-12 px-6 pt-10 pb-24 sm:px-10 sm:pt-14 lg:flex-row lg:items-center lg:gap-20 lg:px-16 lg:py-0">
        <div className="flex flex-1 flex-col gap-8 lg:max-w-[640px]">
          <div
            className="flex flex-col gap-5 fade-up"
            style={{ animationDelay: "60ms" }}
          >
            <h1 className="font-sol-display text-[clamp(42px,5vw,64px)] font-light leading-[1.02] tracking-[-0.02em] text-[var(--color-sol-gold)]">
              Sol Hour
            </h1>
            <p className="max-w-lg text-[clamp(17px,1.9vw,21px)] font-light leading-[1.55] text-white/78">
              That moment when the light turns golden, the day lets go, and the
              people who matter are within arm&rsquo;s reach.
            </p>
            <p className="text-[10.5px] font-medium uppercase tracking-[0.38em] text-[var(--color-sol-gold)]/85">
              Every Thursday · Every city · For people who show up
            </p>
          </div>

          <div className="fade-up" style={{ animationDelay: "120ms" }}>
            <BracketButton href="/host" tone="gold" size="md">
              Discover the ritual
            </BracketButton>
          </div>

          <div
            className="flex max-w-xl flex-col gap-4 border-t border-white/10 pt-8 fade-up"
            style={{ animationDelay: "180ms" }}
          >
            <h2 className="font-sol-display text-[clamp(26px,2.8vw,34px)] font-light leading-[1.12] text-[var(--color-sol-gold)]">
              Sol Hour is not a happy hour.
            </h2>
            <p className="text-[14.5px] leading-[1.65] text-white/58">
              It&rsquo;s a pause. A ritual. The moment between the last thing you
              had to do and the first person you wanted to see. It&rsquo;s the
              golden-hour gathering — that window when the light is perfect, the
              conversation gets real, and the drink in your hand was poured with
              intention.
            </p>
            <p className="text-[13px] leading-[1.6] text-white/45">
              Four surfaces in this preview — where the host shapes the arc,
              becomes the DJ in the room, lets guests pour in their requests, and
              lets the golden hour fill the screen.
            </p>
          </div>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-2 lg:w-[440px]">
          <p
            className="mb-1 text-[10px] uppercase tracking-[0.32em] text-white/35 fade-up"
            style={{ animationDelay: "260ms" }}
          >
            Experience flow
          </p>
          {screens.map((s, i) => (
            <Link
              key={s.href}
              href={s.href}
              className="group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 backdrop-blur-md transition-all duration-500 hover:border-[var(--color-sol-gold)]/25 hover:bg-white/[0.06] hover:shadow-[0_22px_50px_-24px_rgba(201,164,92,0.18)] fade-up"
              style={{ animationDelay: `${300 + i * 70}ms` }}
            >
              <div
                className={`relative h-[68px] w-[84px] shrink-0 overflow-hidden rounded-xl ${s.gradient}`}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-55 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "radial-gradient(60% 50% at 28% 32%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 65%)",
                  }}
                />
              </div>

              <div className="min-w-0 flex-1 py-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-white/35">
                    {s.num}
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-white/10" />
                  <span className="text-[9.5px] uppercase tracking-[0.3em] text-white/40">
                    {s.surface}
                  </span>
                </div>
                <p className="mt-1.5 text-[15px] font-medium tracking-tight text-[var(--color-sol-gold-soft)]">
                  {s.title}
                </p>
                <p className="mt-0.5 truncate text-[11.5px] text-white/45">
                  {s.whisper}
                </p>
              </div>

              <span
                aria-hidden
                className="flex shrink-0 items-center gap-1 pr-2 text-white/25 transition-all duration-300 group-hover:text-[var(--color-sol-gold)]"
              >
                <span className="h-px w-4 bg-current transition-all duration-300 group-hover:w-7" />
                <span className="text-[14px] leading-none">&rsaquo;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/[0.06] pb-20 sm:pb-0">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-2 px-6 py-5 text-[10.5px] uppercase tracking-[0.32em] text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
          <span className="text-[var(--color-sol-gold)]/70">
            For people who show up · A León Y Sol experience
          </span>
          <div className="flex items-center gap-5">
            <span>Apple Music · Host preview</span>
            <span aria-hidden className="h-px w-3 bg-white/20" />
            <span>Mockup v0.3</span>
          </div>
        </div>
      </footer>

      <PreviewSwitcher variant="cream" />
    </main>
  );
}
