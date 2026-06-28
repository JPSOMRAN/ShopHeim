import dotenv from "dotenv";

import connectDB from "../config/db.js";

import Product from "../models/Product.js";

import products from "../data/products.js";

dotenv.config();

connectDB();

const seedProducts = async () => {

  try {

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log(

      "Products Seeded Successfully"

    );

    process.exit();

  }

  catch (error) {

    console.log(error);

    process.exit(1);

  }

};

seedProducts();