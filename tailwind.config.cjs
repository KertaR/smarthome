/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Aktíváljuk a class-alapú sötét módot
  darkMode: "class",

  // Mondjuk meg a Tailwindnek, hol keresse a segédosztályokat
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
