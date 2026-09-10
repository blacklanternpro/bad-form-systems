import { overview } from "@/content/overview";

export function TuesdayTwice() {
  const { heading, lead, columns } = overview.tuesday;

  return (
    <section className="bg-brand-black py-12 md:py-16" aria-labelledby="tuesday-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="tuesday-heading"
          className="type-hero max-w-[18ch] text-[1.6rem] text-brand-ink md:text-[2rem]"
        >
          {heading}
        </h2>
        <p className="type-body mt-4 max-w-[52ch] text-brand-steel">{lead}</p>

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-0">
          {columns.map((column, index) => {
            const isSystem = index === 1;
            return (
              <div
                key={column.title}
                className={
                  isSystem
                    ? "md:border-l md:border-brand-border-muted md:pl-8 lg:pl-12"
                    : "md:pr-8 lg:pr-12"
                }
              >
                <h3
                  className={`type-data inline-block pb-1 text-[0.8rem] text-brand-ink ${
                    isSystem ? "border-b-2 border-brand-stamp" : "border-b-2 border-brand-ply"
                  }`}
                >
                  {column.title}
                </h3>
                <p className="type-meta mt-3 max-w-[36ch]">{column.note}</p>

                <dl className="mt-6">
                  {column.entries.map((entry) => (
                    <div
                      key={entry.time + entry.line}
                      className="grid grid-cols-[3.75rem_minmax(0,1fr)] gap-x-3 border-t border-brand-border-muted py-3"
                    >
                      <dt
                        className={`type-data text-[0.78rem] leading-6 ${
                          isSystem ? "text-brand-cobalt" : "text-brand-steel"
                        }`}
                      >
                        {entry.time}
                      </dt>
                      <dd className="text-[0.95rem] leading-6 text-brand-ink">{entry.line}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
