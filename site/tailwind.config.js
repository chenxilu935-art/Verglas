/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['KaiTi', '楷体', 'serif'],
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 24px 80px rgba(59,130,246,0.24)',
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top left, rgba(59,130,246,0.28), transparent 24%), radial-gradient(circle at bottom right, rgba(139,92,246,0.2), transparent 28%)',
      },
    },
  },
  plugins: [],
}

