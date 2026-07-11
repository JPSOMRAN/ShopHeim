import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

import relatedCategories from "../utils/relatedCategories";

import "../styles/PeopleAlsoLook.css";

function PeopleAlsoLook({ currentProduct }) {

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const {
    wishlistItems,
    addToWishlist,
  } = useWishlist();

  const [products, setProducts] = useState([]);

  useEffect(() => {

    if (!currentProduct) return;

    async function loadProducts() {

      try {

        const { data } = await axios.get(
          `http://localhost:5000/api/products?gender=${currentProduct.gender}`
        );

        const categories =
          relatedCategories[currentProduct.category] || [];

        const filtered = data
          .filter(product =>

            product._id !== currentProduct._id &&

            categories.includes(product.category)

          )
          .slice(0, 5);

        setProducts(filtered);

      }

      catch (error) {

        console.log(error);

      }

    }

    loadProducts();

  }, [currentProduct]);

  const handleCart = (product) => {

    addToCart(product);

    toast.success("Added To Cart 🛒");

  };

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

    <section className="people-look">

      <h2>People Also Look For</h2>

      <div className="people-grid">

        {

          products.length === 0

          ?

          <div className="no-related">

            No Products Found

          </div>

          :

          products.map(product => (

            <div
              key={product._id}
              className="people-card"
            >

              <button
                className="people-wishlist"
                onClick={() => handleWishlist(product)}
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

              <div className="people-content">

                <span className="people-category">

                  {product.category}

                </span>

                <h3>

                  {product.name}

                </h3>

                <p className="people-brand">

                  {product.brand}

                </p>

                <div className="people-rating">

                  ⭐ {product.rating || 4.5}

                </div>

                <div className="people-price">

                  ₹{product.price}

                </div>

                <div className="people-buttons">

                  <button

                    className="people-details-btn"

                    onClick={() =>
                      navigate(`/product/${product._id}`)
                    }

                  >

                    View Details

                  </button>

                  <button

                    className="people-cart-btn"

                    onClick={() => handleCart(product)}

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

export default PeopleAlsoLook;