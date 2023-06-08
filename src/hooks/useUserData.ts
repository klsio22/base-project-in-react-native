import { useState } from 'react';
import useCollection from './useCollection';
import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  getDoc,
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
  favorites?: Array<string>;
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
    biography?: string;
    zap?: string;
    link?: string;
    price?: string;
    skills?: string;
    favorites?: Array<string>;
  }): Promise<void> {
    try {
      setLoading(true);

      const { id, name, email, biography, zap, link, price, skills } = user;

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
        });
      }
      console.log('Dados atualizados com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error);
    } finally {
      setLoading(false);
    }
  }

  async function saveFavorites(
    userId?: string,
    favorites?: Array<string>
  ): Promise<void> {
    try {
      setLoading(true);

      const userDocRef = doc(collectionRef, userId);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userDocData = userDocSnapshot.data();
        const existingFavorites = userDocData?.favorites || [];

        favorites?.forEach((favorite) => {
          if (!existingFavorites.includes(favorite)) {
            existingFavorites.push(favorite);
          }
        });

        await updateDoc(userDocRef, {
          favorites: existingFavorites,
        });
      } else {
        const userData = {
          id: userId,
          favorites: favorites,
        };
        await setDoc(userDocRef, userData);
      }

      console.log('Favoritos salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar os favoritos:', error);
    } finally {
      setLoading(false);
    }
  }

  async function removeFavorite(
    userId?: string,
    favoriteId?: string
  ): Promise<void> {
    try {
      setLoading(true);

      const userDocRef = doc(collectionRef, userId);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userDocData = userDocSnapshot.data();
        const existingFavorites = userDocData?.favorites || [];

        const updatedFavorites = existingFavorites.filter(
          (favorite: string) => favorite !== favoriteId
        );

        await updateDoc(userDocRef, {
          favorites: updatedFavorites,
        });

        console.log('Favoritado removido com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao remover o favoritado:', error);
    } finally {
      setLoading(false);
    }
  }

  return {
    removeFavorite,
    saveFavorites,
    loading,
    saveDate,
  };
}
