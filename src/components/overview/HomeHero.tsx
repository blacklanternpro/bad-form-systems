import Link from "next/link";
import { overview } from "@/content/overview";

export function HomeHero() {
  return (
    <section className="overflow-x-clip bg-brand-black">
      <div className="mx-auto grid min-h-[calc(100dvh-5.25rem)] max-w-[90rem] items-center gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-6 lg:px-10 lg:py-2 xl:px-14">
        <div className="max-w-xl lg:py-10">
          <h1 className="type-hero mb-7 max-w-[13ch] text-[clamp(2.4rem,5.4vw+0.6rem,5.75rem)] text-brand-ink">
            {overview.headline}
          </h1>
          <p className="type-docket mb-8 max-w-[38ch] text-brand-ink">{overview.body}</p>
          <p className="type-docket mb-10 max-w-[38ch] border-y border-brand-ply py-3 text-brand-ink">
            {overview.walkLine}
          </p>
          <Link href={overview.primaryCta.href} className="btn-text">
            {overview.primaryCta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <figure className="relative mx-auto w-full max-w-md lg:mx-0 lg:h-[min(46rem,88dvh)] lg:max-w-none">
          <img
            src="/images/field-hand-blended.webp"
            alt="Work-worn hand holding a phone open on a theoretical field IMS with jobs, docket photo, hours, pre-start, variations, and certificates."
            width={1024}
            height={1536}
            className="h-auto w-full bg-transparent object-contain object-center lg:absolute lg:-top-6 lg:-right-8 lg:h-[108%] lg:w-[108%] lg:max-w-none lg:object-contain lg:object-right-bottom"
          />
          <figcaption className="type-docket mt-3 text-xs text-brand-steel lg:sr-only">
            {overview.fieldApp.demoNote}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
