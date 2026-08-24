# Component inventory

States listed as **assumed** are not designed in Figma; see `docs/deviation-report.md`.

## Primitives — `src/components/ui`

| Component          | File                   | Figma refs                      | Variants / props                                                                                                                                                 | States                                        |
| ------------------ | ---------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `Button`           | `Button.tsx`           | 1:2820, 1:1067, 1:1338, 1:1709  | `variant: primary \| primary-deep \| neutral \| surface \| paper \| ghost`; `size: sm(36) \| md(48) \| lg(56)`; `fullWidth`; `leadingIcon` / `trailingIcon`      | default, hover*, focus*, disabled*            |
| `IconButton`       | `IconButton.tsx`       | 1:1147, 1:1162, 1:1705, 1:2827… | `variant: paper \| surface \| outline \| graphite \| white \| facebook \| plain`; `size: 24 \| 32 \| 48 \| 52 \| 56`; `shape: pill \| md`; `aria-label` required | default, hover*, focus*, disabled*            |
| `Icon`             | `Icon.tsx`             | COCO/Line/* exports             | `name: IconName` (40 icons); `size: 16 \| 18 \| 20 \| 24`; `currentColor`                                                                                        | —                                             |
| `Checkbox`         | `Checkbox.tsx`         | 1:19477, 1:19719                | native checkbox, 18px, `aria-label` required                                                                                                                     | unchecked, checked*, focus*, disabled*        |
| `Chip`             | `Chip.tsx`             | 1:22342, 1:26161                | 40px neutral tag chip, 12px radius; `label`, optional `onRemove` (20px close)                                                                                    | default, remove hover*                        |
| `DropdownMenu*`    | `DropdownMenu.tsx`     | 1:18889, 1:19125                | Radix wrappers: `DropdownMenuContent` (264px paper panel), `DropdownMenuItem icon?`                                                                              | closed / open, highlighted*, focus*           |
| `EmptyState`       | `EmptyState.tsx`       | 1:19269, 1:22049, 1:23633       | `media?`, `title`, `description` (may hold `\n`); `tone: display \| soft`; `mediaGap: md \| lg`                                                                  | —                                             |
| `FileInput`        | `FileInput.tsx`        | 1:23867                         | hidden `<input type="file">` inside the `Input` chrome; `placeholder`, `fileName`, `onFileChange`                                                                | empty / chosen, focus*, disabled*             |
| `IconChip`         | `IconChip.tsx`         | 1:1170, 1:1716                  | `tone: surface \| neutral`                                                                                                                                       | —                                             |
| `Input`            | `Input.tsx`            | 1:2806, 1:2811                  | `trailingAddon` (56×56 slot), `invalid`, `fieldClassName`                                                                                                        | default, focus*, disabled*, invalid*          |
| `PasswordInput`    | `PasswordInput.tsx`    | 1:2811 + 1:2817                 | eye toggle with local `visible` state                                                                                                                            | hidden / shown                                |
| `SearchInput`      | `SearchInput.tsx`      | 1:1482, 1:18818                 | `label` (visually hidden), `placeholder`; `tone: paper \| outline`; `width: md(260) \| sm(219)`                                                                  | default, focus*                               |
| `Select`           | `Select.tsx`           | 1:2424                          | Radix Select; `options`, `placeholder`, controlled `value` (`""` shows placeholder); `size: md(48) \| lg(56)`                                                    | closed, open*, focus*, disabled*              |
| `Label`            | `Label.tsx`            | 1:2805                          | `htmlFor` required                                                                                                                                               | —                                             |
| `FormField`        | `FormField.tsx`        | 1:2804, 1:2808                  | `label`, `htmlFor`, `footer`                                                                                                                                     | —                                             |
| `SegmentedControl` | `SegmentedControl.tsx` | 1:2798                          | generic `options`, controlled `value`; `tone: surface \| paper`; `fit: fill \| hug`; roving tabs with arrow keys                                                 | active / inactive, hover*, focus*             |
| `Textarea`         | `Textarea.tsx`         | 1:26210                         | multi-line field with the `Input` chrome; `invalid`                                                                                                              | default, focus*, disabled*, invalid*          |
| `Badge`            | `Badge.tsx`            | 1:1348, 1:1370                  | `tone: info \| urgent \| success \| warning \| danger \| neutral \| outline \| outline-strong \| paper`; `size: sm \| md \| lg`; `dot`                           | —                                             |
| `Card`             | `Card.tsx`             | 1:1166, 1:1228, 1:1343          | `padding: md \| none`                                                                                                                                            | —                                             |
| `StatCard`         | `StatCard.tsx`         | 1:1166                          | `value`, `label`, `icon`                                                                                                                                         | —                                             |
| `Avatar`           | `Avatar.tsx`           | 1:1152                          | `src`, `srcSet`, `alt`                                                                                                                                           | —                                             |
| `Divider`          | `Divider.tsx`          | 1:1150, 1:2823                  | `orientation: horizontal \| vertical`                                                                                                                            | —                                             |
| `Logo`             | `Logo.tsx`             | 1:1060, 1:2788                  | `size: sidebar \| auth`                                                                                                                                          | —                                             |
| `Dialog*`          | `Dialog.tsx`           | 1:1700, 1:1701, 1:2410          | Radix wrappers: `DialogContent size: sm(425) \| md(600) \| lg(700) \| wide(800) \| xl(1000)`, `overlay`, `DialogHeader/Title/Description/Footer/Close`           | open / closed; focus trap, ESC, overlay click |
| `OptionCard`       | `OptionCard.tsx`       | 1:1715, 1:1722                  | `icon`, `title`, `description`, `selected` (`role="radio"`)                                                                                                      | selected / default, hover*, focus*            |
| `BarChart`         | `BarChart.tsx`         | 1:1237, 1:1297                  | `mode: diverging \| single`, `yTicks`, `domain`, `data` (emphasis + tooltip)                                                                                     | static                                        |
| `ThemeToggle`      | `ThemeToggle.tsx`      | 1:1138                          | controlled `value: light \| dark`                                                                                                                                | active / inactive, hover*, focus*             |

\* assumed state.

Additions for the review screens: `Button` gains `variant: paper` (Sync Now, 1:23230); `Icon` gains
`arrow-left`, `chevron-left`, `refresh-double`, `time-circle` and is rendered at 16px inside the Team
table's eye buttons (`IconButton size={32} variant="surface"`); `SegmentedControl` is used with
`tone="paper" fit="hug"` for the page tabs (1:22826, 1:23215).

Additions for the Bill of Materials screens: `Badge` gains `size: lg` (32px version chips, 1:18836) and
tones `paper` (1:19575) and `outline-strong` (80 % revision chips, 1:19482); `Button` gains `size: sm`
(36px "New Folder", 1:25391); `Select` gains `size: md` (48px field selects, 1:24117); `DialogContent`
gains `size: xl` (1000px, 1:24088) and `overlay={false}` for the nested New Folder dialog;
`SearchInput` gains `tone: outline` and `width: sm` (219px, 1:18818); `Icon` gains `folder`,
`add-folder`, `upload`, `trash`, `more-vertical`, `edit-square`, `alert-circle`; `useDisclosure.onOpen`
accepts an explicit opener so dialogs launched from a menu item return focus to the kebab.

Additions for the suppliers, knowledge and analytics screens: new primitives `Chip` (1:22342),
`Textarea` (1:26210) and `EmptyState` (extracted from `BomEmptyState`, which now delegates to it;
`tone: soft` covers the Manrope-medium copy of 1:22506 / 1:23633); `DialogContent` gains
`size: wide` (800px, 1:25607); `IconButton` gains `variant: white` (contact-row actions on a neutral
card, 1:26185); `Icon` gains `chart` (Insights › Analytics nav, 1:23600); the palette gains `umber`
(#3D3936 — supplier names, 1:21821). `TagInput` and `ChipMultiSelect` stay feature-scoped in
`src/components/suppliers` until a second feature needs them.

## Layout — `src/components/layout`

| Component        | File                 | Figma refs               | Notes                                                                                              |
| ---------------- | -------------------- | ------------------------ | -------------------------------------------------------------------------------------------------- |
| `NavItem`        | `NavItem.tsx`        | 1:1072, 1:1088           | Link (`NavLink`) or button; `active`, `dim`, `trailing`                                            |
| `NavGroup`       | `NavGroup.tsx`       | 1:1079                   | Expand/collapse with tree connector; route-driven `initialOpen` from `Sidebar`, else `defaultOpen` |
| `Sidebar`        | `Sidebar.tsx`        | 1:1058                   | Logo, "New Order" CTA, nav tree                                                                    |
| `Topbar`         | `Topbar.tsx`         | 1:1135                   | Title or `breadcrumb` trail, theme toggle, notifications, user pill; menu button `<lg`*            |
| `Breadcrumb`     | `Breadcrumb.tsx`     | 1:20591                  | Ancestor links at 80 %, chevron separators, current page as the `<h1>`                             |
| `PageHeading`    | `PageHeading.tsx`    | 1:1158, 1:22823, 1:23226 | Title + subtitle row with a right-hand slot; composed by `DashboardHeader`                         |
| `AppLayout`      | `AppLayout.tsx`      | 1:1057                   | Sidebar + topbar + `<main>`; drawer below `lg`*                                                    |
| `AuthLayout`     | `AuthLayout.tsx`     | 1:2465                   | Paper card + promo panel; promo hidden below `xl`*                                                 |
| `AuthPromoPanel` | `AuthPromoPanel.tsx` | 1:2466                   | Headline + `preview` slot                                                                          |

## Feature composites

| Component                             | File                                                                                 | Figma refs                                     |
| ------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------- |
| `AuthPanel`                           | `auth/AuthPanel.tsx`                                                                 | 1:2787                                         |
| `AuthHeading`                         | `auth/AuthHeading.tsx`                                                               | 1:2795                                         |
| `AuthForm`                            | `auth/AuthForm.tsx`                                                                  | 1:2803, 1:3169                                 |
| `SocialLogin`                         | `auth/SocialLogin.tsx`                                                               | 1:2822, 1:2826                                 |
| `AuthFooter`                          | `auth/AuthFooter.tsx`                                                                | 1:2839                                         |
| `DashboardContent`                    | `dashboard/DashboardContent.tsx`                                                     | 1:1157                                         |
| `DashboardHeader`                     | `dashboard/DashboardHeader.tsx`                                                      | 1:1158, 1:1481                                 |
| `StatsGrid`                           | `dashboard/StatsGrid.tsx`                                                            | 1:1165, 1:1201                                 |
| `ChartCard`                           | `dashboard/ChartCard.tsx`                                                            | 1:1228, 1:1288                                 |
| `ReviewSection`                       | `dashboard/ReviewSection.tsx`                                                        | 1:1334                                         |
| `ReviewList` / `Row`                  | `dashboard/ReviewList.tsx`, `ReviewRow.tsx`                                          | 1:1343, 1:1344                                 |
| `NewOrderModal`                       | `dashboard/NewOrderModal.tsx`                                                        | 1:1701                                         |
| `FilterModal`                         | `dashboard/FilterModal.tsx`                                                          | 1:2410                                         |
| `DashboardPreview`                    | `dashboard/DashboardPreview.tsx`                                                     | 1:2467                                         |
| `SectionHeader`                       | `purchase-orders/SectionHeader.tsx`                                                  | 1:20013 (lg), 1:20615 (md)                     |
| `PurchaseOrdersHeader` / `PoTabs`     | `purchase-orders/PurchaseOrdersHeader.tsx`, `PoTabs.tsx`                             | 1:19997, 1:20006                               |
| `WatchlistRow` / `ViewPoButton`       | `purchase-orders/WatchlistRow.tsx`, `ViewPoButton.tsx`                               | 1:20017, 1:20021                               |
| `DraftFollowUpCard`                   | `purchase-orders/DraftFollowUpCard.tsx`                                              | 1:20016 expanded, 1:20196 collapsed            |
| `VerifyReplyCard`                     | `purchase-orders/VerifyReplyCard.tsx`                                                | 1:20043                                        |
| `AwaitingVendorRow`                   | `purchase-orders/AwaitingVendorRow.tsx`                                              | 1:20070                                        |
| `WatchlistPanel`                      | `purchase-orders/WatchlistPanel.tsx`                                                 | 1:20011                                        |
| `StatusPill` / `OwnerPill`            | `purchase-orders/StatusPill.tsx`, `OwnerPill.tsx`                                    | 1:20412, 1:20421 (tone maps in `@/types`)      |
| `TrackerTable` / `TrackerPanel`       | `purchase-orders/TrackerTable.tsx`, `TrackerPanel.tsx`                               | 1:20401, 1:20396                               |
| `PurchaseOrderDetailModal`            | `purchase-orders/PurchaseOrderDetailModal.tsx`                                       | 1:20239                                        |
| `ReplyResultDialog`                   | `purchase-orders/ReplyResultDialog.tsx`                                              | 1:26422 confirmed, 1:26659 rejected            |
| `PurchaseOrderDetailContent`          | `purchase-orders/PurchaseOrderDetailContent.tsx` (+ header, facts, timeline, memory) | 1:20501, 1:20619, 1:20625, 1:20597, 1:20607    |
| `InboxList` / `InboxRow`              | `review/InboxList.tsx`, `review/InboxRow.tsx`                                        | 1:22812, 1:22813, 1:23200                      |
| `DetailToolbar`                       | `review/DetailToolbar.tsx`                                                           | 1:26068 (back arrow, disabled pager ends)      |
| `DetailHeading`                       | `review/DetailHeading.tsx`                                                           | 1:26079, 1:23089                               |
| `EmailBody`                           | `review/EmailBody.tsx`                                                               | 1:26088, 1:23361                               |
| `Hairline`                            | `review/Hairline.tsx`                                                                | 1:26082, 1:23373 (zero-height 1px line)        |
| `NeedsYouList`                        | `action-queue/NeedsYouList.tsx`                                                      | 1:22810                                        |
| `TeamTable` / `TeamGroupRows`         | `action-queue/TeamTable.tsx`, `TeamGroupRows.tsx`                                    | 1:22922, 1:22932, 1:22966 (collapsible groups) |
| `InboundRfqDetail` / `RoutingForm`    | `action-queue/InboundRfqDetail.tsx`, `RoutingForm.tsx`                               | 1:26067, 1:26096                               |
| `TeamItemDetail`                      | `action-queue/TeamItemDetail.tsx`                                                    | 1:23077                                        |
| `SourceList`                          | `sources/SourceList.tsx`                                                             | 1:23197                                        |
| `SourceEmailDetail`                   | `sources/SourceEmailDetail.tsx`                                                      | 1:23334                                        |
| `SkippedAside`                        | `sources/SkippedAside.tsx`                                                           | 1:23365                                        |
| `BomLibraryToolbar`                   | `bom/BomLibraryToolbar.tsx`                                                          | 1:18817 (outlined search, new-folder button)   |
| `BomTable`                            | `bom/BomTable.tsx`                                                                   | 1:18826, 1:19049 (empty folder line)           |
| `BomRowMenu` / `FolderMenu`           | `bom/BomRowMenu.tsx`, `FolderMenu.tsx`                                               | 1:18889, 1:19125                               |
| `BomGroup`                            | `bom/BomGroup.tsx`                                                                   | 1:19038, 1:19057 (collapsible groups)          |
| `BomEmptyState`                       | `bom/BomEmptyState.tsx`                                                              | 1:19269                                        |
| `NameDialog`                          | `bom/NameDialog.tsx`                                                                 | 1:25141 new, 1:24392 rename                    |
| `MoveBomDialog`                       | `bom/MoveBomDialog.tsx`                                                              | 1:25368 (nests `NameDialog`)                   |
| `DeleteDialog`                        | `bom/DeleteDialog.tsx`                                                               | 1:24878                                        |
| `UploadBomDialog` / `MapColumnsTable` | `bom/UploadBomDialog.tsx`, `MapColumnsTable.tsx`                                     | 1:23853, 1:24088, 1:24620 (one wizard dialog)  |
| `BomDetailHeader`                     | `bom/BomDetailHeader.tsx`                                                            | 1:19570                                        |
| `BomTree` / `BomTreeRow`              | `bom/BomTree.tsx`, `BomTreeRow.tsx`                                                  | 1:19453, 1:19551 root, 1:19471 part rows       |
| `PartsTable`                          | `bom/PartsTable.tsx`                                                                 | 1:19709                                        |
| `SuppliersHeader`                     | `suppliers/SuppliersHeader.tsx`                                                      | 1:21910                                        |
| `SupplierTabs`                        | `suppliers/SupplierTabs.tsx`                                                         | 1:21919 (zero-padded counts)                   |
| `SuppliersToolbar`                    | `suppliers/SuppliersToolbar.tsx`                                                     | 1:21903, 1:21907                               |
| `SuppliersTable`                      | `suppliers/SuppliersTable.tsx`                                                       | 1:21811 (84px rows)                            |
| `SuppliersEmptyState`                 | `suppliers/SuppliersEmptyState.tsx`                                                  | 1:22049                                        |
| `FilterDialog` / `ChipMultiSelect`    | `suppliers/FilterDialog.tsx`, `ChipMultiSelect.tsx`                                  | 1:22327, 1:22341                               |
| `NewSupplierDialog`                   | `suppliers/NewSupplierDialog.tsx`                                                    | 1:25607                                        |
| `SupplierDetailDialog`                | `suppliers/SupplierDetailDialog.tsx`                                                 | 1:25660, 1:26137 (scrolling full view)         |
| `TagInput`                            | `suppliers/TagInput.tsx`                                                             | 1:25658 empty, 1:26160 chip + typed text       |
| `ContactRow` / `ContactForm`          | `suppliers/ContactRow.tsx`, `ContactForm.tsx`                                        | 1:26177, 1:26193                               |
| `DiscoveredPanel`                     | `suppliers/DiscoveredPanel.tsx`                                                      | 1:22486, 1:22497, 1:22506                      |
| `ReconcilePanel` / `MissingInfoRow`   | `suppliers/ReconcilePanel.tsx`, `MissingInfoRow.tsx`                                 | 1:22631, 1:22658, 1:22699 (inline chip row)    |
| `KnowledgeTable`                      | `knowledge/KnowledgeTable.tsx`                                                       | 1:23511                                        |
