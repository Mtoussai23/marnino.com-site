/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#B48EAE",
        secondary: "#ede7e2",
      },
      fontFamily: {
        vintage: ['"Libre Baskerville"', "serif"],
      },
      mixBlendMode: {
        softLight: 'soft-light',
        multiply: 'multiply',
        screen: 'screen',
      },
    },
  },
  plugins: [],
};

