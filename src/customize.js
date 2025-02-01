import React from "react";
import Header from "./Header";
import{useState} from "react";
import Customize1 from "./components/customize1";
import Customize2 from "./components/customize2";
  import Cart from "./components/Cart";
  import Customize0 from "./components/customize0";
import Customize3 from "./components/customize3";
import ImageUploadForm from "./components/test";
export default function Customize(){
  const [shirtColor, setShirtColor] = useState("#ffffff");
  const [shirtSize, setShirtSize] = useState("M");
  const handleColorSelect = (color) => setShirtColor(color);
    const handleSizeSelect = (size) => setShirtSize(size);

  return(
    <div className="App">
      <Header />
    
      <Customize3 />
      <Cart />
    </div>
  );
}
