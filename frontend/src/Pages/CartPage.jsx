import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext"; // Ensure the path is correct
import "../styles/CartPage.css"; // Import external CSS

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity } = useCart();
    const navigate = useNavigate();

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="cart-container">
            <h1 className="cart-title">Shopping Cart</h1>
            {cart.length === 0 ? (
                <p className="cart-empty">Your cart is empty.</p>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div key={item._id} className="cart-item">
                            <div className="cart-item-details">
                                <img src={item.images[0]} alt={item.name} className="product-image1" />
                                <div>
                                    <h2 className="cart-item-name">{item.name}</h2>
                                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="cart-quantity">
                                <button 
                                    onClick={() => updateQuantity(item._id, item.quantity - 1)} 
                                    className="quantity-btn"
                                >
                                    -
                                </button>
                                <span className="quantity-value">{item.quantity}</span>
                                <button 
                                    onClick={() => updateQuantity(item._id, item.quantity + 1)} 
                                    className="quantity-btn"
                                >
                                    +
                                </button>
                            </div>
                            <div className="button-container">
                                <button 
                                    onClick={() => navigate(`/product/${item._id}`)} 
                                    className="view-btn"
                                >
                                    View Details
                                </button>
                                <button 
                                    onClick={() => removeFromCart(item._id)} 
                                    className="remove-btn"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <h3 className="cart-total">Total: ${totalPrice.toFixed(2)}</h3>
                    <button 
                        onClick={() => navigate("/checkout")} 
                        className="checkout-btn"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartPage;
