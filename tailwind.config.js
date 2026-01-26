/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary (blu)
        primary: {
          50: '#e8f0fa',
          100: '#b9cfef',
          200: '#97b8e8',
          300: '#6798dd',
          400: '#4984d6',
          500: '#1c65cc',
          600: '#195cba',
          700: '#144891',
          800: '#897a00',
          900: '#0c2a56',
        },
        // Secondary (giallo)
        secondary: {
          50: '#fefaed',
          100: '#fdefc6',
          200: '#fce7aa',
          300: '#fadc83',
          400: '#f9d56b',
          500: '#f8cb46',
          600: '#e2b940',
          700: '#b09032',
          800: '#887027',
          900: '#68551d',
        },
        // Neutral
        neutral: {
          50: '#fafbfb',
          100: '#f5f6f7',
          200: '#e0e3e7',
          300: '#c3c9d0',
          400: '#9ba5b0',
          500: '#7e8b99',
          600: '#617183',
          700: '#47596e',
          800: '#2a4058',
          900: '#102843',
        },
      },
      fontFamily: {
        sans: ['Source Sans 3', 'sans-serif'],
      },
      fontSize: {
        // Display
        'display-1': ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-2': ['56px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        // Headings
        h3: ['44px', { lineHeight: '1.2', fontWeight: '700' }],
        h4: ['36px', { lineHeight: '1.3', fontWeight: '700' }],
        h5: ['32px', { lineHeight: '1.3', fontWeight: '700' }],
        h6: ['28px', { lineHeight: '1.4', fontWeight: '600' }],
        // Body
        'body-xl': ['24px', { lineHeight: '1.5' }],
        'body-l': ['22px', { lineHeight: '1.5' }],
        'body-m': ['20px', { lineHeight: '1.5' }],
        'body-s': ['18px', { lineHeight: '1.5' }],
        // CTA/Buttons
        'button-xl': ['38px', { letterSpacing: '0.02em', fontWeight: '500' }],
        'button-l': ['32px', { letterSpacing: '0.02em', fontWeight: '500' }],
        'button-m': ['28px', { letterSpacing: '0.01em', fontWeight: '500' }],
        // Labels
        'label-xl': ['28px', { letterSpacing: '0.01em', fontWeight: '700' }],
        'label-l': ['26px', { letterSpacing: '0.01em', fontWeight: '700' }],
        'label-m': ['24px', { letterSpacing: '0.01em', fontWeight: '500' }],
        'label-s': ['20px', { letterSpacing: '0.01em', fontWeight: '500' }],
        // Scores
        'score-huge': ['52px', { lineHeight: '1', fontWeight: '900' }],
        'score-large': ['48px', { lineHeight: '1', fontWeight: '900' }],
        'score-medium': ['42px', { lineHeight: '1', fontWeight: '900' }],
        'score-small': ['38px', { lineHeight: '1', fontWeight: '700' }],
      },
      spacing: {
        2: '8px',
        3: '12px',
        4: '16px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
        20: '80px',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '32px',
        full: '9999px',
      },
      boxShadow: {
        'glow-yellow': '0 0 60px rgba(248, 203, 70, 0.3)',
        'glow-yellow-strong': '0 0 40px rgba(248, 203, 70, 0.5)',
        card: '0 4px 20px rgba(0, 0, 0, 0.08)',
        button: '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
    },
  },
  plugins: [],
}
