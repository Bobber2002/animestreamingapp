/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        animeBlack: "#000501",
        animeDarkGreen: "#73AB84",
        animeLightGreen: "#99D19C",
        animeDarkTeal: "#79C7C5",
        animeTeal: "#ADE1E5",
      }
    },
  },
  plugins: [],
};
