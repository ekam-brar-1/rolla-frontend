import React from 'react';
import Customize from './customize';
import TrendyDesigns from './trendyDesign';

import { Link } from 'react-router-dom';
import GoogleLoginButton from './GoogleLoginButton';

function Header() {
  return (
    <header className="bg-dark text-white py-3">
      
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="mb-0 text-warning">ROLLA</h1>
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/customize">Customize</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/trendyDesign">Trendy Designs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/aboutus">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Contact</Link>
            </li>
            <li className="nav-item">
              <GoogleLoginButton />
            </li>
          </ul>
        </nav>
      
      </div>
    </header>
  );
}

export default Header;
