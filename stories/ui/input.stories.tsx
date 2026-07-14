import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { userEvent, within } from "storybook/test";

import { Input } from "@/components/ui/input";

const meta = {
  title: "ui/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "sample text",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Hover: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByPlaceholderText("sample text"));
  },
};

export const Active: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByPlaceholderText("sample text"));
  },
};

export const Fill: Story = {
  args: {
    defaultValue: "sample text",
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: "sample text",
  },
};

export const Disable: Story = {
  args: {
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    "aria-invalid": true,
    defaultValue: "sample text",
  },
};
