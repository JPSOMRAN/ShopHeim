import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { FaHeart } from "react-icons/fa";

import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

import "../styles/TrendingProducts.css";

function TrendingProducts({ currentProduct }) {

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const {
    wishlistItems,
    addToWishlist,
  } = useWishlist();

  const [products, setProducts] = useState([]);

  useEffect(() => {

    if (!currentProduct) return;

    async function fetchProducts() {

      try {

        const { data } = await axios.get(
          `http://localhost:5000/api/products?gender=${currentProduct.gender}`
        );

        const filtered = data
          .filter(
            (item) =>
              item.category === currentProduct.category &&
              item._id !== currentProduct._id
          )
          .sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5))
          .slice(0, 12);

        setProducts(filtered);

      } catch (err) {

        console.log(err);

      }

    }

    fetchProducts();

  }, [currentProduct]);

  const handleCart = (item) => {

    addToCart(item);

    toast.success("Added To Cart 🛒");

  };

  const handleWishlist = (item) => {

    const exists = wishlistItems.find(
      (p) => p._id === item._id
    );

    if (exists) {

      toast.info("Already In Wishlist ❤️");

      return;

    }

    addToWishlist(item);

    toast.success("Added To Wishlist ❤️");

  };

  return (

    <section className="people-section">

      <h2>Trending In {currentProduct.category}</h2>

      <div className="people-grid">

        {products.map((item) => (

          <div
            key={item._id}
            className="people-card"
          >

            <button
              className="people-heart"
              onClick={() => handleWishlist(item)}
            >
              <FaHeart />
            </button>

            <img
              src={
                item.image.startsWith("http")
                  ? item.image
                  : `http://localhost:5000${item.image}`
              }
              alt={item.name}
              onClick={() => navigate(`/product/${item._id}`)}
            />

            <div className="people-content">

              <span>{item.category}</span>

              <h3>{item.name}</h3>

              <p>{item.brand}</p>

              <div className="people-rating">
                ⭐ {item.rating || 4.5}
              </div>

              <div className="people-price">
                ₹{item.price}
              </div>

              <div className="people-buttons">

                <button
                  onClick={() =>
                    navigate(`/product/${item._id}`)
                  }
                >
                  View Details
                </button>

                <button
                  onClick={() =>
                    handleCart(item)
                  }
                >
                  Add To Cart
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}

export default TrendingProducts;