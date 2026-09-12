import Link from "next/link";
import { GhostTaxCalculator } from "@/components/calculator/GhostTaxCalculator";
import { overview } from "@/content/overview";

export function GhostTaxSlice() {
  const { heading, lead, note, link } = overview.demo;

  return (
    <section className="bg-brand-black py-12 md:py-16" aria-labelledby="demo-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="demo-heading"
          className="type-hero max-w-[24ch] text-[1.6rem] text-brand-ink md:text-[2rem]"
        >
          {heading}
        </h2>
        <p className="type-body mt-4 max-w-[58ch] text-brand-steel">{lead}</p>
        <div className="mt-10">
          <GhostTaxCalculator />
        </div>
        <p className="type-meta mt-8">
          {note}{" "}
          <Link href={link.href} className="btn-text text-sm">
            {link.label}
          </Link>
        </p>
      </div>
    </section>
  );
}
