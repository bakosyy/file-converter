/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "navbar-toggler-icon": 'url("./assets/images/navbar-toggler-icon.svg")',
        banner: 'url("./assets/images/banner-grid.webp")'
      }
    }
  },
  plugins: []
}
