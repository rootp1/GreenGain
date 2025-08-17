/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Pixelify Sans"', 'sans-serif'],
        vt: ['"VT323"', 'monospace'],
      },
      backgroundImage: {
        app: "url('images/b.jpg')",
      },
    },
  },
  plugins: [],
};
