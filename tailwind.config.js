/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {
      colors: {
        background: '#09090a',
      },
      fontFamily: {
        ArchivoRegular: ['Archivo_400Regular'],
        ArchivoMedium: ['Archivo_500Medium'],
        ArchivoSemiBold: ['Archivo_600SemiBold'],
        ArchivoBold: ['Archivo_700Bold'],
        PoppinsRegular: ['Poppins_400Regular'],
        PoppinsSemiBold: ['Poppins_600SemiBold'],
      },
    },
  },
  plugins: [],
};
