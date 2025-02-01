// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// 1. Your web app's Firebase configuration (from Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyC0yoeAxZryUPMd7zWLipyEtarVS8U4PXM",
    authDomain: "rolla-9f909.firebaseapp.com",
    projectId: "rolla-9f909",
    storageBucket: "rolla-9f909.firebasestorage.app",
    messagingSenderId: "266403288942",
    appId: "1:266403288942:web:d4702083bf3f190909137f",
    measurementId: "G-G9QBXE4WYC"
  };

// 2. Initialize Firebase
const app = initializeApp(firebaseConfig);

// 3. Auth and Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
