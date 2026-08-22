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
        4.5: '18px',
        13: '52px',
        26: '104px',
        70: '280px',
      },
      width: {
        search: '260px',
        'option-card': '318px',
        'auth-form': '500px',
        promo: '568px',
        'modal-md': '600px',
        'modal-lg': '700px',
        'auth-card': '800px',
      },
      height: {
        stat: '108px',
        'option-card': '173px',
        'chart-card': '388px',
        'auth-panel': '976px',
      },
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
