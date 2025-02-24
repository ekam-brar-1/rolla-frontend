import React, { useState, useContext } from "react";
import { useCart } from "./context/CartContext";
import { AuthContext } from "./context/AuthContext";
import { checkActionCode } from "firebase/auth";

export default function Checkout() {
  const { cartItems } = useCart();
  const { currentUser } = useContext(AuthContext);

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

  const [errors, setErrors] = useState({});

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    if (!formData.street.trim())
      newErrors.street = "Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.postalCode.trim())
      newErrors.postalCode = "Postal code is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async () => {
    if (!currentUser) {
      alert("You must be signed in before placing an order.");
      throw new Error("User not signed in"); // ✅ Stops execution
    }

    if (!validateForm()) {
      return false; // ✅ Stops checkout if form validation fails
    }

    const orderData = {
      cartItems: cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        size: item.size || "N/A",
        frontImage: item.frontDesign?.imageUrl || "",
        backImage: item.backDesign?.imageUrl2 || "",
      })),
      total,
      address: {
        street: formData.street,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      mobile: formData.mobile,
    };

    try {
      const response = await fetch(
        "https://rolla-backend.onrender.com/api/checkout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert("Error placing order: " + data.message);
        return false;
      }

      alert(
        `Order placed successfully!\nValidated Address: ${data.validatedAddress.formattedAddress}`
      );
      return true; // ✅ Indicates success
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred during checkout.");
      return false;
    }
  };

  const handleCheckout2 = async () => {
    const sanitizedCartItems = cartItems.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1,
      size: item.size || "N/A",
    }));

    const response = await fetch(
      "https://rolla-backend.onrender.com/api/create-checkout-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems: sanitizedCartItems }),
      }
    );

    const session = await response.json();
    window.location.href = session.url;
  };

  const handleCheckoutProcess = async () => {
    try {
      const checkoutSuccess = await handleCheckout();
      console.log(checkActionCode); // ✅ Waits for `handleCheckout`
      if (checkoutSuccess) {
        await handleCheckout2(); // ✅ Runs only if `handleCheckout` succeeds
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <div className="container py-5" id="Checkout">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <h4 className="mb-4 text-center">Delivery Address</h4>
          <form noValidate>
            <div className="row">
              <div className="col-12 col-md-6 mb-3">
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

              <div className="col-12 col-md-6 mb-3">
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
              <div className="col-12 col-md-4 mb-3">
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

              <div className="col-12 col-md-4 mb-3">
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

              <div className="col-12 col-md-4 mb-3">
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

            <div className="d-flex flex-column flex-md-row justify-content-center mt-4">
              <button
                className="btn btn-primary btn-lg w-100 w-md-auto"
                type="button"
                onClick={handleCheckoutProcess}
              >
                Continue to Checkout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
