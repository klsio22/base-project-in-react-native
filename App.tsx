import { StatusBar } from 'react-native';
import { Routes } from './src/routes';

import { useFonts, Archivo_600SemiBold } from '@expo-google-fonts/archivo';

import { Loading } from './src/components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_600SemiBold,
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
