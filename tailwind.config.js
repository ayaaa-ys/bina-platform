/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#4B5563',
          dark: '#111827',
          light: '#6B7280',
        },
        corporate: {
          gray: '#F4F6F9',
          border: '#D6DCE5',
          text: '#2C3E50',
          muted: '#7F8C8D',
        },
        status: {
          orange: '#E67E22',
          green: '#27AE60',
          red: '#E74C3C',
          blue: '#2980B9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '2xs': '0.65rem',
        xs: '0.75rem',
        sm: '0.8125rem',
        base: '0.875rem',
        lg: '1rem',
        xl: '1.125rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '1.875rem',
        '5xl': '2.25rem',
      },
      spacing: {
        '0.5': '0.125rem',
        '1': '0.25rem',
        '1.5': '0.375rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        'panel': '0 2px 8px rgba(0,0,0,0.08)',
        'modal': '0 8px 32px rgba(0,0,0,0.12)',
        'dropdown': '0 4px 16px rgba(0,0,0,0.10)',
      },
      borderRadius: {
        'none': '0',
        'sm': '2px',
        DEFAULT: '3px',
        'md': '4px',
        'lg': '6px',
        'full': '9999px',
      }
    },
  },
  plugins: [],
};
