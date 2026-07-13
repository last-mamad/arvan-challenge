import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Message } from "@/components/ui/message";

const meta = {
  title: "ui/Message",
  component: Message,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["default", "error"],
    },
  },
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "default",
    children: "error message",
  },
};

export const Error: Story = {
  args: {
    type: "error",
    children: "error message",
  },
};
