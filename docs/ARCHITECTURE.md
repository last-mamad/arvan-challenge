# Architecture

## Stack

- Next.js 16 (App Router, TypeScript strict)
- Tailwind CSS v4 (CSS-first config, no `tailwind.config.ts`) + shadcn/ui (New York style)
- TanStack Query v5 for server state (DummyJSON API)
- Formik + Yup for forms
- Zustand for local/UI state
- next-themes for class-based dark mode

## Folder structure

- `app/(dashboard)/` — route group for the authenticated dashboard shell (`posts/`, `users/`)
- `components/ui/` — shadcn primitives, generated via the shadcn CLI. Don't hand-edit; regenerate.
- `components/design-system/` — composed components built on top of `components/ui`
- `lib/api/` — fetch wrapper (`client.ts`) and DummyJSON client functions
- `lib/hooks/` — TanStack Query hooks wrapping `lib/api` functions
- `lib/store/` — Zustand stores for client-only UI state
- `lib/utils/` — shared utilities (e.g. `cn`)
- `tokens/` — design tokens (`colors.json`, `typography.json`) consumed by `app/globals.css`

## Data fetching

Server state goes through TanStack Query hooks in `lib/hooks`, backed by typed functions in
`lib/api`. UI-only state (sidebar toggles, modals, etc.) goes through Zustand in `lib/store`.
Don't reach for Zustand for anything the API already owns.
