import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center vh-100">
      <h1 className="text-success fw-bold">✅ Payment Successful!</h1>
      <p className="fs-5 text-muted">Thank you for your purchase.</p>
      <Link to="/" className="btn btn-primary mt-3">
        Go Back to Home
      </Link>
    </div>
  );
};

export default Success;
