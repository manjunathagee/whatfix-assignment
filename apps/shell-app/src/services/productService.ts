export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
  rating: number;
}

const dummyProducts: Product[] = [
  // Home
  {
    id: "home-1",
    name: "Modern Coffee Table",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    category: "home",
    description: "Elegant modern coffee table for your living room",
    inStock: true,
    rating: 4.6,
  },
  {
    id: "home-2",
    name: "Smart LED Bulb Set",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
    category: "home",
    description: "WiFi-enabled smart LED bulbs with voice control",
    inStock: true,
    rating: 4.4,
  },
  {
    id: "home-3",
    name: "Kitchen Blender",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400",
    category: "home",
    description: "High-performance kitchen blender for smoothies and soups",
    inStock: true,
    rating: 4.7,
  },
  {
    id: "home-4",
    name: "Garden Plant Pot Set",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
    category: "home",
    description: "Beautiful ceramic plant pots for indoor and outdoor plants",
    inStock: false,
    rating: 4.3,
  },
  {
    id: "home-5",
    name: "Wall Clock",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400",
    category: "home",
    description: "Minimalist wall clock with silent movement",
    inStock: true,
    rating: 4.5,
  },

  // Clothing
  {
    id: "clothing-1",
    name: "Cotton T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    category: "clothing",
    description: "Comfortable cotton t-shirt perfect for everyday wear",
    inStock: true,
    rating: 4.5,
  },
  {
    id: "clothing-2",
    name: "Denim Jeans",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
    category: "clothing",
    description: "Classic blue denim jeans with modern fit",
    inStock: true,
    rating: 4.2,
  },
  {
    id: "clothing-3",
    name: "Leather Jacket",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
    category: "clothing",
    description: "Premium leather jacket for style and warmth",
    inStock: false,
    rating: 4.8,
  },
  {
    id: "clothing-4",
    name: "Running Shoes",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    category: "clothing",
    description: "Lightweight running shoes for optimal performance",
    inStock: true,
    rating: 4.6,
  },
  {
    id: "clothing-5",
    name: "Wool Sweater",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
    category: "clothing",
    description: "Warm wool sweater for cold weather",
    inStock: true,
    rating: 4.3,
  },

  // Electronics
  {
    id: "electronics-1",
    name: "Wireless Headphones",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    category: "electronics",
    description: "High-quality wireless headphones with noise cancellation",
    inStock: true,
    rating: 4.7,
  },
  {
    id: "electronics-2",
    name: "Laptop Computer",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    category: "electronics",
    description: "Powerful laptop for work and entertainment",
    inStock: true,
    rating: 4.4,
  },
  {
    id: "electronics-3",
    name: "Smart Watch",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    category: "electronics",
    description: "Advanced smartwatch with health monitoring",
    inStock: true,
    rating: 4.5,
  },
  {
    id: "electronics-4",
    name: "Digital Camera",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
    category: "electronics",
    description: "Professional digital camera for photography",
    inStock: false,
    rating: 4.9,
  },
  {
    id: "electronics-5",
    name: "Tablet Device",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400",
    category: "electronics",
    description: "Versatile tablet for work and entertainment",
    inStock: true,
    rating: 4.3,
  },

  // Mobiles
  {
    id: "mobiles-1",
    name: "iPhone 15 Pro",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400",
    category: "mobiles",
    description: "Latest iPhone with advanced features",
    inStock: true,
    rating: 4.8,
  },
  {
    id: "mobiles-2",
    name: "Samsung Galaxy S24",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400",
    category: "mobiles",
    description: "Premium Android smartphone",
    inStock: true,
    rating: 4.6,
  },
  {
    id: "mobiles-3",
    name: "Google Pixel 8",
    price: 699.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    category: "mobiles",
    description: "Google smartphone with AI features",
    inStock: true,
    rating: 4.5,
  },
  {
    id: "mobiles-4",
    name: "Phone Case",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1601972599720-df8dbe93b9f9?w=400",
    category: "mobiles",
    description: "Protective phone case with style",
    inStock: true,
    rating: 4.2,
  },
  {
    id: "mobiles-5",
    name: "Wireless Charger",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1609592106529-b8b9c7b4a7b4?w=400",
    category: "mobiles",
    description: "Fast wireless charging pad",
    inStock: true,
    rating: 4.4,
  },

  // Books
  {
    id: "books-1",
    name: "The Great Gatsby",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    category: "books",
    description: "Classic American novel by F. Scott Fitzgerald",
    inStock: true,
    rating: 4.7,
  },
  {
    id: "books-2",
    name: "Programming Guide",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400",
    category: "books",
    description: "Complete guide to modern programming",
    inStock: true,
    rating: 4.5,
  },
  {
    id: "books-3",
    name: "Mystery Novel",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
    category: "books",
    description: "Thrilling mystery novel that keeps you guessing",
    inStock: true,
    rating: 4.3,
  },
  {
    id: "books-4",
    name: "Science Textbook",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    category: "books",
    description: "Comprehensive science textbook for students",
    inStock: false,
    rating: 4.6,
  },
  {
    id: "books-5",
    name: "Fiction Collection",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400",
    category: "books",
    description: "Collection of short fiction stories",
    inStock: true,
    rating: 4.4,
  },
];

export const getProductsByCategory = (category: string): Product[] => {
  return dummyProducts.filter((product) => product.category === category);
};

export const getAllProducts = (): Product[] => {
  return dummyProducts;
};

export const getProductById = (id: string): Product | undefined => {
  return dummyProducts.find((product) => product.id === id);
};

export const searchProducts = (query: string): Product[] => {
  return dummyProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
  );
};
