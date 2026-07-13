---
name: page-architecture
description: Conventions for building or editing any page/route/feature in this Next.js App Router project — reuse existing components before creating new ones, keep pages and components short, and push long/derived logic into hooks, stores, and utils instead of inlining it.
---

# Page & feature architecture

Use this skill whenever you're building or editing a page, route, or feature — not only when importing from Figma (see `figma-to-code` for that specific flow). It governs where files go, when to reuse vs. create a component, and where logic should live so pages and components don't turn into walls of code.

## 1. Search before you create

Before writing a new component, hook, or utility:

1. `Glob`/`Grep` `components/ui/` and `components/design-system/` for something that already does this (or close to it) — extend or compose an existing component before adding a new one.
2. Check `lib/api/` for an existing fetch function for the resource you need before writing a new one.
3. If what you need is a shadcn primitive, follow the `figma-to-code` skill's shadcn-first step (search the shadcn MCP tools / `npx shadcn add`) before hand-rolling it.

Never duplicate an existing component under a slightly different name "just for this page." If an existing component is close but not quite right, extend it (new variant/prop) rather than forking it.

## 2. Where files go

This project's layout (App Router):

- `app/` — routes only. Route groups in `(parens)` for layout grouping without affecting the URL. A `page.tsx` should be mostly composition — importing components and calling `useQuery`/`useMutation` directly — not business logic.
- `components/ui/` — shadcn-style primitives/atoms (flat files, e.g. `button.tsx`).
- `components/design-system/` — larger composed patterns specific to this product, built from `components/ui/` primitives.
- `lib/api/` — one file per resource with the raw fetch functions (`lib/api/posts.ts`, `lib/api/users.ts`). Always go through this layer for fetch/mutation calls — never call `fetch` directly from a component.
- `hooks/` (project root, `@/hooks` alias in `components.json`) — every hook that isn't page-local: generic reusable hooks (`use-debounce.ts`, a future `use-mobile.ts`) and any fetch/mutation or other hook promoted out of a page's `_hooks/` because a second page needs it too. This is also where the shadcn CLI drops any hook it scaffolds. **Never create a `lib/hooks/` folder** — hooks only live here or in a page's local `_hooks/` (§3), nothing goes in `lib/`.
- `lib/store/` — Zustand stores for cross-component client state (`lib/store/ui-store.ts` is the existing example).
- `lib/utils/` — pure helper functions (`cn()`, etc.).
- `stories/` — Storybook stories, mirroring the `components/` subpath (see `figma-to-code` — stories are never colocated with components).

**Every route folder follows this shape**, adding only the pieces it actually needs:

```
app/<route>/
├── page.tsx
├── layout.tsx        # only if this route needs its own layout
├── _components/       # only if it has page-local components
├── _contexts/          # only if it has page-local React context
├── _hooks/               # only if it has page-local hooks (see §3 — mainly complex fetch/mutation logic)
└── _types/                # only if it has page-local types
```

(`_`-prefixed folders are ignored by Next.js routing, so they're safe for colocated, non-route files.) Don't scaffold empty `_components`/`_contexts`/`_hooks`/`_types` folders up front — add each one only when there's actually something to put in it. Promote something out of a page's `_hooks`/`_components` into the shared `lib/`/`components/design-system/` locations only once a second page needs it too.

## 3. Keep components and pages short — push logic down

A `page.tsx` or component file growing past roughly a screenful of code is a signal to extract, not a style preference to ignore:

- **Data fetching / mutations** → call `useQuery`/`useMutation` directly in the page or component, with the `queryFn`/`mutationFn` imported from `lib/api/*`. Don't wrap a simple fetch in its own hook just for the sake of it. Only extract into a hook — in that page's `_hooks/` (§2) — when the fetch/mutation logic is genuinely long or complex (e.g. combined/dependent queries, non-trivial transforms, optimistic updates, polling/retry logic). If a second page later needs that same complex hook, promote it to the root `hooks/` (never `lib/hooks/`).
- **Cross-component client state** (sidebar open, shared modal state, etc.) → a Zustand store in `lib/store/`.
- **Non-trivial event handlers, derived values, or local state machines** (not fetch-related) → extract into a `use-<thing>.ts` custom hook in the page's `_hooks/` if page-specific, or the root `hooks/` if reusable. The component should call the hook and render; it shouldn't contain the logic itself.
- **Pure computation/formatting** (no React state involved) → a plain function in `lib/utils/` or a local `utils.ts`, not inline in JSX or the component body.
- **A component itself growing complex** (multiple sub-components, several dedicated helpers) → promote it from a flat file to a folder (`ComponentName/ComponentName.tsx`, plus `components/`, `utils/`, etc. as needed) only once it actually needs that — don't scaffold folder structure preemptively for simple atoms. This mirrors shadcn's own flat-file convention for primitives.
- **A hook itself growing complex** (needs its own helpers, types, or sub-logic split across files) → promote it the same way, from a flat file to a folder named after the hook, e.g. `hooks/use-thing/use-thing.ts` + `index.ts` barrel export + `utils.ts`/`types.ts` as needed (or `_hooks/use-thing/...` if it's page-local). Do this only once the single file actually gets unwieldy, not preemptively.

## 4. Before reporting a page/feature done

- `npx tsc --noEmit`
- `npx eslint .`
- `npx prettier --check <changed files>`
- Skim the diff for any component that could have reused something in `components/ui/` or `components/design-system/` instead of a new one-off — flag it if you find one you missed.
