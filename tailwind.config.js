/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        'mobile': { 'min': '300px', 'max': '850px' },
        'desktop': { 'min': '851px', 'max': '4000px' },

      },
      spacing: {
        '5%': '5%',
      },
      margin: {
        '10vh': '10vh',
      },
      height: {
        '10vh': '10vh',
        '90vh': '90vh',
        '50vh': '50vh',
        '30vh': '30vh',
        '11%': '11%',
      },
      width: {
        '30vw': '30vw',
        '80vw': '80vw',
        '75vw': '75vw',
        '70vw': '70vw',
        '50vw': '50vw',
        '43vw': '43vw',
        '77vw': '77vw',
      }, spacing: {
        '20%': '20%',
        '10vh': "10vh",
        '20vh': '20vh',
        '10%' : '10%',
        '90%' : '90%',
      },
      colors: {
        'maincolor': 'rgb(245, 246, 250)',
        'priceColor': 'rgb(61, 113, 187)'
      } ,
      margin : {
        '5vw' : '5vw'
      }
    }
  },
  plugins: [],
}

