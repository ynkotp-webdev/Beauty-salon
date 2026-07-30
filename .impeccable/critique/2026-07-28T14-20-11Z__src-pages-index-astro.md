---
target: the homepage
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 2
p1_count: 1
timestamp: 2026-07-28T14-20-11Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design review · B: detector + browser evidence) — both ran isolated and in parallel against a live Astro dev server.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Booking progress bar is excellent; success panel gives no promised response timeframe beyond "найближчим часом" |
| 2 | Match Between System and Real World | 2 | Booking step 2 offers all 5 specialists regardless of direction chosen in step 1; confirmation summary shows raw ISO date instead of the localized format the picker itself displayed |
| 3 | User Control and Freedom | 3 | Back buttons work and preserve state; no way to edit a choice from the success screen without restarting |
| 4 | Consistency and Standards | 2 | Date field's error state never turns red while name/phone fields do; 8 places use arbitrary bracket type sizes outside the documented scale |
| 5 | Error Prevention | 3 | Radio-card defaults prevent empty submits; nothing stops picking an irrelevant specialist for the chosen direction |
| 6 | Recognition Rather Than Recall | 4 | Booking summary restates every choice before commit; nav labels mirror section headings exactly |
| 7 | Flexibility and Efficiency | n/a | Single-page marketing/booking flow; no power-user path expected |
| 8 | Aesthetic and Minimalist Design | 4 | Flat-at-rest cards, one accent per moment, generous whitespace — the best-executed dimension |
| 9 | Error Recovery | 3 | Text+icon inline errors mostly honored, except the date field |
| 10 | Help and Documentation | n/a | Not applicable to a persuade-mode marketing page |

**Total: 24/32 (2 n/a) — 75% — Good**, with a cluster of small consistency defects concentrated almost entirely in the booking form — the one place correctness matters most.

## Design Specificity Verdict

**Design review (unanchored):** Not a generic salon template. The copy is specific ("Один гість у робочу годину" as a recurring motif, not "book now"), the before/after slider uses full WAI-ARIA slider semantics rather than a plugin, prices are honest "від X ₴" ranges tied to real Ukrainian service names, and five named specialists have distinct voices in their bios rather than interchangeable stock copy. The OKLCH warm-neutral palette and Fraunces/Manrope pairing are consistently applied, not just declared in DESIGN.md. Where it slips toward generic: the stylized SVG map in Contact and the gradient-wash hero placeholder are agency-site defaults, and the FAQ questions themselves are templatable enough to fit any service business.

**Deterministic scan:** `detect.mjs` found 8 findings, all rule `design-system-font-size` — arbitrary bracket values (`text-[0.95rem]`, `text-[0.7rem]`) in `Footer.astro:18`, `Faq.astro:41`, `Services.astro:43/47`, `Specialists.astro:45`, `ValueProps.astro:21`, `Button.astro:31`, `Figure.astro:84` that sit outside DESIGN.md's documented type steps. On inspection these are genuine near-misses, not false positives — the design review didn't flag this at all, which is exactly the kind of gap the mechanical scan exists to catch: a repeated, intentional-looking size (0.95rem for "note" text, 0.7rem for chips/captions) that never got promoted to an actual token or named type-scale step.

**Visual overlay:** Not available this run — the skill's browser-injectable `detect.js` does not exist alongside `detect.mjs` in this installation (only the CLI script is present), so there's no user-visible overlay to point you to. This is a gap in the skill's local install, not a finding about your site. The CLI scan above and the design review's own live screenshots (mobile/tablet/desktop, real interaction testing) stand in for it.

## Overall Impression

The craft is real, not performed: accessible custom widgets (before/after slider), a working no-JS-degrades-gracefully contract for scroll reveals, and restraint that's actually executed (flat-at-rest shadows, rare accent color) rather than just described in DESIGN.md. But the two most-trafficked, highest-stakes elements on the page — the primary CTA button and the skip link — both fail basic accessibility checks that directly contradict what PRODUCT.md and DESIGN.md claim about this project's own standards. The single biggest opportunity: fix those two P0s first, since they undercut the exact "craft on display is the pitch" positioning this site is built around.

## What's Working

1. **The reveal/no-JS contract is correctly engineered, not just claimed.** Verified directly: without the runtime `.js`/`.reveal-enabled` classes, `[data-reveal]` elements carry zero hiding CSS, and a live incremental-scroll test showed all 39 reveal elements on the page correctly reaching `opacity:1`. Rare progressive-enhancement discipline in portfolio work.
2. **The before/after comparison (Results section) is a real accessible widget**, not a plugin: full `role="slider"`, `aria-valuenow`/`aria-valuetext`, keyboard-arrow support implemented in `before-after.ts` — exactly the kind of detail a hiring business owner would notice as craft.
3. **Restraint is executed, not just written down.** Shadows are genuinely flat-at-rest and only appear on hover/interaction across Services cards, Testimonials, and Gallery; the "rare accent color" rule holds up in every screenshot taken.

## Priority Issues

**[P0] Primary CTA text fails WCAG AA contrast.**
**Why it matters:** Measured live via canvas-normalized luminance on the actual rendered page: porcelain text on mocha background = **3.59:1**, below the 4.5:1 required for normal-weight ~15px text. This is the exact button used for "Підібрати час візиту," "Записатися," and "Надіслати заявку" — the single most important control on the page, on every viewport.
**Fix:** Use `mocha-deep` as the resting fill for button-on-light contexts instead of only as the hover state, and re-verify at 4.5:1+. Update `Button.astro`'s `primary` variant and `DESIGN.md`'s button spec together.
**Suggested command:** `/impeccable polish`

**[P0] Skip link is focusable but invisible.**
**Why it matters:** `BaseLayout.astro`'s "Перейти до основного вмісту" link correctly receives focus (confirmed via `document.activeElement`) but renders at 0×0 because the hand-written `.sr-only` rule in `global.css` sets the legacy `clip: rect(0,0,0,0)`, and Tailwind v4's auto-generated `.focus\:not-sr-only:focus` never resets that specific property. Every sighted keyboard user tabbing in gets zero visual acknowledgment the skip link exists — a WCAG 2.4.1 (Bypass Blocks) failure in practice, on the very first keystroke of the page.
**Fix:** Add `clip: auto` (or switch `.sr-only` to `clip-path: inset(50%)`, matching how Tailwind v4 itself now does it) inside the rule that fires on `:focus`.
**Suggested command:** `/impeccable polish`

**[P1] Booking step 2 shows irrelevant specialists.**
**Why it matters:** `Booking.astro` renders all 5 `specialists` unconditionally regardless of the `direction` chosen in step 1, even though `specialists.ts` already carries an `areas` field that could drive filtering. Reproduced live: choosing "Волосся" in step 1 still lists a manicurist, a brow/lash specialist, and a barber as full-weight options — 6 total choices, breaking the ≤4 cognitive-load guideline and heuristic #2 (match with the real world).
**Fix:** Filter the specialist grid by the chosen direction (or at minimum visually de-emphasize/sort non-matching specialists), keeping "any available" as the universal fallback.
**Suggested command:** `/impeccable harden`

**[P2] Date field never shows its error state.**
**Why it matters:** `Booking.astro` styles the date input with `data-[invalid]:border-error`, but `booking.ts`'s `checkField()` only ever sets `data-invalid` on the wrapper div, never on the input itself — while the name/phone fields correctly use `aria-[invalid=true]:border-error` and do turn red. Submitting with an empty date shows the text error message but no matching red border, an inconsistency within the same form step.
**Fix:** Change the date input's class to `aria-[invalid=true]:border-error` to match its siblings.
**Suggested command:** `/impeccable harden`

**[P2] Type-scale drift: 8 arbitrary bracket sizes outside the documented scale.**
**Why it matters:** `text-[0.95rem]` (note/body-adjacent text) and `text-[0.7rem]` (chips/captions) repeat across 7 files as one-off bracket values instead of a named token — confirmed by the deterministic scan, missed entirely by the design review. They're consistent enough to be de facto type steps that DESIGN.md doesn't yet document, which is a documentation gap as much as a code one.
**Fix:** Promote both to real tokens (e.g. `--text-note: 0.95rem`, reuse `--text-caption: 0.75rem` for the 0.7rem cases instead of a new bracket value) and update `DESIGN.md`'s Hierarchy section to match.
**Suggested command:** `/impeccable typeset`

## Persona Red Flags

**Riley (deliberate stress tester):**
- Submitted with only the pre-checked defaults (first direction, "any specialist," 13:00) plus name/phone — worked cleanly.
- Entered a very long hyphenated name with emoji and mixed-script characters into the name field — accepted with zero length cap (only a `value.length < 2` floor exists). It renders in the confirmation summary and wraps to two lines, visually clashing with the clean layout — an unanticipated long-name edge case.
- Entered `12345` as a phone number — correctly caught and rejected with a specific, text-based message. Works as designed.
- Going back from step 3 → 2 → 1 preserves every prior selection — no regression.

**Sam (keyboard/accessibility-dependent):**
- Tab order through the header is correct and logical end to end.
- The skip link is the headline finding (see P0 above): reachable and operable, but invisible — a jarring first impression for exactly the persona this feature exists for.
- Radio "cards" in booking (direction/specialist/time) all show a proper `focus-visible` outline at every tab stop tested.

## Minor Observations

- The header's signature "transparent floating over the hero" entrance never triggers at common desktop viewport heights: the hero measures 994px tall, so any viewport ≤ ~1074px tall (including the very common 1440×900 and 1366×768) shows the header already condensed from the first frame.
- The booking form has no no-JS fallback at all — steps 2-3 ship `hidden` in raw markup and "Далі" only works via JS, unlike the FAQ accordion and reveal system, which both degrade gracefully. Understandable given the confirmed "client-only, no backend" constraint, but worth naming as an inconsistency in progressive-enhancement discipline.
- Footer disclosure text ("Вигаданий проєкт для портфоліо...") measures 3.10:1 contrast — the one legally/ethically load-bearing sentence on the site is also its hardest to read.
- Booking confirmation shows the raw ISO date (`2026-07-28`) instead of the localized format (`28.07.2026`) the date picker itself just displayed — format via `Intl.DateTimeFormat('uk-UA')` before inserting into the summary.
- No horizontal overflow at any tested viewport (390/768/1440px) — confirmed independently by both assessments.
- One apparent "blank sections on scroll" finding from the mechanical screenshot pass turned out to be a capture-methodology artifact (an instant full-page screenshot under-triggers the IntersectionObserver reveal system) — resolved by the design review's more careful incremental-scroll test, which confirmed all 39 reveal elements do reach full opacity. Worth noting as an example of the two assessments cross-checking each other correctly.

## Questions to Consider

1. If the booking form is intentionally "no backend, confirmed by phone/messenger," why invest in strict phone-format validation but not in narrowing step 2's specialist list by the direction already chosen — which failure actually costs a real booking?
2. The design system names "flat-at-rest shadows" and "rare accent colors" as deliberate identity — but the one element that most needs to command attention (the primary CTA) is exactly where contrast was cut closest to the line. Deliberate trade-off, or was `mocha` simply undertested against `porcelain`?
3. Is the "transparent header over hero" entrance meant to be the common-case experience, or a best-case one? If the latter, does the sentinel need repositioning?
