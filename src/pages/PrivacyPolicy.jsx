import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
    return (
        <div className="container" style={{ padding: '4rem 1.5rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ maxWidth: '800px', margin: '0 auto' }}
            >
                <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>Privacy Policy</h1>
                <p style={{ color: 'var(--secondary)', marginBottom: '3rem' }}>Last updated: January 2026</p>

                <div style={{ lineHeight: 1.8, color: 'var(--secondary)' }}>
                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '1rem' }}>
                            1. Information We Collect
                        </h2>
                        <p>
                            We collect information you provide directly to us, including your name, email address, phone number,
                            shipping address, and payment information when you make a purchase or create an account.
                        </p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '1rem' }}>
                            2. How We Use Your Information
                        </h2>
                        <p>We use the information we collect to:</p>
                        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
                            <li>Process and fulfill your orders</li>
                            <li>Send you order confirmations and updates</li>
                            <li>Respond to your questions and provide customer support</li>
                            <li>Send you marketing communications (with your consent)</li>
                            <li>Improve our products and services</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '1rem' }}>
                            3. Information Sharing
                        </h2>
                        <p>
                            We do not sell or rent your personal information to third parties. We may share your information with
                            service providers who help us operate our business, such as payment processors and shipping companies.
                        </p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '1rem' }}>
                            4. Data Security
                        </h2>
                        <p>
                            We implement appropriate security measures to protect your personal information. All payment transactions
                            are encrypted using SSL technology.
                        </p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '1rem' }}>
                            5. Your Rights
                        </h2>
                        <p>You have the right to:</p>
                        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
                            <li>Access your personal information</li>
                            <li>Correct inaccurate information</li>
                            <li>Request deletion of your information</li>
                            <li>Opt-out of marketing communications</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '1rem' }}>
                            6. Contact Us
                        </h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at privacy@sairamstores.com
                        </p>
                    </section>
                </div>
            </motion.div>
        </div>
    );
};

export default PrivacyPolicy;
