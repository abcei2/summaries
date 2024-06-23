/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rokkitt: ['Rokkitt'],
      },
      colors: {
        primary: "#8CFFEC",
        secondary:"#520CEB",
        tertiary:"#A6E567",
        "custom-gray": "#F1F1F1",
        "primary-dark": "#2b6cb0",
        link: "#FFB600",
        bgc: "#FCC906",
        "main-bg":"#F8F8F8",
        "custom-black":"#030304"
      },
      animation: {
        ltrTranslation25: "ltrTranslation 10s linear infinite",
      },
      keyframes: {
        ltrTranslation: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(120%)" },
        },
      },
    },
  },
  plugins: [],
};
