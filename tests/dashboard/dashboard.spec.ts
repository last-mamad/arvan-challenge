import { test, expect } from '@playwright/test';
import { SIDEBAR_ITEMS } from '@/lib/constants/constants';
import { mockDeletePost, mockGetPost, mockPostsList, mockTagList } from "../helpers/mock-posts";
import { makePosts } from "../fixtures/posts";

test.use({ storageState: "playwright/.auth/user.json" });
test.afterEach(async ({ page }) => {
  await page.unrouteAll({ behavior: 'ignoreErrors' });
});

test('Loads Layout', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard/articles');

  const isMobile = test.info().project.use.isMobile ?? false;

  if (isMobile) {
    // On mobile the "Welcome" greeting is hidden, Log out is an icon button, and
    // the nav lives behind the "Open menu" hamburger.
    await expect(page.getByRole('banner')).toMatchAriaSnapshot(`
    - banner:
      - button "Open menu":
        - img
      - paragraph: Arvancloud Challenge
      - button "Log out":
        - img
    `);
    // Nav is hidden until the drawer is opened.
    await page.getByRole('button', { name: 'Open menu' }).click();
  } else {
    await expect(page.getByRole('banner')).toMatchAriaSnapshot(`
    - banner:
      - text: Welcome Emily
      - paragraph: Arvancloud Challenge
      - button "Log out"
    `);
  }

  // Sidebar items come from SIDEBAR_ITEMS (the source of truth), so the test
  // tracks changes to the nav automatically.
  const nav = page.getByRole('navigation');
  for (const item of SIDEBAR_ITEMS) {
    await expect(nav.getByRole('button', { name: item.title })).toBeVisible();
  }
});

test('Check Table Rendering (Loading, Data and Pagination)', async ({ page }) => {
  // Column headers / cells only exist in the desktop table; mobile renders cards.
  test.skip(test.info().project.use.isMobile ?? false, 'Desktop table layout; mobile uses cards.');
  await mockPostsList(page, { posts: makePosts(25), total: 25 });
  await page.goto('http://localhost:3000/dashboard/articles');
  await expect(page.locator('div').filter({ hasText: 'Loading...' })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: '#' })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: 'Title' })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: 'Author' })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: 'Tags' })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: 'Excerpt' })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: 'Created' })).toBeVisible();
  await expect(page.getByRole('columnheader').filter({ hasText: /^$/ })).toBeVisible();
  await expect(page.getByRole('cell', { name: '1', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Test article 1', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '@user_101' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'history, american' }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Body content for test article 1. Lorem ipsum dolor sit amet, consectetur.' })).toBeVisible();

  // The "Created" column renders new Date() (a stub — the API has no date), so derive today's value the same way instead of hardcoding it, otherwise it goes stale daily.
  const today = new Date().toLocaleDateString('en-US');
  await expect(page.getByRole('cell', { name: today }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Actions for Test article 1', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Go to next page' }).click();
  await expect(page.getByRole('cell', { name: 'Test article 11', exact: true }).locator('span')).toBeVisible();
  await page.getByRole('button', { name: '1', exact: true }).click();
  await expect(page.getByRole('cell', { name: 'Test article 1', exact: true }).locator('span')).toBeVisible();
});

test('Check Cards Rendering (Mobile)', async ({ page }) => {
  // Mobile renders each row as a card (DataCards) instead of the desktop table.
  test.skip(!(test.info().project.use.isMobile ?? false), 'Mobile card layout only.');
  await mockPostsList(page, { posts: makePosts(25), total: 25 });
  await page.goto('http://localhost:3000/dashboard/articles');
  const cards = page.getByRole('list').filter({
    has: page.getByRole('button', { name: /^Actions for/ }),
  });

  await expect(cards.getByText('Test article 1', { exact: true })).toBeVisible();
  await expect(cards.getByText('@user_101', { exact: true })).toBeVisible();
  await expect(cards.getByText('history, american', { exact: true }).first()).toBeVisible();
  await expect(cards.getByText('Author', { exact: true }).first()).toBeVisible();
  await expect(cards.getByText('Tags', { exact: true }).first()).toBeVisible();
  await expect(cards.getByText('Excerpt', { exact: true }).first()).toBeVisible();
  await expect(cards.getByRole('button', { name: 'Actions for Test article 1', exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Go to next page' }).click();
  await expect(cards.getByText('Test article 11', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: '1', exact: true }).click();
  await expect(cards.getByText('Test article 1', { exact: true })).toBeVisible();
});

test('Check URL Pagination', async ({ page }) => {
  await mockPostsList(page, { posts: makePosts(25), total: 25 });
  await page.goto('http://localhost:3000/dashboard/articles?page=2');
  await expect(page.getByRole('button', { name: '2', exact: true })).toBeVisible();
});

test('Delete Article', async ({ page }) => {
  await mockPostsList(page, { posts: makePosts(25), total: 25 });
  await mockDeletePost(page);
  await page.goto('http://localhost:3000/dashboard/articles');

  // Row actions are a dropdown (menuitem) on desktop, a bottom sheet (button) on mobile.
  const isMobile = test.info().project.use.isMobile ?? false;
  const itemRole = isMobile ? 'button' : 'menuitem';

  await page.getByRole('button', { name: 'Actions for Test article 1', exact: true }).click();
  await page.getByRole(itemRole, { name: 'Delete' }).click();

  const modal = page.locator('[data-slot="modal"]');
  await expect(modal.getByText('Delete article')).toBeVisible();
  await expect(modal.getByText('Are you sure you want to delete this article?')).toBeVisible();
  await expect(modal.getByRole('button', { name: 'Delete' })).toBeVisible();
  await expect(modal.getByRole('button', { name: 'Cancel' })).toBeVisible();
  await modal.getByRole('button', { name: 'Delete' }).click();
  await expect(page.locator('div').filter({ hasText: 'Article deleted successfully' }).nth(2)).toBeVisible();
});

test('Check Edit Article Layout', async ({ page }) => {
  const post = makePosts(1)[0];
  await mockPostsList(page, { posts: [post], total: 1 });
  await mockGetPost(page, post);
  // Mocked so the tags box is deterministic; includes the post's tags (history, american).
  await mockTagList(page, ['american', 'ancient', 'english', 'history', 'love', 'mystery']);
  await page.goto('http://localhost:3000/dashboard/articles');

  // Row actions are a dropdown (menuitem) on desktop, a bottom sheet (button) on mobile.
  const isMobile = test.info().project.use.isMobile ?? false;
  const itemRole = isMobile ? 'button' : 'menuitem';

  await page.getByRole('button', { name: 'Actions for Test article 1', exact: true }).click();
  await page.getByRole(itemRole, { name: 'Edit' }).click();
  await expect(page.locator('form')).toMatchAriaSnapshot(`
      - paragraph: Edit article
      - text: Title
      - textbox "Title":
        - /placeholder: Current title
        - text: Test article 1
      - text: Description
      - textbox "Description":
        - /placeholder: Current description
      - text: Body
      - textbox "Body":
        - /placeholder: Current body
        - text: Body content for test article 1. Lorem ipsum dolor sit amet, consectetur.
      - button "Submit"
      - text: Tags
      - textbox "Tags":
        - /placeholder: New tag
      - checkbox "american" [checked]
      - text: american
      - checkbox "ancient"
      - text: ancient
      - checkbox "english"
      - text: english
      - checkbox "history" [checked]
      - text: history
      - checkbox "love"
      - text: love
      - checkbox "mystery"
      - text: mystery
    `);
});

test('Edit Article - Submit', async ({ page }) => {
  const post = makePosts(1)[0];
  await mockPostsList(page, { posts: [post], total: 1 });
  await mockGetPost(page, post);
  // Mocked so the tags box is deterministic; includes the post's tags (history, american).
  await mockTagList(page, ['american', 'ancient', 'english', 'history', 'love', 'mystery']);
  await page.goto('http://localhost:3000/dashboard/articles/1');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('div').filter({ hasText: 'Article updated successfully' }).nth(2)).toBeVisible();
});

test('Edit Article - Check Fields Errors', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard/articles/1');
  await page.getByRole('textbox', { name: 'Title' }).click();
  await page.getByRole('textbox', { name: 'Title' }).fill('');
  await page.getByRole('textbox', { name: 'Title' }).blur();
  await expect(page.locator('form')).toMatchAriaSnapshot(`
    - text: Title
    - textbox "Title" [invalid]:
      - /placeholder: Current title
    - paragraph: Required field
    `);
  await page.getByRole('textbox', { name: 'Body' }).click();
  await page.getByRole('textbox', { name: 'Body' }).fill('');
  await page.getByRole('textbox', { name: 'Body' }).blur();
  await expect(page.locator('form')).toMatchAriaSnapshot(`
    - text: Body
    - textbox "Body" [invalid]:
      - /placeholder: Current body
    - paragraph: Required field
    `);
});

test('Create Article - Fill Form', async ({ page }) => {
  // Mocked so the tags box is deterministic; includes the post's tags (history, american).
  await mockTagList(page, ['american', 'ancient', 'english', 'history', 'love', 'mystery']);
  await page.goto('http://localhost:3000/dashboard/articles/create');
  await expect(page.locator('form')).toMatchAriaSnapshot(`
    - text: Title
    - textbox "Title":
      - /placeholder: Current title
    `);
  await expect(page.locator('form')).toMatchAriaSnapshot(`
    - text: Description
    - textbox "Description":
      - /placeholder: Current description
    `);
  await expect(page.locator('form')).toMatchAriaSnapshot(`
    - text: Body
    - textbox "Body":
      - /placeholder: Current body
    `);
  await expect(page.locator('form')).toMatchAriaSnapshot(`
    - text: Tags
    - textbox "Tags":
      - /placeholder: New tag
    - checkbox "american"
    - text: american
    - checkbox "ancient"
    - text: ancient
    - checkbox "english"
    - text: english
    - checkbox "history"
    - text: history
    - checkbox "love"
    - text: love
    - checkbox "mystery"
    - text: mystery
    `);
  await page.getByRole('textbox', { name: 'Title' }).click();
  await page.getByRole('textbox', { name: 'Title' }).fill('Title');
  await page.getByRole('textbox', { name: 'Description' }).click();
  await page.getByRole('textbox', { name: 'Description' }).fill('Description');
  await page.getByRole('textbox', { name: 'Body' }).click();
  await page.getByRole('textbox', { name: 'Body' }).fill('Post body');
  await page.getByRole('checkbox', { name: 'american' }).click();
  await page.getByRole('textbox', { name: 'Tags' }).click();
  await page.getByRole('textbox', { name: 'Tags' }).fill('custom tag');
  await page.getByRole('textbox', { name: 'Tags' }).press('Enter');
  await expect(page.locator('div').filter({ hasText: /^custom tag$/ })).toBeVisible();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('div').filter({ hasText: 'Article created successfully' }).nth(2)).toBeVisible();
});

test('Log out Behaviour', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard/articles');
  await page.getByRole('button', { name: 'Log out' }).click();
  await page.waitForURL('**/login');
  await expect(page.locator('div').filter({ hasText: 'Sign in' }).nth(5)).toBeVisible();
});
