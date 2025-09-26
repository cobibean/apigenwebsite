import type { Meta, StoryObj } from "@storybook/react";
import DocList from "./DocList";

const meta = {
  title: "Sections/DocList",
  component: DocList,
} satisfies Meta<typeof DocList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Minimal: Story = { args: {} };
export const Typical: Story = { args: {} };
export const Max: Story = { args: { items: [
  { label: "COA template (PDF)", href: "/docs/coa.pdf" },
  { label: "Quality policy (PDF)", href: "/docs/quality.pdf" },
] } };


