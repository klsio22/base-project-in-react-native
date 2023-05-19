import { useNavigation } from '@react-navigation/native';
import { EnvelopeSimple, XCircle, Lock } from 'phosphor-react-native';
import { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export function Register() {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

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

            <TouchableOpacity className='items-center rounded-sm justify-center w-full h-10 bg-blue-200'>
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
              <Text className='text-[#EF3333] text-base text-center font-medium'>
                Ocorreu um erro ao cadastrar email, verifique se já existe ou é
                valido
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
