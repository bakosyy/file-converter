/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "navbar-toggler-icon": 'url("./assets/images/navbar-toggler-icon.svg")',
        banner: 'url("./assets/images/banner-grid.webp")',
        "banner-splash":
          'url("./assets/images/banner-splash.png"),url("./assets/images/banner-grid.webp")'
      },
      animation: {
        "ping-slow": "ping 1.5s linear 0.5s infinite"
      },
      boxShadow: {
        rounded: "0 0 0 3px #f7f7f7"
      }
    },
    screens: {
      xs: "330px",
      // => @media (min-width: 330px) { ... }

      "x-xs": "540px",
      // => @media (min-width: 540px) { ... }

      sm: "720px",
      // => @media (min-width: 720px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      "x-md": "820px",
      // => @media (min-width: 820px) { ... }

      "2x-md": "992px",
      // => @media (min-width: 992px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      "x-lg": "1200px",
      // => @media (min-width: 1200px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px"
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: []
}
