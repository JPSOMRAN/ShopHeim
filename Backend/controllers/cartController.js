import Cart from "../models/Cart.js";

// Get Cart

export const getCart = async (req, res) => {

  try {

    const cart = await Cart.find()

      .populate("product")

      .populate("user", "name email");

    res.json(cart);

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};

// Add To Cart

export const addToCart = async (req, res) => {

  try {

    const cart = await Cart.create(req.body);

    res.status(201).json(cart);

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};

// Update Cart

export const updateCart = async (req, res) => {

  try {

    const cart = await Cart.findByIdAndUpdate(

      req.params.id,

      req.body,

      {

        new: true,

      }

    );

    res.json(cart);

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};

// Delete Cart Item

export const deleteCart = async (req, res) => {

  try {

    await Cart.findByIdAndDelete(

      req.params.id

    );

    res.json({

      message: "Cart Item Deleted",

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};