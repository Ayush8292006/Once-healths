/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // RGB-channel variables so opacity modifiers (bg-ink/90, text-surface/70 …) work
        bg: 'rgb(var(--bg-rgb) / <alpha-value>)',
        surface: 'rgb(var(--surface-rgb) / <alpha-value>)',
        ink: {
          DEFAULT: 'rgb(var(--ink-rgb) / <alpha-value>)',
          muted: 'rgb(var(--ink-muted-rgb) / <alpha-value>)',
        },
        line: 'rgb(var(--line-rgb) / <alpha-value>)',
        brand: {
          green: 'rgb(var(--brand-green-rgb) / <alpha-value>)',
        },
        women: 'rgb(var(--women-rgb) / <alpha-value>)',
        men: 'rgb(var(--men-rgb) / <alpha-value>)',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.02em',
        eyebrow: '0.12em',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(33, 29, 29, 0.05), 0 2px 6px -1px rgba(33, 29, 29, 0.03)',
        'card': '0 10px 30px -5px rgba(33, 29, 29, 0.06), 0 4px 10px -2px rgba(33, 29, 29, 0.04)',
        'lift': '0 20px 40px -10px rgba(33, 29, 29, 0.12), 0 8px 16px -4px rgba(33, 29, 29, 0.06)',
      },
      borderRadius: {
        'brand': '6px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.35s ease-out both',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}

