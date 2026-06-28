import express from "express";

import {

  getOrders,

  getOrderById,

  placeOrder,

} from "../controllers/orderController.js";

const router = express.Router();

router.route("/")

  .get(getOrders)

  .post(placeOrder);

router.route("/:id")

  .get(getOrderById);

export default router;