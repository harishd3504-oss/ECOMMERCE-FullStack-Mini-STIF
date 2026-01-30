import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = React.useState(null);

    const faqs = [
        {
            question: 'Are all your products 100% organic?',
            answer: 'Yes, all our products are certified organic and sourced from trusted farmers who follow sustainable farming practices. We ensure no chemicals or pesticides are used in the production process.'
        },
        {
            question: 'What is your shipping policy?',
            answer: 'We offer free shipping on orders above ₹999. Orders are typically processed within 24 hours and delivered within 3-5 business days across India.'
        },
        {
            question: 'Do you have a return policy?',
            answer: 'Yes, we have a 15-day easy return policy. If you\'re not satisfied with your purchase, you can return it within 15 days for a full refund or exchange.'
        },
        {
            question: 'How can I track my order?',
            answer: 'Once your order is shipped, you will receive a tracking number via email and SMS. You can use this number to track your order on our website or the courier partner\'s website.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major payment methods including UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery (COD) for eligible orders.'
        },
        {
            question: 'Are your products tested for quality?',
            answer: 'Absolutely! All our products undergo rigorous quality testing and are certified by recognized organizations like ISO, FSSAI, and USDA Organic.'
        },
        {
            question: 'Can I cancel my order?',
            answer: 'Yes, you can cancel your order before it is shipped. Once shipped, you can use our return policy to send the product back.'
        },
        {
            question: 'Do you offer bulk discounts?',
            answer: 'Yes, we offer special discounts for bulk orders. Please contact our customer support team for more information on bulk pricing.'
        }
    ];

    return (
        <div className="container" style={{ padding: '4rem 1.5rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ maxWidth: '800px', margin: '0 auto' }}
            >
                <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', textAlign: 'center' }}>
                    Frequently Asked Questions
                </h1>
                <p style={{ fontSize: '1.125rem', color: 'var(--secondary)', textAlign: 'center', marginBottom: '3rem' }}>
                    Find answers to common questions about our products and services
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            style={{
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius)',
                                overflow: 'hidden',
                                background: 'var(--card)'
                            }}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                style={{
                                    width: '100%',
                                    padding: '1.5rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    textAlign: 'left'
                                }}
                            >
                                <span style={{ fontWeight: '600', fontSize: '1.05rem' }}>{faq.question}</span>
                                <ChevronDown
                                    size={20}
                                    style={{
                                        transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.3s'
                                    }}
                                />
                            </button>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    style={{
                                        padding: '0 1.5rem 1.5rem',
                                        color: 'var(--secondary)',
                                        lineHeight: 1.7
                                    }}
                                >
                                    {faq.answer}
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>

                <div style={{
                    marginTop: '4rem',
                    padding: '2rem',
                    background: 'var(--muted)',
                    borderRadius: 'var(--radius)',
                    textAlign: 'center'
                }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        Still have questions?
                    </h3>
                    <p style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }}>
                        Our customer support team is here to help
                    </p>
                    <a
                        href="https://wa.me/919092459913"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-block',
                            background: 'var(--primary)',
                            color: 'white',
                            padding: '1rem 2rem',
                            borderRadius: 'var(--radius)',
                            fontWeight: 'bold',
                            textDecoration: 'none'
                        }}
                    >
                        Contact Support
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default FAQ;
