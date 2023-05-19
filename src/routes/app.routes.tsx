import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

import { OnboardingPageOne } from '../screens/OnboardingPageOne';
import { OnboardingPageTwo } from '../screens/OnboardingPageTwo';
import { Home } from '../screens/Home';
import { Student } from '../screens/Student';
import { ProfessorLanding } from '../screens/ProfessorLanding';
import { EnterpriseLanding } from '../screens/EnterpriseLanding';
import { Register } from '../screens/Register';

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='onboardingPageOne' component={OnboardingPageOne} />
      <Screen name='onboardingPageTwo' component={OnboardingPageTwo} />
      <Screen name='enterpriseLanding' component={EnterpriseLanding} />
      <Screen name='home' component={Home} />
      <Screen name='student' component={Student} />
      <Screen name='register' component={Register} />
      <Screen name='professor' component={ProfessorLanding} />
    </Navigator>
  );
}
