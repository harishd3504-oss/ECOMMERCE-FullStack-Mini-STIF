import http from 'http';

http.get('http://localhost:5001/api/products', (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        const products = JSON.parse(body);
        console.log('Product IDs and Names:');
        products.forEach(p => console.log(`${p.id}: ${p.name}`));
    });
}).on('error', (e) => {
    console.error(`Error: ${e.message}`);
});
