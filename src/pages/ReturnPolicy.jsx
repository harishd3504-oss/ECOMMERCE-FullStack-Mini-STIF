import React from 'react';
import { motion } from 'framer-motion';

const ReturnPolicy = () => {
    return (
        <div className="container" style={{ padding: '4rem 1.5rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ maxWidth: '800px', margin: '0 auto' }}
            >
                <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>Return & Refund Policy</h1>
                <p style={{ color: 'var(--secondary)', marginBottom: '3rem' }}>Last updated: January 2026</p>

                <div style={{ lineHeight: 1.8, color: 'var(--secondary)' }}>
                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '1rem' }}>
                            15-Day Return Policy
                        </h2>
                        <p>
                            We want you to be completely satisfied with your purchase. If you're not happy with your order,
                            you can return it within 15 days of delivery for a full refund or exchange.
                        </p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '1rem' }}>
                            Eligibility for Returns
                        </h2>
                        <p>To be eligible for a return, your item must be:</p>
                        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
                            <li>Unused and in the same condition that you received it</li>
                            <li>In the original packaging</li>
                            <li>Accompanied by the receipt or proof of purchase</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '1rem' }}>
                            Non-Returnable Items
                        </h2>
                        <p>The following items cannot be returned:</p>
                        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
                            <li>Perishable goods (honey, oils with broken seals)</li>
                            <li>Personal care items that have been opened</li>
                            <li>Sale or clearance items</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '1rem' }}>
                            Return Process
                        </h2>
                        <ol style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
                            <li>Contact our customer support team to initiate a return</li>
                            <li>Pack the item securely in its original packaging</li>
                            <li>Ship the item to the address provided by our team</li>
                            <li>Once we receive and inspect the item, we'll process your refund</li>
                        </ol>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '1rem' }}>
                            Refunds
                        </h2>
                        <p>
                            Once your return is received and inspected, we will send you an email to notify you of the approval
                            or rejection of your refund. If approved, your refund will be processed within 7-10 business days
                            to your original payment method.
                        </p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '1rem' }}>
                            Exchanges
                        </h2>
                        <p>
                            We only replace items if they are defective or damaged. If you need to exchange an item,
                            please contact us at support@sairamstores.com
                        </p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '1rem' }}>
                            Shipping Costs
                        </h2>
                        <p>
                            Return shipping costs are the responsibility of the customer unless the item is defective or damaged.
                            We recommend using a trackable shipping service for returns.
                        </p>
                    </section>
                </div>
            </motion.div>
        </div>
    );
};

export default ReturnPolicy;
