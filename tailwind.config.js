/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Background Colors
        'background-primary': 'oklch(2% 0 0)',
        'background-secondary': 'oklch(8.6% 0 0)',
        'background-tertiary': 'oklch(11.1% 0 0)',
        'background-components': 'oklch(18.2% 0 0)',

        // Accent Colors
        'accent-brand': 'oklch(66.5% 0.16 313.1)',
        pink: 'oklch(66.5% 0.16 313.1)',
        'brand-dark': 'oklch(50% 0.16 313.1)',
        'accent-orange': 'oklch(71.9% 0.16 80)',
        'accent-red': 'oklch(47.4% 0.19 30)',
        'accent-purple': 'oklch(47.4% 0.2 300)',
        'accent-blue': 'oklch(55.6% 0.16 260)',

        // Success Colors
        'success-green': '#15803D',
        'success-green-dark': '#166534',
        'success-green-light': '#F0FDF4',

        // Warning Colors
        'warning-yellow': '#A16207',
        'warning-yellow-light': '#FEFCE8',

        // Text Colors
        'base-gray-100': 'oklch(98.5% 0 120.2)',
        'base-gray-200': 'oklch(93.2% 0 120.2)',
        'base-gray-300': 'oklch(88% 0 120.2)',
        'base-gray-400': 'oklch(65.7% 0 120.2)',
        'base-gray-500': 'oklch(42.3% 0 120.2)',
        'base-gray-600': 'oklch(29.8% 0 120.2)',
        'base-gray-700': 'oklch(6.4% 0 120.2)',

        // Border Colors
        'border-primary': 'oklch(17.4% 0 0)',

        // Legacy support for shadcn/ui
        background: 'oklch(2% 0 0)',
        foreground: 'oklch(98.5% 0 120.2)',
        card: {
          DEFAULT: 'oklch(18.2% 0 0)',
          foreground: 'oklch(98.5% 0 120.2)',
        },
        popover: {
          DEFAULT: 'oklch(18.2% 0 0)',
          foreground: 'oklch(98.5% 0 120.2)',
        },
        primary: {
          DEFAULT: 'oklch(66.5% 0.16 313.1)',
          foreground: 'oklch(98.5% 0 120.2)',
        },
        secondary: {
          DEFAULT: 'oklch(8.6% 0 0)',
          foreground: 'oklch(98.5% 0 120.2)',
        },
        muted: {
          DEFAULT: 'oklch(11.1% 0 0)',
          foreground: 'oklch(65.7% 0 120.2)',
        },
        accent: {
          DEFAULT: 'oklch(66.5% 0.16 313.1)',
          foreground: 'oklch(98.5% 0 120.2)',
        },
        destructive: {
          DEFAULT: 'oklch(47.4% 0.19 30)',
          foreground: 'oklch(98.5% 0 120.2)',
        },
        border: 'oklch(17.4% 0 0)',
        input: 'oklch(25% 0 0)',
        ring: 'oklch(66.5% 0.16 313.1)',
        chart: {
          1: 'oklch(66.5% 0.16 313.1)',
          2: 'oklch(71.9% 0.16 80)',
          3: 'oklch(47.4% 0.19 30)',
          4: 'oklch(47.4% 0.2 300)',
          5: 'oklch(55.6% 0.16 260)',
        },
      },
      fontSize: {
        'text-xl': ['1.5rem', '140%'], // 24px
        'text-lg': ['1.25rem', '140%'], // 20px
        'heading-md': ['1rem', '140%'], // 16px
        'text-sm': ['0.875rem', '140%'], // 14px
        'text-xs': ['0.75rem', '140%'], // 12px
        'text-xxs': ['0.625rem', '140%'], // 10px
      },
      fontWeight: {
        regular: '400',
        bold: '700',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
