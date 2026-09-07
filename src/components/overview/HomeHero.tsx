import Link from "next/link";
import { overview } from "@/content/overview";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-brand-black">
      <div className="grid min-h-[calc(100dvh-5.25rem)] lg:grid-cols-[minmax(18rem,36vw)_minmax(0,1fr)]">
        <div className="relative z-10 px-5 py-10 sm:px-8 lg:px-10 lg:py-12 xl:pl-14">
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

        <figure className="relative min-h-[22rem] sm:min-h-[28rem] lg:min-h-0 lg:[mask-image:linear-gradient(to_right,transparent,black_4.5rem)] lg:[-webkit-mask-image:linear-gradient(to_right,transparent,black_4.5rem)]">
          <img
            src="/images/field-hand-bleed.webp"
            alt="Work-worn hand holding a phone open on a theoretical field IMS with jobs, docket photo, hours, pre-start, variations, and certificates."
            width={1536}
            height={1024}
            className="h-full w-full object-cover object-[68%_center] lg:object-right"
          />
          <figcaption className="sr-only">{overview.fieldApp.demoNote}</figcaption>
        </figure>
      </div>
    </section>
  );
}
