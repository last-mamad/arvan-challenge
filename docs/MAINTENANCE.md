# Maintenance

## Adding a shadcn component

```
npx shadcn@latest add <component>
```

The project is pinned to the New York style with CSS variables (see `components.json`).

## Adding an API resource

1. Add types + fetch functions in `lib/api/<resource>.ts` using `apiClient` from `lib/api/client.ts`.
2. Wrap them in TanStack Query hooks in `lib/hooks/use-<resource>.ts`.
3. Consume the hooks from route components under `app/(dashboard)/`.

## Testing

- `npm run storybook` — component development/inspection in isolation
- `npm run test:e2e` — Playwright end-to-end smoke tests

## Environment variables

Copy `.env.local.example` to `.env.local` and adjust `NEXT_PUBLIC_API_URL` if not using the
public DummyJSON API.
