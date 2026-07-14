# Code Standards

Conventions for writing code in this project. The goal is that new code reads
like the code already here.

## Tooling

- **TypeScript** (strict) — no `any` unless genuinely unavoidable and commented.
- **Prettier** owns formatting. Config (`.prettierrc`): double quotes, semicolons,
  trailing commas (`all`), print width `100`, 2-space indent. Run `npm run format`
  (or `npm run format:check` in CI).
- **ESLint** flat config (`eslint.config.mjs`) = `next/core-web-vitals` +
  `next/typescript` + `eslint-config-prettier` + `storybook`. Run `npm run lint`.
- Don't fight the formatter/linter — if a rule is wrong, change the config, not the code.

## Imports & aliases

- `@/*` maps to the repo root (`tsconfig.json` paths). Prefer `@/lib/...`,
  `@/components/...` over long relative paths. Relative paths are fine within a
  colocated feature folder (e.g. a `_components/` sibling).
- Import order, roughly: third-party → `@/` aliases → relative. Prettier/ESLint
  won't reorder for you, so keep it tidy by hand.

## Folder architecture

See `ARCHITECTURE.md` for the full map. The rules that matter when adding code:

- **`app/`** — routes only. A `page.tsx` should be composition (import components,
  call `useQuery`/`useMutation`), not business logic. Route groups use `(parens)`.
- **Colocated, non-route files** live in `_`-prefixed folders inside the route
  (ignored by the router): `_components/`, `_hooks/`, `_utils/`, `_contexts/`,
  `_types/`. Only create one when there's something to put in it.
- **`components/ui/`** — shadcn primitives / atoms, flat files (`button.tsx`).
  Generated via the shadcn CLI (New York style); prefer regenerating over hand-editing.
- **`components/design-system/`** — larger composed patterns built from `ui/`
  primitives (`header.tsx`, `modal.tsx`, `table.tsx`).
- **`lib/api/<resource>/`** — `interfaces.ts` (types) + `services.ts` (fetch
  functions using `apiClient`). **Never call `fetch` directly from a component.**
- **`hooks/`** (root, `@/hooks`) — reusable hooks used by more than one route.
  A hook that's specific to one route lives in that route's `_hooks/`. **Never
  create `lib/hooks/`.**
- **`lib/store/`** — Zustand stores for cross-component client state.
- **`lib/utils/`** — pure helpers (`cn`, `getExcerpt`, cookies).
- **`lib/constants/`** — shared constants (`ARTICLES_PATH`, `SIDEBAR_ITEMS`).
- **`stories/`** — Storybook stories, mirroring the `components/` subpath (not
  colocated). See `STORYBOOK.md`.
- **`tests/`** — Playwright e2e. See `TESTING.md`.

## Naming

- **Components**: `PascalCase` files for product/page components (`ArticleForm.tsx`,
  `AllArticles.tsx`). shadcn primitives keep their kebab-case filenames
  (`button.tsx`, `data-cards.tsx`).
- **Hooks**: `camelCase`, `use`-prefixed (`usePosts.ts`, `useTagsBox.ts`).
- **Utils / constants**: `camelCase` exports; kebab-case filenames for generic
  utils where that's the existing pattern.
- Booleans read as predicates (`isEdit`, `isPending`, `hasRun`).

## Keeping files short — push logic down

A `page.tsx` or component past ~a screenful is a signal to extract:

- **Data fetching / mutations** → call `useQuery`/`useMutation` with the
  `queryFn`/`mutationFn` from `lib/api/*`. Only wrap in a custom hook when the
  logic is genuinely complex (combined queries, transforms, optimistic updates).
- **Non-trivial local state / derived values** → a `use<Thing>` hook in the
  route's `_hooks/` (see `useTagsBox`).
- **Cross-component client state** → a Zustand store in `lib/store/`.
- **Pure computation/formatting** → a function in `lib/utils/`, not inline in JSX.
- Promote a flat file to a folder (`Thing/Thing.tsx` + `utils.ts`, …) only once it
  actually needs it — don't scaffold structure preemptively.

## Components

- Add `"use client"` only when the component needs it (state, effects, browser
  APIs, event handlers). Keep components server-first where possible.
- Reuse before creating: search `components/ui/` and `components/design-system/`
  first; extend an existing component (new prop/variant) rather than forking it.
- Prefer accessible, role-based markup — it makes both users and tests happy
  (e.g. `aria-label` on icon-only buttons, semantic `<table>`/`<nav>`).

## Styling

- **Tailwind v4, CSS-first** (no `tailwind.config.ts`). Design tokens are CSS
  variables in `app/globals.css` (`--color-primary-bg2`, `--color-neutral-*`, …),
  exposed as Tailwind classes (`bg-primary-bg2`, `text-neutral-fg1`).
- **Use tokens, not raw hex.** If a value isn't a token, add a token rather than
  hardcoding.
- Compose class names with `cn()` (`clsx` + `tailwind-merge`).
- Support light and dark; responsive breakpoints use `md:` (the desktop/mobile
  split point across the app).

## State & data

- **Server state** → TanStack Query, always backed by `lib/api/*` functions.
  Don't duplicate server data into Zustand.
- **Client/UI state** → Zustand (`lib/store/`). Auth is persisted
  (`auth-store`, localStorage + `auth-token` cookie); UI toggles live in `ui-store`.
- **Forms** → Formik + Yup (`validationSchema`). Field-level errors surface via the
  `Field` component.

## Commits & PRs

- Small, focused commits with imperative messages (`feat:`, `fix:`, `refactor:` …).
- Before opening a PR: `npm run lint`, `npm run format:check`, `npx tsc --noEmit`,
  and the relevant tests (`npm run test:e2e`, `npx vitest run`).
