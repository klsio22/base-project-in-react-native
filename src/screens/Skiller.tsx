import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  FlatList,
} from 'react-native';
// import { ScrollView } from 'react-native-virtualized-view'
import { useNavigation } from '@react-navigation/native';
import BackgroundBlue from '../assets/svg/background-blue.svg';
import React, { useEffect, useState } from 'react';
import { Divider, TextInput  } from 'react-native-paper';

import ToWatch from '../assets/svg/to-watch.svg';

import ToStudy from '../assets/svg/to-study.svg';
// import TextInputMask from 'react-native-text-input-mask';

import { fetchDisciplines } from '../../lib/apiData';
import useAuth from '../hooks/useAuth';
import useDocument, { User } from '../hooks/useDocument';
import useCollection from '../hooks/useCollection';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Skiller() {
  const { navigate } = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [zap, setZap] = useState('');
  const [biography, setBio] = useState('');
  const {create, remove, update, all, refreshData } = useCollection<User>('users');
  const { logout } = useAuth<User>('users');
  const [price, setPrice] = useState("0.00");
  const [skills, setSkill] = useState([{}]);
  const [userData, setUserData] = useState<any>({});
  
  // async function getUserData() {
   
    // await AsyncStorage.getItem('user').then((userNovo) => {
    //   if (userNovo) {
    //       // console.log(userNovo);
    //       return JSON.parse(userNovo)           
    //   }
    // })
  // }

  // const retrieveData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('user');
  //     if (value !== null) {
  //       return value
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };
  
// console.log(JSON.parse(retrieveData()));

  // const userData = 

  // You can extract the following properties:
  async function testee() {
    const value = await AsyncStorage.getItem('user'); 
        // console.log(value);
    const jsonValue = JSON.parse(value!!)
    // console.log(jsonValue.uid);
    return jsonValue.uid 
  }


  // const { data, loading, refresh } = useDocument("users", () => {
  //     const value = await AsyncStorage.getItem('user'); 
  //     // console.log(value);
  //     const jsonValue = JSON.parse(value!!)
  //     // console.log(jsonValue.uid);
  //     return jsonValue.uid 
  // })

  function onChangedZap(text: string) {
    setZap(text.replace(/[^0-9]/g, ''));
  }

  

  useEffect(() => {
    
    const listTeacher = async () => {
      try {
        
      //  setUserData(getUserData());
        // const value = await AsyncStorage.getItem('user'); 
        // // console.log(value);
        // const jsonValue = JSON.parse(value!!)
        // console.log(jsonValue.uid);
        
        
        // console.log("aaeeeeee");
        // console.log(data);
        // 
        // console.log(userData);
        
        
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
        setSkill(fetchedDisciplines);
        
        const aux = await all();
        // console.log(aux);
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
    <ScrollView className='h-full'>
      <View className='flex items-center justify-start h-full flex-1 p-4 bg-white'>
        <View className='w-full'>
          <Text className='text-[#57534E] flex items-center px-4 text-center mt-10 mb-4 pt-4 w-full h-auto'>
            <Text className='font-ArchivoBold w-full text-4xl'>
              Roberval
            </Text>
            {'\n'}
            <Text className='font-ArchivoBold text-base text-slate-300'>
              {userData.email}
            </Text>
          </Text>
          <Divider />
        </View>

        <View className='flex flex-row justify-evenly mt-4 w-full font-PoppinsSemiBold text-xl '>
          <TouchableOpacity
            activeOpacity={0.7}
            className='flex w-28 h-30 w-30 justify-between items-start p-4 rounded-lg bg-sky-400 '
            onPress={() => navigate('skillers')}>

            <ToStudy />

            <Text className='font-semibold text-xl font-ArchivoSemiBold text-stone-600'>
              Listar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            className='flex w-28 h-30 w-30 justify-between items-start p-4 rounded-lg bg-[#F27C7C] '
            onPress={() => sair()}
          >
            <ToWatch />

            <Text className='font-semibold text-xl font-ArchivoSemiBold text-white'>
              Sair
            </Text>
          </TouchableOpacity>
        </View>
        <Divider className='w-full my-4' />
        <View className='flex items-center w-full justify-start h-full flex-1'>
          <Divider />
          <Text className='font-ArchivoBold text-3xl mt-5 text-left w-full text-stone-600'>
            Seus dados
          </Text>
          <TextInput
            className='w-full mt-4 bg-slate-100'
            mode='outlined'
            style={{ backgroundColor: "#FAFAFC" }}
            activeOutlineColor='#7dd3fc'
            outlineColor='#E6E6F0'
            label="Nome Completo"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
          />

          <TextInput
            className='w-full mt-4 bg-slate-100'
            mode='outlined'
            style={{ backgroundColor: "#FAFAFC" }}
            activeOutlineColor='#7dd3fc'
            outlineColor='#E6E6F0'
            label="Sobre você (formação/ proffisão)"
            value={biography}
            onChangeText={text => setBio(text)}
          />
          
          <TextInput
            className='w-full mt-4 bg-slate-100'
            mode='outlined'
            style={{ backgroundColor: "#FAFAFC" }}
            activeOutlineColor='#7dd3fc'
            outlineColor='#E6E6F0'
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />

          <TextInput
            label="Whatsapp (somente números)"
            className='w-full mt-4 bg-slate-100'
            mode='outlined'
            style={{ backgroundColor: "#FAFAFC" }}
            activeOutlineColor='#7dd3fc'
            outlineColor='#E6E6F0'
            value={zap}
            keyboardType='numeric'
            onChangeText={(text) => onChangedZap(text)}
          />

          <Divider className='w-full' />
          <Text className='font-ArchivoBold text-3xl mt-8 text-left w-full text-stone-600'>
            Suas Skills
          </Text>
          <Text className='font-ArchivoBold text-base text-left w-full text-stone-300'>
            (separadas por vírgula)
          </Text>
          <View className='w-full mt-4'>
            {/* <TextInput
              className='w-full mt-2 bg-slate-100'
              mode='outlined'
              multiline
              numberOfLines={4}
              style={{ backgroundColor: "#FAFAFC" }}
              activeOutlineColor='#7dd3fc'
              outlineColor='#E6E6F0'
              label={skills.length > 0 ? 'O que você ensina: ' : "Você ainda não ensina nada ???"}
              value={skills}
              onChangeText={setSkill}
            /> */}

          </View>
          <Divider className='w-full' />
          <Text className='font-ArchivoBold text-3xl mt-8 text-left w-full text-stone-600'>
            Seu Preço
          </Text>
          <View className='w-full'>
            <TextInput
              label="(R$) Hora/Aula"
              className='w-full mt-4 bg-slate-100'
              mode='outlined'
              style={{ backgroundColor: "#FAFAFC" }}
              activeOutlineColor='#7dd3fc'
              outlineColor='#E6E6F0'
              value={price}
              keyboardType="numeric"
              onChangeText={text => setPrice(text)}
            />
          </View>


        </View>
        <TouchableOpacity activeOpacity={0.7}
          className='flex mt-4 flex-row w-full flex bg-sky-400 rounded-md justify-center'
          onPress={() => navigate('home')} >
          <Text className='text-white ml-3 p-3 text-base font-PoppinsRegular'> Atualizar dados</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
