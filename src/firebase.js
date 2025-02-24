// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase Config from Environment Variables

const fetchFirebaseConfig = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/config"); // Replace with your deployed backend URL
    const config = await response.json();
    return config;
  } catch (error) {
    console.error("Error fetching Firebase config:", error);
    return null;
  }
};

const firebaseConfig = await fetchFirebaseConfig();
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth and Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
