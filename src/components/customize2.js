import React, { useState } from "react";
import ShirtPreview from "../ShirtPreview";
import Controls from "../Controls";
import { useCart } from "../context/CartContext";
import axios from "axios";
export default function Customize({shirtColor, shirtSize}){
    
  
  const [image, setImage] = useState(null);
  const [position, setPosition] = useState({ top: 90, left: 80 });
  const [textPosition, setTextPosition] = useState({ top: 50, left: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [isTextDragging, setIsTextDragging] = useState(false);
  const [imageSize, setImageSize] = useState(100);
  const [textSize, setTextSize] = useState(20);
  const [text, setText] = useState("");
 
  const [file, setFile] = useState(null);
  const [textUpload, setTextUpload] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = (e) => {
    console.log("Image upload function called",e.target.files[0]);
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);  // Store file for upload
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Store base64 for preview
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  

 // const handleColorSelect = (color) => setShirtColor(color);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsTextDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging || isTextDragging) {
      const imageBorder = document.querySelector('.imageBorder').getBoundingClientRect();
      const x = e.clientX - imageBorder.left;
      const y = e.clientY - imageBorder.top;

      if (isDragging) {
        setPosition({ top: Math.max(0, y), left: Math.max(0, x) });
      } else if (isTextDragging) {
        setTextPosition({ top: Math.max(0, y), left: Math.max(0, x) });
      }
    }
  };

  const handleSizeChange = (e) => setImageSize(e.target.value);
  const handleTextSizeChange = (e) => setTextSize(e.target.value);
  const handleTextChange = (e) => setTextUpload(e.target.value);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const cartItem = {
      id: Date.now(),
      name: "Custom Back T-Shirt",
      color: shirtColor,
      image: image,
      text: text,
      imageSize: imageSize,
      textSize: textSize,
      price: 20.0,
    };
    addToCart(cartItem);
    alert("Back T-shirt design added to cart!");
  }
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    console.log("Upload function called",file,textUpload);
    if (!file || !textUpload) {
      alert("Please select a file and enter text.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", textUpload);

    try {
      const response = await axios.post("http://localhost:5001/api/upload", formData);
      console.log("Upload successful:", response.data);
      alert("Design uploaded successfully!");
    } catch (error) {
      console.error("Error uploading:", error.response ? error.response.data : error.message);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };
  

    return(
        <div className="App" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            <div className='text-center'><h1>Edit for Back</h1></div>
      <div className="container my-4">
        <div className="row">
          <div className="col-md-6">
            <Controls
              handleImageUpload={handleImageUpload}
        
              handleSizeChange={handleSizeChange}
              handleTextSizeChange={handleTextSizeChange}
              handleTextChange={handleTextChange}
          
              imageSize={imageSize}
              textSize={textSize}
              text={textUpload}
              handleFileChange={ handleFileChange} 
            />
          </div>
          <div
  className="col-md-6 text-center bg-image"
 
>
            <ShirtPreview
              
              image={image}
              position={position}
              imageSize={imageSize}
              text={textUpload}
              textPosition={textPosition}
              textSize={textSize}
              handleMouseDown={handleMouseDown}
              handleTextMouseDown={() => setIsTextDragging(true)}
            />
            
          </div>
        </div>
      </div>
      <div className="container my-4">
        <button className="btn btn-primary mt-3" onClick={()=>{handleAddToCart();handleUpload()}} disabled={uploading}>
          Add to Cart
        </button>
      </div>
    </div>
    )
};