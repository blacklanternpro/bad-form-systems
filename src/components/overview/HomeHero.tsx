import Link from "next/link";
import { overview } from "@/content/overview";
import { OverlayPlate } from "@/components/overview/OverlayPlate";

export function HomeHero() {
  const { heroImage } = overview;

  return (
    <section className="deck-screen relative overflow-hidden bg-brand-ink">
      {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed still; avoid next/image re-encode of the cab plate */}
      <img
        src={heroImage.src}
        alt={heroImage.alt}
        width={heroImage.width}
        height={heroImage.height}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="relative z-10 flex min-h-[calc(100dvh-5.25rem)] w-full flex-col items-start justify-start px-4 py-7 sm:px-7 lg:items-end lg:px-10 xl:pr-16">
        <OverlayPlate as="header" className="deck-enter">
          <h1 className="type-hero mb-5 max-w-[13ch] text-[clamp(2.75rem,7vw+1.1rem,5.4rem)] text-brand-ink">
            {overview.headline}
          </h1>
          <p className="type-docket mb-7 max-w-[28ch] border-y border-brand-ply py-3 text-base text-brand-ink">
            {overview.walkLine}
          </p>
          <Link href={overview.primaryCta.href} className="btn-text">
            {overview.primaryCta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </OverlayPlate>
        <p className="sr-only">{overview.fieldApp.demoNote}</p>
      </div>
    </section>
  );
}
