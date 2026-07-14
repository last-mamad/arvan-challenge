import { test as setup, expect } from "@playwright/test";
import path from "path";

// storageState captures cookies + localStorage — including the zustand
// `auth-storage` entry that holds the refreshToken the dashboard's session guard
// needs. It's regenerated on every run (this project is a dependency of the
// browser projects), so the tokens never go stale.
export const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup("authenticate", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("textbox", { name: "Username" }).fill("emilys");
  await page.getByRole("textbox", { name: "Password" }).fill("emilyspass");
  await page.getByRole("button", { name: "Sign in" }).click();

  // Wait until the guard settles and we land on the articles page.
  await page.waitForURL("**/dashboard/articles**");
  await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();

  await page.context().storageState({ path: authFile });
});
