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

## Purchase Orders (Figma section 2)

- **Inter 500** was added to the Google Fonts load (`index.html`) — PO numbers, table headers and the
  parsed-summary emphasis use Inter Medium; the earlier screens only needed 400.
- **Stroke-inside padding**: Figma draws the 1px card/row borders inside their 18/24px padding, so
  bordered boxes use `border` + 17/23px tokens (`p-4.25`, `p-5.75`) to keep content on the design
  pixel; outline pills use `ring-1 ring-inset` so their box matches the filled pills.
- **20px eye glyphs** on watchlist rows sit inside 24px hit targets pulled in with `-m-0.5`
  (keyboard/pointer target size; the row keeps its designed 20px height).
- **Collapsed draft row** keeps the collapse chevron (the frame shows none) so it can be re-expanded.
- **Supplier-memory card** is 1px taller than the frame (real `h-px` divider vs Figma's zero-height line);
  the draft body is ~3px shorter and the result dialog 2px taller (browser vs Figma line metrics, audit #18).
- **Active nav label**: Chrome renders Manrope 500 ≈3px wider than Figma, so nav child rows drop to
  12px right padding — "Purchase Orders" would otherwise truncate; nothing occupies that space.
- **Result-dialog illustrations** were re-wrapped into 200 × 200 viewBoxes (Figma serves 167 × 158 /
  158 × 167 SVGs with `preserveAspectRatio="none"`, which would stretch in an `<img>`).
- **Derived data**: modal facts for PO - 1045/1047 and detail pages for tracker ids other than
  PO - 1051 are assembled from values visible elsewhere; unknown fields render "-".
- **Below ~900px** the watchlist row grid and the tracker table keep their fixed Figma columns and
  scroll horizontally inside their cards; the PO detail card stacks its two panels below `lg`.

## Action Queue and Sources (Figma sections 3–4)

- **Hovered inbox row**: the first row of each list is filled `surface` in Figma (1:22813, 1:23200); it is treated
  as the hover state, so nothing is selected on load.
- **Items without a designed detail** (Talon RFQ, escalations 2–4, the shipment, Delta/Talon/Meridian emails)
  reuse their own row text for the detail headline/subject; email bodies are empty and the meta line reads
  `Escalation · - · escalation`. No copy was invented.
- **Sources list shows four rows** (Delta, Talon, Meridian, Nova): the frame draws three under an "Unrouted (04)"
  heading and the detail frame is Nova's email, so Nova is appended. Its pager therefore reads "04 of 04"
  (Figma: "01 of 04"); the pager is positional within the Skipped tab.
- **Tabs**: only the Skipped tab carries a count (as designed). Other Sources tabs filter the same fixture and
  render a muted "No sources in this view." line when empty. Tab changes `replace` the history entry so Back
  leaves the screen.
- **Team table**: built as a real `<table>` with `th scope="col"` and `th scope="rowgroup"` group toggles
  (collapsible, `aria-expanded`); only the eye button is interactive. Figma's "-" in REF/Age cells and "12d" in
  the same item's detail meta are reproduced verbatim.
- **Detail toolbar**: Figma's 20px glyphs get 24px hit areas; padding is 22/21px so the toolbar stays 68px tall
  and icons land on the design's pixels. The 40 % chevron at "01 of N" is the `disabled` state.
- **Purchase-order ids** at `/review/action-queue/:itemId` render the PO detail (1:20501, built in the
  purchase-orders work) because Figma places that page under the Action Queue breadcrumb.
- **Hover colours** for the new `paper` button, `surface` buttons and pager controls are assumptions.
- **`chevron-right`** is one 24px-viewBox glyph rendered at 20px in the pager (stroke 1.5 → 1.25, as the
  existing `arrow-bottom` precedent in `Select`).
- **Text metrics**: Chromium lays out Manrope 18 at 24.6px per line and Inter 16 at 20px, while Figma rounds to
  25 and 19. Detail bodies are therefore 1–3px shorter than the frames and everything under a page heading
  sits 1px lower (the dashboard already has this offset). A global fix would be explicit per-size line-heights
  in `tailwind.config.ts`; it was not applied here to avoid shifting already-verified screens.
- **Focus management** on route change is not added (no `<Outlet>`, consistent with the rest of the app).
- **Responsive**: tabs scroll horizontally below their width; the Team table scrolls horizontally under 640px;
  the Sources aside stacks under the email below `xl`; routing-form rows stack below `sm`.

## Bill of Materials (Figma section 5)

- **Row actions** follow the list frames (eye + kebab menu, 1:18704 / 1:18915); the modal frames'
  backgrounds show an older inline eye / folder / trash variant, which is not built.
- **Folder and BOM dialogs are shared**: Figma only designs "Rename Folder" and "Delete Folder?", so
  the row menu's Rename / Delete reuse them with "Rename BOM" / "Delete BOM?" wording (assumed copy).
  "Create" and "Move" stay enabled over empty fields as drawn; empty submits are ignored.
- **Local state**: folders, renames, moves and deletes mutate `bomLibraryReducer` in the page. The
  flat, grouped and empty frames are the same page in three states; deleting everything reaches the
  empty state. The upload wizard's "Done" does not insert a row (no parts / date are designed).
- **Upload wizard** is one dialog whose content and width change per step (600 → 1000 → 425px) so
  focus, the overlay and focus restoration survive the flow. "Upload" proceeds without a file (no
  validation is designed). The nested New Folder dialog inside Move draws no second overlay.
- **Map Columns** omits the "Actions" column and eye buttons that Figma places at x960, outside the
  952px table (they are clipped in the frame as well).
- **Menus** are Radix dropdowns portaled over the page (the kebabs live inside horizontally
  scrolling tables); the highlighted row (`surface`) doubles as the keyboard focus state. A dialog
  opened from a menu item returns focus to the kebab through `useDisclosure.onOpen(opener)`.
- **Assembly tree** is a disclosure list (rows hold a checkbox and an eye button, so an ARIA `tree`
  would be incorrect). The trunk and ticks are `line` pseudo-elements, as in the sidebar; the 4px
  slate scrollbar is custom in Chromium / WebKit and falls back to `scrollbar-width: thin` in Firefox.
  Only the six drawn parts are transcribed, so the box scrolls less than the frame suggests.
- **Checkbox** checked state (graphite fill, paper check) is assumed; Figma draws the unchecked box only.
- **Library nav icon** stays `document` (earlier sections) although these frames use `work`; the
  BOM / Parts / Suppliers / Knowledge children are added with only BOM routed.
- **Derived detail**: list rows other than ROBOT-100 — EVT build open the same assembly under their own
  name and version; no other assembly is designed. Table descriptions keep Figma's literal
  "ROBOT-100 autono..." text.
- **Text metrics** (audit #18) put the 85px tree rows and 72px mapping rows within 1px of the frames.
- **Responsive**: the library, parts and mapping tables and the tree box keep their Figma columns and
  scroll horizontally inside their cards / dialog below ~1100px; header rows wrap; dialog widths are
  capped by the viewport.
