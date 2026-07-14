# 📊 Blog Admin Dashboard

A blog administration dashboard for managing articles — built as the **Arvan
Challenge**. Authenticate, browse a paginated table of posts, and create, edit, and
delete articles, with a fully responsive desktop/mobile experience.

### 🔗 Live demo → **[challenge.kamali.online](https://challenge.kamali.online)**

---

## ✨ Features

- 🔐 **Auth** — login & register with a client-side session guard and token refresh
- 📝 **Articles CRUD** — create, edit, delete, with form validation
- 📇 **Responsive data** — a data table on desktop, cards on mobile
- 🏷️ **Tag picker** — searchable, virtualized, supports custom tags
- 📄 **Pagination** — URL-driven, keeps the previous page visible while loading
- 🌗 **Design system** — token-driven components documented in Storybook
- ♿ **Accessible** — role-based, semantic markup throughout

## 🧰 Tech stack

| Area         | Choice                                                  |
| ------------ | ------------------------------------------------------- |
| Framework    | ⚛️ Next.js 16 (App Router) + React 19 + TypeScript      |
| Styling      | 🎨 Tailwind CSS v4 (CSS-first) + shadcn/ui (New York)   |
| Server state | 🔄 TanStack Query v5 (DummyJSON API)                    |
| Client state | 🐻 Zustand (persisted auth)                             |
| Forms        | 📋 Formik + Yup                                         |
| Testing      | 🎭 Playwright · 🧪 Vitest · 📖 Storybook · 🖼️ Chromatic |
| CI/CD        | 🚀 GitHub Actions → Ubuntu (pm2 + nginx)                |

## 🚀 Quick start

```bash
npm install
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)**. The API defaults to the
public [DummyJSON](https://dummyjson.com) backend — copy `.env.local.example` to
`.env.local` to override `NEXT_PUBLIC_API_URL`.

## 📜 Scripts

| Command                           | What it does                           |
| --------------------------------- | -------------------------------------- |
| `npm run dev`                     | ▶️ Dev server on `:3000`               |
| `npm run build` / `npm run start` | 🏗️ Production build / serve on `:3005` |
| `npm run storybook`               | 📖 Storybook on `:6006`                |
| `npm run test:e2e`                | 🎭 Playwright end-to-end tests         |
| `npx vitest run`                  | 🧪 Unit + story (component) tests      |
| `npm run chromatic`               | 🖼️ Visual regression (needs token)     |
| `npm run lint` / `npm run format` | 🧹 Lint / format                       |

## 🗂️ Project structure

```
app/            # routes (App Router) — (auth) + dashboard/articles
components/
  ui/           # shadcn primitives
  design-system/# composed product components
lib/            # api/ · store/ · utils/ · constants/
hooks/          # cross-route reusable hooks
stories/        # Storybook stories (design system)
tests/          # Playwright e2e (+ helpers, fixtures)
docs/           # 📚 project documentation
```

## 🧪 Testing

Four layers, each catching a different class of bug — unit (Vitest), component
(stories as tests), visual (Chromatic), and end-to-end (Playwright). See
**[docs/TESTING.md](./docs/TESTING.md)**.

## 📚 Documentation

| Doc                                           | Contents                                   |
| --------------------------------------------- | ------------------------------------------ |
| 🏛️ [Architecture](./docs/ARCHITECTURE.md)     | Stack, folder structure, data & auth model |
| 📐 [Code standards](./docs/CODE_STANDARDS.md) | Conventions & where code goes              |
| 🧪 [Testing](./docs/TESTING.md)               | Unit · component · visual · e2e            |
| 📖 [Storybook](./docs/STORYBOOK.md)           | Design system, stories, Chromatic          |
| 🚀 [CI/CD](./docs/CI_CD.md)                   | Pipeline + Ubuntu server setup             |
| 🔧 [Maintenance](./docs/MAINTENANCE.md)       | Adding components, API resources, env      |

## 🚀 Deployment

Every push runs the pipeline **`chromatic → e2e → build → deploy`**; `main` deploys
to an Ubuntu server via SSH (pm2 + nginx). Details in
**[docs/CI_CD.md](./docs/CI_CD.md)**.
