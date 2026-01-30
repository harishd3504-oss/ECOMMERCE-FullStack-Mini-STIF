const db = require('../models/db');

const startOrderSimulator = () => {
    console.log('✅ Order Simulator running (30s transitions)...');

    setInterval(() => {
        try {
            const now = new Date();
            const orders = db.prepare("SELECT * FROM orders WHERE status NOT IN ('Delivered', 'Cancelled')").all();

            orders.forEach(order => {
                const updatedAt = new Date(order.status_updated_at || order.created_at || now);
                const secondsElapsed = Math.floor((now - updatedAt) / 1000);

                if (isNaN(secondsElapsed)) return;

                let nextStatus = null;
                let comment = '';
                let trackingData = {};
                const threshold = 30;

                if (order.status === 'Placed' && secondsElapsed >= threshold) {
                    nextStatus = 'Processing';
                    comment = 'Auto-simulated: Order is being processed.';
                } else if (order.status === 'Processing' && secondsElapsed >= threshold) {
                    nextStatus = 'Shipped';
                    comment = 'Auto-simulated: Order has been shipped.';
                    trackingData = {
                        tracking_number: order.tracking_number || ('SIM-' + Math.random().toString(36).substr(2, 9).toUpperCase()),
                        carrier: order.carrier || 'Express Sim'
                    };
                } else if (order.status === 'Shipped' && secondsElapsed >= threshold) {
                    nextStatus = 'Delivered';
                    comment = 'Auto-simulated: Package delivered to customer.';
                }

                if (nextStatus) {
                    const statusDate = now.toISOString();
                    console.log(`[Simulator] Advancing Order ${order.public_id || order.id} from ${order.status} -> ${nextStatus}`);

                    db.transaction(() => {
                        if (nextStatus === 'Shipped') {
                            const estDate = new Date();
                            estDate.setDate(estDate.getDate() + 3);
                            db.prepare(`
                                UPDATE orders 
                                SET status = ?, status_updated_at = ?, estimated_delivery_at = ?, tracking_number = ?, carrier = ? 
                                WHERE id = ?
                            `).run(nextStatus, statusDate, estDate.toISOString(), trackingData.tracking_number, trackingData.carrier, order.id);
                        } else {
                            db.prepare('UPDATE orders SET status = ?, status_updated_at = ? WHERE id = ?')
                                .run(nextStatus, statusDate, order.id);
                        }

                        db.prepare(`
                            INSERT INTO order_history (order_id, status, timestamp, comment)
                            VALUES (?, ?, ?, ?)
                        `).run(order.id, nextStatus, statusDate, comment);
                    })();
                }
            });
        } catch (err) {
            console.error('[Simulator Error]:', err.message);
        }
    }, 5000);
};

module.exports = { startOrderSimulator };
