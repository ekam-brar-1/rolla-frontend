import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";

const AboutUs = () => {
  return (
    <section className="about-us bg-light py-5">
        <Header/>
      <div className="container">
        <div className="row align-items-center">
          {/* Left Section: Image */}
          <div className="col-12 col-md-6 mb-4 mb-md-0 text-center">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Rolla Milagro"
              className="img-fluid rounded shadow"
            />
          </div>

          {/* Right Section: Text */}
          <div className="col-12 col-md-6">
            <h2 className="text-primary mb-4">About Rolla Milagro</h2>
            <p className="text-muted">
              At Rolla Milagro, we are dedicated to delivering excellence in
              every aspect of our business. Our mission is to create innovative
              solutions that inspire and empower our customers.
            </p>
            <p className="text-muted">
              With a passion for quality and a commitment to sustainability, we
              strive to make a positive impact on the world. Our team of
              experts is constantly innovating to bring the best products and
              services to you.
            </p>
            <button className="btn btn-primary mt-3">Learn More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
