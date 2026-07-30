---
target: the homepage
total_score: 29
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 2
timestamp: 2026-07-29T10-55-57Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design-review sub-agent · B: detector/browser-evidence sub-agent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Booking has a real progress bar, step label, and `aria-live` announcements; header condenses on scroll. Gap: no scroll-spy active-nav state across an 11-section single-pager. |
| 2 | Match Between System and Real World | 4 | Fluent, natural Ukrainian throughout; "від {price} ₴" convention, +380 phone format, a real old-town Lviv street address — reads like an actual local business. |
| 3 | User Control and Freedom | 3 | "← Назад" on every booking step; mobile menu closes cleanly; no forced modals. Escape-key dismissal of the mobile overlay not verified. |
| 4 | Consistency and Standards | 3 | The button/card/chip system is rigorously consistent. Ding: the price "develops like a photograph" scroll animation only exists in Chromium-class browsers (`@supports (animation-timeline: view())`), so the *same content* is experienced two different ways depending on browser. |
| 5 | Error Prevention | 3 | Date input has `min = today`; phone/name validated with specific patterns; sensible defaults reduce required decisions. |
| 6 | Recognition Rather Than Recall | 3 | Text-labeled nav throughout; the one icon-only control is the sticky mobile call button (icon + `aria-label`, no visible text). |
| 7 | Flexibility and Efficiency of Use | n/a | Persuade-mode landing/booking surface — power-user shortcuts aren't a relevant expectation here. |
| 8 | Aesthetic and Minimalist Design | 4 | Genuinely restrained — independently measured rendered contrast across a dozen pairs landed 4.87–15.1:1. Two pairs the detector caught fall short of that bar (see Priority Issues). |
| 9 | Error Recovery | 3 | Phone-format failures get a precise example; fields never get wiped. Gap: the "required field" message is identical whether a field is empty or just too short. |
| 10 | Help and Documentation | 3 | FAQ genuinely pre-empts likely objections (pricing "від", walk-ins, sterility, rescheduling) — functions as real contextual help despite being a marketing surface. |
| **Total** | | **29/36** | **Good (80.6%)** |

## Design Specificity Verdict

**LLM assessment**: This is authored for VERVENA specifically, not a reskinned template. The address (вул. Вірменська, 12 — a real old-town Lviv street) is used consistently across Contact, Footer, and the LocalBusiness JSON-LD. Five named specialists have distinct focuses tied to real service categories via a `directions` field that actually drives booking-form filtering, not decorative bios. The before/after slider is a genuine `role="slider"` with keyboard support, not a stock plugin. The Gallery grid uses container-query row heights tuned so four specific photographs hold their crops across breakpoints. Service copy uses real Ukrainian hairdressing/sanitation vocabulary ("air touch", "сухожарова шафа"), not translated boilerplate.

Where it brushes against "any premium salon template": the value-prop reassurances (sterility, curated cosmetics, individual approach) and FAQ content are the kind of category-generic copy any salon in any city could run verbatim — not a verdict-changer, but a real seam.

**Deterministic scan**: The detector's own `hero-eyebrow-chip` finding lands directly on this seam — flagging the hero's "eyebrow chip above h1" composition as a recognizable generic marketing-template convention, independent of and before the LLM review reached the same conclusion from a different angle (the value props / FAQ copy). Two independent methods converging on the same edge of an otherwise-specific design is a stronger signal than either alone.

The static CLI scan (`detect.mjs` over `src/pages/index.astro` + `src/components`) came back clean — 0 findings. The **live browser-rendered scan** (the same detector injected into the actual running page) found 28 individual findings across 10 rule names. That gap is expected and informative: computed contrast, actual character-per-line counts, and cross-section text patterns only exist once Astro's markup, Tailwind's compiled classes, and real page content are all composited together — exactly what a static source scan cannot see. Full breakdown below, folded into Priority Issues and Minor Observations.

## Overall Impression

The craft is real and it's specific — the booking flow's cognitive-load engineering (direction-filtered specialists, focus management, live-region announcements) and the photography/layout work are the kind of detail that separates a tested product from a good-looking mockup. The biggest opportunity is a direct **self-contradiction**: this is a brand whose stated positioning explicitly names "hiding prices" as a trust-destroying anti-pattern, and whose own newest visual signature (the scroll-linked price "developing like a photograph") puts exactly those numbers in a blurred, illegible state at the moment a visitor's scroll position most naturally lands on them. Everything else found is real but secondary to that one collision between the brand's stated principle and its newest piece of visual flourish.

## What's Working

1. **The booking flow's cognitive-load engineering is real, not cosmetic.** Direction-based specialist filtering, phone-format-specific validation messages, `aria-live` step announcements, and `preventScroll: true` focus management are the kind of detail that separates an actually-tested flow from a form that merely looks finished. Verified live: selecting "Волосся" in step 1 narrows step 2 from 5 specialists down to exactly "Будь-який вільний майстер" + the 2 matching masters.
2. **Photography and layout carry real specificity.** The Gallery section's asymmetric tall/wide/square grid with container-query row heights sits on the one dark (`espresso`) section of the page — a deliberate, well-executed rhythm break, not a random color swap.
3. **The restraint is real when measured, not just declared.** Independently composited rendered colors (not just the declared OKLCH tokens) across a dozen text/background pairs ranged 4.87–15.1:1 — `DESIGN.md`'s accessibility claims hold up under actual pixel measurement, with two specific exceptions (below).

## Priority Issues

**[P1] Service prices are illegible for a real portion of normal scroll navigation**
- **What**: `Services.astro`'s price paragraphs (`.scroll-develop`, `global.css` lines 288–304) start each price at `opacity: 0.25, blur(5px)` and only clear once the element has scrolled ~40% through its "cover" range. Traced live: clicking "Послуги" in the header nav or the hero's secondary button lands the Services section at the top of the viewport with the first card's prices still at `opacity ≈ 0.29, blur ≈ 4.7px` — measurably blurred, not a rendering artifact.
- **Why it matters**: `PRODUCT.md` names hiding prices as "a critical trust error, not a stylistic choice," and `DESIGN.md`'s own Do's list says "show every price plainly." A scroll-position-dependent blur on the single most trust-critical number on the page, applied at exactly the moment a visitor lands on the section built to answer "what does this cost," works against the brand's own stated principle. It's also inconsistent across browsers: `animation-timeline: view()` support is Chromium-class-only, so Firefox/older-Safari visitors see the same prices sharp and immediate — two structurally different experiences of the same content.
- **Fix**: Remove the blur/opacity treatment from the price element specifically and keep the "developing photograph" motif on something genuinely decorative (the numbered category chip, a gallery caption) — or shrink `animation-range` so it resolves within the first ~10% of scroll instead of 40%, so it's already sharp by the time the element is meaningfully on-screen.
- **Suggested command**: `/impeccable animate`

**[P1] Photo captions fail WCAG AA contrast (3.1:1, need 4.5:1) — real informational text, not decoration**
- **What**: `Figure.astro`'s `figcaption` (`bg-espresso/45` over the actual photograph, `text-porcelain`) composites to roughly 3.1:1 against typical photo tones — confirmed via the live browser scan, 5 occurrences (About's "VERVENA · Львів" caption + all 4 Gallery captions).
- **Why it matters**: Unlike a decorative flourish, these captions carry real content (image context/attribution). A semi-transparent scrim over a photo can land anywhere depending on the specific photo's brightness underneath it — this isn't a token problem, it's a structural one: a fixed 45% dark scrim doesn't guarantee AA contrast against arbitrary photography.
- **Fix**: Increase the scrim opacity (e.g. `espresso/70`+) or add a subtle `text-shadow`/gradient-behind-text treatment so the effective contrast holds regardless of the photo underneath. Spot-check against the actual gallery images, not just the token math.
- **Suggested command**: `/impeccable audit`

**[P2] Booking form has no state persistence — interruption silently erases all progress**
- **What**: `booking.ts` has no `sessionStorage`/`localStorage` calls anywhere; a refresh, accidental navigation, or a mobile OS backgrounding a tab wipes every field across all 3 steps with zero warning.
- **Why it matters**: The brand's whole positioning is "no rush, think it over calmly" — but the flow punishes exactly that behavior. A visitor stepping away mid-form (the single most human, expected interruption on a booking decision) returns to a blank step 1.
- **Fix**: Persist form values to `sessionStorage` on each `change`/step transition, restore on load, clear only on successful submit.
- **Suggested command**: `/impeccable harden`

**[P2] Long, unconstrained text lines hurt readability at wide viewport**
- **What**: The live browser scan measured two text blocks running ~128 and ~213 characters per line at desktop width (guideline: under 80).
- **Why it matters**: Very long line lengths make body copy tiring to track and re-find at the start of the next line — a real reading-comfort cost on a page whose whole voice is "unhurried, considered."
- **Fix**: Apply a `max-w-[65ch]`-style constraint (the project already uses `max-w-3xl`/`narrow` for reading-optimized text elsewhere — extend that pattern to whichever block(s) are currently unconstrained at desktop width).
- **Suggested command**: `/impeccable typeset`

**[P2] "Крок 3 з 3" reads as "Крок 3 3 3"**
- **What**: The `.eyebrow` class applies uppercase at 0.18em tracking; the Ukrainian preposition "з" (of), uppercased to "З", is visually near-identical to the digit "3" at this size/tracking — confirmed in a live screenshot of booking step 3.
- **Why it matters**: This is the exact element meant to reassure an anxious first-time visitor "you're almost done," and a small Cyrillic-specific typographic collision undercuts that reassurance right when it matters most.
- **Fix**: Exempt this label from the uppercase treatment, or reformat as "Крок 3 / 3" with a slash separator.
- **Suggested command**: `/impeccable typeset`

## Persona Red Flags

**Jordan (Confused First-Timer)**
- Landing on Services via the nav or hero button shows the first card's prices mid-blur — reads like "the page hasn't finished loading," a moment of doubt for someone already hesitant to click.
- "Air touch, розтяжка, балаяж" lists real professional-coloring jargon with zero inline explanation.
- "Крок 3 з 3" misreading as "Крок 3 3 3" undercuts the one element built to reduce her anxiety about how much is left.

**Riley (Deliberate Stress Tester)**
- Refresh or back-navigate mid-booking: confirmed zero persistence, all 3 steps' data gone, no warning, no recovery.
- Phone validation accepts only `380\d{9}` / `0\d{9}` after stripping separators — a landline or non-standard format hits a hard wall with no "message us on Instagram instead" escape hatch.
- The identical page reads two different ways depending on browser: the price-blur animation is Chromium-dependent, so the same trust-critical numbers are sharp-and-immediate in one browser and blurred-then-resolving in another.
- The browser's native Back button doesn't step back one form step the way the in-form "← Назад" button does — inconsistent with the in-form control's own behavior.

**Casey (Distracted Mobile User)**
- Genuine strength, measured directly: sticky call button 56×56px, book button 56px tall, mobile menu toggle 48×48px — all clear the 44×44pt minimum and sit correctly in the thumb zone.
- The no-persistence issue (above) costs her specifically more than most — she's the persona most likely to be interrupted mid-flow by a call or app-switch, and mobile browsers frequently reload backgrounded tabs outright.
- All below-the-fold photography is confirmed lazy-loaded — good for a likely slower connection.

## Minor Observations

- **`repeated-section-kickers`** (detector, 9 occurrences): every one of the page's 9 content sections opens with an eyebrow + headline pair. This is the intentional, documented "Label" typography role applied consistently by design, not sloppy repetition — flagging as a false positive, though worth a glance at whether 9-in-a-row ever reads as slightly monotonous during a full scroll-through.
- **`cream-palette` / `repeating-stripes-gradient` / `codex-grid-background`** (detector): the warm off-white canvas, the film-grain texture, and the hairline background pattern are all intentional, already-documented brand choices (the film-grain pattern specifically was already reviewed and registered as an intentional exception earlier in this project's history) — confirmed false positives, not new findings.
- **`em-dash-overuse`** (detector, 25 across body copy): a real, if minor, copy-craft note — worth varying sentence construction in a future copy pass so the voice reads less like a single stylistic tic repeated throughout.
- **`layout-transition`** (detector, 2 occurrences: `transition: width` on a div and the body): animating `width` triggers layout on every frame versus a `transform: scaleX` equivalent — likely the header-condense or booking progress bar; low real-world cost at this scale, but worth switching if either animation is ever felt to stutter.
- **Testimonial avatar-initial contrast** (detector, 4 occurrences, 4.2:1 against a 4.5:1 target): the `bg-sand`/`text-mocha-deep` initial circles in Testimonials are `aria-hidden="true"` and redundant with the visible author name right next to them — real but low-stakes, since no information is actually lost if it's hard to read.
- Header desktop nav carries 6 links + a CTA button — at the edge of, but not over, the ≤5-items guideline for a marketing single-pager.
- Testimonial star ratings are correctly `aria-hidden` with the real label on the wrapping element (`aria-label="Оцінка: 5 з 5"`) — done right.
- The before/after slider's instructional copy lives only above the component, not restated near the handle — a fast scroller could miss it before dragging.
- The hero's "Найближче вільне вікно… четвер, 14:00" is static, hardcoded copy — fine for a portfolio piece today, but will read as stale the longer the demo stays live.
- The "required field" validation message is identical whether a field is empty or just too short (e.g. a 1-character name) — slightly imprecise phrasing for the latter case.

## Questions to Consider

- The one place this design breaks its own "never obscure the price" rule is also its most visually inventive motion moment — was that trade-off ever checked against the pricing-transparency principle specifically, or did the motif get applied section-by-section independently?
- If a prospective client's phone rings mid-way through booking step 2 and they return five minutes later to a blank step 1, does that feel like the "unhurried" ritual the brand promises — or exactly the friction "quiet luxury" is supposed to remove?
- Now that specialist filtering by care-direction already exists and works, could the same logic filter *time slots* by specialist availability instead of showing the same static slots regardless of who's selected?
- The detector's `hero-eyebrow-chip` finding and the LLM review's "value props/FAQ read as generic" observation point at the same seam from two different angles — is there room to give the hero's opening beat one more specific, non-template detail the way the Gallery and booking flow already have?
