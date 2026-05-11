import Link from "next/link";

type Variant = "ink" | "cream" | "orange";

const variantSrc: Record<Variant, string> = {
  ink: "/logos/orange.png?v=3",
  cream: "/logos/white.png?v=3",
  orange: "/logos/orange.png?v=3",
};

const sizePx: Record<"sm" | "md" | "lg", { w: number; h: number }> = {
  sm: { w: 92, h: 22 },
  md: { w: 118, h: 28 },
  lg: { w: 168, h: 40 },
};

export function Wordmark({
  size = "md",
  tone = "ink",
  href = "/",
  asLink = true,
}: {
  size?: "sm" | "md" | "lg";
  tone?: Variant;
  href?: string;
  asLink?: boolean;
}) {
  const { w, h } = sizePx[size];
  const src = variantSrc[tone];

  const inner = (
    // Using plain <img> to bypass Next.js image optimizer caching
    // (logo source files were JPEGs from the client; we regenerated PNGs with transparency)
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Sol Hour"
      width={w}
      height={h}
      className="select-none block"
      style={{ width: w, height: "auto" }}
    />
  );

  if (!asLink) {
    return <div className="inline-flex items-center">{inner}</div>;
  }

  return (
    <Link
      href={href}
      aria-label="Sol Hour — Back to overview"
      className="inline-flex items-center transition-opacity duration-300 hover:opacity-80"
    >
      {inner}
    </Link>
  );
}
