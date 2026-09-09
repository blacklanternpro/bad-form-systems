# Taste Skill (tracked copies)

The full Leonxlnx/taste-skill bundle is installed with:

```bash
npx skills add Leonxlnx/taste-skill
```

That writes 13 skills under `.agents/skills/`, which this repo gitignores. These two files are the ones the homepage recut must follow, copied here so the rewrite is reproducible:

- [design-taste-frontend](design-taste-frontend/SKILL.md)
- [redesign-existing-projects](redesign-existing-projects/SKILL.md)

Product overrides (do not follow the skill defaults here):

- Light-only. Do not add dark mode.
- Low motion. Stamp hover only. No GSAP, no Motion library.
- Do not change nav labels, header CTA copy, or contact form field names.
- Keep existing BAD FORM tokens (cream, ply pink, stamp yellow, cobalt, Barlow, Courier Prime).
- No overlay labels, pills, or cream plates on photos.
- No 3-equal-card rows as the default feature layout.
- No invented clients, quotes, or metrics.
