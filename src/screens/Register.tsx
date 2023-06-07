import { useNavigation } from '@react-navigation/native';
import { EnvelopeSimple, XCircle, Lock } from 'phosphor-react-native';
import { useEffect, useState } from 'react';
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import useDocument, { UserType } from '../hooks/useDocument';
import { validate } from 'email-validator';
import { Formik } from 'formik';
import * as yup from 'yup';

export function Register() {
  const { navigate } = useNavigation();

  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Variable to track submit button click

  const { register, searchEmail } = useDocument<UserType>('users');

  const errorSingUp = () => {
    setError(!error);
    setModalVisible(!modalVisible);
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
    password: yup
      .string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .required('Campo obrigatório'),
  });

  const handleSaveEmail = async (email: string, password: string) => {
    try {
      await register(email, password);
      console.log('E-mail salvo com sucesso!');
      navigate('student');
    } catch (erro) {
      errorSingUp();
    }
  };

  return (
    <View className='items-center justify-center h-full bg-sky-500'>
      <ScrollView>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values) => {
            setIsSubmitted(true);
            await handleSaveEmail(values.email, values.password);
          }}
          validationSchema={validationSchema}
          validate={async (values) => {
            const errors: { email?: string; password?: string } = {};

            if (!validate && (await searchEmail(values.email))) {
              errors.email = 'E-mail inválido ou já existente';
            }

            if (!values.password) {
              errors.password = 'Campo obrigatório';
            }

            return errors;
          }}
        >
          {(formikProps) => (
            <View className='items-start gap-y-2 h-full mt-32 w-72'>
              <View className=' text-light-100'>
                <Text className='font-ArchivoBold text-white text-2xl'>
                  Olá
                </Text>
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
                      value={formikProps.values.email}
                      onChangeText={formikProps.handleChange('email')}
                      className='w-full'
                    ></TextInput>
                  </View>
                  {isSubmitted && formikProps.errors.email && (
                    <Text className='text-yellow-400 text-sm font-font-ArchivoRegular mt-1'>
                      {formikProps.errors.email}
                    </Text>
                  )}
                </View>

                <View className='items-start gap-1 w-full'>
                  <Text className='text-white text-base font-ArchivoRegular'>
                    A senha deve ter no mínimo 6 caracteres
                  </Text>
                  <View className='flex-row items-center gap-x-2 rounded-sm border-dark-50 w-full h-10 bg-blue-200 focus:border'>
                    <Lock size={20} />
                    <TextInput
                      secureTextEntry
                      placeholder='Password'
                      value={formikProps.values.password}
                      onChangeText={formikProps.handleChange('password')}
                      underlineColorAndroid='transparent'
                      autoCapitalize='none'
                      className='w-full'
                    />
                  </View>
                  {isSubmitted && formikProps.errors.password && (
                    <Text className='text-yellow-400 text-sm font-font-ArchivoRegular mt-1'>
                      {formikProps.errors.password}
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  className='items-center rounded-sm justify-center w-full h-10 bg-blue-200'
                  onPress={() => {
                    setIsSubmitted(true);
                    formikProps.handleSubmit();
                  }}
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
              </View>
            </View>
          )}
        </Formik>
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
      </ScrollView>
    </View>
  );
}
