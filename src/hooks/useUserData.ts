import { useState } from 'react';
import useCollection from './useCollection';
import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore';

export type UserType = {
  id: string;
  name: string;
  email: string;
  bio?: string;
  zap?: string;
  link?: string;
  price?: string;
  skills?: string;
  favorite?: Array<string>;
};

export default function useUserData<T extends { [x: string]: any }>(
  collectionName: string
) {
  const db = getFirestore();
  const collectionRef = collection(db, collectionName);

  const { create } = useCollection<UserType>(collectionName);
  const [loading, setLoading] = useState(true);

  async function saveDate(user: {
    id: string;
    name: string;
    email: string;
    biography: string;
    zap: string;
    link: string;
    price: string;
    skills: string;
    favorite?: Array<string>;
  }): Promise<void> {
    try {
      setLoading(true);
      const { id, name, email, biography, zap, link, price, skills, favorite } =
        user;

      const q = query(
        collectionRef,
        where('email', '==', email),
        where('id', '==', id)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        const newUser: UserType = {
          id,
          name,
          email,
          bio: biography,
          zap,
          link,
          price,
          skills,
          favorite,
        };

        await create(newUser);
      } else {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, {
          name,
          email,
          bio: biography,
          zap,
          link,
          price,
          skills,
          favorite,
        });
      }
      console.log('Dados atualizados com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    saveDate,
  };
}
