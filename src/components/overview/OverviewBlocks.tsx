import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { overview } from "@/content/overview";

export function PrincipleList() {
  return (
    <div className="mb-16 divide-y divide-brand-border border-y border-brand-border">
      {overview.principles.map((principle) => (
        <article key={principle.title} className="grid gap-3 py-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:gap-10">
          <div>
            <h2 className="type-title text-xl text-brand-ink md:text-2xl">{principle.title}</h2>
            <p className="type-meta mt-2">{principle.audience}</p>
          </div>
          <p className="type-body text-brand-steel md:pt-1">{principle.body}</p>
        </article>
      ))}
    </div>
  );
}

export function LandscapeMatrix() {
  const { landscape } = overview;
  return (
    <div>
      <div className="mb-8 max-w-3xl">
        <h2 className="type-title mb-3 text-2xl text-brand-ink sm:text-3xl">{landscape.title}</h2>
        <p className="type-body text-brand-steel">{landscape.body}</p>
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
