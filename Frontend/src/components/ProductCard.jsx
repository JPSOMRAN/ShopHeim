import { Link } from "react-router-dom";

import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

import { toast } from "react-toastify";

import "../styles/ProductCard.css";

function ProductCard({

  id,

  image,

  name,

  price,

  category,

  brand,

}) {

  const { addToCart } = useCart();

  const {

    wishlistItems,

    addToWishlist,

  } = useWishlist();

  const handleAddToCart = () => {

    addToCart({

      id,

      image,

      name,

      price,

      category,

      brand,

    });

    toast.success("Added To Cart 🛒");

  };

  const handleWishlist = () => {

    const exists = wishlistItems.find(

      (item) => item.id === id

    );

    if (exists) {

      toast.info("Already In Wishlist ❤️");

      return;

    }

    addToWishlist({

      id,

      image,

      name,

      price,

      category,

      brand,

    });

    toast.success("Added To Wishlist ❤️");

  };

  return (

    <div className="product-card">

      <Link

        to={`/product/${id}`}

        className="product-link"

      >

        <img

          src={image}

          alt={name}

        />

      </Link>

      <div className="product-content">

        <h4>

          {brand || category}

        </h4>

        <h3>

          {name}

        </h3>

        <p className="price">

          {price}

        </p>

        <div className="product-buttons">

          <button

            className="cart-btn"

            onClick={handleAddToCart}

          >

            Add To Cart

          </button>

          <button

            className="wish-btn"

            onClick={handleWishlist}

          >

            ❤

          </button>

        </div>

      </div>

    </div>

  );

}

export default ProductCard;