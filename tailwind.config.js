/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {
      colors: {
        background: '#09090a',
      },
      fontFamily: {
        Archivo: ['Archivo_600SemiBold'],
        PoppinsRegular: ['Poppins_400Regular'],
        PoppinsSemiBold: ['Poppins_600SemiBold'],
      },
    },
  },
  plugins: [],
};
