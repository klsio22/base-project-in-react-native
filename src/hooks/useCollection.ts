import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

/**
 * Hook to access and manage a firestore collection.
 * @param collectionName Collection name in plural (e.g. 'books'). Can also be a path to subcollection.
 * @param precache Should all records be loaded when hook starts? default is true. Avoid using with big collections.
 * @returns
 */
export default function useCollection<T extends { [x: string]: any }>(
  collectionName: string,
  precache = true
) {
  const db = getFirestore();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Array<T>>([]);

  const create = async (newVal: T) => {
    const docRef = await addDoc(collection(db, collectionName), newVal);
    return docRef.id;
  };
  const remove = async (id: string) => {
    await deleteDoc(doc(db, collectionName, id));
  };

  const update = async (id: string, newVal: T) => {
    if (newVal.id) delete newVal.id;
    await updateDoc(doc(db, collectionName, id), newVal);
  };

  const allDates = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, collectionName));
    const dataAsMap = querySnapshot.docs.map((doc) => {
      const data = doc.data() as T;
      return { id: doc.id, ...data };
    });
    setData(dataAsMap);
    setLoading(false);
    return dataAsMap;
  };

  const refreshData = async () => {
    await allDates();
  };

  // Initial call to fill 'data' with all documents when precache is active.
  useEffect(() => {
    const loadDates = async () => {
      if (precache) await allDates();
    };

    loadDates().catch(console.error);
  }, []);

  return { data, loading, create, remove, update, allDates, refreshData };
}
