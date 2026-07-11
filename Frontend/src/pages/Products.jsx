import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHeart, FaFilter, FaStar } from "react-icons/fa";
import CustomDropdown from "../components/CustomDropdown";
import API from "../services/api";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";
import "../styles/Products.css";

function Products() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist } = useWishlist();

  // =====================================
  // URL PARAMETERS
  // =====================================
  const genderQuery = searchParams.get("gender") || "All";
  const categoryQuery = searchParams.get("category") || "All";
  const brandQuery = searchParams.get("brand") || "All";
  const priceQuery = searchParams.get("price") || "All";
  const sortQuery = searchParams.get("sort") || "Newest";
  const searchQuery = searchParams.get("search") || "";
  const trendQuery = searchParams.get("trend") || "";

  // =====================================
  // STATES
  // =====================================
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const [gender, setGender] = useState(genderQuery);
  const [category, setCategory] = useState(categoryQuery);
  const [brand, setBrand] = useState(brandQuery);
  const [price, setPrice] = useState(priceQuery);
  const [sortBy, setSortBy] = useState(sortQuery);

  // =====================================
  // LOAD PRODUCTS
  // =====================================
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const { data } = await API.get("/products");
        setProducts(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed To Load Products");
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // =====================================
  // FILTER + SORT
  // =====================================
  const filteredProducts = useMemo(() => {
    let data = [...products];

    // SEARCH
    if (searchQuery) {
      const keyword = searchQuery.toLowerCase();
      data = data.filter(product =>
        product.name.toLowerCase().includes(keyword) ||
        product.brand.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword)
      );
    }

    // TREND FILTER
    if (trendQuery) {
      switch (trendQuery) {
        case "ethnic":
          data = data.filter(product => product.category === "Ethnic Wear");
          break;
        case "casual":
          data = data.filter(product =>
            ["Shirts", "T-Shirts", "Jeans", "Cargo Pants", "Sneakers", "Denim Jackets", "Tops"].includes(product.category)
          );
          break;
        case "men-active":
          data = data.filter(product => product.category === "Men Activewear");
          break;
        case "women-active":
          data = data.filter(product => product.category === "Women Activewear");
          break;
        case "western":
          data = data.filter(product =>
            ["Blazers", "Formal Shirts", "Formal Pants", "Waistcoats", "Denim Jackets", "Jackets", "Skirts", "Tops"].includes(product.category)
          );
          break;
        case "sports":
          data = data.filter(product =>
            ["Sports Shoes", "Men Activewear", "Women Activewear", "Cricket Jerseys"].includes(product.category)
          );
          break;
        case "lounge":
          data = data.filter(product => product.category === "Loungewear");
          break;
        case "innerwear":
          data = data.filter(product => product.category === "Innerwear");
          break;
        case "watches":
          data = data.filter(product => product.category === "Watches");
          break;
        case "grooming":
          data = data.filter(product => product.category === "Grooming");
          break;
        case "beauty":
          data = data.filter(product => product.category === "Beauty");
          break;
        case "footwear":
          data = data.filter(product =>
            ["Footwear", "Sneakers", "Sports Shoes", "Sandals"].includes(product.category)
          );
          break;
        default:
          break;
      }
    }

    // GENDER
    if (gender !== "All") {
      data = data.filter(product => product.gender === gender);
    }

    // CATEGORY
    if (category !== "All") {
      data = data.filter(product => product.category === category);
    }

    // BRAND
    if (brand !== "All") {
      data = data.filter(product => product.brand === brand);
    }

    // PRICE
    switch (price) {
      case "Under1000":
        data = data.filter(product => product.price < 1000);
        break;
      case "1000-2000":
        data = data.filter(product => product.price >= 1000 && product.price <= 2000);
        break;
      case "Above2000":
        data = data.filter(product => product.price > 2000);
        break;
      default:
        break;
    }

    // SORT
    switch (sortBy) {
      case "Price Low":
        data.sort((a, b) => a.price - b.price);
        break;
      case "Price High":
        data.sort((a, b) => b.price - a.price);
        break;
      case "Name":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Newest":
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    return data;
  }, [products, gender, category, brand, price, sortBy, searchQuery, trendQuery]);

  // =====================================
  // WISHLIST
  // =====================================
  const handleWishlist = (product) => {
    const exists = wishlistItems.find(item => item._id === product._id);
    if (exists) {
      toast.info("Already In Wishlist ❤️");
      return;
    }
    addToWishlist(product);
    toast.success("Added To Wishlist ❤️");
  };

  // =====================================
  // CART
  // =====================================
  const handleCart = (product) => {
    addToCart(product);
    toast.success("Added To Cart 🛒");
  };

  if (loading) {
    return <div className="loading">Loading Products...</div>;
  }

  return (
    <section className="products-page">
      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <span>Home</span>
        <span>/</span>
        <span>{gender !== "All" ? gender : "Products"}</span>
      </div>

      {/* PAGE HEADER */}
      <div className="products-header">
        <div className="products-title">
          <h1>
            {searchQuery
              ? `Search Results`
              : trendQuery
                ? trendQuery.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase())
                : gender === "Men"
                  ? "Men"
                  : gender === "Women"
                    ? "Women"
                    : "All Products"}
          </h1>
          <p>{filteredProducts.length} Products Found</p>
        </div>

        <div className="header-right">
          <button className="filter-btn" onClick={() => setShowFilters(!showFilters)}>
            <FaFilter /> Filters
          </button>
          <CustomDropdown
            value={sortBy}
            onChange={setSortBy}
            options={["Newest", "Price Low", "Price High", "Name"]}
          />
        </div>
      </div>

      {/* LAYOUT STRUCTURE */}
      <div className="products-layout">
        {showFilters && (
          <aside className="filters-sidebar">
            <h2>Filters</h2>
            <CustomDropdown label="Gender" value={gender} onChange={setGender} options={["All", "Men", "Women"]} />
            <CustomDropdown
              label="Category"
              value={category}
              onChange={setCategory}
              options={[
                "All", "Shirts", "T-Shirts", "Jeans", "Cargo Pants", "Blazers", "Sneakers", 
                "Sports Shoes", "Formal Shoes", "Boots", "Sandals", "Watches", "Denim Jackets", 
                "Formal Pants", "Tops", "Ethnic Wear", "Men Activewear", "Women Activewear", 
                "Cricket Jerseys", "Loungewear", "Innerwear", "Grooming", "Beauty"
              ]}
            />
            <CustomDropdown
              label="Brand"
              value={brand}
              onChange={setBrand}
              options={[
                "All", "Nike", "Adidas", "Puma", "Levis", "HM", "ZARA", "Van Heusen", 
                "Louis Philippe", "Casio", "Titan", "Fossil", "Woodland", "Manyavar", "House Of Pataudi"
              ]}
            />
            <CustomDropdown label="Price" value={price} onChange={setPrice} options={["All", "Under1000", "1000-2000", "Above2000"]} />
          </aside>
        )}

        <div className="products-grid">
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <h2>No Products Found 😕</h2>
              <p>Try changing your filters or search.</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  <img
                    src={product.image.startsWith("http") ? product.image : `https://shopheim.onrender.com${product.image}`}
                    alt={product.name}
                    onClick={() => navigate(`/product/${product._id}`)}
                  />
                  <button className="wishlist-btn" onClick={() => handleWishlist(product)}>
                    <FaHeart />
                  </button>
                </div>

                <div className="product-content">
                  {/* Fallback defaults keep the row blocks perfectly spaced */}
                  <h4 className="product-brand">{product.brand || "Brand"}</h4>
                  <p className="product-name">{product.name || "Product Details"}</p>
                  
                  <div className="rating-row">
                    <span className="rating">{product.rating || 4.4}</span>
                    <FaStar className="rating-star" />
                    <span className="rating-count">({product.reviews || "1.2k"})</span>
                  </div>

                  <div className="price-row">
                    <span className="price">₹{product.price}</span>
                  </div>

                  <div className="discount-row">
                    <span className="old-price">₹{Math.round(product.price * 1.7)}</span>
                    <span className="discount">
                      {Math.round(((product.price * 1.7 - product.price) / (product.price * 1.7)) * 100)}% OFF
                    </span>
                  </div>

                  <div className="product-buttons">
                    <button className="products-details-btn" onClick={() => navigate(`/product/${product._id}`)}>
                      View
                    </button>
                    <button className="products-cart-btn" onClick={() => handleCart(product)} disabled={product.stock === 0}>
                      {product.stock > 0 ? "Add to Cart" : "Out Of Stock"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Products;