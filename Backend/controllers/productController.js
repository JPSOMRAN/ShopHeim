import Product from "../models/Product.js";

// Get All Products

export const getProducts = async (req, res) => {

  try {

    const products = await Product.find();

    res.json(products);

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};

// Get Product By ID

export const getProductById = async (req, res) => {

  try {

    const product = await Product.findById(

      req.params.id

    );

    if (!product) {

      return res.status(404).json({

        message: "Product Not Found",

      });

    }

    res.json(product);

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};

// Create Product

export const createProduct = async (req, res) => {

  try {

    const product = await Product.create(

      req.body

    );

    res.status(201).json(product);

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};

// Update Product

export const updateProduct = async (req, res) => {

  try {

    const product = await Product.findByIdAndUpdate(

      req.params.id,

      req.body,

      {

        new: true,

      }

    );

    res.json(product);

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};

// Delete Product

export const deleteProduct = async (req, res) => {

  try {

    await Product.findByIdAndDelete(

      req.params.id

    );

    res.json({

      message: "Product Deleted",

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};