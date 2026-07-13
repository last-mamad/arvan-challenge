import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Modal } from "@/components/design-system/modal";
import { ConfirmationContent } from "@/components/ui/confirmation-content";

const meta = {
  title: "design-system/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
  },
  args: {
    isOpen: true,
    title: "title",
    description: "description",
    cancelButtonAction: () => {},
    confirmButtonAction: () => {},
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyBodyFallback: Story = {};

export const ConfirmationSuccess: Story = {
  args: {
    children: <ConfirmationContent message="dialogue message" type="success" />,
  },
};

export const ConfirmationDanger: Story = {
  args: {
    children: <ConfirmationContent message="dialogue message" type="error" />,
    danger: true,
    confirmButtonText: "Delete",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
    children: <ConfirmationContent message="dialogue message" type="success" />,
  },
};

export const Large: Story = {
  args: {
    size: "large",
    children: <ConfirmationContent message="dialogue message" type="success" />,
  },
};

export const CustomFooter: Story = {
  args: {
    children: <ConfirmationContent message="dialogue message" type="success" />,
    footer: (
      <div className="flex w-full justify-end border-t border-neutral-st3 bg-neutral-bg1 px-6 py-4 text-caption1 text-neutral-fg2">
        Fully custom footer content
      </div>
    ),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
  },
};
