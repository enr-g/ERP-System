/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        gradientFrom: "#56BB9D",
        gradientTo: "#39534F",
        backgroundGrey: "#F0F1F3",
        textGrey: "#48505E",
        buttonGrey: "#5D6679",
        drawGrey: "#D0D3D9",
        ifOrange: "#F4A261",
        bgLogin: "#CEE3D9",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"], //"sans" is applied to the whole document by default
      },
      borderRadius: {
        ifRadius: "10px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
