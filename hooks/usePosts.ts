import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { showToast } from "@/components/ui/toast";
import { ApiError } from "@/lib/api/client";
import { deletePost, getPosts } from "@/lib/api/posts/services";

export const POSTS_PAGE_SIZE = 10;

/** Fetches a page of posts (1-indexed), keeping the previous page visible while loading. */
export function usePosts(page: number, pageSize = POSTS_PAGE_SIZE) {
  const skip = (page - 1) * pageSize;

  return useQuery({
    queryKey: ["posts", { skip, limit: pageSize }],
    queryFn: () => getPosts({ limit: pageSize, skip }),
    placeholderData: keepPreviousData,
  });
}

/** Deletes a post, then refetches the posts table from scratch. */
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      showToast({ title: "Article deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      showToast({
        type: "error",
        title: "Delete failed",
        description: error instanceof ApiError ? error.message : undefined,
      });
    },
  });
}
