# Homepage redesign spec

Approved structure and copy for the BAD FORM Systems homepage. Recut Next.js only after this file is the source of truth. Superdesign canvas drafts (paper-first, split-dock, docket-sheet) are unused.

## Design read

Reading this as: a B2B trade-owner landing for a South West WA yard owner, with an incumbent paper/docket language, leaning toward the existing BAD FORM token set (cream, ply pink, stamp yellow, cobalt) plus Barlow and Courier Prime.

Dials (overrides, not Taste Skill baselines):

- `DESIGN_VARIANCE: 5` (asymmetric paper vs photographs, not artsy chaos)
- `MOTION_INTENSITY: 2` (stamp hover only)
- `VISUAL_DENSITY: 4`

Mode: redesign overhaul of homepage body and copy. Preserve brand tokens, header, footer, IA, and conversion label.

## Audience and one job

Primary reader: owner of a South West WA trade, civil, fabrication, or fleet business. The general ledger is fine. Jobs, dockets, variations, and field hours still live on paper, spreadsheets, and utes.

One job for this page: decide whether BAD FORM Systems is worth a yard visit. Not evaluate an agency portfolio. Not compare a SaaS feature grid.

## Keep vs kill

### Keep (product, not layout)

- Xero or MYOB stay the books. Custom IMS plus ute/cab capture sits beside them.
- Evaluation is a local yard visit in the South West.
- Both stills remain, IMS readable: `/images/hero-cab.webp` and `/images/office-ims.webp`. Synthetic demo, never a fake client.
- Ply lockup (BAD FORM condensed + typewriter Systems).
- Stamp yellow is the visit verb. Header CTA stays `Book a site visit`.
- JOB NO. 10482 from `xl`.
- Nav labels stay System / Process / Sectors / Contact.
- Contact form field names stay.
- No invented clients, testimonials, quotes, or metrics.
- Existing type roles: Barlow for UI, Barlow Condensed for the lockup only, Courier Prime for docket lines.

### Kill

- `SeamType`, type-on-still, and `.type-seam-burst`
- Cream overlay plates on photographs
- Barlow Condensed 800 posters on stills
- Cream sibling title slabs under stills
- CSS `scale-x: -1` on photos
- Two-col plus three-col of similar docket cards
- Four-col landscape table as a homepage dump
- Overlay pills or labels on images
- Scroll cues, section-number eyebrows, em-dashes

## Section order

Six sections. Each has one job. Layout family used once.

```text
1. Paper open     cream first viewport: headline, walk, stamp + text link
2. Cab still      photograph only (IMS readable, no type on pixels)
3. Two truths     ledger stays + evaluation is a yard visit
                  (asymmetric: one lead + one supporting, not two equal cards)
4. Office still   photograph only
5. How we work    three beats as a numbered process list, not a 3-card grid
6. Close          yard visit + stamp
```

Landscape comparison does not render on the homepage. The secondary CTA already sends that reader to `/coexistence`. Keep the landscape data in `src/content/overview.ts` for now; do not add a new inner-page section in this recut.

Header, footer, and inner pages stay. Homepage body only, plus deleting homepage-only components that become dead.

## Full copy

No em-dashes. No invented proof. Sentence case in source; `.type-hero` may uppercase headlines.

### Paper open

**Headline** (max 2 lines desktop):

The job system sits beside the books.

**Walk** (19 words; trimmed from the plan draft to meet the 20-word hero cap):

Keep Xero or MYOB. We build the job system the crew will use. Next step is a yard visit.

**Primary CTA:** Book a site visit → `/contact`  
**Secondary CTA:** How we sit beside Xero → `/coexistence`

No eyebrow. No tagline under the buttons. No JOB NO. in this block (header already has it from `xl`).

### Cab still

Photograph only. Alt stays descriptive. Demo note is screen-reader only, not a label on the image.

Alt: Overhead in a dusty ute: a work-worn hand on a phone open to a theoretical field IMS, and a paper docket on the other thigh.

Demo note: Demo layout. Not a live product shot.

### Two truths

**Lead**

Title: The ledger stays  
Body: You do not rip out accounting. Xero or MYOB remain the books. IMS is built beside them.

**Support**

Title: We come to the yard  
Body: Evaluation is a walkthrough in the South West, not a demo call from another city.

### Office still

Photograph only.

Alt: Site-office laptop open on a theoretical BAD FORM Systems jobs dashboard, with hi-vis and dockets in a South West yard office.

Demo note: Theoretical office IMS. Demo layout, not a live customer system.

### How we work

No "Step 1 / Step 2 / Step 3" labels. The verb is the label. Render as an ordered list so sequence is in the markup, not as three equal cards.

1. Title: Sit on the ute first  
   Body: We sit in the office and on the ute before we write a line.

2. Title: Custom IMS plus cab capture  
   Body: Not another SaaS login. Screens this crew will actually open.

3. Title: Built in the South West  
   Body: Build happens here. You are not a remote ticket.

### Close

If the books stay and the crew will use it, we should be on the yard.

CTA: Book a site visit → `/contact`

Same label as the header and paper open. That is one conversion, not a second intent.

## Layout and type rules

- Light-only. `html { color-scheme: light; }` stays. No `dark:` theme.
- Paper sections sit on `--color-brand-black` (`#efe6c8`).
- Stills are full-bleed photographs on `--color-brand-ink`. No cream plate, no burst, no type in the figure.
- First viewport is paper, not the cab still. The cab still is the next section so the service is still proven with a readable field phone.
- Paper open: left-aligned, top padding at or under `pt-24` desktop, `min-h-[calc(100dvh-5.25rem)]` so the stamp is in the first viewport. Headline uses existing `.type-hero`. Walk uses `.type-docket`, max-width about `36ch`.
- Two truths: CSS Grid `1fr` on small screens, `2fr 1fr` from `md`. Lead is the large statement. Support is a docket note. One hairline for the group, not a card box around each fact.
- How we work: stacked ordered list, full width, sparse divider between items (bottom border between items only, not border-t plus border-b). Not `md:grid-cols-3`.
- Close: stacked headline then stamp. Not a split-header.
- Buttons keep existing `.btn-primary` (stamp) and `.btn-text`. Radius stays 2px.
- Mobile: every multi-column block collapses to a single column under `md` (`px-4`, stacked).
- Do not introduce Motion, GSAP, marquees, or scroll hijack.
- Do not restore overlay plates, condensed-800 still posters, sibling slabs, photo mirrors, or another seam/burst pass.

## Component map

| File | Action |
| --- | --- |
| `src/app/page.tsx` | Rewrite section order to the six blocks above |
| `src/content/overview.ts` | Lock the copy in this spec. Keep `overview.body` for lab mocks. Keep `landscape` data but do not render it on `/` |
| `src/components/overview/PaperOpen.tsx` | New. Cream first viewport |
| `src/components/overview/StillFrame.tsx` | New. Photograph only. Used twice |
| `src/components/overview/TwoTruths.tsx` | New. Asymmetric lead + support |
| `src/components/overview/HowWeWork.tsx` | New. Numbered process list |
| `src/components/overview/VisitClose.tsx` | New or rewrite. Close line + stamp |
| `src/components/overview/HomeHero.tsx` | Delete |
| `src/components/overview/SubHero.tsx` | Delete |
| `src/components/overview/SeamType.tsx` | Delete |
| `src/components/overview/InfoBand.tsx` | Keep as cream wrapper if useful, or fold padding into the new blocks. Delete `FactList` / `VisitFacts` / `OfferFacts` if unused |
| `src/components/overview/OverviewBlocks.tsx` | Delete once `LandscapeMatrix` and the old `VisitClose` are unused |
| `src/app/globals.css` | Delete `.type-seam-burst` |
| `src/components/chrome/SiteHeader.tsx` | Do not change labels or CTA copy |
| `src/components/chrome/SiteMark.tsx` | Do not change |
| `src/components/chrome/SiteFooter.tsx` | Do not change |
| `src/components/lab/ParkingLotMocks.tsx` | Leave. It will pick up the new headline and walk line from `overview` |

Stills keep raw `<img>` (existing reason: do not re-encode the plates). Cab crop `object-[42%_28%]` / `xl:object-[44%_26%]`. Office crop `object-[78%_22%]` / `xl:object-[74%_20%]`.

One banner landmark: do not nest `<header>` inside the homepage. Paper open is a `<section>`.

## Accessibility

- Single `h1` in paper open.
- Cab still is a `<figure>` with `sr-only` figcaption for the demo note.
- Office still is a `<figure>` with `sr-only` figcaption. If a visible heading is required for the section, put it in the following How we work block, not on the photo.
- How we work heading is `h2`. Two truths lead title is `h2`. Close line is `h2`.
- Focus rings stay the existing cobalt outline.
- Stamp contrast stays ink border + cobalt label on stamp yellow.

## Out of scope

- Inner pages (`/coexistence`, `/sectors`, `/contact`, `/pricing`, `/lab`, `/ghost-tax`)
- Header/footer chrome
- Inventing a new visual world or palette
- Dark mode
- Superdesign implementation

## Done when

- First viewport is cream paper with headline, walk, stamp, and Xero link. Stamp visible without scroll at 1440 and 390.
- No type, burst, or plate on either still. Phone and laptop IMS remain readable.
- No 2-col/3-col docket dump. No landscape table on `/`.
- CTAs hit `/contact` and `/coexistence`. Nav labels unchanged.
- Copy matches this file. Zero em-dashes on the page.
