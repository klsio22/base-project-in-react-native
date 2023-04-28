import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Heart } from 'phosphor-react-native';

import BannerHome from '../assets/svg/banner-home.svg';
import ToWatch from '../assets/svg/to-watch.svg';

import ToStudy from '../assets/svg/to-study.svg';

export function ProfessorLanding() {
  const { navigate } = useNavigation();

  return (
    <View className='flex items-center justify-center  h-full w-full bg-sky-600 '>
      <View className='flex-column items-start justify-center h-full w-90 ml-0 bg-[url("../../assets/background-splash.svg")] bg-cover bg-center'>
        <Text className='text-white my-40 leading-8 w-full h-80'>
          <Text className='font-ArchivoBold  text-4xl'>Quer ser</Text>
          {'\n'}
          <Text className='font-ArchivoBold text-4xl mb-5'>um Skiller ?</Text>
          {'\n'}
          <Text className='font-Archivo '>
            Para começar, você precisa
          </Text>
          {'\n'}
          <Text className='font-Archivo '>
            se cadastrar como professor
          </Text>
          {'\n'}
          <Text className='font-Archivo '>
            na nossa plataforma web.
          </Text>
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          className='flex-row h-15 w-80 bg-red-600 justify-center items-center p-4 rounded-lg gap-3'
          onPress={() => navigate('home')}
        >
          <Text className='text-white font-PoppinsRegular text-base'>
            Tudo bem
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
