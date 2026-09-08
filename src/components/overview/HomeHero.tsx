import Link from "next/link";
import { overview } from "@/content/overview";

export function HomeHero() {
  const { heroImage } = overview;

  return (
    <section className="relative overflow-hidden bg-brand-ink">
      <div className="relative lg:min-h-[calc(100dvh-5.25rem)]">
        <img
          src={heroImage.src}
          alt={heroImage.alt}
          width={heroImage.width}
          height={heroImage.height}
          className="h-[min(52vh,26rem)] w-full object-cover object-[center_35%] sm:h-[min(58vh,32rem)] lg:absolute lg:inset-0 lg:h-full lg:object-center"
        />
        <div className="relative z-10 bg-brand-black px-5 py-8 sm:px-8 lg:flex lg:min-h-[calc(100dvh-5.25rem)] lg:max-w-[42rem] lg:flex-col lg:justify-center lg:bg-transparent lg:px-10 lg:py-16 xl:pl-14">
          <h1 className="type-hero mb-6 max-w-[13ch] text-[clamp(2.15rem,6.2vw+0.4rem,5.4rem)] text-brand-ink lg:text-brand-black">
            {overview.headline}
          </h1>
          <p className="type-docket mb-8 max-w-[28ch] border-y border-brand-ply py-3 text-brand-ink lg:text-brand-black">
            {overview.walkLine}
          </p>
          <Link
            href={overview.primaryCta.href}
            className="btn-text lg:border-brand-ply lg:text-brand-black lg:hover:border-brand-stamp lg:hover:text-brand-stamp"
          >
            {overview.primaryCta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <p className="sr-only">{overview.fieldApp.demoNote}</p>
      </div>
    </section>
  );
}
