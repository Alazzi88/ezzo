/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── Claude-inspired warm copper palette ──────────────────────────
      // Overrides Tailwind's default orange so ALL existing `orange-*`
      // classes automatically pick up the warm-copper tones site-wide.
      colors: {
        orange: {
          50:  '#fdf6f0',
          100: '#faeadd',
          200: '#f5d0b5',
          300: '#edb080',
          400: '#e8956a',   // main warm accent (replaces orange-400)
          500: '#d4845a',   // primary copper     (replaces orange-500)
          600: '#b86840',   // darker copper      (replaces orange-600)
          700: '#9a5230',
          800: '#7a3e22',
          900: '#5c2e18',
          950: '#3a1b0c',
        },
        // Keep amber warm but slightly muted — used for gold accents
        amber: {
          50:  '#fffbf0',
          100: '#fef3d0',
          200: '#fde89a',
          300: '#f9d668',
          400: '#e8c145',   // warm gold
          500: '#c9a84c',   // deep gold (replaces amber-500)
          600: '#a8882e',
          700: '#86681a',
          800: '#644d0e',
          900: '#423208',
          950: '#261d02',
        },
      },
      // Background / body color
      backgroundColor: {
        'site': '#0d0b09',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'zoom-in': 'zoomIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

