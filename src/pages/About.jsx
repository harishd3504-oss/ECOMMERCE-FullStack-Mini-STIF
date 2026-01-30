import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Leaf, Award, Users } from 'lucide-react';
import heroImage from '../assets/290816_TheGoodnessStore_Feature.jpg';

const About = () => {
    return (
        <div className="container" style={{ padding: '4rem 1.5rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ maxWidth: '900px', margin: '0 auto' }}
            >
                <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', textAlign: 'center' }}>
                    About <span style={{ color: 'var(--primary)' }}>SAIRAM STORES</span>
                </h1>

                <p style={{ fontSize: '1.25rem', color: 'var(--secondary)', textAlign: 'center', marginBottom: '4rem', lineHeight: 1.8 }}>
                    Your trusted partner for 100% natural and organic products since 2020
                </p>

                <div style={{ marginBottom: '4rem' }}>
                    <img
                        src={heroImage}
                        alt="Our Store"
                        style={{ width: '100%', borderRadius: 'var(--radius)', marginBottom: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                    />
                </div>

                <div style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Our Story</h2>
                    <p style={{ lineHeight: 1.8, color: 'var(--secondary)', marginBottom: '1rem' }}>
                        SAIRAM STORES was founded with a simple mission: to bring the purest, most natural products directly to your doorstep.
                        We believe that everyone deserves access to high-quality organic products that are good for both people and the planet.
                    </p>
                    <p style={{ lineHeight: 1.8, color: 'var(--secondary)', marginBottom: '1rem' }}>
                        Our journey began in the heart of India, where we partnered with local farmers and artisans who share our commitment
                        to sustainable, chemical-free production. Every product in our store is carefully selected and tested to meet the
                        highest standards of purity and quality.
                    </p>
                    <p style={{ lineHeight: 1.8, color: 'var(--secondary)' }}>
                        Today, we're proud to serve thousands of customers across India, helping them make healthier choices for themselves
                        and their families.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                    {[
                        { icon: <Leaf />, title: '100% Organic', desc: 'All products are certified organic and chemical-free' },
                        { icon: <Heart />, title: 'Ethically Sourced', desc: 'Direct partnerships with local farmers and artisans' },
                        { icon: <Award />, title: 'Quality Assured', desc: 'Rigorous testing and quality control processes' },
                        { icon: <Users />, title: 'Customer First', desc: 'Dedicated support and satisfaction guarantee' }
                    ].map((value, i) => (
                        <div key={i} style={{
                            padding: '2rem',
                            background: 'var(--muted)',
                            borderRadius: 'var(--radius)',
                            textAlign: 'center'
                        }}>
                            <div style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'inline-block' }}>
                                {React.cloneElement(value.icon, { size: 40 })}
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{value.title}</h3>
                            <p style={{ color: 'var(--secondary)', fontSize: '0.95rem' }}>{value.desc}</p>
                        </div>
                    ))}
                </div>

                <div style={{ background: 'var(--muted)', padding: '3rem', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Our Certifications</h2>
                    <p style={{ color: 'var(--secondary)', marginBottom: '2rem' }}>
                        We are proud to be certified by leading organic and quality standards organizations
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                        {['ISO 22000', 'FSSAI', 'USDA Organic', 'India Organic'].map((cert) => (
                            <div key={cert} style={{
                                background: 'white',
                                padding: '1rem 2rem',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                border: '2px solid var(--primary)'
                            }}>
                                {cert}
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default About;
