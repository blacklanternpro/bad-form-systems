import type { ReactNode } from "react";
import { overview } from "@/content/overview";

interface InfoBandProps {
  children: ReactNode;
}

export function InfoBand({ children }: InfoBandProps) {
  return (
    <section className="bg-brand-black py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function InfoPoints() {
  const points = overview.subhero.blocks.slice(0, 2);

  return (
    <ul className="grid gap-8 md:grid-cols-2 md:gap-12">
      {points.map((point) => (
        <li key={point.title}>
          <h2 className="type-title mb-3 text-[1.35rem] text-brand-ink sm:text-[1.6rem] md:text-[1.75rem]">
            {point.title}
          </h2>
          <p className="type-docket max-w-[36ch] border-t border-brand-ply pt-3 text-[0.95rem] leading-relaxed text-brand-ink">
            {point.body}
          </p>
        </li>
      ))}
    </ul>
  );
}
