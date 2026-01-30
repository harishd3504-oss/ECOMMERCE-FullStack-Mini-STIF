import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ size = 60, showBadge = true, animated = true }) => {
    const LogoSVG = () => (
        <svg width={size} height={size} viewBox="0 0 60 60">
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
    );

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            {animated ? (
                <motion.div
                    whileHover={{ rotate: 5, scale: 1.08 }}
                    style={{ position: 'relative', zIndex: 2 }}
                >
                    <LogoSVG />
                </motion.div>
            ) : (
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <LogoSVG />
                </div>
            )}

            {showBadge && (
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-10px',
                        background: 'linear-gradient(135deg, var(--leaf-green), var(--primary))',
                        color: 'white',
                        fontSize: '0.5rem',
                        fontWeight: '900',
                        padding: '3px 7px',
                        borderRadius: '15px',
                        boxShadow: '0 4px 12px rgba(82, 183, 136, 0.4)',
                        whiteSpace: 'nowrap',
                        border: '1.5px solid white',
                        zIndex: 3,
                        letterSpacing: '0.5px'
                    }}
                >
                    100%
                </motion.div>
            )}
        </div>
    );
};

export default Logo;
