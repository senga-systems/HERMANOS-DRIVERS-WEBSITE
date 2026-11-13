/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#070c32',
          dark: '#04081e',
          light: '#0e1758',
          card: '#0a103c',
        },
        gold: {
          brand: '#f19e02',
          hover: '#d98c00',
          light: '#fef3c7',
        },
        yellow: {
          brand: '#f19e02',
          hover: '#d98c00',
        },
        green: {
          brand: '#39b54a',
          hover: '#2ea33e',
        },
        grey: {
          light: '#d9d9d9',
          bg: '#e5e7eb',
          card: '#d9d9d9',
          dark: '#2c2e35',
        },
        hermanos: {
          navy: '#070c32',
          gold: '#f19e02',
          green: '#39b54a',
          grey: '#d9d9d9',
          darkNavy: '#04081e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'hero': '0 20px 40px -15px rgba(7, 12, 50, 0.6)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
