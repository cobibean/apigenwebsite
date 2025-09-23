# Block Registry Plan

- Each block exports: `name`, `component`, `schema` (zod), `previewProps`.
- Registry file: `src/blocks/registry.ts` returns a map `{ [type: string]: BlockDef }`.
- Pages consume JSON like:
  ```json
  { "slug": "/", "blocks": [ { "type": "Hero.Video", "props": { "title": "APIGEN" } } ] }

Validation: zod schemas run at load; invalid pages fail build in dev.


---

### `content/pages/home.json` (stub so you can wire the renderer)
```json
{
  "slug": "/",
  "seo": {
    "title": "Home",
    "description": "Premium quality dried cannabis exporter."
  },
  "blocks": [
    {
      "type": "Hero.Video",
      "props": {
        "eyebrow": "PREMIUM QUALITY DRIED CANNABIS EXPORTER",
        "title": "APIGEN",
        "cta": { "label": "Get in touch", "href": "/contact" },
        "src": "/hero/apigen-hero.mp4",
        "poster": "/hero/poster.jpg"
      }
    },
    { "type": "Split.Mission", "props": { "title": "Our mission", "body": "A leader in handcrafted, small-batch, premium quality cannabis." } },
    { "type": "Banner.BigType", "props": { "text": "WE HAVE HIGH STANDARDS — AND SO DO OUR PARTNERS" } },
    { "type": "Quote.Block", "props": { "quote": "Quality without compromise.", "byline": "Apigen Founders" } },
    { "type": "CTA.Bar", "props": { "primary": { "label": "Contact", "href": "/contact" } } },
    { "type": "Journey.CardAccordion", "props": { "title": "Your path with Apigen", "steps": [
      { "title": "See a doctor", "body": "Discuss eligibility and treatment options." },
      { "title": "Get a prescription", "body": "Your doctor prescribes appropriate products." },
      { "title": "Pharmacy dispensing", "body": "Pick up at partner pharmacies." },
      { "title": "Ongoing support", "body": "We partner with your care team." }
    ] } },
    { "type": "News.List", "props": { "limit": 3 } },
    { "type": "Alert.Inline", "props": { "kind": "disclaimer", "text": "Information provided is for educational purposes only..." } }
  ]
}
