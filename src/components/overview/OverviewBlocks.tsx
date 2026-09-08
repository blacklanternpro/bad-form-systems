import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { overview } from "@/content/overview";

export function LandscapeMatrix() {
  const { landscape } = overview;
  return (
    <div className="mt-10 border-t border-brand-border pt-10">
      <div className="mb-6 max-w-3xl">
        <h2 className="type-hero mb-3 text-[1.25rem] text-brand-ink md:text-[1.4rem]">{landscape.title}</h2>
        <p className="type-docket max-w-[58ch] border-t border-brand-ply pt-3 text-[0.95rem] text-brand-ink">{landscape.body}</p>
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

      <div className="space-y-6 lg:hidden">
        {landscape.rows.map((row) => (
          <div key={row.layer} className="border-t border-brand-border pt-4">
            <h3 className="type-title text-lg text-brand-ink">{row.layer}</h3>
            <p className="mt-1 text-sm text-brand-cobalt">{row.tools}</p>
            <p className="mt-3 text-brand-steel">{row.mobileSummary}</p>
            <p className="mt-2 text-brand-ink">{row.mobileAction}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-brand-border pt-6 sm:flex-row sm:items-center">
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

export function VisitClose() {
  return (
    <div className="mt-10 border-t border-brand-ply pt-8">
      <Link href={overview.primaryCta.href} className="btn-primary min-h-11">
        {overview.primaryCta.label}
      </Link>
    </div>
  );
}
