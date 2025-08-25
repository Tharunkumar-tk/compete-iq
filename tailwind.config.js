/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // CompeteIQ Brand Colors
        'compete': {
          'dark': '#1F1427',      // Primary Background
          'purple': '#9333EA',     // Primary Accent
          'green': '#22CC88',      // Secondary Accent
          'red': '#EF4444',        // Alert Color
          'indigo': '#5B21B6',     // Cards
          'white': '#FFFFFF',      // Text
          'gray': '#6B7280',       // Secondary Text
          'light': '#F3F4F6'       // Light backgrounds
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #9333EA' },
          '100%': { boxShadow: '0 0 20px #9333EA, 0 0 30px #9333EA' },
        }
      }
    },
  },
  plugins: [],
};