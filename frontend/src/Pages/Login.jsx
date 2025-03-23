import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import { useAuth } from "../Context/AuthContext";
import Navbar from "../components/Navbar";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthContext
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleLogin = async () => {
    setError("");
    
    // Basic validation
    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
      return;
    }
    
    try {
      // Send login request directly to the backend
      const response = await axios.post("http://localhost:8080/users/login", form);
      
      // If we got here, login was successful
      const userData = response.data;
      
      // Call the login function from AuthContext with the user data
      login(userData);
      
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      
      // Check if there's a specific error message from the server
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Invalid email or password! Please try again.");
      }
    }
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-form">
          <h1 className="auth-heading">Log in</h1>
          {error && <p className={`error-message ${error ? 'visible' : ''}`}>{error}</p>}
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
          <button
            onClick={handleLogin}
            className="auth-button"
          >
            Log in
          </button>
          <p className="auth-link-container">
            Don't have an account?{" "}
            <a href="/signup" className="auth-link">
              Sign Up here
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;