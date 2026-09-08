import Link from "next/link";
import { overview } from "@/content/overview";

export function HomeHero() {
  const { heroImage } = overview;

  return (
    <section className="overflow-hidden bg-brand-black">
      <img
        src={heroImage.src}
        alt={heroImage.alt}
        width={heroImage.width}
        height={heroImage.height}
        className="h-[min(52vh,26rem)] w-full object-cover object-center sm:h-[min(62vh,36rem)] lg:h-[min(78vh,46rem)]"
      />
      <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-12 xl:pl-14">
        <h1 className="type-hero mb-6 max-w-[13ch] text-[clamp(2.15rem,6.2vw+0.4rem,5.4rem)] text-brand-ink">
          {overview.headline}
        </h1>
        <p className="type-docket mb-8 max-w-[28ch] border-y border-brand-ply py-3 text-brand-ink">
          {overview.walkLine}
        </p>
        <Link href={overview.primaryCta.href} className="btn-text">
          {overview.primaryCta.label}
          <span aria-hidden="true">→</span>
        </Link>
        <p className="sr-only">{overview.fieldApp.demoNote}</p>
      </div>
    </section>
  );
}
