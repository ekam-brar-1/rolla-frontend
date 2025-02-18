import React, { useState, useContext } from "react";
import { useCart } from "./context/CartContext";
import { AuthContext } from "./context/AuthContext";

export default function Checkout() {
  const { cartItems } = useCart();
  const { currentUser } = useContext(AuthContext);

  // State for form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Calculate total price
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Input Change Handler
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Validate Input Fields
  const validateForm = () => {
    let errors = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.street.trim()) errors.street = "Street address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.postalCode.trim())
      errors.postalCode = "Postal Code is required";
    if (!formData.country.trim()) errors.country = "Country is required";
    if (!formData.mobile.trim()) errors.mobile = "Mobile number is required";

    // Validate Email Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    // Validate Mobile Number (supports international format)
    const mobileRegex = /^\+?[1-9]\d{1,14}$/;
    if (!mobileRegex.test(formData.mobile)) {
      errors.mobile = "Invalid mobile number";
    }

    // Validate Payment Selection
    if (!formData.paymentMethod)
      errors.paymentMethod = "Select a payment method";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Checkout Handler
  const handleCheckout = async () => {
    // if (!validateForm()) return;

    if (currentUser == null) {
      alert("Please sign in to place an order.");
      return;
    }

    const addressString = `${formData.street}, ${formData.city}, ${formData.postalCode}, ${formData.country}`;
    console.log("📍 Sending Address to Backend:", addressString); // ✅ Debugging

    try {
      const response = await fetch("http://localhost:5001/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems,
          total,
          address: {
            street: formData.street,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country,
          },
          mobile: formData.mobile,
        }),
      });

      const data = await response.json();
      console.log("🔹 Backend Response:", data); // ✅ Debugging

      if (response.ok) {
        alert(
          "Order placed successfully!\nValidated Address: " +
            data.validatedAddress.formattedAddress
        );
      } else {
        alert("Error placing order: " + data.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred during checkout.");
    }
  };

  return (
    <div className="container" id="Checkout">
      <div className="row">
        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Billing Address</h4>
          <form noValidate>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                {errors.firstName && (
                  <small className="text-danger">{errors.firstName}</small>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                {errors.lastName && (
                  <small className="text-danger">{errors.lastName}</small>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="mobile">Mobile Number</label>
              <input
                type="text"
                className="form-control"
                id="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
              />
              {errors.mobile && (
                <small className="text-danger">{errors.mobile}</small>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="street">Street Address</label>
              <input
                type="text"
                className="form-control"
                id="street"
                value={formData.street}
                onChange={handleInputChange}
              />
              {errors.street && (
                <small className="text-danger">{errors.street}</small>
              )}
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
                {errors.city && (
                  <small className="text-danger">{errors.city}</small>
                )}
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                />
                {errors.postalCode && (
                  <small className="text-danger">{errors.postalCode}</small>
                )}
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
                {errors.country && (
                  <small className="text-danger">{errors.country}</small>
                )}
              </div>
            </div>

            <button
              className="btn btn-primary btn-lg btn-block"
              type="button"
              onClick={handleCheckout}
            >
              Continue to checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
