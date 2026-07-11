import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(

  {

    // ==========================
    // User
    // ==========================

    user: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,

    },

    // ==========================
    // Ordered Products
    // ==========================

    products: [

      {

        product: {

          type: mongoose.Schema.Types.ObjectId,

          ref: "Product",

          required: true,

        },

        name: {

          type: String,

          required: true,

        },

        image: {

          type: String,

          required: true,

        },

        price: {

          type: Number,

          required: true,

        },

        quantity: {

          type: Number,

          required: true,

          default: 1,

        },

        size: {

          type: String,

          default: "M",

        },

      },

    ],

    // ==========================
    // Shipping
    // ==========================

    shippingAddress: {

      fullName: {

        type: String,

        required: true,

      },

      email: {

        type: String,

        required: true,

      },

      phone: {

        type: String,

        required: true,

      },

      address: {

        type: String,

        required: true,

      },

    },

    // ==========================
    // Payment
    // ==========================

    paymentMethod: {

      type: String,

      enum: [

        "Cash On Delivery",

        "Credit / Debit Card",

        "UPI",

      ],

      default: "Cash On Delivery",

    },

    // ==========================
    // Price Details
    // ==========================

    itemsPrice: {

      type: Number,

      required: true,

      default: 0,

    },

    shippingPrice: {

      type: Number,

      default: 99,

    },

    totalPrice: {

      type: Number,

      required: true,

    },

    // ==========================
    // Order Status
    // ==========================

    orderStatus: {

      type: String,

      enum: [

        "Pending",

        "Confirmed",

        "Packed",

        "Shipped",

        "Out For Delivery",

        "Delivered",

        "Cancelled",

      ],

      default: "Pending",

    },

    // ==========================
    // Payment Status
    // ==========================

    isPaid: {

      type: Boolean,

      default: false,

    },

    paidAt: Date,

    // ==========================
    // Delivery
    // ==========================

    deliveredAt: Date,

  },

  {

    timestamps: true,

  }

);

const Order = mongoose.model(

  "Order",

  orderSchema

);

export default Order;