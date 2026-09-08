import { overview } from "@/content/overview";

export function SubHero() {
  const { subhero } = overview;
  const ledger = subhero.blocks[subhero.blocks.length - 1];

  return (
    <section
      className="relative min-h-[70dvh] overflow-hidden bg-brand-ink lg:min-h-[calc(100dvh-5.25rem)]"
      aria-labelledby="subhero-heading"
    >
      <figure className="absolute inset-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed still; keep the office plate unscaled by next/image */}
        <img
          src={subhero.image.src}
          alt={subhero.image.alt}
          width={subhero.image.width}
          height={subhero.image.height}
          className="h-full w-full origin-center scale-[1.22] object-cover object-[75%_32%]"
        />
        <figcaption className="sr-only">{subhero.demoNote}</figcaption>
      </figure>
      <div className="relative z-10 flex min-h-[70dvh] w-full min-w-0 max-w-[32rem] flex-col items-start justify-end px-4 py-8 sm:px-7 lg:min-h-[calc(100dvh-5.25rem)] lg:px-10 xl:pl-14">
        <h2
          id="subhero-heading"
          className="type-hero type-on-still mb-5 max-w-[18ch] min-w-0 text-[2.5rem] font-bold xl:text-[3rem]"
        >
          {subhero.title}
        </h2>
        {ledger ? (
          <p className="type-docket type-on-still-docket max-w-[34ch] border-t border-brand-ply pt-3 text-base">
            {ledger.title}.
          </p>
        ) : null}
      </div>
    </section>
  );
}
