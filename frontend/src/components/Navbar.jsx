import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiUser, FiMenu, FiX, FiShoppingCart, FiPhone } from "react-icons/fi"; 
import { IoMdArrowDropdown } from "react-icons/io";
import { useAuth } from "../Context/AuthContext";
import logo from '../assets/FarmNet_logo.png';
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const handleLogout = () => {
    logout();
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="Logo"
          className="logo"
        />

        <div className="nav-links">
          <NavLink to="/" className="nav-item">Home</NavLink>
          <NavLink to="/products" className="nav-item">Products</NavLink>
          <div className="dropdown">
            <button 
              className="dropdown-button"
              onClick={() => setShowCategories(!showCategories)}
            >
              Categories <IoMdArrowDropdown className="icon"/>
            </button>
            {showCategories && (
              <div className="dropdown-menu">
                <NavLink to="/products" className="dropdown-item">Fruits</NavLink>
                <NavLink to="/products" className="dropdown-item">Vegetables</NavLink>
                <NavLink to="/products" className="dropdown-item">Dairy Products</NavLink>
                <NavLink to="/products" className="dropdown-item">Grains</NavLink>
              </div>
            )}
          </div>
          {/* <NavLink to="/contact" className="nav-item"></NavLink> */}
          <NavLink to="/cart" className="nav-item"><FiShoppingCart className="icon" style={{width:"22px", fontWeight:"bold"}}/> Cart</NavLink>

          {user ? (
            <div className="profile-menu">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="profile-button"
              >
                <FiUser className="icon" />
                {user.username}
                <IoMdArrowDropdown className="icon"/>
              </button>
              {showProfileMenu && (
                <div className="profile-dropdown">
                  <NavLink to="/profile" className="profile-item">Profile</NavLink>
                  <button 
                    onClick={handleLogout} 
                    className="profile-item logout-button"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink 
              to="/login" 
              className="login-button"
            >
              Log in
            </NavLink>
          )}
        </div>

        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="mobile-menu-button"
        >
          {showMobileMenu ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {showMobileMenu && (
        <div className="mobile-menu">
          <NavLink to="/" className="mobile-item" onClick={() => setShowMobileMenu(false)}>Home</NavLink>
          <NavLink to="/products" className="mobile-item" onClick={() => setShowMobileMenu(false)}>Products</NavLink>
          <button className="mobile-item" onClick={() => setShowCategories(!showCategories)}>
            Categories <IoMdArrowDropdown className="icon"/>
          </button>
          {showCategories && (
            <div className="mobile-dropdown">
              <NavLink to="/fruits" className="mobile-dropdown-item" onClick={() => setShowMobileMenu(false)}>Fruits</NavLink>
              <NavLink to="/vegetables" className="mobile-dropdown-item" onClick={() => setShowMobileMenu(false)}>Vegetables</NavLink>
              <NavLink to="/dairy" className="mobile-dropdown-item" onClick={() => setShowMobileMenu(false)}>Dairy</NavLink>
              <NavLink to="/grains" className="mobile-dropdown-item" onClick={() => setShowMobileMenu(false)}>Grains</NavLink>
            </div>
          )}
          <NavLink to="/contact" className="mobile-item" onClick={() => setShowMobileMenu(false)}>Contact</NavLink>
          <NavLink to="/cart" className="mobile-item" onClick={() => setShowMobileMenu(false)}>Cart</NavLink>
          {user ? (
            <button onClick={handleLogout} className="mobile-logout-button">Logout</button>
          ) : (
            <NavLink to="/login" className="mobile-login-button">Log in</NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
