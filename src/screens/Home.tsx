import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { EnvelopeSimple, XCircle } from 'phosphor-react-native';

import BannerHome from '../assets/svg/banner-home.svg';
import ToWatch from '../assets/svg/to-watch.svg';

import ToStudy from '../assets/svg/to-study.svg';
import { useEffect, useState } from 'react';
import firebaseConfig from './config/firebaseConfig-skillShare';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import { collection, getDocs } from 'firebase/firestore';

export function Home() {
  const { navigate } = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  console.log(analytics);


  return (
    <View className='flex items-center justify-center  h-full  bg-sky-500 '>
      <ScrollView className='mt-20 '>
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
            <Modal
              animationType='fade'
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}
            >
              <View className='flex items-center justify-start h-screen mt-20'>
                <View className=' flex bg-white w-56 h-48 rounded-lg '>
                  <View className='flex-row justify-end items-end mt-3 mr-3'>
                    <TouchableOpacity
                      onPress={() => setModalVisible(!modalVisible)}
                      className=''
                    >
                      <Text className=''>
                        <XCircle size={24} />
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View className='flex justify-center items-center gap-5 mt-1'>
                    <View className='flex-row items-center gap-x-2 border rounded-md border-dark-50 w-48'>
                      <EnvelopeSimple size={20} />
                      <TextInput
                        placeholder='Digite seu e-mail'
                        className='  '
                      ></TextInput>
                    </View>
                    <TouchableOpacity>
                      <Text className='border rounded-lg px-10 py-2'>
                        Cadastrar
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <TouchableOpacity
              activeOpacity={0.7}
              className='flex w-28 justify-between items-start p-4 rounded-lg bg-sky-200 '
              onPress={() => setModalVisible(true)}
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
        </View>
      </ScrollView>
    </View>
  );
}
