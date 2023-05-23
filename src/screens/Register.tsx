import { useNavigation } from '@react-navigation/native';
import { EnvelopeSimple, XCircle, Lock } from 'phosphor-react-native';
import { useState } from 'react';
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import useDocument, { User } from '../hooks/useDocument';
import { validate } from 'email-validator';

export function Register() {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { register, searchEmail } = useDocument<User>('users');

  const errorSingUp = () => {
    setError(!error);
    setModalVisible(!modalVisible);
  };

  const handleSaveEmail = async () => {
    try {
      const existEmail = await searchEmail(email);

      console.log(existEmail);
      if (!validate(email) && existEmail) {
        errorSingUp();
        return;
      }

      if (password == '') {
        errorSingUp();
        return;
      }

      try {
        await register(email, password);
        console.log('E-mail salvo com sucesso!');
        navigate('student');
      } catch (erro) {
        errorSingUp();
      }
    } catch (error) {
      console.error('Erro ao salvar o e-mail:', error);
    }
  };

  return (
    <View className='items-center justify-center h-full bg-sky-500'>
      <ScrollView>
        <View className='items-start gap-y-2 h-full mt-32 w-72'>
          <View className=' text-light-100'>
            <Text className='font-ArchivoBold text-white text-2xl'>Olá</Text>
            <Text className='font-ArchivoBold text-white text-2xl'>
              Seu cadastro aqui!
            </Text>
          </View>
          <View className='items-start w-full gap-y-6 '>
            <View className='items-start gap-1 w-full'>
              <Text className='text-white text-base font-ArchivoRegular'>
                Endereço de email
              </Text>
              <View className='flex-row items-center gap-x-2 rounded-sm border-dark-50 w-full h-10  bg-blue-200  focus:border'>
                <EnvelopeSimple size={20} />
                <TextInput
                  placeholder='Digite seu e-mail'
                  value={email}
                  onChangeText={setEmail}
                  className='w-full'
                ></TextInput>
              </View>
            </View>

            <View className='items-start gap-1 w-full'>
              <Text className='text-white text-base font-ArchivoRegular'>
                Sua Senha
              </Text>
              <View className='flex-row items-center gap-x-2 rounded-sm border-dark-50 w-full h-10 bg-blue-200 focus:border'>
                <Lock size={20} />
                <TextInput
                  secureTextEntry
                  placeholder='Password'
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  underlineColorAndroid='transparent'
                  autoCapitalize='none'
                  className='w-full'
                />
              </View>
            </View>

            <TouchableOpacity
              className='items-center rounded-sm justify-center w-full h-10 bg-blue-200'
              onPress={handleSaveEmail}
            >
              <Text className='text-stone-800 font-ArchivoSemiBold'>
                Cadastrar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigate('home');
              }}
            >
              <Text className='text-white font-ArchivoBold'>
                já tem conta ? entre como estudante
              </Text>
            </TouchableOpacity>

            {error && (
              <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
              >
                <View className='absolute top-1/4 left-[20%] w-48 h-40 p-1 rounded-md bg-white '>
                  <View className='flex-row justify-end items-end  '>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(!modalVisible);
                        setError(!error);
                      }}
                      className=''
                    >
                      <Text className=''>
                        <XCircle size={24} />
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text className='text-red-500 border-light-100 text-lg text-center mt-5 font-PoppinsMedium'>
                    Ocorreu um erro ao cadastrar seu e-mail, já existe ou não é
                    válido.
                  </Text>
                </View>
              </Modal>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
