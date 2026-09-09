import { overview } from "@/content/overview";

export function TwoTruths() {
  const { lead, support } = overview.truths;

  return (
    <section className="bg-brand-black py-10 md:py-14" aria-labelledby="truths-heading">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-start md:gap-16 lg:px-8">
        <div>
          <h2
            id="truths-heading"
            className="type-hero mb-4 max-w-[16ch] text-[1.75rem] text-brand-ink md:text-[2rem]"
          >
            {lead.title}
          </h2>
          <p className="type-docket max-w-[42ch] border-t border-brand-ply pt-3 text-base text-brand-ink">
            {lead.body}
          </p>
        </div>
        <aside>
          <p className="type-docket mb-3 font-bold text-brand-ink">{support.title}</p>
          <p className="type-docket max-w-[32ch] text-[0.95rem] leading-relaxed text-brand-steel">
            {support.body}
          </p>
        </aside>
      </div>
    </section>
  );
}
