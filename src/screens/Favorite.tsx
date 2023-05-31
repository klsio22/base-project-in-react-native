import {
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  LogBox,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NextScreen from '../assets/svg/next-screen.svg';
import CoracaoBarrado from '../assets/svg/coracao_barras.svg';
import ZapZap from '../assets/svg/Whatsapp.svg';
import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Button, Card, Text, Divider } from 'react-native-paper';
import { ArrowLeft } from 'phosphor-react-native';
import useDocument, { UserType } from '../hooks/useDocument';
import { AppContext } from '../contexts/AppContext';
import useUserData from '../hooks/useUserData';
import useCollection from '../hooks/useCollection';
import useAuth from '../hooks/useAuth';

export default function Favorite() {
  const { navigate } = useNavigation();
  const [data, setData] = useState<any | UserType>([{}]);
  const { getUserData } = useDocument('users');

  const [userData, setUserData] = useState<any | UserType>({});
  const { saveDate } = useUserData('users');
  const { allDates } = useCollection<UserType>('users');
  const { user } = useAuth();

  async function updateData() {
    const aux = await allDates();
    let userDataGet = await getUserData(user?.uid!!);
    setUserData(userDataGet);
    console.log(userDataGet);
    // console.log(aux);
    const suply: Array<UserType> = [];
    aux.map((e) => {
      if (userDataGet && userDataGet.favorite!!.includes(e.id)) {
        suply.push(e);
      }
    });
    setData(suply);
  }

  function handleRemoveFavorite(favId: string) {
    // let array = data.filter((e: UserType) => {
    //   return function (skiller: UserType) {
    //     if (skiller.id && skiller.id != favId) {
    //         skiller.id
    //     }
    //   }
    // });
    let array: Array<string> = [];

    data.map((data: UserType) => {
      if (data.id != favId) {
        array.push(data.id);
      }
    });

    const userToUpdate = {
      id: user?.uid!!,
      name: userData.name,
      email: userData.email,
      biography: userData.bio,
      zap: userData.zap,
      link: userData.link,
      price: userData.price,
      skills: userData.skills,
      favorite: array,
    };

    console.log(array);

    saveDate(userToUpdate).catch(console.error);
    updateData();
  }

  useEffect(() => {
    updateData();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [user]);

  return (
    <View className='flex-col justify-start h-full w-full bg-sky-500'>
      <View className='px-4 py-6'>
        <View className='w-full flex-row justify-start'>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigate('home')}
          >
            <ArrowLeft size={32} color='#f7f7f7' />
          </TouchableOpacity>
        </View>
        <Text className='text-white my-4 w-52 text-3xl leading-8'>
          <Text className='font-ArchivoBold text-white'>
            Meus Skillers {'\n'} Favoritos
          </Text>
        </Text>
      </View>

      <ScrollView className='w-full h-2/3 px-4 pb-40 bg-[#f0f0f7]'>
        {data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Card className='p-0 w-90 pb-3 bg-white mb-5 mt-2' key={item.id}>
                <View className='p-5'>
                  <Text className='text-[#32264d] font-PoppinsRegular font-bold text-2xl'>
                    {item.name}
                  </Text>
                  <Text variant='titleSmall'>{item.skills}</Text>
                </View>
                {/* <Card.Title title="Roberval dos Santos" subtitle="Acadêmico, 3º período - UTFPR"/> */}
                <Card.Content className='mb-2 mt-5'>
                  <Text className='mb-5' variant='bodyMedium'>
                    {item.bio}
                  </Text>

                  <Text className='mb-5' variant='bodyMedium'>
                    {`Por aqui : ${item.link}`}
                  </Text>
                  <Divider className='m-2 w-full' />
                  <View className='flex-row justify-center mt-5'>
                    <Text className='mr-3'>Preço/hora</Text>
                    <Text className='text-sky-500 text-bold'>
                      {`R$ ${item.price}`}
                    </Text>
                  </View>
                </Card.Content>
                <Card.Actions className='flex justify-center bg-[#fafafc]'>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    className='flex w-18 bg-red-500 rounded-md justify-center p-3.5'
                    onPress={() => handleRemoveFavorite(item.id)}
                  >
                    <CoracaoBarrado />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    className='flex-1 flex-row flex bg-green-900 rounded-md justify-center'
                    onPress={() => navigate('home')}
                  >
                    <Text className='text-white ml-3 p-3 text-base font-PoppinsRegular'>
                      {' '}
                      <ZapZap /> Entrar em contato
                    </Text>
                  </TouchableOpacity>
                </Card.Actions>
              </Card>
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View className='flex items-center justify-center h-full w-full bg-white'>
            <Text className='text-[#57534E] my-10 p-4 w-full h-auto'>
              <Text className='font-ArchivoBold  text-2xl'>Seus favoritos</Text>
              {'\n'}
              <Text className='font-ArchivoBold text-2xl '>aparecerão</Text>
              {'\n'}
              <Text className='font-ArchivoBold text-2xl '>aqui!!</Text>
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
