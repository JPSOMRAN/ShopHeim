import Order from "../models/Order.js";

// =========================
// Get All Orders
// =========================

export const getOrders = async (req, res) => {

  try {

    const orders = await Order.find()

      .populate("user", "name email")

      .populate("products.product");

    res.json(orders);

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};

// =========================
// Get Single Order
// =========================

export const getOrderById = async (req, res) => {

  try {

    const order = await Order.findById(

      req.params.id

    )

      .populate("user", "name email")

      .populate("products.product");

    if (!order) {

      return res.status(404).json({

        message: "Order Not Found",

      });

    }

    res.json(order);

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};

// =========================
// Place Order
// =========================

export const placeOrder = async (req, res) => {

  try {

    const order = await Order.create(

      req.body

    );

    res.status(201).json(order);

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};