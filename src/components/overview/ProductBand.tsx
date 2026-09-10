import { CheckSquareOffset } from "@phosphor-icons/react/ssr";
import { LiveScreen } from "@/components/overview/LiveScreen";
import { StillFrame } from "@/components/overview/StillFrame";
import { overview, type ScreenCaption } from "@/content/overview";
import "@/styles/ims.css";
import "@/styles/screen-frame.css";

function CaptionRail({ caption, className }: { caption: ScreenCaption; className?: string }) {
  return (
    <div className={className}>
      <h3 className="type-title text-xl text-brand-sheet md:text-2xl">{caption.title}</h3>
      <p className="type-docket mt-3 max-w-[38ch] text-[0.95rem] text-brand-sheet/75">
        {caption.body}
      </p>
      <ul className="mt-6 space-y-3">
        {caption.points.map((point) => (
          <li key={point} className="flex gap-3 text-[0.95rem] leading-6 text-brand-sheet/90">
            <CheckSquareOffset
              size={18}
              weight="bold"
              className="mt-0.5 shrink-0 text-brand-stamp"
              aria-hidden
            />
            <span className="max-w-[34ch]">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProductBand() {
  const { heading, lead, cabStill, officeStill, field, desk, note } = overview.product;

  return (
    <section className="bg-brand-ink" aria-labelledby="product-heading">
      <StillFrame still={cabStill} />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <h2
          id="product-heading"
          className="type-hero max-w-[16ch] text-[1.6rem] text-brand-sheet md:text-[2rem]"
        >
          {heading}
        </h2>
        <p className="type-body mt-4 max-w-[54ch] text-brand-sheet/70">{lead}</p>

        <div className="mt-10 flex flex-col gap-10 lg:mt-14 lg:flex-row lg:items-center lg:gap-16">
          <LiveScreen device="phone" paint="dusk" className="shrink-0" />
          <CaptionRail caption={field} className="lg:pt-4" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 md:pb-16 lg:px-8">
        <CaptionRail caption={desk} />
      </div>

      {/* The board carries too much detail to shrink below a laptop column. Under lg
          the photograph above is the board, and the caption rail carries the argument. */}
      <div className="hidden justify-center px-4 pb-12 lg:flex lg:px-6 xl:pb-16 2xl:px-8">
        <LiveScreen device="desk" paint="day" />
      </div>

      <StillFrame still={officeStill} />

      <p className="type-meta mx-auto max-w-6xl px-4 py-6 text-brand-sheet/55 sm:px-6 lg:px-8">
        {note}
      </p>
    </section>
  );
}
