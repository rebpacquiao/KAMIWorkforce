/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{html,ts}"],
  darkMode: false,
  theme: {
    backgroundColor: {
      "lightBlue-500": "rgb(48 80 207)",
      "dark-500": "#1e293b",
      "gray-50": "#f8f9fa",
      "meta-3": "#10b981",
      "meta-4": "#3b82f6",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
