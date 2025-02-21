import React, { useState } from "react";
import ShirtPreview from "../ShirtPreview";
import Controls from "../Controls";
import { useCart } from "../context/CartContext";
import axios from "axios";
export default function CustomizeShirt() {
  const [textPosition, setTextPosition] = useState({ top: 50, left: 50 });
  const [textPosition1, setTextPosition1] = useState({ top: 50, left: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [isDragging1, setIsDragging1] = useState(false);
  const [isTextDragging, setIsTextDragging] = useState(false);
  const [isTextDragging1, setIsTextDragging1] = useState(false);
  const [position, setPosition] = useState({ top: 90, left: 80 });
  const [position1, setPosition1] = useState({ top: 90, left: 80 });
  const [step, setStep] = useState(1); // Step tracker
  const [shirtColor, setShirtColor] = useState("");
  const [shirtSize, setShirtSize] = useState("");
  const [uploading, setUploading] = useState(false);
  const [frontDesign, setFrontDesign] = useState({
    image: null,
    position: { top: 90, left: 80 },
    textPosition: { top: 50, left: 50 },
    imageSize: 100,
    textSize: 20,
    text: "",
    isDragging: false,
    isTextDragging: false,
  });
  const [backDesign, setBackDesign] = useState({
    image: null,
    position: { top: 90, left: 80 },
    textPosition: { top: 50, left: 50 },
    imageSize: 100,
    textSize: 20,
    text: "",
    isDragging: false,
    isTextDragging: false,
  });

  const [currentView, setCurrentView] = useState("front");
  // const handleImageUpload=(e) =>
  //   setFrontDesign((prev) => ({ ...prev, image: e.target.files[0] }))

  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1);

  const handleMouseDown = (e, type) => {
    if (step === 3) {
      if (type === "image") setIsDragging(true);
      if (type === "text") setIsTextDragging(true);
    } else if (step === 4) {
      if (type === "image") setIsDragging1(true);
      if (type === "text") setIsTextDragging1(true);
    }
  };

  const handleMouseMove = (e) => {
    const imageBorder = document
      .querySelector(".imageBorder")
      ?.getBoundingClientRect();
    if (!imageBorder) return; // Exit if no bounding rect found

    const x = e.clientX - imageBorder.left;
    const y = e.clientY - imageBorder.top;

    if (step === 3) {
      // For Front Customization
      if (isDragging) {
        setPosition({ top: Math.max(0, y), left: Math.max(0, x) });
      } else if (isTextDragging) {
        setTextPosition({ top: Math.max(0, y), left: Math.max(0, x) });
      }
    } else if (step === 4) {
      // For Back Customization
      if (isDragging1) {
        setPosition1({ top: Math.max(0, y), left: Math.max(0, x) });
      } else if (isTextDragging1) {
        setTextPosition1({ top: Math.max(0, y), left: Math.max(0, x) });
      }
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsDragging1(false);
    setIsTextDragging(false);
    setIsTextDragging1(false);
  };

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const cartItem = {
      id: Date.now(),
      name: "Custom Shirt",
      color: shirtColor,
      size: shirtSize,
      frontDesign,
      backDesign,
      price: 40.0,
    };
    addToCart(cartItem);
    alert("Shirt added to cart!");
  };
  const handleUpload = async () => {
    setUploading(true);

    // Convert Base64 to File
    const base64ToFile = (base64, filename) => {
      let arr = base64.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    };
    const formData = new FormData();
    // Convert both images to File
    if (frontDesign.image) {
      const frontImageFile = base64ToFile(
        frontDesign.image,
        "front_design.png"
      );
      formData.append("images", frontImageFile);
    }
    if (backDesign.image) {
      const backImageFile = base64ToFile(backDesign.image, "back_design.png");
      formData.append("images", backImageFile); // Send as an array
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Upload successful:", response.data);
      alert("Design uploaded successfully!");
    } catch (error) {
      console.error(
        "Error uploading:",
        error.response ? error.response.data : error.message
      );
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }

    console.log("FormData Content:");
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
  };

  const handleImageUpload = (e, isFront = true) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isFront) {
          setFrontDesign((prev) => ({ ...prev, image: reader.result }));
        } else {
          setBackDesign((prev) => ({ ...prev, image: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="App"
      style={{ zIndex: 1 }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="text-center">
        <h1>Customize Your Shirt</h1>
        <h2>Step {step} of 4</h2>
      </div>

      {step === 1 && (
        <div className="text-center">
          <h2>Select a Color</h2>
          <div className="d-flex flex-wrap justify-content-center mt-3">
            {["#FFFFFF", "#000000", "#FF5733", "#33FF57", "#3357FF"].map(
              (color) => (
                <button
                  key={color}
                  style={{
                    backgroundColor: color,
                    width: 50,
                    height: 50,
                    margin: 5,
                  }}
                  onClick={() => setShirtColor(color)}
                  className={`btn border border-dark ${
                    shirtColor === color ? "border border-dark" : ""
                  }`}
                />
              )
            )}
          </div>
          <button
            className="btn btn-primary mt-3"
            onClick={handleNextStep}
            disabled={!shirtColor}
          >
            Next Step
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="text-center">
          <h2>Select a Size</h2>
          <div className="d-flex flex-wrap justify-content-center mt-3 ">
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                className={`btn btn-outline-primary mx-2  ${
                  shirtSize === size ? "active" : ""
                }`}
                onClick={() => setShirtSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
          <div className="mt-3">
            <button
              className="btn btn-secondary me-3"
              onClick={handlePreviousStep}
            >
              Previous Step
            </button>
            <button
              className="btn btn-primary"
              onClick={handleNextStep}
              disabled={!shirtSize}
            >
              Next Step
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="text-center">
          <h2>Customize Front</h2>
          <Controls
            handleImageUpload={(e) => handleImageUpload(e, true)}
            handleSizeChange={(e) =>
              setFrontDesign((prev) => ({ ...prev, imageSize: e.target.value }))
            }
            handleTextSizeChange={(e) =>
              setFrontDesign((prev) => ({ ...prev, textSize: e.target.value }))
            }
            handleTextChange={(e) =>
              setFrontDesign((prev) => ({ ...prev, text: e.target.value }))
            }
            imageSize={frontDesign.imageSize}
            textSize={frontDesign.textSize}
            text={frontDesign.text}
          />

          <ShirtPreview
            shirtColor={shirtColor}
            image={frontDesign.image}
            position={position}
            imageSize={frontDesign.imageSize}
            text={frontDesign.text}
            textPosition={textPosition}
            textSize={frontDesign.textSize}
            handleMouseDown={(e) => handleMouseDown(e, "image")}
            handleTextMouseDown={(e) => handleMouseDown(e, "text")}
          />
          <div className="mt-3">
            <button
              className="btn btn-secondary me-3"
              onClick={handlePreviousStep}
            >
              Previous Step
            </button>
            <button className="btn btn-primary" onClick={handleNextStep}>
              Next Step
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="text-center">
          <h2>Customize Back</h2>
          <Controls
            handleImageUpload={(e) => handleImageUpload(e, false)}
            handleSizeChange={(e) =>
              setBackDesign((prev) => ({ ...prev, imageSize: e.target.value }))
            }
            handleTextSizeChange={(e) =>
              setBackDesign((prev) => ({ ...prev, textSize: e.target.value }))
            }
            handleTextChange={(e) =>
              setBackDesign((prev) => ({ ...prev, text: e.target.value }))
            }
            imageSize={backDesign.imageSize}
            textSize={backDesign.textSize}
            text={backDesign.text}
          />
          <ShirtPreview
            shirtColor={shirtColor}
            image={backDesign.image}
            position={position1}
            imageSize={backDesign.imageSize}
            text={backDesign.text}
            textPosition={textPosition1}
            textSize={backDesign.textSize}
            handleMouseDown={(e) => handleMouseDown(e, "image")}
            handleTextMouseDown={(e) => handleMouseDown(e, "text")}
          />

          <div className="mt-3">
            <button
              className="btn btn-secondary me-3"
              onClick={handlePreviousStep}
            >
              Previous Step
            </button>
            <button
              className="btn btn-success"
              onClick={() => {
                handleAddToCart();
                handleUpload();
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
