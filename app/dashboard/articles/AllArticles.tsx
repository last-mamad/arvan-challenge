"use client";

import { useMemo, useState } from "react";

import { Pagination } from "@/components/design-system/pagination";
import { Message } from "@/components/ui/message";
import { Spinner } from "@/components/ui/spinner";
import { ApiError } from "@/lib/api/client";
import { POSTS_PAGE_SIZE, usePosts } from "@/hooks/usePosts";
import { ArticlesTable } from "./_components/ArticlesTable";
import { getArticleColumns } from "./_components/articleColumns";

export default function AllArticles() {
  const [page, setPage] = useState(1);
  const { data, isPending, isError, error, isFetching } = usePosts(page);

  const skip = (page - 1) * POSTS_PAGE_SIZE;

  const columns = useMemo(() => getArticleColumns(skip), [skip]);

  if (isPending) return <Spinner className="size-8" />;
  if (isError)
    return (
      <Message className="flex justify-center">
        {error instanceof ApiError ? error.message : "Failed to load posts."}
      </Message>
    );

  return (
    <div className="flex w-full flex-col items-end gap-6">
      <div className="relative w-full">
        <ArticlesTable columns={columns} posts={data.posts} />
        {isFetching && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-bg1/60">
            <Spinner className="size-8" />
          </div>
        )}
      </div>
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(data.total / POSTS_PAGE_SIZE)}
        onPageChange={setPage}
        disabled={isFetching}
      />
    </div>
  );
}
