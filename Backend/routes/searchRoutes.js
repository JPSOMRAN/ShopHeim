import express from "express";

import { getSearchSuggestions } from "../controllers/searchController.js";

const router = express.Router();

// =======================================
// LIVE SEARCH SUGGESTIONS
// GET /api/search/suggestions?query=nike
// =======================================

router.get(
  "/suggestions",
  getSearchSuggestions
);

export default router;