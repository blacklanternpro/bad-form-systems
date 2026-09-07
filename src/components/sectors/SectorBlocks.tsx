import Link from "next/link";
import type { Sector, SectorSlug } from "@/content/sectors";
import { sectors, sectorSlugs } from "@/content/sectors";
import { primaryCta } from "@/content/nav";

export function SectorNav({ active }: { active: SectorSlug }) {
  return (
    <div className="mb-10 flex flex-wrap gap-2">
      {sectorSlugs.map((slug) => {
        const sector = sectors[slug];
        const isActive = slug === active;
        return (
          <Link
            key={slug}
            href={`/sectors/${slug}`}
            className={
              isActive
                ? "rounded-sm bg-brand-stamp px-3.5 py-2 text-sm font-semibold text-brand-cobalt"
                : "rounded-sm border border-brand-border bg-brand-surface px-3.5 py-2 text-sm text-brand-steel hover:text-brand-ink"
            }
          >
            {sector.navLabel}
          </Link>
        );
      })}
    </div>
  );
}

export function SectorPanel({ sector }: { sector: Sector }) {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
      <div>
        <p className="type-meta mb-3">{sector.places}</p>
        <h2 className="type-title mb-4 text-2xl text-brand-ink sm:text-3xl">{sector.title}</h2>
        <p className="type-body mb-8 text-brand-steel">{sector.body}</p>
        <h3 className="type-title mb-4 text-lg text-brand-ink">{sector.modulesHeading}</h3>
        <ul className="divide-y divide-brand-border border-y border-brand-border">
          {sector.modules.map((mod) => (
            <li key={mod.title} className="grid gap-2 py-5 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] sm:gap-8">
              <span className="font-medium text-brand-ink">{mod.title}</span>
              <span className="text-sm leading-relaxed text-brand-steel">{mod.body}</span>
            </li>
          ))}
        </ul>
      </div>
      <aside className="lg:pt-10">
        <h3 className="type-title mb-4 text-lg text-brand-ink">{sector.scenarioHeading}</h3>
        <div className="space-y-5 border-t border-brand-border pt-5">
          <div>
            <p className="type-meta mb-1">The bind</p>
            <p className="text-sm leading-relaxed text-brand-ink">{sector.problem}</p>
          </div>
          <div>
            <p className="type-meta mb-1">The build</p>
            <p className="text-sm leading-relaxed text-brand-ink">{sector.approach}</p>
          </div>
        </div>
        <Link href={primaryCta.href} className="btn-primary mt-8 w-full sm:w-auto">
          {primaryCta.label}
        </Link>
      </aside>
    </div>
  );
}
