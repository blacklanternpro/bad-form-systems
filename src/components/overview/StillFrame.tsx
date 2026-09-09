import type { OverviewStill } from "@/content/overview";

interface StillFrameProps {
  still: OverviewStill;
}

export function StillFrame({ still }: StillFrameProps) {
  return (
    <section>
      <figure className="relative min-h-[50dvh] overflow-hidden bg-brand-ink lg:min-h-[calc(100dvh-5.25rem)]">
        {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed still; avoid next/image re-encode of the plate */}
        <img
          src={still.src}
          alt={still.alt}
          width={still.width}
          height={still.height}
          className={`absolute inset-0 h-full w-full object-cover ${still.objectPositionClass}`}
        />
        <figcaption className="sr-only">{still.demoNote}</figcaption>
      </figure>
    </section>
  );
}
