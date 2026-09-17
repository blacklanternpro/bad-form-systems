import type { FrontNote } from "@/content/overview";

type TwoFrontsProps = {
  rented: FrontNote;
  oneOff: FrontNote;
  closer: string;
};

export function TwoFronts({ rented, oneOff, closer }: TwoFrontsProps) {
  return (
    <section className="bg-brand-black py-10 md:py-14" aria-labelledby="fronts-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 id="fronts-heading" className="sr-only">
          Not rented. Not a one-off.
        </h2>
        <div className="grid gap-10 border-y border-brand-ply py-8 md:grid-cols-2 md:gap-16 md:py-10">
          <article>
            <h3 className="type-hero mb-4 max-w-[16ch] text-[1.35rem] text-brand-ink md:text-[1.6rem]">
              {rented.title}
            </h3>
            <p className="type-docket max-w-[36ch] text-[0.95rem] leading-relaxed text-brand-ink">
              {rented.body}
            </p>
          </article>
          <article>
            <h3 className="type-hero mb-4 max-w-[16ch] text-[1.35rem] text-brand-ink md:text-[1.6rem]">
              {oneOff.title}
            </h3>
            <p className="type-docket max-w-[36ch] text-[0.95rem] leading-relaxed text-brand-ink">
              {oneOff.body}
            </p>
          </article>
        </div>
        <p className="type-hero mt-8 max-w-[28ch] text-[1.15rem] text-brand-ink md:mt-10 md:text-[1.4rem]">
          {closer}
        </p>
      </div>
    </section>
  );
}
