import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await api.fetchProducts();
                setProducts(data);
            } catch (err) {
                console.error('Failed to fetch search products:', err);
            }
        };
        loadProducts();
    }, []);

    useEffect(() => {
        if (query.length > 1) {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 5);
            setSuggestions(filtered);
            setIsOpen(true);
        } else {
            setSuggestions([]);
            setIsOpen(false);
        }
    }, [query, products]);

    const handleSelect = (product) => {
        navigate(`/product/${product.id}`);
        setQuery('');
        setIsOpen(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/shop?search=${encodeURIComponent(query)}`);
            setQuery('');
            setIsOpen(false);
        }
    };

    return (
        <div ref={searchRef} style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
            <form onSubmit={handleSearch}>
                <div style={{ position: 'relative' }}>
                    <Search
                        style={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--secondary)'
                        }}
                        size={18}
                    />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => query.length > 1 && setIsOpen(true)}
                        placeholder="Search products..."
                        style={{
                            width: '100%',
                            padding: '0.75rem 2.5rem',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius)',
                            outline: 'none',
                            background: 'var(--background)',
                            fontSize: '0.95rem'
                        }}
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => { setQuery(''); setIsOpen(false); }}
                            style={{
                                position: 'absolute',
                                right: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--secondary)',
                                padding: '4px'
                            }}
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>
            </form>

            {isOpen && suggestions.length > 0 && (
                <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: 0,
                    right: 0,
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    zIndex: 100,
                    maxHeight: '400px',
                    overflowY: 'auto'
                }}>
                    {suggestions.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => handleSelect(product)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '0.75rem 1rem',
                                cursor: 'pointer',
                                borderBottom: '1px solid var(--border)',
                                transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--muted)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    objectFit: 'cover',
                                    borderRadius: '8px'
                                }}
                            />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{product.name}</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--secondary)' }}>{product.category}</div>
                            </div>
                            <div style={{ fontWeight: 'bold', color: 'var(--primary)' }}>₹{product.price}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
