import React, { useState } from 'react';
import Header from './Header';
import './App.css';

function App() {
  const [shirtColor, setShirtColor] = useState("#ffffff");
  const [image, setImage] = useState(null);
  const [position, setPosition] = useState({ top: 90, left: 80 });
  const [textPosition, setTextPosition] = useState({ top: 50, left: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [isTextDragging, setIsTextDragging] = useState(false);
  const [imageSize, setImageSize] = useState(100);
  const [textSize, setTextSize] = useState(20); // State for text size
  const [text, setText] = useState(""); // State for the text input

  // Preset color options for the t-shirt
  const colorOptions = [
    "#ffffff", "#000000", "#FF5733", "#33FF57", "#3357FF",
    "#FFD700", "#FF69B4", "#800080", "#00CED1", "#FF4500"
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorSelect = (color) => {
    setShirtColor(color);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsTextDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const imageBorder = document.querySelector('.imageBorder').getBoundingClientRect();
      const x = e.clientX - imageBorder.left - imageSize / 2; // Center the image
      const y = e.clientY - imageBorder.top - imageSize / 2; // Center the image

      // Set boundaries to keep the image within the imageBorder area
      const newPosition = {
        top: Math.max(0, Math.min(y, imageBorder.height - imageSize)),
        left: Math.max(0, Math.min(x, imageBorder.width - imageSize)),
      };

      setPosition(newPosition);
    }

    if (isTextDragging) {
      const imageBorder = document.querySelector('.imageBorder').getBoundingClientRect();
      const x = e.clientX - imageBorder.left - textSize / 2; // Center the text
      const y = e.clientY - imageBorder.top - textSize / 2; // Center the text

      // Set boundaries to keep the text within the imageBorder area
      const newTextPosition = {
        top: Math.max(0, Math.min(y, imageBorder.height - textSize)),
        left: Math.max(0, Math.min(x, imageBorder.width - textSize)),
      };

      setTextPosition(newTextPosition);
    }
  };

  const handleSizeChange = (e) => {
    setImageSize(e.target.value);
  };

  const handleTextSizeChange = (e) => {
    setTextSize(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleTextMouseDown = (e) => {
    e.preventDefault();
    setIsTextDragging(true);
  };

  return (
    <div className="App" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <Header />
      <div className="container my-4">
        <div className="row">
          <div className="col-md-6">
            <label>Upload an Image:</label>
            <input
              type="file"
              className="form-control mb-3"
              accept="image/*"
              onChange={handleImageUpload}
            />

            <label>Select T-Shirt Color:</label>
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

            <label>Adjust Image Size:</label>
            <input
              type="range"
              className="form-range"
              min="50"
              max="200"
              value={imageSize}
              onChange={handleSizeChange}
            />

            <label>Adjust Text Size:</label>
            <input
              type="range"
              className="form-range"
              min="10"
              max="100"
              value={textSize}
              onChange={handleTextSizeChange}
            />

            <label>Enter Text for T-Shirt:</label>
            <input
              type="text"
              className="form-control mb-3"
              value={text}
              onChange={handleTextChange}
              placeholder="Type your text here"
            />
          </div>

          {/* Right Column: T-Shirt Preview */}
          <div className="col-md-6 text-center">
            <div className="shirt-preview" style={{ 
              width: '400px', 
              height: '400px', 
              position: 'relative', 
              margin: '0 auto',
              backgroundImage: `url('/tshirt.png')`, 
              backgroundSize: 'contain', 
              backgroundRepeat: 'no-repeat', 
              backgroundPosition: 'center',
              border: '2px solid #ccc' 
            }}>
              <div className="imageBorder" style={{ 
                width: '200px', 
                height: '320px', 
                border: '2px solid #ccc', 
                position: 'absolute',
                top: '60px',  // Positioning the inner border within the t-shirt
                left: '97px',
                overflow: 'hidden'  // Ensure uploaded image stays within this border
              }}>
                <div
                  className="uploaded-image"
                  style={{
                    backgroundImage: image ? `url(${image})` : 'none',
                    top: position.top,
                    left: position.left,
                    width: `${imageSize}px`,
                    height: `${imageSize}px`,
                    position: 'absolute',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    cursor: 'grab'
                  }}
                  onMouseDown={handleMouseDown}
                ></div>

                {/* Text Display */}
                <div
                  className="uploaded-text"
                  style={{
                    position: 'absolute',
                    top: textPosition.top,
                    left: textPosition.left,
                    fontSize: `${textSize}px`, // Use text size state for dynamic sizing
                    color: '#000', // You can customize the text color
                    cursor: 'text',
                    userSelect: 'none' // Prevent text selection during dragging
                  }}
                  onMouseDown={handleTextMouseDown}
                >
                  {text}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
