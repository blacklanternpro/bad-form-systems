import type { OverviewStill } from "@/content/overview";

interface StillFrameProps {
  still: OverviewStill;
  /** Photographs run shorter inside the product band than as a page opener. */
  height?: "band" | "full";
}

const heights = {
  band: "min-h-[44dvh] sm:min-h-[52dvh] lg:min-h-[68dvh]",
  full: "min-h-[50dvh] lg:min-h-[calc(100dvh-5.25rem)]",
} as const;

export function StillFrame({ still, height = "band" }: StillFrameProps) {
  return (
    <figure className={`relative overflow-hidden bg-brand-ink ${heights[height]}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- composited still; next/image would re-encode the plate */}
      <img
        src={still.src}
        alt={still.alt}
        width={still.width}
        height={still.height}
        className={`absolute inset-0 h-full w-full object-cover ${still.objectPositionClass}`}
      />
      <figcaption className="sr-only">{still.demoNote}</figcaption>
    </figure>
  );
}
