import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, LogOut, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../ui/SearchBar';

const Navbar = () => {
    const { cartCount, setIsCartOpen } = useCart();
    const { user, logout } = useAuth();
    const { wishlistCount } = useWishlist();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [showPongal, setShowPongal] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'About Us', path: '/about' },
        { name: 'FAQ', path: '/faq' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full">
            {/* Announcement Bar */}
            <div style={{
                background: 'linear-gradient(90deg, var(--primary) 0%, var(--primary-hover) 100%)',
                color: 'var(--gold)',
                padding: '0.5rem 0',
                fontSize: '0.85rem',
                fontWeight: '600',
                textAlign: 'center',
                letterSpacing: '1px',
                borderBottom: '1px solid rgba(212, 175, 55, 0.3)'
            }}>
                <motion.span
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    ✨ FREE SHIPPING ON ALL ORDERS ABOVE ₹999 | USE CODE: BHARAT10 ✨
                </motion.span>
            </div>

            <nav className="glass" style={{ padding: '1rem 0', borderBottom: '2px solid var(--gold)' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
                    {/* Logo Area */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                        <div style={{ position: 'relative' }}>
                            <Link
                                to="/"
                                onClick={() => setShowPongal(!showPongal)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    textDecoration: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <div style={{ position: 'relative' }}>
                                    <motion.div
                                        whileHover={{ rotate: 5, scale: 1.08 }}
                                        style={{ position: 'relative', zIndex: 2 }}
                                    >
                                        <svg width="60" height="60" viewBox="0 0 60 60">
                                            {/* Outer Circle with Natural Gradient */}
                                            <circle cx="30" cy="30" r="28" fill="url(#naturalGradient)" stroke="var(--leaf-green)" strokeWidth="2" />
                                            
                                            {/* Main Leaf Shape */}
                                            <path 
                                                d="M 30 15 Q 40 20, 42 30 Q 40 40, 30 45 Q 20 40, 18 30 Q 20 20, 30 15 Z" 
                                                fill="url(#leafGradient)" 
                                                stroke="var(--primary)" 
                                                strokeWidth="1.5"
                                            />
                                            
                                            {/* Leaf Veins */}
                                            <path d="M 30 15 L 30 45" stroke="var(--primary)" strokeWidth="1.5" opacity="0.6" />
                                            <path d="M 30 22 Q 35 25, 38 30" stroke="var(--primary)" strokeWidth="1" opacity="0.4" />
                                            <path d="M 30 22 Q 25 25, 22 30" stroke="var(--primary)" strokeWidth="1" opacity="0.4" />
                                            <path d="M 30 30 Q 35 33, 38 36" stroke="var(--primary)" strokeWidth="1" opacity="0.4" />
                                            <path d="M 30 30 Q 25 33, 22 36" stroke="var(--primary)" strokeWidth="1" opacity="0.4" />
                                            
                                            {/* Traditional Indian Mandala Pattern - Small dots */}
                                            <circle cx="30" cy="30" r="2" fill="var(--saffron)" />
                                            <circle cx="26" cy="26" r="1" fill="var(--gold)" opacity="0.8" />
                                            <circle cx="34" cy="26" r="1" fill="var(--gold)" opacity="0.8" />
                                            <circle cx="26" cy="34" r="1" fill="var(--gold)" opacity="0.8" />
                                            <circle cx="34" cy="34" r="1" fill="var(--gold)" opacity="0.8" />
                                            
                                            {/* Decorative Border Pattern */}
                                            <circle cx="30" cy="8" r="1.5" fill="var(--saffron)" opacity="0.6" />
                                            <circle cx="30" cy="52" r="1.5" fill="var(--saffron)" opacity="0.6" />
                                            <circle cx="8" cy="30" r="1.5" fill="var(--saffron)" opacity="0.6" />
                                            <circle cx="52" cy="30" r="1.5" fill="var(--saffron)" opacity="0.6" />
                                            
                                            <defs>
                                                <linearGradient id="naturalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" style={{ stopColor: '#f0fdf4', stopOpacity: 1 }} />
                                                    <stop offset="50%" style={{ stopColor: '#d1fae5', stopOpacity: 1 }} />
                                                    <stop offset="100%" style={{ stopColor: '#ecfdf5', stopOpacity: 1 }} />
                                                </linearGradient>
                                                <linearGradient id="leafGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" style={{ stopColor: '#52b788', stopOpacity: 0.9 }} />
                                                    <stop offset="50%" style={{ stopColor: '#2d6a4f', stopOpacity: 0.95 }} />
                                                    <stop offset="100%" style={{ stopColor: '#1b4332', stopOpacity: 1 }} />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </motion.div>

                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2.5, repeat: Infinity }}
                                        style={{
                                            position: 'absolute',
                                            top: '-10px',
                                            right: '-12px',
                                            background: 'linear-gradient(135deg, var(--leaf-green), var(--primary))',
                                            color: 'white',
                                            fontSize: '0.55rem',
                                            fontWeight: '900',
                                            padding: '4px 9px',
                                            borderRadius: '20px',
                                            boxShadow: '0 4px 12px rgba(82, 183, 136, 0.4)',
                                            whiteSpace: 'nowrap',
                                            border: '1.5px solid white',
                                            zIndex: 3,
                                            letterSpacing: '0.5px'
                                        }}
                                    >
                                        100%
                                    </motion.div>
                                </div>

                                <div style={{ transition: 'transform 0.3s ease' }}>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                                        <span style={{ fontSize: '1.85rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '-0.5px', fontFamily: 'var(--font-serif)' }}>
                                            SAIRAM
                                        </span>
                                        <span style={{ fontSize: '1.85rem', fontWeight: '500', color: 'var(--foreground)', fontFamily: 'var(--font-serif)' }}>
                                            STORES
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-dark)', fontWeight: '800', marginTop: '-6px', letterSpacing: '3px', textTransform: 'uppercase' }}>
                                        Legacy of Bharat
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Nav Links */}
                        <div className="desktop-links" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    style={{
                                        fontSize: '0.95rem',
                                        fontWeight: '700',
                                        color: 'var(--foreground)',
                                        position: 'relative',
                                        padding: '0.5rem 0'
                                    }}
                                    className="nav-link-item"
                                >
                                    <motion.span whileHover={{ color: 'var(--primary)' }}>{link.name}</motion.span>
                                    <motion.div
                                        className="nav-underline"
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            height: '2px',
                                            background: 'var(--saffron)',
                                            transformOrigin: 'left'
                                        }}
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Search & Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1, justifyContent: 'flex-end' }}>
                        <div className="desktop-search" style={{ flex: 1, maxWidth: '400px' }}>
                            <SearchBar />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <motion.button
                                whileHover={{ y: -3, scale: 1.1 }}
                                onClick={() => navigate('/shop')}
                                style={{ color: 'var(--primary)', position: 'relative' }}
                                title="Wishlist"
                            >
                                <Heart size={24} strokeWidth={2.5} />
                                {wishlistCount > 0 && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '-8px',
                                        right: '-8px',
                                        background: 'var(--saffron)',
                                        color: 'white',
                                        fontSize: '10px',
                                        fontWeight: '900',
                                        padding: '2px 6px',
                                        borderRadius: '10px',
                                        border: '1px solid white'
                                    }}>
                                        {wishlistCount}
                                    </span>
                                )}
                            </motion.button>

                            {user ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--muted)', padding: '0.4rem 1rem', borderRadius: '30px', border: '1px solid var(--border)' }}>
                                    <div style={{ width: '28px', height: '28px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.8rem' }}>
                                        {user.name.charAt(0)}
                                    </div>
                                    <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)' }}>{user.name}</span>
                                    <button onClick={logout} style={{ color: 'var(--secondary)' }} title="Logout"><LogOut size={18} /></button>
                                </div>
                            ) : (
                                <motion.button
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    onClick={() => navigate('/login')}
                                    style={{ color: 'var(--primary)' }}
                                >
                                    <User size={24} strokeWidth={2.5} />
                                </motion.button>
                            )}

                            <motion.button
                                whileHover={{ y: -3, scale: 1.1 }}
                                onClick={() => setIsCartOpen(true)}
                                style={{
                                    color: 'white',
                                    background: 'var(--primary)',
                                    padding: '0.6rem 1.25rem',
                                    borderRadius: '30px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    boxShadow: '0 4px 15px rgba(27, 67, 50, 0.2)',
                                    position: 'relative'
                                }}
                            >
                                <ShoppingBag size={20} strokeWidth={2.5} />
                                <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>Bag</span>
                                {cartCount > 0 && (
                                    <span style={{
                                        background: 'var(--saffron)',
                                        color: 'white',
                                        fontSize: '10px',
                                        fontWeight: '900',
                                        padding: '2px 6px',
                                        borderRadius: '10px',
                                        marginLeft: '-4px'
                                    }}>
                                        {cartCount}
                                    </span>
                                )}
                            </motion.button>

                            <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ display: 'none' }}>
                                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Decorative Pattern Border */}
                <div style={{
                    height: '4px',
                    width: '100%',
                    background: 'url("https://www.transparenttextures.com/patterns/natural-paper.png"), linear-gradient(90deg, var(--saffron) 0%, var(--gold) 50%, var(--saffron) 100%)',
                    marginTop: '1rem',
                    opacity: 0.6
                }} />
            </nav>

            <style>{`
                @media (max-width: 1024px) {
                    .desktop-links { display: none !important; }
                    .desktop-search { max-width: 250px !important; }
                }
                @media (max-width: 768px) {
                    .desktop-search { display: none !important; }
                    .mobile-toggle { display: block !important; }
                }
                .nav-link-item:hover .nav-link-text {
                    color: var(--primary);
                }
            `}</style>
        </header>
    );
};

export default Navbar;
