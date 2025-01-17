
import { initializeApp } from "firebase/app";

import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import { doc, getDoc, getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROGECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};


export const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export const docRef=doc(db,'about','about');

export const getAllPromise= getDoc(docRef);


