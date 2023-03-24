import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

import { OnboardingPageOne } from '../screens/OnboardingPageOne';
import { OnboardingPageTwo } from '../screens/OnboardingPageTwo';
import { Home } from '../screens/Home';
import { Login } from '../screens/Login';

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='onboardingPageOne' component={OnboardingPageOne} />
      <Screen name='onboardingPageTwo' component={OnboardingPageTwo} />
      <Screen name='home' component={Home} />
      <Screen name='login' component={Login} />
    </Navigator>
  );
}
