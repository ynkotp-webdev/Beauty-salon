# VERVENA — салон краси (Львів)

Premium, editorial **"quiet luxury"** marketing site for a fictional Lviv beauty
salon. Built as a portfolio piece to demonstrate modern frontend architecture,
design-system thinking and conversion-focused UX.

> Fictional project. The brand, copy and contact details are demonstrational and
> do not belong to a real business.

**Stack:** [Astro](https://astro.build) · [Tailwind CSS v4](https://tailwindcss.com)
· TypeScript · self-hosted variable fonts. Zero UI frameworks, ~4 KB of gzipped
first-party JS.

---

## Getting started

```bash
npm install
npm run dev      # dev server → http://localhost:4321
npm run build    # production build → ./dist
npm run preview  # preview the production build
npx astro check  # type & template diagnostics
```

Requires Node `>= 18.20 / 20.3 / 22+`.

---

## Design system

Everything derives from the accompanying UX research (editorial layout, Quiet
Luxury palette, WCAG 2.2, Core Web Vitals). Tokens live in
[`src/styles/global.css`](src/styles/global.css) as Tailwind v4 `@theme`
variables, so they surface as utilities (`bg-canvas`, `text-mocha`,
`font-display`, `rounded-xl2`, …).

| Token group | Highlights |
| --- | --- |
| **Colour** (OKLCH, wide-gamut) | `canvas` warm alabaster · `ink` slate charcoal · `mocha` (brand/CTA) · `lavender` · `olive` · `espresso` (inverted bands) |
| **Type** | Display: **Fraunces**; UI: **Manrope** (a freely self-hostable stand-in for Mona Sans). Perfect-Fourth (1.333) fluid scale via `clamp()` |
| **Spacing / radius** | 8px base · `lg` `xl2` `2xl2` radii |
| **Motion** | `--ease-out-quart` `cubic-bezier(0.16,1,0.3,1)`; reveals travel ≤ 20px; fully disabled under `prefers-reduced-motion` |

### Brand

- **Name:** VERVENA (botanical, calm) · **Tagline:** «Простір усвідомленої краси»
- **Location:** вул. Вірменська, 12, Львів (old town)
- **Voice:** calm, confident, editorial — no aggressive marketing, no fabricated
  stats. CTAs are outcome-based («Підібрати час візиту»).

---

## Architecture

```
src/
├── data/            # single source of truth for all content (typed)
│   ├── site.ts          brand, nav, contacts, hours, socials
│   ├── services.ts      catalogue with transparent "від {₴}" pricing
│   ├── specialists.ts   masters (craft-focused, no fake experience counts)
│   └── content.ts       value props, philosophy, gallery, testimonials, FAQ
├── components/
│   ├── ui/          # reusable primitives
│   │   ├── Container · Section · SectionHeading · Eyebrow
│   │   ├── Button   # the single action primitive (link/button, variants)
│   │   ├── Reveal   # scroll-reveal opt-in wrapper
│   │   └── Figure   # art-directed placeholder "photography"
│   ├── sections/    # one component per page block (AIDA narrative)
│   ├── Header · Footer · StickyCta
├── layouts/BaseLayout.astro   # <head>, SEO/OG, JSON-LD, skip link
├── scripts/         # tiny, dependency-free progressive enhancements
│   ├── reveal · before-after · header · accordion · booking
│   └── main.ts      # single entry, initialises everything after DOM parse
├── styles/global.css
└── pages/index.astro
```

Path aliases (`@ui/*`, `@components/*`, `@data/*`, …) are defined in
[`tsconfig.json`](tsconfig.json).

### Page narrative (AIDA)

Hero → Value props → Services → Philosophy → Results (before/after) →
Specialists → Gallery → Testimonials → FAQ → **Booking** → Contact → Footer.

---

## Notable implementation details

- **Multi-step booking** ([`sections/Booking.astro`](src/components/sections/Booking.astro)
  + [`scripts/booking.ts`](src/scripts/booking.ts)): progressive disclosure,
  progress bar, inline validation (text **and** icon — never colour-only),
  Ukrainian phone-format check, an "enclosed" success confirmation, and no forced
  registration. Focus moves with `preventScroll` so the page never jumps.
- **Accessible before/after slider** ([`scripts/before-after.ts`](src/scripts/before-after.ts)):
  pointer drag, click-to-position and full keyboard control (Arrows/Home/End)
  via the WAI-ARIA slider pattern.
- **Scroll reveals as progressive enhancement**: content is hidden only once JS
  arms `html.reveal-enabled`; without JS everything is visible.
- **Accessibility:** semantic landmarks, one `<h1>`, skip link, visible 2px
  focus rings, ≥48px touch targets, `prefers-reduced-motion` honoured.
- **Performance:** self-hosted variable fonts, static output, `aspect-ratio`
  reserved on media (CLS ≈ 0), lazy patterns, minimal JS.
- **SEO:** per-page title/description, Open Graph + Twitter, canonical, and
  `BeautySalon` JSON-LD structured data.

---

## Replacing the placeholder imagery

There is no stock photography by design (the research treats it as a status
killer). Each [`Figure`](src/components/ui/Figure.astro) renders an intentional
warm duotone tile and carries descriptive `alt` text describing the exact shot
that belongs there. To go live, swap `Figure`/`.placeholder-media` blocks for
`astro:assets` `<Image />` using the same aspect ratios, plus a ≤ 3.5 MB WebM/AV1
cinemagraph behind the hero.
