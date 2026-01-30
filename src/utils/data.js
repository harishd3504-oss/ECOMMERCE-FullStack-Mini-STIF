export const products = [
    {
        id: 1,
        name: "Pure Himalayan Honey",
        price: 499,
        oldPrice: 599,
        category: "Organic",
        rating: 5,
        reviews: 124,
        stock: 45,
        images: [
            "/honey.jpg"
        ],
        image: "/honey.jpg",
        description: "Our Pure Himalayan Honey is ethically sourced from the high-altitude forests of the Himalayas. It is 100% natural, unprocessed, and packed with health benefits.",
        specifications: {
            weight: "500g",
            origin: "Himalayan Region",
            shelfLife: "24 months",
            organic: true,
            certifications: ["ISO 22000", "FSSAI"]
        },
        customerReviews: [
            {
                id: 1,
                userName: "Priya Sharma",
                rating: 5,
                date: "2025-12-15",
                verified: true,
                comment: "Absolutely pure and delicious! The quality is exceptional. Worth every penny.",
                helpful: 23
            },
            {
                id: 2,
                userName: "Rajesh Kumar",
                rating: 5,
                date: "2025-12-10",
                verified: true,
                comment: "Best honey I've ever tasted. Natural sweetness and great for health.",
                helpful: 18
            }
        ]
    },
    {
        id: 2,
        name: "Herbal Green Tea",
        price: 299,
        category: "Beverages",
        rating: 4,
        reviews: 89,
        stock: 120,
        images: [
            "/green-tea.jpg"
        ],
        image: "/green-tea.jpg",
        description: "Revitalize your body with our premium Herbal Green Tea. Blended with natural herbs for a refreshing and detoxifying experience.",
        specifications: {
            weight: "100g (50 tea bags)",
            ingredients: "Green Tea, Tulsi, Ginger, Cardamom",
            caffeine: "Low",
            organic: true
        },
        customerReviews: [
            {
                id: 1,
                userName: "Anita Desai",
                rating: 4,
                date: "2025-12-20",
                verified: true,
                comment: "Great taste and very refreshing. Perfect for morning routine.",
                helpful: 12
            }
        ]
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
        images: [
            "/coconut-oil.webp"
        ],
        image: "/coconut-oil.webp",
        description: "Extracted from the finest coconuts using traditional cold-pressing methods. Ideal for cooking, skin, and hair care.",
        specifications: {
            volume: "500ml",
            extraction: "Cold Pressed",
            purity: "100% Pure",
            uses: "Cooking, Hair Care, Skin Care"
        },
        customerReviews: [
            {
                id: 1,
                userName: "Meera Patel",
                rating: 5,
                date: "2025-12-18",
                verified: true,
                comment: "Excellent quality! My hair has never been better. Highly recommend!",
                helpful: 34
            }
        ]
    },
    {
        id: 4,
        name: "Handmade Saffron Soap",
        price: 150,
        category: "Skincare",
        rating: 4,
        reviews: 56,
        stock: 200,
        images: [
            "/saffron-soap.webp"
        ],
        image: "/saffron-soap.webp",
        description: "Infused with real saffron and natural essential oils. This soap gently cleanses and brightens your skin.",
        specifications: {
            weight: "100g",
            ingredients: "Saffron, Sandalwood, Glycerin, Essential Oils",
            skinType: "All Skin Types",
            handmade: true
        },
        customerReviews: []
    },
    {
        id: 5,
        name: "Organic Turmeric Powder",
        price: 120,
        category: "Spices",
        rating: 5,
        reviews: 145,
        stock: 89,
        images: [
            "/turmeric.png",
            "https://images.unsplash.com/photo-1615485290382-441e4d019cb5?auto=format&fit=crop&q=80&w=800"
        ],
        image: "/turmeric.png",
        description: "High-curcumin turmeric powder sourced directly from organic farms. No additives or artificial colors.",
        specifications: {
            weight: "200g",
            curcumin: "High (5-7%)",
            origin: "Organic Farms, India",
            organic: true,
            certifications: ["USDA Organic", "India Organic"]
        },
        customerReviews: [
            {
                id: 1,
                userName: "Suresh Reddy",
                rating: 5,
                date: "2025-12-22",
                verified: true,
                comment: "Pure and vibrant color. Perfect for cooking and health remedies.",
                helpful: 28
            }
        ]
    },
    {
        id: 6,
        name: "Aloe Vera Gel",
        price: 249,
        category: "Skincare",
        rating: 5,
        reviews: 78,
        stock: 156,
        images: [
            "/aloe-vera.webp"
        ],
        image: "/aloe-vera.webp",
        description: "Pure and soothing Aloe Vera Gel for multipurpose use. Perfect for hydrating skin and hair.",
        specifications: {
            volume: "200ml",
            purity: "99% Pure Aloe Vera",
            preservatives: "Paraben-Free",
            uses: "Skin, Hair, Sunburn Relief"
        },
        customerReviews: [
            {
                id: 1,
                userName: "Kavita Singh",
                rating: 5,
                date: "2025-12-19",
                verified: true,
                comment: "Very soothing and cooling. Great for summer!",
                helpful: 15
            }
        ]
    }
];
