import { StatusBar } from 'react-native';
import { Routes } from './src/routes';

import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
  Archivo_700Bold,
  useFonts,
} from '@expo-google-fonts/archivo';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

import { Loading } from './src/components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) return <Loading />;

  /* https://docs.expo.dev/guides/using-custom-fonts/ */

  return (
    <>
      <Routes />
      <StatusBar
        barStyle={'light-content'}
        backgroundColor='transparent'
        translucent
      />
    </>
  );
}
