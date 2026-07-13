import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Checkbox } from "@/components/design-system/checkbox";

const meta = {
  title: "design-system/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "select",
      options: [true, false, "indeterminate"],
    },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLabel: Story = {
  args: {
    label: "text",
    checked: true,
  },
};

export const Unchecked: Story = {
  args: {
    ...WithLabel.args,
    checked: false,
  },
};

export const Indeterminate: Story = {
  args: {
    ...WithLabel.args,
    checked: "indeterminate",
  },
};

export const Disabled: Story = {
  args: {
    ...WithLabel.args,
    disabled: true,
  },
};

export const NoLabel: Story = {
  args: {
    checked: true,
  },
};
