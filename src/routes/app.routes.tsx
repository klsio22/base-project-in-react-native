import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

import { OnboardingPageOne } from '../screens/OnboardingPageOne';
import { OnboardingPageTwo } from '../screens/OnboardingPageTwo';
import { Home } from '../screens/Home';
import { Student } from '../screens/Student';
import { EnterpriseLanding } from '../screens/EnterpriseLanding';
import { ProfessorLanding } from '../screens/ProfessorLanding';
import { Register } from '../screens/Register';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Loading } from '../components/Loading';
import ListSkillers from '../screens/ListSkillers';
import { Skiller } from '../screens/Skiller';

export function AppRoutes() {
  const [initialRoute, setInitialRoute] = useState('');

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const onboardingCompleted = await AsyncStorage.getItem(
          'onboardingCompleted'
        );
        if (onboardingCompleted === 'true') {
          setInitialRoute('home');
        } else {
          setInitialRoute('onboardingPageOne');
        }
      } catch (e) {
        console.log('error loading onboarding');
      }
    };
    checkOnboardingStatus().catch(console.error);
  }, []);

  if (initialRoute === '') return <Loading />;

  return (
    <Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      <Screen name='onboardingPageOne' component={OnboardingPageOne} />
      <Screen name='onboardingPageTwo' component={OnboardingPageTwo} />
      <Screen name='home' component={Home} />
      <Screen name='enterpriseLanding' component={EnterpriseLanding} />
      <Screen name='student' component={Student} />
      <Screen name='register' component={Register} />
      <Screen name='professor' component={ProfessorLanding} />
      <Screen name='skiller' component={Skiller} />
      <Screen name='listSkillers' component={ListSkillers} />
    </Navigator>
  );
}
