import { apiClient } from "@/lib/api/client";
import { ArticleInput, DeletedPost, GetPostsParams, Post, PostsResponse } from "./interfaces";

export function getPosts({ limit = 10, skip = 0 }: GetPostsParams = {}) {
    const query = new URLSearchParams({ limit: String(limit), skip: String(skip) });
    return apiClient.get<PostsResponse>(`/posts?${query.toString()}`);
}

export function getPost(id: number) {
    return apiClient.get<Post>(`/posts/${id}`);
}

export function getTagList() {
    return apiClient.get<string[]>("/posts/tag-list");
}

export function createPost(data: ArticleInput) {
    return apiClient.post<Post>("/posts/add", data);
}

export function updatePost(id: number, data: ArticleInput) {
    return apiClient.put<Post>(`/posts/${id}`, data);
}

export function deletePost(id: number) {
    return apiClient.delete<DeletedPost>(`/posts/${id}`);
}
