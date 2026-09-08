import Link from "next/link";
import { siteName } from "@/content/nav";

interface SiteMarkProps {
  compact?: boolean;
}

export function SiteMark({ compact = false }: SiteMarkProps) {
  return (
    <Link href="/" className="flex min-w-0 items-stretch text-brand-ink" aria-label={siteName}>
      <span
        className={
          compact
            ? "flex items-baseline gap-2 bg-brand-ply px-3 py-2"
            : "flex items-baseline gap-2 bg-brand-ply px-2.5 py-2.5 sm:gap-2.5 sm:px-5 sm:py-4 lg:gap-3 lg:px-6 lg:py-5"
        }
      >
        <span className="font-[family-name:var(--font-display)] text-[1.375rem] font-extrabold tracking-tight sm:text-2xl lg:text-[2rem]">
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
