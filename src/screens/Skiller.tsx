import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundBlue from '../assets/svg/background-blue.svg';
import React, { useState } from 'react';
import { Divider, TextInput} from 'react-native-paper';

import ToWatch from '../assets/svg/to-watch.svg';

import ToStudy from '../assets/svg/to-study.svg';
// import TextInputMask from 'react-native-text-input-mask';

export function Skiller() {
  const { navigate } = useNavigation();
  const [fullName, setFullName] = useState("");
  const [classLink, setClassLink] = useState("");
  const [zap, setZap] = useState("");
  const [biography, setBio] = useState("");

  function onChangedZap (text: string) {
    setZap(text.replace(/[^0-9]/g, ''));
}

  return (
    <ScrollView className='h-full'>
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
            className='flex w-28 h-30 w-30 justify-between items-start p-4 rounded-lg bg-sky-400 '
            onPress={() => navigate('skillers')}>
              
            <ToStudy/>

            <Text className='font-semibold text-xl font-ArchivoSemiBold text-white'>
              Listar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            className='flex w-28 h-30 w-30 justify-between items-start p-4 rounded-lg bg-[#F27C7C] '
            onPress={() => navigate('home')}
          >
            <ToWatch />

            <Text className='font-semibold text-xl font-ArchivoSemiBold text-white'>
              Sair
            </Text>
          </TouchableOpacity>
        </View>
        <Divider className='w-full my-4'/>
        <View className='flex items-center w-full justify-start h-full flex-1'>
          <Divider/>   
          <Text className='font-ArchivoBold text-3xl mt-5 text-left w-full text-stone-600'>
            Seus dados
          </Text>
          <TextInput
            className='w-full mt-4 bg-slate-100'
            mode='outlined'
            label="Nome Completo"
            value={fullName}
            onChangeText={text => setFullName(text)}
          />

          <TextInput
            className='w-full mt-4'
            mode='outlined'
            label="Link para aula remota"
            value={classLink}
            onChangeText={text => setClassLink(text)}
          />

          <TextInput
            label="Whatsapp"
            className='w-full mt-4'
            mode='outlined'
            value={zap}
            keyboardType="numeric"
            onChangeText={text => onChangedZap(text)}
          />

          <TextInput
            multiline
            numberOfLines={4}
            className='w-full mt-4'
            mode='outlined'
            label="Sobre você"
            value={biography}
            onChangeText={text => setBio(text)}
          />
          
        </View>
        <TouchableOpacity activeOpacity={0.7}
          className='flex-1 flex-row w-full mt-4 flex bg-red-400 rounded-md justify-center'
          onPress={() => navigate('home')} >
          <Text className='text-white ml-3 p-3 text-base font-PoppinsRegular'> Atualizar dados</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
