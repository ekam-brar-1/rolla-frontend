import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa"; 

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container mt-4">
      {/* Cart Toggle Button */}
      <button
        className="btn btn-danger d-flex align-items-center justify-content-between w-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaShoppingCart size={24} className="me-2" />
        Cart ({cartItems.length})
      </button>

      {/* Cart Items Section (Shown when isOpen is true) */}
      {isOpen && (
        <div className="mt-3 p-3 border rounded shadow-sm bg-light">
          <h5>Cart Items</h5>
          {cartItems.length === 0 ? (
            <p className="text-muted">Your cart is empty.</p>
          ) : (
            <ul className="list-group">
              {cartItems.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{item.name}</strong>
                    {item.image && (
                      <img
                        src={item.image}
                        alt="Custom Design"
                        className="ms-2"
                        style={{ width: "40px", height: "auto", borderRadius: "5px" }}
                      />
                    )}
                  </div>
                  <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
