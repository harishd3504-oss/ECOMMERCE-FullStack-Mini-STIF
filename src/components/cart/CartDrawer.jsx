import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CartDrawer = () => {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.4)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 100
                        }}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            maxWidth: '400px',
                            background: 'var(--background)',
                            boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
                            zIndex: 101,
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Your Cart</h2>
                            <button onClick={() => setIsCartOpen(false)} style={{ color: 'var(--secondary)' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                            {cart.length === 0 ? (
                                <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--secondary)' }}>
                                    <ShoppingBag size={64} style={{ marginBottom: '1rem', opacity: 0.2 }} />
                                    <p>Your cart is empty</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        style={{ marginTop: '1rem', color: 'var(--primary)', fontWeight: '600' }}
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {cart.map((item) => (
                                        <div key={item.id} style={{ display: 'flex', gap: '1rem' }}>
                                            <div style={{ width: '80px', height: '80px', borderRadius: 'var(--radius)', background: 'var(--muted)', overflow: 'hidden' }}>
                                                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                    <h3 style={{ fontSize: '0.95rem', fontWeight: '600' }}>{item.name}</h3>
                                                    <button onClick={() => removeFromCart(item.id)} style={{ color: 'var(--accent)' }}>
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <p style={{ fontSize: '0.875rem', color: 'var(--secondary)', margin: '0.25rem 0' }}>₹{item.price}</p>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                                                    <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: '2px', border: '1px solid var(--border)', borderRadius: '4px' }}><Minus size={14} /></button>
                                                    <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: '2px', border: '1px solid var(--border)', borderRadius: '4px' }}><Plus size={14} /></button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)', background: 'var(--muted)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span style={{ fontWeight: '500' }}>Subtotal</span>
                                <span style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>₹{cartTotal.toFixed(2)}</span>
                            </div>
                            <button
                                disabled={cart.length === 0}
                                onClick={() => {
                                    setIsCartOpen(false);
                                    navigate('/checkout');
                                }}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: cart.length === 0 ? 'var(--secondary)' : 'var(--primary)',
                                    color: 'white',
                                    borderRadius: 'var(--radius)',
                                    fontWeight: 'bold',
                                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)'
                                }}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
