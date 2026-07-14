import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { showToast } from "@/components/ui/toast";
import { ApiError } from "@/lib/api/client";
import type { ArticleInput } from "@/lib/api/posts/interfaces";
import { useAuthStore } from "@/lib/store/auth-store";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  getTagList,
  updatePost,
} from "@/lib/api/posts/services";

export const POSTS_PAGE_SIZE = 10;

function errorDescription(error: unknown) {
  return error instanceof ApiError ? error.message : undefined;
}

/** Fetches a page of posts (1-indexed), keeping the previous page visible while loading. */
export function usePosts(page: number, pageSize = POSTS_PAGE_SIZE) {
  const skip = (page - 1) * pageSize;

  return useQuery({
    queryKey: ["posts", { skip, limit: pageSize }],
    queryFn: () => getPosts({ limit: pageSize, skip }),
    placeholderData: keepPreviousData,
  });
}

/** Fetches a single post by id (for the edit form). */
export function usePost(id: number) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    enabled: Number.isFinite(id),
  });
}

/** Fetches the tag list. It's effectively static, so cache it indefinitely. */
export function useTagList() {
  return useQuery({
    queryKey: ["post-tags"],
    queryFn: getTagList,
    staleTime: Infinity,
  });
}

/** Creates a post, then invalidates the posts table. */
export function useCreatePost() {
  const queryClient = useQueryClient();
  // The add-post endpoint requires the author's id; take it from the session
  // rather than the form, since it isn't user-editable.
  const userId = useAuthStore((state) => state.user?.id);

  return useMutation({
    mutationFn: (data: ArticleInput) => createPost({ ...data, userId }),
    onSuccess: () => {
      showToast({ title: "Article created successfully" });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      showToast({ type: "error", title: "Create failed", description: errorDescription(error) });
    },
  });
}

/** Updates a post, then invalidates the posts table and that post. */
export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ArticleInput }) => updatePost(id, data),
    onSuccess: (_result, { id }) => {
      showToast({ title: "Article updated successfully" });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", id] });
    },
    onError: (error) => {
      showToast({ type: "error", title: "Update failed", description: errorDescription(error) });
    },
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
      showToast({ type: "error", title: "Delete failed", description: errorDescription(error) });
    },
  });
}
