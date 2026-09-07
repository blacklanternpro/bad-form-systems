import Link from "next/link";
import { siteName } from "@/content/nav";

interface SiteMarkProps {
  compact?: boolean;
}

export function SiteMark({ compact = false }: SiteMarkProps) {
  return (
    <Link href="/" className="flex items-stretch text-brand-ink" aria-label={siteName}>
      <span
        className={
          compact
            ? "flex items-baseline gap-2 bg-brand-ply px-3 py-2"
            : "flex items-baseline gap-2.5 bg-brand-ply px-5 py-4 sm:gap-3 sm:px-6 sm:py-5"
        }
      >
        <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight sm:text-[1.75rem] lg:text-[2rem]">
          BAD FORM
        </span>
        <span
          className={
            compact
              ? "font-[family-name:var(--font-docket)] text-xs"
              : "font-[family-name:var(--font-docket)] text-sm sm:text-base"
          }
        >
          Systems
        </span>
      </span>
    </Link>
  );
}
