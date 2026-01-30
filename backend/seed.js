const http = require('http');

const products = [
    {
        name: "Pure Himalayan Honey",
        price: 499,
        oldPrice: 599,
        category: "Organic",
        rating: 5,
        reviews: 124,
        stock: 45,
        images: ["/honey.jpg"],
        image: "/honey.jpg",
        description: "Our Pure Himalayan Honey is ethically sourced from the high-altitude forests of the Himalayas. It is 100% natural, unprocessed, and packed with health benefits.",
        specifications: { weight: "500g", origin: "Himalayan Region", shelfLife: "24 months", organic: true, certifications: ["ISO 22000", "FSSAI"] }
    },
    {
        name: "Herbal Green Tea",
        price: 299,
        category: "Beverages",
        rating: 4,
        reviews: 89,
        stock: 120,
        images: ["/green-tea.jpg"],
        image: "/green-tea.jpg",
        description: "Revitalize your body with our premium Herbal Green Tea. Blended with natural herbs for a refreshing and detoxifying experience.",
        specifications: { weight: "100g (50 tea bags)", ingredients: "Green Tea, Tulsi, Ginger, Cardamom", caffeine: "Low", organic: true }
    },
    {
        name: "Cold Pressed Coconut Oil",
        price: 750,
        oldPrice: 850,
        category: "Oils",
        rating: 5,
        reviews: 210,
        stock: 67,
        images: ["/coconut-oil.webp"],
        image: "/coconut-oil.webp",
        description: "Extracted from the finest coconuts using traditional cold-pressing methods. Ideal for cooking, skin, and hair care.",
        specifications: { volume: "500ml", extraction: "Cold Pressed", purity: "100% Pure", uses: "Cooking, Hair Care, Skin Care" }
    },
    {
        name: "Handmade Saffron Soap",
        price: 150,
        category: "Skincare",
        rating: 4,
        reviews: 56,
        stock: 200,
        images: ["/saffron-soap.webp"],
        image: "/saffron-soap.webp",
        description: "Infused with real saffron and natural essential oils. This soap gently cleanses and brightens your skin.",
        specifications: { weight: "100g", ingredients: "Saffron, Sandalwood, Glycerin, Essential Oils", skinType: "All Skin Types", handmade: true }
    },
    {
        name: "Organic Turmeric Powder",
        price: 120,
        category: "Spices",
        rating: 5,
        reviews: 145,
        stock: 89,
        images: ["/turmeric.png", "https://images.unsplash.com/photo-1615485290382-441e4d019cb5?auto=format&fit=crop&q=80&w=800"],
        image: "/turmeric.png",
        description: "High-curcumin turmeric powder sourced directly from organic farms. No additives or artificial colors.",
        specifications: { weight: "200g", curcumin: "High (5-7%)", origin: "Organic Farms, India", organic: true, certifications: ["USDA Organic", "India Organic"] }
    },
    {
        name: "Aloe Vera Gel",
        price: 249,
        category: "Skincare",
        rating: 5,
        reviews: 78,
        stock: 156,
        images: ["/aloe-vera.webp"],
        image: "/aloe-vera.webp",
        description: "Pure and soothing Aloe Vera Gel for multipurpose use. Perfect for hydrating skin and hair.",
        specifications: { volume: "200ml", purity: "99% Pure Aloe Vera", preservatives: "Paraben-Free", uses: "Skin, Hair, Sunburn Relief" }
    }
];

const postData = JSON.stringify(products);

const options = {
    hostname: 'localhost',
    port: 5001,
    path: '/api/products/seed',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
    }
};

const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log('Seeding result:', body);
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.write(postData);
req.end();
