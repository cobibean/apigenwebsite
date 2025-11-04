export interface AboutCard {
  title: string;
  content: string;
}

export interface AboutContent {
  title: string;
  cards: AboutCard[];
}

export const aboutContent: AboutContent = {
  title: "Our Story",
  cards: [
    {
      title: "Generations of Farming Heritage",
      content:
        "Our story begins generations ago, where our families cultivated their land with dedication, resilience, and an unwavering commitment to quality. For over a century, we've carried forward this deep-rooted agricultural heritage.",
    },
    {
      title: "Pioneering Cannabis Cultivation",
      content:
        "As the world of cannabis evolved, so did we. In the early '90s, long before legalization, our master grower refined the craft of cannabis cultivation in the grey market, honing techniques that would later define the premium cannabis industry.",
    },
    {
      title: "Decades of Experience & Innovation",
      content:
        "Decades of hands-on experience, trial, and innovation have given us an unmatched understanding of the plant—from legacy to legal. Today, we bring together the best of both worlds: the wisdom of traditional farming and the expertise of cannabis cultivation at the highest level.",
    },
    {
      title: "Setting New Standards",
      content:
        "With a team of industry veterans, we blend corporate precision with a deep passion for the plant, pushing the boundaries of quality and sustainability. From legacy growers to modern pioneers. Always staying true to our roots while shaping the future.",
    },
  ]
};
