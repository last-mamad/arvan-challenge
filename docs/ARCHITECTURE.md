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

Route guarding has **two layers**, and neither is a real security boundary — the
API is the only source of truth for auth.

- **`proxy.ts`** (the App Router's middleware equivalent, run at the edge on every
  matched navigation) does *coarse* routing based only on the presence of the
  `auth-token` cookie: it sends `/` to the articles list or `/login`, keeps
  logged-out users out of `/dashboard`, and bounces logged-in users away from the
  auth routes. It never validates the token, so it's a UX/redirect optimization,
  **not** a security gate — a forged cookie can reach the dashboard shell.
- **`useSessionGuard`** (`app/dashboard/_hooks/`) does the *real* client-side
  check: on mount it refreshes the session against the API and, on failure, clears
  the store and redirects to `/login`. A forged cookie fails this refresh and is
  bounced out; in a real backend every data request also requires a valid bearer
  token, so no protected data is reachable regardless.

The auth store (`lib/store/auth-store.ts`) persists to `localStorage`
(`auth-storage`) and mirrors the access token into the `auth-token` cookie.

> **Token storage caveat:** DummyJSON returns tokens in the response body (not as
> an `httpOnly` cookie), so they're held client-side and are therefore exposed to
> XSS. Against a real ArvanCloud backend the tokens would live in `httpOnly` +
> `Secure` + `SameSite` cookies set by the server, and `proxy.ts` would stay a
> pure UX layer.

See `TESTING.md` for how e2e reuses a saved session via `storageState`.

## Related docs

- [CODE_STANDARDS.md](./CODE_STANDARDS.md) · [TESTING.md](./TESTING.md) ·
  [STORYBOOK.md](./STORYBOOK.md) · [CI_CD.md](./CI_CD.md) ·
  [MAINTENANCE.md](./MAINTENANCE.md)
