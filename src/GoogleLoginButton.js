// src/components/GoogleLoginButton.js
import React, { useContext } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import { AuthContext } from "./context/AuthContext";

const GoogleLoginButton = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const handleGoogleSignIn = async () => {
    if (currentUser) {
      await signOut(auth);
      setCurrentUser(null);
    } else {
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        console.error("Google Sign-In Error:", error);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center mt-3">
      <button
        className={`btn ${
          currentUser ? "btn-danger" : "btn-primary"
        } px-4 py-2 w-100 w-md-auto`}
        onClick={handleGoogleSignIn}
      >
        {currentUser
          ? `${currentUser.displayName} - Sign Out`
          : "Sign in with Google"}
      </button>
    </div>
  );
};

export default GoogleLoginButton;
