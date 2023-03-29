import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BackgroundRed from '../assets/svg/background-red.svg';
import NextScreen from '../assets/svg/next-screen.svg';
import PageTwo from '../assets/svg/page-two.svg';

export function OnboardingPageTwo() {
  const { navigate } = useNavigation();

  return (
    <View className='flex items-center justify-start h-full w-full bg-white'>
      <ScrollView>
        <View className='bg-[#F27C7C]'>
          <BackgroundRed width={310} />
        </View>
        <View className='bg-white mx-5 my-10'>
          <View className='flex items-start justify-start mb-10 '>
            <Text className='text-blue-200 font-ArchivoMedium text-[40px]'>
              02.
            </Text>

            <Text className='text-start text-stone-600 w-60 font-PoppinsMedium text-2xl '>
              Ou dê aulas sobre o que você mais conhece
            </Text>
          </View>

          <View className='flex-row h-11 mt-2 items-center justify-between'>
            <TouchableOpacity
              activeOpacity={0.7}
              className=''
              onPress={() => navigate('onboardingPageOne')}
            >
              <PageTwo className='flex-1' />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              className=''
              onPress={() => navigate('home')}
            >
              <NextScreen />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
