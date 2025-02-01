import React from 'react';

function ShirtPreview({
  shirtColor,
  image,
  position,
  imageSize,
  text,
  textPosition,
  textSize,
  handleMouseDown,
  handleTextMouseDown,
}) {
  return (
    <div
      className="shirt-preview bg-image"
      style={{
        backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05cnl-t6z4pQxPLmBBlk5jH2FR_bRY_oICw&s)",BackgroundSize: '100px',backgroundRepeat: "no-repeat",backgroundPosition: "center", 
        width: '400px',
        position: 'relative',
        margin: '0 auto',
        border: '2px solid #ccc',
        backgroundColor: shirtColor, // Set background color dynamically
        overflow: 'hidden',
      }}
    >
      <div
        className="imageBorder"
        style={{
          width: '107px',
          height: '180px',
          border: '2px solid #ccc',
          position: 'absolute',
          top: '110px', // Position the inner border
          left: '145px',
          overflow: 'hidden', // Ensure uploaded image stays within this border
        }}
      >
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
            cursor: 'grab',
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
            fontSize: `${textSize}px`,
            color: '#000',
            cursor: 'text',
            userSelect: 'none', // Prevent text selection during dragging
          }}
          onMouseDown={handleTextMouseDown}
        >
          {text}
        </div>
      </div>
    </div>
  );
}

export default ShirtPreview;
