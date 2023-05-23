import { View } from 'react-native';
import React from 'react';
import Menu from '../components/Menu';

export function Student() {
  return (
    <View className='flex-col justify-start h-full w-full bg-sky-500 pt-14 '>
      <Menu />
    </View>
  );
}
