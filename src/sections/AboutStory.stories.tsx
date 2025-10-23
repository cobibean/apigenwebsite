import type { Meta, StoryObj } from "@storybook/react";
import AboutStory from "./AboutStory";

const meta: Meta<typeof AboutStory> = {
  title: "Sections/AboutStory",
  component: AboutStory,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Our Story",
    cards: [
      {
        title: "Generations of Farming Heritage",
        content: "Our story begins generations ago, in the lush farmlands of India, where our families cultivated the land with dedication, resilience, and an unwavering commitment to quality. For over a century, we've carried forward this deep-rooted agricultural heritage."
      },
      {
        title: "Pioneering Cannabis Cultivation",
        content: "As the world of cannabis evolved, so did we. In the early '90s, long before legalization, our master grower refined the craft of cannabis cultivation in the grey market, honing techniques that would later define the premium cannabis industry."
      },
      {
        title: "Decades of Experience & Innovation",
        content: "Decades of hands-on experience, trial, and innovation have given us an unmatched understanding of the plant—from legacy to legal. Today, we bring together the best of both worlds: the wisdom of traditional farming and the expertise of cannabis cultivation at the highest level."
      },
      {
        title: "Setting New Standards",
        content: "With a team of industry veterans, we blend corporate precision with a deep passion for the plant, pushing the boundaries of quality, innovation, and sustainability. From legacy growers to modern pioneers, we are here to set new standards in cannabis, always staying true to our roots while shaping the future."
      }
    ]
  },
};

export const Minimal: Story = {
  args: {
    title: "Our Story",
    cards: [
      {
        title: "First Chapter",
        content: "This is the beginning of our journey."
      },
      {
        title: "Second Chapter",
        content: "This is where we grew and learned."
      }
    ]
  },
};

export const SingleCard: Story = {
  args: {
    title: "Our Story",
    cards: [
      {
        title: "Our Complete Journey",
        content: "This single card contains our entire story, from humble beginnings to where we are today. It showcases our dedication, passion, and commitment to excellence in everything we do."
      }
    ]
  },
};
