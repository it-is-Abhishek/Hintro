import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        surfaceAlt: 'var(--surface-alt)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        borderStrong: 'var(--border-strong)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        upgrade: 'var(--upgrade)',
        upgradeHover: 'var(--upgrade-hover)',
        navActive: 'var(--nav-active)',
        navActiveText: 'var(--nav-active-text)',
        text: 'var(--text)',
        subtle: 'var(--text-subtle)',
      },
      spacing: {
        sidebar: 'var(--sidebar-width)',
      },
      borderRadius: {
        token: 'var(--radius-md)',
        card: 'var(--radius-card)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        modal: 'var(--shadow-modal)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
