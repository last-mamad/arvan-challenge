import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ModalContent } from "@/components/ui/modal-content";

const meta = {
  title: "ui/ModalContent",
  component: ModalContent,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[456px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ModalContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PlaceholderFallback: Story = {};

export const WithChildren: Story = {
  args: {
    children: <p className="w-full text-body2 text-neutral-fg1">Actual modal content goes here.</p>,
  },
};
