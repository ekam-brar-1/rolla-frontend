import React from "react";
import { Link } from "react-router-dom";

const Canceled = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center vh-100">
      <h1 className="text-danger fw-bold">❌ Payment Canceled</h1>
      <p className="fs-5 text-muted">You canceled the payment process.</p>
      <Link to="/" className="btn btn-warning mt-3">
        Try Again
      </Link>
    </div>
  );
};

export default Canceled;
