import React from "react";
import Header from "./Header";
import { useState } from "react";

import Customize3 from "./components/customize3";

export default function Customize() {
  const [shirtColor, setShirtColor] = useState("#ffffff");
  const [shirtSize, setShirtSize] = useState("M");
  const handleColorSelect = (color) => setShirtColor(color);
  const handleSizeSelect = (size) => setShirtSize(size);

  return (
    <div className="App">
      <Header />

      <Customize3 />
    </div>
  );
}
