# Apigen — Marketing Site Map

> Theme: dark, cinematic, big type, role-based CTAs. Sticky liquid-glass header, soft-grain imagery.

## Global
- **Header (sticky)**
  - Logo → "/"
  - Nav: Home, About, Brands, For Doctors, For Pharmacists, For Patients, News, Contact
  - CTA: Get in touch → /contact
- **Footer**
  - Quick links (same as header)
  - Newsletter (optional)
  - Medical/legal disclaimer
  - Social (optional): X/LinkedIn
- **System pages**
  - 404 Not Found
  - /robots.txt, /sitemap.xml

---

## Routes & Section Order

### `/` Home
1. **Hero (video or image)** — Eyebrow: “Premium quality dried cannabis exporter”, H1: “APIGEN”, CTA: Get in touch
2. **Mission split** — Headline + paragraph (quality/consistency/ethics)
3. **Customer Journey (interactive)** — Journey.CardAccordion (or Timeline) showing steps
4. **Big-type banner** — “We have high standards — and so do our partners”
5. **Founders quote** — pull-quote over soft image
6. **For Patients teaser** — 2 cards: Learn more / Contact us
7. **News teaser** — 3 recent articles → /news
8. **Footer disclaimer**

### `/about`
1. Simple hero: “About Apigen”
2. The Apigen Difference — 4-up features
3. Facilities/Process stats — small KPI row (GACP/GMP partners, batches, etc.)
4. Values grid (Transparent, Ethical, Consistent, Patient-first)
5. Partner logo strip
6. CTA: Partnerships / Export
7. Footer disclaimer

### `/brands`
1. Section header: “Brands / Products”
2. Portfolio grid — brand tiles (name, short line, Discover)
3. Optional: medical vs rec grouping (if relevant)
4. CTA: Get in touch

### `/for-doctors`
1. Hero+CTA: “Prescribing medicinal cannabis” (Register/Contact)
2. Process steps: diagnosis → prescription → dispensing → support
3. Why Apigen? (genetics, preservation, consistency, documentation)
4. Regulatory note (region-specific links)
5. Resources list (gated via access portal or contact)
6. CTA bar: Register / Contact Medical Affairs
7. Disclaimer

### `/for-pharmacists`
1. Hero+CTA: “Dispensing medicinal cannabis” (Register to stock)
2. Operations support (dosage forms, stock updates, batch COAs)
3. Why Apigen? (supply, documentation, consistency)
4. Resources list (SOPs, FAQs)
5. CTA bar: Register / Contact
6. Disclaimer

### `/for-patients`
1. Hero: “For Patients”
2. Access & eligibility (plain-English bullets)
3. How it works (see a doctor → prescription → pharmacy)
4. Help/Contact
5. Disclaimer

### `/news`
- Articles list (title, date, excerpt) + filters
- Pagination
- Single post view at `/news/[slug]`

### `/contact`
- Contact form (name, email, phone, enquiry type, message)
- Success/failed states
- Secondary contact info block
- Disclaimer

### Optional (recommended if public-facing)
- `/investors`
  - Overview, leadership cards, downloads (deck/fact sheet), “In the News”, financials accordion, share structure
- `/wholesale-export`
  - Regions served, documentation, MOQ/COA flow, inquiry CTA
- `/white-label`
  - Offer, process steps, compliance, inquiry CTA

---

## SEO Defaults
- Title pattern: `{pageTitle} — Apigen`
- Meta description per page section
- Open Graph: dark image with wordmark

---

## Content Ownership Checklist
- [ ] Legal disclaimers approved
- [ ] Patient copy vetted for compliance
- [ ] Press/news feed source chosen
- [ ] Brand tiles + copy delivered
- [ ] COA/Docs policy decided (public vs portal)
