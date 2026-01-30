import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Search, Package, MapPin, Mail, Phone, Calendar, Clock, Truck, Edit2, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '../utils/api';

const STATUS_COLUMNS = ['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const Timer = ({ startTime }) => {
    const [elapsed, setElapsed] = useState('');

    useEffect(() => {
        const updateTimer = () => {
            if (!startTime) return;
            const start = new Date(startTime).getTime();
            const now = new Date().getTime();
            const diff = now - start;

            if (diff < 0) {
                setElapsed('0s');
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            let timeString = '';
            if (days > 0) timeString += `${days}d `;
            if (hours > 0) timeString += `${hours}h `;
            if (minutes > 0) timeString += `${minutes}m `;
            timeString += `${seconds}s`;

            setElapsed(timeString);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [startTime]);

    return (
        <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--primary)', fontWeight: 'bold' }}>
            <Clock size={12} /> {elapsed}
        </span>
    );
};

const DeliveryTimer = ({ targetTime }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const updateTimer = () => {
            if (!targetTime) return;
            const target = new Date(targetTime).getTime();
            const now = new Date().getTime();
            const diff = target - now;

            if (diff < 0) {
                setTimeLeft('Delivered');
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            let timeString = '';
            if (days > 0) timeString += `${days}d `;
            if (hours > 0) timeString += `${hours}h `;
            timeString += `${minutes}m`;

            setTimeLeft(timeString);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 60000);
        return () => clearInterval(interval);
    }, [targetTime]);

    return (
        <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent)', fontWeight: 'bold' }}>
            <Truck size={12} /> {timeLeft}
        </span>
    );
};

const ShipmentTracker = ({ orders, handleShippingUpdate }) => {
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({ tracking_number: '', carrier: '', estimated_delivery_at: '' });

    const shippedOrders = orders.filter(o => o.status === 'Shipped' || o.status === 'Delivered' || o.status === 'Processing');

    const startEditing = (order) => {
        setEditingId(order.public_id);
        setEditData({ 
            tracking_number: order.tracking_number || '', 
            carrier: order.carrier || '',
            estimated_delivery_at: order.estimated_delivery_at || ''
        });
    };

    const saveEdit = async (orderId) => {
        await handleShippingUpdate(orderId, editData);
        setEditingId(null);
    };

    return (
        <div style={{ flex: 1, overflow: 'auto', background: 'var(--card)', borderRadius: '16px', border: '1px solid var(--border)', marginTop: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ background: 'var(--muted)', position: 'sticky', top: 0, zIndex: 10 }}>
                    <tr>
                        <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Order ID</th>
                        <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Customer</th>
                        <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Status</th>
                        <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Carrier</th>
                        <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Tracking Number</th>
                        <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Estimated Delivery</th>
                        <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {shippedOrders.map(order => (
                        <tr key={order.public_id} style={{ borderBottom: '1px solid var(--border)' }}>
                            <td style={{ padding: '1rem', fontFamily: 'monospace', fontWeight: 'bold', color: 'var(--primary)' }}>{order.public_id}</td>
                            <td style={{ padding: '1rem' }}>
                                <div style={{ fontWeight: '500' }}>{order.customer_name}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--secondary)' }}>{order.customer_email}</div>
                            </td>
                            <td style={{ padding: '1rem' }}>
                                <span style={{ 
                                    padding: '0.25rem 0.5rem', 
                                    borderRadius: '6px', 
                                    fontSize: '0.8rem', 
                                    fontWeight: '600',
                                    background: order.status === 'Delivered' ? '#DEF7EC' : '#E1EFFE',
                                    color: order.status === 'Delivered' ? '#2d6a4f' : '#1E429F'
                                }}>
                                    {order.status}
                                </span>
                            </td>
                            <td style={{ padding: '1rem' }}>
                                {editingId === order.public_id ? (
                                    <input 
                                        value={editData.carrier}
                                        onChange={(e) => setEditData({...editData, carrier: e.target.value})}
                                        style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid var(--border)', width: '100px' }}
                                        placeholder="Carrier"
                                    />
                                ) : (
                                    order.carrier || <span style={{ color: 'var(--secondary)', fontStyle: 'italic' }}>Not set</span>
                                )}
                            </td>
                            <td style={{ padding: '1rem' }}>
                                {editingId === order.public_id ? (
                                    <input 
                                        value={editData.tracking_number}
                                        onChange={(e) => setEditData({...editData, tracking_number: e.target.value})}
                                        style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid var(--border)', width: '150px' }}
                                        placeholder="Tracking #"
                                    />
                                ) : (
                                    order.tracking_number || <span style={{ color: 'var(--secondary)', fontStyle: 'italic' }}>Not assigned</span>
                                )}
                            </td>
                            <td style={{ padding: '1rem' }}>
                                {editingId === order.public_id ? (
                                    <input 
                                        type="date"
                                        value={editData.estimated_delivery_at?.split('T')[0] || ''}
                                        onChange={(e) => setEditData({...editData, estimated_delivery_at: new Date(e.target.value).toISOString()})}
                                        style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid var(--border)', width: '130px' }}
                                    />
                                ) : (
                                    order.estimated_delivery_at ? new Date(order.estimated_delivery_at).toLocaleDateString() : '--'
                                )}
                            </td>
                            <td style={{ padding: '1rem' }}>
                                {editingId === order.public_id ? (
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button onClick={() => saveEdit(order.public_id)} style={{ background: '#ecfdf5', color: '#2d6a4f', border: '1px solid #10b981', padding: '0.4rem', borderRadius: '6px' }}><Check size={18} /></button>
                                        <button onClick={() => setEditingId(null)} style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #ef4444', padding: '0.4rem', borderRadius: '6px' }}><X size={18} /></button>
                                    </div>
                                ) : (
                                    <button onClick={() => startEditing(order)} style={{ background: 'var(--muted)', color: 'var(--primary)', border: '1px solid var(--border)', padding: '0.4rem', borderRadius: '6px' }}><Edit2 size={18} /></button>
                                )}
                            </td>
                        </tr>
                    ))}
                    {!shippedOrders.length && (
                        <tr>
                            <td colSpan="7" style={{ padding: '3rem', textAlign: 'center', color: 'var(--secondary)' }}>No shipments found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [draggedOrder, setDraggedOrder] = useState(null);
    const [activeTab, setActiveTab] = useState('board');

    const fetchOrders = async (silent = false) => {
        if (!silent) setLoading(true);
        try {
            const data = await api.fetchAllOrders();
            setOrders(data);
        } catch (error) {
            if (!silent) toast.error("Failed to fetch orders");
        } finally {
            if (!silent) setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(() => fetchOrders(true), 5000);
        return () => clearInterval(interval);
    }, []);

    const handleStatusUpdate = async (orderId, newStatus) => {
        const originalOrders = [...orders];
        setOrders(orders.map(o => o.public_id === orderId ? { ...o, status: newStatus } : o));
        try {
            await api.updateOrderStatus(orderId, { status: newStatus });
            toast.success(`Order ${newStatus}`);
            fetchOrders();
        } catch (error) {
            setOrders(originalOrders);
            toast.error("Update failed");
        }
    };

    const handleShippingUpdate = async (orderId, shippingData) => {
        try {
            await api.updateOrderShipping(orderId, shippingData);
            toast.success("Shipping updated");
            fetchOrders();
        } catch (error) {
            toast.error("Failed to update shipping");
        }
    };

    const onDragStart = (e, order) => {
        setDraggedOrder(order);
        e.dataTransfer.setData('orderId', order.public_id);
    };

    const onDragOver = (e) => e.preventDefault();

    const onDrop = (e, status) => {
        e.preventDefault();
        const orderId = e.dataTransfer.getData('orderId');
        if (draggedOrder && draggedOrder.status !== status) {
            handleStatusUpdate(orderId, status);
        }
    };

    const filteredOrders = orders.filter(order =>
        (order.public_id?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (order.customer_email?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const getColumnOrders = (status) => filteredOrders.filter(o => o.status === status);

    return (
        <div className="container" style={{ padding: '2rem', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexShrink: 0 }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem' }}>Admin Dashboard</h1>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button 
                            onClick={() => setActiveTab('board')}
                            style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: activeTab === 'board' ? 'var(--primary)' : 'transparent', color: activeTab === 'board' ? 'white' : 'var(--secondary)', fontWeight: 'bold' }}
                        >
                            Order Board
                        </button>
                        <button 
                            onClick={() => setActiveTab('tracker')}
                            style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: activeTab === 'tracker' ? 'var(--primary)' : 'transparent', color: activeTab === 'tracker' ? 'white' : 'var(--secondary)', fontWeight: 'bold' }}
                        >
                            Shipment Tracker
                        </button>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--card)' }}
                        />
                    </div>
                    <button onClick={fetchOrders} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--primary)', color: 'white', padding: '0.75rem 1.25rem', borderRadius: '8px' }}>
                        <RefreshCw size={18} /> Refresh
                    </button>
                </div>
            </div>

            {activeTab === 'board' ? (
                <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', flex: 1, paddingBottom: '1rem' }}>
                    {STATUS_COLUMNS.map(status => (
                        <div key={status} onDragOver={onDragOver} onDrop={(e) => onDrop(e, status)} style={{ minWidth: '320px', background: 'var(--muted)', borderRadius: '16px', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', padding: '0.5rem' }}>
                                <h3 style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{status}</h3>
                                <span style={{ background: 'rgba(0,0,0,0.1)', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                    {getColumnOrders(status).length}
                                </span>
                            </div>

                            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '100px' }}>
                                {getColumnOrders(status).map(order => (
                                    <motion.div layoutId={order.public_id} key={order.public_id} draggable onDragStart={(e) => onDragStart(e, order)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'var(--card)', padding: '1rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', cursor: 'grab', border: '1px solid var(--border)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span style={{ fontWeight: 'bold', fontFamily: 'monospace', color: 'var(--primary)' }}>{order.public_id}</span>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--secondary)' }}>{new Date(order.created_at).toLocaleDateString()}</span>
                                        </div>

                                        <div style={{ marginBottom: '0.75rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--foreground)', marginBottom: '0.5rem' }}>
                                                <Mail size={14} /> {order.customer_email}
                                            </div>
                                            {status !== 'Shipped' ? (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--secondary)' }}>
                                                    <Clock size={14} /> <Timer startTime={order.status_updated_at || order.created_at} />
                                                </div>
                                            ) : (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--secondary)' }}>
                                                        <Calendar size={14} /> {new Date(order.estimated_delivery_at).toLocaleDateString()}
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--secondary)' }}>
                                                        <Clock size={14} /> <DeliveryTimer targetTime={order.estimated_delivery_at} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <Package size={14} /> {order.items?.length || 0} Items
                                            </span>
                                            <span style={{ fontWeight: 'bold' }}>₹{order.total_amount?.toFixed(2)}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <ShipmentTracker orders={filteredOrders} handleShippingUpdate={handleShippingUpdate} />
            )}
        </div>
    );
};

export default AdminDashboard;
