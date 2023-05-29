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
import React, { useContext, useEffect, useState } from 'react';
import { Divider, TextInput } from 'react-native-paper';

import ToWatch from '../assets/svg/to-watch.svg';

import ToStudy from '../assets/svg/to-study.svg';
// import TextInputMask from 'react-native-text-input-mask';

import { fetchDisciplines } from '../../lib/apiData';
import useAuth from '../hooks/useAuth';
import useDocument, { UserType } from '../hooks/useDocument';
import useCollection from '../hooks/useCollection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from "../contexts/AppContext";
import { AutoComplete } from "../components/AutoComplete"

export function Skiller() {
  const { navigate } = useNavigation();
  const { login, user, logout, userId, setUserId} = useAuth();
  const app = useContext(AppContext)
  const { create, remove, update, all, refreshData } = useCollection<UserType>('users');
  const { data, loading, refresh, searchEmail, getDoc } = useDocument("users", app.id)

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [zap, setZap] = useState('');
  const [biography, setBio] = useState('');
  const [link, setLink] = useState('');
  const [price, setPrice] = useState("0.00");
  const [skills, setSkill] = useState('');
  const [disciplines, setDisciplines] = useState<any>({});
  const [advice, setAdvice] = useState('');

  function onChangedZap(text: string) {
    setZap(text.replace(/[^0-9]/g, ''));
  }
  
  useEffect(() => {
    
    const listTeacher = async () => {
      try {
        console.log("aaaaaaaa");
        let userTeste = await AsyncStorage.getItem('user')
        setUserId(JSON.parse(userTeste!!).uid)
        setEmail(JSON.parse(userTeste!!).email)
        console.log(JSON.parse(userTeste!!).uid);
        console.log(userId);
        console.log("estou aqui 61");
        
        const fetchedDisciplines : string[] = await fetchDisciplines();
        const message: string = JSON.stringify(fetchedDisciplines[Math.floor(Math.random() * fetchedDisciplines.length)]);
        console.log(message)
        setAdvice(message)
        //setSkill(fetchedDisciplines);

      } catch (error) {
        console.error(error);
      }
    };

    listTeacher().catch(console.error);
  }, []);

  async function updateData() {
    const users = await all()
    let aux: UserType = {
      id: userId,
      name: fullName,
      email: email,
      password: '',
      bio: biography,
      zap: zap,
      link: link,
      price: price,
      skills: skills,
    };
    console.log("atualizaaa dados");
    console.log(userId);
    
    users.map(userData => {
      //  console.log(userData.email, user?.email)
      if (userData.id == userId) {
        console.log(userData)
        // aux = JSON.parse(JSON.stringify(userData));
        aux = userData
        console.log("aux aqui")
        console.log(aux)
        console.log("aux aqui")
        
        setFullName(aux.name!!);
        setBio(aux.bio!!);
        setEmail(user!!.email!!);
        setLink(aux.link!!);
        setPrice(aux.price!!)
        setSkill(aux.skills!!)
        setZap(aux.zap!!)

      }
    })
  }

  function sair() {
    logout();
    navigate('home');
  }

  async function atualizarDados() {

    var aux = {
      id: userId,
      name: fullName,
      email: email,
      bio: biography,
      zap: zap,
      link: link,
      price: price,
      skills: skills,
    };
    console.log("ID", app.id + " | " + userId)

    if (app.id) {
      console.log(aux)
      console.log(await update(userId, {
        id: app.id,
        name: fullName,
        email: email,
        bio: biography,
        zap: zap,
        link: link,
        price: price,
        skills: skills,
      }))

      updateData();
    } 

  }


  return (
    <ScrollView className='h-full'>
      <View className='flex items-center justify-start h-full flex-1 p-4 bg-white'>
        <View className='w-full'>
          <Text className='text-[#57534E] flex items-center px-4 text-center mt-10 mb-4 pt-4 w-full h-auto'>
            <Text className='font-ArchivoBold w-full text-4xl'>
              {fullName && fullName.length > 0 ? fullName : 'Seu nome'}
            </Text>
            {'\n'}
            <Text className='font-ArchivoBold text-base text-slate-300'>
              {email && email.length > 0 ? email : '...@...'}
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
            multiline
            numberOfLines={4}
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

          <TextInput
            label="Link da aula"
            className='w-full mt-4 bg-slate-100'
            mode='outlined'
            style={{ backgroundColor: "#FAFAFC" }}
            activeOutlineColor='#7dd3fc'
            outlineColor='#E6E6F0'
            value={link}
            onChangeText={(text) => setLink(text)}
          />

          <Divider className='w-full' />
          <Text className='font-ArchivoBold text-3xl mt-8 text-left w-full text-stone-600'>
            Suas Skills
          </Text>
          <Text className='font-ArchivoBold text-base text-left w-full text-stone-300'>
            (separadas por vírgula)
          </Text>
          <View className='w-full'>
            <TextInput
              label={`Tudo menos ${advice}`}
              className='w-full mt-4 bg-slate-100'
              mode='outlined'
              style={{ backgroundColor: "#FAFAFC" }}
              activeOutlineColor='#7dd3fc'
              outlineColor='#E6E6F0'
              value={skills}
              onChangeText={text => setSkill(text)}
            />
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
          onPress={() => updateData()} >
          <Text className='text-white ml-3 p-3 text-base font-PoppinsRegular'> Atualizar dados</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}
          className='flex mt-4 flex-row w-full flex bg-red-400 rounded-md justify-center'
          onPress={() => atualizarDados()} >
          <Text className='text-white ml-3 p-3 text-base font-PoppinsRegular'> Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
