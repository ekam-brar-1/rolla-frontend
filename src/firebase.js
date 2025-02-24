// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Function to fetch Firebase config from backend
const fetchFirebaseConfig = async () => {
  try {
    const response = await fetch(
      "https://rolla-backend.onrender.com/api/config"
    ); // Replace with your deployed backend URL
    const config = await response.json();
    return config;
  } catch (error) {
    console.error("Error fetching Firebase config:", error);
    return null;
  }
};

// Initialize Firebase asynchronously
const initializeFirebase = async () => {
  const firebaseConfig = await fetchFirebaseConfig();
  if (firebaseConfig) {
    const app = initializeApp(firebaseConfig);
    return {
      auth: getAuth(app),
      googleProvider: new GoogleAuthProvider(),
    };
  }
  return null;
};

// Export Firebase Auth & Provider when ready
const firebaseServices = initializeFirebase();
export default firebaseServices;
