import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, CreditCard, Truck, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '../utils/api';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zip: '',
        phone: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const orderData = {
                customer: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    address: `${formData.address}, ${formData.city}, ${formData.zip}`,
                    phone: formData.phone
                },
                items: cart.map(item => ({
                    productId: item.id.toString(),
                    param: item.size || 'Standard',
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: cartTotal + 50
            };

            const data = await api.placeOrder(orderData);
            toast.success("Order Placed Successfully!");
            clearCart();
            navigate('/success', { state: { orderId: data.order.public_id || data.order.id } });
        } catch (error) {
            toast.error("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="container" style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
                <h2>Your cart is empty</h2>
                <button onClick={() => navigate('/shop')} style={{ marginTop: '1rem', color: 'var(--primary)' }}>Back to Shop</button>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '4rem 1.5rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '3rem' }}>Checkout</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'start' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    <section>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ background: 'var(--primary)', color: 'white', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>1</span>
                            Contact Information
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                            <input type="email" name="email" placeholder="Email address" required value={formData.email} onChange={handleChange} style={inputStyle} />
                            <input type="tel" name="phone" placeholder="Phone number" required value={formData.phone} onChange={handleChange} style={inputStyle} />
                        </div>
                    </section>

                    <section>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ background: 'var(--primary)', color: 'white', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>2</span>
                            Shipping Address
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <input type="text" name="firstName" placeholder="First Name" required value={formData.firstName} onChange={handleChange} style={inputStyle} />
                            <input type="text" name="lastName" placeholder="Last Name" required value={formData.lastName} onChange={handleChange} style={inputStyle} />
                            <input type="text" name="address" placeholder="Address" required value={formData.address} onChange={handleChange} style={{ ...inputStyle, gridColumn: 'span 2' }} />
                            <input type="text" name="city" placeholder="City" required value={formData.city} onChange={handleChange} style={inputStyle} />
                            <input type="text" name="zip" placeholder="ZIP Code" required value={formData.zip} onChange={handleChange} style={inputStyle} />
                        </div>
                    </section>

                    <section>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ background: 'var(--primary)', color: 'white', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>3</span>
                            Payment Method
                        </h3>
                        <div style={{ padding: '1.5rem', border: '2px solid var(--primary)', borderRadius: 'var(--radius)', background: 'rgba(45, 106, 79, 0.05)', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--primary)', marginBottom: '1rem' }}>
                                <CreditCard size={20} /> <span style={{ fontWeight: '600' }}>Credit / Debit Card</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <input type="text" name="cardNumber" placeholder="Card Number" required value={formData.cardNumber} onChange={handleChange} style={{ ...inputStyle, gridColumn: 'span 2' }} />
                                <input type="text" name="expiry" placeholder="MM/YY" required value={formData.expiry} onChange={handleChange} style={inputStyle} />
                                <input type="text" name="cvc" placeholder="CVC" required value={formData.cvc} onChange={handleChange} style={inputStyle} />
                            </div>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <CheckCircle size={14} color="#10b981" /> Your payment is secure and encrypted.
                        </p>
                    </section>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            background: 'var(--primary)',
                            color: 'white',
                            padding: '1.25rem',
                            borderRadius: 'var(--radius)',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            marginTop: '1rem',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? "Processing..." : `Pay ₹${(cartTotal + 50).toFixed(2)}`}
                    </button>
                </form>

                <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius)', position: 'sticky', top: '100px' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>Order Summary</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                        {cart.map(item => (
                            <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ width: '50px', height: '50px', borderRadius: '8px', overflow: 'hidden', background: 'var(--muted)' }}>
                                    <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: '0.9rem', fontWeight: '600' }}>{item.name}</p>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--secondary)' }}>Qty: {item.quantity}</p>
                                </div>
                                <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>₹{item.price * item.quantity}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--secondary)' }}>
                            <span>Subtotal</span>
                            <span>₹{cartTotal.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--secondary)' }}>
                            <span>Shipping</span>
                            <span>₹50.00</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--foreground)', fontWeight: 'bold', fontSize: '1.25rem', marginTop: '0.5rem' }}>
                            <span>Total</span>
                            <span>₹{(cartTotal + 50).toFixed(2)}</span>
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(45, 106, 79, 0.05)', borderRadius: '12px', fontSize: '0.85rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                            <Truck size={16} color="var(--primary)" /> <span style={{ fontWeight: '600' }}>Estimated Delivery</span>
                        </div>
                        <p style={{ color: 'var(--secondary)' }}>3-5 Business Days</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const inputStyle = {
    padding: '0.75rem 1rem',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    outline: 'none',
    fontSize: '0.95rem',
    background: 'var(--background)'
};

export default Checkout;
