# Deviation report

Every place the implementation intentionally differs from the Figma file, and why.

## Assumed interaction states (not designed)

Figma only contains default states (plus active nav item, active tab, active theme option and the
selected option card). The following were added so the UI is usable and accessible:

| Element                              | Hover                   | Focus-visible                                  | Disabled                 |
| ------------------------------------ | ----------------------- | ---------------------------------------------- | ------------------------ |
| Primary buttons                      | `vermilion-deep` bg     | 2px vermilion ring, 2px offset                 | 40 % opacity, no pointer |
| Neutral / ghost / icon buttons       | `surface` or `paper` bg | same ring                                      | same                     |
| Nav items, review rows, option cards | `paper` / `surface` bg  | same ring                                      | —                        |
| Inputs / select                      | —                       | ring on the field box (`:has(:focus-visible)`) | 40 % opacity             |
| Segmented control tabs               | `paper` bg              | same ring                                      | —                        |

## Content and components that Figma does not define

- **Select dropdown menu** (Filter → Project): styled with the input chrome (white, 16px radius,
  subtle border, 48px items, `paper` highlight). Project options are placeholders from `src/mocks/projects.ts`.
- **Theme toggle**: the file contains a light theme only, so the moon/sun control keeps local state and
  does not switch themes.
- **Password visibility toggle**: the eye icon is a real toggle; the "shown" state dims the icon to 50 %.
- **Collapsed nav groups** (Review, Library, Insights) have no children in Figma; expanding them reveals nothing.
- **Review rows** are rendered as buttons (the trailing chevron implies navigation); the target screen is not designed.
- **Dialog close** — the close icon is a 24px hit-area in Figma; it is rendered as a button with the same footprint.

## Rendering compromises

- **Logo wordmark**: Figma uses live _Helvetica Neue Medium_ text, which is not on Google Fonts. The
  wordmark is rendered with a `"Helvetica Neue", Helvetica, Arial` stack at the exact Figma sizes
  (29.54px sidebar, 32.82px auth). On macOS it is pixel-identical; on Windows/Linux it falls back to
  Arial. Replace `Logo.tsx` with an outlined SVG export of node `1:2788` for full parity.
- **Promo dashboard preview** (`1:2467`): Figma places a 0.694-scale, slightly skewed copy of the
  dashboard inside the vermilion panel. It is re-rendered from the real components with an affine matrix
  fitted to six landmarks on the Figma render (residuals ≤ 5px). Fonts inside the preview are live text,
  so sub-pixel rasterisation differs from Figma's export.
- **Chart data**: the charts are static artwork in Figma; bar heights were measured from the frames and
  stored as approximate values (`src/mocks/dashboard.ts`). The hatched "inactive" bars use an SVG
  pattern (2px `#E7E7E7` lines on a 4px period, rotated 20°) instead of Figma's 100-line vector group.
- **Chart axis labels**: positioned on the grid lines (Figma's label column is offset ≈3–4px from the
  lines because it is a separate auto-layout column).
- **Review list separators**: 1px hairlines drawn with pseudo-elements so the card keeps Figma's
  288px height (a real `border-top` would add 2px).
- **Sign Up "Login" button** and the copy typos ("Shippments", "at_risk", "Get Started New") are
  reproduced verbatim — Figma is the source of truth.

## Responsive behaviour (Figma is desktop-1440 only)

| Width       | Behaviour                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------- |
| ≥ 1280      | Exact Figma layout; content stretches fluidly beyond 1440                                   |
| 1024 – 1279 | Stat cards wrap 2-up, charts stack; promo panel hidden, auth card fills the viewport        |
| < 1024      | Sidebar becomes a drawer opened from a menu button in the topbar; user name/role hide < 768 |
| < 640       | Stat cards 1-up; theme toggle hidden; modal option cards stack                              |

## Accessibility / contrast findings (kept as designed)

- `paper` text on `vermilion` (buttons, active theme option) ≈ **3.3 : 1** — fails WCAG AA for 16–18px text.
- `graphite` at 40 % on `paper` (placeholders, "Observer") ≈ **3.2 : 1** — fails AA.
- `graphite` at 50–60 % (labels, descriptions) ≈ 4.6–6 : 1 — passes.
- Badge text (`#3D73CA` / `#D8402A` on 8 % tints) ≈ 4.6 : 1 / 4.1 : 1 — passes / borderline.

These colours were not changed; fix them in `src/styles/tokens.css` if the design is updated.
