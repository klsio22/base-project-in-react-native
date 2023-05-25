import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundBlue from '../assets/svg/background-blue.svg';
import React, { useEffect, useState } from 'react';
import { Divider, TextInput } from 'react-native-paper';

import ToWatch from '../assets/svg/to-watch.svg';

import ToStudy from '../assets/svg/to-study.svg';
// import TextInputMask from 'react-native-text-input-mask';

import { fetchDisciplines } from '../../lib/apiData';
import useAuth from '../hooks/useAuth';
import { User } from '../hooks/useDocument';
import useCollection from '../hooks/useCollection';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Skiller() {
  const { navigate } = useNavigation();
  const [fullName, setFullName] = useState('');
  const [classLink, setClassLink] = useState('');
  const [zap, setZap] = useState('');
  const [biography, setBio] = useState('');
  const { data, loading, create, remove, update, all, refreshData } = useCollection<User>('users');
  const { logout } = useAuth<User>('users');

  const [disciplines, setDisciplines] = useState<string[]>([]);

  function onChangedZap(text: string) {
    setZap(text.replace(/[^0-9]/g, ''));
  }

  useEffect(() => {
    
    const listTeacher = async () => {
      try {
        console.log(await AsyncStorage.getItem('user'));

        // console.log(await update('tmMCvzGdn5TCGtIGVI9uxGxeVYm2', {
        //   email: 'landerwilker@yahoo.com.br',
        //   password: '204',
        //   bio: 'é noix e nada deles', 
        //   zap: '4002-8922',
        //   link: 'windwaker',
        //   price: 'ghost',
        //   skills: 'programa'
        // }));
        
        // console.log(generatedId);
        const fetchedDisciplines = await fetchDisciplines();
        setDisciplines(fetchedDisciplines);
        
        const aux = await all();
        console.log(aux);
      } catch (error) {
        console.error(error);
      }
    };

    listTeacher().catch(console.error);
  }, []);


  function sair() {
    logout();
    navigate('home');
  }
 
  // console.log(disciplines);
  return (
    <ScrollView className='h-full bg-sky-400'>
      <View className='flex items-center justify-start h-full flex-1 p-4 '>
        <View className='flex flex-row justify-evenly mt-4 w-full font-PoppinsSemiBold text-xl '>
          <TouchableOpacity
            activeOpacity={0.7}
            className='flex w-28 justify-between items-start p-4 rounded-lg bg-sky-200 '
            onPress={() => navigate('skillers')}
          >
            <ToStudy />

            <Text className='font-semibold text-xl font-ArchivoSemiBold text-stone-600'>
              Listar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            className='flex w-28 justify-between items-start p-4 rounded-lg bg-[#F27C7C] '
            onPress={() => sair()}
          >
            <ToWatch />

            <Text className='font-semibold text-xl font-ArchivoSemiBold text-white'>
              Sair
            </Text>
          </TouchableOpacity>
        </View>

        <View className='flex items-center w-full justify-start h-full flex-1'>
          <Divider />
          <Text className='font-ArchivoBold text-3xl mt-5 text-white'>
            Seus dados
          </Text>
          <TextInput
            className='w-full mt-4'
            mode='outlined'
            label='Email'
            value={fullName}
            onChangeText={(text) => setFullName(text)}
          />

          <TextInput
            className='w-full mt-4 focus:border-stone-500'
            mode='outlined'
            label='Link para aula remota'
            value={classLink}
            onChangeText={(text) => setClassLink(text)}
          />

          <TextInput
            label='Whatsapp'
            className='w-full mt-4'
            mode='outlined'
            value={zap}
            keyboardType='numeric'
            onChangeText={(text) => onChangedZap(text)}
          />

          <TextInput
            multiline
            numberOfLines={4}
            className='w-full mt-4'
            mode='outlined'
            label='Sobre você'
            value={biography}
            onChangeText={(text) => setBio(text)}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          className='flex-1 flex-row w-full mt-4 flex bg-red-400 rounded-md justify-center'
          onPress={() => navigate('home')}
        >
          <Text className='text-white ml-3 p-3 text-base font-PoppinsRegular'>
            {' '}
            Atualizar dados
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
