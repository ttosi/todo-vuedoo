/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

/* eslint-env node */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "pima-color-blue": "#0075bd",
      },
    },
  },
  plugins: [],
};
