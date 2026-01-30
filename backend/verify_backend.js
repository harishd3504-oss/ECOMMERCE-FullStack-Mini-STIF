const http = require('http');

const makeRequest = (options, data) => {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, body: JSON.parse(body) }));
        });

        req.on('error', (e) => reject(e));

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
};

async function runTests() {
    console.log('--- Starting Verification ---');

    console.log('1. Testing Order Placement...');
    const orderData = {
        customer: { name: 'Test User', email: 'test@example.com', address: '123 St', phone: '555-0100' },
        items: [{ productId: 'prod_1', price: 100, quantity: 2 }],
        totalAmount: 200
    };

    try {
        const placeRes = await makeRequest({
            hostname: 'localhost',
            port: 5001,
            path: '/api/orders',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, orderData);

        console.log('Status Code:', placeRes.statusCode);
        console.log('Confirmation:', placeRes.body.confirmation);

        if (placeRes.statusCode !== 201) throw new Error('Failed to place order');
        const orderId = placeRes.body.order.id || placeRes.body.order._id;
        console.log('Order ID:', orderId);

        console.log('\n2. Testing Order Tracking (Initial Status)...');
        const getRes = await makeRequest({
            hostname: 'localhost',
            port: 5001,
            path: `/api/orders/${orderId}`,
            method: 'GET'
        });
        console.log('Current Status:', getRes.body.status);
        console.log('History Length:', getRes.body.history.length);

        console.log('\n3. Testing Status Update (to Delivered)...');
        const updateRes = await makeRequest({
            hostname: 'localhost',
            port: 5001,
            path: `/api/orders/${orderId}/status`,
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        }, { status: 'Delivered', comment: 'Package delivered at front door.' });
        console.log('New Status:', updateRes.body.status);

        console.log('\n4. Verifying Final History...');
        const finalRes = await makeRequest({
            hostname: 'localhost',
            port: 5001,
            path: `/api/orders/${orderId}`,
            method: 'GET'
        });
        console.log('Final History:', JSON.stringify(finalRes.body.history, null, 2));

        console.log('\n--- Verification Completed Successfully ---');
    } catch (err) {
        console.error('Verification Failed:', err);
    }
}

// Check if server is running first, retry a few times if needed in real scenario, 
// but here we just assume the user/process started it.
// To run this standalone, we might want to delay a bit if we just started the server.
setTimeout(runTests, 2000);
