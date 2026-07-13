import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ConfirmationContent } from "@/components/ui/confirmation-content";

const meta = {
  title: "ui/ConfirmationContent",
  component: ConfirmationContent,
  tags: ["autodocs"],
  args: {
    message: "dialogue message",
  },
  decorators: [
    (Story) => (
      <div className="w-[408px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ConfirmationContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    type: "success",
  },
};

export const Error: Story = {
  args: {
    type: "error",
  },
};

export const WithoutIcon: Story = {
  args: {
    type: "success",
    icon: false,
  },
};
