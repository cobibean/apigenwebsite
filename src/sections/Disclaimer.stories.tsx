import type { Meta, StoryObj } from "@storybook/react";
import Disclaimer from "./Disclaimer";

const meta = {
  title: "Sections/Disclaimer",
  component: Disclaimer,
} satisfies Meta<typeof Disclaimer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Minimal: Story = { args: {} };
export const Typical: Story = { args: {} };
export const Max: Story = { args: { text: "For medical professionals only." } };


