module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        'ct': '0 0px 10px -1px rgba(0, 0, 0, 0.09)',
      },
      colors: {
        'theme-color-1': '#E96F90',
        'theme-color-2': '#E5CA00',
        'sec-color-1': '#5CA9FF',
        'sec-color-2': '#5483FF',
        'sec-color-3': '#4C5CFF'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
