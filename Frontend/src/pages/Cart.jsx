import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaStar,
  FaHeart,
} from "react-icons/fa";

import "../styles/Cart.css";

import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

function Cart() {

  const navigate = useNavigate();

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const {
    addToWishlist,
  } = useWishlist();

  /* =========================================
      OPEN PRODUCT DETAILS
  ========================================= */

  const openProduct = (item) => {

    if (!item?._id) {

      toast.error("Product Not Found");

      return;

    }

    navigate(`/product/${item._id}`);

  };

  /* =========================================
      PRICE CALCULATION
  ========================================= */

  const subtotal = cartItems.reduce(

    (total, item) =>

      total + Number(item.price) * item.quantity,

    0

  );

  const deliveryCharge =

    subtotal >= 3000 ? 0 : 99;

  const discount =

    subtotal >= 5000 ? 500 : 0;

  const total =

    subtotal + deliveryCharge - discount;

  /* =========================================
      EVENTS
  ========================================= */

  const handleCheckout = () => {

    if (!cartItems.length) {

      toast.error("Your Cart Is Empty");

      return;

    }

    navigate("/checkout");

  };

  const handleRemove = (_id, size) => {

    removeFromCart(_id, size);

    toast.success("Removed From Cart");

  };

const handleWishlist = (item) => {

  addToWishlist(item);

  toast.success("Added To Wishlist ❤️");

};

  const handleClear = () => {

    clearCart();

    toast.success("Cart Cleared");

  };

  /* =========================================
      EMPTY CART
  ========================================= */

  if (cartItems.length === 0) {

    return (

      <section className="cart-page">

        <div className="empty-cart">

          <h2>Your Cart Is Empty 🛒</h2>

          <p>

            Looks like you haven't added anything yet.

          </p>

          <button

            className="checkout-btn"

            onClick={() => navigate("/")}

          >

            Continue Shopping

          </button>

        </div>

      </section>

    );

  }

  return (

    <section className="cart-page">

      <div className="cart-header">

        <div>

          <h1>Shopping Cart</h1>

          <p>

            {cartItems.length} Items In Your Cart

          </p>

        </div>

      </div>

      <div className="cart-container">

        <div className="cart-items">
          {cartItems.map((item) => {

  const image = item.image?.startsWith("http")
    ? item.image
    : `https://shopheim.onrender.com${item.image}`;

  const oldPrice = Math.round(item.price * 1.7);

  const discountPercent = Math.round(
    ((oldPrice - item.price) / oldPrice) * 100
  );

  return (

    <div
      key={`${item._id}-${item.size}`}
      className="cart-card"
    >

      {/* ======================
          PRODUCT IMAGE
      ====================== */}

      <div
        className="cart-image-box"
        onClick={() => openProduct(item)}
      >

        <img
          src={image}
          alt={item.name}
          className="cart-image"
        />

      </div>

      {/* ======================
          PRODUCT INFO
      ====================== */}

      <div className="cart-info">

        <p
          className="cart-brand"
          onClick={() => openProduct(item)}
        >
          {item.brand || item.category}
        </p>

        <h2
          className="cart-name"
          onClick={() => openProduct(item)}
        >
          {item.name}
        </h2>

        {/* Rating */}

        <div className="cart-rating">

          <span>
            {item.rating || 4.4}
          </span>

          <FaStar />

          <span>
            ({item.reviews || "1.2k"})
          </span>

        </div>

        {/* Price */}

        <div className="cart-price-row">

          <span className="cart-price">
            ₹{item.price}
          </span>

          <span className="cart-old-price">
            ₹{oldPrice}
          </span>

          <span className="cart-discount">
            {discountPercent}% OFF
          </span>

        </div>

        <p className="cart-size">

          Size : <strong>{item.size}</strong>

        </p>

        {/* ======================
            QUANTITY
        ====================== */}

        <div className="quantity-box">

          <button
            onClick={() =>
              decreaseQuantity(
                item._id,
                item.size
              )
            }
          >
            <FaMinus />
          </button>

          <span>

            {item.quantity}

          </span>

          <button
            onClick={() =>
              increaseQuantity(
                item._id,
                item.size
              )
            }
          >
            <FaPlus />
          </button>

        </div>
                {/* ======================
            ACTION BUTTONS
        ====================== */}

        <div className="cart-actions">

          <button
            className="wishlist-btn-cart"
            onClick={() => handleWishlist(item)}
          >

            <FaHeart />

            Wishlist

          </button>

          <button
            className="remove-btn"
            onClick={() =>
              handleRemove(
                item._id,
                item.size
              )
            }
          >

            <FaTrash />

            Remove

          </button>

        </div>

      </div>

    </div>

  );

})}

</div>

{/* ===========================
    ORDER SUMMARY
=========================== */}

<aside className="summary-box">

  <h2>

    Order Summary

  </h2>

  <div className="summary-row">

    <span>

      Subtotal

    </span>

    <span>

      ₹{subtotal}

    </span>

  </div>

  <div className="summary-row">

    <span>

      Delivery

    </span>

    <span>

      {

        deliveryCharge === 0

          ? "FREE"

          : `₹${deliveryCharge}`

      }

    </span>

  </div>

  <div className="summary-row">

    <span>

      Discount

    </span>

    <span>

      -₹{discount}

    </span>

  </div>

  <hr />

  <div className="summary-row total">

    <span>

      Total

    </span>

    <span>

      ₹{total}

    </span>

  </div>

  <button

    className="checkout-btn"

    onClick={handleCheckout}

  >

    Proceed To Checkout

  </button>

  <button

    className="clear-cart-btn"

    onClick={handleClear}

  >

    Clear Cart

  </button>

</aside>
      </div>

    </section>

  );

}

export default Cart;