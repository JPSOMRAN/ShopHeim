import Wishlist from "../models/Wishlist.js";

// ===========================
// Get Wishlist
// ===========================

export const getWishlist = async (req, res) => {

  try {

    const wishlist = await Wishlist.find()

      .populate("product")

      .populate("user", "name email");

    res.json(wishlist);

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};

// ===========================
// Add To Wishlist
// ===========================

export const addToWishlist = async (req, res) => {

  try {

    const wishlist = await Wishlist.create(

      req.body

    );

    res.status(201).json(wishlist);

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};

// ===========================
// Remove Wishlist Item
// ===========================

export const deleteWishlist = async (req, res) => {

  try {

    await Wishlist.findByIdAndDelete(

      req.params.id

    );

    res.json({

      message: "Wishlist Item Removed",

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};