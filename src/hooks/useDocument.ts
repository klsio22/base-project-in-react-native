import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

export type UserType = {
  id: string;
  name?: string;
  email: string;
  password?: string;
  bio?: string;
  zap?: string;
  link?: string;
  price?: string;
  skills?: string ;
};

/**
 * @param collectionName Collection name in plural (e.g. 'users'). Can also be a path to subcollection.
 * @returns
 */
export default function useDocument<T extends { [x: string]: any }>(
  collectionName: string,
  realtime: boolean = true
) {
  const db = getFirestore();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T>();

  const collectionRef = collection(db, collectionName);

  const searchEmail = async (email: string) => {
    const queryRef = query(collectionRef, where('email', '==', email));
    const querySnapshot = await getDocs(queryRef);
    return !querySnapshot.empty;
  };

  const register = async (email: string, password: string) => {
    try {
      const auth = getAuth();
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = response.user.uid;
      const data = {
        id: uid,
        email,
      };

      const newDocRef = doc(collectionRef, uid);
      await setDoc(newDocRef, data);
    } catch (error) {
      throw new Error('Ocorreu um erro ao fazer o cadastro');
    }
  };


  const getUserData = async (userId: string): Promise<UserType | null> => {
    try {
      console.log("use doc id:", userId);
      
      const userDocRef = doc(collectionRef, userId);
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data() as UserType;
        return userData;
      }
  
      return null;
    } catch (error) {
      // console.error('Erro ao obter os dados do usuário:', error);
      console.info('Erro ao obter os dados do usuário:', error)
      return null;
    }
  };
  
  /**
   * Refresh data, useful for non-realtime usage.
   * @returns updated data.
   */
  const refresh = async () => {
    setLoading(true);
    const docSnap = await getDoc(doc(collectionRef));
    const data = docSnap.data() as T;
    setData(data);
    setLoading(false);
    return data;
  };

  // Initial call to fill 'data' with the document when precache is active.
  useEffect(() => {
    refresh();

    const unsub = realtime
      ? onSnapshot(doc(collectionRef), (docSnap) => {
          const data = docSnap.data() as T;
          setData(data);
        })
      : () => {};

    return unsub;
    // eslint-disable-next-line
  }, []);

  return { data, loading, refresh, register, searchEmail, getDoc,getUserData };
}
