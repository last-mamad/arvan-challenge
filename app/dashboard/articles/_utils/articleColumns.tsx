import type { TableColumn } from "@/components/design-system/table";
import { getExcerpt } from "@/lib/utils";
import { ArticleRowActions } from "../_components/all-articles/ArticleRowActions";
import { Post } from "@/lib/api/posts/interfaces";

export function getArticleColumns(skip: number): TableColumn<Post>[] {
  return [
    {
      id: "index",
      header: "#",
      className: "w-12 text-center",
      cell: (_post, rowIndex) => (
        <span className="inline-flex size-8 items-center justify-center rounded-sm bg-neutral-bg2 text-caption1-strong text-neutral-fg1">
          {skip + rowIndex + 1}
        </span>
      ),
    },
    {
      id: "title",
      header: "Title",
      className: "max-w-[160px]",
      cell: (post) => (
        <span className="block truncate text-body1 text-neutral-fg1">{post.title}</span>
      ),
    },
    {
      id: "author",
      header: "Author",
      className: "max-w-[160px]",
      cell: (post) => <span className="block truncate">@user_{post.userId}</span>,
    },
    {
      id: "tags",
      header: "Tags",
      className: "max-w-[160px]",
      cell: (post) => <span className="block truncate">{post.tags.join(", ")}</span>,
    },
    {
      id: "excerpt",
      header: "Excerpt",
      cell: (post) => <span className="block truncate">{getExcerpt(post.body)}</span>,
    },
    {
      id: "reactions",
      header: "Created",
      className: "max-w-[120px]",
      cell: () => (
        <span className="block whitespace-nowrap">{new Date().toLocaleDateString("en-US")}</span>
      ),
    },
    {
      id: "actions",
      className: "w-16 text-right",
      cell: (post) => <ArticleRowActions post={post} as="menu" />,
    },
  ];
}
