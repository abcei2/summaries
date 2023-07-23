/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    
  ],
  theme: {
    extend: {
      
      colors:{
        primary:"#0365f2",
        link:"#FFB600",
        bgc: "#FCC906"
      }
    },
  },
  plugins: [],
}
