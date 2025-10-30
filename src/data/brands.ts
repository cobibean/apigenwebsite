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
    heading: "Proud to be Craft. Proud to be Canadian.",
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
          "Showcases the best of British Columbia’s craft cultivation, reinforcing a meticulous, small-batch ethos.",
      },
      {
        title: "Consistency in every jar",
        description:
          "Each release reflects an unwavering commitment to quality, consistency, and Canadian craftsmanship.",
      },
    ],
  },
];

