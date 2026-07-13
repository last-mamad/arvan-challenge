import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

type MenuItemArg = {
  title: string;
  loadingTitle?: string;
  isLoading?: boolean;
};

type DropdownMenuStoryArgs = {
  triggerLabel: string;
  items: MenuItemArg[];
};

const meta = {
  title: "ui/DropdownMenu",
  tags: ["autodocs"],
  argTypes: {
    triggerLabel: { control: "text" },
    items: { control: "object" },
  },
  args: {
    triggerLabel: "Open menu",
    items: [{ title: "Menu Item" }, { title: "Menu Item" }],
  },
  render: ({ triggerLabel, items }) => (
    <DropdownMenu
      trigger={<Button variant="secondary">{triggerLabel}</Button>}
      items={items.map((item) => ({ ...item, onClick: () => {} }))}
    />
  ),
} satisfies Meta<DropdownMenuStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLoadingItem: Story = {
  args: {
    items: [
      { title: "Delete", loadingTitle: "Deleting...", isLoading: true },
      { title: "Menu Item" },
    ],
  },
};
