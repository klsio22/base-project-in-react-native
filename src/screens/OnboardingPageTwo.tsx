import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundRed from '../assets/svg/background-red.svg';

export function OnboardingPageTwo() {
  const { navigate } = useNavigation();

  return (
    <View className='flex items-start justify-center h-full flex-1 bg-white px-8 pt-14 '>
      <Text className='text-blue-200 m-3 font-ArchivoMedium text-[40px]'>
        01.
      </Text>

      <Text className='text-stone-600 m-3 font-ArchivoMedium text-[40px]'>
        Encontre vários professores para ensinar você
      </Text>

      <View>
        <View className=''></View>

        <TouchableOpacity
          activeOpacity={0.7}
          className='flex-row h-11 px-4 items-center'
          onPress={() => navigate('home')}
        >
          proxima
        </TouchableOpacity>
      </View>
    </View>
  );
}
