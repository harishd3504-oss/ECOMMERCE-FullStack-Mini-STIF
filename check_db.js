import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, 'backend', 'ecommerce_v2.db');
const db = new Database(dbPath);

console.log('Current Products in DB:');
const products = db.prepare('SELECT id, name FROM products').all();
console.log(JSON.stringify(products, null, 2));

console.log('\nsqlite_sequence:');
try {
    const seq = db.prepare('SELECT * FROM sqlite_sequence').all();
    console.log(JSON.stringify(seq, null, 2));
} catch (e) {
    console.log('No sqlite_sequence table');
}
