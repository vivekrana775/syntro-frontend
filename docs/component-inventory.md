# Component inventory

States listed as **assumed** are not designed in Figma; see `docs/deviation-report.md`.

## Primitives — `src/components/ui`

| Component          | File                   | Figma refs                      | Variants / props                                                                                                                       | States                                        |
| ------------------ | ---------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `Button`           | `Button.tsx`           | 1:2820, 1:1067, 1:1338, 1:1709  | `variant: primary \| neutral \| ghost`; `size: md(48) \| lg(56)`; `fullWidth`; `leadingIcon` / `trailingIcon`                          | default, hover*, focus*, disabled*            |
| `IconButton`       | `IconButton.tsx`       | 1:1147, 1:1162, 1:1705, 1:2827… | `variant: paper \| outline \| graphite \| facebook \| plain`; `size: 24 \| 48 \| 52 \| 56`; `shape: pill \| md`; `aria-label` required | default, hover*, focus*, disabled*            |
| `Icon`             | `Icon.tsx`             | COCO/Line/* exports             | `name: IconName` (25 icons); `size: 18 \| 20 \| 24`; `currentColor`                                                                    | —                                             |
| `IconChip`         | `IconChip.tsx`         | 1:1170, 1:1716                  | `tone: surface \| neutral`                                                                                                             | —                                             |
| `Input`            | `Input.tsx`            | 1:2806, 1:2811                  | `trailingAddon` (56×56 slot), `invalid`, `fieldClassName`                                                                              | default, focus*, disabled*, invalid*          |
| `PasswordInput`    | `PasswordInput.tsx`    | 1:2811 + 1:2817                 | eye toggle with local `visible` state                                                                                                  | hidden / shown                                |
| `SearchInput`      | `SearchInput.tsx`      | 1:1482                          | `label` (visually hidden), `placeholder`                                                                                               | default, focus*                               |
| `Select`           | `Select.tsx`           | 1:2424                          | Radix Select; `options`, `placeholder`, controlled `value` (`""` shows placeholder)                                                    | closed, open*, focus*, disabled*              |
| `Label`            | `Label.tsx`            | 1:2805                          | `htmlFor` required                                                                                                                     | —                                             |
| `FormField`        | `FormField.tsx`        | 1:2804, 1:2808                  | `label`, `htmlFor`, `footer`                                                                                                           | —                                             |
| `SegmentedControl` | `SegmentedControl.tsx` | 1:2798                          | generic `options`, controlled `value`; roving tabs with arrow keys                                                                     | active / inactive, hover*, focus*             |
| `Badge`            | `Badge.tsx`            | 1:1348, 1:1370                  | `tone: info \| urgent`                                                                                                                 | —                                             |
| `Card`             | `Card.tsx`             | 1:1166, 1:1228, 1:1343          | `padding: md \| none`                                                                                                                  | —                                             |
| `StatCard`         | `StatCard.tsx`         | 1:1166                          | `value`, `label`, `icon`                                                                                                               | —                                             |
| `Avatar`           | `Avatar.tsx`           | 1:1152                          | `src`, `srcSet`, `alt`                                                                                                                 | —                                             |
| `Divider`          | `Divider.tsx`          | 1:1150, 1:2823                  | `orientation: horizontal \| vertical`                                                                                                  | —                                             |
| `Logo`             | `Logo.tsx`             | 1:1060, 1:2788                  | `size: sidebar \| auth`                                                                                                                | —                                             |
| `Dialog*`          | `Dialog.tsx`           | 1:1700, 1:1701, 1:2410          | Radix wrappers: `DialogContent size: md(600) \| lg(700)`, `DialogHeader/Title/Description/Footer/Close`                                | open / closed; focus trap, ESC, overlay click |
| `OptionCard`       | `OptionCard.tsx`       | 1:1715, 1:1722                  | `icon`, `title`, `description`, `selected` (`role="radio"`)                                                                            | selected / default, hover*, focus*            |
| `BarChart`         | `BarChart.tsx`         | 1:1237, 1:1297                  | `mode: diverging \| single`, `yTicks`, `domain`, `data` (emphasis + tooltip)                                                           | static                                        |
| `ThemeToggle`      | `ThemeToggle.tsx`      | 1:1138                          | controlled `value: light \| dark`                                                                                                      | active / inactive, hover*, focus*             |

\* assumed state.

## Layout — `src/components/layout`

| Component        | File                 | Figma refs     | Notes                                                             |
| ---------------- | -------------------- | -------------- | ----------------------------------------------------------------- |
| `NavItem`        | `NavItem.tsx`        | 1:1072, 1:1088 | Link (`NavLink`) or button; `active`, `dim`, `trailing`           |
| `NavGroup`       | `NavGroup.tsx`       | 1:1079         | Expand/collapse with tree connector; `defaultOpen`                |
| `Sidebar`        | `Sidebar.tsx`        | 1:1058         | Logo, "New Order" CTA, nav tree                                   |
| `Topbar`         | `Topbar.tsx`         | 1:1135         | Title, theme toggle, notifications, user pill; menu button `<lg`* |
| `AppLayout`      | `AppLayout.tsx`      | 1:1057         | Sidebar + topbar + `<main>`; drawer below `lg`*                   |
| `AuthLayout`     | `AuthLayout.tsx`     | 1:2465         | Paper card + promo panel; promo hidden below `xl`*                |
| `AuthPromoPanel` | `AuthPromoPanel.tsx` | 1:2466         | Headline + `preview` slot                                         |

## Feature composites

| Component            | File                                        | Figma refs     |
| -------------------- | ------------------------------------------- | -------------- |
| `AuthPanel`          | `auth/AuthPanel.tsx`                        | 1:2787         |
| `AuthHeading`        | `auth/AuthHeading.tsx`                      | 1:2795         |
| `AuthForm`           | `auth/AuthForm.tsx`                         | 1:2803, 1:3169 |
| `SocialLogin`        | `auth/SocialLogin.tsx`                      | 1:2822, 1:2826 |
| `AuthFooter`         | `auth/AuthFooter.tsx`                       | 1:2839         |
| `DashboardContent`   | `dashboard/DashboardContent.tsx`            | 1:1157         |
| `DashboardHeader`    | `dashboard/DashboardHeader.tsx`             | 1:1158, 1:1481 |
| `StatsGrid`          | `dashboard/StatsGrid.tsx`                   | 1:1165, 1:1201 |
| `ChartCard`          | `dashboard/ChartCard.tsx`                   | 1:1228, 1:1288 |
| `ReviewSection`      | `dashboard/ReviewSection.tsx`               | 1:1334         |
| `ReviewList` / `Row` | `dashboard/ReviewList.tsx`, `ReviewRow.tsx` | 1:1343, 1:1344 |
| `NewOrderModal`      | `dashboard/NewOrderModal.tsx`               | 1:1701         |
| `FilterModal`        | `dashboard/FilterModal.tsx`                 | 1:2410         |
| `DashboardPreview`   | `dashboard/DashboardPreview.tsx`            | 1:2467         |
