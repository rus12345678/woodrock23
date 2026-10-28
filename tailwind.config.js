/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#161617',
          graphite: '#232326',
          charcoal: '#333336',
          muted: '#6E6E73',
          lightgray: '#F5F5F7',
          surface: '#FAFAFB',
          border: '#E5E5EA',
          borderLight: '#ECECEE',
          wood: '#A57C52',
          woodHover: '#8C6741',
          stone: '#787880',
          accent: '#1D1D1F',
        }
      },
      fontFamily: {
        sans: [
          'SF Pro Display',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif'
        ],
      },
      boxShadow: {
        'subtle': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'premium': '0 12px 32px rgba(0, 0, 0, 0.06)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'hover': '0 20px 40px rgba(0, 0, 0, 0.09)',
        'modal': '0 24px 60px rgba(0, 0, 0, 0.16)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
