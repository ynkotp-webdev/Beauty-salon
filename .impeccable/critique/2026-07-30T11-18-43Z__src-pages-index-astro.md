---
target: the homepage
total_score: 32
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
timestamp: 2026-07-30T11-18-43Z
slug: src-pages-index-astro
---
Method: dual-agent for Assessment A (isolated sub-agent, completed in full) · Assessment B was spawned as an isolated sub-agent but was terminated mid-task by an API session-limit error before it could finish; its CLI detector scan is reproduced below by the orchestrating context (deterministic, unaffected by having read Assessment A's output), and the planned browser-overlay evidence was skipped rather than risk a second flaky/incomplete run. Treat Assessment B as partially degraded on the browser-evidence portion only.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | `before-after.ts` updates `aria-valuenow` on drag/keypress but never updates `aria-valuetext`, which stays frozen at "50%, рівно посередині" |
| 2 | Match Between System and Real World | 4/4 | Natural Ukrainian phrasing, correct phone/price conventions, booking order matches real-world salon flow |
| 3 | User Control and Freedom | 3/4 | Back buttons and Esc work throughout, but step 3 of Booking has no visible summary of steps 1-2 |
| 4 | Consistency and Standards | 4/4 | Radio-card, chip, button, and icon-arrow patterns reused identically everywhere |
| 5 | Error Prevention | 3/4 | Real date clamping and blur validation, undercut by direction/specialist/time all shipping pre-checked |
| 6 | Recognition Rather Than Recall | 3/4 | `data-label` makes the post-submit summary legible, but step 3 doesn't show the direction/master chosen earlier |
| 7 | Flexibility and Efficiency of Use | 3/4 | sessionStorage draft recovery, keyboard-controlled slider, "any available master" express path — no way to jump straight to a known specialist from outside the form |
| 8 | Aesthetic and Minimalist Design | 3/4 | System-wide restraint is real, but the Hero alone stacks six competing elements in one viewport |
| 9 | Error Recovery | 4/4 | Every validation failure gets specific text + icon, focus jump, and a live-region announcement |
| 10 | Help and Documentation | 3/4 | FAQ pre-empts real objections but is silent on cancellation/no-show policy |
| **Total** | | **32/40** | **Good** |

Both heuristic #7 and #10 genuinely apply to this Persuade-mode landing page and were scored, not waived.

## Design Specificity Verdict

**LLM assessment**: This reads as authored specifically for VERVENA, not a re-skinned template. The specificity shows up in checkable details: a real Lviv address and district, five named specialists each with a distinct craft voice rather than "stylist #1/#2" copy, a service/price taxonomy that reflects real salon economics, and a `DESIGN.md` that encodes actual product philosophy ("one guest per master per hour," the Legible Fill Rule with measured contrast ratios) as falsifiable rules rather than a mood board.

The one place genericism creeps back in is self-contradictory rather than merely generic: the Hero's "4.9 · відгуки гостей у Google" star rating and the Testimonials' "Підтверджено · Google/Instagram" tags assert a specific numeric rating and third-party verification for content that `PRODUCT.md`/`DESIGN.md` explicitly document as fictional. That's the exact generic-marketing-template move the product's own honesty principle exists to avoid.

**Deterministic scan**: `detect.mjs` ran clean — 0 findings — across all 22 homepage-relevant files (every section component, `BaseLayout`, `Header`, `Footer`, `StickyCta`, and the shared `ui/` primitives). No generic slop patterns (gradient text, decorative-icon-as-eyebrow, flat/gray palette, template-y spacing) triggered. This is expected and consistent with Assessment A's verdict: the detector catches category-level template tells, and this page has none — its real issues are semantic/behavioral (a factual contradiction, a stale ARIA attribute, form defaults) that a pattern-based scanner structurally cannot see. No false positives to report, since there were no findings at all.

**Visual overlays**: Not available this run. The browser-evidence sub-agent hit a session-limit error before it could complete the live-server + detector-overlay injection flow; no overlay is currently visible in any tab. The orchestrating context did not attempt a second browser pass, given this exact environment's documented history of unreliable headless-browser automation — the deterministic CLI scan above is the evidence of record for this dimension.

## Overall Impression

The bones are excellent: a genuinely bespoke information architecture, a documented and internally-consistent design system, and an accessibility-forward booking flow and comparison slider that most portfolio work doesn't bother with. The gap between "very good" and "excellent" here is not visual polish — it's a handful of specific, fixable contradictions between what the product claims about itself (no fake numbers, careful diagnosis before every choice) and what a few components actually do (a fabricated rating badge, three pre-checked form defaults). Closing those closes most of the remaining distance.

## What's Working

- **Booking flow** (`Booking.astro` + `src/scripts/booking.ts`): direction-filtered specialist list, sessionStorage draft recovery across refresh, focus management with a live region, inline icon+text validation — a rigorously accessible multi-step form, not just a checkbox-accessible one.
- **Before/after slider** (`Results.astro` + `src/scripts/before-after.ts`): a real WAI-ARIA slider (pointer, click-to-jump, arrow keys, Home/End, Shift for coarse steps) paired with an honest "Ілюстративне порівняння" disclaimer that defuses the highest-anxiety comparison on the page instead of overpromising.
- **The design system itself** (`DESIGN.md`, `global.css`): named, falsifiable rules (the Legible Fill Rule with measured contrast ratios, the Flat-at-Rest shadow rule) rather than a vague mood board.

## Priority Issues

**[P1] Fabricated "4.9 Google rating" and "Підтверджено" verified badges contradict the product's own no-fake-numbers rule**
- **Why it matters**: `PRODUCT.md`/`DESIGN.md` explicitly forbid dressing up fictional content as verified real evidence, yet `Hero.astro` shows a specific "4.9" with 5 gold stars sourced to "Google," and `Testimonials.astro` tags each quote "Підтверджено · Google/Instagram." A visitor evaluating the honesty-as-craft positioning this product is built on could catch the contradiction immediately.
- **Fix**: drop the numeric rating and "Підтверджено" claim; keep plain attribution without an unverifiable "confirmed" badge.
- **Suggested command**: `/impeccable audit`

**[P1] `aria-valuetext` on the before/after slider never updates after interaction**
- **Why it matters**: `before-after.ts`'s `set()` updates `aria-valuenow` but not `aria-valuetext`; screen readers prioritize `aria-valuetext` when present, so a blind visitor who drags the divider to 90% still hears "50%, рівно посередині" forever — breaking the site's single most interactive proof-of-craft interaction for the exact audience the accessibility work is meant to serve.
- **Fix**: in `set()`, update `aria-valuetext` alongside `aria-valuenow` on every change (or drop the attribute and let `aria-valuenow` speak for itself).
- **Suggested command**: `/impeccable harden`

**[P2] Pre-checked defaults in every booking step let a fast click-through submit unintended choices**
- **Why it matters**: direction, specialist, and time slot all ship pre-selected in `Booking.astro`. A visitor blasting through "Next → Next → Submit" can fire off a request for the wrong service/time without making a real choice, forcing the salon to catch and correct it by phone — undermining the "diagnosis before every procedure" promise at the moment intent should be captured.
- **Fix**: keep "any available master" pre-checked as a legitimate convenience default, but leave direction and time unselected so `required` forces one deliberate tap each.
- **Suggested command**: `/impeccable clarify`

**[P2] Time-slot picker breaks the product's own ≤4-choices chunking rule**
- **Why it matters**: 7 ungrouped time chips sit well above the ≤4 ceiling the rest of the product enforces (4-item service grids, 3-card rows) — the single densest decision point on the page.
- **Fix**: chunk into "Ранок / День / Вечір" sub-groups, or show 4 slots with a "показати ще" disclosure.
- **Suggested command**: `/impeccable layout`

**[P3] Primary nav carries 6 links, one above the ≤4 decision-point guideline**
- **Why it matters**: the header nav lists Послуги, Філософія, Майстри, Результати, Відгуки, Контакти — more parallel options than anywhere else on the site for a first-time visitor scanning where to go.
- **Fix**: consolidate to 4-5, e.g. fold "Результати" into the "Послуги" scroll target since Results sits functionally between Services and Specialists in the narrative.
- **Suggested command**: `/impeccable distill`

## Persona Red Flags

**Sam (Accessibility-Dependent User)**: fails at the Results before/after slider — `aria-valuetext` never updates after the first interaction, so every subsequent screen-reader announcement is wrong, at the page's flagship accessible-interaction showcase.

**Alex (Impatient Power User)**: fails at Booking's pre-checked defaults — three separate default selections mean Alex can click Next/Next/Submit in under two seconds and fire a request for a service and time he never actually chose.

**Casey (Distracted Mobile User)**: fails at Gallery's Instagram link — it opens in a new tab/app right in the middle of the AIDA funnel (between Specialists and Testimonials); a distracted visitor who taps it to peek at more photos can get swallowed by app-switching and never make it back to Booking.

## Minor Observations

- Mobile menu links in `Header.astro` carry a per-item `transition-delay`, but no `<a>` has its own `transition` property to delay against — the claimed staggered-link-entrance doesn't actually fire; the overlay just fades in as one flat block via the parent's opacity transition.
- The Contact map pin is the one place a solid `bg-mocha` fill (not `mocha-deep`) sits behind a light icon — fine for icon-contrast purposes, but the one exception to "mocha never fills a large solid shape" elsewhere in the system.
- Specialists renders all 5 masters in one flat grid with no sub-grouping — not a chunking failure since it's browsing rather than a decision point, but worth watching if a 6th specialist is ever added.
- Espresso (the dark tone) appears twice — once in `Gallery.astro` mid-funnel, once in `Footer.astro` at the close — diluting what `DESIGN.md` describes as a single bookend.

## Questions to Consider

- What if the Hero's numeric "4.9 Google rating" were removed entirely rather than softened — would the "quiet luxury, no inflated numbers" positioning land harder without any quantified trust claim at all?
- What if espresso appeared exactly once, only in the Footer, instead of twice (Gallery + Footer) — would a single true bookend sharpen the emotional arc's peak-end resolution?
- What if none of the three booking steps pre-checked an option — would forcing three deliberate taps meaningfully improve lead quality without adding friction the "спокійні кроки без поспіху" brand promise wouldn't already justify?
