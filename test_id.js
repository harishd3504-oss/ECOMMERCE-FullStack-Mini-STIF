import http from 'http';

const testId = 1;
http.get(`http://localhost:5001/api/products/${testId}`, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log(`Status for product ${testId}:`, res.statusCode);
        console.log('Body:', body);
    });
}).on('error', (e) => {
    console.error(`Error: ${e.message}`);
});
