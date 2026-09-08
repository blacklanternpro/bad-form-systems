import Link from "next/link";
import { overview } from "@/content/overview";

export function HomeHero() {
  const { heroImage } = overview;

  return (
    <section className="relative min-h-[calc(100dvh-5.25rem)] overflow-hidden bg-brand-ink">
      {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed still; avoid next/image re-encode of the cab plate */}
      <img
        src={heroImage.src}
        alt={heroImage.alt}
        width={heroImage.width}
        height={heroImage.height}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="relative z-10 flex min-h-[calc(100dvh-5.25rem)] w-full max-w-[40rem] flex-col items-start justify-start px-4 py-8 sm:px-7 lg:px-10 xl:pl-14">
        <header>
          <h1 className="type-hero type-on-still mb-5 max-w-[13ch] text-[clamp(2.75rem,7vw+1.1rem,5.4rem)]">
            {overview.headline}
          </h1>
          <p className="type-docket type-on-still-docket mb-7 max-w-[28ch] border-y border-brand-ply py-3 text-base">
            {overview.walkLine}
          </p>
          <Link href={overview.primaryCta.href} className="btn-text btn-text-on-still">
            {overview.primaryCta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </header>
        <p className="sr-only">{overview.fieldApp.demoNote}</p>
      </div>
    </section>
  );
}
