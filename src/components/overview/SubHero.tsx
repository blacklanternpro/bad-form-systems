import { overview } from "@/content/overview";

interface SubheroBlock {
  title: string;
  body: string;
}

export function SubHero() {
  const { subhero } = overview;

  return (
    <section
      className="relative min-h-[calc(100dvh-5.25rem)] overflow-hidden bg-brand-ink"
      aria-labelledby="subhero-heading"
    >
      <img
        src={subhero.image.src}
        alt={subhero.image.alt}
        width={subhero.image.width}
        height={subhero.image.height}
        className="absolute inset-0 h-full w-full object-cover object-[72%_center]"
      />
      <div className="relative z-10 flex min-h-[calc(100dvh-5.25rem)] max-w-[40rem] flex-col justify-center px-5 py-12 sm:px-8 lg:px-10 xl:pl-14">
        <h2
          id="subhero-heading"
          className="type-hero mb-8 max-w-[16ch] text-[clamp(1.85rem,3.8vw+0.6rem,3.4rem)] text-brand-ink mix-blend-multiply"
        >
          {subhero.title}
        </h2>
        <ul className="space-y-6">
          {subhero.blocks.map((block: SubheroBlock) => (
            <li key={block.title}>
              <h3 className="type-docket mb-2 font-bold tracking-[0.04em] text-brand-ink uppercase mix-blend-multiply">
                {block.title}
              </h3>
              <p className="type-docket max-w-[36ch] text-[0.98rem] leading-relaxed text-brand-ink mix-blend-multiply">
                {block.body}
              </p>
            </li>
          ))}
        </ul>
        <p className="sr-only">{subhero.demoNote}</p>
      </div>
    </section>
  );
}
