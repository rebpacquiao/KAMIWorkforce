/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{html,ts}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: {
      "lightBlue-500": "rgb(48 80 207)",
      "dark-500": "#1e293b",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
