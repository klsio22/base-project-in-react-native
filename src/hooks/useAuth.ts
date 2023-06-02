import { useEffect, useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UseAuthReturn {
  loading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

/**
 * Firebase authentication hook.
 * @returns Access to main auth service using email and password strategy, plus user object and loading state flag.
 */
export default function useAuth(): UseAuthReturn {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  /*   const { refreshData } = useCollection<User>('users');
  const { data } = useCollection<UserType>('users'); */

  /**
   * Wrapper for login users with loading state flag for conditional renders.
   * @param email An active user registered in your firebase project.
   * @param password User's password.
   */
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
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
    } finally {
      setLoading(false);
    }
  };

  /**
   * Wrapper for logout users.
   */
  const logout = async (): Promise<void> => {
    await signOut(getAuth());
    console.log('Saindo');
    setUser(null);
    await AsyncStorage.removeItem('user');
    await AsyncStorage.getAllKeys();
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user);
        AsyncStorage.setItem('user', JSON.stringify(user)).catch(console.error);
      } else {
        setUser(null);
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

  return { loading, user, login, logout };
}
