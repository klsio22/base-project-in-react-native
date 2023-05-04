import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import Menu from '../components/Menu';

export function Student() {
  const { navigate } = useNavigation();
  const [filterText, setFilterText] = useState('');

  return ( 
    <View className='flex-col justify-start h-full w-full bg-sky-500 pt-14 '>
      <Menu/>
    </View>
  );
}
