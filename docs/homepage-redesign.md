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
2. Is this a product I would buy off the page? Answered by one generic live field app beside an office board, not a concreter screenshot on every surface.
3. Why not buy something off the shelf? Answered by naming the alternatives and the audit. Ghost tax on the page is the cost of leaving it on paper, as an illustration, not a claim.

## Standing constraints

- No invented clients, testimonials, quotes, or metrics. Ever.
- Xero or MYOB stay the books. Never a rip and replace.
- Zero em-dashes. No en-dash used as a separator anywhere visible.
- Prices are draft only and live on `/pricing` behind their disclaimer. Not on this page.
- No pills, labels, or type overlaid on photographs. No scroll cues. No section-number eyebrows.
- Never let an image model draw the product UI. The cab still is the original photograph with a whole `PhoneIms` Capture phone dropped into the hand, not a generated plate.
- Exactly one finished product screen renders live on this page: the generic day-painted field app. A second one turns the product band into a feature tour.
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
5. Custom build   ordered process list
6. Ghost tax      illustrative calculator, numbers come from the sliders
7. Visit offer    paper offer sheet with a header strip
8. Close          stacked line and the stamp
```

The product band is the only dark section. It exists so that acts 1 and 2 (claims) are immediately followed by proof, and so the reader who scrolls no further has still seen the product.

## Copy

All copy lives in `src/content/overview.ts`. That file is the spine; components read from it and never inline strings.

Two rules that are easy to break:

- The Tuesday timeline and the hero still's capture times must match. The copy tells the reader that the phone above is the same job, so 6:52 in the timeline has to be 6:52 in `imsFieldBuilds.pour.feed`. The live breakout, the cab still, and the office board are not that job and do not have to agree with it.
- The product band's closing note has to stay true at every width. The live phone is the field half of this board. Neither is a customer system, and neither is a concreter product.

## What sits where

| Surface | What it is |
| --- | --- |
| Hero hand still | `pour`, Kemerton, dusk. Tuesday points at it. |
| Cab still | Original cab photograph. A whole generic Capture phone in the fingers. Not Kemerton. |
| Live phone in the product band | `generic`, day paint. Unattributed. |
| Office laptop still | The same generic board, `DeskIms` day. |

`cartage` stays in the lab. It does not appear on `/`.

## Stills

The photographs are plates. The product UI in them is never drawn by an image model.

Laptop glass is a rectangle, so a four-point CSS warp is enough. That is `/lab/composite/desk`, shot by `npm run stills desk`. Those stills stay sharp because the board fills the frame. The board on that still is the generic, unattributed system. The photograph's wall notes must not name the hero's Kemerton job.

iPhone glass is not a rectangle. The hero hand still is still composited the way a retoucher would: `scripts/composite-phone.py` keys the photographed glass (bright blue on white) and warps a screenshot of `PhoneIms` `pour` into that region, at 2x, with no blur on the UI. The file written for the homepage is then cropped to that phone. The full 3072x2048 plate left the glass at ~300px on the hero, which reads as the old photographed screen.

The cab still uses the original overhead photograph, not a generated plate. `npm run stills cab` shoots a whole `PhoneIms` generic Capture device (`dusk`, `?view=capture&frame=device`) and drops it into the hand, keeping the wrapping fingers. Do not warp HTML into that photographed iPhone, and do not replace the plate with an image-model photograph. `python3 scripts/check-stills.py` fails both of those regressions.

Pipeline:

1. `src/content/stills.ts` holds each plate, its output name, and `fieldBuild` (phones).
2. `npm run stills` (dev server must be running) screenshots `PhoneIms` at 3x for phone plates, runs the Python compositor, and CSS-warps the desk board down to 1536x1024. Headless Chrome needs its own `--user-data-dir` if a GUI Chrome is already open. The compositor needs `python3` with Pillow, NumPy, and OpenCV. Cab shoots the whole Capture phone. Hand uses the job tab.
3. Reshoot `hand` after a change to the concreter field app. Reshoot `cab` after a change to the generic Capture tab. Reshoot `desk` after a change to the generic board.

If the hand plate is ever replaced, shoot the phone with a blank black (or chroma-green) screen and no UI in the glass.

The board is exactly 1440x810 and must fit without a clipped row. Six job rows, the summary, and the captures strip are all load bearing on that budget; `.ims-table td` padding is the release valve.

## Live screens on the page

`LiveScreen` renders the real `PhoneIms` / `DeskIms` at their device size and scales the whole block with fixed steps per breakpoint (`src/styles/screen-frame.css`). The app is not re-typeset for the page.

The homepage renders one of them: the generic field app, day paint, in the product band. The board is a photograph of that same unnamed system. `LiveScreen` still supports `desk`, and `/lab/ims/desk/[paint]` is where to review it.

Headings inside the product screens are paragraphs, not `h1` / `h2`. They are product chrome embedded in a marketing page and must not enter its heading outline.

`PhoneIms` with `tab="capture"` is a document camera (job chip, paper finder, last-captured strip), used in the lab (`?view=capture`) and in the cab still. The live breakout stays on the job tab.

## Motion

CSS only. The page ships no animation JavaScript.

- `.enter`: a time-based settle, used on the hero and on the demo's result rows. Stagger via `--enter-delay`.
- `.reveal`: the same keyframe driven by `animation-timeline: view()`. No observer to leak, and where the browser has no support the content renders in place, which is the correct fallback rather than a hidden block waiting on a script.
- Both are inside `@media (prefers-reduced-motion: no-preference)` and both are disabled in `@media print`, because a view timeline never advances on paper.

Verify motion by scrolling a real viewport. A `captureBeyondViewport` full-page screenshot does not advance a view timeline, so reveals will look broken in one.

## The demo

`GhostTaxSlice` mounts the existing `GhostTaxCalculator`. The number on screen is always derived from the sliders. Copy in `calculatorCopy` already says the total is an illustration, not a claim, and not a quote. Do not invent industry percentages beside it.

The docket engine stays on `/lab`. It is not a homepage toy.

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
- Run the ghost tax sliders and confirm the total changes. Confirm `/ghost-tax` still works.

## Out of scope

- Inner pages (`/coexistence`, `/sectors`, `/contact`, `/pricing`, `/lab`, `/ghost-tax`)
- Header and footer chrome
- A new visual world or palette
- Dark mode
