import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // ── Claude-inspired warm copper palette ──────────────────
        orange: {
          50:  '#fdf6f0',
          100: '#faeadd',
          200: '#f5d0b5',
          300: '#edb080',
          400: '#e8956a',
          500: '#d4845a',
          600: '#b86840',
          700: '#9a5230',
          800: '#7a3e22',
          900: '#5c2e18',
          950: '#3a1b0c',
        },
        amber: {
          50:  '#fffbf0',
          100: '#fef3d0',
          200: '#fde89a',
          300: '#f9d668',
          400: '#e8c145',
          500: '#c9a84c',
          600: '#a8882e',
          700: '#86681a',
          800: '#644d0e',
          900: '#423208',
          950: '#261d02',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
