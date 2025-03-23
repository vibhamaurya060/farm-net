import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Footer from "./Footer";
import logo from '../assets/FarmNet_logo.png';
import { Star, Leaf, Tag } from "lucide-react";
import "../styles/Home.css";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";



const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1280 }, items: 4 },
    desktop: { breakpoint: { max: 1280, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
};

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const navigate = useNavigate();
  

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8080/products");
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <p className="loading-text">Loading products...</p>
            </div>
        );
    }

    return (
        <div className="home-container">
            {/* Hero Carousel */}
            <div className="hero-carousel">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                    className="hero-swiper"
                >
                    {products.slice(0, 5).map((product) => (
                        <SwiperSlide key={product._id} className="hero-slide">
                            <div className="hero-image-container">
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="hero-image"
                                />
                                <div className="hero-overlay">
                                    <h1 className="hero-title">Welcome to Organic Farm Market</h1>
                                    <p className="hero-subtitle">Fresh, Organic & Locally Sourced Products</p>
                                    <button className="shop-now-button"  onClick={() => navigate(`/products`)} >SHOP NOW</button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Shipping Info Bar */}
            <div className="info-bar">
                <div className="info-bar-item">
                    <p>FREE SHIPPING ON ORDERS OVER $200</p>
                </div>
                <div className="info-bar-item">
                    <p>30-DAY RETURNS MONEY BACK</p>
                </div>
                <div className="info-bar-item">
                    <p>24/7 SUPPORT</p>
                </div>
            </div>

            {/* Top Categories Section */}
            <section className="categories-section">
                <h2 className="section-title">
                    <Tag className="icon" />
                    Top Categories
                    <Tag className="icon" />
                </h2>
                <div className="categories-container">
                    <div className="categories-carousel-wrapper">
                        <Carousel
                            responsive={responsive}
                            infinite={true}
                            autoPlay={false}
                            autoPlaySpeed={2500}
                            arrows={true}
                            showDots={false}
                            className="categories-carousel"
                        >
                            {[...new Map(products.map((product) => [product.category, product])).values()].map((categoryItem, index) => (
                                <div key={index} className="category-item">
                                    <div className="category-image-container">
                                        <img
                                            src={categoryItem.images[0]}
                                            alt={categoryItem.category}
                                            className="category-image"
                                        />
                                    </div>
                                    <p className="category-name">{categoryItem.category}</p>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="products-section" style={{ width: "100%" }}>
                <h2 className="products-title"> Products </h2>

                <Carousel
                    responsive={responsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={6000}
                    arrows={true}
                    showDots={false}
                    className="products-carousel"
                >
                    {products.map((product) => (
                        <div key={product._id} className="product-item-wrapper">
                            <div className="product-card">
                                <div className="product-image-container">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="product-image"
                                       // style={{ width: "100%", height: "45vh" }}

                                    />
                                </div>
                                <div className="product-info">
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-price">${product.price.toFixed(2)}</p>
                                    <div className="product-buttons">
                                        <button
                                            className="view-details-button"
                                            onClick={() => navigate(`/products/${product._id}`)}
                                        >
                                            View Details
                                        </button>
                                        <button
                                            className="add-to-cart-button"
                                            onClick={() => addToCart(product)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </section>

            {/* About section */}
            <section className="about-section">
                {/* Heading */}
                <h1 className="about-title">
                    <Star className="icon" />
                    About FarmNet
                    <Star className="icon" />
                </h1>

                {/* Content Section */}
                <div className="about-content">
                    {/* Text Content */}
                    <div className="about-text">
                        <p>
                            <strong style={{fontSize:"25px"}}>FarmNet</strong> is dedicated to connecting farmers with fresh, <br /> organic 
                            produce buyers, ensuring a sustainable and <br /> eco-friendly 
                            farming experience. Our platform bridges the gap between 
                            rural farms and urban consumers, making healthy food  
                            accessible to everyone.
                        </p>
                    </div>

                    {/* Image Section */}
                    <div className="about-image-container">
                        <img
                            src="https://foodsafetyhelpline.com/wp-content/uploads/2020/04/Increasing-Need-for-Food-Safety-in-Fruits-and-Vegetables-1024x512.jpg"
                            alt="FarmNet Image"
                            className="about-image"
                        />
                    </div>
                </div>
            </section>

            {/* Brand Logos Carousel */}
            <div className="brands-section">
                <h2 className="brands-title">
                    <Leaf className="icon" />
                    Our Brands
                    <Leaf className="icon" />
                </h2>
                <div className="brands-container">
                    <img src={logo} alt="logo" className="brand-logo" />
                    <img src={logo} alt="logo" className="brand-logo" />
                    <img src={logo} alt="logo" className="brand-logo" />
                    <img src={logo} alt="logo" className="brand-logo" />
                    <img src={logo} alt="logo" className="brand-logo" />
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;