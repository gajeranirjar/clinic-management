import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyBJhjTBLU4thNOgxJ07zaN0VmUU2SA4QRI',
  authDomain: 'clinic-management-18.firebaseapp.com',
  projectId: 'clinic-management-18',
  storageBucket: 'clinic-management-18.firebasestorage.app',
  messagingSenderId: '139830302828',
  appId: '1:139830302828:web:40f1933c7b491ec2576049',
  measurementId: 'G-LX487HZ22H',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);