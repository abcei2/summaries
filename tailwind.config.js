/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    
  ],
  theme: {
    extend: {
      
      colors:{
        primary:"#3383f5",
        "primary-dark":"#2b6cb0",
        link:"#FFB600",
        bgc: "#FCC906"
      }
    },
  },
  plugins: [],
}
