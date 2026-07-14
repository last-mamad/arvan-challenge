# CI/CD

Single GitHub Actions workflow: `.github/workflows/ci-cd.yml`, triggered on every
`push`. Jobs run **sequentially** via `needs`, so a failure stops the chain:

```
unit  →  chromatic  →  e2e  →  build  →  deploy
```

1. **unit** — fast Vitest unit tests (`npm run test:unit`); gates the rest.
2. **chromatic** — builds Storybook and runs visual regression (see `STORYBOOK.md`).
3. **e2e** — runs the Playwright suite; uploads `playwright-report/`.
4. **build** — `npm run build`, a gate that the app compiles.
5. **deploy** — SSHes into the server, pulls, builds, and restarts (`pm2`). Runs
   **only on `main`**; other branches run steps 1–4 only.

## Required GitHub secrets

Repo → **Settings → Secrets and variables → Actions**:

| Secret                    | Purpose                      |
| ------------------------- | ---------------------------- |
| `CHROMATIC_PROJECT_TOKEN` | Chromatic project token      |
| `SSH_HOST` / `SSH_USER`   | Server address + SSH user    |
| `SSH_PRIVATE_KEY`         | Key authorised on the server |
| `SSH_PORT`                | SSH port (usually `22`)      |
| `APP_DIR`                 | App path on the server       |

## Server (one-time)

The server needs Node 20, `pm2`, and a read-only **deploy key** so it can pull the
repo. First run: `npm ci && npm run build && pm2 start npm --name arvan-challenge -- start`
(serves on `:3005`). After that, each deploy just runs
`git pull → npm ci → npm run build → pm2 reload`. Put a reverse proxy (e.g. nginx)
in front of `:3005` if you want port 80/443.
