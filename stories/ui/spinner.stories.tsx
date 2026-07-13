import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

const meta = {
  title: "ui/Spinner",
  component: Spinner,
  tags: ["autodocs"],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const OnButtonLoading: Story = {
  render: () => (
    <Button loading />
  ),
};
