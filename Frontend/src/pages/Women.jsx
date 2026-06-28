import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";

import "../styles/Women.css";

import { womenProducts } from "../data/womenProducts";

import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

function Women() {

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const {

    wishlistItems,

    addToWishlist,

  } = useWishlist();

  const [filter, setFilter] = useState("All");

  const filteredProducts =

    filter === "All"

      ? womenProducts

      : womenProducts.filter(

          (item) => item.category === filter

        );

  const handleCart = (item) => {

    addToCart(item);

    toast.success("Added To Cart 🛒");

  };

  const handleWishlist = (item) => {

    const exists = wishlistItems.find(

      (product) => product.id === item.id

    );

    if (exists) {

      toast.info("Already In Wishlist ❤️");

      return;

    }

    addToWishlist(item);

    toast.success("Added To Wishlist ❤️");

  };

  return (

    <>

      <Navbar />

      <section className="women-page">

        <h1>

          WOMEN'S COLLECTION

        </h1>

        <p className="women-subtitle">

          Premium Fashion Collection For Women

        </p>

        <div className="filter-bar">

          <button onClick={() => setFilter("All")}>

            All Products

          </button>

          <button onClick={() => setFilter("Blazers")}>

            Blazers

          </button>

          <button onClick={() => setFilter("Tops")}>

            Tops

          </button>

          <button onClick={() => setFilter("T-Shirts")}>

            T-Shirts

          </button>

          <button onClick={() => setFilter("Jeans")}>

            Jeans

          </button>

          <button onClick={() => setFilter("Formal Pants")}>

            Formal Pants

          </button>

          <button onClick={() => setFilter("Denim Jackets")}>

            Denim Jackets

          </button>

        </div>

        <div className="women-grid">

          {

            filteredProducts.map((item) => (

              <div

                className="women-card"

                key={item.id}

              >

                <img

                  src={item.image}

                  alt={item.name}

                />

                <div className="women-info">

                  <span className="category-tag">

                    {item.category}

                  </span>

                  <h3>

                    {item.name}

                  </h3>

                  <p>

                    {item.price}

                  </p>

                  <div className="button-group">

                    <button

                      className="details-btn"

                      onClick={() =>

                        navigate(`/product/${item.id}`)

                      }

                    >

                      View Details

                    </button>

                    <button

                      className="buy-btn"

                      onClick={() =>

                        handleCart(item)

                      }

                    >

                      Add To Cart

                    </button>

                    <button

                      className="details-btn"

                      onClick={() =>

                        handleWishlist(item)

                      }

                    >

                      ❤️

                    </button>

                  </div>

                </div>

              </div>

            ))

          }

        </div>

      </section>

    </>

  );

}

export default Women;