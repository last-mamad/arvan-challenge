import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getPosts } from "@/lib/api/posts";

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
