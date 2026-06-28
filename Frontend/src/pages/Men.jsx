import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";

import "../styles/Men.css";

import { menProducts } from "../data/menProducts";

import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

function Men() {

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const {

    wishlistItems,

    addToWishlist,

  } = useWishlist();

  const [filter, setFilter] = useState("All");

  const filteredProducts =

    filter === "All"

      ? menProducts

      : menProducts.filter(

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

      <section className="men-page">

        <h1>

          MEN'S COLLECTION

        </h1>

        <p className="men-subtitle">

          Premium Fashion Collection For Men

        </p>

        <div className="filter-section">

          <label>

            Category

          </label>

          <select

            value={filter}

            onChange={(e)=>

              setFilter(e.target.value)

            }

          >

            <option value="All">All Products</option>
            <option value="Shirts">Shirts</option>
            <option value="Blazers">Blazers</option>
            <option value="Jeans">Jeans</option>
            <option value="Watches">Watches</option>
            <option value="T-Shirts">T-Shirts</option>
            <option value="Sneakers">Sneakers</option>
            <option value="Sports Shoes">Sports Shoes</option>
            <option value="Formal Shoes">Formal Shoes</option>
            <option value="Boots">High Ankle Boots</option>
            <option value="Cargo Pants">Cargo Pants</option>
            <option value="Denim Jackets">Denim Jackets</option>
            <option value="Sandals">Sandals</option>

          </select>

        </div>

        <div className="men-grid">

          {

            filteredProducts.map((item)=>(

              <div

                className="men-card"

                key={item.id}

              >

                <img

                  src={item.image}

                  alt={item.name}

                />

                <div className="men-info">

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

                      onClick={()=>

                        navigate(`/product/${item.id}`)

                      }

                    >

                      View Details

                    </button>

                    <button

                      className="buy-btn"

                      onClick={()=>

                        handleCart(item)

                      }

                    >

                      Add To Cart

                    </button>

                    <button

                      className="details-btn"

                      onClick={()=>

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

export default Men;