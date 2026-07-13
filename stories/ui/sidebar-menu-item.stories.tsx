import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SidebarMenuItem } from "@/components/ui/sidebar-menu-item";

const meta = {
  title: "ui/SidebarMenuItem",
  component: SidebarMenuItem,
  tags: ["autodocs"],
  args: {
    title: "Title",
  },
} satisfies Meta<typeof SidebarMenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    selected: true,
  },
};

export const WithDescription: Story = {
  args: {
    description: "description",
  },
};

export const SelectedWithDescription: Story = {
  args: {
    selected: true,
    description: "description",
  },
};
