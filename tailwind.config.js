/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cinzel', 'serif'],
        sans: ['"Josefin Sans"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        night: '#0a0e1a',
        coal: '#0f1422',
        cream: '#F7F5F0',
        bone: '#ECE7DD',
        brand: {
          blue: '#1668E3',
          'blue-deep': '#0c3f93',
          red: '#f70c43',
          'red-deep': '#b00730',
          gold: '#c9a86a',
        },
      },
      borderRadius: {
        '4xl': '32px',
        '5xl': '44px',
      },
      letterSpacing: {
        mega: '-0.05em',
      },
    },
  },
  plugins: [],
}
