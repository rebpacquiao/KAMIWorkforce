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
      "green-500": "#f43f5e",
      "violet-50": "#825ee4",
      "emerald-500": "#2dce89",
      "yellow-500": "#fbb140",
      "login-500": "#111827",
      "blue-500": "#0ea5e9",
      "icon-500": "#94A3B8",
      "gray-500": "#475569",
      "gray-600": "#cbd5e1",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
