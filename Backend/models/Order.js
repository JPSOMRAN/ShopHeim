import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(

  {

    user: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,

    },

    products: [

      {

        product: {

          type: mongoose.Schema.Types.ObjectId,

          ref: "Product",

          required: true,

        },

        quantity: {

          type: Number,

          default: 1,

        },

        size: {

          type: String,

          default: "M",

        },

      },

    ],

    shippingAddress: {

      type: String,

      required: true,

    },

    paymentMethod: {

      type: String,

      default: "Cash On Delivery",

    },

    totalPrice: {

      type: Number,

      required: true,

    },

    orderStatus: {

      type: String,

      default: "Pending",

    },

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