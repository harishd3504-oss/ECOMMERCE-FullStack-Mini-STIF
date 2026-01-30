let db;
try {
    const Database = require('better-sqlite3');
    const path = require('path');
    const dbPath = path.resolve(__dirname, '../ecommerce_v2.db');
    db = new Database(dbPath);

    db.prepare(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            public_id TEXT UNIQUE,
            customer_name TEXT,
            customer_email TEXT,
            customer_address TEXT,
            customer_phone TEXT,
            items TEXT,
            total_amount REAL,
            status TEXT,
            created_at TEXT,
            status_updated_at TEXT,
            estimated_delivery_at TEXT,
            tracking_number TEXT,
            carrier TEXT
        )
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS order_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER,
            status TEXT,
            timestamp TEXT,
            comment TEXT,
            FOREIGN KEY(order_id) REFERENCES orders(id)
        )
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            oldPrice REAL,
            category TEXT,
            rating REAL,
            reviews INTEGER,
            stock INTEGER,
            image TEXT,
            images TEXT,
            description TEXT,
            specifications TEXT,
            customerReviews TEXT
        )
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'user'
        )
    `).run();

    try {
        const tableInfo = db.prepare("PRAGMA table_info(orders)").all();

        if (!tableInfo.some(col => col.name === 'public_id')) {
            db.prepare("ALTER TABLE orders ADD COLUMN public_id TEXT UNIQUE").run();
            const orders = db.prepare("SELECT id FROM orders WHERE public_id IS NULL").all();
            const update = db.prepare("UPDATE orders SET public_id = ? WHERE id = ?");
            orders.forEach(o => {
                const pid = 'ORD-' + Math.random().toString(36).substr(2, 6).toUpperCase();
                update.run(pid, o.id);
            });
        }

        if (!tableInfo.some(col => col.name === 'status_updated_at')) {
            db.prepare("ALTER TABLE orders ADD COLUMN status_updated_at TEXT").run();
            db.prepare("UPDATE orders SET status_updated_at = created_at WHERE status_updated_at IS NULL").run();
        }

        if (!tableInfo.some(col => col.name === 'estimated_delivery_at')) {
            db.prepare("ALTER TABLE orders ADD COLUMN estimated_delivery_at TEXT").run();
        }

        if (!tableInfo.some(col => col.name === 'tracking_number')) {
            db.prepare("ALTER TABLE orders ADD COLUMN tracking_number TEXT").run();
        }

        if (!tableInfo.some(col => col.name === 'carrier')) {
            db.prepare("ALTER TABLE orders ADD COLUMN carrier TEXT").run();
        }

    } catch (e) {
        console.error("Migration error:", e.message);
    }
} catch (error) {
    console.warn('SQLite failed, using mock:', error.message);
    const mockData = {
        orders: [],
        order_history: [],
        products: [
            {
                id: 1,
                name: "Pure Himalayan Honey",
                price: 499,
                oldPrice: 599,
                category: "Organic",
                rating: 5,
                reviews: 124,
                stock: 45,
                images: JSON.stringify(["/honey.jpg"]),
                image: "/honey.jpg",
                description: "Ethically sourced high-altitude honey. 100% natural and unprocessed.",
                specifications: JSON.stringify({
                    weight: "500g",
                    origin: "Himalayan Region",
                    organic: true
                }),
                customerReviews: JSON.stringify([])
            },
            {
                id: 2,
                name: "Herbal Green Tea",
                price: 299,
                category: "Beverages",
                rating: 4,
                reviews: 89,
                stock: 120,
                images: JSON.stringify(["/green-tea.jpg"]),
                image: "/green-tea.jpg",
                description: "Premium herbal blend for a refreshing experience.",
                specifications: JSON.stringify({
                    weight: "100g",
                    organic: true
                }),
                customerReviews: JSON.stringify([])
            },
            {
                id: 3,
                name: "Cold Pressed Coconut Oil",
                price: 750,
                oldPrice: 850,
                category: "Oils",
                rating: 5,
                reviews: 210,
                stock: 67,
                images: JSON.stringify(["/coconut-oil.webp"]),
                image: "/coconut-oil.webp",
                description: "Traditional cold-pressed extraction.",
                specifications: JSON.stringify({
                    volume: "500ml",
                    extraction: "Cold Pressed"
                }),
                customerReviews: JSON.stringify([])
            }
        ],
        users: []
    };
    db = {
        transaction: (fn) => (...args) => fn(...args),
        prepare: (sql) => ({
            run: (...args) => {
                if (sql.includes('INSERT INTO orders')) {
                    const newOrder = {
                        id: mockData.orders.length + 1,
                        public_id: args[0],
                        customer_name: args[1],
                        customer_email: args[2],
                        customer_address: args[3],
                        customer_phone: args[4],
                        items: args[5],
                        total_amount: args[6],
                        status: args[7],
                        created_at: args[8],
                        status_updated_at: args[9],
                        estimated_delivery_at: args[10],
                        tracking_number: args[11] || null,
                        carrier: args[12] || null
                    };
                    mockData.orders.push(newOrder);
                    return { lastInsertRowid: newOrder.id, changes: 1 };
                }
                if (sql.includes('INSERT INTO order_history')) {
                    mockData.order_history.push({
                        order_id: args[0],
                        status: args[1],
                        timestamp: args[2],
                        comment: args[3]
                    });
                    return { changes: 1 };
                }
                if (sql.includes('UPDATE orders SET')) {
                    const orderId = args[args.length - 1];
                    const order = mockData.orders.find(o => o.id == orderId || o.public_id == orderId);
                    if (order) {
                        if (sql.includes('status = ?')) {
                            order.status = args[0];
                            order.status_updated_at = args[1];
                        } else if (sql.includes('tracking_number = ?')) {
                            order.tracking_number = args[0];
                            order.carrier = args[1];
                            order.estimated_delivery_at = args[2];
                        }
                        return { changes: 1 };
                    }
                }
                if (sql.includes('INSERT INTO products')) {
                    const newProduct = {
                        id: mockData.products.length + 1,
                        name: args[0],
                        price: args[1],
                        oldPrice: args[2],
                        category: args[3],
                        rating: args[4],
                        reviews: args[5],
                        stock: args[6],
                        image: args[7],
                        images: args[8],
                        description: args[9],
                        specifications: args[10],
                        customerReviews: args[11] || '[]'
                    };
                    mockData.products.push(newProduct);
                    return { lastInsertRowid: newProduct.id, changes: 1 };
                }
                if (sql.includes('INSERT INTO users')) {
                    const newUser = {
                        id: mockData.users.length + 1,
                        name: args[0],
                        email: args[1],
                        password: args[2],
                        role: 'user'
                    };
                    mockData.users.push(newUser);
                    return { lastInsertRowid: newUser.id, changes: 1 };
                }
                return { lastInsertRowid: 0, changes: 1 };
            },
            get: (...args) => {
                if (sql.includes('FROM orders WHERE public_id = ?')) {
                    return mockData.orders.find(o => o.public_id == args[0]);
                }
                if (sql.includes('FROM orders WHERE id = ?')) {
                    return mockData.orders.find(o => o.id == args[0]);
                }
                if (sql.includes('COUNT(*) as count FROM products')) {
                    return { count: mockData.products.length };
                }
                if (sql.includes('FROM products WHERE id = ?')) {
                    return mockData.products.find(p => p.id == args[0]);
                }
                if (sql.includes('FROM users WHERE email = ?')) {
                    return mockData.users.find(u => u.email === args[0]);
                }
                return null;
            },
            all: (...args) => {
                if (sql.includes('FROM orders')) {
                    let result = [...mockData.orders];
                    if (sql.includes('WHERE status NOT IN')) {
                        result = result.filter(o => !['Delivered', 'Cancelled'].includes(o.status));
                    }
                    if (sql.includes('ORDER BY created_at DESC')) {
                        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    }
                    return result;
                }
                if (sql.includes('FROM order_history WHERE order_id = ?')) {
                    return mockData.order_history.filter(h => h.order_id == args[0]);
                }
                if (sql.includes('FROM products')) {
                    return [...mockData.products];
                }
                return [];
            }
        })
    };
}

module.exports = db;


