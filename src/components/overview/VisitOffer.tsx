import Link from "next/link";
import { overview } from "@/content/overview";

export function VisitOffer() {
  const { heading, lead, items, footNote, link } = overview.visit;

  return (
    <section className="bg-brand-black py-12 md:py-16" aria-labelledby="visit-heading">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="reveal rounded-sm border border-brand-ink bg-brand-card">
          <div className="border-b border-brand-ink bg-brand-header px-5 py-4 sm:px-8">
            <h2
              id="visit-heading"
              className="type-title text-[1.35rem] text-brand-ink md:text-[1.6rem]"
            >
              {heading}
            </h2>
            <p className="type-docket mt-1 text-[0.95rem] text-brand-ink">{lead}</p>
          </div>

          <dl className="divide-y divide-brand-border-muted px-5 sm:px-8">
            {items.map((item) => (
              <div key={item.title} className="py-5 sm:grid sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-6">
                <dt className="type-data mb-1.5 text-[0.8rem] text-brand-ink sm:mb-0">
                  {item.title}
                </dt>
                <dd className="max-w-[52ch] text-[0.95rem] leading-6 text-brand-ink">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-3 border-t border-brand-ink bg-brand-surface px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="type-meta max-w-[44ch]">{footNote}</p>
            <Link href={link.href} className="btn-text min-h-11 shrink-0 text-[0.85rem]">
              {link.label}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
