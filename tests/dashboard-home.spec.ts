import { test, expect } from "@playwright/test";

test("loads the dashboard home page", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Blog Admin Dashboard" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Get started" })).toBeVisible();
});
