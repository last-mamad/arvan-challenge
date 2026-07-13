import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Placeholder } from "@/components/ui/placeholder";

const meta = {
  title: "ui/Placeholder",
  component: Placeholder,
  tags: ["autodocs"],
} satisfies Meta<typeof Placeholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomLabel: Story = {
  args: {
    children: "No results found",
  },
};
