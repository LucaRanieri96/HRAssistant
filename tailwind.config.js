/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brandBlue: '#2563eb',
        brandBlueDark: '#1d4ed8',
        brandYellow: '#facc15',
        brandGray: '#0f172a',
      },
      boxShadow: {
        elevated: '0 20px 50px -12px rgba(0,0,0,0.25)',
      },
    },
  },
  plugins: [],
}
