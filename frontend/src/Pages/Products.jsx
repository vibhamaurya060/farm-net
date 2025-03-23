import React, { useEffect, useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { FaSearch } from "react-icons/fa";
import Footer from "./Footer";
import "../styles/Products.css"; // Import external CSS

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filters State
    const [searchQuery, setSearchQuery] = useState("");
    const [category, setCategory] = useState("");
    const [availability, setAvailability] = useState("");

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8080/products");
                if (!response.ok) throw new Error("Failed to fetch products");

                const data = await response.json();
                setProducts(data.products);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filtered Products Memoization
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = category ? product.category === category : true;
            const matchesAvailability = availability
                ? availability === "available"
                    ? product.isAvailable
                    : !product.isAvailable
                : true;

            return matchesSearch && matchesCategory && matchesAvailability;
        });
    }, [products, searchQuery, category, availability]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

    if (loading) return <p className="loading-text">Loading products...</p>;
    if (error) return <p className="error-text">Error: {error}</p>;

    return (
        <>
            <div className="products-container">
                {/* Sidebar Filters */}
                <div className="sidebar">
                    <h2 className="filter-title">Filter Products</h2>

                    {/* Search Input */}
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <FaSearch className="search-icon" />
                    </div>

                    {/* Category Filter */}
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="filter-select">
                        <option value="">All Categories</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Grains">Grains</option>
                    </select>

                    {/* Availability Filter */}
                    <select value={availability} onChange={(e) => setAvailability(e.target.value)} className="filter-select">
                        <option value="">All Availability</option>
                        <option value="available">In Stock</option>
                        <option value="unavailable">Out of Stock</option>
                    </select>
                </div>

                {/* Products Display */}
                <div className="products-section">
                    <h1 className="section-title">Our Products</h1>
                    <div className="products-grid">
                        {paginatedProducts.length > 0 ? (
                            paginatedProducts.map((product) => <ProductCard key={product._id} product={product} />)
                        ) : (
                            <p className="no-products">No products found matching your criteria.</p>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                                Previous
                            </button>
                            <span>{currentPage} / {totalPages}</span>
                            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Products;
