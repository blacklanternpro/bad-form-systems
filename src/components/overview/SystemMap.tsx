import Link from "next/link";
import { overview } from "@/content/overview";

export function SystemMap() {
  const { heading, lead, groups, footNote, link } = overview.map;

  return (
    <section className="bg-brand-sheet py-12 md:py-16" aria-labelledby="map-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="map-heading"
          className="type-hero max-w-[22ch] text-[1.6rem] text-brand-ink md:text-[2rem]"
        >
          {heading}
        </h2>
        <p className="type-body mt-4 max-w-[56ch] text-brand-steel">{lead}</p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.05fr_1.05fr_0.9fr] lg:gap-12">
          {groups.map((group) => (
            <div key={group.title} className="border-t border-brand-ink pt-4">
              <h3 className="type-title text-lg text-brand-ink">{group.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="type-docket text-[0.9rem] leading-6 text-brand-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-brand-border-muted pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-meta max-w-[46ch]">{footNote}</p>
          <Link href={link.href} className="btn-text min-h-11 shrink-0 text-[0.85rem]">
            {link.label}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
