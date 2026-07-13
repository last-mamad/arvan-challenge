import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SectionHeader } from "@/components/ui/section-header";

const meta = {
  title: "ui/SectionHeader",
  component: SectionHeader,
  tags: ["autodocs"],
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Title",
    description: "Description",
  },
};
