# Pages

Candidate `--context-file` trees. Homepage is the design target. Skip 404.

## / (Home)

Entry: `src/app/page.tsx`

Dependencies:
- `src/components/overview/HomeHero.tsx`
  - `src/components/overview/SeamType.tsx`
  - `src/content/overview.ts`
- `src/components/overview/InfoBand.tsx`
  - `src/content/overview.ts`
- `src/components/overview/SubHero.tsx`
  - `src/components/overview/SeamType.tsx`
  - `src/content/overview.ts`
- `src/components/overview/OverviewBlocks.tsx`
  - `src/content/overview.ts`
- Shell (from layout, not imported by page):
  - `src/app/layout.tsx`
  - `src/components/chrome/SiteHeader.tsx`
    - `src/components/chrome/SiteMark.tsx`
    - `src/content/nav.ts`
    - `src/content/overview.ts`
  - `src/components/chrome/SiteFooter.tsx`
    - `src/components/chrome/SiteMark.tsx`
    - `src/content/nav.ts`
  - `src/app/globals.css`

Renders: full-bleed cab still (`/images/hero-cab.webp`) with `.type-hero` headline, `.type-docket` walk, `.btn-primary` + `.btn-text` on the still via `SeamType` burst; cream visit facts; office still (`/images/office-ims.webp`); offer 3-up; landscape table; stamp visit close.

## /contact

Entry: `src/app/contact/page.tsx`

Dependencies:
- `src/components/chrome/PageFrame.tsx`
- `src/components/contact/ContactForm.tsx`
  - `src/content/contact.ts`
- Shell as above

## /coexistence

Entry: `src/app/coexistence/page.tsx`

Dependencies:
- `src/components/chrome/PageFrame.tsx`
- `src/components/coexistence/CoexistenceBlocks.tsx`
- `src/content/coexistence.ts`
- Shell as above

## /sectors

Entry: `src/app/sectors/page.tsx`

Dependencies:
- `src/components/chrome/PageFrame.tsx`
- `src/components/sectors/SectorBlocks.tsx`
- `src/content/sectors.ts`
- Shell as above

## /ghost-tax

Entry: `src/app/ghost-tax/page.tsx`

Dependencies:
- `src/components/chrome/PageFrame.tsx`
- `src/components/calculator/GhostTaxCalculator.tsx`
- `src/content/calculator.ts`
- Shell as above

## /pricing

Entry: `src/app/pricing/page.tsx`

Dependencies:
- `src/components/chrome/PageFrame.tsx`
- `src/components/pricing/PricingGrid.tsx`
- `src/content/pricing.ts`
- Shell as above

## /lab

Entry: `src/app/lab/page.tsx`

Dependencies:
- `src/components/chrome/PageFrame.tsx`
- `src/components/lab/DocketLab.tsx`
- `src/content/lab.ts`
- Shell as above
