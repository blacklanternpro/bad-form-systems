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
      <div className="grid grid-cols-[auto_1fr_auto] items-stretch">
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

        <div className="flex items-center gap-3 pr-4 sm:pr-6">
          <span className="hidden font-[family-name:var(--font-docket)] text-sm tracking-wide text-brand-ink sm:inline">
            JOB NO. {overview.fieldApp.jobNo}
          </span>
          <button
            type="button"
            className="border border-brand-ink bg-brand-header p-2 text-brand-ink lg:hidden"
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
