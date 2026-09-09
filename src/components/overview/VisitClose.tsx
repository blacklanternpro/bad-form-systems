import Link from "next/link";
import { overview } from "@/content/overview";

export function VisitClose() {
  return (
    <section className="bg-brand-black pb-14 pt-4 md:pb-20" aria-labelledby="close-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="close-heading"
          className="mb-6 max-w-[28ch] text-[1.35rem] font-semibold leading-snug tracking-wide text-brand-ink md:text-[1.6rem]"
        >
          {overview.closeLine}
        </h2>
        <Link href={overview.primaryCta.href} className="btn-primary min-h-11">
          {overview.primaryCta.label}
        </Link>
      </div>
    </section>
  );
}
