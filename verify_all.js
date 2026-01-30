import http from 'http';

http.get('http://localhost:5001/api/products', (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        const products = JSON.parse(body);
        console.log(`Found ${products.length} products.`);
        products.forEach(p => {
            http.get(`http://localhost:5001/api/products/${p.id}`, (r) => {
                let b = '';
                r.on('data', c => b += c);
                r.on('end', () => {
                    console.log(`Product ${p.id} (${p.name}) status: ${r.statusCode}`);
                });
            });
        });
    });
});
