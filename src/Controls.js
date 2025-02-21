import React from "react";

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
    <div className="container p-3">
      <div className="mb-3">
        <label className="form-label">Upload an Image:</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={(e) => {
            handleImageUpload(e);
            console.log("File changed");
          }}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Adjust Image Size:</label>
        <input
          type="range"
          className="form-range"
          min="50"
          max="200"
          value={imageSize}
          onChange={handleSizeChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Adjust Text Size:</label>
        <input
          type="range"
          className="form-range"
          min="10"
          max="100"
          value={textSize}
          onChange={handleTextSizeChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Enter Text for T-Shirt:</label>
        <input
          type="text"
          className="form-control"
          value={textUpload}
          onChange={handleTextChange}
          placeholder="Type your text here"
        />
      </div>
    </div>
  );
}

export default Controls;
