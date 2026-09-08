import Link from "next/link";
import { overview } from "@/content/overview";

export function HomeHero() {
  const { heroImage } = overview;

  return (
    <section className="relative min-h-[70dvh] overflow-hidden bg-brand-ink lg:min-h-[calc(100dvh-5.25rem)]">
      {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed still; avoid next/image re-encode of the cab plate */}
      <img
        src={heroImage.src}
        alt={heroImage.alt}
        width={heroImage.width}
        height={heroImage.height}
        className="absolute inset-0 h-full w-full object-cover object-[60%_82%] xl:object-[62%_72%]"
      />
      <div className="relative z-10 flex min-h-[70dvh] w-full min-w-0 max-w-[32rem] flex-col items-start justify-start px-4 pt-6 pb-8 sm:px-7 sm:pt-8 lg:min-h-[calc(100dvh-5.25rem)] lg:px-10 xl:pl-14">
        <header>
          <h1 className="type-hero type-on-still mb-5 max-w-[16ch] min-w-0 text-[2.5rem] font-bold xl:text-[3rem]">
            {overview.headline}
          </h1>
          <p className="type-docket type-on-still-docket mb-4 max-w-[34ch] border-t border-brand-ply pt-3 text-base">
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
