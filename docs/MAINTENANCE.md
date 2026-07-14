# Maintenance

Common tasks. See [CODE_STANDARDS.md](./CODE_STANDARDS.md) for the conventions
these follow.

## Adding a shadcn component

```
npx shadcn@latest add <component>
```

Pinned to the New York style with CSS variables (see `components.json`). The
primitive lands in `components/ui/`. If you need a larger composed pattern, build it
in `components/design-system/` on top of the primitive.

## Adding an API resource

1. Add types + fetch functions in `lib/api/<resource>/interfaces.ts` and
   `services.ts`, using `apiClient` from `lib/api/client.ts`. **Never call `fetch`
   directly from a component.**
2. Consume them with `useQuery`/`useMutation` directly in the page/component.
   Extract into the route's `_hooks/` only when the logic is genuinely complex
   (combined queries, transforms, optimistic updates). If a second route needs the
   same hook, promote it to the root `hooks/` — **never** `lib/hooks/`.

## Adding a page / route

- Put the route under `app/`; keep `page.tsx` as composition.
- Colocate route-local files in `_components/`, `_hooks/`, `_utils/`, `_types/` —
  create each only when there's something to put in it.
- Reuse existing `components/ui/` and `components/design-system/` before making
  anything new.

## Stories

Every reusable component gets a story under `stories/` (mirroring the `components/`
path). Stories double as component tests and visual-regression baselines — see
[STORYBOOK.md](./STORYBOOK.md).

## Testing

Full guide in [TESTING.md](./TESTING.md). Quick commands:

```bash
npx vitest run         # unit + story (component) tests
npm run test:e2e       # Playwright end-to-end
npm run chromatic      # visual regression (needs token)
npm run storybook      # component workshop on :6006
```

## Environment variables

Copy `.env.local.example` to `.env.local`. `NEXT_PUBLIC_API_URL` defaults to the
public DummyJSON API (`https://dummyjson.com`) — override it to point at a different
backend.

## Deployment

Pushes run the CI/CD pipeline (`chromatic → e2e → build → deploy`) and, on `main`,
deploy to the Ubuntu server via SSH + pm2. Setup and secrets are in
[CI_CD.md](./CI_CD.md).
