import { useEffect, useState } from 'react';

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';
import useCollection from './useCollection';
import { UserType } from './useDocument';
import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";

/**
 * Firebase authentication hook.
 * @returns Access to main auth service using email and password strategy, plus user object and loading state flag.
 */
export default function useAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState('');
  const { refreshData } = useCollection<User>('users');
  const {  data  } = useCollection<UserType>('users');
  const app = useContext(AppContext)
  
  
  /**
   * Wrapper for login users with loading state flag for conditional renders.
   * @param email An active user registered in your firebase project.
   * @param password User's password.
   */

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      const dataObject = data;
      console.log(data)
      dataObject.map(e=>{
        if(e.email == email){
          //console.log(e)
          setUserId(e.id)
          app.id = e.id;
          console.log(e.id, "<-- userId")
        }
      })
    } catch (error) {
      if ((error as { code: string }).code === 'auth/wrong-password') {
        throw new Error('Senha ou email incorreto. Verifique novamente.');
      } else if (
        (error as { code: string }).code === 'auth/too-many-requests'
      ) {
        throw new Error(
          'Acesso temporariamente desabilitado devido a muitas tentativas de login falhadas. Tente novamente mais tarde ou redefina sua senha.'
        );
      } else {
        throw new Error('Email ou usuário não existe cadastrado');
      }
    }
  };

  /**
   * Wrapper for logout users.
   */
  const logout = async () => {
    console.log(await AsyncStorage.getAllKeys());
    
    await signOut(getAuth());
    console.log("tamo aeeeee");
    
    setUser(null);
    await AsyncStorage.removeItem('user');
    console.log(await AsyncStorage.getAllKeys());
    
  };


  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUser(user);
        
      } else {
        setUser(null);
        AsyncStorage.removeItem('user');
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUser(user);
        AsyncStorage.setItem('user', JSON.stringify(user)).catch(console.error);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const restoreUser = async (): Promise<void> => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));

        }
      } catch (error) {
        console.error('Erro ao restaurar usuário:', error);
      }
    };

    restoreUser().catch(console.error);
  }, []);

  return { loading, user, userId, login, logout };
}
