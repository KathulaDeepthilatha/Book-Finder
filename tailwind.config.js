/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.1)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.15)',
      },
      keyframes: {
        'slide-in': {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.3s ease-out forwards',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
