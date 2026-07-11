import Order from "../models/Order.js";

// =======================================
// Place Order
// =======================================

export const placeOrder = async (req, res) => {

  try {

    const {

      products,

      shippingAddress,

      paymentMethod,

      itemsPrice,

      shippingPrice,

      totalPrice,

    } = req.body;

    if (!products || products.length === 0) {

      return res.status(400).json({

        success: false,

        message: "No products found in order.",

      });

    }

    const order = await Order.create({

      user: req.user._id,

      products,

      shippingAddress,

      paymentMethod,

      itemsPrice,

      shippingPrice,

      totalPrice,

    });

    res.status(201).json({

      success: true,

      message: "Order Placed Successfully",

      order,

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// =======================================
// Get Logged In User Orders
// =======================================

export const getMyOrders = async (req, res) => {

  try {

    const orders = await Order.find({

      user: req.user._id,

    }).sort({

      createdAt: -1,

    });

    res.status(200).json({

      success: true,

      orders,

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// =======================================
// Get Order By ID
// =======================================

export const getOrderById = async (req, res) => {

  try {

    const order = await Order.findOne({

      _id: req.params.id,

      user: req.user._id,

    })

      .populate(

        "user",

        "name email"

      )

      .populate(

        "products.product"

      );

    if (!order) {

      return res.status(404).json({

        success: false,

        message: "Order Not Found",

      });

    }

    res.status(200).json({

      success: true,

      order,

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// =======================================
// Get All Orders (Admin)
// =======================================

export const getAllOrders = async (req, res) => {

  try {

    const orders = await Order.find()

      .populate(

        "user",

        "name email"

      )

      .populate(

        "products.product",

        "name image"

      )

      .sort({

        createdAt: -1,

      });

    res.status(200).json({

      success: true,

      orders,

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// =======================================
// Update Order Status (Admin)
// =======================================

export const updateOrderStatus = async (req, res) => {

  try {

    const order = await Order.findById(

      req.params.id

    );

    if (!order) {

      return res.status(404).json({

        success: false,

        message: "Order Not Found",

      });

    }

    order.orderStatus =

      req.body.orderStatus ||

      order.orderStatus;

    if (

      req.body.orderStatus ===

      "Delivered"

    ) {

      order.deliveredAt = new Date();

    }

    await order.save();

    res.status(200).json({

      success: true,

      message: "Order Updated Successfully",

      order,

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// =======================================
// Delete Order (Admin)
// =======================================

export const deleteOrder = async (req, res) => {

  try {

    const order = await Order.findById(

      req.params.id

    );

    if (!order) {

      return res.status(404).json({

        success: false,

        message: "Order Not Found",

      });

    }

    await order.deleteOne();

    res.status(200).json({

      success: true,

      message: "Order Deleted Successfully",

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};