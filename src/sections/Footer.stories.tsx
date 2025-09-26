import type { Meta, StoryObj } from "@storybook/react";
import Footer from "./Footer";

const meta = {
  title: "Sections/Footer",
  component: Footer,
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Minimal: Story = { args: {} };
export const Typical: Story = { args: {} };
export const Max: Story = { args: { links: [
  { label: "Privacy", href: "/privacy" },
  { label: "Contact", href: "/contact" },
] } };


