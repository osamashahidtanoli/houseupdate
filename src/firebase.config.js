// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBG_LQRpj-oCz8WLXxzeMWHo77mBCaaxQg",
  authDomain: "house-market-place-89de9.firebaseapp.com",
  projectId: "house-market-place-89de9",
  storageBucket: "house-market-place-89de9.appspot.com",
  messagingSenderId: "959162392569",
  appId: "1:959162392569:web:2f1e1e37a3aa4e1863a728"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();