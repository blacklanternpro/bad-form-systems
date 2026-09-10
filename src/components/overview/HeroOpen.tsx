import Link from "next/link";
import { overview } from "@/content/overview";

export function HeroOpen() {
  const { headline, walk, still } = overview.hero;

  return (
    <section className="bg-brand-black lg:grid lg:grid-cols-2 lg:items-center">
      <div className="px-4 pt-8 pb-10 sm:px-6 lg:justify-self-end lg:py-16 lg:pr-10 lg:pl-8">
        <div className="lg:max-w-[30rem]">
          <h1 className="type-hero mb-5 max-w-[15ch] text-[2.1rem] font-bold text-brand-ink sm:text-[2.6rem] xl:text-[3.25rem]">
            {headline}
          </h1>
          <p className="type-docket mb-8 max-w-[40ch] border-t border-brand-ply pt-3 text-[0.95rem] text-brand-ink sm:text-base">
            {walk}
          </p>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3">
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

      <figure className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[34rem] xl:min-h-[38rem]">
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
    </section>
  );
}
