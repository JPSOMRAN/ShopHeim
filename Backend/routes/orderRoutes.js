import express from "express";

import {
  placeOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

// ==========================================
// Customer Routes
// ==========================================

// Place Order
router.post("/", protect, placeOrder);

// My Orders
router.get("/myorders", protect, getMyOrders);

// Single Order
router.get("/:id", protect, getOrderById);

// ==========================================
// Admin Routes
// ==========================================

// Get All Orders
router.get("/", protect, admin, getAllOrders);

// Update Order Status
router.put("/:id", protect, admin, updateOrderStatus);

// Delete Order
router.delete("/:id", protect, admin, deleteOrder);

export default router;