export type Strain = {
  id: string;
  title: string;
  eyebrow?: string;
  provenance?: string;
  tasting: {
    nose: string[];
    palate: string[];
    finish: string[];
  };
  growersNote?: string;
  chemistry?: {
    thcPctRange?: [number, number];
    thcLatestPct?: number;
    thcMgG?: number;
    cbdPct?: number;
    terpenes?: { name: string; mgG?: number; sharePct?: number }[];
  };
  cure?: string;
  trim?: string;
  moistureAw?: number;
  images: { src: string; alt: string; priority?: boolean }[];
  availability?: string;
  coaUrl?: string;
};

export const products: Strain[] = [
  {
    id: "cadillac-rainbow",
    title: "Cadillac Rainbow",
    eyebrow: "Reserve Dried Flower",
    provenance: "Mission, British Columbia",
    tasting: {
      nose: ["candied citrus peel", "pine resin", "white pepper"],
      palate: ["ripe mango", "sweet cream", "cedar nuance"],
      finish: ["bright zest with a gentle spice trail"],
    },
    growersNote:
      "Selected from a broad sift for dense structure and a vivid limonene signature; slow-cured for a satin, even burn.",
    chemistry: {
      thcPctRange: [26, 30],
      thcLatestPct: 26.2,
      thcMgG: 262,
      cbdPct: 0.8,
      terpenes: [
        { name: "Limonene", mgG: 6.0, sharePct: 29 },
        { name: "Myrcene", mgG: 5.3, sharePct: 25 },
        { name: "Caryophyllene", mgG: 4.1, sharePct: 20 },
      ],
    },
    cure: "14–21 day whole-plant hang; cold-cure",
    trim: "Hand-trimmed",
    images: [
      {
        src: "/products/cadillac-rainbow/hero.jpg",
        alt:
          "Cadillac Rainbow cannabis flower featuring candied citrus peel, pine resin, and white pepper notes",
        priority: true,
      },
      {
        src: "/products/cadillac-rainbow/detail-1.jpg",
        alt: "Close-up macro shot of Cadillac Rainbow trichomes showing limonene-rich profile",
      },
      {
        src: "/products/cadillac-rainbow/detail-2.jpg",
        alt: "Cadillac Rainbow dense flower structure highlighting hand-trim and cure quality",
      },
    ],
    coaUrl: undefined,
  },
  {
    id: "dantes-inferno",
    title: "Dantes Inferno",
    eyebrow: "Reserve Dried Flower",
    provenance: "Mission, British Columbia",
    tasting: {
      nose: ["dark stone fruit", "cocoa husk", "hint of anise"],
      palate: ["black cherry", "baked spice", "resinous depth"],
      finish: ["long, warm finish with cedar and pepper"],
    },
    growersNote:
      "Chosen for its layered caryophyllene profile and structure that carries flavor through the cure; balanced for a clean, steady burn.",
    chemistry: {
      thcPctRange: [26, 30],
      thcLatestPct: 27.1,
      thcMgG: 271,
      cbdPct: 0.7,
      terpenes: [
        { name: "Caryophyllene", mgG: 5.2, sharePct: 27 },
        { name: "Limonene", mgG: 4.8, sharePct: 25 },
        { name: "Humulene", mgG: 3.6, sharePct: 18 },
      ],
    },
    cure: "14–21 day whole-plant hang; cold-cure",
    trim: "Hand-trimmed",
    images: [
      {
        src: "/products/dantes-inferno/Dante1.jpeg",
        alt:
          "Dantes Inferno cannabis flower showcasing dark stone fruit, cocoa husk, and anise characteristics",
        priority: true,
      },
      {
        src: "/products/dantes-inferno/dantewhiteplain.jpeg",
        alt: "Macro detail of Dantes Inferno caryophyllene-rich flower structure",
      },
      {
        src: "/products/dantes-inferno/detail-2.jpg",
        alt: "Dantes Inferno finished flower displaying hand-trim precision and color complexity",
      },
    ],
    availability: "US, Canada, UK. We also acquire for other markets on request.",
    coaUrl: undefined,
  },
];
