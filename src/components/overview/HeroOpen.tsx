import Link from "next/link";
import { overview } from "@/content/overview";

export function HeroOpen() {
  const { headline, walk, still } = overview.hero;

  return (
    <section className="bg-brand-black lg:grid lg:grid-cols-2 lg:items-center">
      {/* The copy sits in a half viewport grid cell, so its left padding has to
          reproduce the centred page container's left margin by hand. Otherwise
          the headline hangs off the line every heading below it sits on. */}
      <div className="px-4 pt-8 pb-10 sm:px-6 lg:py-16 lg:pr-10 lg:pl-[max(2rem,calc((100vw-72rem)/2+2rem))]">
        <div className="lg:max-w-[30rem]">
          <h1 className="type-hero enter mb-5 max-w-[15ch] text-[2.1rem] font-bold text-brand-ink sm:text-[2.6rem] xl:text-[3.25rem]">
            {headline}
          </h1>
          <p
            className="type-docket enter mb-8 max-w-[40ch] border-t border-brand-ply pt-3 text-[0.95rem] text-brand-ink sm:text-base"
            style={{ "--enter-delay": "90ms" } as React.CSSProperties}
          >
            {walk}
          </p>
          <div
            className="enter flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3"
            style={{ "--enter-delay": "180ms" } as React.CSSProperties}
          >
            <Link href={overview.primaryCta.href} className="btn-primary min-h-11">
              {overview.primaryCta.label}
            </Link>
            <Link href={overview.secondaryCta.href} className="btn-text min-h-11">
              {overview.secondaryCta.label}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      <figure
        className="enter relative aspect-[3/4] w-full overflow-hidden sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[34rem] xl:min-h-[38rem]"
        style={{ "--enter-delay": "60ms" } as React.CSSProperties}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- composited still; next/image would re-encode the plate */}
        <img
          src={still.src}
          alt={still.alt}
          width={still.width}
          height={still.height}
          className={`still-dissolve absolute inset-0 h-full w-full object-cover ${still.objectPositionClass}`}
        />
        <figcaption className="sr-only">{still.demoNote}</figcaption>
      </figure>
    </section>
  );
}
