import RelatedProducts from "../components/RelatedProducts";

import TrendingProducts from "../components/TrendingProducts";

import { useState, useEffect, useRef } from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import { toast } from "react-toastify";

import API from "../services/api";

import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

import "../styles/ProductDetails.css";

function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const imageRef = useRef(null);

  // ==========================
  // STATES
  // ==========================

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [selectedImage,
    setSelectedImage] =
    useState("");

  const [selectedSize,
    setSelectedSize] =
    useState("M");

  const [quantity,
    setQuantity] =
    useState(1);

  const [
    backgroundPosition,
    setBackgroundPosition,
  ] = useState("center");

  const [zoomActive,
    setZoomActive] =
    useState(false);

  const { addToCart } = useCart();

  const {

    wishlistItems,

    addToWishlist,

  } = useWishlist();

  // ==========================
  // FETCH PRODUCT
  // ==========================

  useEffect(() => {

    async function fetchProduct() {

      try {

        const { data } =
          await API.get(
            `/products/${id}`
          );

        setProduct(data);

        setSelectedImage(

          data.images?.length

            ? data.images[0]

            : data.image

        );

      }

      catch (error) {

        console.log(error);

      }

      finally {

        setLoading(false);

      }

    }

    fetchProduct();

  }, [id]);

  // ==========================
  // IMAGE ZOOM
  // ==========================

  const handleZoom = (e) => {

    if (!imageRef.current) return;

    const {

      left,

      top,

      width,

      height,

    } =
      imageRef.current.getBoundingClientRect();

    const x =
      ((e.clientX - left) / width) *
      100;

    const y =
      ((e.clientY - top) / height) *
      100;

    setBackgroundPosition(
      `${x}% ${y}%`
    );

  };

  // ==========================
  // LOADING
  // ==========================

  if (loading) {

    return <h2>Loading...</h2>;

  }

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

  // ==========================
  // ADD TO CART
  // ==========================

  const handleAddToCart = () => {

    for (
      let i = 0;
      i < quantity;
      i++
    ) {

      addToCart(
        product,
        selectedSize
      );

    }

    toast.success(
      "🛒 Product Added To Cart"
    );

  };

  // ==========================
  // WISHLIST
  // ==========================

  const handleWishlist = () => {

    const exists =
      wishlistItems.find(

        (item) =>
          item._id === product._id

      );

    if (exists) {

      toast.info(
        "Already In Wishlist ❤️"
      );

      return;

    }

    addToWishlist(product);

    toast.success(
      "❤️ Added To Wishlist"
    );

  };


    // ==========================
  // BUY NOW
  // ==========================

  const handleBuyNow = () => {

    for (
      let i = 0;
      i < quantity;
      i++
    ) {

      addToCart(
        product,
        selectedSize
      );

    }

    navigate("/checkout");

  };

  return (

    <>

      <section className="product-details">

        <div className="product-details-image"

          ref={imageRef}

          onMouseMove={handleZoom}

          onMouseEnter={() =>
            setZoomActive(true)
          }

          onMouseLeave={() =>
            setZoomActive(false)
          }

        >

  <img
    src={
      selectedImage.startsWith("http")
        ? selectedImage
        : `https://shopheim.onrender.com${selectedImage}`
    }
            alt={product.name}

          />

          {zoomActive && (

            <div

              className="zoom-lens"

              style={{

                backgroundImage: `url(${

                  selectedImage.startsWith("http")

                    ? selectedImage

                    : `https://shopheim.onrender.com${selectedImage}`

                })`,

                backgroundPosition,

              }}

            />

          )}

          {/* ==========================
              IMAGE THUMBNAILS
          ========================== */}

          <div className="thumbnail-list">

            {(product.images?.length

              ? product.images

              : [product.image]

            ).map((img, index) => (

              <img

                key={index}

                src={

                  img.startsWith("http")

                    ? img

                    : `https://shopheim.onrender.com${img}`

                }

                alt={`Thumbnail ${index + 1}`}

                className={

                  selectedImage === img

                    ? "thumb active-thumb"

                    : "thumb"

                }

                onClick={() =>

                  setSelectedImage(img)

                }

              />

            ))}

          </div>

        </div>

        {/* ==========================
            PRODUCT INFO
        ========================== */}

        <div className="product-info">

          <h2>

            {product.brand || product.category}

          </h2>

          <h1>

            {product.name}

          </h1>

          <div className="rating-box">

            <span>

              ⭐ {product.rating || 4.5}

            </span>

            <span>

              1.2k Reviews

            </span>

          </div>

          <p

            style={{

              color:

                product.stock > 0

                  ? "#0f9d58"

                  : "#ff3b30",

              fontWeight: "600",

              marginTop: "10px",

            }}

          >

            {product.stock > 0

              ? `${product.stock} Items In Stock`

              : "Out Of Stock"}

          </p>

          <p className="tax-info">

            Inclusive of all taxes

          </p>

          <h4>

            Select Size

          </h4>

          <div className="size-section">

            {["S", "M", "L", "XL"].map(

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

            )}

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
              disabled={product.stock === 0}
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

              {product.description ||
                "Premium quality fashion product."}

            </p>

          </div>

          <div className="highlights-box">

          <h4>Product Highlights</h4>

          <ul>

            <li>✔ Premium Quality</li>

            <li>✔ Soft & Comfortable Fabric</li>

            <li>✔ Regular Fit</li>

            <li>✔ Machine Wash</li>

            <li>✔ 7 Days Easy Return</li>

          </ul>

          </div>
          <div className="specification-box">

  <h4>Specifications</h4>

  <table>

    <tbody>

      <tr>

        <td>Brand</td>

        <td>{product.brand}</td>

      </tr>

      <tr>

        <td>Category</td>

        <td>{product.category}</td>

      </tr>

      <tr>

        <td>Gender</td>

        <td>{product.gender}</td>

      </tr>

      <tr>

        <td>Rating</td>

        <td>{product.rating} ⭐</td>

      </tr>

      <tr>

        <td>Stock</td>

        <td>{product.stock}</td>

      </tr>

    </tbody>

  </table>

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




      <TrendingProducts
        currentProduct={product}
      />

    </>

  );

}

export default ProductDetails;