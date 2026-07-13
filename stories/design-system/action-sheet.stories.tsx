import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { EllipsisIcon } from "@/components/icons";
import { ActionSheet } from "@/components/design-system/action-sheet";
import { Button } from "@/components/ui/button";

const meta = {
  title: "design-system/ActionSheet",
  component: ActionSheet,
  tags: ["autodocs"],
} satisfies Meta<typeof ActionSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Article actions",
    trigger: (
      <Button variant="secondary" size="icon" aria-label="Row actions">
        <EllipsisIcon className="size-5" />
      </Button>
    ),
    items: [
      { title: "Edit", onClick: () => {} },
      { title: "Delete", onClick: () => {} },
    ],
  },
};

export const WithLoadingItem: Story = {
  args: {
    ...Default.args,
    items: [
      { title: "Edit", onClick: () => {} },
      { title: "Delete", loadingTitle: "Deleting...", isLoading: true, onClick: () => {} },
    ],
  },
};
