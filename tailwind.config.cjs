/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "sofia": ["Sofia Sans", "sans-serif"],
        "rowdies": ["Rowdies"]
      }
    },
  },
  plugins: [],
}
