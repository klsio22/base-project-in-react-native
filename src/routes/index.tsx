import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './app.routes';
import { AppContext } from '../contexts/AppContext';

export function Routes() {
  return (
    <AppContext>
      <View className='flex-1 bg-background'>
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>
      </View>
    </AppContext>
    
  );
}
