import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { HeaderContent } from "@/components/ui/header-content";

const meta = {
  title: "ui/HeaderContent",
  component: HeaderContent,
  tags: ["autodocs"],
} satisfies Meta<typeof HeaderContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Title",
    description: "Description",
  },
};

export const WithoutDescription: Story = {
  args: {
    title: "Title",
  },
};
