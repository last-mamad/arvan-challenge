import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Section } from "@/components/ui/section";

const meta = {
  title: "ui/Section",
  component: Section,
  tags: ["autodocs"],
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fallback: Story = {
  args: {
    title: "Title",
    description: "Description",
  },
};

export const WithContent: Story = {
  args: {
    title: "Title",
    description: "Description",
    children: <p className="text-body2 text-neutral-fg1">Actual section content goes here.</p>,
  },
};
