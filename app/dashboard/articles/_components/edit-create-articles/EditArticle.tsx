"use client";

import { Message } from "@/components/ui/message";
import { Spinner } from "@/components/ui/spinner";
import { usePost } from "@/hooks/usePosts";
import { ApiError } from "@/lib/api/client";
import { ArticleForm } from "./ArticleForm";

export function EditArticle({ id }: { id: number }) {
  const { data: post, isPending, isError, error } = usePost(id);

  if (isPending)
    return (
      <div className="flex items-center justify-center min-h-full">
        <Spinner className="size-8" />
      </div>
    );

  if (isError || !post) {
    return (
      <Message className="justify-center">
        {error instanceof ApiError ? error.message : "Failed to load article."}
      </Message>
    );
  }

  return <ArticleForm post={post} />;
}
