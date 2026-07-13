import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Field } from "@/components/design-system/field";

const meta = {
  title: "design-system/Field",
  component: Field,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "boolean" },
    labelText: { control: "text" },
    required: { control: "boolean" },
    message: { control: "boolean" },
    messageText: { control: "text" },
    messageType: {
      control: "select",
      options: ["default", "error"],
    },
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: true,
    labelText: "Label",
    required: true,
    message: true,
    messageText: "error message",
  },
};

export const NoMessage: Story = {
  args: {
    ...Default.args,
    message: false,
  },
};

export const OptionalField: Story = {
  args: {
    ...Default.args,
    required: false,
  },
};

export const NoLabel: Story = {
  args: {
    ...Default.args,
    label: false,
  },
};

export const ErrorState: Story = {
  args: {
    ...Default.args,
    messageType: "error",
  },
};
