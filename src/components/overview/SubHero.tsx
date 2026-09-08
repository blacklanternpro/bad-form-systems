import { SeamType } from "@/components/overview/SeamType";
import { overview } from "@/content/overview";

export function SubHero() {
  const { subhero } = overview;
  const ledger = subhero.blocks[subhero.blocks.length - 1];

  return (
    <section aria-labelledby="subhero-heading">
      <figure className="relative min-h-[50dvh] overflow-hidden bg-brand-ink lg:min-h-[calc(100dvh-5.25rem)]">
        {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed still; keep the office plate unscaled by next/image */}
        <img
          src={subhero.image.src}
          alt={subhero.image.alt}
          width={subhero.image.width}
          height={subhero.image.height}
          className="absolute inset-0 h-full w-full object-cover object-[78%_28%] xl:object-[74%_26%]"
        />
        <figcaption className="sr-only">{subhero.demoNote}</figcaption>
      </figure>
      <div className="relative bg-brand-black pb-6 pt-0 md:pb-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SeamType>
            <h2
              id="subhero-heading"
              className="type-hero mb-5 max-w-[18ch] min-w-0 text-[2.5rem] font-bold text-brand-ink xl:text-[3rem]"
            >
              {subhero.title}
            </h2>
            {ledger ? (
              <p className="type-docket max-w-[34ch] border-t border-brand-ply pt-3 text-base text-brand-ink">
                {ledger.title}.
              </p>
            ) : null}
          </SeamType>
        </div>
      </div>
    </section>
  );
}
