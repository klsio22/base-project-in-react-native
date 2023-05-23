import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../contexts/AppContext';
import React, { useContext } from 'react';
import BackgroundRed from '../assets/svg/background-red.svg';
import NextScreen from '../assets/svg/next-screen.svg';
import BlueHeart from '../assets/svg/blue-heart.svg';

export function ProfessorLanding() {
  const { navigate } = useNavigation();
  const { token, setToken } = useApp();

  return (
    <ScrollView>
      <View className='flex items-center justify-start  h-full w-full bg-white'>
        <View className='flex-column items-center justify-center h-1/2 w-full bg-red-400'>
          <View className='bg-red-400'>
            <BackgroundRed width={350} />
          </View>
        </View>
        <View className='flex items-center justify-between h-1/2 w-full bg-white'>
          <Text className='text-[#57534E] my-10 p-4 w-full h-auto'>
            <Text className='font-ArchivoBold  text-2xl'>
              Venha fazer parte dos
            </Text>
            {'\n'}
            <Text className='font-ArchivoBold text-2xl '>
              Skillers desse Brasil{' '}
            </Text>
            {'\n'}
            <Text className='font-ArchivoBold text-2xl '>a fora!</Text>
          </Text>
          <View className='flex flex-row items-center p-4 justify-between w-full'>
            <Text className='font-Archivo text-base text-red-500'>
              <Text>Total de 256 compartilhadores</Text>
              {'\n'}
              <Text>
                de conhecimento <BlueHeart />
              </Text>
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              className=''
              onPress={() => navigate('home')}
            >
              <NextScreen className='flex-1' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
