import type { Page } from "@playwright/test";
import type { Post } from "@/lib/api/posts/interfaces";
import { makePosts } from "../fixtures/posts";

type MockListOptions = {
  /** The full pool the endpoint paginates over. Defaults to 25 generated posts. */
  posts?: Post[];
  /** `total` reported to the client (drives page count). Defaults to posts.length. */
  total?: number;
  /** Delay the response, to exercise the loading spinner. */
  delayMs?: number;
  /** Return this HTTP error instead of data, to exercise the error state. */
  errorStatus?: number;
};

/**
 * Intercepts the paginated posts list (`GET /posts?limit&skip`) and serves
 * deterministic data, honouring the skip/limit query so pagination works.
 * Only touches the list endpoint — auth and other calls pass through.
 */
export async function mockPostsList(page: Page, options: MockListOptions = {}) {
  const { posts = makePosts(25), total = posts.length, delayMs, errorStatus } = options;

  await page.route(/\/posts\?/, async (route) => {
    if (route.request().method() !== "GET") return route.fallback();
    if (delayMs) await new Promise((resolve) => setTimeout(resolve, delayMs));
    if (errorStatus) {
      return route.fulfill({ status: errorStatus, json: { message: "Server error" } });
    }

    const url = new URL(route.request().url());
    const skip = Number(url.searchParams.get("skip") ?? 0);
    const limit = Number(url.searchParams.get("limit") ?? 10);
    await route.fulfill({
      json: { posts: posts.slice(skip, skip + limit), total, skip, limit },
    });
  });
}

/** Intercepts `GET /posts/tag-list` (used by the tags box) with a fixed set of tags. */
export async function mockTagList(page: Page, tags: string[]) {
  await page.route(/\/posts\/tag-list/, async (route) => {
    if (route.request().method() !== "GET") return route.fallback();
    await route.fulfill({ json: tags });
  });
}

/** Intercepts `GET /posts/:id` (used by the edit page) with a single fixture post. */
export async function mockGetPost(page: Page, post: Post) {
  await page.route(new RegExp(`/posts/${post.id}$`), async (route) => {
    if (route.request().method() !== "GET") return route.fallback();
    await route.fulfill({ json: post });
  });
}

/** Intercepts `DELETE /posts/:id` so the delete flow can run without hitting the API. */
export async function mockDeletePost(page: Page) {
  await page.route(/\/posts\/\d+$/, async (route) => {
    if (route.request().method() !== "DELETE") return route.fallback();
    const id = Number(route.request().url().split("/").pop());
    await route.fulfill({
      json: { id, isDeleted: true, deletedOn: new Date().toISOString() },
    });
  });
}
