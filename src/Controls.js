import React from 'react';

function Controls({
  handleImageUpload,
  
  handleSizeChange,
  handleTextSizeChange,
  handleTextChange,

  imageSize,
  textSize,
  textUpload,
  
}) {
  return (
    <div>
      <label>Upload an Image:</label>
      <input
  type="file"
  className="form-control mb-3"
  accept="image/*"
  onChange={(e) => {
    
    handleImageUpload(e);
    console.log("file changed");
  }}
/>


      

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
        value={textUpload}
        onChange={handleTextChange}
        placeholder="Type your text here"
      />
    </div>
  );
}

export default Controls;
