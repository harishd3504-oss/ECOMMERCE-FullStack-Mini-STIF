const API_BASE = 'http://localhost:5001/api';

export const api = {
    fetchProducts: async () => {
        const res = await fetch(`${API_BASE}/products`);
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
    },
    fetchProductById: async (id) => {
        const res = await fetch(`${API_BASE}/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        return res.json();
    },

    login: async (credentials) => {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Login failed');
        }
        return res.json();
    },
    register: async (userData) => {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Registration failed');
        }
        return res.json();
    },

    placeOrder: async (orderData) => {
        const res = await fetch(`${API_BASE}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        if (!res.ok) throw new Error('Failed to place order');
        return res.json();
    },
    fetchOrderById: async (id) => {
        const res = await fetch(`${API_BASE}/orders/${id}`);
        if (!res.ok) throw new Error('Order not found');
        return res.json();
    },
    updateOrderStatus: async (id, statusData) => {
        const res = await fetch(`${API_BASE}/orders/${id}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(statusData)
        });
        if (!res.ok) throw new Error('Failed to update status');
        return res.json();
    },
    updateOrderShipping: async (id, shippingData) => {
        const res = await fetch(`${API_BASE}/orders/${id}/shipping`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(shippingData)
        });
        if (!res.ok) throw new Error('Failed to update shipping');
        return res.json();
    },
    fetchAllOrders: async () => {
        const res = await fetch(`${API_BASE}/orders`);
        if (!res.ok) throw new Error('Failed to fetch orders');
        return res.json();
    }
};
