// src/components/GoogleLoginButton.js
import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

const GoogleLoginButton = () => {
  const { currentUser, handleSignOut } = useContext(AuthContext);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // The onAuthStateChanged listener in AuthContext will set currentUser
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  if (currentUser) {
    // If user is logged in, show their name and a sign-out action
    return (
      <button className="btn btn-success" onClick={handleSignOut}>
        {currentUser.displayName || "Sign Out"}
      </button>
    );
  } else {
    // If user is not logged in, show "Sign in with Google"
    return (
      <button className="btn btn-primary" onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
    );
  }
};

export default GoogleLoginButton;
