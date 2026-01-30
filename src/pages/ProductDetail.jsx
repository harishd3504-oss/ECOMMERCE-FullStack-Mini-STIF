import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Truck, RefreshCcw, ChevronLeft, ShoppingBag, Heart, Package } from 'lucide-react';
import ImageGallery from '../components/product/ImageGallery';
import ReviewSection from '../components/product/ReviewSection';
import ProductTabs from '../components/product/ProductTabs';
import ProductCard from '../components/product/ProductCard';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { addToRecentlyViewed } = useRecentlyViewed();

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                const [data, relatedData] = await Promise.all([
                    api.fetchProductById(id),
                    api.fetchProducts()
                ]);
                setProduct(data);
                setAllProducts(relatedData);
                addToRecentlyViewed(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    if (loading) return <div className="container" style={{ padding: '8rem', textAlign: 'center' }}>Loading...</div>;

    if (!product) {
        return (
            <div className="container" style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
                <h2>Product Not Found</h2>
                <button onClick={() => navigate('/shop')} style={{ marginTop: '1rem', color: 'var(--primary)' }}>Back to Shop</button>
            </div>
        );
    }

    const inWishlist = isInWishlist(product.id);
    const stockStatus = product.stock > 50 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock';
    const stockColor = product.stock > 50 ? '#166534' : product.stock > 0 ? '#ea580c' : '#dc2626';
    const stockBg = product.stock > 50 ? '#dcfce7' : product.stock > 0 ? '#fed7aa' : '#fee2e2';

    const relatedProducts = allProducts
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="container" style={{ padding: '4rem 1.5rem' }}>
            <button
                onClick={() => navigate(-1)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)', marginBottom: '2rem', fontWeight: '500' }}
            >
                <ChevronLeft size={20} /> Back
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <ImageGallery images={product.images || [product.image]} productName={product.name} />
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.875rem', textTransform: 'uppercase' }}>{product.category}</span>
                        <span style={{ background: stockBg, color: stockColor, padding: '0.25rem 0.75rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Package size={12} /> {stockStatus}
                        </span>
                    </div>

                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '0.5rem 0' }}>{product.name}</h1>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={18} fill={i < product.rating ? "#fbbf24" : "none"} stroke={i < product.rating ? "#fbbf24" : "#94a3b8"} />
                            ))}
                        </div>
                        <span style={{ color: 'var(--secondary)', fontSize: '0.9rem' }}>{product.rating} ({product.reviews} reviews)</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>₹{product.price}</span>
                        {product.oldPrice && (
                            <>
                                <span style={{ fontSize: '1.25rem', color: 'var(--secondary)', textDecoration: 'line-through' }}>₹{product.oldPrice}</span>
                                <span style={{ background: '#dcfce7', color: '#166534', padding: '0.25rem 0.75rem', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
                                    Save {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                                </span>
                            </>
                        )}
                    </div>

                    <p style={{ color: 'var(--secondary)', lineHeight: 1.7, marginBottom: '2.5rem', fontSize: '1.05rem' }}>
                        {product.description}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', marginBottom: '3rem' }}>
                        <button
                            onClick={() => addToCart(product)}
                            disabled={product.stock === 0}
                            style={{
                                background: product.stock === 0 ? 'var(--secondary)' : 'var(--primary)',
                                color: 'white',
                                padding: '1.25rem',
                                borderRadius: 'var(--radius)',
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.75rem',
                                opacity: product.stock === 0 ? 0.6 : 1
                            }}
                        >
                            <ShoppingBag size={20} /> {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                        <button
                            onClick={() => toggleWishlist(product)}
                            style={{
                                border: '1px solid var(--border)',
                                padding: '1.25rem',
                                borderRadius: 'var(--radius)',
                                background: inWishlist ? 'var(--primary)' : 'transparent',
                                color: inWishlist ? 'white' : 'var(--foreground)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Heart size={20} fill={inWishlist ? 'white' : 'none'} />
                        </button>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ color: 'var(--primary)' }}><ShieldCheck size={24} /></div>
                            <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>1-Year Warranty</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ color: 'var(--primary)' }}><Truck size={24} /></div>
                            <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>Free Shipping</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ color: 'var(--primary)' }}><RefreshCcw size={24} /></div>
                            <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>Easy Returns</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            <ProductTabs
                description={product.description}
                specifications={product.specifications}
                reviews={product.customerReviews}
                ReviewComponent={
                    <ReviewSection
                        reviews={product.customerReviews || []}
                        rating={product.rating}
                        totalReviews={product.reviews}
                    />
                }
            />

            {relatedProducts.length > 0 && (
                <section style={{ marginTop: '5rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>You May Also Like</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                        {relatedProducts.map((relatedProduct) => (
                            <ProductCard key={relatedProduct.id} product={relatedProduct} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ProductDetail;
