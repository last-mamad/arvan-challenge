# Architecture

## Stack

- Next.js 16 (App Router, TypeScript strict)
- Tailwind CSS v4 (CSS-first, no `tailwind.config.ts`) + shadcn/ui (New York style, Lucide icons)
- TanStack Query v5 for server state (DummyJSON API)
- Formik + Yup for forms
- Zustand for client/UI state (auth is persisted)
- Design tokens as CSS variables in `app/globals.css`; toasts via `sonner`

## Folder structure

- `app/` — routes only; a `page.tsx` is composition, not business logic.
  - `app/(auth)/` — route group for the logged-out shell (`login/`, `register/`)
  - `app/dashboard/` — authenticated shell (`layout.tsx` + `articles/`)
  - `app/dashboard/articles/` — list (`page.tsx`), create (`create/`), edit (`[id]/`)
  - `_components/` · `_hooks/` · `_utils/` — colocated, route-local files
    (`_`-prefixed → ignored by the router)
- `components/ui/` — shadcn primitives/atoms, flat files. Prefer regenerating via the CLI over hand-editing.
- `components/design-system/` — composed product components built on `components/ui/`
- `lib/api/<resource>/` — `interfaces.ts` (types) + `services.ts` (fetch fns) per resource, over `lib/api/client.ts` (`apiClient`)
- `hooks/` — reusable hooks used by more than one route (`@/hooks`); route-specific hooks live in that route's `_hooks/`
- `lib/store/` — Zustand stores (`auth-store`, `ui-store`)
- `lib/utils/` — pure helpers (`cn`, `getExcerpt`, cookies)
- `lib/constants/` — shared constants (`ARTICLES_PATH`, `SIDEBAR_ITEMS`)
- `stories/` — Storybook stories, mirroring the `components/` subpath (see `STORYBOOK.md`)
- `tests/` — Playwright e2e (see `TESTING.md`)

> tokens are CSS variables in `app/globals.css`.

## Data & state

- **Server state** → TanStack Query, always backed by typed functions in
  `lib/api/*`. Call `useQuery`/`useMutation` directly in the page/component; extract
  into a route `_hooks/` only when the logic is genuinely complex.
- **Client/UI state** → Zustand in `lib/store/`. Don't mirror server data into it.
- **Forms** → Formik + Yup.

## Auth model

There is **no middleware** — route guarding is client-side. `useSessionGuard`
(`app/dashboard/_hooks/`) reads the persisted auth store on mount, refreshes the
session, and redirects to `/login` if there's no valid session. The auth store
(`lib/store/auth-store.ts`) persists to `localStorage` (`auth-storage`) and mirrors
the access token into an `auth-token` cookie. See `TESTING.md` for how e2e reuses a
saved session via `storageState`.

## Related docs

- [CODE_STANDARDS.md](./CODE_STANDARDS.md) · [TESTING.md](./TESTING.md) ·
  [STORYBOOK.md](./STORYBOOK.md) · [CI_CD.md](./CI_CD.md) ·
  [MAINTENANCE.md](./MAINTENANCE.md)
