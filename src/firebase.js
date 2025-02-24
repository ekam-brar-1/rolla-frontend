// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Function to fetch Firebase config from backend synchronously
const fetchFirebaseConfig = async () => {
  try {
    const response = await fetch(
      "https://rolla-backend.onrender.com/api/config"
    ); // Use deployed backend URL
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const config = await response.json();
    console.log("Firebase Config:", config); // Debugging
    return config;
  } catch (error) {
    console.error("Error fetching Firebase config:", error);
    return null;
  }
};

// Synchronously fetch the config before initializing Firebase
const firebaseConfig = await fetchFirebaseConfig();

// Initialize Firebase (Unchanged)
const app = initializeApp(firebaseConfig);

// Auth and Provider (Unchanged)
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
