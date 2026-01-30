import React from 'react';
import { Shield, Lock, Eye } from 'lucide-react';

const TrustBadges = () => {
    const badges = [
        { icon: <Shield />, text: 'SSL Secured' },
        { icon: <Lock />, text: 'Safe Payment' },
        { icon: <Eye />, text: 'Privacy Protected' }
    ];

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            padding: '1.5rem',
            background: 'var(--muted)',
            borderRadius: 'var(--radius)',
            flexWrap: 'wrap'
        }}>
            {badges.map((badge, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)' }}>
                    <div style={{ color: 'var(--primary)' }}>
                        {React.cloneElement(badge.icon, { size: 20 })}
                    </div>
                    <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{badge.text}</span>
                </div>
            ))}
        </div>
    );
};

export default TrustBadges;
