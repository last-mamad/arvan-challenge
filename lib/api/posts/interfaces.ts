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

export interface DeletedPost extends Post {
    isDeleted: boolean;
    deletedOn: string;
}
