import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

import API from "../services/api";

import "../styles/Search.css";

function Search() {

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const search = searchParams.get("query") || "";

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  // ==========================
  // Filter States
  // ==========================

  const [category, setCategory] = useState("All");

  const [brand, setBrand] = useState("All");

  const [sortBy, setSortBy] = useState("Newest");

  // ==========================
  // Load Products
  // ==========================

  useEffect(() => {

    async function fetchProducts() {

      try {

        setLoading(true);

        const { data } = await API.get(

          `/products?search=${encodeURIComponent(search)}`

        );

        setProducts(data);

      }

      catch (error) {

        console.log(error);

      }

      finally {

        setLoading(false);

      }

    }

    fetchProducts();

  }, [search]);

  // ==========================
  // Dynamic Categories
  // ==========================

  const categories = [

    "All",

    ...new Set(

      products

        .map((product) => product.category)

        .filter(Boolean)

    ),

  ];

  // ==========================
  // Dynamic Brands
  // ==========================

  const brands = [

    "All",

    ...new Set(

      products

        .map((product) => product.brand)

        .filter(Boolean)

    ),

  ];

  // ==========================
  // Filter Products
  // ==========================

  let filteredProducts = [...products];

  if (category !== "All") {

    filteredProducts = filteredProducts.filter(

      (product) => product.category === category

    );

  }

  if (brand !== "All") {

    filteredProducts = filteredProducts.filter(

      (product) => product.brand === brand

    );

  }

  // ==========================
  // Sorting
  // ==========================

  switch (sortBy) {

    case "Price Low":

      filteredProducts.sort(

        (a, b) => a.price - b.price

      );

      break;

    case "Price High":

      filteredProducts.sort(

        (a, b) => b.price - a.price

      );

      break;

    case "Name":

      filteredProducts.sort(

        (a, b) =>

          a.name.localeCompare(b.name)

      );

      break;

    default:

      break;

  }

 
    return (

  <section className="search-page">

    <div className="search-container">

      {/* ==========================
          Search Header
      ========================== */}

      <div className="search-result-header">

        <div>

          <h2>

            {search
              ? `Search Results for "${search}"`
              : "All Products"}

          </h2>

          <p>

            {filteredProducts.length} Product
            {filteredProducts.length !== 1
              ? "s"
              : ""}{" "}
            Found

          </p>

        </div>

      </div>

      {/* ==========================
          Filters
      ========================== */}

      <div className="search-toolbar">

        <div className="toolbar-left">

          {/* Category */}

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >

            {categories.map((item) => (

              <option
                key={item}
                value={item}
              >
                {item}
              </option>

            ))}

          </select>

          {/* Brand */}

          <select
            value={brand}
            onChange={(e) =>
              setBrand(e.target.value)
            }
          >

            {brands.map((item) => (

              <option
                key={item}
                value={item}
              >
                {item}
              </option>

            ))}

          </select>

        </div>

        {/* Sort */}

        <div className="toolbar-right">

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >

            <option value="Newest">

              Newest

            </option>

            <option value="Price Low">

              Price : Low to High

            </option>

            <option value="Price High">

              Price : High to Low

            </option>

            <option value="Name">

              Name (A-Z)

            </option>

          </select>

        </div>

      </div>

      {/* ==========================
          Loading
      ========================== */}

      {

        loading ?

        (

          <h2 className="loading-text">

            Loading Products...

          </h2>

        )

        :

        filteredProducts.length === 0 ?

        (

          <div className="empty-search">

            <h2>

              No Products Found 😕

            </h2>

            <p>

              Try searching with another keyword.

            </p>

            <div className="popular-searches">

              <button
                onClick={() =>
                  navigate("/search?query=shirts")
                }
              >

                Shirts

              </button>

              <button
                onClick={() =>
                  navigate("/search?query=shoes")
                }
              >

                Shoes

              </button>

              <button
                onClick={() =>
                  navigate("/search?query=nike")
                }
              >

                Nike

              </button>

              <button
                onClick={() =>
                  navigate("/search?query=jeans")
                }
              >

                Jeans

              </button>

            </div>

          </div>

        )

        :

        (

          <div className="search-grid">

            {filteredProducts.map((product) => (

              <div
                key={product._id}
                className="search-card"
              >

                <button
                  className="wishlist-btn"
                  onClick={(e) => {

                    e.stopPropagation();

                  }}
                >

                  <FaHeart />

                </button>

                <img
                  src={
                    product.image.startsWith("http")

                      ? product.image

                      : `http://localhost:5000${product.image}`
                  }
                  alt={product.name}
                  onClick={() =>
                    navigate(`/product/${product._id}`)
                  }
                />

                <div className="search-card-body">

                  <h3>

                    {product.name}

                  </h3>

                  <p>

                    {product.brand}

                  </p>

                  <h4>

                    ₹{product.price}

                  </h4>

                  <button
                    className="buy-btn"
                    onClick={() =>
                      navigate(`/product/${product._id}`)
                    }
                  >

                    View Product

                  </button>

                </div>

              </div>

            ))}

          </div>

        )

      }

    </div>

  </section>

);

}

export default Search;