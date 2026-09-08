import { overview } from "@/content/overview";

export function SubHero() {
  const { subhero } = overview;
  const ledger = subhero.blocks[subhero.blocks.length - 1];

  return (
    <section
      className="relative min-h-[calc(100dvh-5.25rem)] overflow-hidden bg-brand-ink"
      aria-labelledby="subhero-heading"
    >
      <figure className="absolute inset-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed still; keep the office plate unscaled by next/image */}
        <img
          src={subhero.image.src}
          alt={subhero.image.alt}
          width={subhero.image.width}
          height={subhero.image.height}
          className="h-full w-full origin-center scale-[1.22] object-cover object-[72%_38%]"
        />
        <figcaption className="sr-only">{subhero.demoNote}</figcaption>
      </figure>
      <div className="relative z-10 flex min-h-[calc(100dvh-5.25rem)] w-full min-w-0 max-w-[28rem] flex-col items-start justify-end px-4 py-8 sm:px-7 lg:px-10 xl:pl-14">
        <h2
          id="subhero-heading"
          className="type-hero type-on-still mb-3 max-w-[18ch] min-w-0 text-[1.75rem] xl:text-[2rem]"
        >
          {subhero.title}
        </h2>
        {ledger ? (
          <p className="type-docket type-on-still-docket max-w-[36ch] border-y border-brand-ply py-2 text-base">
            {ledger.title}.
          </p>
        ) : null}
      </div>
    </section>
  );
}
