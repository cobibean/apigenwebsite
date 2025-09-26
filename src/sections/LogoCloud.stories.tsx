import type { Meta, StoryObj } from "@storybook/react";
import LogoCloud from "./LogoCloud";

const meta = {
  title: "Sections/LogoCloud",
  component: LogoCloud,
} satisfies Meta<typeof LogoCloud>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Minimal: Story = { args: {} };
export const Typical: Story = { args: { title: "Trusted by" } };
export const Max: Story = { args: { logos: [
  { src: "/vercel.svg", alt: "Vercel" },
  { src: "/next.svg", alt: "Next" },
] } };


