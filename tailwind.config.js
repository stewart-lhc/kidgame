/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFE16B', // Sunny yellow
          DEFAULT: '#FFB627', // Warm orange
          dark: '#FF8811', // Deep orange
        },
        secondary: {
          light: '#9CE37D', // Light green
          DEFAULT: '#31CD31', // Bright green
          dark: '#2BA52B', // Deep green
        },
        accent: {
          purple: '#9B6DFF', // Playful purple
          pink: '#FF6B9B', // Soft pink
          blue: '#4DC4FF', // Sky blue
        },
        background: '#F0F7FF', // Soft blue background
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      fontSize: {
        'kid-xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '0.025em' }],
        'kid-2xl': ['2rem', { lineHeight: '2.5rem', letterSpacing: '0.025em' }],
      },
      boxShadow: {
        'kid': '0 4px 0 0 rgba(0, 0, 0, 0.1)',
        'kid-lg': '0 6px 0 0 rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};