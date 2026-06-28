import express from "express";

import {

  getCart,

  addToCart,

  updateCart,

  deleteCart,

} from "../controllers/cartController.js";

const router = express.Router();

router.route("/")

  .get(getCart)

  .post(addToCart);

router.route("/:id")

  .put(updateCart)

  .delete(deleteCart);

export default router;