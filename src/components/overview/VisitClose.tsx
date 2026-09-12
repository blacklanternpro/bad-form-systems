import Link from "next/link";
import { overview } from "@/content/overview";

export function VisitClose() {
  return (
    <section className="bg-brand-black pt-4 pb-14 md:pb-20" aria-labelledby="close-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="close-heading"
          className="type-hero mb-7 max-w-[24ch] text-[1.5rem] text-brand-ink md:text-[1.9rem]"
        >
          {overview.close.line}
        </h2>
        <Link href={overview.primaryCta.href} className="btn-primary min-h-11">
          {overview.primaryCta.label}
        </Link>
      </div>
    </section>
  );
}
