import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import "../styles/ProductCard.css"; // Import external CSS
import { useCart } from "../Context/CartContext";


const ProductCard = ({ product }) => {
   const { addToCart } = useCart();
   const navigate = useNavigate();

  const discountedPrice = product.discount
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : product.price.toFixed(2);

  return (
    <div className="product-card">
      {/* Wishlist Button */}
      <button className="wishlist-button">
        <Heart className="text-red-500 w-5 h-5" />
      </button>

      {/* Product Image */}
      <div className="product-image-container">
        <img src={product.images[0]} alt={product.name} className="product-image" />
        <div className="image-overlay"></div>

        {/* Discount Badge */}
        {product.discount && (
          <span className="discount-badge">{product.discount}% OFF</span>
        )}
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h2 className="product-title">{product.name}</h2>

        {/* Price */}
        <div className="price-container">
          <p className="discounted-price">${discountedPrice}</p>
          {product.discount && <p className="original-price">${product.price.toFixed(2)}</p>}
        </div>

        {/* Stock Status */}
        <p className={`stock-status ${product.isAvailable ? "stock-available" : "stock-unavailable"}`}>
          {product.isAvailable ? "In Stock ✅" : "Out of Stock ❌"}
        </p>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button
            className={`action-button add-to-cart ${!product.isAvailable && "disabled"}`}
            disabled={!product.isAvailable}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
          <button
            className={`action-button buy-now ${!product.isAvailable && "disabled"}`}
            disabled={!product.isAvailable}
            onClick={() => navigate(`/products/${product._id}`)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
