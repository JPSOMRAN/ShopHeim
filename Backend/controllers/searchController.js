import Product from "../models/Product.js";

// =======================================
// LIVE SEARCH SUGGESTIONS
// GET /api/search/suggestions?query=nike
// =======================================

export const getSearchSuggestions = async (req, res) => {

  try {

    const query = req.query.query?.trim();

    if (!query) {

      return res.status(200).json([]);

    }

    const products = await Product.find({

      $or: [

        {
          name: {
            $regex: query,
            $options: "i",
          },
        },

        {
          brand: {
            $regex: query,
            $options: "i",
          },
        },

        {
          category: {
            $regex: query,
            $options: "i",
          },
        },

      ],

    })

      .select("name brand category")

      .limit(8);

    const suggestions = [];

    products.forEach((product) => {

      suggestions.push({

        text: product.name,

        type: "Product",

      });

      suggestions.push({

        text: product.brand,

        type: "Brand",

      });

      suggestions.push({

        text: product.category,

        type: "Category",

      });

    });

    const uniqueSuggestions = [

      ...new Map(

        suggestions.map(item => [

          `${item.type}-${item.text}`,

          item,

        ])

      ).values(),

    ];

    res.status(200).json(

      uniqueSuggestions.slice(0,8)

    );

  }

  catch(error){

    res.status(500).json({

      success:false,

      message:error.message,

    });

  }

};