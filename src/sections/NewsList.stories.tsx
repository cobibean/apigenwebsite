import type { Meta, StoryObj } from "@storybook/react";
import NewsList from "./NewsList";

const meta = {
  title: "Sections/NewsList",
  component: NewsList,
} satisfies Meta<typeof NewsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Minimal: Story = { args: {} };
export const Typical: Story = { args: {} };
export const Max: Story = { args: { items: [
  { title: "Launch update", date: "2025-09-01", href: "/news" },
  { title: "Quality milestone", date: "2025-08-15", href: "/news" },
] } };


