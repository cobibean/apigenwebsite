# buildplan_phase4.md — Phase 4: Data Extensions & Interactivity

Goal: add functional pieces (Contact form API, analytics hooks), extend News features, optional Investors blocks; maintain adapter boundaries and a11y.

---

## Deliverables

- `ContactForm` section: posts to an API route and shows client-visible success/failure states. Validation with Zod (or equivalent) and safe error handling.
- API route: forwards to email/provider/webhook; adapter-friendly so the provider can be swapped later.
- News enhancements: categories/tags labels, date formatting; optional single post route stub.
- Optional Investors: `DocList`, `FinancialsByPeriod`, `ShareStructure` rendering from local JSON.
- Analytics helper integrated for key interactions (CTA clicks, Journey events), gated by an env flag.

---

## Journey Analytics (finalized set)

- `journey_card_view` → `{ index: 1..4, id, title }`
- `journey_card_hover` (desktop only) → `{ index, id, title, direction: 'top'|'right'|'bottom'|'left' }`
- `journey_card_click` → `{ index, id, title, href: '/contact' }`
- `journey_cta_click` → `{ location: 'journey_footer', label: 'Get in Touch', href: '/contact' }`
- Data attributes: root `data-block="Journey"` + `data-variant="row-4"`; per-card `data-item-index`.

---

## Tasks

1) Implement `ContactForm` with fields (name, email, phone, enquiry type, message), keyboard/a11y support, and success state UI.
2) Create API route under `app/api/contact/route.ts` with validation, rate-limiting guard, and provider adapter call (stub allowed initially).
3) Add small analytics event helper that no-ops in dev; wire Journey events and key CTA clicks.
4) Extend local JSON for News categories/tags and update list rendering; add date formatting.
5) Optional: add Investors JSON and sections; ensure sections remain prop-driven.

---

## Acceptance Criteria

- Contact form submits successfully (happy path) and shows clear success; errors handled gracefully without console noise.
- Journey analytics fire with the defined payloads; reduced-motion respected in hover/focus.
- News list shows categories/tags and dates; optional single post stub present if included.
- No adapter leakage into sections; API/provider logic stays in adapters or API routes only.


