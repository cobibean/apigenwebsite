import type { Meta, StoryObj } from "@storybook/react";
import Stats from "./Stats";

const meta = {
  title: "Sections/Stats",
  component: Stats,
} satisfies Meta<typeof Stats>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Minimal: Story = { args: {} };
export const Typical: Story = { args: {} };
export const Max: Story = { args: { items: [
  { label: "SKUs", value: "24" },
  { label: "Markets", value: "6" },
  { label: "COAs", value: "100%" },
] } };


