import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const navigate = useNavigate();
    const inWishlist = isInWishlist(product.id);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            style={{
                background: 'var(--card)',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                overflow: 'hidden',
                position: 'relative',
                transition: 'box-shadow 0.3s ease',
                cursor: 'pointer'
            }}
            className="product-card"
            onClick={() => navigate(`/product/${product.id}`)}
        >
            <button
                onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
                style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    zIndex: 1,
                    padding: '8px',
                    background: 'rgba(255,255,255,0.9)',
                    borderRadius: '50%',
                    color: inWishlist ? 'var(--accent)' : 'var(--secondary)',
                    border: 'none'
                }}
            >
                <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
            </button>

            {product.oldPrice && (
                <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    zIndex: 1,
                    background: '#dc2626',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                }}>
                    {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                </div>
            )}

            <div style={{ aspectRatio: '4/5', overflow: 'hidden', background: 'var(--muted)' }}>
                <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>

            <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.5rem' }}>
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < product.rating ? "#fbbf24" : "none"} stroke={i < product.rating ? "#fbbf24" : "#94a3b8"} />
                    ))}
                    <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', marginLeft: '0.25rem' }}>({product.reviews})</span>
                </div>

                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>{product.name}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--secondary)', marginBottom: '1rem' }}>{product.category}</p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <span style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>₹{product.price}</span>
                        {product.oldPrice && (
                            <span style={{ fontSize: '0.875rem', color: 'var(--secondary)', textDecoration: 'line-through', marginLeft: '0.5rem' }}>₹{product.oldPrice}</span>
                        )}
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                        }}
                        style={{
                            background: 'var(--primary)',
                            color: 'white',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 10px rgba(45, 106, 79, 0.3)',
                            border: 'none'
                        }}
                    >
                        <ShoppingCart size={18} />
                    </button>
                </div>
            </div>

            <style>{`.product-card:hover { box-shadow: 0 12px 24px -10px rgba(0,0,0,0.1); }`}</style>
        </motion.div>
    );
};

export default ProductCard;
