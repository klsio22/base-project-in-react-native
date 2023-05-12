import {
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

export type Email = {
  id?: string;
  address: string;
};

/**
 * Hook to access and manage a firestore document.
 * @param collectionName Collection name in plural (e.g. 'emails'). Can also be a path to subcollection.
 * @returns
 */
export default function useDocument<T extends { [x: string]: any }>(
  collectionName: string,
  id: string,
  realtime: boolean = true
) {
  const db = getFirestore();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T>();

  const docRef = doc(db, collectionName, id);

  /**
   * Create or update a document in the given collection.
   * @param newVal A new record of collection type. Entire content will be overwritten!
   * @returns Id of the created document.
   */
  const upsert = async (newVal: T) => {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // O documento já existe, verifique se o e-mail já foi cadastrado
      const existingEmails = docSnap.data()?.emails || [];

      if (existingEmails.includes(newVal.address)) {
        // O e-mail já existe no array, não faça nada
        throw new Error();
      } else {
        // Adicione o novo e-mail ao array existente
        const updatedEmails = [...existingEmails, newVal.address];
        await updateDoc(docRef, { emails: updatedEmails });
      }
    } else {
      // O documento não existe, então crie-o com o novo e-mail
      await setDoc(docRef, { emails: [newVal.address] });
    }
  };

  /**
   * Refresh data, useful for non-realtime usage.
   * @returns updated data.
   */
  const refresh = async () => {
    setLoading(true);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data() as T;
    setData(data);
    setLoading(false);
    return data;
  };

  // Initial call to fill 'data' with the document when precache is active.
  useEffect(() => {
    refresh();

    const unsub = realtime
      ? onSnapshot(docRef, (docSnap) => {
          const data = docSnap.data() as T;
          setData(data);
        })
      : () => {};

    return unsub;
    // eslint-disable-next-line
  }, []);

  return { data, loading, upsert, refresh };
}
