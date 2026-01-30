import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Truck } from 'lucide-react';

const Success = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const orderId = location.state?.orderId;

    return (
        <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                style={{
                    maxWidth: '500px',
                    margin: '0 auto',
                    background: 'var(--card)',
                    padding: '4rem 2rem',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--border)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
                }}
            >
                <div style={{ color: 'var(--primary)', display: 'inline-block', marginBottom: '2rem' }}>
                    <CheckCircle size={80} />
                </div>
                <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>Order Placed!</h1>
                <p style={{ color: 'var(--secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    Thank you for shopping with SAIRAM STORES. Your order has been successfully placed.
                </p>

                {orderId && (
                    <div style={{ background: 'var(--muted)', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
                        <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Order ID:</p>
                        <p style={{ fontWeight: 'bold', fontFamily: 'monospace' }}>{orderId}</p>
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {orderId && (
                        <button
                            onClick={() => navigate(`/track-order/${orderId}`)}
                            style={{
                                background: 'var(--primary)',
                                color: 'white',
                                padding: '1rem',
                                borderRadius: 'var(--radius)',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            Track Order <Truck size={18} />
                        </button>
                    )}

                    <button
                        onClick={() => navigate('/shop')}
                        style={{
                            border: '1px solid var(--border)',
                            padding: '1rem',
                            borderRadius: 'var(--radius)',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        Continue Shopping <ArrowRight size={18} />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Success;

