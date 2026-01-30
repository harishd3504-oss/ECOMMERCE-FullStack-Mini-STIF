const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const db = require('../models/db');

const generateId = () => {
    return 'ORD-' + crypto.randomBytes(4).toString('hex').toUpperCase();
};

router.get('/', (req, res) => {
    try {
        const orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
        const enrichedOrders = orders.map(order => ({
            ...order,
            items: JSON.parse(order.items),
        }));
        res.json(enrichedOrders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', (req, res) => {
    try {
        const { customer, items, totalAmount } = req.body;
        const publicId = generateId();

        const insertOrder = db.transaction(() => {
            const stmt = db.prepare(`
                INSERT INTO orders (public_id, customer_name, customer_email, customer_address, customer_phone, items, total_amount, status, created_at, status_updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);

            const date = new Date().toISOString();
            const info = stmt.run(
                publicId,
                customer.name,
                customer.email,
                customer.address,
                customer.phone || '',
                JSON.stringify(items),
                totalAmount,
                'Placed',
                date,
                date
            );

            const orderId = info.lastInsertRowid;

            db.prepare(`
                INSERT INTO order_history (order_id, status, timestamp, comment)
                VALUES (?, ?, ?, ?)
            `).run(orderId, 'Placed', new Date().toISOString(), 'Order placed successfully.');

            return { id: orderId, publicId };
        });

        const { id, publicId: newPublicId } = insertOrder();
        const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
        order.items = JSON.parse(order.items);

        res.status(201).json({
            message: 'Order placed successfully!',
            confirmation: `Confirmation sent to ${customer.email}`,
            order
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', (req, res) => {
    try {
        let order = db.prepare('SELECT * FROM orders WHERE public_id = ?').get(req.params.id);

        if (!order && !isNaN(req.params.id)) {
            order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
        }

        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.items = JSON.parse(order.items);
        order.history = db.prepare('SELECT * FROM order_history WHERE order_id = ?').all(order.id);

        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id/status', (req, res) => {
    try {
        const { status, comment, tracking_number, carrier } = req.body;
        const idParam = req.params.id;

        let order = db.prepare('SELECT id, public_id, customer_email FROM orders WHERE public_id = ?').get(idParam);
        if (!order && !isNaN(idParam)) {
            order = db.prepare('SELECT id, public_id, customer_email FROM orders WHERE id = ?').get(idParam);
        }

        if (!order) return res.status(404).json({ message: 'Order not found' });
        const internalId = order.id;

        const update = db.transaction(() => {
            const now = new Date().toISOString();
            let estimatedDelivery = null;

            if (status === 'Shipped') {
                const estDate = new Date();
                estDate.setDate(estDate.getDate() + 5);
                estimatedDelivery = estDate.toISOString();

                db.prepare('UPDATE orders SET status = ?, status_updated_at = ?, estimated_delivery_at = ?, tracking_number = ?, carrier = ? WHERE id = ?')
                    .run(status, now, estimatedDelivery, tracking_number || null, carrier || null, internalId);
            } else {
                db.prepare('UPDATE orders SET status = ?, status_updated_at = ? WHERE id = ?').run(status, now, internalId);
            }

            db.prepare(`
                INSERT INTO order_history (order_id, status, timestamp, comment)
                VALUES (?, ?, ?, ?)
            `).run(internalId, status, now, comment || `Status updated to ${status}`);

            return true;
        });

        update();

        const updatedOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(internalId);
        updatedOrder.items = JSON.parse(updatedOrder.items);
        updatedOrder.history = db.prepare('SELECT * FROM order_history WHERE order_id = ?').all(internalId);

        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id/shipping', (req, res) => {
    try {
        const { tracking_number, carrier, estimated_delivery_at } = req.body;
        const idParam = req.params.id;

        let order = db.prepare('SELECT id FROM orders WHERE public_id = ?').get(idParam);
        if (!order && !isNaN(idParam)) {
            order = db.prepare('SELECT id FROM orders WHERE id = ?').get(idParam);
        }

        if (!order) return res.status(404).json({ message: 'Order not found' });

        db.prepare('UPDATE orders SET tracking_number = ?, carrier = ?, estimated_delivery_at = ? WHERE id = ?')
            .run(tracking_number, carrier, estimated_delivery_at, order.id);

        const updatedOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(order.id);
        updatedOrder.items = JSON.parse(updatedOrder.items);
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
