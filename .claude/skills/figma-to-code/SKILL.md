---
name: figma-to-code
description: Import a UI component (button, placeholder, input, card, etc.) from a Figma selection or URL and generate production-ready code that matches this project's shadcn/ui + Tailwind v4 design-token conventions, plus a Storybook story.
---

# Figma → Code component import

Use this skill when the user gives you a Figma URL, a Figma selection, or a component name to pull from Figma ("bring the Placeholder component from Figma", "import this Figma frame as a Card").

Before calling `use_figma` for anything generative, the `/figma-use` skill from the Figma MCP plugin is mandatory — invoke it first. This skill is specifically the **design-to-code** direction (reading an existing Figma component and turning it into code in this repo), not code-to-design.

## 0. Confirm scope up front

Ask (or infer from the request) two things if not already clear:

- **Which Figma node(s)** — a specific frame/component URL, or "whatever is currently selected".
- **Target location**: `components/ui/` (a shadcn-style primitive/atom — button, input, badge, placeholder skeleton) vs `components/design-system/` (a larger composed pattern specific to this product). Default to `components/ui/` for anything that is a single, reusable atom.

Do not overwrite an existing file under `components/ui/` or `components/design-system/` without telling the user first — check with Glob/Read whether a component of that name already exists. See the `page-architecture` skill for the general "search before you create" and file-placement rules that apply beyond just Figma imports.

## 1. Pull design context from Figma

For each component to import:

1. `get_metadata` on the node/selection to get a lightweight tree (ids, names, bounding boxes) before pulling anything heavy.
2. `get_design_context` on the specific node id(s) — this is the primary source: layout, variants, styles, bound variables.
3. `get_screenshot` of the node — use it to visually sanity-check the generated code against, especially spacing, radius, and icon placement.
4. `get_variable_defs` on the node — this gives you the Figma variables (colors, spacing, typography) actually bound to the layers, which is what you'll map onto this project's tokens in step 2.
5. If the component looks like it might already exist as a mapped component, check `get_code_connect_map` / `get_code_connect_suggestions` first so you don't duplicate work.

Do not guess at values from the screenshot alone — `get_design_context` / `get_variable_defs` are the source of truth for exact colors, spacing, and typography; the screenshot is only for visual QA.

## 2. Map Figma variables onto this project's tokens — never invent new raw values

This project's tokens live in two places and must stay in sync:

- `tokens/design-tokens.json` / `tokens/typography-tokens.json` — the source-of-truth token files (owned by the user; only edit these if the user supplies updated token exports).
- `app/globals.css` — a single `@theme` block that flattens those tokens into Tailwind v4 custom properties: `--color-<group>-<name>[-state]` (e.g. `--color-primary-bg2-hover`) and paired `--text-<name>` / `--text-<name>--line-height` / `--text-<name>--font-weight` / `--text-<name>--letter-spacing` composite utilities (e.g. `text-title3`, `text-body2`).

Workflow:

1. Read `app/globals.css` and try to match every Figma variable/color/text-style the component uses to an existing `--color-*` / `--text-*` token by hex value or by Figma variable name.
2. Prefer the project's own token utilities (`bg-primary-bg2`, `text-neutral-fg2`, `text-body2`, etc.) over the shadcn semantic aliases (`bg-primary`, `text-muted-foreground`, `border`) — match whatever token Figma actually uses, one-to-one, rather than going through the semantic indirection layer. Only fall back to a shadcn semantic alias if the component doesn't correspond to any specific Figma-bound token (e.g. a generic `border` with no styled Figma equivalent).
3. If the Figma component uses a genuinely new color/type value not present in the token files, **stop and flag it to the user** — ask whether it's a real new token (then add it consistently to `app/globals.css` under the matching group) or a Figma drift/mistake. Never hardcode a raw hex/px value directly in component className strings as a workaround.
4. This project has **no dark mode** (removed deliberately — see `AGENTS.md`/project history). Do not add `dark:` variants, do not reintroduce `next-themes`, and only pull the light-mode/default variant of any Figma component even if Figma has a dark variant defined.

## 3. Check whether shadcn already has this component

Before writing anything by hand, check if the component is one of shadcn's standard primitives (pagination, dialog, dropdown-menu, tabs, tooltip, etc. — see https://ui.shadcn.com/docs/components). If it is:

1. A shadcn MCP server is available in this project — use `ToolSearch` (query like `"shadcn"` or `"select:<tool_name>"`) to find its tools (e.g. component search/lookup/demo tools) and prefer it for browsing available components and fetching source/usage before falling back to the CLI. It's generally the faster way to confirm a component exists and see its API/variants.
2. Scaffold it with `npx shadcn@latest add <component>` — this uses the project's existing `components.json` (`style: "new-york"`, `iconLibrary: "lucide"`) so it lands with the right conventions and accessibility behavior already handled.
3. Then adapt the generated file to match Figma: run it through the step 2 token mapping (swap the shadcn semantic aliases it ships with for the project's own token utilities), strip anything dark-mode-related, and adjust markup/props to match the Figma variants pulled in step 1.

Do not write a from-scratch implementation of something shadcn already provides — start from the shadcn output and modify it, never reimplement it independently. Only fall through to step 4 (build from scratch) when no shadcn equivalent exists.

## 4. Generate the component

Follow the existing pattern in `components/ui/button.tsx` exactly:

- Function component, PascalCase name, named export (plus a `<Name>Variants` export if the component has variants).
- Variants and sizes via `cva` from `class-variance-authority`, with a `VariantProps<typeof xVariants>` prop type.
- Use `cn()` from `@/lib/utils` to merge classes.
- Use Radix primitives from the `radix-ui` package (already installed) for anything interactive/composable (e.g. `Slot.Root` for `asChild`), matching shadcn "new-york" style conventions (see `components.json`: `style: "new-york"`, `iconLibrary: "lucide"`, RSC-compatible, no default Tailwind config file — Tailwind v4 CSS-first).
- Add a `data-slot="<component-name>"` attribute (and `data-variant` / `data-size` where relevant) on the root element, matching existing components.
- Icons: `lucide-react`.
- File path: `components/ui/<kebab-case-name>.tsx` or `components/design-system/<kebab-case-name>.tsx` per the scope decision in step 0.
- TypeScript strict — no `any`, prefer `React.ComponentProps<'element'>` extension over re-declaring DOM props.

For a "placeholder"/skeleton-style component specifically: check if `tw-animate-css` (already installed) has a suitable pulse/shimmer animation utility before writing custom keyframes.

## 5. Add a Storybook story

Stories live in a **separate top-level `stories/` folder**, mirroring the `components/` subpath (not colocated — this was a deliberate reorg, don't put `.stories.tsx` next to the component file). For a new `components/ui/placeholder.tsx`, add `stories/ui/placeholder.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Placeholder } from "@/components/ui/placeholder";

const meta = {
  title: "ui/Placeholder",
  component: Placeholder,
  tags: ["autodocs"],
  argTypes: {
    /* mirror variant/size props with "select" controls, like stories/ui/button.stories.tsx */
  },
} satisfies Meta<typeof Placeholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {/* ... */},
};
```

Cover every variant Figma defines as a separate named `Story` export (not just `Default`), the same way you'd expect a designer to enumerate states.

## 6. (Optional) Push a Code Connect mapping back to Figma

If the user wants future Figma edits to stay linked to this code (and especially if you used `get_code_connect_suggestions` in step 1), use `add_code_connect_map` / `send_code_connect_mappings` to register the new component against its Figma node. Only do this if the user asks for it — it mutates Figma-side state, not just this repo.

## 7. Verify before reporting done

Run, in this order, and fix anything that fails before telling the user it's done:

1. `npx tsc --noEmit`
2. `npx eslint .`
3. `npx prettier --check <new files>`
4. `npm run build-storybook` (confirms the story resolves and renders)

Then summarize: which Figma node was imported, where the file(s) landed, which existing tokens were reused vs. any new tokens flagged for the user's decision, and confirmation the verification steps passed.
