import Link from "next/link";
import { SeamType } from "@/components/overview/SeamType";
import { overview } from "@/content/overview";

export function HomeHero() {
  const { heroImage } = overview;

  return (
    <section>
      <div className="relative min-h-[50dvh] overflow-hidden bg-brand-ink lg:min-h-[calc(100dvh-5.25rem)]">
        {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed still; avoid next/image re-encode of the cab plate */}
        <img
          src={heroImage.src}
          alt={heroImage.alt}
          width={heroImage.width}
          height={heroImage.height}
          className="absolute inset-0 h-full w-full object-cover object-[42%_38%] xl:object-[44%_36%]"
        />
        <p className="sr-only">{overview.fieldApp.demoNote}</p>
      </div>
      <div className="relative bg-brand-black pb-6 pt-0 md:pb-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
