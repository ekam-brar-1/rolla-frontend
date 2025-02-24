// src/components/GoogleLoginButton.js
import React, { useContext } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase"; // Adjust the path if needed
import { AuthContext } from "../context/AuthContext";

// Function to detect if the user is in an in-app browser (LinkedIn, Facebook, Instagram)
const isInAppBrowser = () => {
  const userAgent = navigator.userAgent || navigator.vendor;
  return /FBAN|FBAV|Instagram|LinkedIn/i.test(userAgent);
};

const GoogleLoginButton = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const handleGoogleSignIn = async () => {
    if (isInAppBrowser()) {
      alert(
        "Google Sign-In is not supported inside in-app browsers. Please open this link in Chrome or Safari."
      );
      window.location.href = "https://rolla-frontend.vercel.app"; // Redirect to your site to open in an external browser
      return;
    }

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
