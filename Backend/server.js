import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/userRoutes.js";


dotenv.config();

connectDB();

const app = express();

// ====================================
// ES Module __dirname
// ====================================

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// ====================================
// Middlewares
// ====================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ====================================
// Static Product Images
// ====================================

app.use(
  "/products",
  express.static(
    path.join(
      __dirname,
      "../Frontend/src/assets/products"
    )
  )
);

// ====================================
// Uploaded Images
// ====================================

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

// ====================================
// Home Route
// ====================================

app.get("/", (req, res) => {

  res.status(200).json({

    success: true,

    message: "Welcome To ShopHeim Backend API 🚀",

  });

});

// ====================================
// API Routes
// ====================================

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/search", searchRoutes);


app.use("/api/cart", cartRoutes);

app.use("/api/wishlist", wishlistRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/users", userRoutes);

// ====================================
// Global Error Handler
// ====================================

app.use((err, req, res, next) => {

  console.error(err);

  res.status(500).json({

    success: false,

    message: err.message || "Internal Server Error",

  });

});

// ====================================
// Start Server
// ====================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`🚀 Server Running On Port ${PORT}`);

});