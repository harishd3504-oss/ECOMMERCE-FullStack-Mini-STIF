import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer = () => {
    return (
        <footer style={{ background: 'var(--muted)', borderTop: '1px solid var(--border)', marginTop: '4rem' }}>
            <div className="container" style={{ padding: '3rem 1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <Logo size={50} showBadge={false} animated={false} />
                            <div>
                                <h3 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.25rem', color: 'var(--primary)', fontFamily: 'var(--font-serif)' }}>
                                    SAIRAM<span style={{ color: 'var(--foreground)' }}>STORES</span>
                                </h3>
                                <div style={{ fontSize: '0.65rem', color: 'var(--accent-dark)', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>
                                    Treasures of Bharat
                                </div>
                            </div>
                        </div>
                        <p style={{ color: 'var(--secondary)', marginBottom: '1.5rem', lineHeight: 1.6, fontSize: '0.9rem' }}>
                            Preserving the purity of Indian tradition. Bringing you the finest organic selections from across the diverse landscapes of our nation.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a href="#" style={{ color: 'var(--secondary)' }}><Facebook size={20} /></a>
                            <a href="#" style={{ color: 'var(--secondary)' }}><Instagram size={20} /></a>
                            <a href="#" style={{ color: 'var(--secondary)' }}><Twitter size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>Quick Links</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><Link to="/" style={{ color: 'var(--secondary)', fontSize: '0.95rem' }}>Home</Link></li>
                            <li><Link to="/shop" style={{ color: 'var(--secondary)', fontSize: '0.95rem' }}>Shop</Link></li>
                            <li><Link to="/about" style={{ color: 'var(--secondary)', fontSize: '0.95rem' }}>About Us</Link></li>
                            <li><Link to="/faq" style={{ color: 'var(--secondary)', fontSize: '0.95rem' }}>FAQ</Link></li>
                            <li><Link to="/admin" style={{ color: 'var(--secondary)', fontSize: '0.95rem' }}>Admin Dashboard</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>Policies</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><Link to="/privacy-policy" style={{ color: 'var(--secondary)', fontSize: '0.95rem' }}>Privacy Policy</Link></li>
                            <li><Link to="/return-policy" style={{ color: 'var(--secondary)', fontSize: '0.95rem' }}>Return & Refund</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>Contact Us</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)', fontSize: '0.95rem' }}>
                                <Mail size={16} /> support@sairamstores.com
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)', fontSize: '0.95rem' }}>
                                <Phone size={16} /> +91 90924 59913
                            </li>
                            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--secondary)', fontSize: '0.95rem' }}>
                                <MapPin size={16} style={{ marginTop: '4px' }} />
                                <span>SAI LEO NAGAR, TAMBARAM CHENNAI</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--secondary)', fontSize: '0.875rem' }}>
                        © {new Date().getFullYear()} SAIRAM STORES. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
