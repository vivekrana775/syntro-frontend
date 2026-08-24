import type { Config } from 'tailwindcss';

/** Color channels live in `src/styles/tokens.css`; this keeps Tailwind alpha modifiers (`text-graphite/60`) working. */
const channel = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

/** Every Figma text style carries -2% letter-spacing and "auto" line-height unless noted. */
type FontSizeEntry = [string, { lineHeight: string; letterSpacing: string }];
const text = (
  size: number,
  opts: { lineHeight?: string; tracking?: string } = {},
): FontSizeEntry => [
  `${size}px`,
  { lineHeight: opts.lineHeight ?? 'normal', letterSpacing: opts.tracking ?? '-0.02em' },
];

/** Named element sizes from Figma, usable as w-*, max-w-*, min-w-*, h-* and min-h-*. */
const sizes = {
  search: '260px',
  'option-card': '318px',
  'modal-sm': '425px', // reply result dialogs (1:26422)
  'po-memory': '448px', // supplier memory panel (1:20603)
  'auth-form': '500px',
  'chart-card': '544px',
  promo: '568px',
  'modal-md': '600px',
  'po-facts': '652px', // PO detail facts list (1:20625)
  'modal-lg': '700px',
  'auth-card': '800px',
  'po-table': '1064px', // tracker table (1:20401)
  stat: '108px',
  'option-card-h': '173px',
  'chart-card-h': '388px',
  'po-detail-h': '628px', // PO detail card (1:20596)
  'auth-panel': '976px',
  // tracker table columns (1:20401); cell text sits 18px into every column
  'col-po': '162px',
  'col-supplier': '264px',
  'col-status': '187px',
  'col-promised': '136px',
  'col-total': '101px',
  'col-owner': '115px',
  // action-queue team table columns (1:22926); the Action column takes the remaining width
  'col-ref': '162px',
  'col-age': '216px',
  'col-actions': '99px',
  'review-table': '640px', // min width before the team table scrolls
  aside: '348px', // Sources detail "Skipped by agent" panel (1:23365)
  // Bill of Materials (1:26716)
  'bom-search': '219px', // outline search pill on the library and detail cards (1:18818)
  menu: '264px', // row / folder dropdown menu (1:18889)
  'modal-xl': '1000px', // Map Columns dialog (1:24088)
  'bom-table': '1064px', // library and parts tables (1:18826, 1:19709)
  'bom-empty-copy': '377px', // empty-state paragraph (1:19305)
  'bom-tree': '582px', // assembly tree scroll box (1:19453)
  'tree-row': '85px', // assembly tree child row (1:19471)
  'map-table': '952px', // Map Columns table (1:24104)
  'map-select': '268px', // Map Columns field selects (1:24117)
  // library table columns (1:18826); text at x 18 / 558 / 758 / 940
  'col-bom-name': '540px',
  'col-bom-parts': '200px',
  'col-bom-uploaded': '182px',
  // Map Columns table (1:24104); text at x 18 / 300 / 666
  'col-map-theirs': '282px',
  'col-map-sample': '366px',
  // parts table (1:19709); checkbox x18, then text at x 52 / 335 / 418 / 537 / 674 / 868
  'col-parts-select': '34px',
  'col-parts-part': '283px',
  'col-parts-rev': '83px',
  'col-parts-category': '119px',
  'col-parts-type': '137px',
  'col-parts-description': '194px',
  'col-parts-demand': '115px', // the eye action starts at x983
  'dialog-field': '552px', // single field inside a 600px dialog; kept at that width in Map Columns (1:24102)
  // Suppliers, Knowledge & Analytics (1:26718)
  'sup-table': '1064px', // approved table (1:21811)
  // approved table columns (1:21812); header text at x17, body text at x18
  'col-sup-name': '253px',
  'col-sup-email': '250px',
  'col-sup-hq': '76px',
  'col-sup-status': '97px',
  'col-sup-notes': '286px',
  'modal-wide': '800px', // New Supplier dialog (1:25607)
  'sup-explainer': '802px', // Discovered tab explainer paragraph (1:22487)
  'sup-vendor-id': '355px', // Reconcile NetSuite Vendor ID field (1:22665)
  'sup-notes': '162px', // supplier detail Notes box (1:26210)
  'know-table': '1064px', // knowledge table (1:23511)
  // knowledge table columns (1:23512); header text at x17, body text at x18
  'col-know-category': '171px',
  'col-know-memory': '452px',
  'col-know-evidence': '128px',
  'col-know-confidence': '151px',
  // Parts (1:26717)
  'part-table': '1064px', // parts library table (1:20919)
  // parts library table columns (1:20920); text at x 18 / 233 / 582 / 827 with 18px cell padding, the
  // eye action starts at x960 and Actions takes the remaining 122px (`col-parts-*` above is the BOM detail table)
  'col-part-number': '215px',
  'col-part-description': '349px',
  'col-part-supplier': '245px',
  'col-part-paid': '133px',
};

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px', // Figma design width
    },
    extend: {
      colors: {
        // Figma palette (frame 1:2432)
        graphite: channel('--c-graphite'),
        slate: channel('--c-slate'),
        vermilion: channel('--c-vermilion'),
        'vermilion-deep': channel('--c-vermilion-deep'),
        paper: channel('--c-paper'),
        surface: channel('--c-surface'),
        // supporting colors observed in the screens
        neutral: channel('--c-neutral'),
        blue: channel('--c-blue'),
        green: channel('--c-green'),
        amber: channel('--c-amber'),
        sand: channel('--c-sand'),
        facebook: channel('--c-facebook'),
        line: channel('--c-line'),
        umber: channel('--c-umber'),
        hatch: channel('--c-hatch'),
        // semantic aliases
        page: channel('--bg-page'),
        canvas: channel('--bg-canvas'),
        card: channel('--bg-card'),
        chip: channel('--bg-chip'),
        accent: channel('--accent'),
      },
      borderColor: {
        subtle: 'rgb(var(--c-graphite) / 0.08)',
      },
      backgroundColor: {
        overlay: 'rgb(var(--c-graphite) / 0.6)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        logo: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        xs: text(12),
        sm: text(14),
        'sm-tight': text(14, { tracking: '-0.04em' }), // "Observer" role label (1:1155)
        base: text(16),
        nav: text(16, { lineHeight: '1.3' }), // sidebar nav items
        lg: text(18),
        xl: text(20),
        '2xl': text(24),
        '3xl': text(32, { tracking: '-0.04em' }), // auth promo headline (1:2786)
        '4xl': text(40),
      },
      letterSpacing: {
        tight: '-0.02em',
        tighter: '-0.04em',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        pill: '40px',
      },
      spacing: {
        // Figma draws 1px strokes inside the padding: bordered boxes pad 1px less (17/23) so
        // their content lands on the same pixel as the design's 18/24.
        1.25: '5px', // parts table demand: quantity → unit gap (1:19730)
        1.75: '7px', // assembly root row: "Assembly • 19 Parts" dot gaps (1:19566)
        2.25: '9px', // assembly tree trunk: child indent 41 − tick reach 32 puts it at x24 (1:19455)
        3.75: '15px', // bordered 52px search pill: 16 - 1px border (1:18818)
        4.25: '17px',
        4.5: '18px',
        5.25: '21px', // bordered 68px detail toolbar: 22 + 24 + 21 + 1px border (1:26068)
        5.5: '22px', // detail toolbar: 24px hit areas around Figma's 20px glyphs (1:26068)
        5.75: '23px',
        13: '52px',
        18: '72px', // Map Columns rows (1:24111)
        21: '84px', // suppliers approved table rows (1:21819)
        6.75: '27px', // assembly tree rows: eye action inset from the row edge (1:19472)
        7.25: '29px', // assembly root row: eye action inset from the box content edge (1:19563)
        8.5: '34px', // assembly root subtitle indent = checkbox 18 + gap 16 (1:19562)
        10.25: '41px', // assembly tree child indent: rows start at x56 = 15 + 41 (1:19471)
        26: '104px',
        50: '200px', // result-dialog illustration box
        70: '280px',
      },
      gridTemplateColumns: {
        // watchlist rows (1:20017): PO# / vendor / meta / trailing / view action
        watchlist: '130px 378px 229px minmax(0, 1fr) auto',
        // PO detail modal facts (1:20254): label column, value starts at x333
        'modal-facts': '333px minmax(0, 1fr)',
        // assembly tree rows (1:19551, 1:19471): identity block, description at x681 of the box, eye action
        'bom-root': '666px minmax(0, 1fr) auto',
        'bom-child': '609px minmax(0, 1fr) auto',
      },
      width: sizes,
      maxWidth: sizes,
      minWidth: sizes,
      height: sizes,
      minHeight: sizes,
      boxShadow: {
        card: '0 0 40px 0 rgb(0 0 0 / 0.04)',
        menu: '0 0 12px 0 rgb(0 0 0 / 0.08)', // row / folder dropdown (1:18889)
        'tooltip-dot': '0 2px 2px 0 rgb(50 50 71 / 0.06), 0 2px 4px 0 rgb(50 50 71 / 0.06)',
      },
      zIndex: {
        overlay: '40',
        modal: '50',
      },
    },
  },
  plugins: [],
} satisfies Config;
