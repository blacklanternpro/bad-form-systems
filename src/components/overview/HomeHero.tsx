import Link from "next/link";
import { overview } from "@/content/overview";

export function HomeHero() {
  const { heroImage } = overview;

  return (
    <section className="relative min-h-[calc(100dvh-5.25rem)] overflow-hidden bg-brand-ink">
      <img
        src={heroImage.src}
        alt={heroImage.alt}
        width={heroImage.width}
        height={heroImage.height}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="relative z-10 flex min-h-[calc(100dvh-5.25rem)] max-w-[42rem] flex-col justify-center px-5 py-12 sm:px-8 lg:px-10 xl:pl-14">
        <h1 className="type-hero mb-6 max-w-[13ch] text-[clamp(2.15rem,5.4vw+0.5rem,5.4rem)] text-brand-black">
          {overview.headline}
        </h1>
        <p className="type-docket mb-8 max-w-[28ch] border-y border-brand-ply py-3 text-brand-black">
          {overview.walkLine}
        </p>
        <Link
          href={overview.primaryCta.href}
          className="btn-text border-brand-ply text-brand-black hover:border-brand-stamp hover:text-brand-stamp"
        >
          {overview.primaryCta.label}
          <span aria-hidden="true">→</span>
        </Link>
        <p className="sr-only">{overview.fieldApp.demoNote}</p>
      </div>
    </section>
  );
}
