import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ModalFooter } from "@/components/ui/modal-footer";

const meta = {
  title: "ui/ModalFooter",
  component: ModalFooter,
  tags: ["autodocs"],
  args: {
    onCancel: () => {},
    onConfirm: () => {},
  },
  decorators: [
    (Story) => (
      <div className="w-[456px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ModalFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Danger: Story = {
  args: {
    danger: true,
    confirmButtonText: "Delete",
  },
};
