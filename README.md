# Syntro — frontend

Pixel-faithful React implementation of the Syntro Figma file (`FGA0sH1rkffLXq1NJIFLRR`). UI only:
there are no API calls — every screen renders typed static data from `src/mocks` so a real backend
can be wired in later without touching components.

## Setup

```bash
npm install
npm run dev        # http://localhost:5173
```

Requires Node ≥ 20. Fonts (Manrope, Inter) load from Google Fonts.

## Scripts

| Script                | What it does                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------ |
| `npm run dev`         | Vite dev server                                                                                  |
| `npm run build`       | Type-check (project references) and build to `dist/`                                             |
| `npm run preview`     | Serve the production build                                                                       |
| `npm run lint`        | ESLint (typescript-eslint, react-hooks, jsx-a11y, import/order) — zero warnings allowed          |
| `npm run typecheck`   | `tsc --noEmit` against `tsconfig.app.json`                                                       |
| `npm run format`      | Prettier (with the Tailwind class sorter)                                                        |
| `npm run screenshots` | Capture every screen with Playwright (dev server must be running; pass the URL as the first arg) |

## Routes

| Route        | Figma frame      | Notes                                                       |
| ------------ | ---------------- | ----------------------------------------------------------- |
| `/`          | —                | Redirects to `/sign-in`                                     |
| `/sign-in`   | `1:2465` Sign In | Tabs navigate between sign-in and sign-up                   |
| `/sign-up`   | `1:2840` Sign Up |                                                             |
| `/dashboard` | `1:746` Main     | Hosts the New Order (`1:1701`) and Filter (`1:2410`) modals |

## Folder structure

```
src/
  app/          App root and router
  components/
    ui/         Primitives: Button, Input, Select, Dialog, BarChart, …
    layout/     Sidebar, Topbar, AppLayout, AuthLayout, AuthPromoPanel
    auth/       Auth card composites (heading, form, social row)
    dashboard/  Dashboard composites, modals and the promo preview
  pages/        One folder per route; the only place mocks are imported
  hooks/        useDisclosure
  lib/          cn(), route constants
  styles/       tokens.css (design tokens), globals.css, fonts.css
  types/        Domain types shared by mocks and components
  mocks/        Static, typed fixtures
  assets/       icons/ (SVG → React via vite-plugin-svgr), images/
docs/           Design audit, component inventory, deviation report, screenshots
```

Conventions: one component per file, named exports, `index.ts` barrels per folder, exported
`<Component>Props`, `forwardRef` + `displayName` on primitives, variants via `class-variance-authority`,
class merging via `cn()`. Imports are ordered react → third-party → `@/` → relative.

## Design tokens

All tokens live in two places and nowhere else:

- `src/styles/tokens.css` — colour channels as CSS variables (`--c-graphite: 22 24 29`) plus
  semantic aliases (`--bg-page`, `--bg-card`, `--accent`, …) for future theming.
- `tailwind.config.ts` — maps those variables into Tailwind (`bg-paper`, `text-graphite/60`,
  `border-subtle`, `bg-overlay`), and defines the type scale (`text-xs` … `text-4xl`, `text-nav`),
  radii (`rounded-sm` 8 → `rounded-2xl` 32, `rounded-pill` 40), spacing additions (`4.5`, `13`,
  `26`, `70`), named widths/heights (`w-auth-form`, `h-stat`, …), shadows and z-layers.

| Figma          | Token            | Value     |
| -------------- | ---------------- | --------- |
| Graphite       | `graphite`       | `#16181D` |
| Slate          | `slate`          | `#5B636D` |
| Vermilion      | `vermilion`      | `#EE4B34` |
| Deep Vermilion | `vermilion-deep` | `#D8402A` |
| Paper          | `paper`          | `#F7F5F3` |
| Surface        | `surface`        | `#F1EFEC` |

Text emphasis follows Figma's layer opacity (`text-graphite/60`), and every text style carries the
file's −2 % letter-spacing via the `fontSize` tuples. See `docs/design-audit.md` for the full audit.

## Plugging in an API later

Components are presentational; all data enters through props from the page containers. To go live:

1. Replace the fixtures imported in `src/pages/*` (`@/mocks`) with fetched data shaped like the
   interfaces in `src/types` (`DashboardData`, `User`, `NavEntry[]`, `Project[]`).
2. Implement the handlers marked `// TODO(api):`
   - `src/pages/sign-in/SignInPage.tsx` — `handleSubmit`, `handleSocial`, `handleForgotPassword`
   - `src/pages/sign-up/SignUpPage.tsx` — same three handlers
   - `src/pages/dashboard/DashboardPage.tsx` — `handleContinue` (New Order), `handleApplyFilter`,
     `handleOpenQueue`, `handleSelectReviewItem`
3. Add loading/error states where needed — none exist in Figma, so none are implemented.

No `fetch`/axios wrappers, env files or query libraries are included by design.
