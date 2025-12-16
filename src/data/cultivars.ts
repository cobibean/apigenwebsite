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

export interface CultivarsContent {
  galleryTitle: string;
  gallerySubtitle: string;
  pageTitle: string;
  pageDescription: string;
}

export const cultivarsContent: CultivarsContent = {
  galleryTitle: "Cultivar Gallery",
  gallerySubtitle: "Explore our premium dried cannabis flowers up close",
  pageTitle: "Cultivars | Apigen",
  pageDescription: "Discover Apigen's reserve dried cannabis strains: Cadillac Rainbow and Dantes Inferno. Premium cultivars crafted in British Columbia for discerning wholesale partners.",
};

export const cultivars: Strain[] = [
  {
    id: "cadillac-rainbow",
    title: "Cadillac Rainbow",
    eyebrow: "Reserve Dried Flower",
    provenance: "Mission, British Columbia",
    tasting: {
      nose: ["Sweet fruit candy with cherry + citrus", "diesel gas base", "subtle garlic funk"],
      palate: ["Lemon-diesel", "sweet berry candy", "light herbal / savory hints"],
      finish: ["Sour lemon candy + gas", "faint garlic that lingers clean"],
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
        src: "/cultivars/cadillac-rainbow/1.jpeg",
        alt: "Cadillac Rainbow premium cannabis flower showcasing dense structure and vibrant color",
        priority: true,
      },
      {
        src: "/cultivars/cadillac-rainbow/2.jpeg",
        alt: "Close-up detail of Cadillac Rainbow trichomes and crystal structure",
      },
      {
        src: "/cultivars/cadillac-rainbow/3.jpeg",
        alt: "Cadillac Rainbow flower highlighting hand-trim precision and quality",
      },
      {
        src: "/cultivars/cadillac-rainbow/4.jpeg",
        alt: "Detailed view of Cadillac Rainbow buds showing limonene-rich profile",
      },
      {
        src: "/cultivars/cadillac-rainbow/5.jpeg",
        alt: "Cadillac Rainbow premium dried flower close examination",
      },
      {
        src: "/cultivars/cadillac-rainbow/6.jpeg",
        alt: "Macro shot of Cadillac Rainbow showcasing trichome density",
      },
      {
        src: "/cultivars/cadillac-rainbow/7.jpeg",
        alt: "Cadillac Rainbow flower structure and color complexity",
      },
      {
        src: "/cultivars/cadillac-rainbow/8.jpeg",
        alt: "Premium Cadillac Rainbow reserve dried flower presentation",
      },
      {
        src: "/cultivars/cadillac-rainbow/9.jpeg",
        alt: "Cadillac Rainbow cultivation excellence and quality showcase",
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
      nose: ["Vanilla cream dessert", "berry gelato", "subtle purple gas"],
      palate: ["Sweet black cherry + grape candy", "creamy cookie dough tones", "light mint"],
      finish: ["Smooth sweet cream", "purple candy", "cooling mint that hangs on"],
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
        src: "/cultivars/dantes-inferno/hero.jpg",
        alt: "Dante's Inferno premium cannabis flower showcasing dark stone fruit, cocoa husk, and anise characteristics",
        priority: true,
      },
      {
        src: "/cultivars/dantes-inferno/Dante1.jpeg",
        alt: "Close-up detail of Dante's Inferno trichomes and crystal structure",
      },
      {
        src: "/cultivars/dantes-inferno/detail-1.jpg",
        alt: "Dante's Inferno flower highlighting hand-trim precision and quality",
      },
      {
        src: "/cultivars/dantes-inferno/detail-2.jpg",
        alt: "Detailed view of Dante's Inferno buds showing caryophyllene-rich profile",
      },
      {
        src: "/cultivars/dantes-inferno/dantewhiteplain.jpeg",
        alt: "Dante's Inferno premium dried flower close examination",
      },
      {
        src: "/cultivars/dantes-inferno/vertical_close_up_flower_1.jpeg",
        alt: "Macro shot of Dante's Inferno showcasing trichome density",
      },
      {
        src: "/cultivars/dantes-inferno/vertical_close_up_flower_2.jpeg",
        alt: "Dante's Inferno flower structure and color complexity",
      },
      {
        src: "/cultivars/dantes-inferno/vertical_close_up_flower_3.jpeg",
        alt: "Premium Dante's Inferno reserve dried flower presentation",
      },
      {
        src: "/cultivars/dantes-inferno/dantes-inferno-01.jpeg",
        alt: "Dante's Inferno cannabis flower detail shot",
      },
      {
        src: "/cultivars/dantes-inferno/dantes-inferno-02.jpeg",
        alt: "Dante's Inferno quality showcase",
      },
      {
        src: "/cultivars/dantes-inferno/dantes-inferno-03.jpeg",
        alt: "Detailed view of Dante's Inferno buds",
      },
      {
        src: "/cultivars/dantes-inferno/dantes-inferno-04.jpeg",
        alt: "Dante's Inferno flower close examination",
      },
      {
        src: "/cultivars/dantes-inferno/dantes-inferno-05.jpeg",
        alt: "Premium dried Dante's Inferno flower",
      },
      {
        src: "/cultivars/dantes-inferno/dantes-inferno-06.jpeg",
        alt: "Dante's Inferno cultivation excellence",
      },
      {
        src: "/cultivars/dantes-inferno/dantes-inferno-07.jpeg",
        alt: "High-quality Dante's Inferno flower",
      },
      {
        src: "/cultivars/dantes-inferno/dantes-inferno-08.jpeg",
        alt: "Dante's Inferno premium reserve flower",
      },
      {
        src: "/cultivars/dantes-inferno/dantes-inferno-09.jpeg",
        alt: "Detailed Dante's Inferno flower structure",
      },
      {
        src: "/cultivars/dantes-inferno/dantes-inferno-10.jpeg",
        alt: "Dante's Inferno quality inspection",
      },
      {
        src: "/cultivars/dantes-inferno/dantes-inferno-11.jpeg",
        alt: "Premium Dante's Inferno dried flower",
      },
      {
        src: "/cultivars/dantes-inferno/dantes-inferno-12.jpeg",
        alt: "Dante's Inferno flower excellence",
      },
    ],
    coaUrl: undefined,
  },
];
