import React from 'react';

function Header() {
  return (
    <header className="bg-dark text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="mb-0 text-warning">ROLLA</h1>
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link text-white" href="#customize">Customize</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#trendy-designs">Trendy Designs</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#about-us">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
