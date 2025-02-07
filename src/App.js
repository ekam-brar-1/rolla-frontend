import React, { useState } from "react";
import Header from "./Header";
import ShirtPreview from "./ShirtPreview";
import Controls from "./Controls";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Checkout from "./Checkout";
import ShoppingItem from "./shoppingItem";
import Customize from "./customize";
import TrendyDesigns from "./trendyDesign";

import { Route, Routes } from "react-router-dom";
import AboutUs from "./aboutus";
import GoogleLoginButton from "./GoogleLoginButton";
import SomeComponent from "./someComponent";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";
//aimport UploadDesign from './components/UploadDesign';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div>
          <Routes>
            <Route path="/customize" element={<Customize />} />
            <Route path="/trendyDesign" element={<TrendyDesigns />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/" element={<TrendyDesigns />} />
          </Routes>
          <Cart />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
