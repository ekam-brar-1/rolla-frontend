import React, { useState } from 'react';
import Header from './Header';
import ShirtPreview from './ShirtPreview';
import Controls from './Controls';
import './App.css';
import { AuthProvider } from "./context/AuthContext";
import Checkout from './Checkout';
import ShoppingItem from './shoppingItem';
import Customize from './customize';
import TrendyDesigns from './trendyDesign';

import { Route,Routes } from 'react-router-dom';
import AboutUs from './aboutus';
import GoogleLoginButton from './GoogleLoginButton';
import SomeComponent from './someComponent';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart';
//aimport UploadDesign from './components/UploadDesign';

function App() {
  const [checkout, setCheckout] = useState(false);
  const handleClick = () => {
    setCheckout(true); // Update state to show the component
  };
  return (
    
    <AuthProvider>
      <CartProvider>
            <div >
     
    
      
      <Routes>
          <Route path="/customize" element={<Customize />} />
          <Route path="/trendyDesign" element={<TrendyDesigns />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/" element={<TrendyDesigns />} />
        </Routes>
<Cart />
      <div className='d-flex flex-column align-items-center'>
      <button type="button" onClick={handleClick} class="btn btn-primary btn-lg btn-block ">
      Checkout</button>
      {checkout && <Checkout />}
      </div>
      import GoogleLoginButton from "../components/GoogleLoginButton";


   
    

    </div>
    </CartProvider>
    </AuthProvider>

  );
}

export default App;
