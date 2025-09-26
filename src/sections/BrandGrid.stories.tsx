import type { Meta, StoryObj } from "@storybook/react";
import BrandGrid from "./BrandGrid";

const meta = {
  title: "Sections/BrandGrid",
  component: BrandGrid,
} satisfies Meta<typeof BrandGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Minimal: Story = { args: {} };
export const Typical: Story = { args: {} };
export const Max: Story = { args: { brands: [
  { name: "Brand A", logo: "/vercel.svg" },
  { name: "Brand B", logo: "/next.svg" },
  { name: "Brand C", logo: "/window.svg" },
] } };


