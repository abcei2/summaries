/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    
  ],
  theme: {
    extend: {
      
      colors:{
        primary:"#ffc906",
        link:"#FFB600",
        bgc: "#FCC906"
      }
    },
  },
  plugins: [],
}
