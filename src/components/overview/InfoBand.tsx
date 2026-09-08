import type { ReactNode } from "react";
import type { OverviewFact } from "@/content/overview";
import { overview } from "@/content/overview";

interface InfoBandProps {
  children: ReactNode;
  flushTop?: boolean;
}

export function InfoBand({ children, flushTop = false }: InfoBandProps) {
  return (
    <section className={flushTop ? "bg-brand-black pt-2 pb-8 md:pb-12" : "bg-brand-black py-8 md:py-12"}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

interface FactListProps {
  facts: readonly OverviewFact[];
  columns?: 2 | 3;
}

export function FactList({ facts, columns = 2 }: FactListProps) {
  const gridClass =
    columns === 3
      ? "grid gap-6 border-y border-brand-ply py-8 md:grid-cols-3 md:gap-10"
      : "grid gap-6 md:grid-cols-2 md:gap-12";

  return (
    <ul className={gridClass}>
      {facts.map((fact) => (
        <li key={fact.title}>
          {fact.audience ? (
            <p className="type-docket mb-2 text-xs tracking-[0.08em] text-brand-steel uppercase">
              {fact.audience}
            </p>
          ) : null}
          <h2 className="type-hero mb-3 text-[1.25rem] text-brand-ink md:text-[1.4rem]">{fact.title}</h2>
          <p className="type-docket max-w-[36ch] border-t border-brand-ply pt-3 text-[0.95rem] leading-relaxed text-brand-ink">
            {fact.body}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function VisitFacts() {
  return <FactList facts={overview.visitFacts} columns={2} />;
}

export function OfferFacts() {
  return <FactList facts={overview.offerFacts} columns={3} />;
}
