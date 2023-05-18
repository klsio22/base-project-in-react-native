import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BackgroundBlue from '../assets/svg/background-blue.svg';
import NextScreen from '../assets/svg/next-screen.svg';
import PageOne from '../assets/svg/page-one.svg';

export function OnboardingPageOne() {
  const { navigate } = useNavigation();

  return (
    <View className='flex items-center h-full w-full bg-white'>
      <View className='w-full h-full flex item-center'>
        <View className='bg-sky-500 w-full flex item-center justify-center h-1/2'>
          <BackgroundBlue width='450' />
        </View>
        <View className='bg-white h-1/2 p-4 flex item-center justify-between'>
          <View className='flex items-start justify-start mb-10'>
            <Text className='text-blue-200 font-ArchivoMedium text-[40px]'>
              01.
            </Text>

            <Text className='text-start text-stone-600 w-60 font-PoppinsMedium text-2xl '>
              Encontre vários professores para ensinar você
            </Text>
          </View>

          <View className='flex-row mt-2 items-center justify-between'>
            <PageOne className='flex-1' />

            <TouchableOpacity
              activeOpacity={0.7}
              className=''
              onPress={() => navigate('onboardingPageTwo')}
            >
              <NextScreen />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
