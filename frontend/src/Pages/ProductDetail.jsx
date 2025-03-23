import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProductDetail.css';
import Footer from './Footer';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/${id}`);
        setProduct(response.data);
        setMainImage(response.data.images?.[0] || '');
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleBuyNow = () => {
    navigate(`/checkout`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <>
    <div className="product-detail-container">
      <div className="product-main">
        <div className="product-image">
          <img src={mainImage} alt={product.name} className="main-image" />
        </div>

        <div className="product-info">
          <h2 className="product-title">{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
          <p><strong>Quantity:</strong> {product.quantity}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p className={product.isAvailable ? "availability" : "out-of-stock"}>
            <strong>Availability:</strong> {product.isAvailable ? 'In Stock' : 'Out of Stock'}
          </p>
          <button className="buy-now-button" onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>

      <div className="farmer-section">
        <h3>Farmer Details</h3>
        <p><strong>Name:</strong> {product.farmer.name}</p>
        <p><strong>Contact:</strong> {product.farmer.contactInfo}</p>
      </div>

      <div className="images-section">
        <h3>More Images</h3>
        <div className="image-gallery">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={product.name}
              className="thumbnail-image"
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ProductDetail;
