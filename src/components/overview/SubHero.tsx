import { overview } from "@/content/overview";

interface SubheroBlock {
  title: string;
  body: string;
}

export function SubHero() {
  const { subhero } = overview;

  return (
    <section className="overflow-hidden bg-brand-black" aria-labelledby="subhero-heading">
      <div className="lg:grid lg:min-h-[calc(100dvh-5.25rem)] lg:grid-cols-[minmax(20rem,38%)_minmax(0,1fr)]">
        <div className="px-5 py-10 sm:px-8 lg:flex lg:flex-col lg:justify-center lg:px-10 lg:py-16 xl:pl-14">
          <h2
            id="subhero-heading"
            className="type-hero mb-8 max-w-[16ch] text-[clamp(1.85rem,3.8vw+0.6rem,3.4rem)] text-brand-ink"
          >
            {subhero.title}
          </h2>
          <ul className="space-y-7">
            {subhero.blocks.map((block: SubheroBlock) => (
              <li key={block.title}>
                <h3 className="type-docket mb-2 font-bold tracking-[0.04em] text-brand-ink uppercase">
                  {block.title}
                </h3>
                <p className="type-docket max-w-[38ch] text-[0.98rem] leading-relaxed text-brand-ink">
                  {block.body}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative min-h-[18rem] sm:min-h-[24rem] lg:min-h-0">
          <img
            src={subhero.image.src}
            alt={subhero.image.alt}
            width={subhero.image.width}
            height={subhero.image.height}
            className="h-full w-full object-cover object-[62%_center]"
          />
          <figcaption className="sr-only">{subhero.demoNote}</figcaption>
        </figure>
      </div>
    </section>
  );
}
