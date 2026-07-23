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
├── assets/          # photography, optimised at build time by astro:assets
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
│   │   └── Figure   # photography slot, with duotone placeholder fallback
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
  reserved on media (CLS ≈ 0), lazy patterns, minimal JS. Every photograph goes
  through `astro:assets` — WebP, per-breakpoint `srcset`/`sizes`, lazy by
  default; only the hero still is `eager` + `fetchpriority="high"` (it is LCP).
- **SEO:** per-page title/description, Open Graph + Twitter, canonical, and
  `BeautySalon` JSON-LD structured data.

---

## Фотографії (🇺🇦)

Усі 13 знімків уже підставлені й лежать у [`src/assets/`](src/assets/). Стокових
фото немає — це єдина серія, знята в одному світлі й тоні («тиха розкіш»:
тепле бічне денне світло, приглушена насиченість, натуральні матеріали, багато
негативного простору).

Плейсхолдери **не видалені**: [`Figure`](src/components/ui/Figure.astro) малює
теплу дуотон-плитку із зерном, якщо не передати `src`. Тому будь-яку секцію
можна тимчасово лишити без фото — верстка не поламається.

### Що де стоїть

| # | Файл у `src/assets/` | Секція | Пропорція кадру |
| --- | --- | --- | --- |
| 1 | `hero.webp` | [`Hero.astro`](src/components/sections/Hero.astro) — головне фото | `4/5` |
| 2 | `about.webp` | [`About.astro`](src/components/sections/About.astro) — філософія | `4/5` |
| 3–4 | `results-before.jpg` · `results-after.jpg` | [`Results.astro`](src/components/sections/Results.astro) — «До / Після» | `16/10` |
| 5–9 | `specialist-{iryna,marta,solomiya,ostap,khrystyna}.webp` | [`Specialists.astro`](src/components/sections/Specialists.astro), прив’язка в [`specialists.ts`](src/data/specialists.ts) | `4/5` |
| 10 | `gallery-space.webp` | Галерея «Простір» (`tall`) | `1/2` у сітці |
| 11 | `gallery-colour.webp` | Галерея «Колір» (`square`) | `1/1` |
| 12 | `gallery-details.webp` | Галерея «Деталі» (`square`) | `1/1` |
| 13 | `gallery-light.webp` | Галерея «Світло» (`wide`) | `2/1` |

Прив’язка фото до майстра — за фахом, а не за номером файлу: Ірина
(колористка) — кадр біля дзеркала з брашами, Марта (косметологиня) — кабінет
догляду за обличчям.

Брендові ассети: [`public/og-image.jpg`](public/og-image.jpg) (рівно 1200×630,
прев’ю при поширенні посилання) і [`public/favicon.svg`](public/favicon.svg) —
монограма «V» з гілкою вербени на плитці кольору `espresso`; той самий знак
без плитки лежить у [`public/logo.svg`](public/logo.svg).

### Чого ще бракує

- **Фонове відео для Hero** — короткий (15–20 с) беззвучний «cinemagraph»-луп
  з ледь помітним рухом (штори, пара, світло), **WebM/AV1**, ≤ 3.5 МБ, автоплей
  у циклі. Зараз на його місці — статичний кадр `hero.webp` + мʼякий градієнт.
  Відео накладається поверх, не змінюючи розмітку: контейнер уже тримає
  пропорцію `4/5`, тож зсуву контенту (CLS) не буде.

### Як додати або замінити фото

1. Поклади оптимізований файл (WebP/AVIF) у `src/assets/`.
2. Імпортуй його й передай у `Figure` як `src` — `alt` уже написані в коді
   та в [`data/`](src/data/), **не видаляй їх** (a11y + SEO):
   ```astro
   ---
   import Figure from '@ui/Figure.astro';
   import shot from '@/assets/shot.webp';
   ---
   <Figure src={shot} alt="…" ratio="4/5" />
   ```
3. Розміри й формати `astro:assets` згенерує сам. Вручну стискати не треба —
   вихідник клади великим, збірка зробить із нього `srcset`.
4. Перевір: `npm run build`, далі `npm run preview`.
