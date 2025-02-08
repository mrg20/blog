import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-left">
          <div className="profile-icons">
            <div className="profile-circle">M</div>
            <div className="profile-circle">A</div>
            <div className="profile-circle">R</div>
          </div>
        </div>
        <div className="nav-center">
          <Link to="/" className="nav-logo">Tech Blog</Link>
        </div>
        <div className="nav-right">
          <div className="social-icons">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
