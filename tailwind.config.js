/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './sap-support.html',
    './assets/script.js',
    './assets/support.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      colors: {
        ink: {
          50:  '#F5F7FB',
          100: '#E6EBF5',
          200: '#C5CEE3',
          400: '#7A86A8',
          600: '#39456B',
          800: '#131C3A',
          900: '#0B1437',
          950: '#070C26',
        },
        brand: {
          primary: '#3B5BFF',
          indigo:  '#6366F1',
          purple:  '#8B5CF6',
          cyan:    '#06B6D4',
          mint:    '#22D3EE',
        },
      },
      boxShadow: {
        'glow':   '0 20px 60px -20px rgba(99,102,241,0.45)',
        'card':   '0 10px 30px -12px rgba(11,20,55,0.15)',
        'cardLg': '0 24px 60px -20px rgba(11,20,55,0.25)',
      },
      animation: {
        'blob':       'blob 14s infinite',
        'float':      'float 6s ease-in-out infinite',
        'fade-up':    'fadeUp 0.7s ease-out forwards',
        'gradient-x': 'gradientX 8s ease infinite',
      },
      keyframes: {
        blob: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(30px,-50px) scale(1.1)' },
          '66%':     { transform: 'translate(-20px,20px) scale(0.9)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradientX: {
          '0%,100%': { 'background-position': '0% 50%' },
          '50%':     { 'background-position': '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
