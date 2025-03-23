import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import Navbar from "../components/Navbar";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "farmer" // Default role
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    setError("");
    
    // Basic validation
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }
    
    try {
      // Using the correct endpoint for user registration
      await axios.post("http://localhost:8080/users/register", form);
      
      alert("Signup successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      console.log("Error during signup:", error);
      
      // Check if there's a specific error message from the server
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong! Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-form">
          <h1 className="auth-heading">Sign Up</h1>
          {error && <p className={`error-message ${error ? 'visible' : ''}`}>{error}</p>}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="form-input"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="form-input"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="form-input"
          />
          <select
            name="role"
            value={form.role}
            onChange={handleInputChange}
            className="form-input"
          >
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
            <option value="admin">Admin</option>
          </select>
          <button
            onClick={handleSignup}
            className="auth-button"
          >
            Sign Up
          </button>
          <p className="auth-link-container">
            Already have an account?{" "}
            <a href="/login" className="auth-link">
              Log in here
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;