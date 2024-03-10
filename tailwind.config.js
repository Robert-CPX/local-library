/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{html,js,mjs}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        primary: {
          500: "#FF7000",
          100: "#FFF1E6",
        },
        dark: {
          100: "#000000",
          200: "#0F1117",
          300: "#151821",
          400: "#212734",
          500: "#101012",
        },
        light: {
          900: "#FFFFFF",
          850: "#FDFDFD",
          800: "#F4F6F8",
          700: "#DCE3F1",
          500: "#7B8EC8",
          400: "#858EAD",
        },
        "accent-blue": "#1DA1F2",
        warning: "#FF2121",
      },
    },
  },
  plugins: [],
};

export default config;
