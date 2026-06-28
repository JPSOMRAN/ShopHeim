import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config();

connectDB();

const app = express();

// ===========================
// Middlewares
// ===========================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ===========================
// Home Route
// ===========================

app.get("/", (req, res) => {

  res.json({

    success: true,

    message: "Welcome To ShopHeim Backend API 🚀",

  });

});

// ===========================
// API Routes
// ===========================

app.use(

  "/api/auth",

  authRoutes

);

app.use(

  "/api/products",

  productRoutes

);

app.use(

  "/api/cart",

  cartRoutes

);
app.use(

  "/api/wishlist",

  wishlistRoutes

);

app.use(

  "/api/orders",

  orderRoutes

);
// ===========================
// Server
// ===========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(

    `Server Running On Port ${PORT}`

  );

});