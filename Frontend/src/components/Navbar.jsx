import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaRegUser,
  FaRegHeart,
  FaShoppingCart,
} from "react-icons/fa";

import "../styles/Navbar.css";

import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

function Navbar() {

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const { cartItems } = useCart();

  const { wishlistItems } = useWishlist();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const wishlistCount = wishlistItems.length;

  const handleSearch = () => {

    if (!searchTerm.trim()) return;

    navigate(
      `/search?query=${encodeURIComponent(searchTerm)}`
    );

    setSearchTerm("");

  };

  return (

    <nav className="navbar">

      {/* Logo */}

      <Link
        to="/"
        className="logo"
      >
        ShopHeim
      </Link>

      {/* Search */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Search Products..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          onKeyDown={(e) => {

            if (e.key === "Enter") {

              handleSearch();

            }

          }}
        />

        <button
          className="search-btn"
          onClick={handleSearch}
        >
          Search
        </button>

      </div>

      {/* Navigation */}

      <ul className="nav-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>

        <li>
          <Link to="/help">Help</Link>
        </li>

      </ul>

      {/* Icons */}

      <div className="nav-icons">

        <button
          className="icon-btn"
          onClick={() => navigate("/account")}
        >
          <FaRegUser />
        </button>

        <button
          className="icon-btn cart-icon"
          onClick={() => navigate("/wishlist")}
        >

          <FaRegHeart />

          {wishlistCount > 0 && (

            <span className="cart-badge">

              {wishlistCount}

            </span>

          )}

        </button>

        <button
          className="icon-btn cart-icon"
          onClick={() => navigate("/cart")}
        >

          <FaShoppingCart />

          {cartCount > 0 && (

            <span className="cart-badge">

              {cartCount}

            </span>

          )}

        </button>

      </div>

    </nav>

  );

}

export default Navbar;