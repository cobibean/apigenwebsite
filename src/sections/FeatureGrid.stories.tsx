import type { Meta, StoryObj } from "@storybook/react";
import FeatureGrid from "./FeatureGrid";

const meta = {
  title: "Sections/FeatureGrid",
  component: FeatureGrid,
} satisfies Meta<typeof FeatureGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Minimal: Story = { args: {} };
export const Typical: Story = { args: { columns: 3 } };
export const Max: Story = { args: { columns: 2 } };


