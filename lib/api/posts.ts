import { apiClient } from "@/lib/api/client";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export interface GetPostsParams {
  limit?: number;
  skip?: number;
}

export function getPosts({ limit = 10, skip = 0 }: GetPostsParams = {}) {
  const query = new URLSearchParams({ limit: String(limit), skip: String(skip) });
  return apiClient.get<PostsResponse>(`/posts?${query.toString()}`);
}
