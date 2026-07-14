# Testing

The project tests in layers, each catching a different class of bug. Aim for the
right layer, not maximum coverage.

| Layer     | Tool                     | What it catches                     | Where                   |
| --------- | ------------------------ | ----------------------------------- | ----------------------- |
| Unit      | Vitest                   | Pure logic (utils, hook logic)      | `*.test.ts` (colocated) |
| Component | Storybook + Vitest addon | Renders & behaves in a real browser | `stories/**`            |
| Visual    | Chromatic                | Appearance / layout regressions     | `stories/**`            |
| E2E       | Playwright               | Real user flows across the app      | `tests/**`              |

## Unit tests (Vitest)

Vitest is configured (`vitest.config.ts`) and runs in a real browser via
`@vitest/browser-playwright`. Reserve unit tests for **logic-heavy, pure pieces**
where an e2e test would be overkill:

- Pure utils with branching (`getExcerpt`, …).
- Hooks with real derived logic — e.g. `useTagsBox` (filtering, dedup, custom tags,
  and adding). Test with `renderHook`.

Don't unit-test thin fetch hooks (`usePosts`, `useCreatePost`) — those are covered
by e2e with mocked API responses.

```bash
npx vitest run        # once
npx vitest            # watch
```

## Component tests (Storybook stories as tests)

Every story is automatically a test via `@storybook/addon-vitest` (the
`storybookTest` plugin in `vitest.config.ts`), run in headless chromium:

- **A story with no `play` function** → a render smoke test: fails if the
  component throws while rendering.
- **A story with a `play` function** → an interaction test: after render, the
  `play` steps run (`userEvent`, `expect`). See `stories/ui/button.stories.tsx`.
- `@storybook/addon-a11y` adds accessibility checks in the Storybook UI.

Running `npx vitest run` executes these alongside unit tests. See `STORYBOOK.md`
for authoring stories.

> Note: story tests confirm a component **renders and behaves** — not that it
> _looks_ right. Appearance is covered by Chromatic (visual layer).

## Visual regression (Chromatic)

`@chromatic-com/storybook` is wired up. Chromatic builds Storybook, snapshots every
story in its cloud renderer, and diffs against the baseline — so it catches colour,
spacing, and dark-mode regressions that render tests can't, without local
screenshot flakiness.

```bash
npm run chromatic     # needs CHROMATIC_PROJECT_TOKEN (or --project-token=…)
```

First run establishes baselines; later runs surface visual diffs to accept/deny.
In CI it runs automatically (see `CI_CD.md`).

## End-to-end (Playwright)

Config: `playwright.config.ts`. Specs live in `tests/`. Base URL
`http://localhost:3000`; the `webServer` block starts `npm run dev` automatically.

```bash
npm run test:e2e                          # all projects
npm run test:e2e -- --project=chromium    # one browser
npm run test:e2e:ui                       # UI mode (debug)
npm run test:e2e:codegen                  # record against the running app
```

Projects: `chromium`, `firefox`, `Mobile Safari` (iPhone 12), `Microsoft Edge`.

### Authentication — `storageState`

Route guarding is client-side (`useSessionGuard`), backed by the persisted auth
store. To test the dashboard logged-in:

- A **`setup` project** (`tests/auth.setup.ts`) logs in once and saves the session
  (cookies + localStorage) to `playwright/.auth/user.json`. It's a `dependency` of
  every browser project, so it re-runs each time and the token stays fresh.
- Dashboard specs opt in with `test.use({ storageState: "playwright/.auth/user.json" })`.
- Auth-flow specs (`tests/auth/*`) intentionally run **logged out** (no storageState).
- `playwright/.auth/` is gitignored — tokens are never committed.

### Mocking the API

The app fetches from DummyJSON client-side, so tests mock at the network layer with
helpers in `tests/helpers/mock-posts.ts` and fixtures in `tests/fixtures/posts.ts`:

- `mockPostsList` — paginated `GET /posts` honouring `skip`/`limit`; supports
  `delayMs` (loading state) and `errorStatus` (error state).
- `mockGetPost`, `mockTagList`, `mockDeletePost`.

Mocking keeps assertions deterministic (exact rows, pagination math) and lets you
exercise loading/empty/error states. Only the mocked endpoints are intercepted;
auth passes through.

### Responsive tests

Desktop and mobile render different components (table vs cards, dropdown vs bottom
sheet, hidden greeting vs hamburger). Branch on the project's device flag:

```ts
const isMobile = test.info().project.use.isMobile ?? false;
```

Use it to pick roles (`isMobile ? "button" : "menuitem"`), or `test.skip(isMobile, …)`
for layout-specific tests (e.g. the desktop table test skips on mobile; a separate
cards test skips on desktop).

### Aria snapshots

Layout assertions use `toMatchAriaSnapshot`. Regenerate them against the current
(mocked) output instead of hand-editing:

```bash
npm run test:e2e -- --grep "Some test" --update-snapshots
# then: git apply test-results/rebaselines.patch   (if a patch is produced)
```

### Gotchas

- **Hidden-but-present DOM**: the desktop table stays in the DOM (`display:none`) on
  mobile, so `getByText` can match twice — scope to the visible container.
- **Teardown race**: flows that invalidate React Query trigger a background refetch
  that can hit a mock route during context close. An `afterEach` calls
  `page.unrouteAll({ behavior: "ignoreErrors" })` to prevent teardown hangs.
- **Redirect races**: after logout the app redirects itself — `waitForURL` instead
  of a second manual `goto`.

## Before pushing

```bash
npm run lint
npm run format:check
npx tsc --noEmit
npx vitest run
npm run test:e2e
```
