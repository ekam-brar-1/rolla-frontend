// src/components/GoogleLoginButton.js
import React from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

const GoogleLoginButton = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const handleGoogleSignIn = async () => {
    if (currentUser) {
      // If user is already signed in, sign them out
      await signOut(auth);
      setCurrentUser(null);
    } else {
      // Sign in user
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        console.error("Google Sign-In Error:", error);
      }
    }
  };

  return (
    <button
      className={currentUser ? "btn btn-danger" : "btn btn-primary"}
      onClick={handleGoogleSignIn}
    >
      {currentUser
        ? `${currentUser.displayName} - Sign Out`
        : "Sign in with Google"}
    </button>
  );
};

export default GoogleLoginButton;
