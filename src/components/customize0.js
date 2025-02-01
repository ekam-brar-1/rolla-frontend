import React, { useState } from "react";
import ShirtPreview from "../ShirtPreview";
import Controls from "../Controls";
import { useCart } from "../context/CartContext";
import axios from "axios";
export default function Customize(){
    
  const [shirtColor, setShirtColor] = useState("#ffffff");
  const [shirtSize, setShirtSize] = useState("M");
  const handleColorSelect = (color) => setShirtColor(color);
    const handleSizeSelect = (size) => setShirtSize(size);

  const colorOptions = [
    "#ffffff", "#000000", "#FF5733", "#33FF57", "#3357FF",
    "#FFD700", "#FF69B4", "#800080", "#00CED1", "#FF4500"
  ];
  const shirtsize = ["XS","S","M","L","XL","XXL"];

  

    return(
        <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>Customize Your Shirt</h1>
              <div className="d-flex flex-wrap mt-2">
        {colorOptions.map((color) => (
          <button
            key={color}
            className="btn me-2 mb-2"
            style={{
              backgroundColor: color,
              width: '40px',
              height: '40px',
              borderRadius: '4px',
              border: '1px solid #ddd',
            }}
            onClick={() => handleColorSelect(color)}
          ></button>
        ))}
        </div>
        <div className="d-flex flex-wrap mt-2">
        {shirtsize.map((size) => (
          <button
            key={size}
            className="btn me-2 mb-2"
            style={{
              backgroundColor: size,
              width: '40px',
              height: '40px',
              borderRadius: '4px',
              border: '1px solid #ddd',
            }}
            onClick={() => handleSizeSelect(size)}
          ></button>
        ))}
        </div>
    </div>
    )
};