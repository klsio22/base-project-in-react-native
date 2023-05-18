import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Heart } from 'phosphor-react-native';

import BannerHome from '../assets/svg/banner-home.svg';
import ToWatch from '../assets/svg/to-watch.svg';

import ToStudy from '../assets/svg/to-study.svg';

export function Home() {
  const { navigate } = useNavigation();

  return (
    <View className='flex items-center justify-center  h-full bg-sky-500'>
      <View className='mt-20 '>
        <View className='flex justify-center items-center mx-auto'>
          <BannerHome width={280} />
        </View>

        <View className='mx-4'>
          <Text className='text-white my-4 w-52 text-xl leading-8'>
            <Text className=''>Seja bem-vindo !</Text>
            {'\n'}
            <Text className='font-ArchivoBold '>O que deseja fazer ?</Text>
          </Text>

          <View className='flex-row justify-between h-32 font-PoppinsSemiBold text-xl '>
            <TouchableOpacity
              activeOpacity={0.7}
              className='flex w-28 justify-between items-start p-4 rounded-lg bg-sky-200 '
              onPress={() => navigate('login')}
            >
              <ToStudy />

              <Text className='font-semibold text-xl font-ArchivoSemiBold text-stone-600 '>
                Estudar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              className='flex w-28 justify-between items-start p-4 rounded-lg bg-[#F27C7C] '
              onPress={() => navigate('professor')}
            >
              <ToWatch />

              <Text className='font-semibold text-xl font-ArchivoSemiBold text-white'>
                Dar aulas
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigate('enterpriseLanding')}>
            <Text className='my-5 text-white leading-4 font-bold'>
              <Text>Seja parceiro SkillShare</Text>
            </Text>
          </TouchableOpacity>
          
          {/* <Text className='my-4 text-white leading-5'>
            <Text>Total de 285 compartiladores {'\n'} de conhecimento</Text>{' '}
            <Heart color='#ffffff' weight='fill' size={16} />
          </Text> */}
        </View>
      </View>
    </View>
  );
}
