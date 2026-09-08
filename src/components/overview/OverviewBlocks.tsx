import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { overview } from "@/content/overview";
import { OverlayPlate } from "@/components/overview/OverlayPlate";

type Principle = (typeof overview.principles)[number];

interface PrincipleScreenProps {
  principle: Principle;
  ledger?: boolean;
}

export function PrincipleScreen({ principle, ledger = false }: PrincipleScreenProps) {
  if (ledger) {
    return (
      <div className="mx-auto flex min-h-[calc(100dvh-5.25rem)] max-w-6xl items-center px-4 py-12 sm:px-7 lg:px-10">
        <OverlayPlate as="article" className="overlay-plate-ledger deck-enter w-full max-w-[38rem]">
          <p className="type-docket mb-4 text-sm tracking-[0.08em] text-brand-steel uppercase">
            {principle.audience}
          </p>
          <h2 className="type-hero mb-6 max-w-[12ch] text-[clamp(2.75rem,7vw+1rem,5rem)] text-brand-ink">
            {principle.title}
          </h2>
          <p className="type-docket max-w-[42ch] border-t border-brand-ply pt-5 text-base leading-relaxed text-brand-ink">
            {principle.body}
          </p>
        </OverlayPlate>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-5.25rem)] max-w-6xl items-center px-4 py-12 sm:px-7 lg:px-10">
      <article className="deck-enter grid w-full max-w-4xl gap-4 border-y border-brand-ply py-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:gap-12">
        <div>
          <h2 className="type-hero text-[clamp(2rem,4.2vw+0.8rem,3.25rem)] text-brand-ink">
            {principle.title}
          </h2>
          <p className="type-docket mt-3 text-sm tracking-[0.08em] text-brand-steel uppercase">
            {principle.audience}
          </p>
        </div>
        <p className="type-docket max-w-[46ch] text-base leading-relaxed text-brand-ink md:pt-2">
          {principle.body}
        </p>
      </article>
    </div>
  );
}

export function LandscapeMatrix() {
  const { landscape } = overview;
  return (
    <div className="deck-enter mx-auto max-w-6xl px-4 py-14 sm:px-7 md:py-20 lg:px-10">
      <div className="mb-8 max-w-3xl">
        <h2 className="type-hero mb-4 text-[clamp(2rem,4vw+0.8rem,3.25rem)] text-brand-ink">
          {landscape.title}
        </h2>
        <p className="type-docket max-w-[58ch] text-base text-brand-ink">{landscape.body}</p>
      </div>

      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-brand-border type-meta">
              {landscape.columns.map((col) => (
                <th key={col} className="px-0 py-3 pr-6 font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {landscape.rows.map((row) => (
              <tr key={row.layer} className="border-b border-brand-border/80 align-top">
                <td className="py-5 pr-6 font-medium text-brand-ink">{row.layer}</td>
                <td className="py-5 pr-6 text-brand-cobalt">{row.tools}</td>
                <td className="py-5 pr-6 text-brand-steel">{row.gap}</td>
                <td className="py-5 text-brand-ink">{row.strategy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-8 lg:hidden">
        {landscape.rows.map((row) => (
          <div key={row.layer} className="border-t border-brand-border pt-5">
            <h3 className="type-title text-lg text-brand-ink">{row.layer}</h3>
            <p className="mt-1 text-sm text-brand-cobalt">{row.tools}</p>
            <p className="mt-3 text-brand-steel">{row.mobileSummary}</p>
            <p className="mt-2 text-brand-ink">{row.mobileAction}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-brand-border pt-6 sm:flex-row sm:items-center">
        <p className="type-body max-w-xl text-brand-steel">{landscape.footerNote}</p>
        <Link
          href={landscape.footerLink.href}
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-cobalt hover:text-brand-ink"
        >
          <span>{landscape.footerLink.label}</span>
          <ArrowRight size={16} weight="bold" />
        </Link>
      </div>
    </div>
  );
}
