import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

import { OnboardingPageOne } from '../screens/OnboardingPageOne';
import { OnboardingPageTwo } from '../screens/OnboardingPageTwo';
import { Home } from '../screens/Home';
import { Login } from '../screens/Login';
import { Student } from '../screens/Student';
<<<<<<< HEAD
import { ProfessorLanding } from '../screens/ProfessorLanding';
=======
import { EnterpriseLanding } from "../screens/EnterpriseLanding";
>>>>>>> 591f2aafb589b958113dab3da3f6200986baf294

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='onboardingPageOne' component={OnboardingPageOne} />
      <Screen name='onboardingPageTwo' component={OnboardingPageTwo} />
      <Screen name='enterpriseLanding' component={EnterpriseLanding} />
      <Screen name='home' component={Home} />
      <Screen name='login' component={Login} />
      <Screen name='student' component={Student} />
      <Screen name='professor' component={ProfessorLanding} />
    </Navigator>
  );
}
