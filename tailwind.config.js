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
        'theme-color-3': '#6A7391',
        'sec-color-1': '#54CAFF',
        'sec-color-2': '#5B77E1',
        'sec-color-3': '#4C5CFF',
        'sec-color-6': '#5558E4',
        'sec-color-4': '#29B8C9',
        'sec-color-5': '#4C5CFF'
      },
      keyframes: {
        blob: {
          "0%": {transform: "translate(0px, 0px) scale(1)"},
          "33%": {transform: "translate(30px, -50px) scale(1.1)"},
          "66%": {transform: "translate(-20px, 60px) scale(0.9)"},
          "100%": {transform: "translate(0px, 0px) scale(1)"},
        }
      },
      animation: {
        blob: "blob 4s infinite",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
