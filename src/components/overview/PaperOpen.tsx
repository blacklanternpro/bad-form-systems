import Link from "next/link";
import { overview } from "@/content/overview";

export function PaperOpen() {
  return (
    <section className="bg-brand-black">
      <div className="mx-auto w-full max-w-6xl px-4 pt-10 pb-12 sm:px-6 lg:px-8 lg:pt-16 lg:pb-16">
        <h1 className="type-hero mb-5 max-w-[20ch] text-[2.5rem] font-bold text-brand-ink xl:text-[3rem]">
          {overview.headline}
        </h1>
        <p className="type-docket mb-8 max-w-[36ch] border-t border-brand-ply pt-3 text-base text-brand-ink">
          {overview.walkLine}
        </p>
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
