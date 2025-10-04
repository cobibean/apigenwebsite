import type { Meta, StoryObj } from "@storybook/react";
import CTA from "./CTA";

const meta = {
  title: "Sections/CTA",
  component: CTA,
} satisfies Meta<typeof CTA>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Minimal: Story = { args: {} };
export const Typical: Story = { args: {} };
export const Max: Story = { args: { title: "Ready to talk?", copy: "Let's discuss.", label: "Contact", href: "/contact" } };

export const Olive: Story = { args: { variant: "olive" } };
export const Brown: Story = { args: { variant: "brown" } };
export const Neutral: Story = { args: { variant: "neutral" } };


