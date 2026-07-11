import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaTrash,
  FaShoppingCart,
} from "react-icons/fa";

import useWishlist from "../hooks/useWishlist";
import useCart from "../hooks/useCart";

import "../styles/Wishlist.css";

function Wishlist() {

  const navigate = useNavigate();

  const {
    wishlistItems,
    removeFromWishlist,
  } = useWishlist();

  const {
    addToCart,
  } = useCart();

  // ============================
  // OPEN PRODUCT DETAILS
  // ============================

  const openProduct = (item) => {

    if (!item?._id) {

      toast.error("Product Not Found");

      return;

    }

    navigate(`/product/${item._id}`);

  };

  // ============================
  // MOVE TO CART
  // ============================

  const handleMoveToCart = (item) => {

    addToCart(item);

    removeFromWishlist(item._id);

    toast.success("Moved To Cart 🛒");

  };

  // ============================
  // REMOVE
  // ============================

  const handleRemove = (_id) => {

    removeFromWishlist(_id);

    toast.success("Removed From Wishlist");

  };

  // ============================
  // EMPTY
  // ============================

  if (wishlistItems.length === 0) {

    return (

      <section className="wishlist-page">

        <div className="empty-wishlist">

          <h2>Your Wishlist Is Empty ❤️</h2>

          <p>

            Save your favourite products here.

          </p>

          <button

            className="wishlist-cart-btn"

            onClick={() => navigate("/")}

          >

            Continue Shopping

          </button>

        </div>

      </section>

    );

  }

  // ============================
  // PAGE
  // ============================

  return (

    <section className="wishlist-page">

      <h1>

        My Wishlist ❤️

      </h1>

      <div className="wishlist-grid">

        {

          wishlistItems.map((item) => {

            const image =

              item.image?.startsWith("http")

                ? item.image

                : `https://shopheim.onrender.com${item.image}`;

            return (

              <div

                key={item._id}

                className="wishlist-card"

              >

                {/* IMAGE */}

                <img

                  src={image}

                  alt={item.name}

                  className="wishlist-image"

                  onClick={() => openProduct(item)}

                />

                <div className="wishlist-info">

                  {/* BRAND */}

                  <p

                    className="wishlist-brand"

                    onClick={() => openProduct(item)}

                  >

                    {item.brand || item.category}

                  </p>

                  {/* NAME */}

                  <h3

                    className="wishlist-name"

                    onClick={() => openProduct(item)}

                  >

                    {item.name}

                  </h3>

                  {/* PRICE */}

                  <h2>

                    ₹{item.price}

                  </h2>

                  <div className="wishlist-buttons">

                    <button

                      className="wishlist-cart-btn"

                      onClick={() =>

                        handleMoveToCart(item)

                      }

                    >

                      <FaShoppingCart />

                      Move To Cart

                    </button>

                    <button

                      className="wishlist-remove-btn"

                      onClick={() =>

                        handleRemove(item._id)

                      }

                    >

                      <FaTrash />

                      Remove

                    </button>

                  </div>

                </div>

              </div>

            );

          })

        }

      </div>

    </section>

  );

}

export default Wishlist;