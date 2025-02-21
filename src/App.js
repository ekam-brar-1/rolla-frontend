import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Checkout from "./Checkout";

import Customize from "./customize";
import TrendyDesigns from "./trendyDesign";
import Success from "./components/Success";
import Canceled from "./components/Canceled";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./aboutus";

import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";

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
            <Route path="/checkout" element={<Checkout />} />

            <Route path="/success" element={<Success />} />
            <Route path="/canceled" element={<Canceled />} />
          </Routes>
          <Cart />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
