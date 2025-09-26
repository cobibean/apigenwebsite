import type { Meta, StoryObj } from "@storybook/react";
import Hero from "./Hero";

const meta = {
  title: "Sections/Hero",
  component: Hero,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Minimal: Story = { args: {} };
export const Typical: Story = { args: { eyebrow: "Apigen", title: "Premium quality", copy: "Ethical, compliant, patient-first." } };
export const Max: Story = { args: { imageUrl: "/vercel.svg", imageAlt: "" } };


