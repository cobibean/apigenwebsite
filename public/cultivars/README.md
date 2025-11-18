# Cultivar Images

This directory contains cultivar images organized by strain.

## Directory Structure

```
/cultivars/
├── cadillac-rainbow/
│   ├── hero.jpg          (primary hero image, ~800x800 or larger)
│   ├── detail-1.jpg      (supporting detail shot, macro/trichomes)
│   └── detail-2.jpg      (supporting detail shot, structure/trim)
└── dantes-inferno/
    ├── hero.jpg          (primary hero image)
    ├── detail-1.jpg      (supporting detail shot)
    └── detail-2.jpg      (supporting detail shot)
```

## Specifications

- **Hero images**: 800px × 800px minimum, square aspect ratio preferred
- **Detail images**: 600px × 600px minimum, square aspect ratio
- **Format**: JPG (preferred for size) or PNG
- **Optimization**: Compress before upload (use ImageOptim or similar)

## Naming Convention

Keep filenames lowercase and use hyphens for readability. The `/cultivars/page.tsx` references these paths:
- `/cultivars/cadillac-rainbow/hero.jpg`
- `/cultivars/cadillac-rainbow/detail-1.jpg`
- `/cultivars/cadillac-rainbow/detail-2.jpg`
- `/cultivars/dantes-inferno/hero.jpg`
- `/cultivars/dantes-inferno/detail-1.jpg`
- `/cultivars/dantes-inferno/detail-2.jpg`

## Image Descriptions (Alt Text)

The ProductShowcase component uses these pre-written alt texts:
- **Cadillac Rainbow hero**: "Cadillac Rainbow cannabis flower featuring candied citrus peel, pine resin, and white pepper notes"
- **Cadillac Rainbow detail-1**: "Close-up macro shot of Cadillac Rainbow trichomes showing limonene-rich profile"
- **Cadillac Rainbow detail-2**: "Cadillac Rainbow dense flower structure highlighting hand-trim and cure quality"

- **Dantes Inferno hero**: "Dantes Inferno cannabis flower showcasing dark stone fruit, cocoa husk, and anise characteristics"
- **Dantes Inferno detail-1**: "Macro detail of Dantes Inferno caryophyllene-rich flower structure"
- **Dantes Inferno detail-2**: "Dantes Inferno finished flower displaying hand-trim precision and color complexity"

## Updating Images

To replace or add new images:
1. Ensure they meet the specifications above
2. Save to the correct strain directory with the correct filename
3. No code changes needed—the component will automatically reference the new files

## COA Links

Certificate of Analysis (COA) links can be added in `/src/data/cultivars.ts` under the `coaUrl` field for each strain.
