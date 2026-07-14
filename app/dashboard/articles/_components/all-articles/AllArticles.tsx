"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { Pagination } from "@/components/design-system/pagination";
import { Message } from "@/components/ui/message";
import { Spinner } from "@/components/ui/spinner";
import { ApiError } from "@/lib/api/client";
import { POSTS_PAGE_SIZE, usePosts } from "@/app/dashboard/articles/_hooks/usePosts";
import { ArticlesTable } from "./ArticlesTable";
import { getArticleColumns } from "../../_utils/articleColumns";
import { ARTICLES_PATH } from "@/lib/constants/constants";

export default function AllArticles({ page }: { page: number }) {
  const router = useRouter();
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
        onPageChange={(nextPage) =>
          router.push(nextPage <= 1 ? ARTICLES_PATH : `${ARTICLES_PATH}?page=${nextPage}`)
        }
        disabled={isFetching}
      />
    </div>
  );
}
