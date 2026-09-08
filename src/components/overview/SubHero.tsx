import { overview } from "@/content/overview";
import { OverlayPlate } from "@/components/overview/OverlayPlate";

export function SubHero() {
  const { subhero } = overview;
  const supporting = subhero.blocks.slice(0, -1);
  const ledger = subhero.blocks[subhero.blocks.length - 1];

  if (!ledger) {
    return null;
  }

  return (
    <section
      className="deck-screen relative overflow-hidden bg-brand-ink"
      aria-labelledby="subhero-heading"
    >
      <figure className="absolute inset-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed still; keep the office plate unscaled by next/image */}
        <img
          src={subhero.image.src}
          alt={subhero.image.alt}
          width={subhero.image.width}
          height={subhero.image.height}
          className="h-full w-full origin-center scale-[1.22] object-cover object-[62%_48%]"
        />
        <figcaption className="sr-only">{subhero.demoNote}</figcaption>
      </figure>
      <div className="relative z-10 flex min-h-[calc(100dvh-5.25rem)] w-full flex-col items-start justify-end gap-2.5 px-4 py-7 sm:px-7 lg:justify-center lg:px-10 xl:pl-14">
        <OverlayPlate className="deck-enter">
          <h2
            id="subhero-heading"
            className="type-hero mb-6 max-w-[16ch] text-[clamp(2.15rem,5.5vw+0.9rem,3.8rem)] text-brand-ink"
          >
            {subhero.title}
          </h2>
            <ul className="space-y-4">
            {supporting.map((block) => (
              <li key={block.title}>
                <h3 className="type-docket mb-1.5 font-bold tracking-[0.04em] text-brand-ink uppercase">
                  {block.title}
                </h3>
                <p className="type-docket max-w-[36ch] text-base leading-relaxed text-brand-ink">
                  {block.body}
                </p>
              </li>
            ))}
          </ul>
        </OverlayPlate>
        <OverlayPlate as="article" className="overlay-plate-ledger deck-enter">
          <h3 className="type-hero mb-3 max-w-[12ch] text-[clamp(1.85rem,4vw+0.7rem,2.75rem)] text-brand-ink">
            {ledger.title}
          </h3>
          <p className="type-docket max-w-[34ch] text-base leading-relaxed text-brand-ink">
            {ledger.body}
          </p>
        </OverlayPlate>
      </div>
    </section>
  );
}
