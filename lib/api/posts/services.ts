import { apiClient } from "@/lib/api/client";
import { DeletedPost, GetPostsParams, PostsResponse } from "./interfaces";

export function getPosts({ limit = 10, skip = 0 }: GetPostsParams = {}) {
    const query = new URLSearchParams({ limit: String(limit), skip: String(skip) });
    return apiClient.get<PostsResponse>(`/posts?${query.toString()}`);
}

export function deletePost(id: number) {
    return apiClient.delete<DeletedPost>(`/posts/${id}`);
}
