import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { EllipsisIcon } from "@/components/icons";
import { ActionSheet } from "@/components/design-system/action-sheet";
import { DataCards } from "@/components/design-system/data-cards";
import { type TableColumn } from "@/components/design-system/table";
import { Button } from "@/components/ui/button";

type Article = {
  id: string;
  title: string;
  author: string;
  tags: string[];
  excerpt: string;
};

const articles: Article[] = Array.from({ length: 3 }, (_, i) => ({
  id: `article-${i + 1}`,
  title: `Article title ${i + 1}`,
  author: "author_username",
  tags: ["design", "systems"],
  excerpt: "First 20 words of the article body, shown as a preview inside the card.",
}));

const columns: TableColumn<Article>[] = [
  {
    id: "title",
    header: "Title",
    cell: (row) => <span className="block text-body1 text-neutral-fg1">{row.title}</span>,
  },
  { id: "author", header: "Author", cell: (row) => <span>@{row.author}</span> },
  { id: "tags", header: "Tags", cell: (row) => <span>{row.tags.join(", ")}</span> },
  { id: "excerpt", header: "Excerpt", cell: (row) => <span className="truncate">{row.excerpt}</span> },
  {
    id: "actions",
    cell: () => null,
  },
];

const meta = {
  title: "design-system/DataCards",
  tags: ["autodocs"],
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DataCards
      columns={columns}
      data={articles}
      getRowKey={(row) => row.id}
      titleColumnId="title"
      hiddenColumnIds={["actions"]}
      action={(row) => (
        <ActionSheet
          title={row.title}
          trigger={
            <Button variant="secondary" size="icon" aria-label="Row actions">
              <EllipsisIcon className="size-5" />
            </Button>
          }
          items={[
            { title: "Edit", onClick: () => {} },
            { title: "Delete", onClick: () => {} },
          ]}
        />
      )}
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <DataCards
      columns={columns}
      data={[]}
      getRowKey={(row) => row.id}
      emptyState="No posts yet."
    />
  ),
};
