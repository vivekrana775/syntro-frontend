# Phase 0 — Design audit

Source of truth: Figma file `FGA0sH1rkffLXq1NJIFLRR`, section `1:26712` ("Section 1"). All frames are
**Desktop 1440 × 1024**; the file contains no other breakpoints.

## 0.1 Design tokens

### Colour (palette frame `1:2432` + observed values)

| Token            | Hex / value            | Usage                                                            |
| ---------------- | ---------------------- | ---------------------------------------------------------------- |
| `graphite`       | `#16181D`              | Text, dark buttons, active tab, tooltips                         |
| `slate`          | `#5B636D`              | "Forgot Password?"                                               |
| `vermilion`      | `#EE4B34`              | Primary actions, active nav text, highlighted bars, promo bg     |
| `vermilion-deep` | `#D8402A`              | Urgent badge; assumed primary hover                              |
| `paper`          | `#F7F5F3`              | Cards, pills, auth card, text on vermilion                       |
| `surface`        | `#F1EFEC`              | Icon chips, segmented-control track, auth page background        |
| `neutral`        | `#F7F7F7`              | Cancel/Reset buttons, option-card icon chip                      |
| `white`          | `#FFFFFF`              | App page background, modal surface                               |
| `blue`           | `#3D73CA`              | Info badge text/dot (bg at 8 %)                                  |
| `facebook`       | `#1C78F1`              | Facebook social button                                           |
| `line`           | `#D5D5D5`              | Nav tree connector                                               |
| `hatch`          | `#E7E7E7`              | Chart hatch lines                                                |
| `border-subtle`  | `rgba(22,24,29,0.08)`  | Inputs, sidebar/topbar borders, separators, option card          |
| `overlay`        | `rgba(22,24,29,0.6)`   | Modal backdrop                                                   |
| text emphasis    | graphite @ 40/50/60/80 | Placeholders (40), stat labels (50), subtitles (60), labels (80) |

### Typography (letter-spacing −2 % everywhere unless noted; line-height "auto")

| Style         | Family / weight    | Size        | Where                                               |
| ------------- | ------------------ | ----------- | --------------------------------------------------- |
| `4xl`         | Manrope 700        | 40          | Chart metric (`$ 100K`)                             |
| `3xl`         | Manrope 700        | 32 (−4 %)   | Auth promo headline                                 |
| `2xl`         | Manrope 600        | 24          | Auth headings, dashboard greeting                   |
| `2xl` medium  | Manrope 500        | 24          | Stat values                                         |
| `xl` semibold | Manrope 600        | 20          | Modal titles, "Needs your review"                   |
| `xl` medium   | Manrope 500        | 20          | Topbar title, chart titles, option-card titles      |
| `lg` medium   | Manrope 500        | 18          | Form labels, 56 px buttons                          |
| `lg` body     | Inter 400          | 18          | Auth subtitle, inputs, footer                       |
| `base` medium | Manrope 500        | 16          | 48 px buttons, active nav, user name, review titles |
| `nav`         | Manrope 400        | 16 / lh 1.3 | Sidebar nav items                                   |
| `base` body   | Inter 400          | 16          | Descriptions, stat labels, tooltip text             |
| `sm`          | Inter 400          | 14          | Review descriptions; "Observer" (−4 %)              |
| `xs`          | Inter 400          | 12          | Badges, chart axes                                  |
| logo wordmark | Helvetica Neue 500 | 29.5 / 32.8 | "Syntro" (see deviations)                           |

### Radii, spacing, elevation

- Radii: 8 (On Order tooltip) · 12 (bars, % tooltip) · 16 (inputs, option cards, filter button) · 24 (nav items, modals) · 32 (cards, auth panels) · 40 (pills, buttons, chips).
- Spacing scale in use: 4 6 8 10 12 16 18 20 24 28 32 40 (+ 150 px auth-card horizontal padding, a one-off).
- Layout: sidebar 280, topbar 104, content padding 24, grid gap 24, auth outer padding 24.
- Sizes: buttons 48/56 · icons 18/20/24 · icon chips 48 · avatar 48 · social buttons 56 · filter button 52 · search pill 260 × 52 · stat card 108 h · chart card 544 × 388 · modals 700 / 600 · auth card 800 × 976 · promo panel 568 × 976.
- Shadows: auth card `0 0 40px rgba(0,0,0,.04)`; chart tooltip dot `0 2px 2px / 0 2px 4px rgba(50,50,71,.06)`.
- Z-layers: overlay 40, modal 50.

## 0.2 Component inventory

See `docs/component-inventory.md` (generated in Phase 4) for the implemented list. Planned primitives:
Button, IconButton, Icon, IconChip, Input, PasswordInput, SearchInput, Select, Label, FormField,
SegmentedControl, Badge, Card, StatCard, Avatar, Divider, Logo, Dialog, OptionCard, BarChart,
ThemeToggle; layout: Sidebar, NavItem, NavGroup, Topbar, AppLayout, AuthLayout, AuthPromoPanel;
feature composites for auth and dashboard.

Figma supplies **default** state only, plus: active nav item, active segmented tab, active theme
toggle, selected option card. Hover / focus / disabled states are not designed.

## 0.3 Screen inventory

| Figma frame             | Route        | Layout     | Composition                                                           |
| ----------------------- | ------------ | ---------- | --------------------------------------------------------------------- |
| `1:2465` Sign In        | `/sign-in`   | AuthLayout | Logo, heading, segmented control, Email + Password, Login, social row |
| `1:2840` Sign Up        | `/sign-up`   | AuthLayout | Same; Name + Email + Password, no "Forgot Password?"                  |
| `1:1057` / `1:746` Main | `/dashboard` | AppLayout  | Greeting + search + filter, 4 + 3 stat cards, 2 charts, review list   |
| `1:1376` Add Order v1   | `/dashboard` | modal      | "What do you need to source?" — two option cards                      |
| `1:2085` Filter         | `/dashboard` | modal      | "Filter" — Project select                                             |

`1:1731` Add Order v2 (stacked cards) is intentionally **not** built (user decision).

## 0.4 Ambiguities and assumptions

| #   | Ambiguity                                                           | Assumption taken                                                                                                              |
| --- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 1   | No hover / focus / disabled / pressed states                        | Primary hover → `vermilion-deep`; neutral/nav hover → `paper`/`surface`; focus → 2 px vermilion ring; disabled → 40 % opacity |
| 2   | "Search..." pill only appears on the modal frames, not on `Main`    | Included on the dashboard header (3 of 4 dashboard frames show it; user confirmed)                                            |
| 3   | Logo wordmark uses Helvetica Neue (not available on Google Fonts)   | Rendered with a `Helvetica Neue → Helvetica → Arial` stack; swap for an outlined SVG when provided                            |
| 4   | Promo panel dashboard preview (`1:2467`) is a rotated/scaled clone  | Re-rendered from the real dashboard components with a transform tuned against the Figma screenshot                            |
| 5   | Chart bar values are not labelled                                   | Heights reverse-engineered from the frames; stored in mocks as approximations                                                 |
| 6   | Select dropdown menu is not designed                                | Menu styled with the input chrome (white, radius 16, subtle border, 48 px items)                                              |
| 7   | Theme toggle has no dark theme anywhere in the file                 | Toggle keeps local state only; app stays light                                                                                |
| 8   | Desktop-only file                                                   | ≥1280 exact; 1024–1279 stat rows wrap 2-up and charts stack; <1024 sidebar becomes a drawer and the promo panel hides         |
| 9   | Sign Up button reads "Login"; "Shippments", "at_risk" typos         | Copied verbatim — Figma is the source of truth                                                                                |
| 10  | Paper-on-vermilion text (~3.3:1) and 40 % placeholders fail WCAG AA | Kept as designed; reported in the deviation report                                                                            |
