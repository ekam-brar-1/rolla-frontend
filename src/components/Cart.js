import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import Checkout from "../Checkout";

const Cart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);

  // Calculate total dynamically (based on quantity)
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      {/* Cart Toggle Button */}
      <button
        className="btn btn-danger d-flex align-items-center justify-content-between w-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaShoppingCart size={24} className="me-2" />
        Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
      </button>

      {/* Cart Items Section */}
      {isOpen && (
        <div className="mt-3 p-3 border rounded shadow-sm bg-light">
          <h5>Cart Items</h5>
          {cartItems.length === 0 ? (
            <p className="text-muted">Your cart is empty.</p>
          ) : (
            <ul className="list-group">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{item.name}</strong>
                    {item.image && (
                      <img
                        src={item.image}
                        alt="Custom Design"
                        className="ms-2"
                        style={{
                          width: "40px",
                          height: "auto",
                          borderRadius: "5px",
                        }}
                      />
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Cart Total Section */}
      {cartItems.length > 0 && (
        <div className="mt-3 p-3 border rounded shadow-sm bg-light">
          <h5>Cart Total</h5>
          <p className="d-flex justify-content-between align-items-center">
            <strong>Total</strong>
            <span>${total.toFixed(2)}</span>
          </p>

          <div className="d-flex flex-column align-items-center">
            <button
              type="button"
              onClick={() => setCheckout(!checkout)}
              className="btn btn-primary btn-lg btn-block"
            >
              Checkout
            </button>
            {checkout && <Checkout />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
