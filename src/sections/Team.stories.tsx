import type { Meta, StoryObj } from "@storybook/react";
import Team from "./Team";

const meta: Meta<typeof Team> = {
  title: "Sections/Team",
  component: Team,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Meet Our Team",
    members: [
      {
        name: "Sunny",
        role: "Founder & CEO",
        imageUrl: "/images/team/sunny.jpg",
        bio: "Leading Apigen's vision for premium cannabis cultivation and global expansion."
      },
      {
        name: "Aman",
        role: "Co-Founder & COO",
        imageUrl: "/images/team/aman.jpg",
        bio: "Overseeing operations and ensuring quality standards across all processes."
      },
      {
        name: "Raj Patel",
        role: "Head of Operations",
        imageUrl: "/images/team/raj.jpg",
        bio: "Managing day-to-day operations and supply chain logistics."
      },
      {
        name: "Arjun Singh",
        role: "Quality Assurance Director",
        imageUrl: "/images/team/arjun.jpg",
        bio: "Ensuring pharmaceutical-grade quality and compliance standards."
      }
    ]
  },
};

export const Minimal: Story = {
  args: {
    title: "Our Team",
    members: [
      {
        name: "John Doe",
        role: "CEO",
        imageUrl: "/images/team/sunny.jpg"
      },
      {
        name: "Jane Smith",
        role: "CTO",
        imageUrl: "/images/team/aman.jpg"
      }
    ]
  },
};

export const SingleMember: Story = {
  args: {
    title: "Leadership",
    members: [
      {
        name: "Sunny",
        role: "Founder & CEO",
        imageUrl: "/images/team/sunny.jpg",
        bio: "Leading Apigen's vision for premium cannabis cultivation and global expansion."
      }
    ]
  },
};
