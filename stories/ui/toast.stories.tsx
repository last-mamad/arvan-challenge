import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { Toast, showToast } from "@/components/ui/toast";

const meta = {
  title: "ui/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["success", "error"],
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    type: "success",
    title: "Title",
    description: "Description",
  },
};

export const Error: Story = {
  args: {
    type: "error",
    title: "Title",
    description: "Description",
  },
};

export const Trigger: Story = {
  args: {
    type: "success",
    title: "Title",
    description: "Description",
  },
  render: ({ type, title, description }) => (
    <>
      <Button onClick={() => showToast({ type: type ?? "success", title, description })}>
        Show toast
      </Button>
      <Toaster />
    </>
  ),
};
