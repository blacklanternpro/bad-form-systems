# Layouts

Sticky manila header + ply lockup, cream main, sheet footer. Root layout loads Barlow, Barlow Condensed, Courier Prime.

## Root layout

- Path: `src/app/layout.tsx`
- Description: html/body shell, hash redirect, SiteHeader, main, SiteFooter

```tsx
import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, Courier_Prime } from "next/font/google";
import { HashRedirect } from "@/components/chrome/HashRedirect";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { HASH_TO_PATH } from "@/content/nav";
import { overview } from "@/content/overview";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const courierPrime = Courier_Prime({
  variable: "--font-courier",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: overview.metaTitle,
    template: "%s | BAD FORM Systems",
  },
  description: overview.metaDescription,
  metadataBase: new URL("https://bad-form.pro"),
  openGraph: {
    siteName: "BAD FORM Systems",
    title: overview.metaTitle,
    description: overview.metaDescription,
    type: "website",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} ${courierPrime.variable} scroll-smooth antialiased`}
    >
      <body className="flex min-h-[100dvh] flex-col bg-brand-black text-brand-ink">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var m=${JSON.stringify(HASH_TO_PATH)};var h=location.hash.replace('#','');if(m[h]&&m[h]!==location.pathname)location.replace(m[h]);})();`,
          }}
        />
        <HashRedirect />
        <SiteHeader />
        <main className="flex-grow">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
```

## SiteHeader

- Path: `src/components/chrome/SiteHeader.tsx`
- Description: Manila bar; ply SiteMark; caps nav System/Process/Sectors/Contact; JOB NO. from xl; Book a site visit from lg; hamburger below lg

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";
import { useState } from "react";
import { SiteMark } from "@/components/chrome/SiteMark";
import { extraNavLinks, headerNavLinks, primaryCta } from "@/content/nav";
import { overview } from "@/content/overview";

function linkClass(active: boolean) {
  return active
    ? "border-b-2 border-brand-ink pb-0.5 font-[family-name:var(--font-sans)] text-xs font-semibold tracking-[0.14em] text-brand-ink uppercase"
    : "border-b-2 border-transparent pb-0.5 font-[family-name:var(--font-sans)] text-xs font-semibold tracking-[0.14em] text-brand-ink uppercase transition-colors hover:border-brand-ply";
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const menuLinks = [...headerNavLinks, ...extraNavLinks];

  return (
    <header className="sticky top-0 z-40 border-b border-brand-ink/35 bg-brand-header">
      <div className="flex w-full items-stretch lg:grid lg:grid-cols-[auto_1fr_auto]">
        <SiteMark />

        <nav
          className="hidden items-center justify-center gap-8 lg:flex"
          aria-label="Primary"
        >
          {headerNavLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(isActive(link.href))}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3 pr-4 sm:pr-6 lg:gap-4">
          <span className="hidden font-[family-name:var(--font-docket)] text-sm tracking-wide text-brand-ink xl:inline">
            JOB NO. {overview.fieldApp.jobNo}
          </span>
          <Link href={primaryCta.href} className="btn-text hidden min-h-11 lg:inline-flex">
            {primaryCta.label}
          </Link>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center border border-brand-ink bg-brand-header p-2 text-brand-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="space-y-1 border-t border-brand-ink/15 bg-brand-header px-4 pt-2 pb-4 lg:hidden">
          {menuLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block w-full px-3 py-2.5 text-left font-[family-name:var(--font-sans)] text-sm uppercase tracking-[0.12em] text-brand-ink hover:bg-brand-ply"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={primaryCta.href}
            onClick={() => setOpen(false)}
            className="btn-text mt-2 block px-3 py-2"
          >
            {primaryCta.label}
          </Link>
        </div>
      ) : null}
    </header>
  );
}
```

## SiteFooter

- Path: `src/components/chrome/SiteFooter.tsx`
- Description: Sheet footer, compact mark, nav, Book a site visit, copyright

```tsx
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
```

## SiteMark

See `components.md` — used by header (full) and footer (`compact`).
