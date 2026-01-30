import React, { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';

const ReviewSection = ({ reviews, rating, totalReviews }) => {
    const [sortBy, setSortBy] = useState('recent');

    const sortedReviews = [...reviews].sort((a, b) => {
        if (sortBy === 'recent') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'helpful') return b.helpful - a.helpful;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <div style={{ marginTop: '2rem' }}>
            {/* Rating Summary */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                padding: '2rem',
                background: 'var(--muted)',
                borderRadius: 'var(--radius)',
                marginBottom: '2rem'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)' }}>{rating}</div>
                    <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'center', marginTop: '0.5rem' }}>
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={20} fill={i < rating ? "#fbbf24" : "none"} stroke={i < rating ? "#fbbf24" : "#94a3b8"} />
                        ))}
                    </div>
                    <p style={{ color: 'var(--secondary)', fontSize: '0.875rem', marginTop: '0.5rem' }}>{totalReviews} reviews</p>
                </div>

                <div style={{ flex: 1 }}>
                    {[5, 4, 3, 2, 1].map((stars) => {
                        const count = reviews.filter(r => r.rating === stars).length;
                        const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                        return (
                            <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '0.875rem', width: '60px' }}>{stars} stars</span>
                                <div style={{ flex: 1, height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: `${percentage}%`, height: '100%', background: '#fbbf24', transition: 'width 0.3s' }} />
                                </div>
                                <span style={{ fontSize: '0.875rem', color: 'var(--secondary)', width: '40px' }}>{count}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Sort Options */}
            {reviews.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Customer Reviews</h3>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{
                            padding: '0.5rem 1rem',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius)',
                            background: 'var(--background)',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="recent">Most Recent</option>
                        <option value="helpful">Most Helpful</option>
                        <option value="rating">Highest Rating</option>
                    </select>
                </div>
            )}

            {/* Reviews List */}
            {reviews.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {sortedReviews.map((review) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                padding: '1.5rem',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius)',
                                background: 'var(--card)'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                        <span style={{ fontWeight: 'bold' }}>{review.userName}</span>
                                        {review.verified && (
                                            <span style={{
                                                background: '#dcfce7',
                                                color: '#166534',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '4px',
                                                fontSize: '0.75rem',
                                                fontWeight: '600'
                                            }}>
                                                ✓ Verified Purchase
                                            </span>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} fill={i < review.rating ? "#fbbf24" : "none"} stroke={i < review.rating ? "#fbbf24" : "#94a3b8"} />
                                        ))}
                                    </div>
                                </div>
                                <span style={{ fontSize: '0.875rem', color: 'var(--secondary)' }}>{formatDate(review.date)}</span>
                            </div>

                            <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>{review.comment}</p>

                            <button style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: 'var(--secondary)',
                                fontSize: '0.875rem',
                                padding: '0.5rem 0.75rem',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius)',
                                background: 'transparent'
                            }}>
                                <ThumbsUp size={14} />
                                Helpful ({review.helpful})
                            </button>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--secondary)' }}>
                    <p>No reviews yet. Be the first to review this product!</p>
                </div>
            )}
        </div>
    );
};

export default ReviewSection;
