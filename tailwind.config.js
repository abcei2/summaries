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
        "custom-black":"#030304",
        "custom-purple":"#520CEB"
      },
      
      backgroundImage: {
        "landing-bg": "url('/images/landing-bg.svg')",
        "landing-bg-mobile": "url('/images/landing-bg-mobile.svg')",
      },
      animation: {
        rtlTranslation25: "rtlTranslation 25s linear infinite",
        ltrTranslation25: "ltrTranslation 25s linear infinite",
        rtlTranslation100: "rtlTranslation 100s linear infinite",
        ltrTranslation100: "ltrTranslation 100s linear infinite",
      },
      keyframes: {
        rtlTranslation: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        ltrTranslation: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};
