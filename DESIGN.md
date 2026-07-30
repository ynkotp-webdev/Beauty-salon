---
name: VERVENA
description: Editorial "quiet luxury" design system for a Lviv beauty salon portfolio site
colors:
  canvas: "oklch(97.5% 0.01 75)"
  linen: "oklch(93% 0.02 75)"
  porcelain: "oklch(99% 0.004 75)"
  ink: "oklch(22% 0.01 240)"
  stone: "oklch(45% 0.02 240)"
  mist: "oklch(88% 0.008 240)"
  espresso: "oklch(26% 0.018 60)"
  mocha: "oklch(62% 0.08 65)"
  mocha-deep: "oklch(52% 0.08 62)"
  mocha-deeper: "oklch(46% 0.08 62)"
  lavender: "oklch(88% 0.04 290)"
  olive: "oklch(52% 0.06 140)"
  sand: "oklch(90% 0.03 75)"
  success: "oklch(58% 0.11 145)"
  error: "oklch(52% 0.16 25)"
  porcelain-dim: "oklch(92% 0.01 75)"
  porcelain-bright: "oklch(97% 0.008 75)"
typography:
  display:
    fontFamily: "Fraunces Variable, Georgia, serif"
    fontSize: "clamp(2.6rem, 1.8rem + 3.4vw, 4.4rem)"
    fontWeight: 300
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Fraunces Variable, Georgia, serif"
    fontSize: "clamp(1.85rem, 1.5rem + 1.6vw, 2.6rem)"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope Variable, Segoe UI, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.01em"
  label:
    fontFamily: "Manrope Variable, Segoe UI, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.18em"
  note:
    fontFamily: "Manrope Variable, Segoe UI, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.6
  chip:
    fontFamily: "Manrope Variable, Segoe UI, system-ui, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 500
    lineHeight: 1.2
rounded:
  lg: "0.75rem"
  xl2: "1rem"
  2xl2: "1.5rem"
  full: "9999px"
  focus-ring: "2px"
components:
  button-primary:
    backgroundColor: "{colors.mocha-deep}"
    textColor: "{colors.porcelain}"
    rounded: "{rounded.xl2}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.mocha-deeper}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl2}"
    padding: "0 24px"
    height: "48px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.mocha-deep}"
    rounded: "{rounded.xl2}"
    padding: "0 24px"
    height: "48px"
  card:
    backgroundColor: "{colors.porcelain}"
    rounded: "{rounded.2xl2}"
    padding: "28px"
  chip:
    backgroundColor: "oklch(62% 0.08 65 / 0.1)"
    textColor: "{colors.mocha-deep}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl2}"
    height: "48px"
---

# Design System: VERVENA

## Overview

**Creative North Star: "The Quiet Atelier"**

VERVENA reads like an unhurried Lviv craftsperson's studio, not a salon chasing volume. The palette is warm and grounded — every neutral, including the near-black ones, carries a tint rather than sitting on true gray — and the two accent hues (mocha, and a much rarer olive/lavender) show up in small doses: a chip, a rule, a single CTA. Fraunces at a light weight gives headlines an editorial, slightly serif calm; Manrope carries the reading text. Nothing in the system shouts: no bold color fills, no hard shadows, no snap transitions. Depth and emphasis come from restraint — a hairline border, a soft warm-tinted shadow that only appears on interaction, a translate instead of a flash.

The system explicitly rejects the visual vocabulary of a "conveyor-belt" salon: no countdown timers, no saturated banner blocks, no loud iconography, no inflated numbers. Motion is capped and physically eased; a whisper of film grain sits under everything as the only textural flourish, standing in for the tactility a photograph alone can't carry.

**Key Characteristics:**
- Warm OKLCH neutrals (never true gray) paired with three rare, low-saturation accents (mocha, olive, lavender)
- Fraunces (light weight, serif, editorial) for display type; Manrope for everything read at length
- Flat-at-rest surfaces; shadows and lift are an interaction response, never a resting state
- Physically-eased motion only (`cubic-bezier(0.16, 1, 0.3, 1)` / `cubic-bezier(0.65, 0, 0.35, 1)`) — linear and default ease are banned
- Soft, generous corners (1rem–1.5rem) everywhere except hairline dividers

## Colors

Warm, low-saturation neutrals carry the surfaces; three accent hues are used sparingly and always in a supporting role.

### Primary
- **Mocha Mousse** (`oklch(62% 0.08 65)`): the brand hue — active/checked states, focus rings, link underlines, thin rules, chip backgrounds at 10% opacity. Never used as a solid fill carrying text; at that lightness it fails 4.5:1 contrast against porcelain text (measured 3.6:1).
- **Mocha Mousse Deep** (`oklch(52% 0.08 62)`): the resting fill for every solid button/CTA/selected-state carrying porcelain text (5.5:1 contrast) — the primary button, the sticky mobile CTA, the skip link, the booking form's selected time-slot chip. Also the color of "quiet" text accents (eyebrow labels, ghost-button text).
- **Mocha Mousse Deeper** (`oklch(46% 0.08 62)`): hover/pressed state for every mocha-deep fill above (7.1:1 contrast) — one step darker so the "darkens on press" affordance still reads now that the resting state moved to mocha-deep.

### Secondary
- **Verdant Olive** (`oklch(52% 0.06 140)`): organic accent for a second service category chip and small "verified" text accents (e.g. testimonial source tags). Never a background fill larger than a chip.
- **Digital Lavender** (`oklch(88% 0.04 290)`): the softest accent — a third category chip and the low-opacity ambient wash behind the hero portrait. Reads as atmosphere, not as a UI color.

### Neutral
- **Warm Alabaster** (`oklch(97.5% 0.01 75)`) — `canvas`: the page background.
- **Muted Linen** (`oklch(93% 0.02 75)`) — `linen`: alternate section backgrounds (FAQ, value props) that break up long canvas stretches without a hard edge.
- **Porcelain** (`oklch(99% 0.004 75)`) — `porcelain`: raised surfaces — cards, the booking panel, chips' light counterpart.
- **Slate Charcoal** (`oklch(22% 0.01 240)`) — `ink`: primary text and heading color. Cool-toned, deliberately distinct from the warm surface family.
- **Soft Stone** (`oklch(45% 0.02 240)`) — `stone`: secondary/muted text — subheads, captions, durations.
- **Pale Mist** (`oklch(88% 0.008 240)`) — `mist`: hairline borders and dividers; the only border color in the system.
- **Deep Espresso** (`oklch(26% 0.018 60)`) — `espresso`: inverted sections (footer-adjacent bands) — warm dark, never a cool black.
- **Warm Porcelain** (`oklch(92% 0.01 75)`) — `porcelain-dim`: default body text on `espresso` (`.on-dark`) — dimmed below full white so it doesn't glare against the dark surface.
- **Bright Porcelain** (`oklch(97% 0.008 75)`) — `porcelain-bright`: headings within an `.on-dark` context — one step brighter than `porcelain-dim` for hierarchy, still short of pure white.

### Named Rules
**The Warm Neutral Rule.** No neutral in this system is true gray. Surfaces sit around hue 75 (warm), text sits around hue 240 (cool charcoal) — but even the darkest tones (`ink`, `espresso`) carry a visible tint, never `#000`-adjacent desaturation.

**The Rare Accent Rule.** Mocha, olive, and lavender never fill a large surface at full opacity. They appear as: a small rounded chip (`/10`–`/25` opacity background), a 1px gradient rule, a single primary CTA, or a blurred, low-opacity ambient wash. The moment an accent covers more than a button or a chip, dilute it.

**The Legible Fill Rule.** `mocha` (62% lightness) is a hue, not a fill — it never sits behind porcelain text. Any solid button/chip/CTA fill carrying porcelain text uses `mocha-deep` at rest and `mocha-deeper` on hover, both ≥4.5:1 against porcelain. This was a real bug (the original CTA measured 3.6:1) before it became a rule.

## Typography

**Display Font:** Fraunces Variable (with Georgia, serif fallback)
**Body Font:** Manrope Variable (with Segoe UI, system-ui, sans-serif fallback)

**Character:** An editorial pairing — a light-weight serif with real optical presence for headlines, set against a clean, slightly wide-tracked grotesque for body copy. The contrast is between "considered" and "legible," not between "loud" and "quiet."

### Hierarchy
- **Display** (300, `clamp(2.6rem, 1.8rem + 3.4vw, 4.4rem)`, line-height 1.04): the hero headline only. One word within it is set in italic mocha-deep for emphasis instead of bold weight.
- **Headline** (300, `clamp(1.85rem, 1.5rem + 1.6vw, 2.6rem)` → `clamp(2.25rem, 1.7rem + 2.6vw, 3.4rem)` at `sm:`, line-height 1.08–1.1): every section's `<h2>`.
- **Body** (400, 1rem, line-height 1.6, letter-spacing 0.01em): running copy. A `1.125rem` "lead" variant (`text-lg leading-relaxed`) is used for section intros and pull quotes.
- **Note** (400, `0.95rem`, line-height 1.6): secondary/supporting copy that sits between body and label — card descriptions, specialist bios, footer tagline, FAQ answers, the button label size. Token: `text-note`.
- **Label** (600, 0.75rem, letter-spacing 0.18em, uppercase): the "eyebrow" kicker above every section heading.
- **Chip** (500, `0.7rem`, uppercase): the smallest step — service-category badges and image/gallery captions. Distinct from Label: slightly smaller, lighter weight, tighter tracking (`0.12–0.14em`). Token: `text-chip`.

### Named Rules
**The Light Display Rule.** All headline-level type ships at font-weight 300 (Tailwind's `font-light`), even though the base stylesheet's `h1`–`h4` rule declares 380 as an unstyled fallback. Emphasis inside a headline comes from italics and color (mocha-deep), never from added weight.

## Layout

A single centered content column (`max-w-[78rem]` / 1248px default, `max-w-[86rem]`/1376px "wide" for image-heavy sections, `max-w-3xl`/768px "narrow" for reading-optimized text) with a responsive gutter of `1.25rem → 2rem → 3rem` (`px-5 sm:px-8 lg:px-12`). Vertical rhythm between sections runs on a three-step scale: `sm` (`py-14 sm:py-16`), `md` (`py-16 sm:py-24`), `lg` (`py-20 sm:py-28 lg:py-36`, the default for most sections). Alternating `canvas`/`linen`/`porcelain` background tones between sections stand in for hard dividers.

The FAQ section breaks the single column into an asymmetric two-column grid (`0.8fr` sticky label / `1.2fr` accordion) on large screens — the one deliberate departure from the centered-column default, reserved for content that benefits from a persistent anchor while the user scans a list.

## Elevation & Depth

Flat-at-rest, warm-tinted shadow on interaction. Passive content surfaces (service cards, testimonial cards) carry no shadow at rest — only a `mist` hairline border — and gain a soft shadow plus a 4px upward translate on hover. Inherently raised elements (the primary button, the booking panel, the floating hero detail card, the sticky mobile CTA) carry a shadow by default, since they read as "above the page" at all times. Every shadow is warm-tinted (`oklch(26% 0.02 60 / …)`), never a neutral or cool black.

### Shadow Vocabulary
- **Soft** (`0 1px 2px oklch(26% 0.02 60 / 0.04), 0 8px 24px oklch(26% 0.02 60 / 0.06)`): resting elevation for the primary button and default raised surfaces.
- **Lift** (`0 2px 4px oklch(26% 0.02 60 / 0.05), 0 18px 40px oklch(26% 0.02 60 / 0.1)`): hover state for cards and buttons, and the resting state for panel-level surfaces (booking form, hero media, floating detail card, sticky CTA).

### Named Rules
**The Flat-at-Rest Rule.** A shadow is either a hover response or a signal that an element floats above the page by design (buttons, panels, the sticky bar). A passive content card at rest never carries one — only its `mist` border does the work.

## Shapes

Soft, generous geometry throughout: `0.75rem` (`lg`) for the smallest rounded elements, `1rem` (`xl2`) for buttons/inputs/the mobile menu toggle, `1.5rem` (`2xl2`) for cards, media, and the booking panel, and fully-rounded (`rounded-full`) for chips, avatar/initial circles, and pill-shaped captions. Borders are a single hairline (`1px solid mist`) and are the only place a hard edge appears — the accordion's divider and card outlines both use it. No sharp (0-radius) corners appear anywhere in the built surface.

The one exception is the global `:focus-visible` ring itself (`border-radius: 2px`, `rounded.focus-ring`) — a hairline rounding so the outline doesn't read as a sharp rectangle on square-cornered targets, distinct from the component shape scale above.

## Components

### Buttons
- **Shape:** `1rem` radius (`xl2`), minimum height 48px (`md`) / 56px (`lg`) — every size clears the 48px touch-target floor.
- **Primary:** `mocha-deep` background, `porcelain` text (5.5:1), `soft` shadow at rest → `mocha-deeper` background (7.1:1) + `lift` shadow on hover.
- **Secondary:** transparent background, `ink` text, a 1px inset ring (`ink/15`) that darkens on hover (`ink/40`).
- **Ghost:** transparent background, `mocha-deep` text, a faint `mocha/6%` wash on hover.
- **Light:** `porcelain` background, `ink` text — for use on `espresso`/dark sections.
- **Press feedback:** every variant scales to 0.98 on `:active` — the system's one tactile micro-interaction, present everywhere instead of a bespoke one-off.

### Chips / Category Badges
- **Style:** fully rounded, `text-chip` (`0.7rem`) uppercase label text, tracked at `0.12–0.14em`, background at 10–25% opacity of the category's accent color (mocha/olive/lavender) with the solid accent as text color.
- **Use:** service category numbering, image/gallery captions — never a standalone navigational control.

### Cards / Containers
- **Corner style:** `1.5rem` (`2xl2`).
- **Background:** `porcelain` on `canvas`/`linen` sections.
- **Border:** 1px `mist`, always present at rest.
- **Shadow strategy:** none at rest; `lift` + `-translate-y-1` on hover (see Elevation & Depth).
- **Internal padding:** `1.75rem` (mobile) → `2.25rem` (`sm:`).

### Inputs / Fields
- **Style:** `canvas` background, 1px `mist` border, `xl2` radius, 48px minimum height.
- **Focus:** border shifts to `mocha`.
- **Error:** border shifts to `error`; an inline message with an icon appears below the field — color is never the only signal.
- **Selection style (radio "cards"):** the same card shape, `mocha/6%` background wash + `mocha` border + `soft` shadow when checked, plus a visible `focus-visible` ring for keyboard users.

### Navigation
- Wordmark: Fraunces, wide-tracked (`0.22em`) small caps-style spacing, no logomark — the name itself is the mark.
- Desktop links: `stone` at rest → `ink` on hover, with a `mocha` underline that animates in from the left on hover (not a static underline).
- Header surface: transparent over the hero, gaining a `canvas/85%` blurred background once the page scrolls (`data-scrolled`).
- Mobile: a full-screen overlay (not a dropdown), links staggered in on open, Fraunces at `text-2xl font-light`.

### Accordion (FAQ)
- Native `<details>`/`<summary>` — accessible and keyboard-operable with zero JS; a script enhances it to single-open behavior without changing the markup contract.
- A circular icon button (canvas background, mocha-deep plus icon) rotates 45° open, turning a `+` into a `×`.

## Do's and Don'ts

### Do:
- **Do** show every price plainly as "від {sum} ₴" next to its service — never hide pricing behind a "contact us" gate.
- **Do** keep every tappable control (buttons, radio cards, chips) at a 48px+ minimum touch target.
- **Do** reserve an image's aspect-ratio up front (the `Figure` component) so nothing shifts as photos load; CLS stays at zero.
- **Do** pair every validation state with text + an icon, never color alone.
- **Do** give every interactive element a visible `focus-visible` ring: 2px `mocha`, 3px offset.
- **Do** respect `prefers-reduced-motion` completely — all transitions and the scroll-reveal system collapse to instant with it on.

### Don't:
- **Don't** use linear or default ease-in-out easing anywhere; only the two physically-eased curves (`ease-out-quart`, `ease-in-out-soft`) are sanctioned.
- **Don't** fill a large surface with a saturated accent color; mocha/olive/lavender stay in chips, rules, a single CTA, or low-opacity ambient washes.
- **Don't** use aggressive urgency copy, countdown timers, or fake scarcity — the hero's one availability note is soft and informational, never a pressure tactic.
- **Don't** let a scroll-reveal travel more than 20px or apply a hard shadow to a resting content card.
- **Don't** invent or inflate numbers (review counts, client counts, ratings) — this system's honesty about being a fictional portfolio project depends on never dressing up the fake content as verified real evidence.
