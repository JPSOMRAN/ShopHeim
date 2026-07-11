import Product from "../models/Product.js";

// =======================================
// Get All Products
// =======================================

export const getProducts = async (req, res) => {
  try {
    const { gender, category, brand, search } = req.query;

    let filter = {};

    if (gender) {
      filter.gender = {
        $regex: gender,
        $options: "i",
      };
    }

    if (category) {
      filter.category = {
        $regex: category,
        $options: "i",
      };
    }

    if (brand) {
      filter.brand = {
        $regex: brand,
        $options: "i",
      };
    }

    if (search) {
      const keywords = search
        .trim()
        .split(/\s+/)
        .filter(Boolean);

      filter.$and = keywords.map((word) => ({
        $or: [
          {
            name: {
              $regex: word,
              $options: "i",
            },
          },
          {
            brand: {
              $regex: word,
              $options: "i",
            },
          },
          {
            category: {
              $regex: word,
              $options: "i",
            },
          },
          {
            gender: {
              $regex: word,
              $options: "i",
            },
          },
          {
            description: {
              $regex: word,
              $options: "i",
            },
          },
        ],
      }));
    }

    const products = await Product.find(filter);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Get Product By ID
// =======================================

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Create Product
// =======================================

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Update Product
// =======================================

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Delete Product
// =======================================

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};