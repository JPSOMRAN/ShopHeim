import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { menProducts } from "../data/menProducts";
import { womenProducts } from "../data/womenProducts";

import RelatedProducts from "../components/RelatedProducts";

import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

import "../styles/ProductDetails.css";

function ProductDetails() {

  const { id } = useParams();

  const allProducts = [
    ...menProducts,
    ...womenProducts,
  ];

  const product = allProducts.find(
    (item) => item.id === Number(id)
  );

  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  const {
    wishlistItems,
    addToWishlist,
  } = useWishlist();

  if (!product) {

    return (
      <h1
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        Product Not Found
      </h1>
    );

  }

  // ============================
  // Add To Cart
  // ============================

  const handleAddToCart = () => {

    for (let i = 0; i < quantity; i++) {

      addToCart(product, selectedSize);

    }

    toast.success("🛒 Product Added To Cart");

  };

  // ============================
  // Wishlist
  // ============================

  const handleWishlist = () => {

    const alreadyExists = wishlistItems.some(
      (item) => item.id === product.id
    );

    if (alreadyExists) {

      toast.info("❤️ Already in Wishlist");
      return;

    }

    addToWishlist(product);

    toast.success("❤️ Added To Wishlist");

  };

  // ============================
  // Buy Now
  // ============================

  const handleBuyNow = () => {

    toast.info("Checkout page coming soon 🚀");

  };

  return (

    <>

      <section className="product-details">

        <div className="product-image">

          <img
            src={product.image}
            alt={product.name}
          />

        </div>

        <div className="product-info">

          <h2>

            {product.brand || product.category}

          </h2>

          <h1>

            {product.name}

          </h1>

          <div className="rating-box">

            <span>

              ⭐ {product.rating || "4.5"}

            </span>

            <span>

              1.2k Reviews

            </span>

          </div>

          <h3>

            {product.price}

          </h3>

          <p className="tax-info">

            Inclusive of all taxes

          </p>

          <h4>

            Select Size

          </h4>

          <div className="size-section">

            {

              ["S", "M", "L", "XL"].map(

                (size) => (

                  <button

                    key={size}

                    className={
                      selectedSize === size
                        ? "active-size"
                        : ""
                    }

                    onClick={() =>
                      setSelectedSize(size)
                    }

                  >

                    {size}

                  </button>

                )

              )

            }

          </div>

          <h4>

            Quantity

          </h4>

          <div className="quantity-box">

            <button

              onClick={() =>

                quantity > 1 &&

                setQuantity(quantity - 1)

              }

            >

              -

            </button>

            <span>

              {quantity}

            </span>

            <button

              onClick={() =>

                setQuantity(quantity + 1)

              }

            >

              +

            </button>

          </div>

          <div className="action-buttons">

            <button

              className="cart-btn"

              onClick={handleAddToCart}

            >

              Add To Cart

            </button>

            <button

              className="cart-btn"

              onClick={handleWishlist}

            >

              ❤️ Wishlist

            </button>

            <button

              className="buy-btn"

              onClick={handleBuyNow}

            >

              Buy Now

            </button>

          </div>

          <div className="description-box">

            <h4>

              Description

            </h4>

            <p>

              {

                product.description ||

                "Premium quality fashion product designed for style, comfort and durability. Perfect for daily wear, office wear and special occasions."

              }

            </p>

          </div>

          <div className="delivery-box">

            <h4>

              Delivery

            </h4>

            <p>

              Free Delivery in 3–5 Days

            </p>

          </div>

        </div>

      </section>

      <RelatedProducts

        currentProduct={product}

      />

    </>

  );

}

export default ProductDetails;