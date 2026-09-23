import Link from "next/link";
import { overview } from "@/content/overview";

export function PaperOpen() {
  return (
    <section className="bg-brand-black">
      <div className="mx-auto w-full max-w-6xl px-4 pt-10 pb-10 sm:px-6 lg:px-8 lg:pt-16 lg:pb-12">
        <h1 className="type-hero mb-6 max-w-[18ch] text-[1.85rem] font-bold text-brand-ink sm:max-w-[18ch] sm:text-[2.5rem] xl:text-[3rem]">
          {overview.headline}
        </h1>

        <div className="ncr-copy mb-6 max-w-[40ch]">
          <p className="type-docket text-[0.95rem] leading-relaxed text-brand-ink sm:text-base">
            {overview.walkLine}
          </p>
        </div>

        <div className="docket-perf mb-6 max-w-xl" aria-hidden="true" />

        <div className="flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3">
          <Link href={overview.primaryCta.href} className="btn-primary min-h-11">
            {overview.primaryCta.label}
          </Link>
          <Link href={overview.secondaryCta.href} className="btn-text min-h-11">
            {overview.secondaryCta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
