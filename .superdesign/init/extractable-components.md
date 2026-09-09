# Extractable components

## SiteHeader
- Source: `src/components/chrome/SiteHeader.tsx`
- Category: layout
- Description: Manila sticky header with ply lockup, caps nav, JOB NO., Book a site visit, mobile drawer
- Extractable props: `activeItem` (string, default: "/")
- Hardcoded: nav labels System/Process/Sectors/Contact, extra drawer links, JOB NO. 10482, CTA copy, hamburger, all CSS

## SiteFooter
- Source: `src/components/chrome/SiteFooter.tsx`
- Category: layout
- Description: Sheet footer with compact lockup, route list, visit CTA, copyright
- Extractable props: none required
- Hardcoded: blurb, nav links, Book a site visit, copyright, integrations line, CSS

## SiteMark
- Source: `src/components/chrome/SiteMark.tsx`
- Category: layout
- Description: Pink ply lockup BAD FORM + Systems
- Extractable props: `compact` (boolean, default: false)
- Hardcoded: wordmark text, ply background, display + docket fonts, CSS

## PageFrame
- Source: `src/components/chrome/PageFrame.tsx`
- Category: layout
- Description: Inner-page cream wrapper and display intro
- Extractable props: PageIntro `title`, `body`, `compact`
- Hardcoded: spacing, type-display, max-w-6xl

Skip extracting `.btn-primary` / `.btn-text` / `.field-control` — CSS primitives, inline in drafts.
