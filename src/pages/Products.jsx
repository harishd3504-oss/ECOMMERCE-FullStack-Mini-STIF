import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import ProductCard from '../components/product/ProductCard';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Categories = ["All", "Organic", "Beverages", "Oils", "Skincare", "Spices"];

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("featured");

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await api.fetchProducts();
                setProducts(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    }).sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
    });

    if (loading) return <div className="container" style={{ padding: '8rem', textAlign: 'center' }}>Loading products...</div>;

    return (
        <div className="container" style={{ padding: '4rem 1.5rem' }}>
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Our Collection</h1>
                <p style={{ color: 'var(--secondary)' }}>Explore our range of pure and natural products.</p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', flex: 1 }}>
                    <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
                        <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} size={18} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem 0.75rem 2.5rem',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius)',
                                outline: 'none',
                                background: 'var(--card)'
                            }}
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{
                                padding: '0.75rem 2.5rem 0.75rem 1rem',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius)',
                                appearance: 'none',
                                background: 'var(--card)',
                                cursor: 'pointer',
                                fontWeight: '500'
                            }}
                        >
                            <option value="featured">Sort by: Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Best Rating</option>
                        </select>
                        <ChevronDown style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--secondary)' }} size={16} />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                    {Categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                padding: '0.6rem 1.25rem',
                                borderRadius: '2rem',
                                background: selectedCategory === cat ? 'var(--primary)' : 'var(--card)',
                                color: selectedCategory === cat ? 'white' : 'var(--secondary)',
                                border: selectedCategory === cat ? 'none' : '1px solid var(--border)',
                                fontWeight: '600',
                                fontSize: '0.875rem',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {filteredProducts.length > 0 ? (
                <motion.div
                    layout
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '2.5rem'
                    }}
                >
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </motion.div>
            ) : (
                <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--secondary)' }}>
                    <SlidersHorizontal size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                    <h3>No products found</h3>
                    <p>Try adjusting your search or filters.</p>
                </div>
            )}
        </div>
    );
};

export default Products;
