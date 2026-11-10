# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two layers, both real and both binding:

- **In-world:** prospective clients of a premium beauty salon in Lviv, deciding whether to book. They weigh trust signals before committing — visible pricing, hygiene standards, an unhurried atmosphere, a specialist who fits their need — over price-shopping alone.
- **Real-world (the actual audience that matters for the author):** business owners who might hire the author to build their own website. This site is a portfolio piece built to demonstrate to those prospective clients that the author can deliver a fully realized, production-grade small-business site.

## Product Purpose

A single-page marketing + booking site for a fictional premium beauty salon, "VERVENA," in Lviv, Ukraine — built as a portfolio piece. Two success criteria stack on top of each other: the in-world funnel must read as convincing enough that a real visitor would plausibly book (copy, trust signals, pacing all have to hold up), and the surrounding craft (code quality, content strategy, accessibility, motion, responsiveness) has to read to a visiting business owner as evidence they should hire the author for their own site. The site itself is the pitch.

## Positioning

**In-world:** "quiet luxury" — explicitly rejects rushed, loud, conveyor-belt salon norms. No aggressive urgency copy, no loud iconography, no inflated numbers or claims. One guest per master per working hour, diagnosis before every procedure, transparent "from" pricing (hiding prices is treated in this project's own design research as a critical trust error, not a stylistic choice).

**Meta (portfolio):** differentiates the author from generic template-based freelance work by demonstrating a fully bespoke, editorial-grade small-business site — the specific kind of craft a prospective small-business client can picture applied to their own brand.

## Operating Context

- Single fictional physical location: вул. Вірменська 12, Львів.
- Single-page site with a fixed AIDA section order: Hero → Value props → Services → About → Results → Specialists → Gallery → Testimonials → FAQ → Booking → Contact → Footer.
- Multi-step booking form (direction → specialist → time/contact) is a deliberate, confirmed constraint: client-only, no backend. It simulates a request that would be confirmed "by messenger or phone," not an actual reservation system.
- Ukrainian language and locale (`uk_UA`) throughout; phone formats, dates, and references are Ukraine-specific (+380).
- Deployed as a static site via GitHub Pages / GitHub Actions (portfolio demo) and Cloudflare Workers (client-hosting showcase).
- Services/prices and masters are editable by the salon in Pages CMS (`.pages.yml`): the site doubles as a live demo of "you edit prices yourself" for sales calls.

## Capabilities and Constraints

- Astro + Tailwind CSS v4 static site. No CMS, no database, no auth, no payments.
- The booking form's lack of a backend is intentional scope, not a gap — it is already documented as such in the code (`booking.ts`: "client-only; no backend").
- Content (prices in UAH, specialist names/photos, testimonials, hours, address) is fabricated for the portfolio and must stay internally consistent. It should never be "fixed" toward looking more or less real than it currently does.
- Undecided / explicitly out of scope unless the user asks otherwise: wiring the booking flow to a real backend, or turning any fictional business fact into a real one.

## Brand Commitments

- Name: **VERVENA** ("Простір краси VERVENA"), tagline "Простір усвідомленої краси."
- Voice: calm, unhurried, editorial, non-boastful. Code comments already rule out aggressive urgency, loud iconography, and inflated numbers as deliberate anti-goals.
- A visual system is already implemented (mocha / olive / lavender accents, Fraunces + Manrope type pairing, asymmetric editorial layouts). It is incumbent design authority for future refinement work, not something to redecide here — see `/impeccable document` to record it formally.

## Evidence on Hand

- Real photographic assets exist under `src/assets` (hero, about, gallery ×4, specialist portraits ×5, before/after results) and are used as-is.
- Testimonials, specialist bios, pricing, and hours are fabricated demonstration content. This is explicitly disclosed in the site's own footer: *"Вигаданий проєкт для портфоліо. Бренд, тексти й контактні дані є демонстраційними та не належать реальному закладу."* Future work must preserve that disclosure and must never present this content as verified real evidence (no real review counts, no real certifications, no real client names).
- No real business documents, real testimonials, or real pricing data exist, and none should be invented beyond what's already there.

## Product Principles

1. Preserve the fictional-portfolio framing and its disclosure. Never let future work make the fake business read as more "real" than it currently discloses itself to be.
2. The in-world site must keep reading as production-grade to a visiting business owner — the craft on display is the actual pitch.
3. Trust through transparency (visible pricing, honest claims, unhurried pacing) is the core mechanism of the in-world funnel and must survive any redesign, copy change, or extension.
4. Accessibility and precision in the details (keyboard flows, non-color-only validation, restrained motion) are part of what the site is trying to prove about the author's craft, not optional polish.

## Accessibility & Inclusion

No formally required standard was stated, but the existing implementation already commits to concrete practices worth treating as an established floor: inline validation via text + icon rather than color alone, focus management with live-region announcements in the multi-step booking flow, and visible focus-visible outlines throughout interactive elements.
