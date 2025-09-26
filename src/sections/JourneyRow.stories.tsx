import type { Meta, StoryObj } from "@storybook/react";
import JourneyRow from "./JourneyRow";

const meta = {
  title: "Sections/JourneyRow",
  component: JourneyRow,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof JourneyRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Minimal: Story = { args: {} };

export const Typical: Story = {
  args: {
    eyebrow: "Our Journey",
    title: "From seed to shipment",
    copy: "A consistent, compliant path to premium product.",
  },
};

export const Max: Story = {
  args: {
    eyebrow: "Our Journey",
    title: "From seed to shipment",
    copy: "A consistent, compliant path to premium product.",
    items: [
      { title: "Cultivation", href: "/contact" },
      { title: "Processing", href: "/contact" },
      { title: "Quality", href: "/contact" },
      { title: "Export", href: "/contact" },
    ],
    ctaLabel: "Talk to sales",
    ctaHref: "/contact",
  },
};


