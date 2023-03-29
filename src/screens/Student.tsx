import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

export function Student() {
  const { navigate } = useNavigation();

  return (
    <View className='flex items-center justify-center h-full flex-1 bg-slate-700 px-8 pt-14 '>
    <Text className='text-blue-200 m-3 font-PoppinsSemiBold'>Pagina do estudante</Text>

    <TouchableOpacity
      activeOpacity={0.7}
      className='flex-row h-11 px-4 border border-blue-600 rounded-lg items-center'
      onPress={() => navigate('onboardingPageOne')}
    >
      <Text className='text-white ml-3 font-PoppinsRegular text-base'>
       Voltar para inicio
      </Text>
    </TouchableOpacity>
  </View>
  );
}
