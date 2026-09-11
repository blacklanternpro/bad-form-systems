# Homepage spec

Source of truth for the BAD FORM Systems homepage. Change this file before recutting the page.

## Design read

Reading this as: a B2B trade-owner landing for a South West WA yard owner, in an incumbent paper/docket language, on the existing BAD FORM token set (cream, ply pink, stamp yellow, cobalt) with Barlow and Courier Prime.

Dials (overrides, not Taste Skill baselines):

- `DESIGN_VARIANCE: 5` (asymmetric paper against photographs, not artsy chaos)
- `MOTION_INTENSITY: 3` (one hero settle, one reveal family, one demo sequence, all CSS)
- `VISUAL_DENSITY: 5` (the product screens are dense on purpose; the paper around them is not)

## Audience and one job

Primary reader: the owner of a South West WA trade, civil, fabrication, or fleet business. The general ledger is fine. Jobs, dockets, variations, and field hours still live on paper, in spreadsheets, and in utes.

One job for this page: decide whether BAD FORM Systems is worth a yard visit. Not evaluate an agency portfolio. Not compare a SaaS feature grid.

The page has to answer three things the previous cut only asserted:

1. What does digitising a workflow actually get me? Answered by comparing one real day twice.
2. Are these real products or renders? Answered by putting the live app next to the photograph of that same yard's build.
3. Why not buy something off the shelf? Answered by naming the alternatives, the audit, and the build sheet with a blank button on it.

## Standing constraints

- No invented clients, testimonials, quotes, or metrics. Ever.
- Xero or MYOB stay the books. Never a rip and replace.
- Zero em-dashes. No en-dash used as a separator anywhere visible.
- Prices are draft only and live on `/pricing` behind their disclaimer. Not on this page.
- No pills, labels, or type overlaid on photographs. No scroll cues. No section-number eyebrows.
- Never let an image model draw the product UI. See "Stills" below.
- Exactly one finished product screen renders live on this page. A second one turns the product band into a feature tour, which is the visual grammar of the SaaS this page argues against. See "Two yards" below.
- One conversion label: `Book a site visit`. Nav labels and contact form field names do not change.
- Light only. No `dark:` variants.
- Radius is 2px everywhere.
- Icons come from `@phosphor-icons/react` only. Never hand-rolled SVG.

## Section order

Eight acts. One layout family each, used once.

```text
1. Hero open      split: copy on the page's left margin, field-app photograph bleeding right
2. Tuesday twice  paired ledger timelines on a subgrid, on paper against on the system
3. Product band   dark: cab photograph, live phone, board caption rail, office photograph
4. System map     three grouped clusters, captured / held / sent
5. Custom build   ordered process list, then the annotated build sheet
6. Docket slice   working demo, paste a docket and get a draft invoice
7. Visit offer    paper offer sheet with a header strip
8. Close          stacked line and the stamp
```

The product band is the only dark section. It exists so that acts 1 and 2 (claims) are immediately followed by proof, and so the reader who scrolls no further has still seen the product.

## Copy

All copy lives in `src/content/overview.ts`. That file is the spine; components read from it and never inline strings.

Two rules that are easy to break:

- The Tuesday timeline and the demo app's capture times must match. The copy tells the reader that the phone above is the same job, so 6:52 in the timeline has to be 6:52 in the feed. The hero phone is the concrete yard, so those times live in `overview.tuesday` and `imsFieldBuilds.pour.feed` / `imsCopy.desk.captures`. The haulage build is a different yard and does not have to agree with either.
- The product band's closing note has to stay true at every width. It claims the live phone is the same build as the photograph above it, and that the board is the other yard's and only ever a photograph.

## Two yards

The photographs carry two different field builds, and that is load bearing rather than decorative. One frozen screen repeated across the hero, the cab, and a breakout is what makes a reader file the page as a product tour, no matter what the copy says.

| Surface | Build | Trade |
| --- | --- | --- |
| Hero hand still | `pour` | Concrete formwork |
| Office laptop still (`DeskIms`) | `pour` | The same yard's board |
| Cab still | `cartage` | Tipper haulage |
| The one live screen in the product band | `cartage` | The cab photograph, up close |

Two rules hold this together:

- The live phone must stay on the same build as the photograph directly above it. It sits under that photographed phone by design, so a different build there reads as a contradiction, not as variety.
- Diverge builds by trade, job, and vocabulary, not by layout. At the homepage crop the glass is a few percent of the frame, so a redesigned layout is invisible while a different word on the primary button is not. `imsFieldBuilds` is data only, which is also the honest claim: the craft is ours, the system is the yard's.

Adding a build is an entry in `imsFieldBuilds` plus a `fieldBuild` on a plate in `src/content/stills.ts`. `PhoneIms` requires a build, so nothing can render a field screen without saying whose yard it is.

## Stills

The photographs are plates. The product UI in them is never drawn by an image model.

Laptop glass is a rectangle, so a four-point CSS warp is enough. That is `/lab/composite/desk`, shot by `npm run stills desk`. Those stills stay sharp because the board fills the frame.

iPhone glass is not a rectangle. It is a rounded display with a notch, already filled with a different generated UI. Guessing that silhouette in SVG and warping a rectangle onto four corners stays a few pixels off, which is obvious. Phone stills are therefore composited the way a retoucher would: `scripts/composite-phone.py` takes the photographed glass as the mask and warps a screenshot of `PhoneIms` into that region, at 2x, with no blur on the UI.

The two phones are not the same problem:

- Hand: the original UI is bright blue on white. Chroma-key that, and the mask is the real glass and notch.
- Cab: the original UI is dark gold on a black bezel. GrabCut plus a convex hull grew onto the chassis, so the still read as a screenshot held in a hand. Stay inside the measured glass quad, round it to the iPhone, and keep the photographed bezel. Do not clip a smaller rounded rect inside that glass or the app sits in a gutter. Never dilate onto the frame.

Pipeline:

1. `src/content/stills.ts` holds each plate, its output name, its `fieldBuild` (phones only), and (for the desk) the measured screen quad and glass grading.
2. `npm run stills` (dev server must be running) screenshots `PhoneIms` at 3x once per phone plate, from that plate's own `/lab/ims/phone/[build]/[paint]` route. It passes them to the compositor as `--ui hand=... --ui cab=...` (output 3072x2048 so the homepage crop stays legible), then CSS-warps the desk board down to 1536x1024. Headless Chrome needs its own `--user-data-dir` if a GUI Chrome is already open. The compositor needs `python3` with Pillow, NumPy, and OpenCV.
3. Reshoot after any change to the app screens, or the photographs will disagree with the live one sitting beside them on the page.

A bare `--ui path` still applies one screenshot to every plate, which is useful when debugging the masks. Do not ship that: the two stills are meant to be two yards.

If these plates are ever replaced, shoot the phone with a blank black (or chroma-green) screen and no UI in the glass. Keying a solid is trivial. Asking an image model to draw the product UI is not allowed and is what made the original plates hard to reuse.

The board is exactly 1440x810 and must fit without a clipped row. Six job rows, the summary, and the captures strip are all load bearing on that budget; `.ims-table td` padding is the release valve.

## Live screens on the page

`LiveScreen` renders the real `PhoneIms` / `DeskIms` at their device size and scales the whole block with fixed steps per breakpoint (`src/styles/screen-frame.css`). The app is not re-typeset for the page, so its proportions match the photographs.

CSS cannot divide a length by a length, so the scale cannot be container-relative without JS. The steps are deliberate.

The homepage renders one of them: the haulage phone in the product band. The board is a photograph here and nothing else. It never fit below `lg` anyway, and rendering it live as well gave the band two finished UI panels in caption rails, which is a feature tour. `LiveScreen` still supports `desk`, and `/lab/ims/desk/[paint]` is where to review it.

Headings inside the product screens are paragraphs, not `h1` / `h2`. They are product chrome embedded in a marketing page and must not enter its heading outline.

## The build sheet

`BuildSheet` sits inside act 5 and is the visible form of its second beat, which otherwise only asserts that a crew gets six fields it will fill rather than sixty it will skip.

It is not a phone and it imports no `ims.css`. A wireframe on paper reads as a proposal; a screenshot reads as a price list, and this act is arguing that what you get is drawn after the audit rather than picked off a shelf. Rows are `<span>`, never `<button>`: none of them is operable, and announcing six controls that do nothing would be worse for a screen reader than for anyone else.

The last row is blank on purpose and stays blank. It is the button that gets named on the site visit, so filling it in would be inventing a client's workflow, which the standing constraints forbid anyway. Content is `overview.custom.sheet`.

## Motion

CSS only. The page ships no animation JavaScript.

- `.enter`: a time-based settle, used on the hero and on the demo's result rows. Stagger via `--enter-delay`.
- `.reveal`: the same keyframe driven by `animation-timeline: view()`. No observer to leak, and where the browser has no support the content renders in place, which is the correct fallback rather than a hidden block waiting on a script.
- Both are inside `@media (prefers-reduced-motion: no-preference)` and both are disabled in `@media print`, because a view timeline never advances on paper.

Verify motion by scrolling a real viewport. A `captureBeyondViewport` full-page screenshot does not advance a view timeline, so reveals will look broken in one.

## The demo

`DocketSlice` posts to `/api/ingest`, the same route the docket lab uses. With no model key configured the route answers from a local sample and the result carries `source: "fallback"`, which the panel says out loud.

The panel handles four states explicitly: composed empty, loading skeleton, inline error with `role="alert"`, and result. When line items cannot be read from the payload it falls through to a raw payload view rather than throwing. `aria-live="polite"` and `aria-busy` are on the result region.

## Accessibility

- One `h1`, in the hero.
- Skip link to `#content` as the first focusable element.
- Photographs are `<figure>` with an `sr-only` figcaption carrying the demo note. Never a visible label on the image.
- Tap targets on the page are at least 44px (`min-h-11`). The product screens are excluded: they are pictures of an app, not controls.
- Focus rings stay the cobalt outline. Stamp contrast stays ink border with a cobalt label.

## Pre-flight

Run against a production build (`npm run build && npx next start`), because the dev indicator sits in the corner otherwise.

- `npm run lint` and `npm run build` clean.
- At 1440 and 390: no horizontal overflow, exactly one `h1`, no em-dash or en-dash in the rendered text, no tap target under 44px outside the product screens.
- With `prefers-reduced-motion: reduce`: nothing is animated and nothing is left at reduced opacity.
- Scroll the page at both widths and confirm every `.reveal` block resolves.
- Run the demo and confirm the empty, loading, result, and payload views.

## Out of scope

- Inner pages (`/coexistence`, `/sectors`, `/contact`, `/pricing`, `/lab`, `/ghost-tax`)
- Header and footer chrome
- A new visual world or palette
- Dark mode
