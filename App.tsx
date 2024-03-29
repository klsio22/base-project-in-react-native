import { StatusBar } from 'react-native';
import { Routes } from './src/routes';

/* import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';

import { Loading } from './src/components/Loading'; */

export default function App() {
  /*   const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) return <Loading />;
 */

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
