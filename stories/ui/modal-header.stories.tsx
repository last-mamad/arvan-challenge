import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ModalHeader } from "@/components/ui/modal-header";

const meta = {
  title: "ui/ModalHeader",
  component: ModalHeader,
  tags: ["autodocs"],
  args: {
    title: "title",
  },
  decorators: [
    (Story) => (
      <div className="w-[456px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ModalHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    description: "description",
  },
};
