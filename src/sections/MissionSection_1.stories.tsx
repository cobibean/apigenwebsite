import type { Meta, StoryObj } from "@storybook/react";
import MissionSection_1 from "@/sections/MissionSection_1";

const meta: Meta<typeof MissionSection_1> = {
  title: "Sections/MissionSection_1",
  component: MissionSection_1,
};
export default meta;

type Story = StoryObj<typeof MissionSection_1>;

export const Minimal: Story = { args: {} };

export const Typical: Story = {
  args: {
    eyebrow: "Our Mission",
    taglinePrimary: "TO SET A NEW INDUSTRY\nSTANDARD WITH",
    taglineSecondary: "PREMIUM MEDICINAL\nCANNABIS FLOWER",
    lead: "We're not just providing exceptional medication. We're pioneers of quality, transparency, and patient‑centric treatments.",
    body: "Uncompromising pharmaceutical‑grade quality is not just a goal for us — it's embedded in our DNA and the standards we set for ourselves and for the industry.",
    cta: { label: "About Apigen", href: "/about" },
  },
};


