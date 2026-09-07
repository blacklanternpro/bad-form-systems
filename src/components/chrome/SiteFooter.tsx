import Link from "next/link";
import { SiteMark } from "@/components/chrome/SiteMark";
import { footer, navLinks, primaryCta } from "@/content/nav";

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-ink/15 bg-brand-sheet py-12 text-sm text-brand-steel">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-brand-border pb-8 md:flex-row md:items-start">
          <div className="space-y-3">
            <SiteMark compact />
            <p className="type-body max-w-md text-brand-steel">{footer.blurb}</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Footer">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-brand-ink">
                {link.label}
              </Link>
            ))}
            <Link href={primaryCta.href} className="font-medium text-brand-cobalt hover:text-brand-ink">
              {primaryCta.label}
            </Link>
          </nav>
        </div>
        <div className="flex flex-col items-start justify-between gap-3 pt-6 type-meta sm:flex-row sm:items-center">
          <span>{footer.copyright}</span>
          <span>{footer.integrations}</span>
        </div>
      </div>
    </footer>
  );
}
