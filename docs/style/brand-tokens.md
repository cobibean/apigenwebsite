# Apigen — Deck-Only Palette (Averaged)

_Method:_ Rasterized all 7 pages, quantized each page, merged close colors using LAB Δ < ~7, then weighted by pixel frequency.

## Core (brand darks)
- **Ink**: `#131515`  (near-black for text on light)
- **Forest Charcoal** (Primary UI dark): `#1F2726`
- **Graphite**: `#363A3A`

## Warm Neutrals (ordered light → dark)
- 50:  `#FAFAFA`
- 100: `#DEDAD8`
- 200: `#D5CDC7`
- 300: `#CABBB1`
- 400: `#B2A7A3`
- 500: `#94808A`
- 600: `#7F7C75`
- 700: `#776B65`
- 800: `#5F5E5B`
- 900: `#1F2726`

_Supporting neutrals observed in deck:_  
`#4B4D49`, `#3A3931`, `#A69083`

## Accents found in the deck (use sparingly)
- **Copper**: `#AE5521`  (CTA/heat)
- **Brick**: `#B9382C`   (alerts/rare emphasis)
- **Warm Tan**: `#CD9A71` (soft highlight, chips)
- **Beige**: `#CEAE97`   (subtle surfaces)
- **Taupe**: `#776B65` / `#827269` (eyebrow text, icons)

## Suggested assignments (for tokens)
- **Primary**: `#1F2726` (on light) → flips to **`#B2A7A3`** or **`#CD9A71`** on dark for contrast
- **Secondary**: `#B2A7A3`
- **Accent**: `#AE5521` (Copper), with **Brick `#B9382C`** reserved for destructive/error contexts
- **Text on light**: `#131515`
- **Text on dark**: `#DEDAD8` / `#FAFAFA`

> Note: The bright logo green does not appear in this UI palette; keep it for the mark only.

---

## Typography (spec)
- **Header 1 (H1)**: Open Sans — SemiBold; letter-spacing: `0.01em`
- **Header 2 (H2)**: IBM Plex Mono — Regular/SemiBold; letter-spacing: `-0.04em`
- **Header 3 (H3)**: Instrument Serif — Regular/SemiBold; letter-spacing: `0.11em`
- **Body 1**: Inter — Medium

Type scale (initial recommendation)
- H1: 40–56px / 1.1–1.2 line-height
- H2: 28–40px / 1.2 line-height
- H3: 22–28px / 1.25 line-height
- Body 1: 16–18px / 1.6 line-height

Notes
- All letter-spacing values expressed in `em` to be compatible with CSS.
- We’ll expose these via text styles and CSS variables, then map to Tailwind theme.

---

## Semantic color tokens (to CSS variables)
- Background/Foreground: `--bg`, `--fg`
- Surfaces: `--card`, `--popover`, `--muted`
- Brand: `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--accent`, `--accent-foreground`
- States: `--success`, `--warning`, `--error`, `--info`
- UI: `--border`, `--ring`, `--input`

Light (proposed mapping)
- `--bg`: `#FAFAFA`
- `--fg`: `#131515`
- `--card`: `#FFFFFF`
- `--muted`: `#DEDAD8`
- `--border`: `#D5CDC7`
- `--ring`: `#AE5521`
- `--input`: `#D5CDC7`
- `--primary`: `#1F2726`
- `--primary-foreground`: `#FAFAFA`
- `--secondary`: `#B2A7A3`
- `--secondary-foreground`: `#1F2726`
- `--accent`: `#AE5521`
- `--accent-foreground`: `#FAFAFA`
- `--success`: `#2E7D32`
- `--warning`: `#B26A00`
- `--error`: `#B9382C`
- `--info`: `#2F5DA0`

Dark (proposed mapping)
- `--bg`: `#131515`
- `--fg`: `#DEDAD8`
- `--card`: `#1F2726`
- `--muted`: `#5F5E5B`
- `--border`: `#4B4D49`
- `--ring`: `#CD9A71`
- `--input`: `#4B4D49`
- `--primary`: `#B2A7A3` (or `#CD9A71` for higher contrast in select contexts)
- `--primary-foreground`: `#1F2726`
- `--secondary`: `#5F5E5B`
- `--secondary-foreground`: `#FAFAFA`
- `--accent`: `#CD9A71`
- `--accent-foreground`: `#1F2726`
- `--success`: `#6DC28E`
- `--warning`: `#E0B15B`
- `--error`: `#E1685B`
- `--info`: `#7AA7E8`

---

## Implementation map
- Fonts
  - Load via Next font for: Open Sans, IBM Plex Mono, Instrument Serif, Inter.
  - Expose CSS variables: `--font-sans` (Open Sans), `--font-body` (Inter), `--font-mono` (IBM Plex Mono), `--font-serif` (Instrument Serif).
  - Text styles: map H1/H2/H3/Body1 sizes, weights, and letter-spacing.
- Tailwind theme
  - Extend `colors`, `fontFamily`, `fontSize`, `letterSpacing`, `borderRadius`, `boxShadow`.
  - Use semantic colors in components (no raw hex in sections).
- A11y
  - Validate contrast pairs (≥4.5:1); adjust `--primary-foreground` for dark where needed.
- Usage guidance
  - Copper accent reserved primarily for CTAs; Brick only for error/destructive.

---

See also: `docs/ComponentImportGuide.md` for importing and sanitizing third‑party components.
