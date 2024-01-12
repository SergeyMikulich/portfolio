import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1apc7piFmTUIL63PvHytdXffb8KowHrs",
  authDomain: "chat-98fdd.firebaseapp.com",
  projectId: "chat-98fdd",
  storageBucket: "chat-98fdd.appspot.com",
  messagingSenderId: "692340603129",
  appId: "1:692340603129:web:cbf6ed50dc3c7b1f1cca28"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();