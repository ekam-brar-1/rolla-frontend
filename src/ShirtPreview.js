import React from "react";

function ShirtPreview({
  shirtColor = "#fff",
  image = null,
  position = { top: 90, left: 80 },
  imageSize = 100,
  text = "",
  textPosition = { top: 50, left: 50 },
  textSize = 20,
  handleMouseDown,
  handleTextMouseDown,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
}) {
  return (
    <div
      className="shirt-preview mx-auto p-3 d-flex justify-content-center"
      style={{
        backgroundImage:
          "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05cnl-t6z4pQxPLmBBlk5jH2FR_bRY_oICw&s')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        maxWidth: "400px",
        height: "500px",
        position: "relative",
        border: "2px solid #ccc",
        backgroundColor: "BLACK",
        overflow: "hidden",
      }}
    >
      <div
        className="imageBorder"
        style={{
          width: "50%",
          maxWidth: "180px",
          height: "280px",
          border: "2px solid #ccc",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          overflow: "hidden",
        }}
      >
        {image && (
          <div
            className="uploaded-image"
            style={{
              backgroundImage: `url(${image})`,
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: `${imageSize}px`,
              height: `${imageSize}px`,
              position: "absolute",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              cursor: "grab",
              touchAction: "none",
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          ></div>
        )}

        {text && (
          <div
            className="uploaded-text text-center"
            style={{
              position: "absolute",
              top: `${textPosition.top}px`,
              left: `${textPosition.left}px`,
              fontSize: `${textSize}px`,
              color: "#000",
              cursor: "text",
              userSelect: "none",
              maxWidth: "100%",
              wordWrap: "break-word",
              touchAction: "none",
            }}
            onMouseDown={handleTextMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {text}
          </div>
        )}
      </div>
    </div>
  );
}

export default ShirtPreview;
