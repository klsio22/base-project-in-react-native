import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundBlue from '../assets/svg/background-blue.svg';
import React from 'react';
import { Divider } from 'react-native-paper';

import ToWatch from '../assets/svg/to-watch.svg';

import ToStudy from '../assets/svg/to-study.svg';

export function Skiller() {
  const { navigate } = useNavigation();

  return (
   <View className='flex items-center justify-start h-full flex-1 p-4 bg-white'>
       <View className='w-full'>
          <Text className='text-[#57534E] flex items-center px-4 text-center mt-10 mb-4 pt-4 w-full h-auto'>
            <Text className='font-ArchivoBold w-full text-4xl'>
              Roberval
            </Text>
            {'\n'}
            <Text className='font-ArchivoBold text-base text-slate-300'>
              robervin2000@hotmail.com
            </Text>
          </Text>
          <Divider/>   
       </View>

      <View className='flex flex-row justify-evenly mt-4 w-full font-PoppinsSemiBold text-xl '>
        <TouchableOpacity
          activeOpacity={0.7}
          className='flex w-28 justify-between items-start p-4 rounded-lg bg-sky-200 '
          onPress={() => navigate('listSkillers')}
        >
          <ToStudy />

          <Text className='font-semibold text-xl font-ArchivoSemiBold text-stone-600 '>
            Listar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          className='flex w-28 justify-between items-start p-4 rounded-lg bg-[#F27C7C] '
          onPress={() => navigate('home')}
        >
          <ToWatch />

          <Text className='font-semibold text-xl font-ArchivoSemiBold text-white'>
            Sair
          </Text>
        </TouchableOpacity>
      </View>
   </View>
  );
}
