import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { FaHeart } from "react-icons/fa";

import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

import "../styles/RelatedProducts.css";

function RelatedProducts({ currentProduct }) {

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const {
    wishlistItems,
    addToWishlist,
  } = useWishlist();

  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {

    if (!currentProduct) return;

    async function fetchRelatedProducts() {

      try {

        const { data } = await axios.get(
          `https://shopheim.onrender.com/api/products?gender=${currentProduct.gender}`
        );

  const filtered = data
.filter(product => {

    if(product._id === currentProduct._id)
        return false;

    return (

        product.gender === currentProduct.gender ||

        product.brand === currentProduct.brand ||

        product.category === currentProduct.category

    );

})
.slice(0,12);

        setRelatedProducts(filtered);

      } catch (error) {

        console.log(error);

      }

    }

    fetchRelatedProducts();

  }, [currentProduct]);

  // ==========================
  // Cart
  // ==========================

  const handleCart = (product) => {

    addToCart(product);

    toast.success("Added To Cart 🛒");

  };

  // ==========================
  // Wishlist
  // ==========================

  const handleWishlist = (product) => {

    const exists = wishlistItems.find(
      item => item._id === product._id
    );

    if (exists) {

      toast.info("Already In Wishlist ❤️");

      return;

    }

    addToWishlist(product);

    toast.success("Added To Wishlist ❤️");

  };

  return (

    <section className="related-products">

      <h2>You May Also Like</h2>

      <div className="related-grid">

        {
          relatedProducts.length === 0
          ?

          <div className="no-related">

            No Related Products Found

          </div>

          :

          relatedProducts.map((product)=>(

            <div
              key={product._id}
              className="related-card"
            >

              <button
                className="related-wishlist"
                onClick={()=>handleWishlist(product)}
              >
                <FaHeart/>
              </button>

              <img
                src={
                  product.image.startsWith("http")
                  ? product.image
                  : `https://shopheim.onrender.com${product.image}`
                }
                alt={product.name}
                onClick={()=>
                  navigate(`/product/${product._id}`)
                }
              />

              <div className="related-content">

                <span className="related-category">

                  {product.category}

                </span>

                <h3>

                  {product.name}

                </h3>

                <p className="related-brand">

                  {product.brand}

                </p>

                <div className="related-rating">

                  ⭐ {product.rating || 4.5}

                </div>

                <div className="related-price">

                  ₹{product.price}

                </div>

                <div className="related-buttons">

                  <button
                    className="related-details-btn"
                    onClick={()=>
                      navigate(`/product/${product._id}`)
                    }
                  >
                    View Details
                  </button>

                  <button
                    className="related-cart-btn"
                    onClick={()=>handleCart(product)}
                  >
                    Add To Cart
                  </button>

                </div>

              </div>

            </div>

          ))

        }

      </div>

    </section>

  );

}

export default RelatedProducts;