import { initializeApp } from "@firebase/app";
import { getAuth, GoogleAuthProvider } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDuN-yNGU1KN2poTG5fbqumMsN71rQZt0o",
  authDomain: "fir-question-cb6bc.firebaseapp.com",
  projectId: "fir-question-cb6bc",
  storageBucket: "fir-question-cb6bc.appspot.com",
  messagingSenderId: "118186240572",
  appId: "1:118186240572:web:3c0a9dc24751eafc1f3139",
  measurementId: "G-TG6EK0HFSQ",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);

export const database = getDatabase(app);

