# Documentation

Project documentation for the Arvan Challenge dashboard.

| Doc                                      | What's in it                                  |
| ---------------------------------------- | --------------------------------------------- |
| [ARCHITECTURE.md](./ARCHITECTURE.md)     | Stack, folder structure, data-fetching model  |
| [CODE_STANDARDS.md](./CODE_STANDARDS.md) | Tooling, conventions, where code goes         |
| [TESTING.md](./TESTING.md)               | Test layers: unit, component, visual, e2e     |
| [STORYBOOK.md](./STORYBOOK.md)           | Design system, writing stories, Chromatic     |
| [CI_CD.md](./CI_CD.md)                   | GitHub Actions pipeline + Ubuntu server setup |
| [MAINTENANCE.md](./MAINTENANCE.md)       | Adding components, API resources, env vars    |

## Quick reference

```bash
npm run dev            # app on :3000
npm run storybook      # Storybook on :6006
npm run test:e2e       # Playwright e2e
npx vitest run         # unit + story tests
npm run chromatic      # visual regression (needs token)
npm run build && npm run start   # production build on :3005
```
