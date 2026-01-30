const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', (req, res) => {
    try {
        const products = db.prepare('SELECT * FROM products').all();
        const enrichedProducts = products.map(p => ({
            ...p,
            images: JSON.parse(p.images || '[]'),
            specifications: JSON.parse(p.specifications || '{}'),
            customerReviews: JSON.parse(p.customerReviews || '[]')
        }));
        res.json(enrichedProducts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', (req, res) => {
    try {
        const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        product.images = JSON.parse(product.images || '[]');
        product.specifications = JSON.parse(product.specifications || '{}');
        product.customerReviews = JSON.parse(product.customerReviews || '[]');

        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/seed', (req, res) => {
    try {
        const count = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
        if (count > 0) return res.json({ message: 'Products already seeded' });

        const products = req.body;
        const insert = db.prepare(`
            INSERT INTO products (name, price, oldPrice, category, rating, reviews, stock, image, images, description, specifications, customerReviews)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const insertMany = db.transaction((items) => {
            for (const p of items) {
                insert.run(
                    p.name,
                    p.price,
                    p.oldPrice || null,
                    p.category,
                    p.rating,
                    p.reviews,
                    p.stock,
                    p.image,
                    JSON.stringify(p.images),
                    p.description,
                    JSON.stringify(p.specifications),
                    JSON.stringify(p.customerReviews || [])
                );
            }
        });

        insertMany(products);
        res.status(201).json({ message: 'Products seeded successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/force-seed', (req, res) => {
    try {
        db.prepare('DELETE FROM products').run();

        const products = req.body;
        const insert = db.prepare(`
            INSERT INTO products (name, price, oldPrice, category, rating, reviews, stock, image, images, description, specifications, customerReviews)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const insertMany = db.transaction((items) => {
            for (const p of items) {
                insert.run(
                    p.name,
                    p.price,
                    p.oldPrice || null,
                    p.category,
                    p.rating,
                    p.reviews,
                    p.stock,
                    p.image,
                    JSON.stringify(p.images),
                    p.description,
                    JSON.stringify(p.specifications),
                    JSON.stringify(p.customerReviews || [])
                );
            }
        });

        insertMany(products);
        res.status(201).json({ message: 'Products force-seeded successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

