import React from "react";
import { Link } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";

function Header() {
  return (
    <header className="bg-dark text-white py-3">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <Link className="navbar-brand text-warning fw-bold" to="/">
            ROLLA
          </Link>

          {/* Navbar Toggle Button for Mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav text-center ">
              <li className="nav-item mt-auto">
                <Link
                  className="nav-link text-white text-center"
                  to="/customize"
                >
                  Customize
                </Link>
              </li>
              <li className="nav-item mt-auto">
                <Link className="nav-link text-white" to="/trendyDesign">
                  Trendy Designs
                </Link>
              </li>
              <li className="nav-item mt-auto">
                <Link className="nav-link text-white" to="/aboutus">
                  About Us
                </Link>
              </li>

              <li className="nav-item mt-lg-0">
                <GoogleLoginButton />
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
