import { useState, useEffect } from 'react';

export const useRecentlyViewed = () => {
    const [recentlyViewed, setRecentlyViewed] = useState(() => {
        const saved = localStorage.getItem('sairam_recently_viewed');
        return saved ? JSON.parse(saved) : [];
    });

    const addToRecentlyViewed = (product) => {
        setRecentlyViewed((prev) => {
            const filtered = prev.filter((item) => item.id !== product.id);
            const updated = [product, ...filtered].slice(0, 10);
            localStorage.setItem('sairam_recently_viewed', JSON.stringify(updated));
            return updated;
        });
    };

    return { recentlyViewed, addToRecentlyViewed };
};

