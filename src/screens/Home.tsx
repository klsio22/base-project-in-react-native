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
import { EnvelopeSimple, Lock, XCircle } from 'phosphor-react-native';

import BannerHome from '../assets/svg/banner-home.svg';
import ToWatch from '../assets/svg/to-watch.svg';
import ToStudy from '../assets/svg/to-study.svg';
import { useEffect, useState } from 'react';
import { validate } from 'email-validator';
import useAuth from '../hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Home() {
  const { navigate } = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState<any>();
  const { login, user } = useAuth();

  const verifyLoginStudent = () => {
    setRedirect('student');
    user ? navigate('student') : setModalVisible(!modalVisible);
  };

  const verifyLoginSkiller = () => {
    setRedirect('professorLanding');
    user ? navigate('professorLanding') : setModalVisible(!modalVisible);
  };

  const clearAll = () => {
    setEmail('');
    setPassword('');
    setErrorMessage('');
  };

  const handleLoginUser = async (): Promise<void> => {
    try {
      if (!validate(email)) {
        setError(true);
        setErrorMessage('Email ou senhas estão incorretos');
        return;
      }

      if (password == '') {
        setError(true);
        setErrorMessage('Email ou senhas estão incorretos');
        return;
      }

      try {
        await login(email, password);
        const userTeste = await AsyncStorage.getItem('user');
        setEmail(JSON.parse(userTeste!!).email);
        setModalVisible(!modalVisible);
        setError(false);
        clearAll();
        navigate(redirect);
      } catch (error: any) {
        setError(true);
        console.log(error.message);
        setErrorMessage(error.message);
      }
    } catch (error: any) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    user ? console.log('logado') : console.log('não logado');
  }, [user]);

  return (
    <View className='flex items-center justify-center h-full bg-sky-500 '>
      <ScrollView className='mt-20'>
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
              <View className='flex items-center justify-start h-screen mt-6'>
                <View className=' flex bg-white w-60 h-auto rounded-lg '>
                  <View className='mt-2 mr-3'>
                    <View className='flex-row items-center justify-center'>
                      <Text className='font-PoppinsMedium text-xl'>Login</Text>
                      <TouchableOpacity
                        className='absolute right-0'
                        onPress={() => {
                          setModalVisible(!modalVisible);
                          clearAll();
                        }}
                      >
                        <XCircle size={24} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View className='flex justify-center items-center gap-3 mt-1 '>
                    <View className='flex-row items-center gap-x-2 border rounded-md border-dark-50 w-48 h-8 '>
                      <EnvelopeSimple size={20} />
                      <TextInput
                        placeholder='Digite seu e-mail'
                        value={email}
                        onChangeText={setEmail}
                        className='w-36'
                      ></TextInput>
                    </View>

                    <View className='flex-row items-center gap-x-2 border rounded-md border-dark-50 w-48 h-8'>
                      <Lock size={20} />

                      <TextInput
                        secureTextEntry
                        placeholder='*****************'
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                        className='w-36'
                      />
                    </View>

                    <TouchableOpacity
                      onPress={handleLoginUser}
                      className='w-48 h-8 border rounded-md items-center justify-center'
                    >
                      <Text className=' '>Entrar</Text>
                    </TouchableOpacity>

                    {error && (
                      <Text className='text-[#EF3333] text-base text-center font-medium'>
                        {errorMessage}
                      </Text>
                    )}

                    <TouchableOpacity
                      onPress={() => {
                        navigate('register');
                        setModalVisible(!modalVisible);
                        clearAll();
                      }}
                      className='p-2'
                    >
                      <Text className='text-sky-500 font-ArchivoBold'>
                        Não possui conta ? Crie uma agora!
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <TouchableOpacity
              activeOpacity={0.7}
              className='flex w-28 justify-between items-start p-4 rounded-lg bg-sky-200 '
              onPress={() => verifyLoginStudent()}
            >
              <ToStudy />
              <Text className='font-semibold text-xl font-ArchivoSemiBold text-stone-600 '>
                Estudar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              className='flex w-28 justify-between items-start p-4 rounded-lg bg-[#F27C7C] '
              onPress={() => verifyLoginSkiller()}
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
