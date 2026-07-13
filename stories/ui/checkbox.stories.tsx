import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Checkbox } from "@/components/ui/checkbox";

const meta = {
  title: "ui/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "select",
      options: [true, false, "indeterminate"],
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const On: Story = {
  args: {
    checked: true,
  },
};

export const Off: Story = {
  args: {
    checked: false,
  },
};

export const Indeterminate: Story = {
  args: {
    checked: "indeterminate",
  },
};

export const OnDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};

export const OffDisabled: Story = {
  args: {
    checked: false,
    disabled: true,
  },
};

export const IndeterminateDisabled: Story = {
  args: {
    checked: "indeterminate",
    disabled: true,
  },
};
