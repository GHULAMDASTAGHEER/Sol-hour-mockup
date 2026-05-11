import Link from "next/link";

export function Wordmark({
  size = "md",
  tone = "ink",
  href = "/",
  asLink = true,
}: {
  size?: "sm" | "md" | "lg";
  tone?: "ink" | "cream";
  href?: string;
  asLink?: boolean;
}) {
  const dot = size === "lg" ? "h-7 w-7" : size === "sm" ? "h-5 w-5" : "h-6 w-6";
  const text =
    size === "lg"
      ? "text-[15px]"
      : size === "sm"
        ? "text-[11px]"
        : "text-[13px]";
  const color = tone === "cream" ? "text-cream" : "text-warm-ink";
  const disc =
    tone === "cream" ? "bg-cream/15 backdrop-blur" : "bg-cream/70 backdrop-blur";

  const inner = (
    <>
      <span
        className={`relative flex ${dot} items-center justify-center`}
        aria-hidden
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-amber via-coral to-sunset" />
        <span className={`absolute inset-[3px] rounded-full ${disc}`} />
      </span>
      <span
        className={`${text} ${color} font-medium uppercase tracking-[0.28em]`}
      >
        Sol Hour
      </span>
    </>
  );

  if (!asLink) {
    return <div className="flex items-center gap-3">{inner}</div>;
  }

  return (
    <Link
      href={href}
      aria-label="Sol Hour — Back to overview"
      className="group flex items-center gap-3 rounded-full transition-opacity duration-300 hover:opacity-80"
    >
      {inner}
    </Link>
  );
}
