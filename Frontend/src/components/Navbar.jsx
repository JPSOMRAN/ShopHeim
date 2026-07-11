import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaRegUser,
  FaRegHeart,
  FaShoppingCart,
  FaSearch,
} from "react-icons/fa";

import logo from "../assets/logosh.png";

import "../styles/Navbar.css";

import API from "../services/api";

import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

function Navbar() {
  const navigate = useNavigate();

  // ==========================
  // STATES
  // ==========================

  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] =
    useState(false);

  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const wishlistCount = wishlistItems.length;

  // ==========================
  // LIVE SEARCH
  // ==========================

  useEffect(() => {
    const delay = setTimeout(async () => {
      const keyword = searchTerm.trim();

      if (keyword.length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      try {
        const { data } = await API.get(
          `/search/suggestions?query=${encodeURIComponent(
            keyword
          )}`
        );

        setSuggestions(data);
        setShowSuggestions(data.length > 0);
      } catch (error) {
        console.log(error);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  // ==========================
  // SEARCH
  // ==========================

  const handleSearch = () => {
    const keyword = searchTerm.trim();

    if (!keyword) {
      navigate("/products");
    } else {
      navigate(
        `/products?search=${encodeURIComponent(
          keyword
        )}`
      );
    }

    setSuggestions([]);
    setShowSuggestions(false);
    setMenuOpen(false);
  };

  // ==========================
  // ACCOUNT
  // ==========================

  const handleAccount = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/account");
    } else {
      navigate("/login");
    }

    setMenuOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setShowSuggestions(false);
  };

  return (
    <div className="navbar-wrapper">

      <header className="navbar">
                {/* ================= Logo ================= */}
<Link
  to="/"
  className="logo"
  onClick={closeMenu}
>
  <div className="logo-holder">

    <img
      src={logo}
      alt="ShopHeim Logo"
      className="logo-img"
    />

  </div>

  <span className="logo-text">
    ShopHeim
  </span>
</Link>

        {/* ================= Desktop Navigation ================= */}

        <ul className="nav-links">

          <li>
            <Link
              to="/"
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/products?gender=Men"
              onClick={closeMenu}
            >
              Men
            </Link>
          </li>

          <li>
            <Link
              to="/products?gender=Women"
              onClick={closeMenu}
            >
              Women
            </Link>
          </li>

          <li>
            <Link
              to="/products"
              onClick={closeMenu}
            >
              Shop
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              onClick={closeMenu}
            >
              About
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              onClick={closeMenu}
            >
              Contact
            </Link>
          </li>

          <li>
            <Link
              to="/help"
              onClick={closeMenu}
            >
              Help
            </Link>
          </li>

        </ul>

        {/* ================= Right Side ================= */}

        <div className="navbar-right">
                    {/* ================= Desktop Search ================= */}

          <div className="search-wrapper">

            <div className="search-box">

              <input
                type="text"
                placeholder="Search Products..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                onFocus={() => {
                  if (suggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
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
                <FaSearch />
              </button>

            </div>

            {showSuggestions &&
              suggestions.length > 0 && (

                <div className="search-suggestions">

                  {suggestions.map(
                    (item, index) => (

                      <div
                        key={index}
                        className="suggestion-item"
                        onClick={() => {

                          setSearchTerm(
                            item.text
                          );

                          navigate(
                            `/products?search=${encodeURIComponent(
                              item.text
                            )}`
                          );

                          setShowSuggestions(
                            false
                          );

                          setSuggestions([]);

                        }}
                      >

                        <span>
                          {item.text}
                        </span>

                        <small>
                          {item.type}
                        </small>

                      </div>

                    )
                  )}

                </div>

              )}

          </div>

          {/* ================= Account ================= */}

          <button
            className="icon-btn"
            onClick={handleAccount}
          >
            <FaRegUser />
          </button>

          {/* ================= Wishlist ================= */}

          <button
            className="icon-btn cart-icon"
            onClick={() => {
              navigate("/wishlist");
              closeMenu();
            }}
          >
            <FaRegHeart />

            {wishlistCount > 0 && (
              <span className="cart-badge">
                {wishlistCount}
              </span>
            )}
          </button>

                    {/* ================= Cart ================= */}

          <button
            className="icon-btn cart-icon"
            onClick={() => {
              navigate("/cart");
              closeMenu();
            }}
          >
            <FaShoppingCart />

            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount}
              </span>
            )}
          </button>

          {/* ================= Mobile Menu Button ================= */}

          <button
            className="menu-btn"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            {menuOpen ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
          </button>

        </div>

      </header>

      {/* ================= Mobile Menu ================= */}

      <div
        className={
          menuOpen
            ? "mobile-menu active"
            : "mobile-menu"
        }
      >

        <div className="mobile-search-wrapper">

          <div className="mobile-search">

            <input
              type="text"
              placeholder="Search Products..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              onFocus={() => {
                if (suggestions.length > 0) {
                  setShowSuggestions(true);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            <button
              onClick={handleSearch}
            >
              <FaSearch />
            </button>

          </div>

          {showSuggestions &&
            suggestions.length > 0 && (

              <div className="search-suggestions">

                {suggestions.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => {

                        setSearchTerm(
                          item.text
                        );

                        navigate(
                          `/products?search=${encodeURIComponent(
                            item.text
                          )}`
                        );

                        setShowSuggestions(
                          false
                        );

                        setSuggestions([]);

                        closeMenu();

                      }}
                    >

                      <span>
                        {item.text}
                      </span>

                      <small>
                        {item.type}
                      </small>

                    </div>

                  )
                )}

              </div>

            )}

        </div>
                <Link
          to="/"
          onClick={closeMenu}
        >
          Home
        </Link>

        <Link
          to="/products?gender=Men"
          onClick={closeMenu}
        >
          Men
        </Link>

        <Link
          to="/products?gender=Women"
          onClick={closeMenu}
        >
          Women
        </Link>

        <Link
          to="/products"
          onClick={closeMenu}
        >
          Shop
        </Link>

        <Link
          to="/about"
          onClick={closeMenu}
        >
          About
        </Link>

        <Link
          to="/contact"
          onClick={closeMenu}
        >
          Contact
        </Link>

        <Link
          to="/help"
          onClick={closeMenu}
        >
          Help
        </Link>

        <button
          className="mobile-account-btn"
          onClick={handleAccount}
        >
          <FaRegUser />
          <span>My Account</span>
        </button>

      </div>

    </div>
  );
}

export default Navbar;