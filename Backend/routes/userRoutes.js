import express from "express";

import {
  getAllUsers,
  getUserById,
  deleteUser,
} from "../controllers/userController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

// =======================================
// Admin Routes
// =======================================

// Get All Users
router.get("/", protect, admin, getAllUsers);

// Get User By ID
router.get("/:id", protect, admin, getUserById);

// Delete User
router.delete("/:id", protect, admin, deleteUser);

export default router;