import { DataCards } from "@/components/design-system/data-cards";
import { DataTable, type TableColumn } from "@/components/design-system/table";
import { ArticleRowActions } from "./ArticleRowActions";
import { Post } from "@/lib/api/posts/interfaces";

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
          action={(post) => <ArticleRowActions post={post} as="sheet" />}
        />
      </div>
    </>
  );
}
