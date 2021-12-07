import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, getAuth } from '@firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDJNySXioCDvnnDXcKYJ8J-ymNvI8o7xYI",
  authDomain: "wclone-5a77e.firebaseapp.com",
  projectId: "wclone-5a77e",
  storageBucket: "wclone-5a77e.appspot.com",
  messagingSenderId: "827821099814",
  appId: "1:827821099814:web:9e632f1f100848a318cfe7"
};
 const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  export const provider = new GoogleAuthProvider(app)
  export const auth = getAuth(app)
  export const storage = getStorage(app)
  export default db;


