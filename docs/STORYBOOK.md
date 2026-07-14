# Storybook & Design System

Storybook is the workshop for the design system — every reusable component is
developed and documented here in isolation.

```bash
npm run storybook          # dev server on :6006
npm run build-storybook    # static build
```

Stories live in `stories/`, mirroring the `components/` structure:

- **`stories/ui/`** — shadcn primitives (`Button`, `Input`, …)
- **`stories/design-system/`** — composed components (`Header`, `Modal`, `Pagination`, …)

## How stories get tested

Stories aren't just docs — they're the source for two test layers:

- **Component tests** — `@storybook/addon-vitest` (via `vitest.config.ts`) runs every
  story as a test in headless chromium. A story with no `play` function is a render
  smoke test; one with a `play` function is an interaction test. Run with `npx vitest run`.
- **Visual regression** — `@chromatic-com/storybook` snapshots every story and diffs
  against a baseline to catch appearance/layout changes. Run with `npm run chromatic`.

Both run automatically in CI (see [CI_CD.md](./CI_CD.md)). Full testing overview in
[TESTING.md](./TESTING.md).
