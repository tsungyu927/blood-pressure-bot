import { initializeApp } from 'firebase/app';
import {
  collection, getFirestore, getDocs, query, orderBy,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAEx2O2foLpX1gs0krYkQbAPfpOeokz5LU',
  authDomain: 'blood-pressure-recorder-493d0.firebaseapp.com',
  projectId: 'blood-pressure-recorder-493d0',
  storageBucket: 'blood-pressure-recorder-493d0.appspot.com',
  messagingSenderId: '973977703566',
  appId: '1:973977703566:web:6f9785db68b761b964e5df',
  measurementId: 'G-Z10G2KXR9T',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getValueSync = async (userId) => {
  const col = collection(db, 'User', `${userId}`, 'Data');
  const q = query(col, orderBy('DATE', 'desc'));
  const snapShot = await getDocs(q);
  return snapShot.docs.map((doc) => doc.data());
};

export default getValueSync;
