import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '../utils/api';

const OrderTracking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await api.fetchOrderById(id);
                setOrder(data);
            } catch (err) {
                setError(err.message);
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchOrder();
        }
    }, [id]);

    if (loading) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Loading tracking info...</div>;

    if (error) return (
        <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>
            <AlertCircle size={48} color="var(--destructive)" style={{ margin: '0 auto 1rem' }} />
            <h2>{error}</h2>
            <button onClick={() => navigate('/')} style={{ marginTop: '1rem', color: 'var(--primary)', fontWeight: 'bold' }}>Back to Home</button>
        </div>
    );

    if (!order) return null;

    async function updateStatus(orderId) {
        const nextStatus = order.status === 'Placed' ? 'Processing'
            : order.status === 'Processing' ? 'Shipped'
                : order.status === 'Shipped' ? 'Delivered' : 'Placed';

        try {
            await api.updateOrderStatus(orderId, { status: nextStatus });
            window.location.reload();
        } catch (e) {
            console.error(e);
            toast.error("Failed to simulate update");
        }
    }

    return (
        <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '800px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>Order Tracking</h1>
                    <div style={{ padding: '0.5rem 1rem', background: 'var(--muted)', borderRadius: '8px', fontSize: '0.9rem' }}>
                        ID: <span style={{ fontWeight: 'mono' }}>{order.public_id || order._id || order.id}</span>
                    </div>
                </div>

                <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius)', marginBottom: '3rem', borderLeft: '5px solid var(--primary)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>{order.status}</h2>
                            <p style={{ color: 'var(--secondary)' }}>
                                {order.status === 'Delivered' 
                                    ? 'Package successfully delivered' 
                                    : `Estimated Delivery: ${order.estimated_delivery_at ? new Date(order.estimated_delivery_at).toLocaleDateString() : '3-5 Business Days'}`
                                }
                            </p>
                        </div>
                        {order.status === 'Shipped' && (
                            <Truck size={32} color="var(--primary)" />
                        )}
                    </div>

                    {(order.carrier || order.tracking_number) && (
                        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {order.carrier && (
                                <div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Carrier</div>
                                    <div style={{ fontWeight: 'bold' }}>{order.carrier}</div>
                                </div>
                            )}
                            {order.tracking_number && (
                                <div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tracking Number</div>
                                    <div style={{ fontWeight: 'bold', fontFamily: 'monospace' }}>{order.tracking_number}</div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div style={{ position: 'relative', paddingLeft: '2rem' }}>
                    <div style={{ position: 'absolute', left: '7px', top: '10px', bottom: '10px', width: '2px', background: 'var(--border)' }}></div>

                    {order.history && order.history.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            style={{ position: 'relative', marginBottom: '2rem' }}
                        >
                            <div style={{
                                position: 'absolute',
                                left: '-2rem',
                                top: '0',
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                background: index === order.history.length - 1 ? 'var(--primary)' : 'var(--muted)',
                                border: '3px solid var(--background)',
                                zIndex: 1
                            }}></div>

                            <div style={{ background: 'var(--card)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{step.status}</h3>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--secondary)' }}>
                                        {new Date(step.timestamp).toLocaleString()}
                                    </span>
                                </div>
                                <p style={{ color: 'var(--secondary)', fontSize: '0.95rem' }}>{step.comment}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                    <button onClick={() => navigate('/shop')} style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontWeight: 'bold' }}>Continue Shopping</button>
                    <button onClick={() => updateStatus(order._id || order.id)} style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius)', background: 'var(--muted)', fontSize: '0.8rem' }} title="Demo Helper">Simulate Update (Dev)</button>
                </div>
            </motion.div>
        </div>
    );
};

export default OrderTracking;

