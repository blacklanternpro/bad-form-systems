import Link from "next/link";
import { overview } from "@/content/overview";

interface MockHeroProps {
  label: string;
  imageSrc: string;
  imageAlt: string;
  objectPosition: string;
  tone: "dust" | "cab";
}

export function MockHero({ label, imageSrc, imageAlt, objectPosition, tone }: MockHeroProps) {
  const stamp = tone === "dust" ? "text-brand-ink mix-blend-multiply" : "text-brand-black";
  const walkRule = tone === "dust" ? "border-brand-ply" : "border-brand-ply";
  const cta =
    tone === "dust"
      ? "btn-text mix-blend-multiply"
      : "inline-flex items-center gap-1 border-b-2 border-brand-ply pb-0.5 font-[family-name:var(--font-docket)] text-sm font-bold tracking-[0.06em] text-brand-black uppercase";

  return (
    <section className="relative min-h-[calc(100dvh-5.25rem)] overflow-hidden bg-brand-ink">
      <img
        src={imageSrc}
        alt={imageAlt}
        width={1536}
        height={1024}
        className={`absolute inset-0 h-full w-full object-cover ${objectPosition}`}
      />
      <p className="absolute top-4 left-4 z-20 bg-brand-stamp px-2 py-1 font-[family-name:var(--font-docket)] text-[0.7rem] font-bold tracking-[0.14em] text-brand-ink uppercase sm:left-6">
        Draft mock · {label}
      </p>
      <div className="relative z-10 flex min-h-[calc(100dvh-5.25rem)] max-w-[40rem] flex-col justify-center px-5 py-16 sm:px-8 lg:px-10 xl:pl-14">
        <h1
          className={`type-hero mb-6 max-w-[13ch] text-[clamp(2.2rem,5vw+0.5rem,5.25rem)] ${stamp}`}
        >
          {overview.headline}
        </h1>
        <p className={`type-docket mb-8 max-w-[36ch] text-[0.92rem] ${stamp}`}>{overview.body}</p>
        <p
          className={`type-docket mb-10 max-w-[36ch] border-y py-3 ${walkRule} ${stamp}`}
        >
          {overview.walkLine}
        </p>
        <Link href={overview.primaryCta.href} className={cta}>
          {overview.primaryCta.label}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

export function MockSwitcher({ current }: { current: "yard" | "cab" | "both" }) {
  const base =
    "font-[family-name:var(--font-docket)] text-xs font-bold tracking-[0.12em] uppercase px-3 py-2 border border-brand-ink";
  return (
    <nav
      className="flex flex-wrap items-center gap-2 border-b border-brand-ink/25 bg-brand-header px-4 py-3 sm:px-6"
      aria-label="Hero mocks"
    >
      <span className="mr-2 font-[family-name:var(--font-docket)] text-xs tracking-wide text-brand-ink">
        Parking lot · theoretical stills, not the live homepage
      </span>
      <Link
        href="/lab/mocks/yard"
        className={`${base} ${current === "yard" ? "bg-brand-ink text-brand-black" : "bg-brand-header text-brand-ink"}`}
      >
        1 · Yard stamp
      </Link>
      <Link
        href="/lab/mocks/cab"
        className={`${base} ${current === "cab" ? "bg-brand-ink text-brand-black" : "bg-brand-header text-brand-ink"}`}
      >
        2 · Passenger seat
      </Link>
      <Link
        href="/lab/mocks"
        className={`${base} ${current === "both" ? "bg-brand-ink text-brand-black" : "bg-brand-header text-brand-ink"}`}
      >
        Both
      </Link>
    </nav>
  );
}
