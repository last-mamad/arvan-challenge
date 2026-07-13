import { useQuery } from "@tanstack/react-query";

import { getPosts } from "@/lib/api/posts";

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
}
