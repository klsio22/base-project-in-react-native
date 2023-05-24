import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BackgroundRed from '../assets/svg/background-red.svg';
import NextScreen from '../assets/svg/next-screen.svg';
import PageTwo from '../assets/svg/page-two.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function OnboardingPageTwo() {
  const { navigate } = useNavigation();

  const handleComplete = async () => {
    await AsyncStorage.setItem('onboardingCompleted', 'true');
    navigate('home');
  };

  return (
    <View className='flex items-center justify-start h-full w-full bg-white'>
      <View className='w-full h-full flex item-center'>
        <View className='bg-red-400 w-full flex item-center justify-center h-1/2'>
          <BackgroundRed width='450' />
        </View>
        <View className='bg-white h-1/2 p-4 flex item-center justify-between'>
          <View className='flex items-start justify-start mb-10'>
            <Text className='text-blue-200 font-ArchivoMedium text-[40px]'>
              02.
            </Text>

            <Text className='text-start text-stone-600 w-60 font-PoppinsMedium text-2xl '>
              Ou dê aulas sobre o que você mais conhece
            </Text>
          </View>

          <View className='flex-row mt-2 items-center justify-between'>
            <PageTwo className='flex-1' />

            <TouchableOpacity
              activeOpacity={0.7}
              className=''
              onPress={() => handleComplete()}
            >
              <NextScreen />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
