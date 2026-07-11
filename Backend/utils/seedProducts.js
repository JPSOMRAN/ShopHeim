import dotenv from "dotenv";

import connectDB from "../config/db.js";

import Product from "../models/Product.js";

import products from "../data/products.js";

dotenv.config();

connectDB();

const seedProducts = async () => {

  try {

    // Delete Existing Products

    await Product.deleteMany();

    // Format Products

    const formattedProducts = products.map((item) => ({

      name: item.name,

      brand: item.brand || "ShopHeim",

      category: item.category,

      gender: item.gender || "Men",

      // Main Image

      image: item.image,

      // Gallery Images

      images: item.images || [item.image],

      description:
        item.description ||
        "Premium Fashion Product",

      price: Number(
        String(item.price).replace(/[^\d]/g, "")
      ),

      rating: Number(item.rating) || 4.5,

      stock: item.stock || 100,

    }));

    // Insert Products

    await Product.insertMany(
      formattedProducts
    );

    console.log(
      `✅ ${formattedProducts.length} Products Seeded Successfully`
    );

    process.exit();

  }

  catch (error) {

    console.log(error);

    process.exit(1);

  }

};

seedProducts();