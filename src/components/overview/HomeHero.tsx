import Link from "next/link";
import { SeamType } from "@/components/overview/SeamType";
import { overview } from "@/content/overview";

export function HomeHero() {
  const { heroImage } = overview;

  return (
    <section>
      <div className="relative min-h-[50dvh] overflow-visible bg-brand-ink lg:min-h-[calc(100dvh-5.25rem)]">
        <div className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed still; avoid next/image re-encode of the cab plate */}
          <img
            src={heroImage.src}
            alt={heroImage.alt}
            width={heroImage.width}
            height={heroImage.height}
            className="h-full w-full object-cover object-[42%_28%] xl:object-[44%_26%]"
          />
        </div>
        <p className="sr-only">{overview.fieldApp.demoNote}</p>
        <div className="relative z-10 mx-auto flex min-h-[50dvh] w-full max-w-6xl flex-col justify-end px-4 pb-8 sm:px-6 lg:min-h-[calc(100dvh-5.25rem)] lg:px-8">
          <SeamType>
            <header>
              <h1 className="type-hero mb-5 max-w-[16ch] min-w-0 text-[2.5rem] font-bold text-brand-ink xl:text-[3rem]">
                {overview.headline}
              </h1>
              <p className="type-docket mb-4 max-w-[34ch] border-t border-brand-ply pt-3 text-base text-brand-ink">
                {overview.walkLine}
              </p>
              <Link href={overview.primaryCta.href} className="btn-text min-h-11">
                {overview.primaryCta.label}
                <span aria-hidden="true">→</span>
              </Link>
            </header>
          </SeamType>
        </div>
      </div>
    </section>
  );
}
