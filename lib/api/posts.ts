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

interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export function getPosts() {
  return apiClient.get<PostsResponse>("/posts");
}
