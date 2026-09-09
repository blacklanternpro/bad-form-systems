# Routes

Next.js 16 App Router under `src/app/`. Shared layout: `src/app/layout.tsx` (header + footer). Aliases in `src/proxy.ts`: `/overview` → `/`, `/southwest` → `/sectors`, `/calculator` → `/ghost-tax`, `/fieldtest` → `/lab`. Hash redirects in layout + `HashRedirect.tsx`.

| URL | File | Summary |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Homepage: cab still + type overlay, visit facts, office still, offer 3-up, landscape, visit close |
| `/coexistence` | `src/app/coexistence/page.tsx` | How the system sits beside Xero/MYOB |
| `/sectors` | `src/app/sectors/page.tsx` | Sector index |
| `/sectors/[slug]` | `src/app/sectors/[slug]/page.tsx` | trades, civil, fab, logistics |
| `/ghost-tax` | `src/app/ghost-tax/page.tsx` | Illustrative ghost-tax calculator |
| `/pricing` | `src/app/pricing/page.tsx` | Draft pricing (not verified product facts) |
| `/lab` | `src/app/lab/page.tsx` | Docket ingestion demo |
| `/lab/mocks` | `src/app/lab/mocks/page.tsx` | Parking-lot mock index |
| `/lab/mocks/cab` | `src/app/lab/mocks/cab/page.tsx` | Cab still mock |
| `/lab/mocks/yard` | `src/app/lab/mocks/yard/page.tsx` | Yard still mock |
| `/contact` | `src/app/contact/page.tsx` | Book a site visit form |
| `/icon.svg` | `src/app/icon.svg` | Favicon |

Header nav: System `/`, Process `/coexistence`, Sectors `/sectors`, Contact `/contact`. Primary CTA: Book a site visit → `/contact`.
