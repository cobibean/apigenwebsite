import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";

const meta = {
  title: "Sections/Header",
  component: Header,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Brands", href: "/brands" },
  { label: "Contact", href: "/contact" },
];

export const Minimal: Story = { args: { links } };

export const Typical: Story = {
  args: { links, logoText: "APIGEN", cta: { label: "Get in touch", href: "/contact" }, activeHref: "/", showLogoImage: true, glassOpacity: 0.55 },
};

export const Max: Story = {
  args: {
    links,
    logoText: "APIGEN",
    logoImageSrc: "/hero/transparentlogo.png",
    showLogoImage: true,
    glassOpacity: 0.6,
    glassDistort: true,
    cta: { label: "Get in touch", href: "/contact" },
    activeHref: "/brands",
  },
};


