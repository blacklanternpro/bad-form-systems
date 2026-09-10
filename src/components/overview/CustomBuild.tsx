import { overview } from "@/content/overview";

export function CustomBuild() {
  const { heading, lead, beats } = overview.custom;

  return (
    <section className="bg-brand-black py-12 md:py-16" aria-labelledby="custom-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="custom-heading"
          className="type-hero max-w-[24ch] text-[1.6rem] text-brand-ink md:text-[2rem]"
        >
          {heading}
        </h2>
        <p className="type-body mt-4 max-w-[58ch] text-brand-steel">{lead}</p>

        <ol className="mt-10 max-w-3xl list-decimal pl-6 marker:font-[family-name:var(--font-docket)] marker:text-brand-steel">
          {beats.map((beat) => (
            <li
              key={beat.title}
              className="reveal border-b border-brand-ply py-6 pl-2 last:border-b-0 last:pb-0"
            >
              <h3 className="type-hero mb-3 text-[1.1rem] text-brand-ink md:text-[1.25rem]">
                {beat.title}
              </h3>
              <p className="type-docket max-w-[52ch] text-[0.95rem] leading-6 text-brand-ink">
                {beat.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
