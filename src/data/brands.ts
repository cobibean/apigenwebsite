export type Brand = {
  id: string;
  name: string;
  logo: string;
  heading: string;
  body: string[];
  attributes: Array<{ label: string; value: string }>;
  highlights: Array<{ title: string; description: string }>;
};

export const brands: Brand[] = [
  {
    id: "cannada-craft",
    name: "Cannada Craft",
    logo: "/brands/Cannada%20Craft%20No%20BG.png",
    heading: "Proud to be Craft.\nProud to be Canadian.",
    body: [
      "Our flagship dried flower brand, Cannada Craft, represents the heart of premium Canadian cannabis.",
      "Focused exclusively on the export of dried flower, we bring the best of BC craft cultivation to the global stage.",
      "Every jar of Cannada Craft reflects our dedication to quality, consistency, and the spirit of Canadian craftsmanship.",
    ],
    attributes: [
      { label: "Category", value: "Premium dried flower" },
      { label: "Origin", value: "British Columbia, Canada" },
      { label: "Market focus", value: "Global export partners" },
    ],
    highlights: [
      {
        title: "Export-first focus",
        description:
          "Purpose-built for dried flower export, aligning quality with the expectations of discerning markets.",
      },
      {
        title: "BC craft heritage",
        description:
          "Showcases the best of British Columbia's craft cultivation, reinforcing a meticulous, small-batch ethos.",
      },
      {
        title: "Consistency in every jar",
        description:
          "Each release reflects an unwavering commitment to quality, consistency, and Canadian craftsmanship.",
      },
    ],
  },
  {
    id: 'mission',
    name: 'Mission',
    logo: '/brands/mission_black_bg.jpeg',
    heading: 'From the hills of Mission\nto the hands of our customers.',
    body: [
      'Born in the city of Mission, British Columbia, our brand carries forward a legacy of producing some of the finest cannabis in Canada — a tradition that began in the grey-market era when craftsmanship and quality came first.',
      'MISSION reflects our commitment to cultivating premium, small-batch cannabis that honours our community\'s history while shaping the future of the industry. We focus on producing exceptional flower and products built on transparency, integrity, and trust, values that guide our relationships with partners and consumers alike.',
      'Every product we grow represents our dedication to delivering cannabis that is authentic, consistent, and worthy of its name: MISSION.'
    ],
    attributes: [
      { label: 'Category', value: 'Retail Brand' },
      { label: 'Origin', value: 'Mission, British Columbia' },
      { label: 'Focus', value: 'Small-Batch Craft Flower' },
      { label: 'Values', value: 'Transparency • Integrity • Trust' }
    ],
    highlights: [
      {
        title: 'Born in Mission, BC',
        description: 'Heritage meets innovation.'
      },
      {
        title: 'Premium small-batch cannabis',
        description: 'Crafted with integrity.'
      },
      {
        title: 'Retail brand built on transparency and trust',
        description: 'Founded on authentic relationships and values.'
      }
    ]
  }
];

