import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import heroImage from '../assets/290816_TheGoodnessStore_Feature.jpg';

const featuredProducts = [
    {
        id: 1,
        name: "Pure Himalayan Honey",
        price: 499,
        oldPrice: 599,
        category: "Organic",
        rating: 5,
        reviews: 124,
        image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 5,
        name: "Organic Turmeric Powder",
        price: 120,
        category: "Spices",
        rating: 5,
        reviews: 145,
        image: "https://images.unsplash.com/photo-1585238341267-1cfec2046a55?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        name: "Cold Pressed Coconut Oil",
        price: 750,
        oldPrice: 850,
        category: "Oils",
        rating: 5,
        reviews: 210,
        image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 4,
        name: "Handmade Saffron Soap",
        price: 150,
        category: "Skincare",
        rating: 4,
        reviews: 56,
        image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&q=80&w=800"
    }
];

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <section style={{
                padding: '6rem 0',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #d1fae5 50%, #ecfdf5 100%)',
                position: 'relative',
                overflow: 'hidden',
                borderBottom: '2px solid var(--leaf-green)'
            }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'center', gap: '4rem' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span style={{
                            background: 'rgba(245, 158, 11, 0.15)',
                            color: 'var(--accent-dark)',
                            padding: '0.6rem 1.25rem',
                            borderRadius: '2rem',
                            fontSize: '0.9rem',
                            fontWeight: '700',
                            display: 'inline-block',
                            marginBottom: '1.5rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            ✨ 100% Pure & Swadeshi
                        </span>
                        <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', lineHeight: 1.1, fontWeight: '800', marginBottom: '1.5rem', color: 'var(--primary)' }}>
                            Experience the Essence of <span style={{ color: 'var(--accent)' }}>Indian Nature</span>
                        </h1>
                        <p style={{ fontSize: '1.125rem', color: 'var(--secondary)', marginBottom: '2.5rem', maxWidth: '500px', fontWeight: '500' }}>
                            Celebrating the rich heritage of Indian ayurveda and organic farming. Bringing the goodness of Bharat directly to your home.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => navigate('/shop')}
                                style={{
                                    background: 'var(--primary)',
                                    color: 'white',
                                    padding: '1rem 2rem',
                                    borderRadius: 'var(--radius)',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    boxShadow: '0 10px 20px rgba(45, 106, 79, 0.2)'
                                }}
                            >
                                Shop Collection <ArrowRight size={20} />
                            </button>
                            <button
                                onClick={() => navigate('/shop')}
                                style={{
                                    border: '1px solid var(--border)',
                                    padding: '1rem 2rem',
                                    borderRadius: 'var(--radius)',
                                    fontWeight: 'bold'
                                }}
                            >
                                View Categories
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        style={{ position: 'relative' }}
                    >
                        <div style={{
                            width: '100%',
                            aspectRatio: '1/1',
                            background: 'var(--primary)',
                            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                            opacity: 0.1,
                            position: 'absolute',
                            top: '10%',
                            left: '10%'
                        }} />
                        <img
                            src={heroImage}
                            alt="Organic Selection"
                            style={{ width: '100%', borderRadius: 'var(--radius)', position: 'relative', zIndex: 1, boxShadow: '20px 20px 60px rgba(0,0,0,0.1)' }}
                        />
                    </motion.div>
                </div>
            </section>

            <section style={{ padding: '4rem 0' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {[
                        { icon: <ShieldCheck />, title: "Quality Assured", desc: "100% Genuine and certified products" },
                        { icon: <Truck />, title: "Fast Delivery", desc: "Free shipping on orders above ₹999" },
                        { icon: <RefreshCcw />, title: "Easy Returns", desc: "15-day easy return policy" },
                        { icon: <Star />, title: "Best Offers", desc: "Save more with our loyalty points" }
                    ].map((feature, i) => (
                        <div key={i} style={{ padding: '2rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                            <div style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'inline-block' }}>{React.cloneElement(feature.icon, { size: 32 })}</div>
                            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>{feature.title}</h3>
                            <p style={{ color: 'var(--secondary)', fontSize: '0.875rem' }}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
