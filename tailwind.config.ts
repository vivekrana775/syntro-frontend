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
        4.25: '17px',
        4.5: '18px',
        5.25: '21px', // bordered 68px detail toolbar: 22 + 24 + 21 + 1px border (1:26068)
        5.5: '22px', // detail toolbar: 24px hit areas around Figma's 20px glyphs (1:26068)
        5.75: '23px',
        13: '52px',
        26: '104px',
        50: '200px', // result-dialog illustration box
        70: '280px',
      },
      gridTemplateColumns: {
        // watchlist rows (1:20017): PO# / vendor / meta / trailing / view action
        watchlist: '130px 378px 229px minmax(0, 1fr) auto',
        // PO detail modal facts (1:20254): label column, value starts at x333
        'modal-facts': '333px minmax(0, 1fr)',
      },
      width: sizes,
      maxWidth: sizes,
      minWidth: sizes,
      height: sizes,
      minHeight: sizes,
      boxShadow: {
        card: '0 0 40px 0 rgb(0 0 0 / 0.04)',
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
