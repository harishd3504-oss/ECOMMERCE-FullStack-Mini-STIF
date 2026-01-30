import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import Logo from '../components/ui/Logo';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(email, password)) {
            toast.success("Welcome back!");
            navigate('/');
        }
    };

    return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass"
                style={{ width: '100%', maxWidth: '400px', padding: '2.5rem', borderRadius: 'var(--radius)' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                        <Logo size={60} showBadge={true} animated={true} />
                    </div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: '800', fontFamily: 'var(--font-serif)', color: 'var(--primary)', marginBottom: '0.5rem' }}>Welcome Back</h1>
                    <p style={{ color: 'var(--secondary)', fontSize: '0.9rem' }}>Sign in to SAIRAM STORES</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Mail style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} size={18} />
                        <input
                            type="email"
                            placeholder="Email address"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <Lock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} size={18} />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={inputStyle}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            background: 'var(--primary)',
                            color: 'white',
                            padding: '0.875rem',
                            borderRadius: 'var(--radius)',
                            fontWeight: 'bold',
                            marginTop: '1rem',
                        }}
                    >
                        Sign In
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--secondary)' }}>
                    Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: '600' }}>Create one</Link>
                </p>
            </motion.div>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 2.5rem',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    outline: 'none',
    fontSize: '0.95rem',
    background: 'var(--background)',
    boxSizing: 'border-box'
};

export default Login;
