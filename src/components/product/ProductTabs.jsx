import React, { useState } from 'react';
import { Package, FileText, MessageSquare } from 'lucide-react';

const ProductTabs = ({ description, specifications, reviews, ReviewComponent }) => {
    const [activeTab, setActiveTab] = useState('description');

    const tabs = [
        { id: 'description', label: 'Description', icon: <FileText size={18} /> },
        { id: 'specifications', label: 'Specifications', icon: <Package size={18} /> },
        { id: 'reviews', label: 'Reviews', icon: <MessageSquare size={18} /> }
    ];

    return (
        <div style={{ marginTop: '3rem' }}>
            {/* Tab Headers */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                borderBottom: '2px solid var(--border)',
                marginBottom: '2rem'
            }}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '1rem 1.5rem',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: activeTab === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
                            color: activeTab === tab.id ? 'var(--primary)' : 'var(--secondary)',
                            fontWeight: activeTab === tab.id ? '600' : '500',
                            cursor: 'pointer',
                            marginBottom: '-2px',
                            transition: 'all 0.2s'
                        }}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === 'description' && (
                    <div style={{ lineHeight: 1.8, color: 'var(--foreground)' }}>
                        <p>{description}</p>
                    </div>
                )}

                {activeTab === 'specifications' && specifications && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                        {Object.entries(specifications).map(([key, value]) => (
                            <div key={key} style={{
                                padding: '1.25rem',
                                background: 'var(--muted)',
                                borderRadius: 'var(--radius)',
                                border: '1px solid var(--border)'
                            }}>
                                <div style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--secondary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    marginBottom: '0.5rem'
                                }}>
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </div>
                                <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                                    {typeof value === 'boolean' ? (value ? 'Yes' : 'No') :
                                        Array.isArray(value) ? value.join(', ') : value}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'reviews' && ReviewComponent}
            </div>
        </div>
    );
};

export default ProductTabs;
