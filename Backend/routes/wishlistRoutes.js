import express from "express";

import {

  getWishlist,

  addToWishlist,

  deleteWishlist,

} from "../controllers/wishlistController.js";

const router = express.Router();

router.route("/")

  .get(getWishlist)

  .post(addToWishlist);

router.route("/:id")

  .delete(deleteWishlist);

export default router;