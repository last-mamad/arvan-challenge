import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { EllipsisIcon } from "@/components/icons";
import { DataTable, type TableColumn } from "@/components/design-system/table";
import { Pagination } from "@/components/design-system/pagination";
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Section } from "@/components/ui/section";

type Article = {
  id: string;
  title: string;
  author: string;
  tags: string[];
  excerpt: string;
  createdAt: string;
};

const articles: Article[] = Array.from({ length: 5 }, (_, i) => ({
  id: `article-${i + 1}`,
  title: "Article title",
  author: "author_username",
  tags: ["design", "systems"],
  excerpt: "First 20 words of article body that give the reader a quick preview of the post.",
  createdAt: "2026-03-14",
}));

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Column definitions live next to the data, and each `cell` decides how to
 * render itself — a badge, styled text, a joined list, or an action menu.
 */
const columns: TableColumn<Article>[] = [
  {
    id: "index",
    header: "#",
    className: "w-12 text-center",
    cell: (_row, rowIndex) => (
      <span className="inline-flex w-8 h-8 items-center justify-center rounded-sm bg-neutral-bg2 text-caption1-strong text-neutral-fg1">
        {rowIndex + 1}
      </span>
    ),
  },
  {
    id: "title",
    header: "Title",
    className: "max-w-[120px]",
    cell: (row) => <span className="block truncate text-body1 text-neutral-fg1">{row.title}</span>,
  },
  {
    id: "author",
    header: "Author",
    className: "max-w-48",
    cell: (row) => <span className="block truncate">@{row.author}</span>,
  },
  {
    id: "tags",
    header: "Tags",
    className: "max-w-28",
    cell: (row) => <span className="block truncate">{row.tags.join(", ")}</span>,
  },
  {
    id: "excerpt",
    header: "Excerpt",
    cell: (row) => <span className="block truncate">{row.excerpt}</span>,
  },
  {
    id: "created",
    header: "Created",
    className: "max-w-[120px]",
    cell: (row) => <span className="block truncate">{formatDate(row.createdAt)}</span>,
  },
  {
    id: "actions",
    className: "w-16 text-right",
    cell: () => (
      <DropdownMenu
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
    ),
  },
];

const meta = {
  title: "design-system/Table",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** The bare data table driven entirely by column definitions. */
export const Default: Story = {
  render: () => <DataTable columns={columns} data={articles} getRowKey={(row) => row.id} />,
};

/** The empty state, shown when there are no rows. */
export const Empty: Story = {
  render: () => (
    <DataTable columns={columns} data={[]} getRowKey={(row) => row.id} emptyState="No posts yet." />
  ),
};

/** The full "All Posts" screen: section chrome, dynamic table, and pagination. */
export const AllPosts: Story = {
  render: () => {
    function Screen() {
      const [page, setPage] = useState(5);
      return (
        <Section title="All Posts">
          <div className="flex w-full items-end flex-col gap-6">
            <DataTable columns={columns} data={articles} getRowKey={(row) => row.id} />
            <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
          </div>
        </Section>
      );
    }
    return <Screen />;
  },
};
