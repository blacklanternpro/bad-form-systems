import { overview } from "@/content/overview";

export function HowWeWork() {
  return (
    <section className="bg-brand-black py-10 md:py-14" aria-labelledby="work-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 id="work-heading" className="type-hero mb-2 text-[1.5rem] text-brand-ink md:text-[1.75rem]">
          {overview.workHeading}
        </h2>
        <ol className="max-w-3xl list-decimal pl-6 marker:font-[family-name:var(--font-docket)] marker:text-brand-steel">
          {overview.beats.map((beat) => (
            <li key={beat.title} className="border-b border-brand-ply py-6 pl-2 last:border-b-0 last:pb-0">
              <h3 className="type-hero mb-3 text-[1.15rem] text-brand-ink md:text-[1.25rem]">{beat.title}</h3>
              <p className="type-docket max-w-[48ch] text-[0.95rem] leading-relaxed text-brand-ink">{beat.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
