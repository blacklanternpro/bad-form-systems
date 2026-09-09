# Components

No shadcn/ui or component library. Shared primitives are CSS classes in `src/app/globals.css` (see `theme.md`). Shared React pieces are chrome marks and inner-page frames.

## SiteMark

- Path: `src/components/chrome/SiteMark.tsx`
- Description: Pink ply lockup — Barlow Condensed “BAD FORM” + Courier “Systems”
- Props: `compact?: boolean`

```tsx
import Link from "next/link";
import { siteName } from "@/content/nav";

interface SiteMarkProps {
  compact?: boolean;
}

export function SiteMark({ compact = false }: SiteMarkProps) {
  return (
    <Link href="/" className="flex min-w-0 items-stretch text-brand-ink" aria-label={siteName}>
      <span
        className={
          compact
            ? "flex items-baseline gap-2 bg-brand-ply px-3 py-2"
            : "flex items-baseline gap-2 bg-brand-ply px-2.5 py-2.5 sm:gap-2.5 sm:px-5 sm:py-4 lg:gap-3 lg:px-6 lg:py-5"
        }
      >
        <span className="font-[family-name:var(--font-display)] text-[1.375rem] font-extrabold tracking-tight sm:text-2xl lg:text-[2rem]">
          BAD FORM
        </span>
        <span
          className={
            compact
              ? "font-[family-name:var(--font-docket)] text-xs"
              : "font-[family-name:var(--font-docket)] text-sm sm:text-base"
          }
        >
          Systems
        </span>
      </span>
    </Link>
  );
}
```

## PageFrame / PageIntro

- Path: `src/components/chrome/PageFrame.tsx`
- Description: Inner-page cream section + display title block
- Props: `PageIntro`: `title`, `body`, `compact?`; `PageFrame`: `children`

```tsx
export function PageIntro({
  title,
  body,
  compact = false,
}: {
  title: string;
  body: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "mb-10" : "mb-14"}>
      <h1 className="type-display mb-5 text-[2rem] text-brand-ink sm:text-4xl lg:text-[2.75rem]">{title}</h1>
      <p className="type-body text-brand-steel">{body}</p>
    </div>
  );
}

export function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-brand-black py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
```

## Contact form fields

- Path: `src/components/contact/ContactForm.tsx`
- Description: Yard-visit request form using `.field-control` and `.btn-primary`
- Local `Field` primitive: `id`, `name`, `label`, `placeholder`, `type?`, `required?`

```tsx
function Field({
  id,
  name,
  label,
  placeholder,
  type = "text",
  required,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="type-label mb-2 block">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="field-control"
      />
    </div>
  );
}
```

Form chrome (submit / states):

```tsx
<button type="submit" disabled={status.kind === "loading"} className="btn-primary w-full sm:w-auto">
  {status.kind === "loading" ? contactCopy.sending : contactCopy.submit}
</button>
```

## Buttons (CSS, not React)

`.btn-primary` stamp yellow / cobalt / ink border 2px radius. `.btn-secondary` card fill. `.btn-text` Courier ply underline. Full CSS in `theme.md`.
