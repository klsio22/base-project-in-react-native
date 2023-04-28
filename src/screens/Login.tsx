import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

export function Login() {
   const { navigate } = useNavigation();
   
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setEmail('');
  };

  const handleSubmitEmail = () => {
    // Fazer algo com o email aqui, como enviar para um servidor ou salvar em um estado global
    setIsPopupVisible(false);
    setEmail('');
    navigate('login');
  };
  return (
    <View className='flex items-center justify-start h-full w-full bg-white'>
      <ScrollView>
        <View className='bg-sky-500'>
          <Text>Login</Text>
        </View>
      </ScrollView>
    </View>
  );
}
