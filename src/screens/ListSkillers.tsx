import {
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  LogBox,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NextScreen from '../assets/svg/next-screen.svg';
import Coracao from '../assets/svg/Vector.svg';
import ZapZap from '../assets/svg/Whatsapp.svg';
import React, { useContext, useEffect, useState } from 'react';
import { Card, Text, Divider } from 'react-native-paper';
import useCollection from '../hooks/useCollection';
import useDocument, { UserType } from '../hooks/useDocument';
import {AppContext} from '../contexts/AppContext';
import useUserData from '../hooks/useUserData';


export function ListSkillers() {
  const { navigate } = useNavigation();
  const [filterText, setFilterText] = useState('');
  const { allDates } = useCollection<UserType>('users');
  const [data, setData] = useState<any | UserType>([{}]);
  const [filteredData, setFilteredData] = useState(data)
  const { getUserData } = useDocument('users');
  const app = useContext(AppContext);
  const [userData, setUserData] = useState<any | UserType>({})
  const { saveDate } = useUserData('users');

  useEffect(() => {
    updateData();
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  }, []);

  async function updateData() {
    const aux = await allDates();
    // console.log(aux);
    const suply: Array<UserType> = [];
    aux.map((e) => {
      if (e && e.skills?.length) {
        suply.push(e);
      }
    });
    setFilteredData(suply);
    setData(suply);
    let userDataGet = await getUserData(app.id!!);
    setUserData(userDataGet);
    console.log(userDataGet);
  }

  function handleAddFavorite(favId: string) {
    let array = userData.favorite ? userData.favorite : []  
    array.push(favId);

    const userToUpdate = {
      id: app.id!!,
      name:userData.name,
      email:userData.email,
      biography:userData.bio,
      zap:userData.zap,
      link:userData.link,
      price:userData.price,
      skills:userData.skills,
      favorite: array
    };
    saveDate(userToUpdate).catch(console.error);
  }

  function handleFilter() {
    console.log("filterText:", filterText);
    
    if (filterText.length > 1) {
      const filteredAux = data.filter((e: UserType) => {
        return e.zap && e.zap.includes(filterText) ||
               e.name && e.name.includes(filterText) ||
               e.bio && e.bio.includes(filterText);
      });  
      setFilteredData(filteredAux);
    } else {
      console.log("log do else aquiiiiiii");
      setFilteredData(data);
    }
 }

  return (
    <View className='flex-col h-auto w-full bg-sky-500'>
      <View className='px-4 py-6 h-1/3'>
        <View className='w-full flex-row justify-start'>
          <TouchableOpacity
            activeOpacity={0.7}
            className='rotate-180'
            onPress={() => navigate('home')}
          >
            <NextScreen />
          </TouchableOpacity>
        </View>
        <Text className='text-white my-4 w-52 text-3xl leading-8'>
          <Text className='font-ArchivoBold text-white'>
            Skillers {'\n'} Disponíveis
          </Text>
        </Text>
        <TextInput
          editable
          className='m-5'
          value={filterText}
          placeholder='Filtrar por dia, matéria'
          placeholderTextColor='#fff'
          keyboardType='default'
          onChangeText={newValue => {
            setFilterText(newValue);
            handleFilter();
          }}
        />
        <Divider />
      </View>

      <ScrollView className='w-full h-2/3 px-4 pb-40 bg-[#f0f0f7]'>
        {filteredData.length > 0 ? <FlatList
          data={filteredData}
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
                  className='flex w-18 bg-sky-300 rounded-md justify-center p-3.5'
                  onPress={() => handleAddFavorite(item.id)}
                >
                  <Coracao />
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
        /> : <View className='flex items-center justify-center h-full w-full bg-white'>
              <Text className='text-[#57534E] my-10 p-4 w-full h-auto'>
                <Text className='font-ArchivoBold  text-2xl'>
                  Os melhores skillers 
                </Text>
                {'\n'}
                <Text className='font-ArchivoBold text-2xl '>
                  aparecerão
                </Text>
                {'\n'}
                <Text className='font-ArchivoBold text-2xl '>aqui!!</Text>
              </Text>
            </View>
          }
        
      </ScrollView>
    </View>
  );
}
