# Theme

Framework: Next.js 16 App Router + React 19. CSS: Tailwind v4 via `@import "tailwindcss"` and `@theme inline` in `src/app/globals.css`. No `tailwind.config.ts`. No dark mode. Custom primitives live as `@layer components` classes (not shadcn).

## Compact token summary

### Colors (token trap)

`--color-brand-black` is **cream paper** `#efe6c8`, not black. Dark brown-black is `--color-brand-ink`.

| Token | Hex | Role |
| --- | --- | --- |
| brand-black | `#efe6c8` | Page ground (paper) |
| brand-surface | `#f7f1dc` | Quiet paper |
| brand-card | `#fff8e8` | Card fill |
| brand-card-hover | `#f3ead0` | Card hover |
| brand-border | `#c4b896` | Hairline |
| brand-border-muted | `#d4c9a8` | Softer hairline |
| brand-amber / brand-stamp | `#f3d31a` | Stamp yellow CTA fill |
| brand-amber-dark | `#d4b40f` | Stamp hover |
| brand-steel | `#5c5348` | Secondary text |
| brand-slate-text | `#6b6258` | Meta text |
| brand-ink | `#1c1814` | Primary text / borders |
| brand-cobalt | `#2242c8` | Accent, links, IMS UI, stamp text |
| brand-sheet | `#f3e6c4` | Footer ground |
| brand-header | `#d8c48c` | Manila sticky header |
| brand-ply | `#e8b4b8` | Pink lockup block, underlines |

Selection: cobalt fill, cream `#fff8e8` text. Focus: 2px cobalt outline, 3px offset.

### Type

- Sans: Barlow (`--font-barlow` → `--font-sans`) 400–700
- Display: Barlow Condensed (`--font-barlow-condensed` → `--font-display`) 600–800 — **lockup only**, not still posters
- Docket/mono: Courier Prime (`--font-courier` → `--font-docket` / `--font-mono`) 400–700

Classes:

- `.type-display` — condensed 800, tight tracking, lockup-scale titles on inner pages
- `.type-hero` — Barlow 600, 0.04em tracking, uppercase — homepage still/band titles
- `.type-docket` — Courier 1rem / 1.6
- `.type-title` — condensed 700
- `.type-body` — 1rem / 1.65, max 65ch
- `.type-label` / `.type-meta` — 0.8125rem steel
- `.type-data` — mono tabular uppercase

### Controls

- `.btn-primary` — 2px radius, ink 1px border, stamp yellow fill, cobalt condensed uppercase text
- `.btn-secondary` — cream card fill, ink border
- `.btn-text` — Courier bold uppercase, ply 2px underline
- `.field-control` — ink border, card fill, 2px radius, cobalt focus border

### Layout

- Content max-width: `max-w-6xl`
- Horizontal padding: `px-4 sm:px-6 lg:px-8`
- Header height ~5.25rem; homepage stills `min-h-[50dvh]` mobile, `lg:min-h-[calc(100dvh-5.25rem)]`
- Corners: 2px (not rounded-xl)
- No drop shadows on marketing surfaces

### Breakpoints (Tailwind defaults)

sm 640 / md 768 / lg 1024 / xl 1280

## Raw source

### package.json (CSS stack)

No Tailwind config file. Tokens are only in `src/app/globals.css`.

### src/app/globals.css

```css
@import "tailwindcss";

@theme inline {
  --color-brand-black: #efe6c8;
  --color-brand-surface: #f7f1dc;
  --color-brand-card: #fff8e8;
  --color-brand-card-hover: #f3ead0;
  --color-brand-border: #c4b896;
  --color-brand-border-muted: #d4c9a8;
  --color-brand-amber: #f3d31a;
  --color-brand-amber-dark: #d4b40f;
  --color-brand-amber-glow: rgb(34 66 200 / 0.08);
  --color-brand-steel: #5c5348;
  --color-brand-slate-text: #6b6258;
  --color-brand-ink: #1c1814;
  --color-brand-cobalt: #2242c8;
  --color-brand-sheet: #f3e6c4;
  --color-brand-header: #d8c48c;
  --color-brand-ply: #e8b4b8;
  --color-brand-stamp: #f3d31a;
  --font-sans: var(--font-barlow);
  --font-mono: var(--font-courier);
  --font-display: var(--font-barlow-condensed);
  --font-docket: var(--font-courier);
}

html {
  color-scheme: light;
}

body {
  background-color: var(--color-brand-black);
  color: var(--color-brand-ink);
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.65;
  letter-spacing: 0.01em;
  -webkit-font-smoothing: antialiased;
}

::selection {
  background: var(--color-brand-cobalt);
  color: #fff8e8;
}

:focus-visible {
  outline: 2px solid var(--color-brand-cobalt);
  outline-offset: 3px;
}

input,
textarea,
select {
  caret-color: var(--color-brand-cobalt);
}

@layer components {
  .type-display {
    font-family: var(--font-display), var(--font-sans), sans-serif;
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.08;
    text-wrap: balance;
  }

  .type-hero {
    font-family: var(--font-sans), system-ui, sans-serif;
    font-weight: 600;
    letter-spacing: 0.04em;
    line-height: 1.18;
    text-transform: uppercase;
    text-wrap: balance;
  }

  .type-docket {
    font-family: var(--font-docket), ui-monospace, monospace;
    font-size: 1rem;
    line-height: 1.6;
    letter-spacing: 0.01em;
  }

  .type-seam-burst {
    pointer-events: none;
    position: absolute;
    inset: -22% -18% -32% -10%;
    z-index: 0;
    background: radial-gradient(
      ellipse 90% 80% at 18% 46%,
      color-mix(in srgb, var(--color-brand-stamp) 58%, transparent) 0%,
      color-mix(in srgb, var(--color-brand-ply) 40%, transparent) 40%,
      transparent 74%
    );
    filter: blur(32px);
  }

  @media (prefers-reduced-transparency: reduce) {
    .type-seam-burst {
      filter: none;
      background: radial-gradient(
        ellipse 82% 72% at 18% 46%,
        color-mix(in srgb, var(--color-brand-stamp) 72%, transparent) 0%,
        color-mix(in srgb, var(--color-brand-ply) 48%, transparent) 38%,
        transparent 70%
      );
    }
  }

  .type-title {
    font-family: var(--font-display), var(--font-sans), sans-serif;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }

  .type-body {
    font-size: 1rem;
    line-height: 1.65;
    max-width: 65ch;
  }

  .type-label {
    font-size: 0.8125rem;
    font-weight: 500;
    line-height: 1.4;
    color: var(--color-brand-steel);
  }

  .type-meta {
    font-size: 0.8125rem;
    line-height: 1.45;
    color: var(--color-brand-steel);
  }

  .type-data {
    font-family: var(--font-mono), var(--font-sans), sans-serif;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border-radius: 2px;
    border: 1px solid var(--color-brand-ink);
    background: var(--color-brand-stamp);
    padding: 0.75rem 1.25rem;
    font-family: var(--font-display), var(--font-sans), sans-serif;
    font-size: 0.9375rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    line-height: 1.2;
    text-transform: uppercase;
    color: var(--color-brand-cobalt);
    transition: background-color 0.15s ease;
  }

  .btn-primary:hover {
    background: var(--color-brand-amber-dark);
  }

  .btn-primary:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    border: 1px solid var(--color-brand-ink);
    background: var(--color-brand-card);
    padding: 0.75rem 1.25rem;
    font-size: 0.9375rem;
    font-weight: 500;
    line-height: 1.2;
    color: var(--color-brand-ink);
    transition: background-color 0.15s ease;
  }

  .btn-secondary:hover {
    background: var(--color-brand-surface);
  }

  .btn-text {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding-bottom: 0.2rem;
    border-bottom: 2px solid var(--color-brand-ply);
    font-family: var(--font-docket), ui-monospace, monospace;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    line-height: 1.2;
    text-transform: uppercase;
    color: var(--color-brand-ink);
    transition: border-color 0.15s ease, color 0.15s ease;
  }

  .btn-text:hover {
    border-color: var(--color-brand-cobalt);
    color: var(--color-brand-cobalt);
  }

  .field-control {
    width: 100%;
    border-radius: 2px;
    border: 1px solid var(--color-brand-ink);
    background: var(--color-brand-card);
    padding: 0.75rem 0.85rem;
    font-size: 1rem;
    color: var(--color-brand-ink);
  }

  .field-control::placeholder {
    color: var(--color-brand-steel);
  }

  .field-control:focus {
    border-color: var(--color-brand-cobalt);
    outline: none;
  }
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: var(--color-brand-border);
  border-radius: 2px;
  height: 6px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  border-radius: 2px;
  background: var(--color-brand-cobalt);
  cursor: pointer;
  border: 1px solid var(--color-brand-ink);
}

input[type="range"]::-moz-range-thumb {
  height: 16px;
  width: 16px;
  border-radius: 2px;
  background: var(--color-brand-cobalt);
  cursor: pointer;
  border: 1px solid var(--color-brand-ink);
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: var(--color-brand-black);
}

::-webkit-scrollbar-thumb {
  background: var(--color-brand-border);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-brand-cobalt);
}
```
