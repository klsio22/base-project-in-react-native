import { useCallback, useState } from 'react';
import { StatusBar } from 'react-native';
import { Loading } from './src/components/Loading';
import { Home } from './src/screens/Home';

export default function App() {
  const [notLoaded, setLoading] = useState(false);

  if (notLoaded) return <Loading />;

  return (
    <>
      <Home />
      <StatusBar
        barStyle={'light-content'}
        backgroundColor='transparent'
        translucent
      />
    </>
  );
}
