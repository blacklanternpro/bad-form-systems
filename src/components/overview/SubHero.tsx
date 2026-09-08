import { SeamType } from "@/components/overview/SeamType";
import { overview } from "@/content/overview";

export function SubHero() {
  const { subhero } = overview;
  const ledger = subhero.blocks[subhero.blocks.length - 1];

  return (
    <section aria-labelledby="subhero-heading">
      <figure className="relative min-h-[50dvh] overflow-visible bg-brand-ink lg:min-h-[calc(100dvh-5.25rem)]">
        <div className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed still; keep the office plate unscaled by next/image */}
          <img
            src={subhero.image.src}
            alt={subhero.image.alt}
            width={subhero.image.width}
            height={subhero.image.height}
            className="h-full w-full object-cover object-[78%_22%] xl:object-[74%_20%]"
          />
        </div>
        <figcaption className="sr-only">{subhero.demoNote}</figcaption>
        <div className="relative z-10 mx-auto flex min-h-[50dvh] w-full max-w-6xl flex-col justify-end px-4 pb-8 sm:px-6 lg:min-h-[calc(100dvh-5.25rem)] lg:px-8">
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
      </figure>
    </section>
  );
}
