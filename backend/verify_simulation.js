async function verifyFullSimulation() {
    const API_BASE = 'http://localhost:5001/api';

    async function getOrder(publicId) {
        const res = await fetch(`${API_BASE}/orders/${publicId}`);
        return await res.json();
    }

    async function seedOrder() {
        const orderData = {
            customer: {
                name: "Simulator Test",
                email: "test@example.com",
                address: "123 Simulation St",
                phone: "9876543210"
            },
            items: [{ id: 1, name: "Pure Himalayan Honey", price: 499, quantity: 1 }],
            totalAmount: 499
        };

        console.log('📦 Placing a test order...');
        const res = await fetch(`${API_BASE}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        const data = await res.json();
        console.log('✅ Order placed:', data.order.public_id);
        return data.order.public_id;
    }

    const pid = await seedOrder();

    // Status Flow: Placed -> Processing -> Shipped -> Delivered
    const stages = [
        { status: 'Processing', wait: 45000 },
        { status: 'Shipped', wait: 45000 },
        { status: 'Delivered', wait: 45000 }
    ];

    for (const stage of stages) {
        console.log(`\n⏳ Waiting ${stage.wait / 1000}s for transition to: ${stage.status}...`);
        await new Promise(r => setTimeout(r, stage.wait));

        const order = await getOrder(pid);
        console.log(`🔍 Current Status: ${order.status}`);

        if (order.status === stage.status) {
            console.log(`✅ Success: reached ${stage.status}`);
            if (stage.status === 'Shipped') {
                console.log(`   Tracking: ${order.tracking_number} (${order.carrier})`);
                if (!order.tracking_number) console.log('   ❌ Error: Tracking number missing in Shipped status!');
            }
        } else {
            console.log(`❌ Failure:Expected ${stage.status}, but got ${order.status}`);
        }
    }

    console.log('\n--- Simulation Test Complete ---');
}

verifyFullSimulation();
