import React from 'react';
import '../styles/Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FiPhone, FiMail } from "react-icons/fi";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    {/* About Section */}
                    <div className="footer-brand">
                        <h3>Organic FarmNet</h3>
                        <p>
                            Fresh & organic products delivered to your doorstep. 
                            Supporting healthy living & sustainable farming.
                        </p>
                    </div>
                    
                    {/* Quick Links */}
                    <div className="footer-links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Shop</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    
                    {/* Contact Section */}
                    <div className="footer-contact">
                        <h3>Contact Us</h3>
                        <div className="contact-info">
                            <p><IoLocationSharp className="contact-icon" /> 123 Green Street, Farmville</p>
                            <p><FiPhone className="contact-icon" /> +1 (234) 567-890</p>
                            <p><FiMail className="contact-icon" /> support@organicfarm.com</p>
                        </div>
                    </div>
                </div>
                
                {/* Social Media & Copyright */}
                <div className="footer-bottom">
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF className="social-icon" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="social-icon" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="social-icon" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="social-icon" />
                        </a>
                    </div>
                    <p className="copyright">
                        &copy; {new Date().getFullYear()} Organic Farm Market - All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
