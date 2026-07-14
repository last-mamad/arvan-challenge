import type { Post } from "@/lib/api/posts/interfaces";

/** A single deterministic post. Override any field per test. */
export function makePost(id: number, overrides: Partial<Post> = {}): Post {
  return {
    id,
    title: `Test article ${id}`,
    body: `Body content for test article ${id}. Lorem ipsum dolor sit amet, consectetur.`,
    userId: 100 + id,
    tags: ["history", "american"],
    reactions: { likes: id, dislikes: 0 },
    ...overrides,
  };
}

/** `count` deterministic posts with ids 1..count. */
export function makePosts(count: number): Post[] {
  return Array.from({ length: count }, (_, i) => makePost(i + 1));
}
