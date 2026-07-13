import { EllipsisIcon } from "@/components/icons";
import { ActionSheet } from "@/components/design-system/action-sheet";
import { DataCards } from "@/components/design-system/data-cards";
import { DataTable, type TableColumn } from "@/components/design-system/table";
import { Button } from "@/components/ui/button";
import type { Post } from "@/lib/api/posts";
import { getArticleActionItems } from "./articleColumns";

type ArticlesTableProps = {
  columns: TableColumn<Post>[];
  posts: Post[];
};

export function ArticlesTable({ columns, posts }: ArticlesTableProps) {
  return (
    <>
      <div className="hidden md:block">
        <DataTable columns={columns} data={posts} getRowKey={(post) => post.id} />
      </div>
      <div className="md:hidden">
        <DataCards
          columns={columns}
          data={posts}
          getRowKey={(post) => post.id}
          titleColumnId="title"
          hiddenColumnIds={["index", "actions"]}
          action={(post) => (
            <ActionSheet
              title={post.title}
              trigger={
                <Button variant="secondary" size="icon" aria-label={`Actions for ${post.title}`}>
                  <EllipsisIcon className="size-5" />
                </Button>
              }
              items={getArticleActionItems(post)}
            />
          )}
        />
      </div>
    </>
  );
}
