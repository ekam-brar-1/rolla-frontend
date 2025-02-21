import React, { useState } from "react";
import shoppingitems from "./res/shoppingitems.json";
import { useCart } from "./context/CartContext";

export default function ShoppingItem() {
  const { addToCart } = useCart();
  const [selectedSizes, setSelectedSizes] = useState({}); // Stores selected sizes for each item

  // Handles size selection
  const handleSizeChange = (e, itemId) => {
    setSelectedSizes((prev) => ({ ...prev, [itemId]: e.target.value }));
  };

  // Handles adding to cart with size
  const handleAddToCart = (item) => {
    const selectedSize = selectedSizes[item.id];
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    const cartItem = {
      id: Date.now(),
      name: item.name,
      price: item.price,
      image: item.image,
      size: selectedSize, // Include selected size
    };

    addToCart(cartItem);
    alert(`${item.name} (Size: ${selectedSize}) added to cart!`);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        {shoppingitems.map((item) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
            key={item.id}
          >
            <div
              className="card m-3"
              style={{ width: "100%", maxWidth: "250px" }}
            >
              <div
                className="badge bg-dark text-white position-absolute"
                style={{ top: "0.5rem", right: "0.5rem" }}
              >
                Sale
              </div>

              <img className="card-img-top" src={item.image} alt={item.name} />

              <div className="card-body p-4">
                <div className="text-center">
                  <h5 className="fw-bolder">{item.name}</h5>
                  <div className="d-flex justify-content-center small text-warning mb-2">
                    ⭐⭐⭐⭐⭐
                  </div>
                  <span className="text-muted text-decoration-line-through">
                    $20.00
                  </span>{" "}
                  ${item.price}
                </div>
              </div>

              {/* Size Selection Dropdown */}
              <div className="px-4 mb-3">
                <label className="form-label fw-bold">Select Size:</label>
                <select
                  className="form-select"
                  value={selectedSizes[item.id] || ""}
                  onChange={(e) => handleSizeChange(e, item.id)}
                >
                  <option value="">Choose size</option>
                  {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div className="text-center">
                  <button
                    className="btn btn-outline-dark mt-auto w-100"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
