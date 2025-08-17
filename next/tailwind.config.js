/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
  pixel: ['var(--font-pixel)', 'Pixelify Sans', 'sans-serif'],
  mono: ['var(--font-mono)', 'VT323', 'monospace'],
  pop: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
  // protest font removed (not used)
      }
    },
  },
  plugins: [],
};
