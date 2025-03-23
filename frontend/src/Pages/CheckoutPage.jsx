import React, { useState } from "react";
import { useCart } from "../Context/CartContext"; // Ensure correct path
import "../styles/CheckoutPage.css"; // External CSS file

const CheckoutPage = () => {
  const { cart, clearCart } = useCart(); // Access cart data and clearCart function

  const [billingData, setBillingData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [paymentData, setPaymentData] = useState({
    paymentMethod: "credit_card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleBillingChange = (e) => {
    setBillingData({ ...billingData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for billing details
    if (!billingData.name || !billingData.email || !billingData.phone || !billingData.address) {
      alert("Please fill in all required billing details.");
      return;
    }

    // Validation for payment details if Credit Card is selected
    if (paymentData.paymentMethod === "credit_card" && (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv)) {
      alert("Please enter all credit card details.");
      return;
    }

    setOrderPlaced(true);
    clearCart(); // Clear the cart after successful checkout
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="checkout-container">
      <h2 style={{textAlign:"center"}}>Checkout</h2>

      {orderPlaced ? (
        <div className="confirmation-message">
          🎉 Thank you, {billingData.name}! Your order has been placed successfully.
        </div>
      ) : (
        <div>
          <h3>Order Summary</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="order-summary">
              {cart.map((item) => (
                <div key={item._id} className="order-item">
                  <img src={item.images[0]} alt={item.name} className="order-image" />
                  <div>
                    <h4>{item.name}</h4>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
              <h3 className="total-price">Total: ${totalPrice.toFixed(2)}</h3>
            </div>
          )}
           <hr style={{marginTop: "25px", marginBottom:"25px"}}/>
          <div className="forms">
            {/* Billing Details Form */}
          <form onSubmit={handleSubmit} className="billing-form">
            <h3 style={{textAlign:"center"}}>Billing Details</h3>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" name="name" value={billingData.name} onChange={handleBillingChange} required />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input type="email" name="email" value={billingData.email} onChange={handleBillingChange} required />
            </div>

            <div className="form-group">
              <label>Phone:</label>
              <input type="text" name="phone" value={billingData.phone} onChange={handleBillingChange} required />
            </div>

            <div className="form-group">
              <label>Address:</label>
              <textarea name="address" value={billingData.address} onChange={handleBillingChange} required />
            </div>
          </form>

          {/* Payment Details Form */}
          <form onSubmit={handleSubmit} className="payment-form">
            <h3 style={{textAlign:"center"}}>Payment Details</h3>
            <div className="form-group">
              <label>Payment Method:</label>
              <select name="paymentMethod" value={paymentData.paymentMethod} onChange={handlePaymentChange}>
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="cash_on_delivery">Cash on Delivery</option>
              </select>
            </div>

            {/* Show card details only if Credit Card is selected */}
            {paymentData.paymentMethod === "credit_card" && (
              <>
                <div className="form-group">
                  <label>Card Number:</label>
                  <input type="text" name="cardNumber" value={paymentData.cardNumber} onChange={handlePaymentChange} required />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date:</label>
                    <input type="text" name="expiryDate" placeholder="MM/YY" value={paymentData.expiryDate} onChange={handlePaymentChange} required />
                  </div>

                  <div className="form-group">
                    <label>CVV:</label>
                    <input type="text" name="cvv" value={paymentData.cvv} onChange={handlePaymentChange} required />
                  </div>
                </div>
              </>
            )}

            <button type="submit" className="checkout-btn">Place Order</button>
          </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
