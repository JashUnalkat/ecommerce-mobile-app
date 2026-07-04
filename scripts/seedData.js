// scripts/seedData.js

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

//  Your Firebase config (same as firebase.js)
const firebaseConfig = {
  apiKey: "AIzaSyCD5BSXwSFXmLT2W_GcUgM1GGfb_5zfDQw",
  authDomain: "ecommerce-project-a1a64.firebaseapp.com",
  projectId: "ecommerce-project-a1a64",
  storageBucket: "ecommerce-project-a1a64.appspot.com",
  messagingSenderId: "214656419138",
  appId: "1:214656419138:web:e37f9d70cb8ec08750f4db",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --------------------------------------
// SAMPLE PRODUCT DATA
// --------------------------------------
export const sampleProducts = [
  {
    name: "iPhone 15 Pro",
    description: "Flagship smartphone with A17 Pro chip and titanium design.",
    price: 1299,
    originalPrice: 1399,
    category: "electronics",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7rz9G0c07DaZT6k_mAYD6bgqazQlque4VeQ&s",
    images: [],
    rating: 4.8,
    reviewCount: 1247,
    features: ["A17 Pro chip", "ProMotion display", "USB-C"],
    inStock: true,
  },

  {
    name: "Gaming Laptop RTX 4070",
    description: "Powerful 15\" gaming laptop with RTX 4070 GPU.",
    price: 1899,
    originalPrice: 2099,
    category: "electronics",
    image:
      "https://i5.walmartimages.com/asr/155703c7-3cac-4bc9-b11d-774f703a98e3.112a297709d0cae6a8af786246be6043.png?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    images: [],
    rating: 4.6,
    reviewCount: 422,
    features: ["RTX 4070", "16GB RAM", "1TB SSD"],
    inStock: true,
  },

  {
    name: "Basketball Sneakers",
    description: "Lightweight running shoes for everyday training.",
    price: 129,
    originalPrice: 159,
    category: "shoes",
    image:
      "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_1521,c_limit/0abdb42b-3702-484d-8c07-6fc876cd16dd/what-are-the-best-nike-basketball-shoes.jpg",
    images: [],
    rating: 4.4,
    reviewCount: 310,
    features: ["Breathable mesh", "Soft foam midsole"],
    inStock: true,
  },

  {
    name: "Classic Leather Boots",
    description: "Premium leather boots for casual and formal wear.",
    price: 199,
    originalPrice: 219,
    category: "shoes",
    image:
      "https://cdn.shopify.com/s/files/1/0046/5548/0950/files/STEVEMADDEN-BOOTS_CHASE_TAN_SIDE.jpg?width=560&v=1743522251",
    images: [],
    rating: 4.7,
    reviewCount: 188,
    features: ["Real leather", "Anti-slip sole"],
    inStock: true,
  },

  {
    name: "Essential Hoodie",
    description: "Soft fleece hoodie with minimalist design.",
    price: 69,
    originalPrice: 89,
    category: "clothing",
    image:
      "https://5.imimg.com/data5/OB/DH/ZT/SELLER-49674373/rbvawvwxhsaak9wjaagppfjrhai722-500x500.jpg",
    images: [],
    rating: 4.5,
    reviewCount: 502,
    features: ["Cotton blend", "Kangaroo pocket"],
    inStock: true,
  },

  {
    name: "Jeans",
    description: "Stretch denim jeans with slim modern cut.",
    price: 79,
    originalPrice: 99,
    category: "clothing",
    image:
      "https://www.shutterstock.com/image-photo/hanging-blue-torn-jeans-back-600nw-2650684543.jpg",
    images: [],
    rating: 4.3,
    reviewCount: 271,
    features: ["Stretch denim", "Mid-rise"],
    inStock: true,
  },

  {
    name: "Smartwatch Pro",
    description: "Fitness tracking, notifications, and music on your wrist.",
    price: 249,
    originalPrice: 279,
    category: "accessories",
    image:
      "https://kidzwatches.com.au/cdn/shop/files/All-Green-SmartWatch-Pro-VZL54.jpg?v=1736963707&width=535",
    images: [],
    rating: 4.5,
    reviewCount: 712,
    features: ["Heart-rate monitor", "GPS", "Water resistant"],
    inStock: true,
  },

  {
    name: "Leather Wallet",
    description: "Minimalist leather wallet with RFID protection.",
    price: 49,
    originalPrice: 59,
    category: "accessories",
    image:
      "https://assets.wfcdn.com/im/08968070/resize-h400-w400%5Ecompr-r85/2162/216218186/Hudson+Valley+Tall+Mug+Set+Of+6.jpg",
    images: [],
    rating: 4.6,
    reviewCount: 143,
    features: ["RFID protection", "Slim design"],
    inStock: true,
  },

  {
    name: "Ceramic Mug Set (4)",
    description: "Modern ceramic mugs, dishwasher safe.",
    price: 39,
    originalPrice: 49,
    category: "home",
    image:
      "https://assets.wfcdn.com/im/08968070/resize-h400-w400%5Ecompr-r85/2162/216218186/Hudson+Valley+Tall+Mug+Set+Of+6.jpg",
    images: [],
    rating: 4.2,
    reviewCount: 96,
    features: ["Microwave safe", "Matte finish"],
    inStock: true,
  },

  {
    name: "Non-stick Frying Pan",
    description: "Durable non-stick pan for everyday cooking.",
    price: 59,
    originalPrice: 69,
    category: "home",
    image:
      "https://madeincookware.ca/cdn/shop/files/Web_NonStickFryingPan_12in_Graphite_009_1x1_HIRES.jpg?v=1727875305&width=493",
    images: [],
    rating: 4.4,
    reviewCount: 203,
    features: ["PFOA-free coating", "Ergonomic handle"],
    inStock: true,
  },
];

//function

export async function seedProducts() {
  const productsRef = collection(db, "products");

  for (const product of sampleProducts) {
    await addDoc(productsRef, {
      ...product,
      createdAt: new Date(),
    });
    console.log("Added:", product.name);
  }

  console.log("✔ DONE — All products added!");
}

seedProducts();
