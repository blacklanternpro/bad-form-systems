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
        className="absolute inset-0 h-full w-full object-cover object-[58%_78%] xl:object-[62%_70%]"
      />
      <div className="relative z-10 flex min-h-[calc(100dvh-5.25rem)] w-full min-w-0 max-w-[28rem] flex-col items-start justify-start px-4 pt-6 pb-8 sm:px-7 sm:pt-8 lg:px-10 xl:pl-14">
        <header>
          <h1 className="type-hero type-on-still mb-3 max-w-[18ch] min-w-0 text-[1.75rem] xl:text-[2rem]">
            {overview.headline}
          </h1>
          <p className="type-docket type-on-still-docket mb-4 max-w-[36ch] border-y border-brand-ply py-2 text-base">
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
